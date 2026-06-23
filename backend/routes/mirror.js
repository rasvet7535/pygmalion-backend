const { Router } = require('express');
const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');
const { determineCyclePhase } = require('../helpers');
const Grammar = require('../core/grammar-engine');

module.exports = Router()
  // GET /api/presence/:ok_id — проекция присутствия (про.3)
  .get('/api/presence/:ok_id', async (req, res) => {
    const { ok_id } = req.params;
    let { window_start } = req.query;
    try {
      if (!Grammar.isValidOK(ok_id)) return res.status(400).json({ error: 'Invalid ok_id format' });
      if (!window_start) window_start = Metronome.getWindowStart();
      const result = await pool.query(
        `SELECT act_type, actor_ok, target_ok, payload FROM acts_log WHERE (actor_ok = $1 OR target_ok = $1) AND act_type IN ('EMISSION', 'TRANSFER') AND created_at >= $2::timestamp`,
        [ok_id, window_start]
      );
      let ue_flow = 0;
      for (const act of result.rows) {
        if (act.act_type === 'EMISSION' && act.actor_ok === ok_id) {
          (act.payload.triads || []).forEach(triad => { ue_flow += (Canon.emissionPolicy.TRIADS[triad] || {}).ueCount || 0; });
        } else if (act.act_type === 'TRANSFER' && act.actor_ok === ok_id) ue_flow -= 1;
        else if (act.act_type === 'TRANSFER' && act.target_ok === ok_id) ue_flow += 1;
      }
      res.json({ ok_id, projection: { ue_flow, window_start } });
    } catch (err) {
      res.status(500).json({ error: 'Failed to compute presence projection' });
    }
  })

  // GET /api/mirror/:ok_id — зеркало присутствия
  .get('/api/mirror/:ok_id', async (req, res) => {
    const { ok_id } = req.params;
    let { window_start } = req.query;
    try {
      if (!Grammar.isValidOK(ok_id)) return res.status(400).json({ error: 'Invalid ok_id format' });
      if (!window_start) window_start = Metronome.getWindowStart();

      const batchQuery = await pool.query(`
        SELECT
          (SELECT COUNT(*) FROM acts_log WHERE actor_ok = $1) AS has_acts,
          (SELECT MAX(created_at) FROM acts_log WHERE actor_ok = $1 OR target_ok = $1) AS last_act_at,
          (SELECT MAX(created_at) FROM acts_log WHERE actor_ok = $1 AND act_type IN ('EMISSION', 'TRANSFER')
           AND created_at > COALESCE((SELECT created_at FROM acts_log WHERE actor_ok = $1 AND act_type = 'THRESHOLD_CROSSED' ORDER BY created_at DESC LIMIT 1), '1970-01-01'::timestamp)) AS last_formed,
          (SELECT MAX(created_at) FROM (
            SELECT created_at FROM acts_log WHERE actor_ok = $1 AND act_type = 'TRANSFER'
            UNION ALL
            SELECT al.created_at FROM annotations aa JOIN acts_log al ON aa.act_ref_id = al.act_id WHERE aa.author_ok = $1 AND aa.annotation_type = 'RECOGNITION'
          ) AS significant_acts) AS last_significant,
          (SELECT MAX(created_at) FROM acts_log WHERE actor_ok = $1 AND act_type = 'BURNED' AND created_at >= $2::timestamp) AS last_burn_at,
          (SELECT COUNT(*) FROM acts_log WHERE actor_ok = $1 AND act_type = 'BURNED' AND created_at >= $2::timestamp) AS burned_recently,
          (SELECT COUNT(*) FILTER (WHERE act_type = 'EMISSION' AND actor_ok = $1)) AS emissions,
          (SELECT COUNT(*) FILTER (WHERE act_type = 'TRANSFER' AND actor_ok = $1)) AS transfers_out,
          (SELECT COUNT(*) FILTER (WHERE act_type = 'TRANSFER' AND target_ok = $1)) AS transfers_in,
          (SELECT COUNT(*) FILTER (WHERE act_type = 'BURNED' AND actor_ok = $1)) AS burned_in_window,
          (SELECT EXISTS(SELECT 1 FROM annotations aa JOIN acts_log al ON aa.act_ref_id = al.act_id WHERE (al.actor_ok = $1 OR al.target_ok = $1) AND aa.annotation_type = 'RECOGNITION' AND aa.author_ok != $1)) AS received_um,
          (SELECT EXISTS(SELECT 1 FROM acts_log WHERE actor_ok = $1 AND act_type = 'TRANSFER')) AS sent_ue
      `, [ok_id, window_start]);

      const bq = batchQuery.rows[0];
      if (parseInt(bq.has_acts) === 0) {
        return res.json(buildAbsoluteZero(ok_id, window_start, 'no_acts'));
      }
      if (bq.last_significant) {
        const inactivity_days = (Date.now() - new Date(bq.last_significant).getTime()) / 86400000;
        if (inactivity_days >= 90) return res.json(buildAbsoluteZero(ok_id, window_start, 'inactivity_90_days', bq.last_significant, inactivity_days));
      }

      const presenceResult = await pool.query(
        `SELECT act_type, actor_ok, target_ok, payload FROM acts_log WHERE (actor_ok = $1 OR target_ok = $1) AND act_type IN ('EMISSION', 'TRANSFER') AND created_at >= $2::timestamp`,
        [ok_id, window_start]
      );
      let ue_flow = 0;
      for (const act of presenceResult.rows) {
        if (act.act_type === 'EMISSION' && act.actor_ok === ok_id) {
          (act.payload.triads || []).forEach(triad => { ue_flow += (Canon.emissionPolicy.TRIADS[triad] || {}).ueCount || 0; });
        } else if (act.act_type === 'TRANSFER' && act.actor_ok === ok_id) ue_flow -= 1;
        else if (act.act_type === 'TRANSFER' && act.target_ok === ok_id) ue_flow += 1;
      }

      const last_act_at = bq.last_act_at;
      const silence_hours = last_act_at ? Metronome.calculateSilence(last_act_at) : null;
      const last_burn_at = bq.last_burn_at;
      const burned_recently = parseInt(bq.burned_recently);

      const recognitionResult = await pool.query(
        `SELECT aa.payload->>'marker_type' AS marker_type, aa.payload->>'marker_text' AS marker_text, aa.payload->>'witness_scope' AS witness_scope, aa.payload->>'triad_link' AS triad_link, aa.payload->>'intensity' AS intensity, aa.author_ok, aa.created_at FROM annotations aa JOIN acts_log al ON aa.act_ref_id = al.act_id WHERE (al.actor_ok = $1 OR al.target_ok = $1) AND aa.annotation_type = 'RECOGNITION' AND aa.author_ok != $1 AND aa.created_at >= $2::timestamp ORDER BY aa.created_at DESC LIMIT 10`,
        [ok_id, window_start]
      );
      const recent_markers = recognitionResult.rows.map(r => ({ type: r.marker_type, text: r.marker_text, witness_scope: r.witness_scope, triad_link: r.triad_link, intensity: r.intensity ? parseInt(r.intensity) : null, from: r.author_ok, at: r.created_at }));

      const d = bq;
      const directions = { given: { count: parseInt(d.emissions) + parseInt(d.transfers_out), direction: 'outward' }, received: { count: parseInt(d.transfers_in), direction: 'inward' }, burned: { count: parseInt(d.burned_in_window), direction: 'release' } };

      const recogAggResult = await pool.query(`
        SELECT
          COUNT(DISTINCT rde.edge_id) > 0 AS has_witnesses,
          COUNT(DISTINCT rde.meta->>'witness_scope') AS scope_diversity,
          ARRAY_AGG(DISTINCT rde.meta->>'witness_scope') FILTER (WHERE rde.meta->>'witness_scope' IS NOT NULL) AS scopes,
          ARRAY_AGG(DISTINCT rde.meta->>'triad_link') FILTER (WHERE rde.meta->>'triad_link' IS NOT NULL) AS triad_coverage,
          COUNT(DISTINCT rde.edge_id) AS recognition_links,
          COUNT(DISTINCT al_rec.actor_ok) AS unique_witnesses
        FROM ro_dag_edges rde
        JOIN acts_log al ON rde.to_act_id = al.act_id
        LEFT JOIN acts_log al_rec ON rde.from_act_id = al_rec.act_id
        WHERE al.actor_ok = $1 AND rde.edge_type = 'RECOGNITION' AND rde.created_at >= $2::timestamp
      `, [ok_id, window_start]);
      const rg = recogAggResult.rows[0];
      const recognition_field = { has_witnesses: rg.has_witnesses || false, diversity: { personal: (rg.scopes || []).includes('personal'), observation: (rg.scopes || []).includes('observation'), indirect: (rg.scopes || []).includes('indirect') }, triad_coverage: rg.triad_coverage || [], multi_source: (rg.scope_diversity || 0) > 1, cross_triad: (rg.triad_coverage || []).length > 1 };
      const recognition_links = parseInt(rg.recognition_links) || 0;
      const unique_witnesses = parseInt(rg.unique_witnesses) || 0;
      let density_hint = 'sparse';
      if (recognition_links >= 20) density_hint = 'dense';
      else if (recognition_links >= 6) density_hint = 'forming';
      const graph = { recognition_links, unique_witnesses, density_hint };

      const total_connections = recognition_links + directions.given.count + directions.received.count;
      let connections = 'sparse';
      if (total_connections >= 30) connections = 'dense';
      else if (total_connections >= 10) connections = 'woven';
      let activity = 'quiet';
      const recent_acts_count = directions.given.count + directions.received.count;
      if (silence_hours !== null && silence_hours < 24 && recent_acts_count >= 5) activity = 'resonant';
      else if (silence_hours !== null && silence_hours < 72 && recent_acts_count >= 2) activity = 'active';
      const field = { connections, activity };

      const ro_dag_status = { received_um: bq.received_um || false, sent_ue: bq.sent_ue || false, in_tree: (bq.received_um || false) && (bq.sent_ue || false) };

      const mirrorData = { trace: { last_act_at, silence_hours: silence_hours !== null ? parseFloat(silence_hours.toFixed(1)) : null }, ro_dag_status, ue_flow, directions, burn: { last_burn_at, burned_recently, burn_echo: null } };
      const cycle = await determineCyclePhase(ok_id, mirrorData);

      res.json({
        ok_id, presence: { ue_flow, window_start, ro_dag_status },
        trace: { last_act_at, silence_hours: silence_hours !== null ? parseFloat(silence_hours.toFixed(1)) : null },
        burn: { last_burn_at, burned_recently },
        recognition: { recent_markers },
        recognition_field, graph, directions, field, cycle
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to compute mirror projection' });
    }
  });

function buildAbsoluteZero(ok_id, window_start, reason, last_activity, inactivity_days) {
  const base = {
    ok_id, state: 'absolute_zero', reason,
    presence: { ue_flow: 0, window_start },
    trace: { last_act_at: null, silence_hours: null },
    burn: { last_burn_at: null, burned_recently: 0 },
    recognition: { recent_markers: [] },
    recognition_field: { has_witnesses: false, diversity: { personal: false, observation: false, indirect: false }, triad_coverage: [], multi_source: false, cross_triad: false },
    graph: { recognition_links: 0, unique_witnesses: 0, density_hint: 'sparse' },
    directions: { given: { count: 0, direction: 'outward' }, received: { count: 0, direction: 'inward' }, burned: { count: 0, direction: 'release' } },
    field: { connections: 'sparse', activity: 'quiet' }
  };
  if (last_activity) {
    base.last_activity_at = last_activity;
    base.inactivity_days = parseFloat(inactivity_days.toFixed(1));
    base.trace.last_act_at = last_activity;
    base.trace.silence_hours = parseFloat((inactivity_days * 24).toFixed(1));
  }
  return base;
}
