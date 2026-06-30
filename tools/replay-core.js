#!/usr/bin/env node

/**
 * Replay Test — «Смерть и Воскрешение»
 *
 * Проверка восстановимости ue_units из acts_log (SSOT).
 * + validateDailyEmission() — верификация лимитов канона.
 *
 * Этапы:
 * 1. Фиксация текущего состояния (snapshot)
 * 2. Очистка ue_units (TRUNCATE)
 * 3. Реконструкция из acts_log (EMISSION → TRANSFER → BURNED)
 * 4. Верификация (сравнение с snapshot)
 * 5. Валидация лимитов эмиссии (canon check)
 */

const { Pool } = require('pg');
const Canon = require('../backend/core/canon');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://pygmalion:pygmalion_secret_2026@127.0.0.1:5433/pygmalion_v04'
});

// SSOT: canon/emission-policy.js
const TRIADS = Canon.emissionPolicy.TRIADS;
const EMISSION_POLICY = Canon.emissionPolicy.EMISSION_POLICY;

/**
 * validateDailyEmission — проверка лимитов эмиссии по канону
 *
 * Для каждого участника проверяет:
 * - не превышен ли дневной лимит max (13 У.Е.)
 * - не меньше ли минимального порога (3 У.Е.) при активной эмиссии
 * - не производилась ли эмиссия в Фазе Тишины (19:55–20:00)
 */
async function validateDailyEmission(client) {
  console.log('   📋 5.1: Валидация лимитов эмиссии...');

  const result = await client.query(`
    SELECT
      actor_ok,
      DATE(created_at) as day,
      SUM(COALESCE((payload->>'total_ue')::int, (payload->>'totalUE')::int, 0)) as total_emitted,
      COUNT(*) as emission_count,
      BOOL_OR(payload->>'phase' = 'silence') as has_silence_emission
    FROM acts_log
    WHERE act_type = 'EMISSION'
    GROUP BY actor_ok, DATE(created_at)
    ORDER BY actor_ok, day
  `);

  let violations = 0;
  let total_days = 0;

  for (const row of result.rows) {
    total_days++;
    const emitted = parseInt(row.total_emitted) || 0;
    const max_allowed = EMISSION_POLICY.daily.max;
    const min_required = EMISSION_POLICY.daily.min;

    if (emitted > max_allowed) {
      violations++;
      console.log(`      ⚠️  OVER-LIMIT: ${row.actor_ok} на ${row.day}: ${emitted} > ${max_allowed} У.Е.`);
    }

    if (row.has_silence_emission) {
      violations++;
      console.log(`      ⚠️  SILENCE-EMISSION: ${row.actor_ok} на ${row.day}: эмиссия в Фазе Тишины`);
    }

    if (emitted > 0 && emitted < min_required) {
      console.log(`      ℹ️  SUB-MIN: ${row.actor_ok} на ${row.day}: ${emitted} < ${min_required} У.Е. (допустимо при неполной эмиссии)`);
    }
  }

  console.log(`      ✅ Проверено дней: ${total_days}, нарушений: ${violations}`);
  return violations;
}

async function main() {
  console.log('🔄 Replay Test — «Смерть и Воскрешение»');
  console.log('=' .repeat(60));
  console.log();

  const client = await pool.connect();

  try {
    // ============================================================
    // Шаг 1: Фиксация текущего состояния (snapshot)
    // ============================================================
    console.log('📸 Шаг 1: Фиксация текущего состояния...');

    const snapshotResult = await client.query(`
      SELECT
        ue_uuid, ue_number, triad, actor_ok, status,
        created_at, burn_at, transferred_at,
        emission_act_id, transfer_act_id
      FROM ue_units
      ORDER BY created_at, ue_number
    `);

    const snapshot = snapshotResult.rows;
    console.log(`   ✅ Зафиксировано: ${snapshot.length} У.Е.`);
    console.log();

    // Build UUID map: (emission_act_id, ue_number, triad) → original UUID
    const uuidMap = new Map();
    snapshot.forEach(ue => {
      const key = `${ue.emission_act_id}-${ue.ue_number}-${ue.triad}`;
      uuidMap.set(key, ue.ue_uuid);
    });

    // ============================================================
    // Шаг 2: Очистка ue_units (TRUNCATE)
    // ============================================================
    console.log('💀 Шаг 2: Очистка ue_units (TRUNCATE)...');

    await client.query('BEGIN');
    await client.query('TRUNCATE ue_units CASCADE');
    await client.query('COMMIT');

    const checkEmpty = await client.query('SELECT COUNT(*) FROM ue_units');
    console.log(`   ✅ Таблица очищена: ${checkEmpty.rows[0].count} записей`);
    console.log();

    // ============================================================
    // Шаг 3: Реконструкция из acts_log
    // ============================================================
    console.log('🔨 Шаг 3: Реконструкция из acts_log...');
    console.log();

    // --- 3.1: Восстановление EMISSION с original UUID ---
    console.log('   📦 3.1: Восстановление EMISSION...');

    const emissionResult = await client.query(`
      SELECT
        act_id,
        actor_ok,
        payload,
        created_at
      FROM acts_log
      WHERE act_type = 'EMISSION'
      ORDER BY created_at
    `);

    let emissionCount = 0;
    for (const act of emissionResult.rows) {
      const { act_id, actor_ok, payload, created_at } = act;
      const { triads, phase } = payload;
      const burn_at = payload.burn_at || payload.burnAt;

      const status = phase === 'impulse' ? 'impulse' : 'active';

      for (const triad of triads) {
        const ueNumbers = TRIADS[triad]?.range || [];
        for (const ueNumber of ueNumbers) {
          const key = `${act_id}-${ueNumber}-${triad}`;
          const originalUuid = uuidMap.get(key);

          if (originalUuid) {
            // Use original UUID for deterministic reconstruction
            await client.query(`
              INSERT INTO ue_units (
                ue_uuid, ue_number, triad, actor_ok, status,
                created_at, burn_at, emission_act_id
              )
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `, [originalUuid, ueNumber, triad, actor_ok, status, created_at, burn_at, act_id]);
          } else {
            await client.query(`
              INSERT INTO ue_units (
                ue_number, triad, actor_ok, status,
                created_at, burn_at, emission_act_id
              )
              VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [ueNumber, triad, actor_ok, status, created_at, burn_at, act_id]);
          }
          emissionCount++;
        }
      }
    }

    console.log(`      ✅ Восстановлено: ${emissionCount} У.Е. из ${emissionResult.rows.length} актов EMISSION`);
    console.log();

    // --- 3.2: Применение TRANSFER ---
    console.log('   🔄 3.2: Применение TRANSFER...');

    const transferResult = await client.query(`
      SELECT
        act_id,
        target_ok,
        payload,
        created_at
      FROM acts_log
      WHERE act_type = 'TRANSFER'
      ORDER BY created_at
    `);

    let transferCount = 0;
    for (const act of transferResult.rows) {
      const { act_id, target_ok, payload, created_at } = act;
      const { ue_uuid } = payload;

      const updateResult = await client.query(`
        UPDATE ue_units
        SET
          status = 'transferred',
          actor_ok = $1,
          transferred_at = $2,
          transfer_act_id = $3
        WHERE ue_uuid = $4
      `, [target_ok, created_at, act_id, ue_uuid]);

      if (updateResult.rowCount > 0) {
        transferCount++;
      }
    }

    console.log(`      ✅ Применено: ${transferCount} передач из ${transferResult.rows.length} актов TRANSFER`);
    console.log();

    // --- 3.3: Применение BURNED ---
    console.log('   🔥 3.3: Применение BURNED...');

    const burnedResult = await client.query(`
      SELECT
        payload,
        created_at
      FROM acts_log
      WHERE act_type = 'BURNED'
      ORDER BY created_at
    `);

    let burnedCount = 0;
    for (const act of burnedResult.rows) {
      const { payload, created_at } = act;
      const ids = payload.ue_uuids || payload.ue_ids || (payload.ue_uuid ? [payload.ue_uuid] : []);

      const updateResult = await client.query(`
        UPDATE ue_units
        SET
          status = 'burned',
          transferred_at = $1
        WHERE ue_uuid = ANY($2::uuid[])
      `, [created_at, ids]);

      if (updateResult.rowCount > 0) {
        burnedCount += updateResult.rowCount;
      }
    }

    console.log(`      ✅ Применено: ${burnedCount} сгораний из ${burnedResult.rows.length} актов BURNED`);
    console.log();

    // ============================================================
    // Шаг 4: Верификация (сравнение с snapshot)
    // ============================================================
    console.log('🔍 Шаг 4: Верификация (сравнение с snapshot)...');
    console.log();

    const reconstructedResult = await client.query(`
      SELECT
        ue_uuid, ue_number, triad, actor_ok, status,
        created_at, burn_at, transferred_at,
        emission_act_id, transfer_act_id
      FROM ue_units
      ORDER BY created_at, ue_number
    `);

    const reconstructed = reconstructedResult.rows;

    console.log(`   📊 Snapshot:       ${snapshot.length} У.Е.`);
    console.log(`   📊 Reconstructed:  ${reconstructed.length} У.Е.`);
    console.log();

    // Сравнение по ключевым полям
    let matches = 0;
    let mismatches = 0;

    const snapshotMap = new Map();
    snapshot.forEach(ue => {
      const key = `${ue.ue_number}-${ue.triad}-${ue.emission_act_id}`;
      snapshotMap.set(key, ue);
    });

    reconstructed.forEach(ue => {
      const key = `${ue.ue_number}-${ue.triad}-${ue.emission_act_id}`;
      const original = snapshotMap.get(key);

      if (original) {
        // Сравниваем ключевые поля
        if (
          original.actor_ok === ue.actor_ok &&
          original.status === ue.status &&
          original.burn_at.getTime() === ue.burn_at.getTime()
        ) {
          matches++;
        } else {
          mismatches++;
          console.log(`   ⚠️  Mismatch: У.Е. №${ue.ue_number} (${ue.triad})`);
          console.log(`      Original: ${original.actor_ok} / ${original.status}`);
          console.log(`      Reconstructed: ${ue.actor_ok} / ${ue.status}`);
        }
      } else {
        mismatches++;
        console.log(`   ⚠️  Missing in snapshot: У.Е. №${ue.ue_number} (${ue.triad})`);
      }
    });

    console.log();
    console.log('=' .repeat(60));
    console.log('📊 РЕЗУЛЬТАТ REPLAY TEST:');
    console.log('=' .repeat(60));
    console.log(`   ✅ Совпадений:     ${matches}`);
    console.log(`   ❌ Расхождений:    ${mismatches}`);
    console.log();

    if (mismatches === 0 && matches === snapshot.length) {
      console.log('🎉 УСПЕХ! Проекция полностью восстановлена из acts_log.');
      console.log('   acts_log — единственный источник истины (SSOT) подтверждён.');
      console.log();
      console.log('✅ Фаза 1 «Фундамент» завершена.');
    } else {
      console.log('⚠️  ВНИМАНИЕ! Обнаружены расхождения.');
      console.log('   Проверьте логику реконструкции.');
    }

    console.log('=' .repeat(60));
    console.log();
    console.log('📋 Шаг 5: Валидация канона (emission limits)...');
    console.log();

    const violations = await validateDailyEmission(client);
    if (violations === 0) {
      console.log('   ✅ Все лимиты эмиссии соблюдены.');
    } else {
      console.log(`   ⚠️  Обнаружено ${violations} нарушений лимитов эмиссии.`);
    }

    console.log();
    console.log('=' .repeat(60));

  } catch (err) {
    console.error('❌ Ошибка:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
