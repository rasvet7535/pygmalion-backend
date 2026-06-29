#!/usr/bin/env node

/**
 * CI Seed — Deterministic test data for Replay verification
 *
 * Inserts minimal acts_log + ue_units so replay-core.js can verify
 * reconstruction from acts_log (SSOT).
 *
 * Usage: DATABASE_URL=postgresql://... node tools/ci-seed.js
 */

const { Pool } = require('pg');
const crypto = require('crypto');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const ACTORS = ['::CIUSER::', '::CITARGET::'];
const NOW = new Date('2026-06-27T12:00:00Z');
const BURN_AT = new Date('2026-06-28T00:00:00Z');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function _generateUeUuid(actId, ueNumber) {
  const hash = crypto.createHash('md5')
    .update(`${actId}:${ueNumber}`)
    .digest('hex');
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    hash.substring(12, 16),
    hash.substring(16, 20),
    hash.substring(20)
  ].join('-');
}

async function seed() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Create actors
    for (const ok of ACTORS) {
      await client.query(
        'INSERT INTO ok_identity (ok_key, created_at) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [ok, NOW]
      );
    }

    // 2. EMISSION: 3 R.U. in T1 (ue 1,2,3) for CIUSER
    const emissionActId = uuid();
    await client.query(
      `INSERT INTO acts_log (act_id, act_type, actor_ok, payload, created_at)
       VALUES ($1, 'EMISSION', $2, $3, $4)`,
      [emissionActId, '::CIUSER::', JSON.stringify({
        triads: ['T1'],
        ueNumbers: [1, 2, 3],
        burnAt: BURN_AT.toISOString(),
        phase: 'active',
        totalUE: 3
      }), NOW]
    );

    // Create ue_units for this emission
    const ueUuids = [];
    for (const num of [1, 2, 3]) {
      const ueId = _generateUeUuid(emissionActId, num);
      ueUuids.push(ueId);
      await client.query(
        `INSERT INTO ue_units (ue_uuid, ue_number, triad, actor_ok, status, created_at, burn_at, emission_act_id)
         VALUES ($1, $2, 'T1', $3, 'active', $4, $5, $6)`,
        [ueId, num, '::CIUSER::', NOW, BURN_AT, emissionActId]
      );
    }

    // 3. TRANSFER: ue_uuid[0] (ue 1) from CIUSER to CITARGET
    const transferActId = uuid();
    await client.query(
      `INSERT INTO acts_log (act_id, act_type, actor_ok, target_ok, payload, created_at)
       VALUES ($1, 'TRANSFER', $2, $3, $4, $5)`,
      [transferActId, '::CIUSER::', '::CITARGET::', JSON.stringify({
        ue_uuid: ueUuids[0],
        ue_number: 1,
        triad: 'T1'
      }), new Date(NOW.getTime() + 60000)]
    );

    await client.query(
      `UPDATE ue_units SET status = 'transferred', actor_ok = $1, transferred_at = $2, transfer_act_id = $3
       WHERE ue_uuid = $4`,
      ['::CITARGET::', new Date(NOW.getTime() + 60000), transferActId, ueUuids[0]]
    );

    // 4. BURNED: ue_uuid[2] (ue 3) burned
    const burnedActId = uuid();
    await client.query(
      `INSERT INTO acts_log (act_id, act_type, actor_ok, payload, created_at)
       VALUES ($1, 'BURNED', $2, $3, $4)`,
      [burnedActId, '::CIUSER::', JSON.stringify({
        ue_uuid: ueUuids[2],
        ue_number: 3,
        triad: 'T1',
        burn_at: BURN_AT.toISOString()
      }), new Date(NOW.getTime() + 120000)]
    );

    await client.query(
      `UPDATE ue_units SET status = 'burned', transferred_at = $1
       WHERE ue_uuid = $2`,
      [new Date(NOW.getTime() + 120000), ueUuids[2]]
    );

    await client.query('COMMIT');

    const acts = await client.query('SELECT COUNT(*) FROM acts_log');
    const units = await client.query('SELECT COUNT(*) FROM ue_units');
    console.log(`Seeded: ${acts.rows[0].count} acts, ${units.rows[0].count} ue_units`);

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
