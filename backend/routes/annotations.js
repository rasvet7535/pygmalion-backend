const { Router } = require('express');
const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');
const { checkCooldown, updateLastAct } = require('../helpers');
const Grammar = require('../core/grammar-engine');

module.exports = Router()
  .post('/api/annotations', async (req, res) => {
    const { act_ref_id, author_ok, annotation_type, payload, value } = req.body;
    try {
      if (!act_ref_id) return res.status(400).json({ error: 'act_ref_id required' });
      if (!Grammar.isValidOK(author_ok)) return res.status(400).json({ error: 'Invalid author_ok' });

      if (annotation_type === 'RECOGNITION') {
        const cooldownCheck = await checkCooldown(author_ok, 'RECOGNITION');
        if (!cooldownCheck.allowed) return res.status(429).json(cooldownCheck);

        if (!payload || typeof payload !== 'object') return res.status(400).json({ error: 'RECOGNITION requires payload' });
        const { marker_type, marker_text, witness_scope, triad_link, intensity } = payload;
        const validMarkerTypes = ['value', 'gratitude', 'alignment', 'witness', 'support'];
        if (!marker_type || !validMarkerTypes.includes(marker_type)) return res.status(400).json({ error: `Invalid marker_type. Must be one of: ${validMarkerTypes.join(', ')}` });
        if (!marker_text || typeof marker_text !== 'string') return res.status(400).json({ error: 'marker_text required (string)' });
        if (marker_text.length > 280) return res.status(400).json({ error: 'marker_text must be <= 280 characters' });

        const isPredstoyatel = Canon.emissionPolicy.isPredstoyatel(author_ok);
        const maxUMPerDay = isPredstoyatel ? 16 : 10;
        const window_start = Metronome.getWindowStart();
        const umCount = await pool.query("SELECT COUNT(*) as um_count FROM annotations WHERE author_ok = $1 AND annotation_type = 'RECOGNITION' AND created_at >= $2::timestamp", [author_ok, window_start]);
        if ((parseInt(umCount.rows[0].um_count) || 0) >= maxUMPerDay) return res.status(400).json({ error: `Превышен лимит ${maxUMPerDay} У.М. на период.` });

        const validWitnessScopes = ['personal', 'observation', 'indirect'];
        if (!witness_scope || !validWitnessScopes.includes(witness_scope)) return res.status(400).json({ error: `witness_scope required. Must be one of: ${validWitnessScopes.join(', ')}` });
        if (triad_link && !Object.keys(Canon.emissionPolicy.TRIADS).includes(triad_link)) return res.status(400).json({ error: `Invalid triad_link: ${triad_link}.` });
        if (intensity !== undefined && (typeof intensity !== 'number' || intensity < 1 || intensity > 3)) return res.status(400).json({ error: 'intensity must be 1, 2, or 3' });

        const actCheck = await pool.query('SELECT actor_ok FROM acts_log WHERE act_id = $1', [act_ref_id]);
        if (actCheck.rows.length === 0) return res.status(404).json({ error: 'act_ref_id not found' });
        const actor_ok = actCheck.rows[0].actor_ok;
        if (author_ok === actor_ok) return res.status(400).json({ error: 'Нельзя признавать самого себя' });

        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const recAct = await client.query(`INSERT INTO acts_log (act_type, actor_ok, target_ok, payload) VALUES ('RECOGNITION', $1, $2, $3) RETURNING act_id, created_at`, [author_ok, actor_ok, { marker_type, marker_text, witness_scope, triad_link, act_ref_id }]);
          const annResult = await client.query(`INSERT INTO annotations (act_ref_id, author_ok, annotation_type, payload) VALUES ($1, $2, $3, $4) RETURNING annotation_id`, [act_ref_id, author_ok, annotation_type, payload]);
          await client.query(`INSERT INTO ro_dag_edges (from_act_id, to_act_id, edge_type, meta) VALUES ($1, $2, 'RECOGNITION', $3)`, [recAct.rows[0].act_id, act_ref_id, { witness_scope, triad_link, marker_type }]);
          await client.query('COMMIT');
          await updateLastAct(author_ok, 'RECOGNITION');
          res.json({ success: true, annotation_id: annResult.rows[0].annotation_id, recognition_act_id: recAct.rows[0].act_id, created_at: recAct.rows[0].created_at });
        } catch (err) {
          await client.query('ROLLBACK');
          throw err;
        } finally {
          client.release();
        }
      } else {
        const result = await pool.query(`INSERT INTO annotations (act_ref_id, author_ok, annotation_type, value, payload) VALUES ($1, $2, $3, $4, $5) RETURNING annotation_id, created_at`, [act_ref_id, author_ok, annotation_type, value || null, payload || {}]);
        res.json({ success: true, annotation_id: result.rows[0].annotation_id });
      }
    } catch (err) {
      if (err.code === '23505' && err.constraint === 'idx_unique_recognition') return res.status(400).json({ error: 'Вы уже оставили этот тип признания для данного акта' });
      res.status(500).json({ error: 'Failed to add annotation' });
    }
  });
