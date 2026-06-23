/**
 * Temporal Module
 * Временная механика: 24+4, burn, silence, impulse
 */

module.exports = {
  // ========================================
  // Временные границы (все в UTC)
  // ========================================
  
  // Границы дня (полночь UTC)
  MIDNIGHT_UTC: '00:00:00',
  
  // Silence: 19:55–20:00 UTC (5 минут полной тишины)
  SILENCE_START: '19:55:00',
  SILENCE_END: '20:00:00',
  
  // Sleep (impulse phase): 20:00–04:00 UTC
  SLEEP_START: '20:00:00',
  SLEEP_END: '04:00:00',
  
  // Active: 04:00–19:55 UTC
  ACTIVE_START: '04:00:00',
  ACTIVE_END: '19:55:00',

  // ========================================
  // 24+4 Правило (длительность жизни У.Е.)
  // ========================================
  getLifetime: function(phase) {
    if (phase === 'impulse') {
      return 28 * 60 * 60 * 1000; // 28 часов в миллисекундах
    }
    return 24 * 60 * 60 * 1000;    // 24 часа для active
  },

  // ========================================
  // Расчёт burn_at
  // ========================================
  calculateBurnAt: function(emissionTimestamp) {
    const emit = new Date(emissionTimestamp);
    const emitHour = emit.getUTCHours();
    
    // Если эмиссия в sleep (20:00-03:59) → +2 дня до полуночи
    // Если эмиссия в active (04:00-19:59) → +1 день до полуночи
    
    const nextMidnight = new Date(Date.UTC(
      emit.getUTCFullYear(),
      emit.getUTCMonth(),
      emit.getUTCDate() + (emitHour >= 20 || emitHour < 4 ? 2 : 1),
      0, 0, 0, 0
    ));
    
    return nextMidnight.toISOString();
  },

  // ========================================
  // Определение фазы по timestamp
  // ========================================
  getPhase: function(timestamp) {
    const t = new Date(timestamp);
    const hour = t.getUTCHours();
    const minute = t.getUTCMinutes();
    const timeInMinutes = hour * 60 + minute;
    
    const silenceStart = 19 * 60 + 55; // 19:55
    const silenceEnd = 20 * 60;         // 20:00
    const sleepEnd = 4 * 60;           // 04:00
    
    // Silence
    if (timeInMinutes >= silenceStart && timeInMinutes < silenceEnd) {
      return 'silence';
    }
    
    // Sleep / Impulse (ночь)
    if (timeInMinutes >= silenceEnd || timeInMinutes < sleepEnd) {
      return 'impulse';
    }
    
    // Active (день)
    return 'active';
  },

  // ========================================
  // Проверка: можно ли совершить акт
  // ========================================
  canAct: function(timestamp) {
    const phase = this.getPhase(timestamp);
    
    // В silence — нельзя ничего
    if (phase === 'silence') {
      return { allowed: false, reason: 'silence_period' };
    }
    
    return { allowed: true, phase };
  },

  // ========================================
  // Проверка: истёк ли burn_at
  // ========================================
  isBurned: function(burnAt, now = new Date()) {
    return new Date(burnAt) <= now;
  },

  // ========================================
  // Ограничения эмиссии (26 У.Е. за период)
  // ========================================
  MAX_UE_PER_PERIOD: 26,
  
  // Лимиты по триадам
  TRIAD_LIMITS: {
    T1: 3, // 1,2,3
    T2: 3, // 4,5,6
    T3: 3, // 7,8,9
    T4: 3, // 10,11,12
    T5: 1  // 21 (только после T1-T4)
  }
};