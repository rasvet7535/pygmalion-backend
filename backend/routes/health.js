const { Router } = require('express');
const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');

module.exports = Router()
  // GET /health
  .get('/health', async (req, res) => {
    try {
      await pool.query('SELECT 1');
      res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
    } catch (error) {
      res.status(503).json({ status: 'error', db: 'disconnected', error: error.message, timestamp: new Date().toISOString() });
    }
  })

  // GET /metrics (Prometheus)
  .get('/metrics', async (req, res) => {
    try {
      const activeOK = await pool.query("SELECT COUNT(*) as cnt FROM ok_identity WHERE last_act_at IS NOT NULL");
      const umTotal = await pool.query("SELECT COUNT(*) as cnt FROM ue_units WHERE status = 'transferred'");
      const actsToday = await pool.query("SELECT COUNT(*) as cnt FROM acts_log WHERE created_at >= NOW() - INTERVAL '24 hours'");
      const ueEmitted = await pool.query("SELECT COALESCE(SUM((payload->>'total_ue')::int), 0) as cnt FROM acts_log WHERE act_type = 'EMISSION' AND created_at >= NOW() - INTERVAL '24 hours'");
      const ueBurned = await pool.query("SELECT COUNT(*) as cnt FROM ue_units WHERE status = 'burned' AND burned_at >= NOW() - INTERVAL '24 hours'");
      let m = '# HELP pygmalion_active_ok_count Active OK count\n# TYPE pygmalion_active_ok_count gauge\n';
      m += `pygmalion_active_ok_count ${activeOK.rows[0].cnt}\n`;
      m += '# HELP pygmalion_um_total Total UM count\n# TYPE pygmalion_um_total gauge\n';
      m += `pygmalion_um_total ${umTotal.rows[0].cnt}\n`;
      m += '# HELP pygmalion_acts_total Total acts in 24h\n# TYPE pygmalion_acts_total counter\n';
      m += `pygmalion_acts_total ${actsToday.rows[0].cnt}\n`;
      m += '# HELP pygmalion_ue_emitted_total UE emitted in 24h\n# TYPE pygmalion_ue_emitted_total counter\n';
      m += `pygmalion_ue_emitted_total ${ueEmitted.rows[0].cnt}\n`;
      m += '# HELP pygmalion_ue_burned_total UE burned in 24h\n# TYPE pygmalion_ue_burned_total counter\n';
      m += `pygmalion_ue_burned_total ${ueBurned.rows[0].cnt}\n`;
      res.set('Content-Type', 'text/plain; charset=utf-8');
      res.send(m);
    } catch (error) {
      res.status(500).send('# ERROR collecting metrics\n');
    }
  });
