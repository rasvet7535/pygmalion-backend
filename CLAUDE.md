# Pygmalion / C.R.I.S.T.A.L.L. — Backend v0.4.0 "Canonical Phase"

## О проекте

Социально-технологический стартап. НОД-платформа 7-го техноуклада (Ноономика).  
MVP не является продуктом — это форма наблюдения нематериального человеческого участия без денег, принуждения и оценки.

## Архитектура

```
Docker Stack (PostgreSQL + Backend + Activepieces + Grafana)
  ├── backend/
  │   ├── server.js          ← API Gateway (Express)
  │   ├── core/
  │   │   ├── canon/         ← Canon Layer (SSOT, 7 модулей)
  │   │   │   ├── index.js           ← entry point (const Canon = require('./core/canon'))
  │   │   │   ├── emission-policy.js ← лимиты эмиссии
  │   │   │   ├── grammar.js         ← Grammar Engine
  │   │   │   ├── ontology.js        ← фазы, статусы, типы актов
  │   │   │   ├── temporal.js        ← 24+4, burn, silence
  │   │   │   ├── reserved.js        ← системный резерв, ОРАКУЛ-С
  │   │   │   ├── bridges.js         ← bridge-symbols
  │   │   │   └── protocols.js       ← протоколы доступа
  │   │   ├── metronome.js   ← фазы времени (silence 19:55-20:00)
  │   │   └── grammar-engine.js ← парсинг О.К.
  │   └── replay-core.js     ← реконструкция событий
  ├── sql-schema/            ← schema auto-init
  ├── tools/                 ← утилиты
  ├── docs/                  ← ADR, CHRONICLE, REPLAY-TEST
  ├── docker-compose.yml
  └── Dockerfile
```

## Canon Layer

**Путь:** `backend/core/canon/`  
**Версия:** `phase1-stable-2026.05`  
**SSOT:** `emission-policy.js` — лимиты эмиссии (min 3, max 13 У.Е./день)  
**Импорт:** `const Canon = require('./core/canon');`

См. `AI-SYSTEM-MAP.md` для полной карты модулей.

### Ключевые константы
- Эмиссия: 3–13 У.Е./день, триады T1–T5
- Silence: 19:55–20:00 UTC (никаких актов)
- Burn: 24h (active) / 28h (impulse)
- Резерв: `::0::`–`::33::`, ОРАКУЛ-С `::О::`

## Основные файлы
- `backend/server.js` — API Gateway (порт 3000)
- `backend/core/metronome.js` — Метроном (фазы времени)
- `backend/core/grammar-engine.js` — Grammar Engine
- `backend/tools/replay-core.js` — Replay Test (верификация)
- `docker-compose.yml` — Docker стек

## Этика
- Добровольность
- Отсутствие принуждения
- Отказ от KPI-логики
- Приоритет человеческого достоинства
- Числовое сдерживание вместо цифровой экспансии

## Разработка
```bash
docker-compose up -d
docker-compose logs -f backend
```

## Репозитории
- Backend: https://github.com/TVOY1000/-Pygmalion-
- Landing: https://github.com/rasvet7535/pygmalion-landing
- Field: https://github.com/rasvet7535/pygmalion-field
- Bridge: https://github.com/rasvet7535/notebooklm-mcp
