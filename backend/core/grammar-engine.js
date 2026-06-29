#!/usr/bin/env node
/**
 * Grammar Engine v0.4
 * Каноническая валидация О.К. по ЧисСлоБукВ v1.1
 *
 * Источник истины: C:\pygmalion\.claude\skills\ЧисСлоБукВ.txt
 *
 * Экспорт:
 *   isValidOK(ok, isAdmin)    — основная проверка
 *   classifyOK(ok)            — тип О.К. (user/admin/uz/invalid)
 *   getCanonicalAlphabet()    — массив канонических символов
 */
const fs = require('fs');
const path = require('path');

// --------------------------------------------------
// Канонический алфавит (ЧисСлоБукВ v1.1)
// --------------------------------------------------
// Всего: 48 заглавных букв + 10 цифр + 1 спецсимвол = 59 code points
// + 11 латинских дублей общих букв = 70 code points

const RUSSIAN = [ // 22 уникальные русские
  'Б','Г','Д','Ё','Ж','З','И','Й','Л','П','У','Ф','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'
];
const LATIN = [  // 16 уникальные латинские (включая I, Y)
  'C','D','F','G','H','I','J','L','N','Q','R','S','U','V','W','Y','Z'
];

// Общие буквы — существуют в двух Unicode вариантах (Cyrillic + Latin)
const COMMON_PAIRS = [
  ['А','A'], ['В','B'], ['Е','E'], ['К','K'], ['М','M'], ['Н','H'],
  ['О','O'], ['Р','P'], ['С','C'], ['Т','T'], ['Х','X']
];
const COMMON_ALL = COMMON_PAIRS.flat(); // 22 code point (11 Cyrillic + 11 Latin)

const DIGITS = ['0','1','2','3','4','5','6','7','8','9'];
const SPECIAL = ['𝕯'];

// Полный набор разрешённых символов (канон + пробел)
const ALLOWED_CHARS = new Set([
  ...RUSSIAN, ...LATIN, ...COMMON_ALL, ...DIGITS, ...SPECIAL, ' '
]);

// Системный резерв: ::0:: – ::33:: (1-2 символа для Орденов/Отделов)
const SYSTEM_RESERVE = new Set();
for (let i = 0; i <= 33; i++) {
  SYSTEM_RESERVE.add(String(i));
  SYSTEM_RESERVE.add(String(i).padStart(2, '0'));
}

// --------------------------------------------------
// Функции валидации
// --------------------------------------------------

function isValidOK(ok, isAdmin = false) {
  const result = classifyOK(ok, isAdmin);
  return result.valid;
}

function classifyOK(ok, isAdmin = false) {
  if (typeof ok !== 'string' || ok.length < 4) {
    return { valid: false, type: 'invalid', reason: 'not_a_string_or_too_short' };
  }

  // Формат: ::content::
  if (!ok.startsWith('::') || !ok.endsWith('::')) {
    return { valid: false, type: 'invalid', reason: 'missing_colons' };
  }

  const content = ok.slice(2, -2);
  const contentLength = content.length;

  if (contentLength < 1 || contentLength > 50) {
    return { valid: false, type: 'invalid', reason: 'content_length_out_of_range' };
  }

  // Проверка на системный резерв (::0:: – ::33::)
  if (SYSTEM_RESERVE.has(content)) {
    if (!isAdmin) {
      return { valid: false, type: 'admin', reason: 'reserved_for_admin' };
    }
    return { valid: true, type: 'admin', reason: 'system_reserve_valid' };
  }

  // У.З. — короткие маркеры 1-2 символа (из канонического алфавита)
  if (contentLength <= 2) {
    // Проверить каждый символ по канону
    const allCanonical = [...content].every(c => ALLOWED_CHARS.has(c));
    if (allCanonical) {
      return { valid: true, type: 'uz', reason: 'short_marker_valid' };
    }
    // Если есть неканонические символы
    return { valid: false, type: 'invalid', reason: 'non_canonical_short_marker' };
  }

  // Обычные участники: 3-50 символов
  // Запрет пробелов в начале/конце
  if (content.startsWith(' ') || content.endsWith(' ')) {
    return { valid: false, type: 'invalid', reason: 'leading_or_trailing_space' };
  }

  // Запрет двойных пробелов
  if (content.includes('  ')) {
    return { valid: false, type: 'invalid', reason: 'double_space' };
  }

  // Максимум 5 пробелов
  const spaceCount = (content.match(/ /g) || []).length;
  if (spaceCount > 5) {
    return { valid: false, type: 'invalid', reason: 'more_than_5_spaces' };
  }

  // === КАНОНИЧЕСКАЯ ПРОВЕРКА АЛФАВИТА ===
  for (const char of content) {
    if (ALLOWED_CHARS.has(char)) continue;
    // Bridge symbol: ДD — разрешён как bridge между алфавитами
    if (char === 'Д' || char === 'D') continue;
    return { valid: false, type: 'invalid', reason: `non_canonical_char` };
  }

  return { valid: true, type: 'user', reason: 'valid' };
}

function getCanonicalAlphabet() {
  return {
    russian: RUSSIAN,
    latin: LATIN,
    common: COMMON_ALL,
    digits: DIGITS,
    special: SPECIAL,
    all: [...ALLOWED_CHARS]
  };
}

// --------------------------------------------------
// Self-test при прямом запуске
// --------------------------------------------------
if (require.main === module) {
  console.log('=== Grammar Engine v0.4 — Self Test ===\n');

  const tests = [
    // Валидные (из канона)
    { ok: '::СВЕТ::',          expected: true,  label: 'Валид: только буквы' },
    { ok: '::OP𝕯EH 𝕯AP::',     expected: true,  label: 'Валид: 𝕯 + пробел' },
    { ok: '::01::',            expected: true,  label: 'Валид: админ', isAdmin: true },
    { ok: '::HELLO WORLD::',   expected: true,  label: 'Валид: 2 слова' },
    { ok: '::123 СВЕТ 321::',  expected: true,  label: 'Валид: цифры + буквы' },

    // У.З. — короткие маркеры (1-2 символа)
    { ok: '::А::',             expected: true,  label: 'Валид: У.З. (1 символ)' },
    { ok: '::AB::',            expected: true,  label: 'Валид: У.З. (2 символа)' },

    // Bridge symbol
    { ok: '::ДD::',            expected: true,  label: 'Валид: bridge ДD' },

    // Длинная фраза (6 слов, 5 пробелов)
    { ok: '::А В Е К М Н::',   expected: true,  label: 'Валид: 6 слов, 5 пробелов' },

    // Невалидные (из канона)
    { ok: '::привет::',        expected: false, label: 'Невалид: строчные' },
    { ok: '::A::',             expected: true,  label: 'Валид: У.З. (A)' },
    { ok: '::  СВЕТ  ::',      expected: false, label: 'Невалид: пробелы по краям' },
    { ok: '::HELLO   WORLD::', expected: false, label: 'Невалид: двойной пробел' },
    { ok: '::A B C D E F G::', expected: false, label: 'Невалид: >5 пробелов' },
    { ok: '::!@#$%::',         expected: false, label: 'Невалид: неканонические символы' },
    { ok: '::01::',            expected: false, label: 'Невалид: админ без прав', isAdmin: false },
  ];

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    const result = isValidOK(t.ok, t.isAdmin !== false);
    const status = result === t.expected ? '✅' : '❌';
    if (result === t.expected) passed++; else failed++;
    console.log(`${status} ${t.label}: ${t.ok} → ${result}${!result ? ' (' + classifyOK(t.ok, t.isAdmin !== false).reason + ')' : ''}`);
  }

  console.log(`\n---\n✅ Passed: ${passed} / ${passed + failed}`);
  if (failed > 0) process.exit(1);
}

module.exports = { isValidOK, classifyOK, getCanonicalAlphabet };
