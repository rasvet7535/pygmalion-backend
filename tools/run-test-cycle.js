const http = require('http');
const { Pool } = require('pg');

const API = 'http://127.0.0.1:3000';
const pool = new Pool({ connectionString: 'postgresql://pygmalion:pygmalion_secret_2026@postgres-test:5432/pygmalion_v041_test' });

function post(endpoint, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const url = new URL(API + endpoint);
    const req = http.request({
      hostname: url.hostname, port: url.port, path: url.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function get(endpoint) {
  return new Promise((resolve, reject) => {
    const url = new URL(API + endpoint);
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); } });
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log('=== CONTROLLED CIRCULATION TEST ===\n');

  // Wait for API
  for (let i = 0; i < 30; i++) {
    try {
      const h = await get('/health');
      if (h.status === 'ok') { console.log('API ready\n'); break; }
    } catch(e) {}
    await sleep(1000);
  }

  // === PHASE 0: Gestation ===
  console.log('=== PHASE 0: Gestation ===');
  const keys = ['::ТЕСТ1::', '::ТЕСТ2::', '::ТЕСТ3::', '::ТЕСТ4::', '::ТЕСТ5::', '::OP𝕯EH 𝕯AP::'];
  for (const k of keys) {
    const r = await post('/api/threshold', { ok_key: k });
    console.log(`  ${k}: ${r.success ? '✅' : '❌'} ${r.message || r.error}`);
  }

  await pool.query("UPDATE ok_identity SET last_act_at = NULL, last_act_type = NULL");
  console.log('  Cooldowns bypassed\n');

  // === PHASE 1: Emission ===
  console.log('=== PHASE 1: Emission ===');
  const emissions = [
    { actor: '::ТЕСТ2::', triads: ['T1'] },
    { actor: '::ТЕСТ3::', triads: ['T2'] },
    { actor: '::ТЕСТ4::', triads: ['T3'] },
    { actor: '::ТЕСТ5::', triads: ['T4', 'T5'] },
    { actor: '::OP𝕯EH 𝕯AP::', triads: ['T1', 'T2', 'T3', 'T4', 'T5'] },
  ];
  for (const em of emissions) {
    const r = await post('/api/acts', { act_type: 'EMISSION', actor_ok: em.actor, payload: { triads: em.triads } });
    console.log(`  ${em.actor}: ${r.success ? '✅' : '❌'} ${r.ue_units ? r.ue_units.length + ' У.Е.' : (r.error || '')}`);
    await sleep(200);
  }

  const allActive = await pool.query("SELECT ue_uuid, ue_number, triad, actor_ok FROM ue_units WHERE status = 'active'");
  console.log(`  Total active У.Е.: ${allActive.rows.length}`);
  
  // Build ueMap: actor_ok-ue_number → ue_uuid (only active)
  const ueMap = {};
  for (const ue of allActive.rows) {
    ueMap[`${ue.actor_ok}-${ue.ue_number}`] = ue.ue_uuid;
  }
  console.log('');

  // === PHASE 2: Transfer ===
  console.log('=== PHASE 2: Transfer ===');

  // Primary transfers: ::OP𝕯EH 𝕯AP:: → test keys
  const primaryTransfers = [
    { from: '::OP𝕯EH 𝕯AP::', to: '::ТЕСТ2::', nums: [1, 2, 3] },
    { from: '::OP𝕯EH 𝕯AP::', to: '::ТЕСТ3::', nums: [4, 5, 6] },
    { from: '::OP𝕯EH 𝕯AP::', to: '::ТЕСТ4::', nums: [7, 8, 9] },
  ];
  for (const t of primaryTransfers) {
    for (const num of t.nums) {
      const uuid = ueMap[`${t.from}-${num}`];
      if (!uuid) { console.log(`  WARN: UUID not found for ${t.from}-${num}`); continue; }
      const r = await post('/api/acts', { act_type: 'TRANSFER', actor_ok: t.from, target_ok: t.to, payload: { ue_uuid: uuid } });
      console.log(`  ${t.from} → ${t.to} (У.Е.${num}): ${r.success ? '✅' : '❌'} ${r.error || ''}`);
      await sleep(200);
    }
  }

  // Reload ueMap: only currently active U.E.
  const activeAfterPrimary = await pool.query("SELECT ue_uuid, ue_number, triad, actor_ok FROM ue_units WHERE status = 'active'");
  const ueMap2 = {};
  for (const ue of activeAfterPrimary.rows) {
    ueMap2[`${ue.actor_ok}-${ue.ue_number}`] = ue.ue_uuid;
  }

  const randomTransfers = [
    { from: '::ТЕСТ2::', to: '::ТЕСТ1::', nums: [2, 3] },
    { from: '::ТЕСТ4::', to: '::ТЕСТ1::', nums: [7] },
    { from: '::ТЕСТ5::', to: '::ТЕСТ2::', nums: [10] },
    { from: '::ТЕСТ5::', to: '::ТЕСТ3::', nums: [11] },
  ];
  for (const t of randomTransfers) {
    for (const num of t.nums) {
      const uuid = ueMap2[`${t.from}-${num}`];
      if (!uuid) {
        // Try ueMap with status='active' only
        console.log(`  WARN: UUID not found for ${t.from}-${num} (${t.from} has ${activeAfterPrimary.rows.filter(r => r.actor_ok === t.from).length} active U.E.)`);
        continue;
      }
      const r = await post('/api/acts', { act_type: 'TRANSFER', actor_ok: t.from, target_ok: t.to, payload: { ue_uuid: uuid } });
      console.log(`  ${t.from} → ${t.to} (У.Е.${num}): ${r.success ? '✅' : '❌'} ${r.error || ''}`);
      await sleep(200);
    }
  }

  // === PHASE 3: Burn ===
  console.log('\n=== PHASE 3: Burn ===');
  
  // Set burn_at in the past for all active U.E. (not protected by trigger)
  const PAST_TIME = '2026-05-31T00:00:00Z';
  await pool.query("UPDATE ue_units SET burn_at = $1::timestamp WHERE status = 'active'", [PAST_TIME]);
  // Temporarily disable acts_log immutable trigger to update payload for replay consistency
  await pool.query("ALTER TABLE acts_log DISABLE TRIGGER acts_log_immutable");
  await pool.query(`
    UPDATE acts_log 
    SET payload = jsonb_set(payload, '{burn_at}', to_jsonb($1::text))
    WHERE act_type = 'EMISSION'
  `, [PAST_TIME]);
  await pool.query("ALTER TABLE acts_log ENABLE TRIGGER acts_log_immutable");

  const burnResult = await post('/api/burn', {});
  console.log(`  Burned: ${burnResult.burned_count} У.Е.`);

  const stateAfterBurn = await pool.query("SELECT actor_ok, status, COUNT(*)::int as count FROM ue_units GROUP BY actor_ok, status ORDER BY actor_ok, status");
  console.log('  After burn state:');
  let totalUM = 0, totalBurned = 0;
  for (const row of stateAfterBurn.rows) {
    console.log(`    ${row.actor_ok}: ${row.status} = ${row.count}`);
    if (row.status === 'transferred') totalUM += row.count;
    if (row.status === 'burned') totalBurned += row.count;
  }
  console.log(`  Total У.М. (transferred): ${totalUM}`);
  console.log(`  Total burned: ${totalBurned}`);
  const hasActive = stateAfterBurn.rows.some(r => r.status === 'active');
  console.log(`  Active remaining: ${hasActive ? '❌ YES (ERROR!)' : '✅ 0'}`);

  // === PHASE 4: Replay Test ===
  console.log('\n=== PHASE 4: Replay Test ===');
  const { execSync } = require('child_process');
  try {
    const output = execSync('node tools/replay-core.js', {
      cwd: '/app', timeout: 30000,
      env: { ...process.env, DATABASE_URL: 'postgresql://pygmalion:pygmalion_secret_2026@postgres-test:5432/pygmalion_v041_test' }
    }).toString();
    // Extract just the summary lines
    const lines = output.split('\n').filter(l => l.includes('Совпадений') || l.includes('Расхождений') || l.includes('УСПЕХ') || l.includes('ВНИМАНИЕ') || l.includes('Применено:'));
    console.log(lines.join('\n'));
  } catch(e) {
    console.log('Replay error:', e.message);
    if (e.stdout) console.log(e.stdout.toString());
  }

  // Restore cooldowns for presence
  await pool.query("UPDATE ok_identity SET last_act_at = NULL, last_act_type = NULL");

  // === PHASE 5: Presence ===
  console.log('\n=== PHASE 5: Presence Check ===');
  for (const k of keys) {
    try {
      const p = await get(`/api/presence/${encodeURIComponent(k)}`);
      const ok = p.projection && typeof p.projection.ue_flow === 'number';
      console.log(`  ${k}: ${ok ? '✅' : '❌'} flow=${p.projection ? p.projection.ue_flow : 'N/A'}`);
    } catch(e) {
      console.log(`  ${k}: ❌ ${e.message}`);
    }
  }

  await pool.end();
  console.log('\n=== TEST CYCLE COMPLETE ===');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
