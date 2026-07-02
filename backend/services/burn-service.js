const pool = require('../db');
const Metronome = require('../core/metronome');

async function execute() {
  const nowISO = Metronome.getCurrentTimeISO();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const toBurn = await client.query(
      `SELECT ue_uuid, ue_number, triad, actor_ok, burn_at, emission_act_id FROM ue_units WHERE status IN ('active', 'impulse') AND burn_at <= $1::timestamp`,
      [nowISO]
    );
    let burnedCount = 0;
    const burnedUes = [];
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
        await client.query(`UPDATE ue_units SET status = 'burned', transferred_at = $1, burn_act_id = $2 WHERE ue_uuid = $3`, [row.created_at, row.act_id, row.burned_ue_uuid]);
        // Note: ro_dag_edges update is done here to match server.js logic exactly
        await client.query(`INSERT INTO ro_dag_edges (from_act_id, to_act_id, edge_type) VALUES ($1, $2, 'RELEASE')`, [row.emission_act_id, row.act_id]);

        burnedCount++;
        const sourceUe = toBurn.rows.find(u => u.ue_uuid === row.burned_ue_uuid);
        burnedUes.push({ ue_uuid: row.burned_ue_uuid, actor_ok: row.actor_ok, ue_number: sourceUe.ue_number });
      }

      const actors = [...new Set(actResult.rows.map(r => r.actor_ok))];
      for (const actor of actors) {
        const lastAct = actResult.rows.filter(r => r.actor_ok === actor).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
        await client.query(`UPDATE ok_identity SET last_act_at = $1, last_act_type = 'BURNED' WHERE ok_key = $2`, [lastAct.created_at, actor]);
      }
    }
    await client.query('COMMIT');
    return {
      success: true,
      burned_count: burnedCount,
      burned_ues: burnedUes,
      timestamp: nowISO
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { execute };
