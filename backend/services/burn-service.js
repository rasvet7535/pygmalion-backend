const pool = require('../db');
const Metronome = require('../core/metronome');

async function execute() {
  const nowISO = Metronome.getCurrentTimeISO();
  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const toBurn = await client.query(
        `SELECT ue_uuid, ue_number, triad, actor_ok, burn_at, emission_act_id FROM ue_units WHERE status IN ('active', 'impulse') AND burn_at <= $1::timestamp`,
        [nowISO]
      );
      let burnedCount = 0;
      if (toBurn.rows.length > 0) {
        const ueUuids = toBurn.rows.map(u => u.ue_uuid);
        const actResult = await client.query(
          `INSERT INTO acts_log (act_type, actor_ok, payload, refs)
           SELECT 'BURNED', actor_ok,
                  jsonb_build_object('ue_uuid', ue_uuid, 'ue_number', ue_number, 'triad', triad, 'burn_at', burn_at),
                  ARRAY[emission_act_id]::uuid[]
           FROM ue_units WHERE ue_uuid = ANY($1::uuid[])
           RETURNING act_id, created_at, actor_ok, payload->>'ue_uuid' AS burned_ue_uuid, emission_act_id`,
          [ueUuids]
        );
        for (const row of actResult.rows) {
          await client.query(`UPDATE ue_units SET status = 'burned', transferred_at = $1 WHERE ue_uuid = $2`, [row.created_at, row.burned_ue_uuid]);
          await client.query(`INSERT INTO ro_dag_edges (from_act_id, to_act_id, edge_type) VALUES ($1, $2, 'RELEASE')`, [row.emission_act_id, row.act_id]);
          burnedCount++;
        }
      }
      await client.query('COMMIT');
      return { success: true, burned_count: burnedCount, timestamp: nowISO };
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { execute };
