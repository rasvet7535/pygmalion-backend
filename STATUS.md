# PROJECT STATUS - v0.4.03 "Crystal Bridge"

## Рабочая директория

Абсолютный путь:

`C:\pygmalion\backend-v0.4.03.Crystal Bridge`

Содержимое проверено через файловую систему и командную строку.

## Ветки

Следующие ветки существуют локально:

- `v0.4.02.GENEZIS`
- `v0.3.26.05 (GOLDEN)`
- `pygmalion-field`
- Архивные ветки миграций
- 1000+ файлов MiMo/OpenCode/Grok/Gemini Notebook

## Классификация фактов

Все компоненты классифицируются по 5 типам:

- FACT — проверенные артефакты;
- CANON — утверждённые версионно зафиксированные артефакты;
- DECISION — принятые архитектурные решения;
- HYPOTHESIS — гипотезы на проверку;
- UNKNOWN — то, что не верифицировано.

## Инфраструктура

Docker / PostgreSQL:

Настройка проверена по `docker-compose.yml` и Artefacts. Порты `5433` и `5434` зарезервированы для разных сред.

Служба `com.docker.service`:

Служба запускает Gordon с изменённым security descriptor, вызывающим Access Denied при попытке управления контейнерами.

Требуется исправление security descriptor.

## Неприкосновенность

Следующее не подлежит изменению в Crystal Bridge:

- CANON.md
- acts_log
- Replay
- SQL schema
- Docker configuration
- package.json
- Исходный код проектов

## Codex / ИИ-агенты

Требуется верификация всех ИИ-сгенерированных артефактов перед включением в Crystal Bridge.

Каждый артефакт проходит Approval и версионирование.