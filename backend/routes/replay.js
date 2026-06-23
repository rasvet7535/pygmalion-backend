const { Router } = require('express');
const pool = require('../db');
const Canon = require('../core/canon');

module.exports = Router()
  .get('/api/replay/run', async (req, res) => {
    try {
      const snapshot = (await pool.query(
        `SELECT ue_uuid, ue_number, triad, actor_ok, status, created_at, burn_at, transferred_at, emission_act_id, transfer_act_id FROM ue_units ORDER BY created_at, ue_number`
      )).rows;
      const snapshotMap = new Map(snapshot.map(ue => [`${ue.emission_act_id}-${ue.ue_number}-${ue.triad}`, ue]));

      const emissions = (await pool.query(
        `SELECT act_id, actor_ok, payload, created_at FROM acts_log WHERE act_type = 'EMISSION' ORDER BY created_at`
      )).rows;

      const uuids = snapshot.map(s => s.ue_uuid);
      const transferSet = new Set();
      const burnSet = new Set();
      if (uuids.length > 0) {
        const transfers = await pool.query(
          `SELECT DISTINCT payload->>'ue_uuid' AS ue_uuid FROM acts_log WHERE act_type = 'TRANSFER' AND payload->>'ue_uuid' = ANY($1::text[])`,
          [uuids]
        );
        for (const t of transfers.rows) { if (t.ue_uuid) transferSet.add(t.ue_uuid); }

        const burns = await pool.query(
          `SELECT DISTINCT payload->>'ue_uuid' AS ue_uuid FROM acts_log WHERE act_type = 'BURNED' AND payload->>'ue_uuid' = ANY($1::text[])`,
          [uuids]
        );
        for (const b of burns.rows) { if (b.ue_uuid) burnSet.add(b.ue_uuid); }
      }

      let reconstructed = 0;
      const mismatches = [];
      for (const act of emissions) {
        const triads = act.payload.triads || [];
        for (const triad of triads) {
          const range = (Canon.emissionPolicy.TRIADS[triad] || {}).range || [];
          for (let i = 0; i < range.length; i++) {
            const ueNumber = range[i];
            const key = `${act.act_id}-${ueNumber}-${triad}`;
            const orig = snapshotMap.get(key);
            if (!orig) { mismatches.push({ key, reason: 'missing_in_snapshot' }); continue; }
            let expectedStatus = 'impulse';
            if (new Date(orig.burn_at) <= new Date()) expectedStatus = 'active';
            if (transferSet.has(orig.ue_uuid)) expectedStatus = 'transferred';
            if (burnSet.has(orig.ue_uuid)) expectedStatus = 'burned';
            if (orig.status !== expectedStatus && !(expectedStatus === 'active' && orig.status === 'impulse')) {
              mismatches.push({ key, ue_uuid: orig.ue_uuid, expected: expectedStatus, actual: orig.status });
            }
            reconstructed++;
          }
        }
      }

      res.json({
        status: mismatches.length === 0 ? 'MATCH' : 'MISMATCH',
        snapshot_count: snapshot.length,
        reconstructed_count: reconstructed,
        mismatch_count: mismatches.length,
        mismatches: mismatches.slice(0, 50),
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      res.status(500).json({ status: 'ERROR', error: err.message });
    }
  });
