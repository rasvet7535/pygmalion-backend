const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');

async function _selectParentRefs(actor_ok, limit = 3) {
  const result = await pool.query(
    'SELECT act_id FROM acts_log WHERE actor_ok = $1 ORDER BY created_at DESC LIMIT $2',
    [actor_ok, limit]
  );
  return result.rows.map(row => row.act_id);
}

async function _getDailyEmissionTotal(actor_ok) {
  const today = Metronome.getWindowStart();
  const result = await pool.query(
    `SELECT COALESCE(SUM((payload->>'totalUE')::int), 0) as total
     FROM acts_log
     WHERE actor_ok = $1 AND act_type = 'EMISSION' AND created_at >= $2`,
    [actor_ok, today]
  );
  return parseInt(result.rows[0].total) || 0;
}

async function execute(payload) {
  const { actor_ok, triads } = payload;

  const phase = Metronome.getCurrentPhase();
  if (!Metronome.isEmissionAllowed()) {
    return { success: false, error: `Эмиссия запрещена в фазе "${phase}"` };
  }

  if (!Canon.isValidOK(actor_ok)) {
    return { success: false, error: `Некорректный О.К.: "${actor_ok}"` };
  }

  const maxUE = Canon.emissionPolicy.getMaxUEPerDay(actor_ok);
  const dailyTotal = await _getDailyEmissionTotal(actor_ok);
  const remaining = maxUE - dailyTotal;

  const validation = Canon.emissionPolicy.validateTriadSelection(triads, remaining);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const ueNumbers = [];
  for (const t of triads) {
    ueNumbers.push(...Canon.emissionPolicy.getUENumbersByTriad(t));
  }

  const parentRefs = await _selectParentRefs(actor_ok);
  const burnAt = Metronome.calculateBurnAt();

  const result = await pool.query(
    `INSERT INTO acts_log (act_type, actor_ok, payload, refs, created_at)
     VALUES ($1, $2, $3, $4, NOW()) RETURNING act_id, created_at`,
    ['EMISSION', actor_ok, JSON.stringify({ triads, ueNumbers, totalUE: validation.totalUE, burnAt }), parentRefs]
  );

  const actId = result.rows[0].act_id;

  const ueValues = ueNumbers.map(n => `(${actId}, ${n}, 'active', '${burnAt}', NOW())`).join(', ');
  await pool.query(`INSERT INTO ue_units (act_id, ue_number, status, burn_at, created_at) VALUES ${ueValues}`);

  await pool.query(
    `UPDATE ok_identity SET last_act_at = NOW(), last_act_type = 'EMISSION' WHERE ok_key = $1`,
    [actor_ok]
  );

  return {
    success: true,
    act_id: actId,
    ue_count: validation.totalUE,
    ue_numbers: ueNumbers,
    triads,
    burn_at: burnAt,
    actor_ok,
  };
}

module.exports = { execute };
