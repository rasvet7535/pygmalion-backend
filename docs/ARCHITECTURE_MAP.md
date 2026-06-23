# Architecture Map — Pygmalion / C.R.I.S.T.A.L.L. v0.5.1000.01

## Слои (только нисходящие вызовы)

```
┌─────────────────────────────────────┐
│  Layer 1: Human Will (О.К.)         │
│  Форма волеизъявления участника     │
├─────────────────────────────────────┤
│  Layer 2: PDA (Personal Data Agent) │
│  Интерпретация, маршрутизация,      │
│  preview, выполнение                │
│  Входной слой для: CLI, Web,        │
│  Desktop, Telegram, grammar-engine  │
├─────────────────────────────────────┤
│  Layer 3: Services                  │
│  Оркестрация бизнес-логики          │
│  emission, transfer, burn, mirror,  │
│  threshold, replay, annotation,     │
│  cooldown, governance               │
├─────────────────────────────────────┤
│  Layer 4: Canon Layer (SSOT)        │
│  Единый источник правил:            │
│  emission-policy, metronome,        │
│  temporal, grammar, reserved,       │
│  bridges, protocols, ontology       │
├─────────────────────────────────────┤
│  Layer 5: Repository (pg Pool)      │
│  Доступ к PostgreSQL                │
├─────────────────────────────────────┤
│  Layer 6: acts_log (SSOT данных)    │
│  Хроника всех актов                 │
└─────────────────────────────────────┘
```

## Запрещённые направления

- Layer 6 → Layer 2 ❌ (acts_log → PDA)
- Layer 4 → Layer 2 ❌ (Canon → PDA)
- Layer 5 → Layer 2 ❌ (Repository → PDA)

Разрешены только нисходящие вызовы: PDA → Services → Canon → Repository → acts_log.

## Модули

| Модуль | Путь | Назначение |
|--------|------|------------|
| PDA | `PDA/index.js` | Входной слой, Canon Handshake, Capability Manifest |
| Canon | `backend/core/canon/` | Правила (SSOT) — emission-policy, temporal, grammar, reserved, bridges, protocols, ontology |
| Metronome | `backend/core/metronome.js` | Темпоральный суверенитет (active/silence/impulse) |
| Services | `backend/services/` | Бизнес-логика (emission, transfer, burn, mirror, threshold, replay) |
| Routes | `backend/routes/` | HTTP адаптеры — agent, observability, acts, mirror, replay, health |
| PDA Tests | `PDA/tests/` | Unit tests + Canon Contract Tests |

## HTTP API

### Agent Layer (PDA Adapter)
| Endpoint | Method | Описание |
|----------|--------|----------|
| `/api/agent/preview` | POST | Preview действия (read-only) |
| `/api/agent/execute` | POST | Preview + Execute |
| `/api/agent/status` | GET | Статус PDA |
| `/api/agent/capabilities` | GET | Manifest возможностей |

### Observability (read-only)
| Endpoint | Method | Описание |
|----------|--------|----------|
| `/api/replay/status` | GET | Статус Replay |
| `/api/metronome/phase` | GET | Текущая фаза |
| `/api/canon/version` | GET | Версия Канона |
| `/api/ssot/recent` | GET | Последние акты |
| `/api/agent/status` | GET | Статус PDA (alias) |
