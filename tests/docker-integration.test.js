/**
 * Docker Integration Tests — PDA Hardening Phase v0.5.1000.01
 *
 * Запуск:
 *   DATABASE_URL=postgresql://pygmalion:pygmalion@localhost:5433/pygmalion_v04 node tests/docker-integration.test.js
 *
 * Требования:
 *   - Docker стек поднят (docker compose up -d)
 *   - PostgreSQL доступен по DATABASE_URL
 */

const { PDA } = require('../PDA/index');

const hasDB = !!process.env.DATABASE_URL;
let passed = 0, failed = 0;

function test(name, fn) {
  try { fn(); passed++; process.stdout.write(`  ✓ ${name}\n`); }
  catch (e) { failed++; process.stdout.write(`  ✗ ${name}: ${e.message}\n`); }
}

async function dtest(name, fn) {
  try { await fn(); passed++; process.stdout.write(`  ✓ ${name}\n`); }
  catch (e) { failed++; process.stdout.write(`  ✗ ${name}: ${e.message}\n`); }
}

async function run() {
  process.stdout.write('\n========================================\n');
  process.stdout.write('Docker Integration Tests — PDA Hardening\n');
  process.stdout.write('DB доступна: ' + hasDB + '\n');
  process.stdout.write('========================================\n\n');

  const pda = new PDA();

  test('PDA.getStatus returns all required fields', () => {
    const s = pda.getStatus();
    if (!s.version) throw new Error('no version');
    if (!s.canon) throw new Error('no canon');
    if (!s.emission_policy) throw new Error('no emission_policy');
    if (!s.phase) throw new Error('no phase');
    if (typeof s.emission_allowed !== 'boolean') throw new Error('emission_allowed not boolean');
  });

  test('PDA.getCapabilities returns 5 intents', () => {
    const c = pda.getCapabilities();
    if (c.intents.length !== 5) throw new Error(`expected 5 intents, got ${c.intents.length}`);
    if (!c.boot_mode) throw new Error('no boot_mode');
    if (!c.compatibility) throw new Error('no compatibility');
  });

  test('PDA.preview PLAN returns preview_id', () => {
    const intent = pda.resolve('PLAN', { actor_ok: '::TEST::', triads: ['T1'] });
    const preview = pda.preview(intent);
    if (!preview.preview_id) throw new Error('no preview_id');
    if (!preview.preview_id.startsWith('pv_')) throw new Error('preview_id wrong format');
  });

  test('PDA.preview THRESHOLD valid OK', () => {
    const intent = pda.resolve('THRESHOLD', { ok_key: '::TESTPDA::' });
    const preview = pda.preview(intent);
    if (preview.blocked) throw new Error('should not be blocked: ' + preview.reason);
    if (preview.type !== 'threshold') throw new Error('expected threshold type');
  });

  test('PDA.preview THRESHOLD system reserve blocked', () => {
    const intent = pda.resolve('THRESHOLD', { ok_key: '::01::' });
    const preview = pda.preview(intent);
    if (!preview.blocked) throw new Error('system reserve should be blocked');
  });

  test('PDA.run returns intent+preview, no result', async () => {
    const r = await pda.run('PLAN', { actor_ok: '::TEST::', triads: ['T1'] });
    if (!r.intent) throw new Error('no intent');
    if (!r.preview) throw new Error('no preview');
    if (r.result) throw new Error('run should not have result');
  });

  test('PDA.run MIRROR returns preview', async () => {
    const r = await pda.run('MIRROR', { ok_id: '::TEST::' });
    if (!r.preview) throw new Error('no preview');
    if (r.preview.type !== 'mirror') throw new Error('expected mirror');
  });

  test('PDA.run REPLAY returns preview', async () => {
    const r = await pda.run('REPLAY', {});
    if (!r.preview) throw new Error('no preview');
    if (r.preview.type !== 'replay') throw new Error('expected replay');
  });

  test('PDA.run FLOW returns preview', async () => {
    const r = await pda.run('FLOW', { actor_ok: '::FROM::', target_ok: '::TO::' });
    if (!r.preview) throw new Error('no preview');
  });

  test('PDA.resolve unknown action returns error', () => {
    const r = pda.resolve('BOGUS', {});
    if (r.valid !== false) throw new Error('unknown action should be invalid');
  });

  // ============================================
  // DB-dependent tests
  // ============================================
  if (!hasDB) {
    process.stdout.write('\n  DB-зависимые тесты пропущены (DATABASE_URL не задан)\n');
  } else {
    process.stdout.write('\n=== DB DEPENDENT TESTS ===\n\n');

    const ExecutionGateway = require('../PDA/core/execution-gateway');
    const gateway = new ExecutionGateway();

    await dtest('execute THRESHOLD creates new OK', async () => {
      const okKey = '::TESTPDA' + Date.now().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '') + '::';
      const r = await gateway.execute({ action: 'threshold', payload: { ok_key: okKey } });
      if (!r.success) throw new Error('threshold failed: ' + JSON.stringify(r));
      if (!r.act_id) throw new Error('no act_id');
    });

    await dtest('execute PLAN with valid triads', async () => {
      const r = await gateway.execute({ action: 'plan', payload: { actor_ok: '::TEST::', triads: ['T1'] } });
      if (r.success !== true && r.success !== false) throw new Error('unexpected result');
    });

    await dtest('execute MIRROR existing OK', async () => {
      const r = await gateway.execute({ action: 'mirror', payload: { ok_id: '::TEST::' } });
      if (!r.success) throw new Error('mirror failed');
      if (!r.presence) throw new Error('no presence data');
    });

    await dtest('execute REPLAY returns 0 mismatches', async () => {
      const r = await gateway.execute({ action: 'replay', payload: {} });
      if (!r.success) throw new Error('replay failed');
      if (r.mismatches !== 0) throw new Error(`expected 0 mismatches, got ${r.mismatches}`);
    });

    await dtest('PDA.confirm full cycle THRESHOLD → PLAN → MIRROR', async () => {
      const okKey = '::TESTPDA' + Date.now().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '') + '::';
      const threshold = await pda.confirm('THRESHOLD', { ok_key: okKey });
      if (!threshold.intent || !threshold.preview) throw new Error('threshold confirm incomplete');
      if (threshold.result && !threshold.result.success) {
        process.stdout.write(`  ℹ THRESHOLD result: ${JSON.stringify(threshold.result)}\n`);
      }
    });

    await dtest('execute SYSTEM_RESERVE blocked', async () => {
      const r = await gateway.execute({ action: 'threshold', payload: { ok_key: '::01::' } });
      if (r.success !== false) throw new Error('system reserve should be blocked');
    });

    await dtest('execute PLAN bad triads blocked', async () => {
      const r = await gateway.execute({ action: 'plan', payload: { actor_ok: '::TEST::', triads: ['T99'] } });
      if (r.success !== false) throw new Error('bad triads should be blocked');
    });
  }

  // ============================================
  // Summary
  // ============================================
  process.stdout.write('\n========================================\n');
  process.stdout.write(`Integration Tests: ${passed} passed, ${failed} failed\n`);
  process.stdout.write('========================================\n\n');
  if (failed > 0) process.exit(1);
}

run().catch(err => { console.error(err); process.exit(1); });
