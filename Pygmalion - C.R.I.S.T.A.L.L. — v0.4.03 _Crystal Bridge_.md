Role: Senior Backend Architect & Technical Lead operating in READ/WRITE-BOUNDARY mode.

Project: Pygmalion / C.R.I.S.T.A.L.L.
Current working directory:

C:\pygmalion\backend-v0.4.03.Crystal Bridge

Purpose:

Create four documentation files that describe the current state and migration map of the existing working directory.

IMPORTANT:

This task is DOCUMENTATION ONLY.

Do not migrate, copy, move, rename, delete, modify or refactor any existing project files.

Do not modify:
- CANON.md
- acts_log
- Replay implementation
- database schema
- Docker configuration
- package.json
- source code
- existing tests

Do not create any directories.

Do not execute destructive commands.

Do not install dependencies.

Do not run migrations.

Do not change Git state.

Do not infer undocumented facts.

If information is uncertain, contradictory, or not verified in the available files, explicitly mark it as UNKNOWN rather than inventing an answer.

The four files below are working documentation for the Crystal Bridge transition. They are NOT additions to CANON and MUST NOT be presented as canonical authority.

Create EXACTLY these four files in the root of the target directory:

1. README.md
2. STATUS.md
3. PROGRESS.md
4. DECISION.md


============================================================
1. README.md
============================================================

# Pygmalion / C.R.I.S.T.A.L.L. — v0.4.03 "Crystal Bridge"

## Назначение

`backend-v0.4.03.Crystal Bridge` является рабочим контуром перехода между исторической рабочей системой `v0.3.26.05`, инженерным ядром `v0.4.02.GENEZIS` и последующим развитием проекта.

Этот документ является описанием рабочего контура и НЕ является заменой CANON.md.

## Архитектурный принцип

Основной сквозной путь воли человека:

Human Will
→ DAP/PDA
→ Services
→ Canon Layer
→ Repository
→ acts_log

`acts_log` рассматривается как SSOT в соответствии с действующими архитектурными документами проекта.

## Режим работы

Изменения существующей системы выполняются только через:

Preview
→ Confirmation
→ Execute
→ Replay

Этот README не предоставляет агенту права самостоятельно переходить к Execute.

## Границы

В рамках данного контура:

- не изменяется CANON.md;
- не изменяется acts_log;
- не изменяется схема базы данных;
- не допускается Write-Bypass;
- не допускается прямой SQL-записью обходить установленный путь учёта;
- ИИ не является субъектом принятия решений за человека.

Все положения, относящиеся к будущей фазе v0.5, должны рассматриваться через их первичный источник и не должны автоматически считаться CANON.


============================================================
2. STATUS.md
============================================================

# PROJECT STATUS — v0.4.03 "Crystal Bridge"

## Текущий статус

Рабочая папка:

`C:\pygmalion\backend-v0.4.03.Crystal Bridge`

Папка предназначена для контролируемого восстановления и интеграции подтверждённых компонентов.

## Источники

Основные источники текущей карты:

- `v0.4.02.GENEZIS`
- `v0.3.26.05 (GOLDEN)`
- `pygmalion-field`
- существующая документация проекта
- результаты аудита MiMo/OpenCode/Grok/Gemini Notebook

## Важное правило

Документированные здесь сведения должны иметь различимый статус:

- FACT — подтверждённый факт;
- CANON — нормативное положение первичного канонического источника;
- DECISION — принятое человеком решение;
- HYPOTHESIS — рабочая гипотеза;
- UNKNOWN — вопрос, требующий проверки.

## Инфраструктура

Docker / PostgreSQL:

Текущее подтверждённое состояние должно быть получено из фактической среды.

Не считать порт `5433` или `5434` каноническим без проверки текущего `docker-compose.yml` и фактического состояния контейнеров.

Служба `com.docker.service`:

По диагностике Gordon бинарник службы присутствует, security descriptor синтаксически валиден, а причиной Access Denied предварительно считается контекст привилегий вызывающего процесса.

Изменение security descriptor не считать выполненным решением.

## Запреты

Не изменять автоматически:

- CANON.md
- acts_log
- Replay
- SQL schema
- Docker configuration
- package.json
- существующий исходный код

## Codex / другие агенты

Наличие или отсутствие возможности записи конкретного агента не является архитектурным решением.

Право на изменение определяется текущим Approval человека и рабочей фазой.


============================================================
3. PROGRESS.md
============================================================

# PROGRESS — v0.4.03 "Crystal Bridge"

## Назначение

Этот файл является картой инвентаризации и возможного переноса.

Статус `Pending` означает:

"кандидат на перенос/интеграцию, но перенос НЕ выполнен".

Никакой строкой этой таблицы не предоставляется разрешение на Execute.

| Компонент | Источник | Предполагаемое назначение | Статус | Верификация |
|---|---|---|---|---|
| Canon Module | v0.4.02.GENEZIS | Канонический инженерный слой | Pending | canon-contract tests |
| Grammar Engine | v0.4.02.GENEZIS | ЧисСлоБукВ / валидация О.К. | Pending | grammar tests |
| Replay Service | v0.4.02.GENEZIS | Восстановление состояния из acts_log | Pending | Replay |
| threshold.js | v0.3.26.05 GOLDEN | Интерфейс ЧисСлоБукВ | Pending | API + UI verification |
| style-threshold.css | v0.3.26.05 GOLDEN | Стили интерфейса | Pending | UI verification |
| field.html | pygmalion-field | Визуализация пространства | Pending | API verification |
| observer.html | pygmalion-field | Наблюдение за ритмом | Pending | API verification |
| i18n.js / ru.json / en.json | GOLDEN | Локализация | Pending | translation key comparison |

## ЧисСлоБукВ

В текущей рабочей папке присутствует файл:

`ЧисСлоБукВ.txt`

Он рассматривается как SOURCE MATERIAL для последующей инженерной работы.

Его наличие НЕ означает, что конкретная реализация уже утверждена.

Выбор между историческими версиями `threshold.js` и `threshold-canonical.js` должен быть подтверждён сравнением содержимого и совместимости API.

## UNKNOWN

До отдельной проверки остаются:

1. Совместимость выбранной версии ЧисСлоБукВ с GENEZIS API.
2. Фактические API request/response форматы.
3. Фактическая конфигурация PostgreSQL.
4. Фактический статус Replay.
5. Необходимость и формат преобразования документации PDF/DOCX.
6. Статус `digital-inferno-preprint-v6.docx`.

## Правило

Не переводить `Pending` в `Done` без фактической проверки.


============================================================
4. DECISION.md
============================================================

# DECISION REGISTER — v0.4.03 "Crystal Bridge"

## Назначение

Этот документ фиксирует решения, которые уже приняты человеком или подтверждены первичным источником.

Он НЕ создаёт новых канонических решений.

## Decision 01 — Crystal Bridge

Рабочая папка называется:

`backend-v0.4.03.Crystal Bridge`

Статус:

DECISION / текущая рабочая организация.

Источник:

решение владельца проекта.

## Decision 02 — Разделение уровней

Канон, архитектура, реализация и рабочие гипотезы должны рассматриваться раздельно.

Статус:

ARCHITECTURAL PRINCIPLE.

## Decision 03 — Preview → Confirmation → Execute → Replay

Изменения системы не должны выполняться агентом автоматически без подтверждения человека.

Статус:

GOVERNANCE RULE.

## Decision 04 — canonical-glossary-v0.5.md

`canonical-glossary-v0.5.md` рассматривается как отдельный стандарт/проектный документ v0.5.

Его положения не должны автоматически повышаться до уровня CANON только вследствие наличия файла.

Особенно это относится к:

- 1111 С.У.М.;
- четырём контурам обращения ценности;
- лимитам эмиссии;
- платформенному У.М.;
- архитектуре v0.5 «СТРОИТЕЛЬ».

Статус:

STD-05 / проектный нормативный материал.

Не считать автоматически подтверждённым CANON.

## Decision 05 — MCP

MCP не является текущим центром Crystal Bridge.

Его статус:

OPEN ARCHITECTURAL QUESTION.

## Decision 06 — ЧисСлоБукВ

Файл `ЧисСлоБукВ.txt`, находящийся в рабочей папке, является исходным материалом для последующей инженерной работы.

Наличие файла не означает утверждения конкретной реализации.

Фактический выбор реализации должен быть сделан после сравнения источников и проверки API.

## Decision 07 — Execution boundary

Создание этих четырёх Markdown-файлов не является разрешением на перенос существующих исходников.

Любой физический перенос, изменение или интеграция выполняются отдельным актом после Audit → Plan → Approval.

============================================================
EXECUTION BOUNDARY
============================================================

Allowed:

- создать ровно четыре Markdown-файла;
- записать в них содержание, указанное выше;
- после создания вывести содержимое/размеры этих четырёх файлов для проверки.

Forbidden:

- создавать директории;
- копировать или перемещать исходники;
- изменять существующие файлы;
- удалять файлы;
- изменять Git;
- выполнять Docker-команды;
- выполнять SQL;
- менять PostgreSQL;
- менять package.json;
- устанавливать зависимости;
- изменять CANON.md;
- изменять acts_log;
- изменять Replay;
- выполнять миграцию.

После выполнения:

1. Покажи список ровно четырёх созданных файлов.
2. Покажи их размеры.
3. Покажи `git diff --` только для этих четырёх новых файлов, если Git позволяет это сделать без изменения состояния.
4. Не выполняй никаких других действий.