const assert = require('assert');
const { PDA } = require('../index');
const Canon = require('../../backend/core/canon');
const Metronome = require('../../backend/core/metronome');
const IntentRouter = require('../core/intent-router');
const PreviewEngine = require('../core/preview-engine');
const ExecutionGateway = require('../core/execution-gateway');

const pda = new PDA();
const router = new IntentRouter();
const previewEngine = new PreviewEngine(Canon, Metronome);
const gateway = new ExecutionGateway();

let passed = 0, failed = 0;

function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (e) { failed++; console.log(`  ✗ ${name}: ${e.message}`); }
}

const hasDB = !!process.env.DATABASE_URL;

console.log('\n========================================');
console.log('PDA-0 Test Suite :: Unit Tests');
console.log('DB доступна:', hasDB);
console.log('Фаза:', Metronome.getCurrentPhase());
console.log('========================================\n');

// ============================================================
// INTENT ROUTER (20 tests)
// ============================================================
console.log('=== INTENT ROUTER ===\n');

test('resolve PLAN valid', () => {
  assert.deepEqual(router.resolve('PLAN', { actor_ok: '::TEST::', triads: ['T1'] }).action, 'plan');
});

test('resolve PLAN without actor_ok', () => {
  assert.ok(router.resolve('PLAN', { triads: ['T1'] }).error.includes('actor_ok'));
});

test('resolve PLAN without triads', () => {
  assert.ok(router.resolve('PLAN', { actor_ok: '::TEST::' }).error.includes('triad'));
});

test('resolve PLAN with triad alias', () => {
  assert.deepEqual(router.resolve('PLAN', { actor_ok: '::TEST::', triad: 'T2' }).payload.triads, ['T2']);
});

test('resolve PLAN normalizes payload from actor_ok', () => {
  const r = router.resolve('PLAN', { actor_ok: '::A::', triads: ['T1'] });
  assert.equal(r.payload.actor_ok, '::A::');
  assert.deepEqual(r.payload.triads, ['T1']);
});

test('resolve FLOW valid', () => {
  assert.ok(router.resolve('FLOW', { actor_ok: '::FROM::', target_ok: '::TO::' }).valid);
});

test('resolve FLOW without target', () => {
  assert.ok(router.resolve('FLOW', { actor_ok: '::FROM::' }).error.includes('target_ok'));
});

test('resolve FLOW with aliases', () => {
  const r = router.resolve('FLOW', { from: '::A::', to: '::B::' });
  assert.equal(r.payload.actor_ok, '::A::');
  assert.equal(r.payload.target_ok, '::B::');
});

test('resolve MIRROR valid', () => {
  assert.ok(router.resolve('MIRROR', { ok_id: '::TEST::' }).valid);
});

test('resolve MIRROR without ok_id', () => {
  assert.ok(router.resolve('MIRROR', {}).error.includes('ok_id'));
});

test('resolve MIRROR with ok alias', () => {
  assert.equal(router.resolve('MIRROR', { ok: '::TEST::' }).payload.ok_id, '::TEST::');
});

test('resolve REPLAY always valid', () => {
  assert.ok(router.resolve('REPLAY', {}).valid);
});

test('resolve REPLAY with payload', () => {
  assert.ok(router.resolve('REPLAY', { scope: 'full' }).valid);
});

test('resolve THRESHOLD valid', () => {
  assert.ok(router.resolve('THRESHOLD', { ok_key: '::TEST::' }).valid);
});

test('resolve THRESHOLD without ok_key', () => {
  assert.ok(router.resolve('THRESHOLD', {}).error.includes('ok_key'));
});

test('resolve THRESHOLD with ok alias', () => {
  assert.equal(router.resolve('THRESHOLD', { ok: '::USER::' }).payload.ok_key, '::USER::');
});

test('resolve unknown action', () => {
  assert.ok(router.resolve('UNKNOWN', {}).error.includes('Неизвестное'));
});

test('resolve lowercase action', () => {
  assert.ok(router.resolve('plan', { actor_ok: '::TEST::', triads: ['T1'] }).valid);
});

test('resolve null/empty', () => {
  assert.ok(!router.resolve(null, {}).valid);
  assert.ok(!router.resolve('', {}).valid);
});

test('getActions returns all actions', () => {
  const keys = router.getActions().map(a => a.key);
  assert.equal(keys.length, 5);
  assert.ok(['PLAN', 'FLOW', 'MIRROR', 'REPLAY', 'THRESHOLD'].every(k => keys.includes(k)));
});

// ============================================================
// PREVIEW ENGINE (13 tests)
// ============================================================
console.log('\n=== PREVIEW ENGINE ===\n');

test('preview PLAN checks emission allowed', () => {
  const p = previewEngine.compute({ valid: true, action: 'plan', payload: { actor_ok: '::TEST::', triads: ['T1'] } });
  if (!p.blocked) {
    assert.equal(p.type, 'emission');
    assert.ok(p.ue_numbers.length === 3);
    assert.ok(p.burn_at);
  } else assert.ok(p.reason.includes('Эмиссия'));
});

test('preview PLAN multiple triads total', () => {
  const p = previewEngine.compute({ valid: true, action: 'plan', payload: { actor_ok: '::TEST::', triads: ['T1', 'T2', 'T3'] } });
  if (!p.blocked) assert.equal(p.total_ue, 9);
});

test('preview PLAN T5 alone blocked', () => {
  assert.ok(previewEngine.compute({ valid: true, action: 'plan', payload: { actor_ok: '::TEST::', triads: ['T5'] } }).blocked);
});

test('preview PLAN invalid triad blocked', () => {
  assert.ok(previewEngine.compute({ valid: true, action: 'plan', payload: { actor_ok: '::TEST::', triads: ['T99'] } }).blocked);
});

test('preview FLOW phase-dependent', () => {
  const p = previewEngine.compute({ valid: true, action: 'flow', payload: { actor_ok: '::FROM::', target_ok: '::TO::' } });
  if (!p.blocked) assert.equal(p.type, 'transfer');
  else assert.ok(p.reason.includes('Передача'));
});

test('preview MIRROR read-only', () => {
  assert.ok(previewEngine.compute({ valid: true, action: 'mirror', payload: { ok_id: '::TEST::' } }).read_only);
});

test('preview REPLAY type', () => {
  assert.equal(previewEngine.compute({ valid: true, action: 'replay', payload: {} }).type, 'replay');
});

test('preview THRESHOLD valid', () => {
  const p = previewEngine.compute({ valid: true, action: 'threshold', payload: { ok_key: '::NEWUSER::' } });
  assert.equal(p.blocked, false);
  assert.equal(p.type, 'threshold');
});

test('preview THRESHOLD invalid format', () => {
  assert.ok(previewEngine.compute({ valid: true, action: 'threshold', payload: { ok_key: 'invalid' } }).blocked);
});

test('preview THRESHOLD system reserve', () => {
  assert.ok(previewEngine.compute({ valid: true, action: 'threshold', payload: { ok_key: '::01::' } }).blocked);
});

test('preview THRESHOLD OK with spaces', () => {
  assert.ok(!previewEngine.compute({ valid: true, action: 'threshold', payload: { ok_key: '::ВАН ЛЯ::' } }).blocked);
});

test('preview blocked intent propagates error', () => {
  const p = previewEngine.compute({ valid: false, error: 'test error' });
  assert.equal(p.blocked, true);
  assert.equal(p.reason, 'test error');
});

test('preview unknown action blocked', () => {
  assert.ok(previewEngine.compute({ valid: true, action: 'nonexistent', payload: {} }).blocked);
});

// ============================================================
// PDA INTEGRATION (12 tests)
// ============================================================
console.log('\n=== PDA INTEGRATION ===\n');

test('PDA.getStatus returns system info', () => {
  const s = pda.getStatus();
  assert.ok(s.version && s.canon && s.phase && s.time);
  assert.ok(typeof s.emission_allowed === 'boolean');
});

test('PDA.resolve PLAN returns intent', () => {
  assert.ok(pda.resolve('PLAN', { actor_ok: '::TEST::', triads: ['T1'] }).valid);
});

test('PDA.resolve unknown returns error', () => {
  assert.ok(!pda.resolve('BOGUS', {}).valid);
});

test('PDA.preview shows details', () => {
  const p = pda.preview(pda.resolve('PLAN', { actor_ok: '::TEST::', triads: ['T2', 'T3'] }));
  if (!p.blocked) assert.equal(p.total_ue, 6);
});

test('PDA.preview blocks T5 alone', () => {
  assert.ok(pda.preview(pda.resolve('PLAN', { actor_ok: '::TEST::', triads: ['T5'] })).blocked);
});

test('PDA.run returns intent+preview only', async () => {
  const r = await pda.run('PLAN', { actor_ok: '::TEST::', triads: ['T1'] });
  assert.ok(r.intent && r.preview);
  assert.ok(!r.result);
});

test('PDA.run returns error for invalid', async () => {
  assert.ok(!(await pda.run('BOGUS', {})).valid);
});

test('PDA.run MIRROR preview only', async () => {
  const r = await pda.run('MIRROR', { ok_id: '::TEST::' });
  assert.ok(r.intent && r.preview);
  assert.ok(!r.result);
});

test('PDA.confirm returns all stages', async () => {
  const r = await pda.confirm('PLAN', { actor_ok: '::TEST::', triads: ['T1'] });
  assert.ok(r.intent && r.preview);
  assert.ok(r.result !== undefined);
});

test('PDA.confirm blocked returns success false', async () => {
  const r = await pda.confirm('PLAN', { actor_ok: '::TEST::', triads: ['T5'] });
  if (r.preview && r.preview.blocked) assert.equal(r.success, false);
});

test('PDA.run THRESHOLD preview', async () => {
  const r = await pda.run('THRESHOLD', { ok_key: '::HELLO::' });
  assert.ok(r.preview);
  assert.equal(r.preview.type, 'threshold');
});

test('PDA.resolve all actions have protocol', () => {
  const cases = [
    { k: 'PLAN',      payload: { actor_ok: '::X::', triads: ['T1'] },                          expected: 'про.1' },
    { k: 'FLOW',      payload: { actor_ok: '::X::', target_ok: '::Y::' },                      expected: 'про.2' },
    { k: 'MIRROR',    payload: { ok_id: '::X::' },                                             expected: 'про.3' },
    { k: 'REPLAY',    payload: {},                                                              expected: null },
    { k: 'THRESHOLD', payload: { ok_key: '::X::' },                                            expected: 'про.14' },
  ];
  for (const { k, payload, expected } of cases) {
    const r = router.resolve(k, payload);
    assert.equal(r.protocol, expected, `${k}: expected ${expected}, got ${r.protocol}`);
  }
});

// ============================================================
// CANON INTEGRATION (22 tests)
// ============================================================
console.log('\n=== CANON INTEGRATION ===\n');

test('Canon.isValidOK uppercase Latin', () => {
  assert.ok(Canon.isValidOK('::HELLO::'));
});

test('Canon.isValidOK uppercase Cyrillic', () => {
  assert.ok(Canon.isValidOK('::СВЕТ::'));
});

test('Canon.isValidOK mixed uppercase', () => {
  assert.ok(Canon.isValidOK('::ВАН ЛЯ::'));
});

test('Canon.isValidOK lowercase rejected', () => {
  assert.ok(!Canon.isValidOK('::hello::'));
});

test('Canon.isValidOK no colons', () => {
  assert.ok(!Canon.isValidOK('invalid'));
});

test('Canon.isValidOK empty', () => {
  assert.ok(!Canon.isValidOK(''));
});

test('Canon.isValidOK null', () => {
  assert.ok(!Canon.isValidOK(null));
});

test('Canon.isValidOK admin with flag', () => {
  assert.ok(Canon.isValidOK('::01::', true));
});

test('Canon.isValidOK admin without flag rejected', () => {
  assert.ok(!Canon.isValidOK('::01::'));
});

test('Canon.isValidOK empty content', () => {
  assert.ok(!Canon.isValidOK('::'));
});

test('Canon.isValidOK uz marker', () => {
  assert.ok(Canon.isValidOK('::AB::'));
});

test('Canon.isSystemReserve 0-33', () => {
  assert.ok(Canon.isSystemReserve('0'));
  assert.ok(Canon.isSystemReserve('33'));
});

test('Canon.isSystemReserve 34 is not reserved', () => {
  assert.ok(!Canon.isSystemReserve('34'));
});

test('Canon.isSystemReserve name is not reserved', () => {
  assert.ok(!Canon.isSystemReserve('HELLO'));
});

test('Canon.emissionPolicy validateTriadSelection valid', () => {
  const v = Canon.emissionPolicy.validateTriadSelection(['T1', 'T4']);
  assert.equal(v.totalUE, 6);
});

test('Canon.emissionPolicy validateTriadSelection empty', () => {
  assert.ok(!Canon.emissionPolicy.validateTriadSelection([]).valid);
});

test('Canon.emissionPolicy validateTriadSelection at max', () => {
  const v = Canon.emissionPolicy.validateTriadSelection(['T1', 'T2', 'T3', 'T4', 'T5']);
  assert.ok(v.valid);
  assert.equal(v.totalUE, 13);
});

test('Canon.emissionPolicy validateTriadSelection over custom max', () => {
  assert.ok(!Canon.emissionPolicy.validateTriadSelection(['T1', 'T2'], 4).valid);
});

test('Canon.emissionPolicy validateTriadSelection K1 blocked', () => {
  assert.ok(!Canon.emissionPolicy.validateTriadSelection(['K1']).valid);
});

test('Canon.emissionPolicy validateTriadSelection T5 alone blocked', () => {
  assert.ok(!Canon.emissionPolicy.validateTriadSelection(['T5']).valid);
});

test('Canon.emissionPolicy getMaxUEPerDay defaults to 13', () => {
  assert.equal(Canon.emissionPolicy.getMaxUEPerDay('::USER::'), 13);
});

test('Canon.emissionPolicy getMaxUEPerDay order head', () => {
  assert.ok(Canon.emissionPolicy.getMaxUEPerDay('::02::') > 13);
});

test('Canon.getUENumbers by triad', () => {
  assert.deepEqual(Canon.emissionPolicy.getUENumbersByTriad('T1'), [1, 2, 3]);
  assert.deepEqual(Canon.emissionPolicy.getUENumbersByTriad('T5'), [21]);
});

test('Canon.getBaseTriads returns T1-T5', () => {
  assert.deepEqual(Canon.emissionPolicy.getBaseTriads(), ['T1', 'T2', 'T3', 'T4', 'T5']);
});

// ============================================================
// METRONOME INTEGRATION (8 tests)
// ============================================================
console.log('\n=== METRONOME INTEGRATION ===\n');

test('Metronome getCurrentPhase valid', () => {
  assert.ok(['active', 'silence', 'impulse'].includes(Metronome.getCurrentPhase()));
});

test('Metronome getCurrentTimeISO format', () => {
  const t = Metronome.getCurrentTimeISO();
  assert.ok(t.includes('T') && t.endsWith('Z'));
});

test('Metronome isEmissionAllowed boolean', () => {
  assert.ok(typeof Metronome.isEmissionAllowed() === 'boolean');
});

test('Metronome isTransferAllowed boolean', () => {
  assert.ok(typeof Metronome.isTransferAllowed() === 'boolean');
});

test('Metronome calculateBurnAt returns future', () => {
  assert.ok(new Date(Metronome.calculateBurnAt()).getTime() > Date.now() - 86400000);
});

test('Metronome getWindowStart returns ISO', () => {
  assert.ok(Metronome.getWindowStart().includes('T'));
});

test('Metronome calculateSilence', () => {
  assert.ok(Metronome.calculateSilence(new Date().toISOString()) >= 0);
  assert.equal(Metronome.calculateSilence(null), Infinity);
});

test('Metronome getNextMidnightUTC', () => {
  assert.ok(Metronome.getNextMidnightUTC() > Date.now() - 1000);
});

// ============================================================
// PDA INTENTS MODULE (10 tests)
// ============================================================
console.log('\n=== PDA INTENTS MODULE ===\n');

const intents = require('../intents');

test('plan.validate valid', () => {
  assert.ok(intents.plan.validate({ actor_ok: '::TEST::', triads: ['T1'] }).valid);
});

test('plan.validate missing fields', () => {
  assert.ok(!intents.plan.validate({ triads: ['T1'] }).valid);
  assert.ok(!intents.plan.validate({ actor_ok: '::X::' }).valid);
});

test('flow.validate valid', () => {
  assert.ok(intents.flow.validate({ actor_ok: '::A::', target_ok: '::B::' }).valid);
});

test('flow.validate missing target', () => {
  assert.ok(!intents.flow.validate({ actor_ok: '::A::' }).valid);
});

test('mirror.validate valid', () => {
  assert.ok(intents.mirror.validate({ ok_id: '::TEST::' }).valid);
});

test('mirror.preview read-only', () => {
  assert.ok(intents.mirror.preview().read_only);
});

test('replay.validate always valid', () => {
  assert.ok(intents.replay.validate().valid);
});

test('threshold.validate valid uppercase', () => {
  assert.ok(intents.threshold.validate({ ok_key: '::HELLO::' }).valid);
});

test('threshold.validate system reserve', () => {
  assert.ok(!intents.threshold.validate({ ok_key: '::01::' }).valid);
});

test('all intents have route', () => {
  const routes = Object.values(intents).map(m => m.route);
  assert.ok(['plan', 'flow', 'mirror', 'replay', 'threshold'].every(r => routes.includes(r)));
});

// ============================================================
// SUMMARY
// ============================================================
console.log('\n========================================');
console.log(`Результаты: ${passed} passed, ${failed} failed`);
console.log('========================================\n');

if (hasDB) {
  console.log('\n=== DB-dependent async tests ===\n');
  (async () => {
    let dbPassed = 0, dbFailed = 0;
    const dbt = async (name, fn) => {
      try { await fn(); dbPassed++; console.log(`  ✓ ${name}`); }
      catch (e) { dbFailed++; console.log(`  ✗ ${name}: ${e.message}`); }
    };

    await dbt('execute THRESHOLD new OK', async () => {
      const r = await gateway.execute({ action: 'threshold', payload: { ok_key: '::TESTPDA::' } });
      assert.ok(r.success);
    });

    await dbt('execute PLAN valid', async () => {
      const r = await gateway.execute({ action: 'plan', payload: { actor_ok: '::TESTPDA::', triads: ['T1'] } });
      if (Metronome.isEmissionAllowed()) {
        assert.ok(r.success);
        assert.ok(r.act_id);
      } else {
        assert.ok(!r.success);
      }
    });

    await dbt('execute MIRROR existing', async () => {
      const r = await gateway.execute({ action: 'mirror', payload: { ok_id: '::TESTPDA::' } });
      assert.ok(r.success);
      assert.equal(r.presence.ok_id, '::TESTPDA::');
    });

    await dbt('execute FLOW valid', async () => {
      const r = await gateway.execute({ action: 'flow', payload: { actor_ok: '::TESTPDA::', target_ok: '::RECEPTOR::' } });
      if (Metronome.isTransferAllowed()) {
        assert.ok(r.success);
      } else {
        assert.ok(!r.success);
      }
    });

    await dbt('execute REPLAY', async () => {
      const r = await gateway.execute({ action: 'replay', payload: {} });
      assert.ok(r.success);
      assert.equal(r.mismatches, 0);
    });

    await dbt('PDA.confirm THRESHOLD+PLAN+MIRROR', async () => {
      const r = await pda.confirm('THRESHOLD', { ok_key: '::TESTPDA2::' });
      assert.ok(r.intent && r.preview);
    });

    await dbt('execute SYSTEM_RESERVE blocked', async () => {
      const r = await gateway.execute({ action: 'threshold', payload: { ok_key: '::01::' } });
      assert.ok(!r.success);
    });

    await dbt('execute PLAN bad triads', async () => {
      const r = await gateway.execute({ action: 'plan', payload: { actor_ok: '::TESTPDA::', triads: ['T99'] } });
      assert.ok(!r.success);
    });

    console.log(`\n  DB tests: ${dbPassed} passed, ${dbFailed} failed`);
    if (dbFailed > 0) process.exit(1);
  })();
} else {
  console.log('DB-зависимые тесты пропущены (DATABASE_URL не задан)');
}
