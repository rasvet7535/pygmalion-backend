/**
 * Emission Policy Module
 * SSOT — Единый источник истины для лимитов эмиссии
 * Канон v1.1 · Этический стоп-кран активен
 *
 * ВСЕ лимиты эмиссии определяются ТОЛЬКО здесь.
 * server.js, metronome.js, replay.js импортируют из этого модуля.
 */

const EMISSION_POLICY = {
  // === Версия политики ===
  version: '0.5.1000.01',
  stage: 2,  // 1 = Phase 1 Stable, 2 = Pilot 1000

  daily: {
    min: 3,
    max: 13,  // Stage 1 & 2: T1-T5, 3-13 У.Е./день

    // Ниже — исторические/расширенные макс. значения (не активны в текущей версии)
    v2_01_max: 22,   // v2.01: +K1(13-16) + №22
    v3_01_max: 30,   // v3.01: +K2(17-20) + №23
    v4_01_max: 37,   // v4.01: T5→K3 (21-24) + K1 + K2

    // ::про.5:: расширения (Союз/Совет)
    proto5_soiuz_max: 40,   // 25-40, под эгидой Ордена
    proto5_sovet_max: 56,   // 41-56, под эгидой Отдела
  },

  triads: {
    // Базовые триады (Stage 1 & 2)
    T1: { name: 'Знания', range: [1, 2, 3], ueCount: 3 },
    T2: { name: 'Практики', range: [4, 5, 6], ueCount: 3 },
    T3: { name: 'Творчество', range: [7, 8, 9], ueCount: 3 },
    T4: { name: 'Досуг/ЗОЖ', range: [10, 11, 12], ueCount: 3 },
    T5: { name: '№21', range: [21], ueCount: 1 },
    // Расширения (активируются по версиям Канона)
    K1: { name: 'ИИПП', range: [13, 14, 15, 16], ueCount: 4, minCanonVersion: 'v2.01', protocol: 'про.5' },
    K2: { name: 'ИЯ', range: [17, 18, 19, 20], ueCount: 4, minCanonVersion: 'v3.01', protocol: 'про.5' },
    // EXT1, EXT2 — через ::про.5::, не триады в классическом смысле
    // Союз под эгидой Ордена: 25-40
    // Совет под эгидой Отдела: 41-56
  },

  // При какой версии T5 расширяется и/или переименовывается
  t5_evolution: {
    v2_01_add: [22],        // v2.01: +№22
    v3_01_add: [23],        // v3.01: +№23
    v4_01_rename: 'K3',     // v4.01: T5 → K3, range 21-24
    v4_01_add: [24],
  },

  silence_window: { from: "19:55", to: "20:00" },

  burn_window_hours: 28,

  special_roles: {
    initiator: {
      label: 'Предстоятель (Инициатор)',
      keys: ['::01::'],
      // Авто-эмиссия в 04:00 UTC: 2 R.U. × кол-во парт (1-16)
      auto_emission_ue_per_seat: 2,
      auto_emission_min_seats: 1,
      auto_emission_max_seats: 16,
      auto_emission_time: "04:00",
      // При формировании/перезапуске парты — 16+1 У.М. для приглашений
      invitation_um_base: 16,
      invitation_um_extra: 1,   // У.М. 00 (единовременно)
      marker_33: true,          // Решающий голос в Ордене ::01:: при равенстве (1-1, 2-2, ... 8-8)
    },
    order_head: {
      label: 'Глава Ордена',
      keys: ['::02::', '::03::', '::04::', '::05::', '::06::', '::07::', '::08::', '::09::'],
      bonus_ue: 16,
    },
    department_head: {
      label: 'Глава Отдела',
      bonus_ue: 16,
      count: 16,
    },
  },

  phase_windows: {
    active: { start: "04:00", end: "19:55" },
    silence: { start: "19:55", end: "20:00" },
    sleep: { start: "20:00", end: "04:00" },
  },
};

/**
 * Проверка, является ли О.К. Предстоятелем (Инициатором)
 */
function isPredstoyatel(ok_key) {
  return EMISSION_POLICY.special_roles.initiator.keys.includes(ok_key);
}

/**
 * Проверка, является ли О.К. Главой Ордена (::02:: - ::09::)
 */
function isOrderHead(ok_key) {
  return EMISSION_POLICY.special_roles.order_head.keys.includes(ok_key);
}

/**
 * Базовые триады Stage 1/2 (T1-T5)
 */
const BASE_TRIADS = ['T1', 'T2', 'T3', 'T4', 'T5'];

/**
 * Триады расширения (K1, K2 — требуют версии Канона v2.01+)
 */
const EXT_TRIADS = ['K1', 'K2'];

/**
 * Получить дневной лимит эмиссии для О.К.
 * Stage 1 (Phase 1, v0.4.x) & Stage 2 (Pilot 1000, v0.5.1000.01):
 *   T1-T5, 3-13 У.Е./день
 *   - Обычный участник: 3-13 У.Е./день
 *   - Глава Ордена (::02:: - ::09::) или Отдела: 13 + 16 = 29 У.Е./день
 *   - Предстоятель (::01::): авто-эмиссия в 04:00 UTC = 2 R.U. × парты (1-16)
 *     Не участвует в ручной эмиссии T1-T5.
 *
 * Расширения (K1/K2/EXT) активируются по версиям Канона v2.01+
 * и не входят в базовый дневной лимит 13.
 */
function getMaxUEPerDay(ok_key, extraRoles = {}) {
  const stageMax = EMISSION_POLICY.daily.max;

  if (isPredstoyatel(ok_key)) {
    // Предстоятель не использует ручную эмиссию T1-T5
    // Возвращаем авто-лимит: 2 R.U. × 16 парт = 32
    const role = EMISSION_POLICY.special_roles.initiator;
    return role.auto_emission_ue_per_seat * role.auto_emission_max_seats;
  }

  if (isOrderHead(ok_key) || extraRoles.isOrderHead || extraRoles.isDepartmentHead) {
    return stageMax + EMISSION_POLICY.special_roles.order_head.bonus_ue;
  }

  return stageMax;
}

/**
 * Получить авто-эмиссию Предстоятеля на основе занятых парт
 * @param {number} filledSeats - количество занятых парт (1-16)
 * @returns {number} R.U. на сегодня
 */
function getInitiatorAutoEmission(filledSeats) {
  const role = EMISSION_POLICY.special_roles.initiator;
  const seats = Math.max(role.auto_emission_min_seats,
    Math.min(role.auto_emission_max_seats, filledSeats));
  return role.auto_emission_ue_per_seat * seats;
}

const TRIADS = EMISSION_POLICY.triads;

/**
 * Валидация выбора триад по канону
 * Stage 1/2: только T1-T5, макс 13 У.Е.
 * K1/K2 — только при соотв. версии Канона
 */
function validateTriadSelection(triads, maxUE = EMISSION_POLICY.daily.max) {
  for (const triad of triads) {
    if (!TRIADS[triad]) {
      return { valid: false, error: `Неизвестная триада: ${triad}` };
    }
    // K1/K2 требуют версии Канона v2.01+
    if (EXT_TRIADS.includes(triad)) {
      return { valid: false, error: `${triad} (${TRIADS[triad].name}) требует версии Канона ${TRIADS[triad].minCanonVersion}. Текущая версия: ${EMISSION_POLICY.version}` };
    }
  }

  const hasT5 = triads.includes('T5');
  const hasRegularTriad = triads.some(t => BASE_TRIADS.includes(t));

  if (hasT5 && !hasRegularTriad) {
    return { valid: false, error: 'T5 (У.Е. №21) доступна только после активации хотя бы одной триады T1-T4' };
  }

  let totalUE = 0;
  triads.forEach(triad => { totalUE += TRIADS[triad].ueCount; });

  if (totalUE < EMISSION_POLICY.daily.min) {
    return { valid: false, error: `Минимум ${EMISSION_POLICY.daily.min} У.Е.` };
  }
  if (totalUE > maxUE) {
    return { valid: false, error: `Максимум ${maxUE} У.Е. для данного участника` };
  }

  return { valid: true, totalUE };
}

/**
 * Получить номера У.Е. для триады
 */
function getUENumbersByTriad(triad) {
  return TRIADS[triad] ? TRIADS[triad].range : [];
}

/**
 * Получить базовые триады Stage 1/2
 */
function getBaseTriads() {
  return BASE_TRIADS;
}

/**
 * Получить триады расширения (K1, K2)
 */
function getExtTriads() {
  return EXT_TRIADS;
}

module.exports = {
  EMISSION_POLICY,
  TRIADS,
  validateTriadSelection,
  getUENumbersByTriad,
  getBaseTriads,
  getExtTriads,
  isPredstoyatel,
  isOrderHead,
  getMaxUEPerDay,
  getInitiatorAutoEmission,
};
