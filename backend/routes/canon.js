const { Router } = require('express');
const Canon = require('../core/canon');
const pool = require('../db');
const Metronome = require('../core/metronome');

module.exports = Router()
  // GET /api/canon/limits
  .get('/api/canon/limits', async (req, res) => {
    try {
      const policy = Canon.emissionPolicy.EMISSION_POLICY;
      const baseTriads = Canon.emissionPolicy.getBaseTriads();
      const extTriads = Canon.emissionPolicy.getExtTriads();
      const triadDetails = {};
      baseTriads.concat(extTriads).forEach(t => { if (policy.triads[t]) triadDetails[t] = policy.triads[t]; });
      res.json({
        version: policy.version, stage: policy.stage,
        daily_min: policy.daily.min, daily_max: policy.daily.max,
        silence_window: policy.silence_window, burn_window_hours: policy.burn_window_hours,
        phase_windows: policy.phase_windows, triads: triadDetails,
        base_triads: baseTriads, ext_triads: extTriads,
        t5_evolution: policy.t5_evolution,
        special_roles: {
          initiator: { label: policy.special_roles.initiator.label },
          order_head: { label: policy.special_roles.order_head.label, bonus_ue: policy.special_roles.order_head.bonus_ue },
          department_head: { label: policy.special_roles.department_head.label, bonus_ue: policy.special_roles.department_head.bonus_ue }
        },
        roadmaps: {
          v1_0_01: { label: 'v1.0.01 (Пилот)', active: false },
          v2_0_01: { label: 'v2.0.01 (ГЕГЕМОН)', active: false },
          v3_0_01: { label: 'v3.0.01', active: false },
          v4_0_01: { label: 'v4.0.01 (ОСВОБОЖДЕНИЕ)', active: false }
        }
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to get canon limits' });
    }
  })

  // GET /api/system/health
  .get('/api/system/health', async (req, res) => {
    try {
      const checks = {};
      try { checks.ssot = { status: 'OK', version: Canon.emissionPolicy.EMISSION_POLICY.version, stage: Canon.emissionPolicy.EMISSION_POLICY.stage }; } catch (e) { checks.ssot = { status: 'FAIL', error: e.message }; }
      try {
        const actCheck = await pool.query("SELECT COUNT(*) as cnt FROM acts_log");
        const ueCheck = await pool.query("SELECT COUNT(*) as cnt FROM ue_units");
        checks.replay = { status: 'OK', acts: parseInt(actCheck.rows[0].cnt), ue_units: parseInt(ueCheck.rows[0].cnt) };
      } catch (e) { checks.replay = { status: 'FAIL', error: e.message }; }
      try { checks.metronome = { status: 'OK', phase: Metronome.getCurrentPhase(), isEmissionAllowed: Metronome.isEmissionAllowed(), isTransferAllowed: Metronome.isTransferAllowed() }; } catch (e) { checks.metronome = { status: 'FAIL', error: e.message }; }
      try { checks.canon_layer = { status: 'OK', isValidOK: Canon.isValidOK('::01::') }; } catch (e) { checks.canon_layer = { status: 'FAIL', error: e.message }; }
      try {
        await pool.query('SELECT 1');
        const dbInfo = await pool.query("SELECT COUNT(*) as cnt FROM information_schema.tables WHERE table_schema = 'public'");
        checks.database = { status: 'OK', tables: parseInt(dbInfo.rows[0].cnt) };
      } catch (e) { checks.database = { status: 'FAIL', error: e.message }; }
      const overall = Object.values(checks).every(c => c.status === 'OK') ? 'OK' : 'DEGRADED';
      res.json({ status: overall, checks, timestamp: new Date().toISOString() });
    } catch (err) {
      res.status(500).json({ status: 'ERROR', error: err.message });
    }
  });
