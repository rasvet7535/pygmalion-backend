const { Router } = require('express');
const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');
const Grammar = require('../core/grammar-engine');

module.exports = Router()
  .get('/api/field/:ok_id', async (req, res) => {
    const { ok_id } = req.params;
    try {
      if (!Grammar.isValidOK(ok_id)) return res.status(400).json({ error: 'Invalid ok_id format' });
      const window_start = Metronome.getWindowStart();

      const nodesResult = await pool.query(
        `SELECT DISTINCT ok_key FROM (SELECT actor_ok AS ok_key FROM acts_log WHERE (actor_ok = $1 OR target_ok = $1) AND created_at >= $2::timestamp UNION SELECT target_ok AS ok_key FROM acts_log WHERE (actor_ok = $1 OR target_ok = $1) AND target_ok IS NOT NULL AND created_at >= $2::timestamp) AS all_oks`,
        [ok_id, window_start]
      );
      const nodeKeys = nodesResult.rows.map(r => r.ok_key);
      const nodes = [];
      if (nodeKeys.length > 0) {
        const dagBatch = await pool.query(`
          SELECT
            n.ok_key,
            EXISTS(SELECT 1 FROM annotations aa JOIN acts_log al ON aa.act_ref_id = al.act_id WHERE (al.actor_ok = n.ok_key OR al.target_ok = n.ok_key) AND aa.annotation_type = 'RECOGNITION' AND aa.author_ok != n.ok_key) AS received_um,
            EXISTS(SELECT 1 FROM acts_log WHERE actor_ok = n.ok_key AND act_type = 'TRANSFER') AS sent_ue
          FROM (SELECT unnest($3::text[]) AS ok_key) n
        `, [ok_id, window_start, nodeKeys]);
        for (const row of dagBatch.rows) {
          nodes.push({ ok_id: row.ok_key, ro_dag_status: { received_um: row.received_um || false, sent_ue: row.sent_ue || false, in_tree: (row.received_um || false) && (row.sent_ue || false) } });
        }
      }

      const edgesResult = await pool.query(
        `SELECT rde.edge_id, rde.edge_type, rde.meta, al_from.actor_ok AS from_ok, al_to.actor_ok AS to_ok, al_to.target_ok AS to_target_ok, rde.created_at FROM ro_dag_edges rde JOIN acts_log al_from ON rde.from_act_id = al_from.act_id JOIN acts_log al_to ON rde.to_act_id = al_to.act_id WHERE (al_from.actor_ok = $1 OR al_to.actor_ok = $1 OR al_to.target_ok = $1) AND rde.created_at >= $2::timestamp`,
        [ok_id, window_start]
      );
      const edges = edgesResult.rows.map(r => ({ edge_id: r.edge_id, edge_type: r.edge_type, from_ok: r.from_ok, to_ok: r.to_target_ok || r.to_ok, meta: r.meta || {}, created_at: r.created_at }));

      const actsResult = await pool.query(
        `SELECT act_id, act_type, actor_ok, target_ok, created_at FROM acts_log WHERE (actor_ok = $1 OR target_ok = $1) AND created_at >= $2::timestamp ORDER BY created_at DESC LIMIT 100`,
        [ok_id, window_start]
      );
      const acts = actsResult.rows.map(r => ({ act_id: r.act_id, act_type: r.act_type, actor_ok: r.actor_ok, target_ok: r.target_ok, created_at: r.created_at }));

      const markersResult = await pool.query(
        `SELECT aa.annotation_id, aa.act_ref_id, aa.author_ok, aa.payload->>'marker_type' AS marker_type, aa.payload->>'marker_text' AS marker_text, aa.payload->>'witness_scope' AS witness_scope, aa.payload->>'triad_link' AS triad_link, aa.created_at, al.actor_ok AS act_actor_ok, al.target_ok AS act_target_ok FROM annotations aa JOIN acts_log al ON aa.act_ref_id = al.act_id WHERE (al.actor_ok = $1 OR al.target_ok = $1) AND aa.annotation_type = 'RECOGNITION' AND aa.created_at >= $2::timestamp ORDER BY aa.created_at DESC LIMIT 50`,
        [ok_id, window_start]
      );
      const markers = markersResult.rows.map(r => ({ annotation_id: r.annotation_id, act_ref_id: r.act_ref_id, author_ok: r.author_ok, marker_type: r.marker_type, marker_text: r.marker_text, witness_scope: r.witness_scope, triad_link: r.triad_link, act_actor_ok: r.act_actor_ok, act_target_ok: r.act_target_ok, created_at: r.created_at }));

      const dirResult = await pool.query(
        `SELECT COUNT(*) FILTER (WHERE act_type = 'EMISSION' AND actor_ok = $1) AS emissions, COUNT(*) FILTER (WHERE act_type = 'TRANSFER' AND actor_ok = $1) AS transfers_out, COUNT(*) FILTER (WHERE act_type = 'TRANSFER' AND target_ok = $1) AS transfers_in, COUNT(*) FILTER (WHERE act_type = 'BURNED' AND actor_ok = $1) AS burned FROM acts_log WHERE (actor_ok = $1 OR target_ok = $1) AND created_at >= $2::timestamp`,
        [ok_id, window_start]
      );
      const d = dirResult.rows[0];
      const directions = { given: { count: parseInt(d.emissions) + parseInt(d.transfers_out), direction: 'outward' }, received: { count: parseInt(d.transfers_in), direction: 'inward' }, burned: { count: parseInt(d.burned), direction: 'release' } };

      const recognition_links = edges.filter(e => e.edge_type === 'RECOGNITION').length;
      const total_connections = recognition_links + directions.given.count + directions.received.count;
      let connections = 'sparse';
      if (total_connections >= 30) connections = 'dense';
      else if (total_connections >= 10) connections = 'woven';

      const lastActResult = await pool.query('SELECT created_at FROM acts_log WHERE actor_ok = $1 ORDER BY created_at DESC LIMIT 1', [ok_id]);
      let activity = 'quiet';
      if (lastActResult.rows.length > 0) {
        const silence_hours = (Date.now() - new Date(lastActResult.rows[0].created_at).getTime()) / 3600000;
        const recent_acts_count = directions.given.count + directions.received.count;
        if (silence_hours < 24 && recent_acts_count >= 5) activity = 'resonant';
        else if (silence_hours < 72 && recent_acts_count >= 2) activity = 'active';
      }

      const trace = await buildTrace(ok_id);

      if (trace.state === 'absolute_zero') {
        return res.json({
          version: '0.4.0-alpha', generated_at: new Date().toISOString(), ok_id, window_start,
          state: 'absolute_zero', reason: trace.reason,
          nodes: [], edges: [], acts: [], markers: [],
          directions: { given: { count: 0, direction: 'outward' }, received: { count: 0, direction: 'inward' }, burned: { count: 0, direction: 'release' } },
          field: { connections: 'sparse', activity: 'quiet' },
          trace: { last_act_at: null, silence_hours: null, face_window: 'silent', form_hint: 'emerging', burn_echo: { active: false, phase: 'release' } }
        });
      }

      res.json({
        version: '0.4.0-alpha', generated_at: new Date().toISOString(), ok_id, window_start,
        nodes, edges, acts, markers, directions,
        field: { connections, activity },
        trace
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to compute field data' });
    }
  });

async function buildTrace(ok_id) {
  const batchResult = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM acts_log WHERE actor_ok = $1 AND act_type IN ('EMISSION', 'TRANSFER')
       AND created_at > COALESCE((SELECT created_at FROM acts_log WHERE actor_ok = $1 AND act_type = 'THRESHOLD_CROSSED' ORDER BY created_at DESC LIMIT 1), '1970-01-01'::timestamp)) AS formed_count,
      (SELECT MAX(created_at) FROM (
        SELECT created_at FROM acts_log WHERE actor_ok = $1 AND act_type = 'TRANSFER'
        UNION ALL
        SELECT al.created_at FROM annotations aa JOIN acts_log al ON aa.act_ref_id = al.act_id WHERE aa.author_ok = $1 AND aa.annotation_type = 'RECOGNITION'
      ) AS significant_acts) AS last_activity,
      (SELECT created_at FROM acts_log WHERE actor_ok = $1 ORDER BY created_at DESC LIMIT 1) AS last_act_at
  `, [ok_id]);

  const br = batchResult.rows[0];
  if (parseInt(br.formed_count) === 0) {
    return { state: 'absolute_zero', reason: 'no_formed_acts' };
  }
  if (br.last_activity) {
    const inactivity_days = (Date.now() - new Date(br.last_activity).getTime()) / 86400000;
    if (inactivity_days >= 90) {
      return { state: 'absolute_zero', reason: 'inactivity_90_days', last_activity_at: br.last_activity, inactivity_days: parseFloat(inactivity_days.toFixed(1)) };
    }
  }

  const lastBurnResult = await pool.query("SELECT created_at FROM acts_log WHERE act_type = 'BURNED' ORDER BY created_at DESC LIMIT 1");
  let burn_echo = { active: false, phase: 'release' };
  if (lastBurnResult.rows.length > 0) {
    const burn_hours_ago = (Date.now() - new Date(lastBurnResult.rows[0].created_at).getTime()) / 3600000;
    if (burn_hours_ago <= 1) burn_echo.active = true;
  }

  const dagResult = await pool.query(`
    SELECT
      COUNT(DISTINCT rde.edge_id) FILTER (WHERE rde.edge_type IN ('RECOGNITION', 'FLOW')) AS confirmed_edges,
      COUNT(DISTINCT CONCAT(al_from.actor_ok, '-', al_to.actor_ok)) AS unique_connections,
      MIN(rde.created_at) AS first_edge_at,
      MAX(rde.created_at) AS last_edge_at,
      (SELECT COUNT(*) FROM (
        SELECT CONCAT(al_from2.actor_ok, '-', al_to2.actor_ok) AS connection, COUNT(*) AS cnt
        FROM ro_dag_edges rde2
        JOIN acts_log al_from2 ON rde2.from_act_id = al_from2.act_id
        JOIN acts_log al_to2 ON rde2.to_act_id = al_to2.act_id
        WHERE (al_from2.actor_ok = $1 OR al_to2.actor_ok = $1) AND rde2.edge_type IN ('RECOGNITION', 'FLOW')
        GROUP BY connection HAVING COUNT(*) > 1
      ) AS repeating) AS repeating_count
    FROM ro_dag_edges rde
    JOIN acts_log al_from ON rde.from_act_id = al_from.act_id
    JOIN acts_log al_to ON rde.to_act_id = al_to.act_id
    WHERE al_from.actor_ok = $1 OR al_to.actor_ok = $1
  `, [ok_id]);
  const ds = dagResult.rows[0];
  const confirmed_edges = parseInt(ds.confirmed_edges) || 0;
  const repeating_count = parseInt(ds.repeating_count) || 0;
  const structure_stable_hours = ds.last_edge_at ? (Date.now() - new Date(ds.last_edge_at).getTime()) / 3600000 : null;

  let trace = { last_act_at: null, silence_hours: null, face_window: 'silent', form_hint: 'emerging', burn_echo };
  if (br.last_act_at) {
    const last_act_at = br.last_act_at;
    const silence_hours = (Date.now() - new Date(last_act_at).getTime()) / 3600000;
    let face_window = 'silent';
    if (silence_hours < 4) face_window = 'alive';
    else if (silence_hours < 28) face_window = 'cooling';
    let form_hint = 'emerging';
    if (confirmed_edges >= 3 && repeating_count > 0) form_hint = 'steady';
    if (structure_stable_hours !== null && structure_stable_hours >= 120 && confirmed_edges >= 3) form_hint = 'settled';
    trace = { last_act_at, silence_hours: parseFloat(silence_hours.toFixed(1)), face_window, form_hint, burn_echo };
  }
  return trace;
}
