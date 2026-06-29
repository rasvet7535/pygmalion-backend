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
    `SELECT COALESCE(SUM((payload->>'total_ue')::int), 0) + COALESCE(SUM((payload->>'totalUE')::int), 0) as total
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

  const status = phase === 'impulse' ? 'impulse' : 'active';
  const result = await pool.query(
    `INSERT INTO acts_log (act_type, actor_ok, payload, refs, created_at)
     VALUES ($1, $2, $3, $4, NOW()) RETURNING act_id, created_at`,
    ['EMISSION', actor_ok, JSON.stringify({ triads, burn_at: burnAt, phase, total_ue: validation.totalUE }), parentRefs]
  );

  const { act_id, created_at } = result.rows[0];

  for (const t of triads) {
    const nums = Canon.emissionPolicy.getUENumbersByTriad(t) || [];
    for (const num of nums) {
      await pool.query(
        `INSERT INTO ue_units (ue_number, triad, actor_ok, status, burn_at, created_at, emission_act_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [num, t, actor_ok, status, burnAt, created_at, act_id]
      );
    }
  }

  await pool.query(
    `UPDATE ok_identity SET last_act_at = $2, last_act_type = 'EMISSION' WHERE ok_key = $1`,
    [actor_ok, created_at]
  );

  return {
    success: true,
    act_id,
    ue_count: validation.totalUE,
    triads,
    burn_at: burnAt,
    actor_ok,
  };
}

module.exports = { execute };
