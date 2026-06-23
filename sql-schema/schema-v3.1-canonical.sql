-- ============================================================
-- Pygmalion NOD Platform — Stage 3.1-canonical
-- Core Data Model (ADR-01.2 + Canonical Entry Rules)
-- ============================================================
--
-- ИЗМЕНЕНИЯ В v3.1:
-- 1. Валидация О.К. обновлена для поддержки:
--    - Длина: 3-50 символов (было: 3+)
--    - До 5 одиночных пробелов внутри (было: запрещены)
--    - Спецсимволы UTF-8 (𝕯, и др.)
--    - Запрет пробелов в начале/конце
--    - Запрет двух пробелов подряд
-- 2. Поддержка коротких У.З. (1-2 символа) для системных нужд
-- 3. Резервирование диапазона 0-33 для Орденов и Отделов
-- ============================================================

-- Включаем расширение pgcrypto для хеширования
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ------------------------------------------------------------
-- TimeRhythm (граница, не логика БД)
-- ------------------------------------------------------------
-- ВАЖНО: PostgreSQL НЕ является источником времени!
--
-- Метроном (backend/core/metronome.js) управляет временем:
-- - burnAt = следующая полночь UTC после эмиссии (всегда +1 день)
-- - window_start = граница видимости (рассчитывается сервером)
-- - Фазы: active (04:00-19:55), silence (19:55-20:00), impulse (20:00-03:59)
--
-- База данных получает время как параметр, НЕ вычисляет его.
-- NOW() используется только для created_at (фиксация момента записи).
-- ------------------------------------------------------------


-- ============================================================
-- 1. OK Identity (Открытые Ключики)
-- ============================================================

CREATE TABLE IF NOT EXISTS ok_identity (
    ok_key TEXT PRIMARY KEY,
    public_key TEXT,
    created_at TIMESTAMP DEFAULT NOW(),

    -- Паузы созревания (Этика ритма)
    last_act_at TIMESTAMP,
    last_act_type TEXT,

    -- Каноническая валидация О.К. (ЧисСлоБукВ)
    -- Участники: 3-50 символов
    -- Администраторы (::01:: - ::33::): 1-2 символа (зарезервировано)
    CONSTRAINT ok_key_format CHECK (
        -- Формат: ::content::
        ok_key ~ '^::.+::$'
        AND
        -- Длина контента: 1-50 символов (без учёта :: ::)
        LENGTH(SUBSTRING(ok_key FROM 3 FOR LENGTH(ok_key) - 4)) BETWEEN 1 AND 50
        AND
        -- Запрет пробела в начале или конце контента
        SUBSTRING(ok_key FROM 3 FOR LENGTH(ok_key) - 4) !~ '(^ | $)'
        AND
        -- Запрет двух пробелов подряд
        ok_key !~ '  '
        AND
        -- Максимум 5 пробелов внутри (для фраз из 6 слов)
        (LENGTH(ok_key) - LENGTH(REPLACE(ok_key, ' ', ''))) <= 5
        AND
        -- Разделение прав: 1-2 символа только для зарезервированных О.К. (::01:: - ::33::)
        (
            LENGTH(SUBSTRING(ok_key FROM 3 FOR LENGTH(ok_key) - 4)) >= 3
            OR
            SUBSTRING(ok_key FROM 3 FOR LENGTH(ok_key) - 4) ~ '^(0?[1-9]|[12][0-9]|3[0-3])$'
        )
    )
);

COMMENT ON TABLE ok_identity IS 'Открытые Ключики (О.К.) — числовая идентичность участников';
COMMENT ON CONSTRAINT ok_key_format ON ok_identity IS 'Канон ЧисСлоБукВ: участники 3-50 символов, администраторы ::01::-::33:: (1-2 символа), до 5 пробелов, без пробелов в начале/конце';


-- ============================================================
-- 2. Acts Log (ФАКТ — append-only, SSOT)
-- ============================================================
-- Единственный источник истины (Single Source of Truth).
-- Все изменения состояния системы идут ТОЛЬКО через INSERT в эту таблицу.
--
-- Payload Contract (структура JSONB):
--
-- EMISSION:
--   {
--     "triads": ["T1", "T2"],        -- выбранные триады
--     "burn_at": "2026-05-04T00:00:00Z",
--     "phase": "active",             -- или "impulse"
--     "total_ue": 6                  -- сумма У.Е. из триад
--   }
--
-- TRANSFER:
--   {
--     "ue_uuid": "...",              -- UUID передаваемой У.Е.
--     "ue_number": 1,                -- номер У.Е. (1-21)
--     "triad": "T1",                 -- триада
--     "reason": "за помощь"          -- опционально
--   }
--
-- BURNED:
--   {
--     "ue_uuid": "...",
--     "ue_number": 1,
--     "triad": "T1",
--     "burn_at": "2026-05-04T00:00:00Z"
--   }
-- ============================================================

CREATE TABLE IF NOT EXISTS acts_log (
    act_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    act_type TEXT NOT NULL CHECK (
        act_type IN (
            'EMISSION',
            'TRANSFER',
            'BURNED',
            'RECOGNITION',
            'THRESHOLD_CROSSED',
            'TEMPORARY_CREATED',
            'TEMPORARY_CONFIRMED',
            'TEMPORARY_CANCELLED',
            'PHASE_CHANGE',
            'TRIAD_RESET',
            'ORDER_JOIN',
            'DEPARTMENT_JOIN',
            'UNION_CREATED',
            'COUNCIL_CREATED',
            'SUCCESSION'
        )
    ),

    actor_ok TEXT NOT NULL,
    target_ok TEXT,

    payload JSONB NOT NULL,

    -- Ссылки на родительские акты (ro.DAG)
    refs UUID[] DEFAULT '{}',

    merkle_hash TEXT DEFAULT '',

    created_at TIMESTAMP DEFAULT NOW(),

    -- Каноническая валидация О.К. (та же логика, что в ok_identity)
    CONSTRAINT actor_ok_format CHECK (
        actor_ok ~ '^::.+::$'
        AND LENGTH(SUBSTRING(actor_ok FROM 3 FOR LENGTH(actor_ok) - 4)) BETWEEN 1 AND 50
        AND SUBSTRING(actor_ok FROM 3 FOR LENGTH(actor_ok) - 4) !~ '(^ | $)'
        AND actor_ok !~ '  '
        AND (LENGTH(actor_ok) - LENGTH(REPLACE(actor_ok, ' ', ''))) <= 5
    ),

    CONSTRAINT target_ok_format CHECK (
        target_ok IS NULL OR (
            target_ok ~ '^::.+::$'
            AND LENGTH(SUBSTRING(target_ok FROM 3 FOR LENGTH(target_ok) - 4)) BETWEEN 1 AND 50
            AND SUBSTRING(target_ok FROM 3 FOR LENGTH(target_ok) - 4) !~ '(^ | $)'
            AND target_ok !~ '  '
            AND (LENGTH(target_ok) - LENGTH(REPLACE(target_ok, ' ', ''))) <= 5
        )
    ),

    -- Валидация: refs не может содержать сам себя
    CONSTRAINT no_self_reference CHECK (
        NOT (act_id = ANY(refs))
    )
);


-- Производительность: индексы для частых запросов
CREATE INDEX IF NOT EXISTS idx_acts_actor_created ON acts_log(actor_ok, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_acts_type_actor ON acts_log(act_type, actor_ok);
CREATE INDEX IF NOT EXISTS idx_acts_target ON acts_log(target_ok);
CREATE INDEX IF NOT EXISTS idx_ok_last_act ON ok_identity(last_act_at);

-- ------------------------------------------------------------
-- Immutability enforcement (append-only)
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION prevent_mutation()
RETURNS trigger AS $$
BEGIN
    RAISE EXCEPTION 'acts_log is immutable (append-only)';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER acts_log_immutable
BEFORE UPDATE OR DELETE ON acts_log
FOR EACH ROW
EXECUTE FUNCTION prevent_mutation();


-- ------------------------------------------------------------
-- Merkle hash (заглушка / может быть доработан)
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION set_merkle_hash()
RETURNS trigger AS $$
BEGIN
    NEW.merkle_hash := encode(
        digest(
            NEW.act_id::text || NEW.act_type || NEW.actor_ok || NEW.payload::text,
            'sha256'
        ),
        'hex'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER acts_log_merkle
BEFORE INSERT ON acts_log
FOR EACH ROW
EXECUTE FUNCTION set_merkle_hash();


-- ============================================================
-- 3. UE Units (Проекция из acts_log)
-- ============================================================
-- ВАЖНО: Эта таблица — ПРОЕКЦИЯ, а не источник истины.
-- Она восстанавливается из acts_log через Replay.
-- ============================================================

CREATE TABLE IF NOT EXISTS ue_units (
    ue_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ue_number INTEGER NOT NULL CHECK (ue_number BETWEEN 1 AND 56),
    triad TEXT NOT NULL CHECK (triad IN ('T1', 'T2', 'T3', 'T4', 'T5', 'K1', 'K2')),

    actor_ok TEXT NOT NULL,

    status TEXT NOT NULL CHECK (status IN ('active', 'burned', 'transferred', 'impulse')),

    created_at TIMESTAMP DEFAULT NOW(),
    burn_at TIMESTAMP NOT NULL,

    -- Ссылка на акт эмиссии (для восстановления)
    emission_act_id UUID NOT NULL,

    -- Время передачи (для У.М.)
    transferred_at TIMESTAMP,

    -- Ссылка на акт передачи (если был TRANSFER)
    transfer_act_id UUID,

    -- Ссылка на акт сгорания (если был BURNED)
    burn_act_id UUID,

    -- Constraint: номер У.Е. должен соответствовать триаде
    CONSTRAINT ue_triad_number_match CHECK (
        -- T1-T4: базовые триады (1-12)
        (triad = 'T1' AND ue_number BETWEEN 1 AND 3) OR
        (triad = 'T2' AND ue_number BETWEEN 4 AND 6) OR
        (triad = 'T3' AND ue_number BETWEEN 7 AND 9) OR
        (triad = 'T4' AND ue_number BETWEEN 10 AND 12) OR
        -- K1 (ИИПП, v2.01): 13-16
        (triad = 'K1' AND ue_number BETWEEN 13 AND 16) OR
        -- K2 (ИЯ, v3.01): 17-20
        (triad = 'K2' AND ue_number BETWEEN 17 AND 20) OR
        -- T5: 21 (+22 v2.01, +23 v3.01)
        (triad = 'T5' AND ue_number IN (21, 22, 23))
    ),

    -- Каноническая валидация О.К.
    CONSTRAINT ue_actor_ok_format CHECK (
        actor_ok ~ '^::.+::$'
        AND LENGTH(SUBSTRING(actor_ok FROM 3 FOR LENGTH(actor_ok) - 4)) BETWEEN 1 AND 50
        AND SUBSTRING(actor_ok FROM 3 FOR LENGTH(actor_ok) - 4) !~ '(^ | $)'
        AND actor_ok !~ '  '
        AND (LENGTH(actor_ok) - LENGTH(REPLACE(actor_ok, ' ', ''))) <= 5
    )
);

CREATE INDEX idx_ue_actor ON ue_units(actor_ok);
CREATE INDEX idx_ue_status ON ue_units(status);
CREATE INDEX idx_ue_burn_at ON ue_units(burn_at);


-- ============================================================
-- 4. UM Markers (Маркеры признания)
-- ============================================================

CREATE TABLE IF NOT EXISTS um_markers (
    um_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    from_ok TEXT NOT NULL,
    to_ok TEXT NOT NULL,

    message TEXT,

    created_at TIMESTAMP DEFAULT NOW(),

    -- Ссылка на акт RECOGNITION
    recognition_act_id UUID NOT NULL,

    -- Каноническая валидация О.К.
    CONSTRAINT um_from_ok_format CHECK (
        from_ok ~ '^::.+::$'
        AND LENGTH(SUBSTRING(from_ok FROM 3 FOR LENGTH(from_ok) - 4)) BETWEEN 1 AND 50
        AND SUBSTRING(from_ok FROM 3 FOR LENGTH(from_ok) - 4) !~ '(^ | $)'
        AND from_ok !~ '  '
        AND (LENGTH(from_ok) - LENGTH(REPLACE(from_ok, ' ', ''))) <= 5
    ),

    CONSTRAINT um_to_ok_format CHECK (
        to_ok ~ '^::.+::$'
        AND LENGTH(SUBSTRING(to_ok FROM 3 FOR LENGTH(to_ok) - 4)) BETWEEN 1 AND 50
        AND SUBSTRING(to_ok FROM 3 FOR LENGTH(to_ok) - 4) !~ '(^ | $)'
        AND to_ok !~ '  '
        AND (LENGTH(to_ok) - LENGTH(REPLACE(to_ok, ' ', ''))) <= 5
    )
);

CREATE INDEX idx_um_from ON um_markers(from_ok);
CREATE INDEX idx_um_to ON um_markers(to_ok);


-- ============================================================
-- 5. ro.DAG Edges (Граф связей актов)
-- ============================================================

CREATE TABLE IF NOT EXISTS ro_dag_edges (
    edge_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    from_act_id UUID NOT NULL,
    to_act_id UUID NOT NULL,

    edge_type TEXT NOT NULL CHECK (
        edge_type IN ('emission', 'transfer', 'recognition', 'succession', 'protocol', 'release')
    ),

    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(from_act_id, to_act_id, edge_type)
);

CREATE INDEX idx_dag_from ON ro_dag_edges(from_act_id);
CREATE INDEX idx_dag_to ON ro_dag_edges(to_act_id);


-- ============================================================
-- 6. Annotations (Аннотации к актам)
-- ============================================================

CREATE TABLE IF NOT EXISTS annotations (
    annotation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    act_ref_id UUID NOT NULL,
    author_ok TEXT NOT NULL,
    annotation_type TEXT NOT NULL DEFAULT 'annotation',

    content TEXT NOT NULL,
    value TEXT,
    payload JSONB DEFAULT '{}',

    created_at TIMESTAMP DEFAULT NOW(),

    -- Каноническая валидация О.К.
    CONSTRAINT annotation_author_ok_format CHECK (
        author_ok ~ '^::.+::$'
        AND LENGTH(SUBSTRING(author_ok FROM 3 FOR LENGTH(author_ok) - 4)) BETWEEN 1 AND 50
        AND SUBSTRING(author_ok FROM 3 FOR LENGTH(author_ok) - 4) !~ '(^ | $)'
        AND author_ok !~ '  '
        AND (LENGTH(author_ok) - LENGTH(REPLACE(author_ok, ' ', ''))) <= 5
    )
);

CREATE INDEX idx_annotations_act ON annotations(act_ref_id);
CREATE INDEX idx_annotations_author ON annotations(author_ok);
CREATE INDEX idx_annotations_type ON annotations(annotation_type);


-- ============================================================
-- КОНЕЦ СХЕМЫ v3.1-canonical
-- ============================================================
