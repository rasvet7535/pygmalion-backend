# IMPLEMENTATION-PLAN.md — PDA Integration Phase

**Статус:** Draft (ожидает утверждения)
**Дата:** 2026-06-28
**Источники:** PDA_IMPLEMENTATION_REPORT.md, PDA_HARDENING_REPORT.md, JULES-READINESS-AUDIT.md, sandbox-v0.3.26.05

---

## Контекст

Текущее состояние:
- PDA Layer (v0.4.02): 87 unit tests + 63 contract tests + 10 integration = 151/151 ✅
- Services Layer: выделен из server.js, но server.js всё ещё содержит inlined business logic
- CI: GitHub Actions (sync + integration + replay) ✅
- Engineering Governance: CANON, AI_GOVERNANCE, AGENTS, JULES_EXECUTION_POLICY ✅

sandbox-v0.3.26.05 (golden version):
- Фронтенд MVP: Vanilla JS + localStorage
- 5 протоколов в `logic.js` (4724 строки): ПЛАН, ТОК, КОЛ, ВЕС, ББООСС
- Константа `MAX_UE_PER_PERIOD = 26` — временная ёмкость системы

Цель PDA Integration Phase:
**Завершить PDA как слой для пилотной версии (v0.5.1000.01).**

---

## Epic 1: Server.js Refactoring

**Цель:** Превратить server.js в thin HTTP adapter, который делегирует всю бизнес-логику PDA/Services.

**Зависимости:** Service Layer уже выделен (emission, transfer, burn, mirror, threshold, replay).

### Feature 1.1: Удаление inlined business logic из server.js

**Задачи:**

| # | Задача | Файл | Ожидаемый результат |
|---|--------|------|---------------------|
| 1.1.1 | Вынести burn cron из server.js в отдельный модуль `backend/cron/burn-cycle.js` | `backend/cron/burn-cycle.js` | Burn запускается через cron, server.js не содержит SQL |
| 1.1.2 | Заменить inlined emission/transfer в server.js на вызовы Services Layer | `backend/server.js` | Все POST /api/acts обрабатываются через Services |
| 1.1.3 | Убедиться что server.js не содержит прямых SQL-запросов | `backend/server.js` | 0 SQL в server.js |

**Критерии готовности:**
- [ ] server.js < 150 строк (было ~200+)
- [ ] 0 прямых SQL-запросов в server.js
- [ ] Все существующие тесты проходят
- [ ] Burn cron работает автономно

**Риски:**
- Burn cron может иметь timing edge cases (midnight UTC)
- Нарушение обратной совместимости API

**Связь с Каноном:** EMISSION_POLICY (burn_window_hours: 28), temporal.js (burn_at)

### Feature 1.2: PDA как единственный вход для всех действий

**Задачи:**

| # | Задача | Файл | Ожидаемый результат |
|---|--------|------|---------------------|
| 1.2.1 | Перенаправить все /api/acts/* через PDA.run() / PDA.confirm() | `backend/server.js`, `backend/routes/acts.js` | PDA — единственный gateway |
| 1.2.2 | Удалить дублирующий код из routes/acts.js (handleEmission, handleTransfer) | `backend/routes/acts.js` | Routes только делегируют |
| 1.2.3 | Обновить README и ARCHITECTURE_MAP | `README.md`, `docs/ARCHITECTURE_MAP.md` | Документация отражает новую архитектуру |

**Критерии готовности:**
- [ ] POST /api/acts/emission → PDA.confirm('PLAN', payload)
- [ ] POST /api/acts/transfer → PDA.confirm('FLOW', payload)
- [ ] POST /api/acts/threshold → PDA.confirm('THRESHOLD', payload)
- [ ] GET /api/acts → через Services (read-only)
- [ ] 0 бизнес-логики в routes/

**Риски:**
- Изменение поведения API (breaking change для клиентов)
- PDA confirm() должен возвращать те же форматы ответов

**Связь с Каноном:** 6-слойная архитектура (Layer 2: PDA)

---

## Epic 2: Docker Integration Tests (175/175)

**Цель:** Полный цикл тестов в CI с PostgreSQL.

**Зависимости:** CI настроен, ci-seed.js создан, services выровнены с schema v3.1.

### Feature 2.1: PostgreSQL Service Container в CI

**Задачи:**

| # | Задача | Файл | Ожидаемый результат |
|---|--------|------|---------------------|
| 2.1.1 | Верифицировать что integration-tests job работает в GitHub Actions | `.github/workflows/ci.yml` | 175/175 тестов зелёные |
| 2.1.2 | Исправить любые ошибки в ci-seed.js | `tools/ci-seed.js` | Replay Verification: 0 mismatches |
| 2.1.3 | Добавить Replay Verification в CI chain | `.github/workflows/ci.yml` | Contract → Integration → Seed → Replay → PASS |

**Критерии готовности:**
- [ ] CI: sync-tests (150) ✅
- [ ] CI: integration-tests (175) ✅
- [ ] CI: replay verification (0 mismatches) ✅
- [ ] CI: docker-build ✅

**Риски:**
- PostgreSQL service container может иметь timing issues
- ci-seed.js может генерировать несовместимые данные

**Связь с Каноном:** Replay Test — обязательная верификация SSOT

### Feature 2.2: Разделение Docker Integration Tests

**Задачи:**

| # | Задача | Файл | Ожидаемый результат |
|---|--------|------|---------------------|
| 2.2.1 | Создать tests/pda-integration-sync.test.js (10 sync tests) | `tests/pda-integration-sync.test.js` | Sync tests без DB |
| 2.2.2 | Создать tests/pda-integration-db.test.js (7 async tests) | `tests/pda-integration-db.test.js` | DB tests с DATABASE_URL |
| 2.2.3 | Удалить tests/docker-integration.test.js | `tests/docker-integration.test.js` | Заменён на 2 файла |
| 2.2.4 | Обновить CI: sync tests в sync-tests job | `.github/workflows/ci.yml` | 160/175 без DB, 175/175 с DB |

**Критерии готовности:**
- [ ] node tests/pda-integration-sync.test.js — pass
- [ ] DATABASE_URL=... node tests/pda-integration-db.test.js — pass
- [ ] CI: оба файла запускаются в правильных jobs

**Риски:**
- Jules Level 2 task (первый execute task для Jules)

---

## Epic 3: Sandbox Logic Alignment

**Цель:** Убедиться что PDA воспроизводит логику golden version (sandbox-v0.3.26.05).

**Зависимости:** sandbox-v0.3.26.05 доступен для анализа.

### Feature 3.1: Верификация протоколов

**Задачи:**

| # | Задача | Файл | Ожидаемый результат |
|---|--------|------|---------------------|
| 3.1.1 | Сравнить TRIADS в sandbox/logic.js с emission-policy.js | `sandbox-v0.3.26.05/logic.js`, `backend/core/canon/emission-policy.js` | Совпадение: T1-T5, ranges, ueCount |
| 3.1.2 | Сравнить фазы (silence/sleep/active) в sandbox с temporal.js | `sandbox-v0.3.26.05/logic.js`, `backend/core/canon/temporal.js` | Совпадение: 19:55-20:00, 20:00-04:00 |
| 3.1.3 | Сравнить логику burn (MAX_UE_PER_PERIOD = 26) с emission-policy.js | `sandbox-v0.3.26.05/logic.js`, `backend/core/canon/emission-policy.js` | 26 = 13 max × 2 потока (active + impulse) |
| 3.1.4 | Сравнить протоколы (про.1-про.5) в sandbox с protocols.js | `sandbox-v0.3.26.05/logic.js`, `backend/core/canon/protocols.js` | Совпадение идентификаторов |

**Критерии готовности:**
- [ ] Все константы совпадают
- [ ] Все фазы совпадают
- [ ] Все протоколы совпадают
- [ ] Расхождения задокументированы (если есть)

**Риски:**
- sandbox может содержать устаревшую логику (v0.3.26 vs v0.4.02)
- Некоторые константы могут быть intentionally different

**Связь с Каноном:** CANON.md — normative source, sandbox — informative reference

### Feature 3.2: Документация расхождений

**Задачи:**

| # | Задача | Файл | Ожидаемый результат |
|---|--------|------|---------------------|
| 3.2.1 | Создать SANDBOX-COMPARISON.md с результатами верификации | `docs/SANDBOX-COMPARISON.md` | Таблица совпадений/расхождений |
| 3.2.2 | Обновить CANON.md если обнаружены критические расхождения | `CANON.md` | Требует отдельного утверждения |

**Критерии готовности:**
- [ ] SANDBOX-COMPARISON.md создан
- [ ] Все расхождения классифицированы (intentional / bug / unknown)
- [ ] Критические расхождения эскалированы человеку

---

## Epic 4: Replay Gate Hardening

**Цель:** Перевести Replay Gate из WARNING в ENFORCED режим.

**Зависимости:** Replay Verification работает в CI (Epic 2).

### Feature 4.1: Replay Gate ENFORCED mode

**Задачи:**

| # | Задача | Файл | Ожидаемый результат |
|---|--------|------|---------------------|
| 4.1.1 | Переключить REPLAY_GATE_MODE на ENFORCED по умолчанию | `backend/core/execution-gateway.js` | Блокировка execute при mismatches > 0 |
| 4.1.2 | Добавить тест для ENFORCED mode | `PDA/tests/pda.test.js` | Тест блокировки при replay failure |
| 4.1.3 | Обновить documentation | `docs/PDA_HARDENING_REPORT.md` | ENFORCED documented |

**Критерии готовности:**
- [ ] REPLAY_GATE_MODE=ENFORCED по умолчанию
- [ ] execute() блокируется при mismatches > 0
- [ ] Тесты проходят
- [ ] CI: replay verification в каждом PR

**Риски:**
- Может блокировать legitimate operations если replay имеет false positives
- Требует надёжного ci-seed.js

**Связь с Каноном:** Preview > Execute, Replay must be deterministic

---

## Epic 5: Documentation & Governance Update

**Цель:** Обновить все документы после завершения PDA Integration Phase.

**Зависимости:** Все предыдущие Epic завершены.

### Feature 5.1: Обновление governance-документов

**Задачи:**

| # | Задача | Файл | Ожидаемый результат |
|---|--------|------|---------------------|
| 5.1.1 | Обновить AI-SYSTEM-MAP.md | `docs/AI-SYSTEM-MAP.md` | Отражает текущее состояние |
| 5.1.2 | Обновить ARCHITECTURE_MAP.md | `docs/ARCHITECTURE_MAP.md` | PDA как единственный entry point |
| 5.1.3 | Обновить CHANGE_POLICY.md | `engineering/CHANGE_POLICY.md` | Новые ownership rules |
| 5.1.4 | Обновить RISK_REGISTER.md | `engineering/RISK_REGISTER.md` | Новые risks, resolved items |

**Критерии готовности:**
- [ ] Все документы актуальны
- [ ] Нет противоречий между документами
- [ ] Все ссылки работают

---

## Последовательность выполнения

```
Epic 1 (Server.js Refactoring)
    ↓
Epic 2 (Docker Integration Tests 175/175)
    ↓
Epic 3 (Sandbox Logic Alignment)
    ↓
Epic 4 (Replay Gate Hardening)
    ↓
Epic 5 (Documentation Update)
```

**Критический путь:** Epic 1 → Epic 2 → Epic 4

**Параллельно:** Epic 3 (sandbox comparison) может идти параллельно с Epic 1-2.

---

## Вопросы, требующие отдельного утверждения

1. **Формат API-ответов:** PDA.confirm() должен возвращать те же JSON-структуры, что и текущие routes? Или допустим новый формат?

2. **Burn cron:** Выносить в отдельный модуль или оставлять в server.js?

3. **Replay Gate ENFORCED:** Включать по умолчанию или оставить WARNING для пилота?

4. **sandbox-v0.3.26.05:** Использовать как reference implementation или как source of truth для логики?

5. **Breaking changes:** Допустимы ли изменения в API-контракте для пилотной версии?

---

## Definition of Done (вся Phase)

- [ ] server.js — thin HTTP adapter (< 150 строк, 0 SQL)
- [ ] PDA — единственный entry point для всех действий
- [ ] CI: 175/175 тестов + Replay Verification
- [ ] Replay Gate: ENFORCED mode
- [ ] sandbox logic alignment: documented
- [ ] Все governance-документы обновлены
- [ ] 0 архитектурных нарушений (6-layer, downward-only)
