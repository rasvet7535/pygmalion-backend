/**
 * Ontology Module
 * Фазы, статусы, типы актов — константы для понимания "что есть что"
 */

module.exports = {
  // ========================================
  // Фазы (Metronome)
  // ========================================
  PHASES: {
    SILENCE: 'silence',    // 19:55–20:00 полная тишина
    SLEEP: 'sleep',        // 20:00–04:00 ночной сон/предзаказ
    ACTIVE: 'active',      // 04:00–19:55 активный день
    IMPULSE: 'impulse'    // подфаза sleep: зачатие без действия
  },

  // ========================================
  // Статусы У.Е.
  // ========================================
  UE_STATUS: {
    IMPULSE: 'impulse',   // ночная эмиссия — 28 часов жизни
    ACTIVE: 'active',     // дневная эмиссия — 24 часа жизни
    TRANSFERRED: 'transferred',
    BURNED: 'burned'
  },

  // ========================================
  // Типы актов (полный список)
  // ========================================
  ACT_TYPES: {
    // Основные
    EMISSION: 'EMISSION',
    TRANSFER: 'TRANSFER',
    BURNED: 'BURNED',
    RECOGNITION: 'RECOGNITION',
    THRESHOLD_CROSSED: 'THRESHOLD_CROSSED',
    
    // Временные (Вр.У.З.)
    TEMPORARY_CREATED: 'TEMPORARY_CREATED',
    TEMPORARY_CONFIRMED: 'TEMPORARY_CONFIRMED',
    TEMPORARY_CANCELLED: 'TEMPORARY_CANCELLED',
    
    // Системные
    PHASE_CHANGE: 'PHASE_CHANGE',
    TRIAD_RESET: 'TRIAD_RESET',
    OOK_REGISTER: 'OOK_REGISTER',
    
    // Организационные
    ORDER_JOIN: 'ORDER_JOIN',
    DEPARTMENT_JOIN: 'DEPARTMENT_JOIN',
    UNION_CREATED: 'UNION_CREATED',
    COUNCIL_CREATED: 'COUNCIL_CREATED',
    SUCCESSION: 'SUCCESSION'
  },

  // ========================================
  // Триады (домены активности)
  // ========================================
  TRIADS: {
    T1: { name: 'Знания', range: [1, 2, 3] },
    T2: { name: 'Практики', range: [4, 5, 6] },
    T3: { name: 'Творчество', range: [7, 8, 9] },
    T4: { name: 'Досуг/ЗОЖ', range: [10, 11, 12] },
    T5: { name: '№21', range: [21] }  // Special — только после активации T1-T4
  },

  // ========================================
  // Статусы О.К.
  // ========================================
  OK_STATUS: {
    ACTIVE: 'active',
    GUEST: 'guest',      // временный (после инертности)
    ARCHIVED: 'archived' // больше не используется
  }
};