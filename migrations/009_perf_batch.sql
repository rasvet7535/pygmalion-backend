-- ============================================================
-- Migration 009: Performance batch fixes
-- 1. Fix edge_type CHECK constraint — add 'release'
-- 2. Add missing indexes on acts_log, ok_identity
-- ============================================================

-- 1. Fix CHECK constraint — allow 'release' edge type
ALTER TABLE ro_dag_edges DROP CONSTRAINT IF EXISTS ro_dag_edges_edge_type_check;
ALTER TABLE ro_dag_edges ADD CONSTRAINT ro_dag_edges_edge_type_check
  CHECK (edge_type IN ('emission', 'transfer', 'recognition', 'succession', 'protocol', 'release'));

-- 2. Indexes for query performance
CREATE INDEX IF NOT EXISTS idx_acts_actor_created ON acts_log(actor_ok, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_acts_type_actor ON acts_log(act_type, actor_ok);
CREATE INDEX IF NOT EXISTS idx_acts_target ON acts_log(target_ok);
CREATE INDEX IF NOT EXISTS idx_ok_last_act ON ok_identity(last_act_at);
