const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');

async function execute(payload) {
  const { actor_ok, target_ok, ue_uuid } = payload;

  if (!Metronome.isTransferAllowed()) {
    return { success: false, error: `Передача разрешена только в фазе "active" (04:00-19:55 UTC)` };
  }

  if (!Canon.isValidOK(actor_ok) || !Canon.isValidOK(target_ok)) {
    return { success: false, error: 'Некорректный формат О.К.' };
  }

  let targetUe;
  if (ue_uuid) {
    const r = await pool.query(
      `SELECT ue_id, ue_number, status FROM ue_units WHERE ue_id = $1 AND actor_ok = $2 AND status = 'active'`,
      [ue_uuid, actor_ok]
    );
    if (r.rows.length === 0) {
      return { success: false, error: `У.Е. ${ue_uuid} не найдена или не активна` };
    }
    targetUe = r.rows[0];
  } else {
    const r = await pool.query(
      `SELECT ue_id, ue_number FROM ue_units WHERE actor_ok = $1 AND status = 'active' ORDER BY created_at ASC LIMIT 1`,
      [actor_ok]
    );
    if (r.rows.length === 0) {
      return { success: false, error: 'Нет активных У.Е. для передачи' };
    }
    targetUe = r.rows[0];
  }

  const parentRefs = [targetUe.ue_id];

  const actResult = await pool.query(
    `INSERT INTO acts_log (act_type, actor_ok, target_ok, payload, refs, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING act_id, created_at`,
    ['TRANSFER', actor_ok, target_ok, JSON.stringify({ ue_uuid: targetUe.ue_id }), parentRefs]
  );

  const actId = actResult.rows[0].act_id;

  await pool.query(
    `UPDATE ue_units SET status = 'transferred', actor_ok = $2 WHERE ue_id = $1`,
    [targetUe.ue_id, target_ok]
  );

  await pool.query(
    `UPDATE ok_identity SET last_act_at = NOW(), last_act_type = 'TRANSFER' WHERE ok_key = $1`,
    [actor_ok]
  );

  return {
    success: true,
    act_id: actId,
    ue_id: targetUe.ue_id,
    from: actor_ok,
    to: target_ok,
    transferred_at: actResult.rows[0].created_at,
  };
}

module.exports = { execute };
