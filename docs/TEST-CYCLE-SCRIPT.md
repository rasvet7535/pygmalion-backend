# TEST-CYCLE-SCRIPT.md
## Канонический сценарий жизненного цикла О.К.
### Phase 3.8 — Controlled Circulation Stabilization
**Версия:** 1.0 · **Дата:** 2026-05-25

---

## 1. Цель

Экологическая верификация жизненного цикла **У.Е. → У.М.**:
- У.Е. (Условная Единица) — импульс, рождается и сгорает
- У.М. (Учётный Маркер) — след признания, бессмертен

Главный критерий: после burn-cycle в системе остаются У.М.

---

## 2. Среда

| Параметр | Значение |
|----------|----------|
| Backend | `C:\pygmalion\backend-v0.4.1.TEST` |
| API | `http://127.0.0.1:3002` |
| DB | `pygmalion_v041_test` (изолированная) |
| Docker | `pygmalion-backend-v041-test` |

---

## 3. Сценарий теста

### Фаза 0: Рождение (Gestation)
Создание 5 тестовых О.К.: `::ТЕСТ1::` … `::ТЕСТ5::`
- **Действие:** `POST /api/threshold` с `{ok_key}`
- **Ожидание:** Запись в `ok_identity`. О.К. невидим в Поле до первого активного акта.
- **Проверка:** `SELECT * FROM ok_identity WHERE ok_key LIKE '::ТЕСТ%'`

### Фаза 1: Первый импульс (Emission)
Эмиссия У.Е. для каждого О.К. (кроме `::ТЕСТ1::`):
| О.К. | Триады | У.Е. |
|------|--------|------|
| `::ТЕСТ2::` | T1 | 1,2,3 |
| `::ТЕСТ3::` | T2 | 4,5,6 |
| `::ТЕСТ4::` | T3 | 7,8,9 |
| `::ТЕСТ5::` | T4,T5 | 10,11,12,21 |
| `::OP𝕯EH 𝕯AP::` | T1-T5 | 1-13,21 (29 лимит) |

- **Действие:** `POST /api/acts` с `{act_type: "EMISSION", actor_ok, payload: {triads}}`
- **Лимиты:** Все — 13 У.Е./день. `::OP𝕯EH 𝕯AP::` — 29 У.Е./день (13+16 глава ::О0::)
- **Проверка:** `ue_units` содержит `status='active'` для каждого О.К.

### Фаза 2: Признание (Transfer) — Критическая точка
Передача У.Е. от `::OP𝕯EH 𝕯AP::` к тестовым ключам:
| От | Кому | У.Е. |
|----|------|------|
| `::OP𝕯EH 𝕯AP::` | `::ТЕСТ1::` | 0 |
| `::OP𝕯EH 𝕯AP::` | `::ТЕСТ2::` | 1,2,3 |
| `::OP𝕯EH 𝕯AP::` | `::ТЕСТ3::` | 4,5,6 |
| `::OP𝕯EH 𝕯AP::` | `::ТЕСТ4::` | 7,8,9 |

Случайные трансферы между участниками:
| От | Кому | Кол-во |
|----|------|--------|
| `::ТЕСТ2::` | `::ТЕСТ1::` | 2 У.Е. |
| `::ТЕСТ4::` | `::ТЕСТ1::` | 1 У.Е. |
| `::ТЕСТ5::` | `::ТЕСТ2::` | 1 У.Е. |
| `::ТЕСТ5::` | `::ТЕСТ3::` | 1 У.Е. |

- **Трансформация:** У отправителя `status='transferred'`. У получателя — У.М. (immutable).
- **Проверка:** `ue_units WHERE status='transferred'` — счётчик У.М. для каждого О.К.

### Фаза 3: Очищение (Silence & Burn)
**Зона тишины (19:55–20:00 UTC):**
- Любые мутации данных → 403

**Burn-cycle (00:00 UTC / 00:45 cron):**
- `active`/`impulse` У.Е. → `burned` (сгорают)
- `transferred` У.Е. → **выживают** как У.М.

**Проверка после burn:**
```sql
-- У.М. должны быть
SELECT actor_ok, COUNT(*) as um_count
FROM ue_units WHERE status = 'transferred'
GROUP BY actor_ok;
-- active У.Е. должны сгореть
SELECT COUNT(*) FROM ue_units WHERE status = 'active';
-- Должно быть 0
```

### Фаза 4: Зеркало присутствия
Расчёт социального тонуса:
```
Вес = (Отдано × 2) + (Принято × 1) — (Сгорело × 1)
```
- Результат → `acts_log` как `REFLECTION` или `SUMMARY_DAY`
- Суммарный тонус ≥ +30 → Выход из Фазы 3

---

## 4. Критерии успеха

| Критерий | Ожидание | Статус |
|----------|----------|--------|
| Replay Integrity | 0 mismatch | ⬜ |
| Burn Correctness | У.М. выживают, active сгорают | ✅ 17→17 У.М., 13→0 active |
| Visibility | О.К. отображаются в Поле | ✅ Presence 200 OK |
| Transfer → У.М. | transacted У.Е. не сгорают | ✅ 9+4=13 API+SQL transfers |
| Emission limit | 29 У.Е. для `::OP𝕯EH 𝕯AP::` | ✅ ≤29 verified |
| Cyrillic keys | `::ТЕСТ1::`…`::ТЕСТ5::` проходят API | ✅ All phases pass |
| У.М. survive burn | transferred not in burn query | ✅ (cron fix: removed 'transferred' from WHERE) |

---

## 5. Команды

```bash
# Проверка здоровья
curl http://127.0.0.1:3002/health

# Эмиссия
curl -X POST http://127.0.0.1:3002/api/acts \
  -H "Content-Type: application/json" \
  -d '{"act_type":"EMISSION","actor_ok":"::ТЕСТ2::","payload":{"triads":["T1"]}}'

# Трансфер
curl -X POST http://127.0.0.1:3002/api/acts \
  -H "Content-Type: application/json" \
  -d '{"act_type":"TRANSFER","actor_ok":"::OP𝕯EH 𝕯AP::","target_ok":"::ТЕСТ2::","payload":{"ue_uuid":"..."}}'

# Принудительный burn (для теста)
curl -X POST http://127.0.0.1:3002/api/burn

# Presence проекция
curl http://127.0.0.1:3002/api/presence/::ТЕСТ1::

# Observer (панель)
curl http://127.0.0.1:3002/api/observer
```

---

## 6. Канонические константы

| Константа | Значение | Источник |
|-----------|----------|----------|
| `daily.min` | 3 У.Е. | emission-policy.js |
| `daily.max` | 13 У.Е. (все участники) | emission-policy.js |
| `::OP𝕯EH 𝕯AP::.max` | 29 У.Е. (13+16 за ::О0::) | emission-policy.js |
| Silence | 19:55–20:00 UTC | metronome.js |
| Burn | 00:45 UTC (cron) | server.js:2267 |
| Cooldown THRESHOLD | 1 час | server.js:98 |
| Cooldown EMISSION | 10 мин | server.js:99 |
| Cooldown TRANSFER | 15 мин | server.js:101 |
| Burn window | 28 часов | emission-policy.js |
