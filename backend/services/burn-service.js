const pool = require('../db');
const Metronome = require('../core/metronome');

async function execute() {
  const now = Metronome.getCurrentTimeISO();

  const result = await pool.query(
    `SELECT ue_uuid, actor_ok, ue_number FROM ue_units
     WHERE status IN ('active', 'impulse') AND burn_at <= $1`,
    [now]
  );

  const ues = result.rows;
  if (ues.length === 0) {
    return { success: true, burned_count: 0, message: 'Нет У.Е. для сжигания' };
  }

  const actResult = await pool.query(
    `INSERT INTO acts_log (act_type, actor_ok, payload, created_at)
     VALUES ('BURNED', '::system::', $1, NOW()) RETURNING act_id, created_at`,
    [JSON.stringify({ count: ues.length, ue_uuids: ues.map(u => u.ue_uuid) })]
  );

  const actId = actResult.rows[0].act_id;
  const createdAt = actResult.rows[0].created_at;

  await pool.query(
    `UPDATE ue_units SET status = 'burned', burn_act_id = $2
     WHERE ue_uuid = ANY($1::uuid[])`,
    [ues.map(u => u.ue_uuid), actId]
  );

  const actors = [...new Set(ues.map(u => u.actor_ok))];
  if (actors.length > 0) {
    await pool.query(
      `UPDATE ok_identity SET last_act_at = $1, last_act_type = 'BURNED' WHERE ok_key = ANY($2::text[])`,
      [createdAt, actors]
    );
  }

  return {
    success: true,
    burned_count: ues.length,
    act_id: actId,
    burned_ues: ues.map(u => ({ ue_uuid: u.ue_uuid, actor_ok: u.actor_ok, ue_number: u.ue_number })),
    timestamp: Metronome.getCurrentTimeISO(),
  };
}

module.exports = { execute };
