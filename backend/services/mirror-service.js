const pool = require('../db');
const Metronome = require('../core/metronome');

async function execute(payload) {
  const { ok_id } = payload;
  const windowStart = Metronome.getWindowStart();

  const projection = await pool.query(
    `SELECT COUNT(*) as ue_flow FROM ue_units WHERE actor_ok = $1 AND status IN ('active', 'impulse', 'transferred')`,
    [ok_id]
  );

  const lastAct = await pool.query(
    `SELECT act_type, created_at FROM acts_log WHERE actor_ok = $1 ORDER BY created_at DESC LIMIT 5`,
    [ok_id]
  );

  const okInfo = await pool.query(
    `SELECT ok_key, last_act_at, last_act_type FROM ok_identity WHERE ok_key = $1`,
    [ok_id]
  );

  const presence = {
    ok_id,
    projection: {
      ue_flow: parseInt(projection.rows[0].ue_flow) || 0,
      window_start: windowStart,
    },
    recent_acts: lastAct.rows,
    identity: okInfo.rows[0] || null,
    timestamp: Metronome.getCurrentTimeISO(),
  };

  return { success: true, presence };
}

module.exports = { execute };
