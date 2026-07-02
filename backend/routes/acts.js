const { Router } = require('express');
const pool = require('../db');
const Canon = require('../core/canon');
const Metronome = require('../core/metronome');
const { selectParentRefs, checkCooldown, updateLastAct } = require('../helpers');
const Grammar = require('../core/grammar-engine');
const { PDA } = require('../../PDA/index');

const pda = new PDA();

module.exports = Router()
  // GET /api/acts — SSOT Inspector
  .get('/api/acts', async (req, res) => {
    try {
      const limit = Math.min(parseInt(req.query.limit) || 20, 100);
      const result = await pool.query(
        'SELECT act_id, act_type, actor_ok, target_ok, payload, refs, merkle_hash, created_at FROM acts_log ORDER BY created_at DESC LIMIT $1',
        [limit]
      );
      res.json({ acts: result.rows, count: result.rows.length });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch acts' });
    }
  })

  // POST /api/acts — create act
  .post('/api/acts', async (req, res) => {
    const { act_type, actor_ok, target_ok, payload } = req.body;
    try {
      const validTypes = Object.values(Canon.ACT_TYPES).concat(['OOK_REGISTER']);
      if (!validTypes.includes(act_type)) return res.status(400).json({ error: 'Invalid act_type' });
      if (!Grammar.isValidOK(actor_ok)) return res.status(400).json({ error: 'Invalid actor_ok format' });
      if (target_ok && !Grammar.isValidOK(target_ok)) return res.status(400).json({ error: 'Invalid target_ok format' });
      if (!payload || typeof payload !== 'object') return res.status(400).json({ error: 'Invalid payload' });

      const cooldownCheck = await checkCooldown(actor_ok, act_type);
      if (!cooldownCheck.allowed) return res.status(429).json(cooldownCheck);

      if (act_type === 'EMISSION') return handleEmission(req, res, actor_ok, payload);
      if (act_type === 'TRANSFER') return handleTransfer(req, res, actor_ok, target_ok, payload);
      if (act_type === 'SUCCESSION') return handleSuccession(req, res, actor_ok, target_ok, payload);
      if (['ORDER_JOIN', 'DEPARTMENT_JOIN', 'UNION_CREATED', 'COUNCIL_CREATED'].includes(act_type)) return handleGovernance(req, res, act_type, actor_ok, target_ok, payload);

      const result = await pool.query(
        `INSERT INTO acts_log (act_type, actor_ok, target_ok, payload) VALUES ($1, $2, $3, $4) RETURNING act_id, created_at`,
        [act_type, actor_ok, target_ok || null, payload]
      );
      res.json({ success: true, act_id: result.rows[0].act_id, created_at: result.rows[0].created_at });
    } catch (err) {
      res.status(500).json({ error: 'Failed to record act' });
    }
  });

async function handleEmission(req, res, actor_ok, payload) {
  try {
    const result = await pda.confirm('PLAN', { ...payload, actor_ok });
    if (!result.success) {
      return res.status(result.preview && result.preview.blocked ? 422 : 400).json({ error: result.error || 'Emission failed' });
    }

    // Map result to legacy API format
    res.json({
      success: true,
      act_id: result.result.act_id,
      created_at: result.result.created_at || new Date().toISOString(),
      ue_units: result.result.ue_numbers.map(num => ({
        ue_number: num,
        triad: result.result.triads[0],
        status: result.preview.ue_status
      })),
      phase: result.preview.phase,
      burn_at: result.preview.burn_at
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handleTransfer(req, res, actor_ok, target_ok, payload) {
  try {
    const result = await pda.confirm('FLOW', { ...payload, actor_ok, target_ok });
    if (!result.success) {
      return res.status(result.preview && result.preview.blocked ? 422 : 400).json({ error: result.error || 'Transfer failed' });
    }

    // Map result to legacy API format
    res.json({
      success: true,
      act_id: result.result.act_id,
      created_at: result.result.transferred_at || new Date().toISOString(),
      ue_transferred: {
        ue_uuid: result.result.ue_uuid,
        ue_number: result.result.ue_number,
        triad: result.result.triad,
        from: result.result.from,
        to: result.result.to
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function handleSuccession(req, res, actor_ok, target_ok, payload) {
  if (!Canon.emissionPolicy.isPredstoyatel(actor_ok)) return res.status(403).json({ error: 'Только Предстоятель может инициировать преемственность' });
  if (!target_ok) return res.status(400).json({ error: 'SUCCESSION requires target_ok' });
  const { reason } = payload;
  if (!reason || typeof reason !== 'string' || reason.trim().length === 0) return res.status(400).json({ error: 'SUCCESSION requires reason' });
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const targetCheck = await client.query('SELECT COUNT(*) as act_count FROM acts_log WHERE actor_ok = $1', [target_ok]);
    if (parseInt(targetCheck.rows[0].act_count) === 0) { await client.query('ROLLBACK'); return res.status(400).json({ error: 'Целевой О.К. не имеет актов в системе' }); }
    const parentRefs = await selectParentRefs(actor_ok, 3);
    const actResult = await client.query(`INSERT INTO acts_log (act_type, actor_ok, target_ok, payload, refs) VALUES ($1, $2, $3, $4, $5) RETURNING act_id, created_at`, ['SUCCESSION', actor_ok, target_ok, { reason: reason.trim(), from: actor_ok, to: target_ok, timestamp: new Date().toISOString() }, parentRefs]);
    await client.query('COMMIT');
    res.json({ success: true, act_id: actResult.rows[0].act_id, created_at: actResult.rows[0].created_at, succession: { from: actor_ok, to: target_ok, reason: reason.trim() }, note: 'Акт SUCCESSION зафиксирован. Смена учётной записи требует ручного вмешательства администратора БД.' });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function handleGovernance(req, res, act_type, actor_ok, target_ok, payload) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    if (act_type === 'ORDER_JOIN' && !payload.order_id) { await client.query('ROLLBACK'); return res.status(400).json({ error: 'ORDER_JOIN requires order_id' }); }
    if (act_type === 'DEPARTMENT_JOIN' && !payload.department_id) { await client.query('ROLLBACK'); return res.status(400).json({ error: 'DEPARTMENT_JOIN requires department_id' }); }
    if (act_type === 'UNION_CREATED' && !payload.union_id) { await client.query('ROLLBACK'); return res.status(400).json({ error: 'UNION_CREATED requires union_id' }); }
    if (act_type === 'COUNCIL_CREATED' && !payload.council_id) { await client.query('ROLLBACK'); return res.status(400).json({ error: 'COUNCIL_CREATED requires council_id' }); }
    const parentRefs = await selectParentRefs(actor_ok, 3);
    const result = await client.query(`INSERT INTO acts_log (act_type, actor_ok, target_ok, payload, refs) VALUES ($1, $2, $3, $4, $5) RETURNING act_id, created_at`, [act_type, actor_ok, target_ok || null, payload, parentRefs]);
    await client.query('COMMIT');
    res.json({ success: true, act_id: result.rows[0].act_id, created_at: result.rows[0].created_at });
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
