const { Router } = require('express');
const pool = require('../db');
const Metronome = require('../core/metronome');

module.exports = Router()
  .get('/api/observer', async (req, res) => {
    try {
      const currentUTC = new Date().toISOString();
      const nextBurnAt = Metronome.calculateBurnAt();
      const lastBurn = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0, 0));
      const lastBurnAt = lastBurn.toISOString();
      const window_start = Metronome.getWindowStart();

      const okBatch = await pool.query(`
        SELECT
          o.ok_key,
          MAX(al_all.created_at) AS last_act_at,
          EXISTS(SELECT 1 FROM acts_log WHERE actor_ok = o.ok_key AND act_type IN ('EMISSION', 'TRANSFER')
                 AND created_at > COALESCE((SELECT created_at FROM acts_log WHERE actor_ok = o.ok_key
                                            AND act_type = 'THRESHOLD_CROSSED' ORDER BY created_at DESC LIMIT 1),
                                           '1970-01-01'::timestamp)) AS has_formed_acts,
          EXISTS(SELECT 1 FROM annotations aa
                 JOIN acts_log al ON aa.act_ref_id = al.act_id
                 WHERE (al.actor_ok = o.ok_key OR al.target_ok = o.ok_key)
                 AND aa.annotation_type = 'RECOGNITION' AND aa.author_ok != o.ok_key) AS received_um,
          EXISTS(SELECT 1 FROM acts_log WHERE actor_ok = o.ok_key AND act_type = 'TRANSFER') AS sent_ue,
          (SELECT COUNT(*) FROM ue_units WHERE actor_ok = o.ok_key AND status = 'active' AND created_at >= $1::timestamp) AS ue_count,
          (SELECT COUNT(*) FILTER (WHERE act_type = 'EMISSION' AND actor_ok = o.ok_key) +
                  COUNT(*) FILTER (WHERE act_type = 'TRANSFER' AND actor_ok = o.ok_key)
           FROM acts_log WHERE actor_ok = o.ok_key AND created_at >= $1::timestamp) AS directions_given,
          EXISTS(SELECT 1 FROM acts_log WHERE actor_ok = o.ok_key AND act_type = 'BURNED'
                 AND created_at >= NOW() - INTERVAL '1 hour') AS burn_active
        FROM ok_identity o
        LEFT JOIN acts_log al_all ON al_all.actor_ok = o.ok_key
        GROUP BY o.ok_key, o.created_at
        ORDER BY o.ok_key
      `, [window_start]);

      const realCyclePhases = { gestation: 0, awakening: 0, forming: 0, recognition: 0, weaving: 0, release: 0, cooling: 0, silence: 0, settled: 0 };

      for (const row of okBatch.rows) {
        const last_act_at = row.last_act_at;
        const silence_hours = last_act_at ? (Date.now() - new Date(last_act_at).getTime()) / 3600000 : null;
        const hasFormedActs = row.has_formed_acts;
        const received_um = row.received_um;
        const sent_ue = row.sent_ue;
        const in_tree = received_um && sent_ue;
        const ue_flow = parseInt(row.ue_count);
        const given = parseInt(row.directions_given);
        const burn_echo_active = row.burn_active;

        let phase = 'gestation';
        if (!hasFormedActs && ue_flow === 0 && given === 0) {
          phase = 'gestation';
        } else if (hasFormedActs && !received_um) {
          phase = 'awakening';
        } else if (received_um && !in_tree && ue_flow === 0) {
          phase = 'recognition';
        } else if (burn_echo_active) {
          phase = 'release';
        } else if (silence_hours !== null && silence_hours > 1 && silence_hours < 24 && ue_flow === 0) {
          phase = 'cooling';
        } else if (silence_hours !== null && silence_hours >= 24 && silence_hours < 168 && ue_flow === 0) {
          phase = 'silence';
        } else if (silence_hours !== null && silence_hours >= 168 && ue_flow === 0) {
          phase = 'settled';
        } else {
          phase = 'weaving';
        }
        realCyclePhases[phase]++;
      }

      const totalOK = okBatch.rows.length;
      const ueByStatus = {};
      (await pool.query('SELECT status, COUNT(*) as count FROM ue_units GROUP BY status')).rows.forEach(r => { ueByStatus[r.status] = parseInt(r.count); });
      const acts24h = parseInt((await pool.query("SELECT COUNT(*) as count FROM acts_log WHERE created_at >= NOW() - INTERVAL '24 hours'")).rows[0].count || 0);
      res.json({
        metronome: { current_utc: currentUTC, next_burn_at: nextBurnAt, last_burn_at: lastBurnAt },
        cycle_phases: realCyclePhases,
        ue_units: ueByStatus,
        ro_dag: { total_ok: parseInt(totalOK), active_ue: ueByStatus.active || 0 },
        backend: { status: 'online', last_request_at: currentUTC, acts_24h: acts24h }
      });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
