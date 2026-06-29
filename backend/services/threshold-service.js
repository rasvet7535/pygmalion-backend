const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');

async function execute(payload) {
  const { ok_key } = payload;

  if (!Canon.isValidOK(ok_key)) {
    return { success: false, error: `Некорректный формат О.К.: "${ok_key}"` };
  }

  if (Canon.isSystemReserve(ok_key)) {
    return { success: false, error: `О.К. "${ok_key}" в системном резерве` };
  }

  const exists = await pool.query('SELECT ok_key FROM ok_identity WHERE ok_key = $1', [ok_key]);
  if (exists.rows.length > 0) {
    return { success: false, error: `О.К. "${ok_key}" уже существует`, code: 'CONFLICT' };
  }

  const actResult = await pool.query(
    `INSERT INTO acts_log (act_type, actor_ok, payload, created_at)
     VALUES ('THRESHOLD_CROSSED', $1, $2, NOW()) RETURNING act_id, created_at`,
    [ok_key, JSON.stringify({ ok_key })]
  );

  const actId = actResult.rows[0].act_id;
  const createdAt = actResult.rows[0].created_at;

  await pool.query(
    `INSERT INTO ok_identity (ok_key, created_at, last_act_at, last_act_type) VALUES ($1, $2, $2, 'THRESHOLD_CROSSED')`,
    [ok_key, createdAt]
  );

  return {
    success: true,
    ok_key,
    act_id: actId,
    created_at: createdAt,
    message: `О.К. "${ok_key}" зарегистрирован через порог вхождения`,
  };
}

module.exports = { execute };
