# PROGRESS - v0.4.03 "Crystal Bridge"

## Обзор

Этот файл отражает текущий статус компонентов и верификацию.

Статус `Pending` означает:

"Артефакт верифицирован/переведён, но не пройден через Execute".

Каждая строка станет `Done` только после прохождения 4 стадий.

| Компонент | Версия | Статус миграции | Статус | Верификация |
|---|---|---|---|---|
| Canon Module | v0.4.02.GENEZIS | Перенесены тесты | Pending | canon-contract tests |
| Grammar Engine | v0.4.02.GENEZIS | Лексер / парсер | Pending | grammar tests |
| Replay Service | v0.4.02.GENEZIS | Мигрирован под acts_log | Pending | Replay |
| threshold.js | v0.3.26.05 GOLDEN | Портирован лексер | Pending | API + UI verification |
| style-threshold.css | v0.3.26.05 GOLDEN | CSS портирован | Pending | UI verification |
| field.html | pygmalion-field | Визуализация полей | Pending | API verification |
| observer.html | pygmalion-field | Наблюдатель за состоянием | Pending | API verification |
| i18n.js / ru.json / en.json | GOLDEN | Локализация | Pending | translation key comparison |

## Артефакты

Следующий файл является SOURCE MATERIAL для переноса:

`лексер.txt`

Он выступает как источник и не верифицируется.

При переносе `threshold.js` и `threshold-canonical.js` необходимо сохранить обратную совместимость API.

## UNKNOWN

Не верифицированы следующие компоненты:

1. Маппинг лексера GENEZIS API.
2. API request/response контракты.
3. Миграции PostgreSQL.
4. Состояние Replay.
5. Рендеринг PDF/DOCX.
6. Файл `digital-inferno-preprint-v6.docx`.

## Обновление

Перевод строк `Pending` в `Done` происходит только после верификации.