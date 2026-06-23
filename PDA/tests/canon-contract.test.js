const assert = require('assert');
const Canon = require('../../backend/core/canon');
const Metronome = require('../../backend/core/metronome');
const { PDA } = require('../index');
const PreviewEngine = require('../core/preview-engine');

const pda = new PDA();
const previewEngine = new PreviewEngine(Canon, Metronome);

let passed = 0, failed = 0;

function test(name, fn) {
  try { fn(); passed++; console.log(`  ✓ ${name}`); }
  catch (e) { failed++; console.log(`  ✗ ${name}: ${e.message}`); }
}

console.log('\n========================================');
console.log('Canon Contract Tests :: Canon ↔ PDA');
console.log('========================================\n');

// ============================================================
// EMISSION POLICY CONTRACT
// ============================================================
console.log('=== EMISSION POLICY CONTRACT ===\n');

test('Canon.emissionPolicy.validateTriadSelection([T1]) valid, totalUE = 3', () => {
  const v = Canon.emissionPolicy.validateTriadSelection(['T1']);
  assert.ok(v.valid);
  assert.equal(v.totalUE, 3);
});

test('Canon.emissionPolicy.validateTriadSelection([T1,T2,T3]) totalUE = 9', () => {
  const v = Canon.emissionPolicy.validateTriadSelection(['T1', 'T2', 'T3']);
  assert.equal(v.totalUE, 9);
});

test('Canon.emissionPolicy.validateTriadSelection([T5]) alone blocked', () => {
  const v = Canon.emissionPolicy.validateTriadSelection(['T5']);
  assert.ok(!v.valid);
});

test('Canon.emissionPolicy.validateTriadSelection([K1]) blocked (needs v2.01+)', () => {
  const v = Canon.emissionPolicy.validateTriadSelection(['K1']);
  assert.ok(!v.valid);
});

test('Canon.emissionPolicy.validateTriadSelection([]) blocked (min 3)', () => {
  const v = Canon.emissionPolicy.validateTriadSelection([]);
  assert.ok(!v.valid);
});

test('Canon.emissionPolicy.getMaxUEPerDay(::USER::) = 13', () => {
  assert.equal(Canon.emissionPolicy.getMaxUEPerDay('::USER::'), 13);
});

test('Canon.emissionPolicy.getMaxUEPerDay(::02::) = 29 (order head bonus)', () => {
  assert.equal(Canon.emissionPolicy.getMaxUEPerDay('::02::'), 29);
});

test('Canon.emissionPolicy.getMaxUEPerDay(::01::) = 32 (predstoyatel)', () => {
  assert.equal(Canon.emissionPolicy.getMaxUEPerDay('::01::'), 32);
});

test('Canon.emissionPolicy.getBaseTriads() = [T1,T2,T3,T4,T5]', () => {
  assert.deepEqual(Canon.emissionPolicy.getBaseTriads(), ['T1', 'T2', 'T3', 'T4', 'T5']);
});

test('Canon.emissionPolicy.getUENumbersByTriad(T1) = [1,2,3]', () => {
  assert.deepEqual(Canon.emissionPolicy.getUENumbersByTriad('T1'), [1, 2, 3]);
});

test('Canon.emissionPolicy.getUENumbersByTriad(T5) = [21]', () => {
  assert.deepEqual(Canon.emissionPolicy.getUENumbersByTriad('T5'), [21]);
});

test('Canon.emissionPolicy.isPredstoyatel(::01::) = true', () => {
  assert.ok(Canon.emissionPolicy.isPredstoyatel('::01::'));
});

test('Canon.emissionPolicy.isOrderHead(::02::) = true', () => {
  assert.ok(Canon.emissionPolicy.isOrderHead('::02::'));
});

test('Canon.emissionPolicy.isOrderHead(::09::) = true', () => {
  assert.ok(Canon.emissionPolicy.isOrderHead('::09::'));
});

test('Canon.emissionPolicy.isOrderHead(::10::) = false', () => {
  assert.ok(!Canon.emissionPolicy.isOrderHead('::10::'));
});

test('EMISSION_POLICY.version = 0.5.1000.01', () => {
  assert.equal(Canon.emissionPolicy.EMISSION_POLICY.version, '0.5.1000.01');
});

test('EMISSION_POLICY.daily.min = 3', () => {
  assert.equal(Canon.emissionPolicy.EMISSION_POLICY.daily.min, 3);
});

test('EMISSION_POLICY.daily.max = 13', () => {
  assert.equal(Canon.emissionPolicy.EMISSION_POLICY.daily.max, 13);
});

// ============================================================
// GRAMMAR CONTRACT
// ============================================================
console.log('\n=== GRAMMAR CONTRACT ===\n');

test('Canon.grammar.isValidOK(::HELLO::) = true', () => {
  assert.ok(Canon.grammar.isValidOK('::HELLO::'));
});

test('Canon.grammar.isValidOK(::ПРИВЕТ::) = true', () => {
  assert.ok(Canon.grammar.isValidOK('::ПРИВЕТ::'));
});

test('Canon.grammar.isValidOK(::hello::) = false (lowercase)', () => {
  assert.ok(!Canon.grammar.isValidOK('::hello::'));
});

test('Canon.grammar.isValidOK(::01::, true) = true (admin flag)', () => {
  assert.ok(Canon.grammar.isValidOK('::01::', true));
});

test('Canon.grammar.isValidOK(::01::) = false (no admin flag)', () => {
  assert.ok(!Canon.grammar.isValidOK('::01::'));
});

test('Canon.grammar.isValidOK(invalid) = false', () => {
  assert.ok(!Canon.grammar.isValidOK('invalid'));
});

test('Canon.grammar.isValidOK(empty) = false', () => {
  assert.ok(!Canon.grammar.isValidOK(''));
});

test('Canon.grammar.isValidOK(null) = false', () => {
  assert.ok(!Canon.grammar.isValidOK(null));
});

// ============================================================
// SYSTEM RESERVE CONTRACT
// ============================================================
console.log('\n=== SYSTEM RESERVE CONTRACT ===\n');

test('Canon.reserved.isSystemReserve(0) = true', () => {
  assert.ok(Canon.reserved.isSystemReserve('0'));
});

test('Canon.reserved.isSystemReserve(33) = true', () => {
  assert.ok(Canon.reserved.isSystemReserve('33'));
});

test('Canon.reserved.isSystemReserve(34) = false', () => {
  assert.ok(!Canon.reserved.isSystemReserve('34'));
});

test('Canon.reserved.isSystemReserve(HELLO) = false', () => {
  assert.ok(!Canon.reserved.isSystemReserve('HELLO'));
});

test('Canon.reserved.SYSTEM_RESERVE contains 0 through 33', () => {
  for (let i = 0; i <= 33; i++) {
    assert.ok(Canon.reserved.SYSTEM_RESERVE.has(String(i)), `Slot ${i} not in SYSTEM_RESERVE`);
  }
});

test('Canon.reserved.SYSTEM_SUBJECTS.ORACLE is ::О::', () => {
  assert.equal(Canon.reserved.SYSTEM_SUBJECTS.ORACLE, '::О::');
});

// ============================================================
// TEMPORAL / METRONOME CONTRACT
// ============================================================
console.log('\n=== TEMPORAL / METRONOME CONTRACT ===\n');

test('Canon.temporal.getPhase(now) returns valid phase', () => {
  const phase = Canon.temporal.getPhase(new Date().toISOString());
  assert.ok(['active', 'silence', 'impulse'].includes(phase));
});

test('Canon.temporal.canAct(non-silence) = allowed true', () => {
  const result = Canon.temporal.canAct('2026-06-23T12:00:00Z');
  assert.equal(result.allowed, true);
});

test('Canon.temporal.getPhase(2026-06-23T19:56:00Z) = silence', () => {
  assert.equal(Canon.temporal.getPhase('2026-06-23T19:56:00Z'), 'silence');
});

test('Canon.temporal.getPhase(2026-06-23T12:00:00Z) = active', () => {
  assert.equal(Canon.temporal.getPhase('2026-06-23T12:00:00Z'), 'active');
});

test('Canon.temporal.getPhase(2026-06-23T21:00:00Z) = impulse', () => {
  assert.equal(Canon.temporal.getPhase('2026-06-23T21:00:00Z'), 'impulse');
});

test('Canon.temporal.calculateBurnAt(2026-06-23T12:00:00Z) returns next midnight ISO', () => {
  const result = Canon.temporal.calculateBurnAt('2026-06-23T12:00:00Z');
  assert.equal(result, '2026-06-24T00:00:00.000Z');
});

test('Canon.temporal.getLifetime(active) = 86400000', () => {
  assert.equal(Canon.temporal.getLifetime('active'), 24 * 60 * 60 * 1000);
});

test('Canon.temporal.getLifetime(impulse) = 100800000', () => {
  assert.equal(Canon.temporal.getLifetime('impulse'), 28 * 60 * 60 * 1000);
});

test('Metronome.getCurrentPhase() returns valid phase', () => {
  assert.ok(['active', 'silence', 'impulse'].includes(Metronome.getCurrentPhase()));
});

test('Metronome.isEmissionAllowed() = boolean', () => {
  assert.ok(typeof Metronome.isEmissionAllowed() === 'boolean');
});

test('Metronome.isTransferAllowed() = boolean', () => {
  assert.ok(typeof Metronome.isTransferAllowed() === 'boolean');
});

// ============================================================
// CANON VERSION CONTRACT
// ============================================================
console.log('\n=== CANON VERSION CONTRACT ===\n');

test('Canon.CANON_VERSION = phase1-stable-2026.05', () => {
  assert.equal(Canon.CANON_VERSION, 'phase1-stable-2026.05');
});

// ============================================================
// PDA vs CANON COMPARISON TESTS
// ============================================================
console.log('\n=== PDA vs CANON COMPARISON TESTS ===\n');

test('PDA preview for PLAN with [T1,T2,T3] matches Canon validation (totalUE = 9)', () => {
  const intent = pda.resolve('PLAN', { actor_ok: '::TEST::', triads: ['T1', 'T2', 'T3'] });
  const preview = pda.preview(intent);
  if (!preview.blocked) {
    assert.equal(preview.total_ue, 9);
  }
  // Also verify Canon directly gives same totalUE
  const canonValidation = Canon.emissionPolicy.validateTriadSelection(['T1', 'T2', 'T3']);
  assert.equal(canonValidation.totalUE, 9);
});

test('PDA preview for PLAN with [T5] alone blocked (matches Canon)', () => {
  const intent = pda.resolve('PLAN', { actor_ok: '::TEST::', triads: ['T5'] });
  const preview = pda.preview(intent);
  assert.ok(preview.blocked);
  // Canon also blocks T5 alone
  assert.ok(!Canon.emissionPolicy.validateTriadSelection(['T5']).valid);
});

test('PDA preview for THRESHOLD with valid OK passes Canon validation', () => {
  const intent = pda.resolve('THRESHOLD', { ok_key: '::HELLO::' });
  const preview = pda.preview(intent);
  assert.ok(!preview.blocked);
  assert.equal(preview.type, 'threshold');
  // Canon also validates it
  assert.ok(Canon.grammar.isValidOK('::HELLO::'));
});

test('PDA preview for THRESHOLD with system reserve ::01:: blocked (matches Canon.isSystemReserve)', () => {
  const intent = pda.resolve('THRESHOLD', { ok_key: '::01::' });
  const preview = pda.preview(intent);
  assert.ok(preview.blocked);
  // Canon also blocks it
  assert.ok(Canon.reserved.isSystemReserve('01'));
});

test('PDA.getStatus().canon === Canon.CANON_VERSION', () => {
  assert.equal(pda.getStatus().canon, Canon.CANON_VERSION);
});

test('PDA.getCapabilities().intents returns 5 intents', () => {
  const caps = pda.getCapabilities();
  assert.ok(Array.isArray(caps.intents));
  assert.equal(caps.intents.length, 5);
  const keys = caps.intents.map(i => i.key);
  assert.ok(['PLAN', 'FLOW', 'MIRROR', 'REPLAY', 'THRESHOLD'].every(k => keys.includes(k)));
});

// ============================================================
// EMISSION POLICY DEPLOYMENT CONTRACT
// ============================================================
console.log('\n=== EMISSION POLICY DEPLOYMENT CONTRACT ===\n');

test('EMISSION_POLICY.silence_window = { from: "19:55", to: "20:00" }', () => {
  assert.deepEqual(Canon.emissionPolicy.EMISSION_POLICY.silence_window, { from: '19:55', to: '20:00' });
});

test('EMISSION_POLICY.burn_window_hours = 28', () => {
  assert.equal(Canon.emissionPolicy.EMISSION_POLICY.burn_window_hours, 28);
});

test('EMISSION_POLICY.phase_windows.active = { start: "04:00", end: "19:55" }', () => {
  assert.deepEqual(Canon.emissionPolicy.EMISSION_POLICY.phase_windows.active, { start: '04:00', end: '19:55' });
});

  test('EMISSION_POLICY.phase_windows.silence = { start: "19:55", end: "20:00" }', () => {
  assert.deepEqual(Canon.emissionPolicy.EMISSION_POLICY.phase_windows.silence, { start: '19:55', end: '20:00' });
});

// ============================================================
// VERSION HANDSHAKE CONTRACT
// ============================================================
console.log('\n=== VERSION HANDSHAKE CONTRACT ===\n');

test('Handshake: 0.5.1000.01 within range [0.5.1000.01, 1.x] -> PASS', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('0.5.1000.01', '0.5.1000.01', '1.x');
  assert.ok(result, '0.5.1000.01 should be compatible');
});

test('Handshake: 0.5.999.99 below min [0.5.1000.01, 1.x] -> FAIL', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('0.5.999.99', '0.5.1000.01', '1.x');
  assert.ok(!result, '0.5.999.99 should be incompatible');
});

test('Handshake: 0.4.99.99 below min [0.5.1000.01, 1.x] -> FAIL', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('0.4.99.99', '0.5.1000.01', '1.x');
  assert.ok(!result, '0.4.99.99 should be incompatible');
});

test('Handshake: 1.0.0.0 within [0.5.1000.01, 1.x] -> PASS', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('1.0.0.0', '0.5.1000.01', '1.x');
  assert.ok(result, '1.0.0.0');
});

test('Handshake: 2.0.0.0 above max [0.5.1000.01, 1.x] -> FAIL', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('2.0.0.0', '0.5.1000.01', '1.x');
  assert.ok(!result, '2.0.0.0');
});

test('Handshake: exact version 0.5.1000.01 with max 0.5.1000.05 -> PASS', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('0.5.1000.01', '0.5.1000.01', '0.5.1000.05');
  assert.ok(result, 'exact min version');
});

test('Handshake: 0.5.1000.06 above exact max 0.5.1000.05 -> FAIL', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('0.5.1000.06', '0.5.1000.01', '0.5.1000.05');
  assert.ok(!result, 'above exact max');
});

test('Handshake: 1.2.3.4 within [0.5.1000.01, 1.x] -> PASS', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('1.2.3.4', '0.5.1000.01', '1.x');
  assert.ok(result, '1.2.3.4');
});

test('Handshake: version with leading zeros 0.05.1000.01 equals 0.5.1000.01', () => {
  const handshake = new (require('../core/version-handshake'))();
  const result = handshake._checkVersionInRange('0.05.1000.01', '0.5.1000.01', '1.x');
  assert.ok(result, 'leading zeros handled');
});

// ============================================================
// SUMMARY
// ============================================================
const total = passed + failed;
console.log('\n========================================');
console.log(`Canon Contract Tests: ${passed} passed, ${failed} failed`);
console.log('========================================\n');

if (failed > 0) process.exit(1);
