const { Router } = require('express');
const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');
const { updateLastAct } = require('../helpers');
const Grammar = require('../core/grammar-engine');

module.exports = Router()
  // POST /api/ok — минимальная регистрация О.К.
  .post('/api/ok', async (req, res) => {
    const { ok_key, public_key } = req.body;
    try {
      if (!Grammar.isValidOK(ok_key)) return res.status(400).json({ error: 'Invalid ok_key format' });
      await pool.query('INSERT INTO ok_identity (ok_key, public_key) VALUES ($1, $2) ON CONFLICT (ok_key) DO NOTHING', [ok_key, public_key || null]);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Failed to register OK' });
    }
  })

  // POST /api/threshold — порог вхождения (про.14)
  .post('/api/threshold', async (req, res) => {
    const { ok_key, public_key } = req.body;
    const client = await pool.connect();
    try {
      if (!Grammar.isValidOK(ok_key)) return res.status(400).json({ error: 'Invalid ok_key format' });
      await client.query('BEGIN');
      const existing = await client.query('SELECT ok_key FROM ok_identity WHERE ok_key = $1', [ok_key]);
      if (existing.rows.length > 0) { await client.query('ROLLBACK'); return res.status(409).json({ error: 'OK already exists' }); }
      await client.query('INSERT INTO ok_identity (ok_key, public_key) VALUES ($1, $2)', [ok_key, public_key || null]);
      const actResult = await client.query(
        `INSERT INTO acts_log (act_type, actor_ok, payload, refs) VALUES ('THRESHOLD_CROSSED', $1, $2, $3) RETURNING act_id, created_at`,
        [ok_key, JSON.stringify({ event: 'threshold_crossed', timestamp: new Date().toISOString(), message: 'Порог пересечён. Присутствие зафиксировано.' }), []]
      );
      await client.query('COMMIT');
      await updateLastAct(ok_key, 'THRESHOLD_CROSSED');
      res.json({ success: true, ok_key, act_id: actResult.rows[0].act_id, created_at: actResult.rows[0].created_at, message: 'Порог пересечён. Добро пожаловать.' });
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: 'Failed to cross threshold' });
    } finally {
      client.release();
    }
  })

  // POST /api/burn — сгорание У.Е.
  .post('/api/burn', async (req, res) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const nowISO = Metronome.getCurrentTimeISO();
      const toBurn = await client.query(
        `SELECT ue_uuid, ue_number, triad, actor_ok, burn_at, emission_act_id FROM ue_units WHERE status IN ('active', 'impulse') AND burn_at <= $1::timestamp`,
        [nowISO]
      );
      const burnedUEs = [];
      if (toBurn.rows.length > 0) {
        const actResult = await client.query(
          `INSERT INTO acts_log (act_type, actor_ok, payload, refs)
           SELECT 'BURNED', actor_ok,
                  jsonb_build_object('ue_uuid', ue_uuid, 'ue_number', ue_number, 'triad', triad, 'burn_at', burn_at),
                  ARRAY[emission_act_id]::uuid[]
           FROM ue_units WHERE ue_uuid = ANY($1::uuid[])
           RETURNING act_id, created_at, actor_ok, payload->>'ue_uuid' AS burned_ue_uuid`,
          [toBurn.rows.map(u => u.ue_uuid)]
        );
        for (const row of actResult.rows) {
          await client.query(
            `UPDATE ue_units SET status = 'burned', transferred_at = $1 WHERE ue_uuid = $2`,
            [row.created_at, row.burned_ue_uuid]
          );
          burnedUEs.push({
            ue_uuid: row.burned_ue_uuid,
            ue_number: toBurn.rows.find(u => u.ue_uuid === row.burned_ue_uuid)?.ue_number,
            triad: toBurn.rows.find(u => u.ue_uuid === row.burned_ue_uuid)?.triad,
            actor_ok: row.actor_ok,
            act_id: row.act_id
          });
        }
      }
      await client.query('COMMIT');
      res.json({ success: true, burned_count: burnedUEs.length, burned_ues: burnedUEs, timestamp: nowISO });
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: 'Failed to burn UE units' });
    } finally {
      client.release();
    }
  });
