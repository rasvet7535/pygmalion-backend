// ============================================================
// Metronome — Единый источник времени для Пигмалион v0.4.0
// ============================================================
//
// Принцип: Темпоральный суверенитет
// Система не зависит от биологического ритма пользователя.
// Метроном бьёт с точностью цезиевых часов.
//
// Все вычисления времени проходят через эту точку.
// ============================================================

/**
 * Получить текущее внутреннее время системы
 * @returns {number} Unix timestamp (миллисекунды)
 */
function getCurrentTime() {
  return Date.now();
}

/**
 * Получить текущее время в ISO формате
 * @returns {string} ISO timestamp
 */
function getCurrentTimeISO() {
  return new Date(getCurrentTime()).toISOString();
}

/**
 * Получить текущую фазу системы
 * @returns {string} 'active' | 'silence' | 'impulse'
 */
function getCurrentPhase() {
  const now = getCurrentTime();
  const date = new Date(now);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const totalMinutes = hours * 60 + minutes;

  // 04:00–19:55 UTC → active
  if (totalMinutes >= 4 * 60 && totalMinutes < 19 * 60 + 55) {
    return 'active';
  }

  // 19:55–20:00 UTC → silence
  if (totalMinutes >= 19 * 60 + 55 && totalMinutes < 20 * 60) {
    return 'silence';
  }

  // 20:00–03:59 UTC → impulse
  return 'impulse';
}

/**
 * Проверить, разрешена ли эмиссия в текущей фазе
 * @returns {boolean}
 */
function isEmissionAllowed() {
  const phase = getCurrentPhase();
  return phase !== 'silence';
}

/**
 * Проверить, разрешена ли передача в текущей фазе
 * @returns {boolean}
 */
function isTransferAllowed() {
  const phase = getCurrentPhase();
  return phase === 'active';
}

/**
 * Получить следующую полночь UTC
 * @param {number} [timestamp] - Unix timestamp (по умолчанию текущее время)
 * @returns {number} Unix timestamp следующей полуночи UTC
 */
function getNextMidnightUTC(timestamp) {
  const time = timestamp || getCurrentTime();
  const date = new Date(time);

  const nextMidnight = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1,
    0, 0, 0, 0
  ));

  return nextMidnight.getTime();
}

/**
 * Вычислить burnAt для эмиссии
 * @param {number} [emissionTime] - Unix timestamp эмиссии (по умолчанию текущее время)
 * @returns {string} ISO timestamp burnAt
 */
function calculateBurnAt(emissionTime) {
  const time = emissionTime || getCurrentTime();
  const burnAtTimestamp = getNextMidnightUTC(time);
  return new Date(burnAtTimestamp).toISOString();
}

/**
 * Получить границу окна для проекций (window_start)
 * Канон: последняя полночь UTC
 * @returns {string} ISO timestamp для window_start
 */
function getWindowStart() {
  const now = getCurrentTime();
  const date = new Date(now);

  // Последняя полночь UTC (начало текущих суток)
  const lastMidnight = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    0, 0, 0, 0
  ));

  return lastMidnight.toISOString();
}

/**
 * Вычислить тишину (время с последнего акта)
 * @param {string} lastActTimestamp - ISO timestamp последнего акта
 * @returns {number} Часы тишины
 */
function calculateSilence(lastActTimestamp) {
  if (!lastActTimestamp) return Infinity;

  const now = getCurrentTime();
  const lastAct = new Date(lastActTimestamp).getTime();
  const diffMs = now - lastAct;

  return diffMs / (1000 * 60 * 60); // часы
}

// ============================================================
// Экспорт
// ============================================================

module.exports = {
  getCurrentTime,
  getCurrentTimeISO,
  getCurrentPhase,
  isEmissionAllowed,
  isTransferAllowed,
  getNextMidnightUTC,
  calculateBurnAt,
  getWindowStart,
  calculateSilence
};
