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
      `SELECT ue_uuid, ue_number, triad, status FROM ue_units WHERE ue_uuid = $1 AND actor_ok = $2 AND status = 'active'`,
      [ue_uuid, actor_ok]
    );
    if (r.rows.length === 0) {
      return { success: false, error: `У.Е. ${ue_uuid} не найдена или не активна` };
    }
    targetUe = r.rows[0];
  } else {
    const r = await pool.query(
      `SELECT ue_uuid, ue_number, triad FROM ue_units WHERE actor_ok = $1 AND status = 'active' ORDER BY created_at ASC LIMIT 1`,
      [actor_ok]
    );
    if (r.rows.length === 0) {
      return { success: false, error: 'Нет активных У.Е. для передачи' };
    }
    targetUe = r.rows[0];
  }

  const parentRefs = [targetUe.ue_uuid];

  const actResult = await pool.query(
    `INSERT INTO acts_log (act_type, actor_ok, target_ok, payload, refs, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING act_id, created_at`,
    ['TRANSFER', actor_ok, target_ok, JSON.stringify({ ue_uuid: targetUe.ue_uuid, ue_number: targetUe.ue_number, triad: targetUe.triad }), parentRefs]
  );

  const actId = actResult.rows[0].act_id;
  const createdAt = actResult.rows[0].created_at;

  await pool.query(
    `UPDATE ue_units SET status = 'transferred', transferred_at = $1, transfer_act_id = $2, actor_ok = $3 WHERE ue_uuid = $4`,
    [createdAt, actId, target_ok, targetUe.ue_uuid]
  );

  await pool.query(
    `UPDATE ok_identity SET last_act_at = $1, last_act_type = 'TRANSFER' WHERE ok_key = $2`,
    [createdAt, actor_ok]
  );

  return {
    success: true,
    act_id: actId,
    ue_uuid: targetUe.ue_uuid,
    ue_number: targetUe.ue_number,
    triad: targetUe.triad,
    from: actor_ok,
    to: target_ok,
    transferred_at: actResult.rows[0].created_at,
  };
}

module.exports = { execute };
