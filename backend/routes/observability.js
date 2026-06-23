const { Router } = require('express');
const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');
const { PDA } = require('../../PDA/index');

const pda = new PDA();

module.exports = Router()
  .get('/api/replay/status', async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT COUNT(*)::int as acts_count,
                COALESCE(MAX(created_at)::text, 'never') as last_act,
                (SELECT COUNT(*)::int FROM acts_log WHERE created_at >= NOW() - INTERVAL '24 hours') as acts_24h
         FROM acts_log`
      );
      res.json({ status: 'ok', ...result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message, status: 'error' });
    }
  })

  .get('/api/metronome/phase', (req, res) => {
    res.json({
      phase: Metronome.getCurrentPhase(),
      time: Metronome.getCurrentTimeISO(),
      window_start: Metronome.getWindowStart(),
      next_midnight: new Date(Metronome.getNextMidnightUTC()).toISOString(),
      emission_allowed: Metronome.isEmissionAllowed(),
      transfer_allowed: Metronome.isTransferAllowed(),
    });
  })

  .get('/api/canon/version', (req, res) => {
    res.json({
      canon_version: Canon.CANON_VERSION,
      emission_policy_version: Canon.emissionPolicy.EMISSION_POLICY.version,
      daily_limits: {
        min: Canon.emissionPolicy.EMISSION_POLICY.daily.min,
        max: Canon.emissionPolicy.EMISSION_POLICY.daily.max,
      },
      phase_windows: Canon.emissionPolicy.EMISSION_POLICY.phase_windows,
      silence_window: Canon.emissionPolicy.EMISSION_POLICY.silence_window,
    });
  })

  .get('/api/ssot/recent', async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const result = await pool.query(
        `SELECT act_id, act_type, actor_ok, payload, refs, created_at
         FROM acts_log ORDER BY created_at DESC LIMIT $1`,
        [limit]
      );
      res.json({ acts: result.rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  .get('/api/agent/status', (req, res) => {
    res.json(pda.getStatus());
  });
