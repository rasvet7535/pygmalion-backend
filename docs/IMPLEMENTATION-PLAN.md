# PDA Integration Phase Implementation Plan

**Version:** 1.1.0
**Date:** 2026-06-27
**Status:** DRAFT (Awaiting Approval)

## 0. General Execution Rules

- **Policy Compliance:** All tasks must follow `JULES_EXECUTION_POLICY.md` (v1.2) and `AGENTS.md`.
- **Plan Gate:** No code execution starts until this plan receives "Plan approved" from the Human.
- **Minimal Scope:** "No Silent Improvements." Only changes requested or strictly necessary for the goal are allowed.
- **Architecture Integrity:** Maintain the 6-layer architecture (Human Will → PDA → Services → Canon → Repository → acts_log).
- **Tooling:** Use `run_in_bash_session` for tests and `replace_with_git_merge_diff` for targeted refactoring.

---

## Epic 1: Routes Layer Refactoring (Thin HTTP Adapter)
- **Goal:** Remove all inline SQL and business logic from the `backend/routes/` directory and `server.js`. Achieving 0 inline SQL in the adapter layer.
- **Risks:** Service layer may not support all specific SQL queries used in routes. Regressions in API responses.
- **Canon Link:** 6-layer architecture, Service Layer pattern.

### Feature 1.1: server.js Hardening
- **Goal:** Transform `server.js` into a thin entry point.
- **PR:** `PR #1: server.js refactoring`
- **Risks:** Breaking the main entry point, impacting system availability.
- **DoD:** `server.js` contains no SQL strings and delegating all business logic.

#### Task 1.1.1: Move burn cron logic
- **Goal:** Isolate burn logic.
- **Action:** Move midnight burn logic to `backend/services/burn-service.js`.
- **Canon:** temporal.js, burn protocol.

#### Task 1.1.2: Replace direct SQL
- **Goal:** 0 SQL in server.js.
- **Action:** Replace direct SQL in `server.js` with calls to appropriate services.
- **Canon:** Service Layer.

### Feature 1.2: acts.js Refactoring
- **Goal:** Refactor the primary act-handling route.
- **PR:** `PR #2: acts.js refactoring`
- **Risks:** Errors in handling EMISSION or TRANSFER can lead to state corruption.
- **DoD:** `routes/acts.js` contains only request parsing and service calls.

#### Task 1.2.1: Refactor handleEmission
- **Goal:** Delegate emission.
- **Action:** Refactor `handleEmission` to delegate fully to `emission-service.js`.
- **Canon:** emission-policy.js.

#### Task 1.2.2: Refactor handleTransfer
- **Goal:** Delegate transfer.
- **Action:** Refactor `handleTransfer` to delegate fully to `transfer-service.js`.
- **Canon:** pro.2 (Transfer).

#### Task 1.2.3: Move other logic
- **Goal:** Isolate governance and succession.
- **Action:** Refactor `handleSuccession` and `handleGovernance` to move logic to services.
- **Canon:** ontology.js.

### Feature 1.3: Other Routes Refactoring
- **Goal:** Clean up all secondary routes.
- **PR:** `PR #3: Secondary routes refactoring`
- **Risks:** Missing edge cases in complex joins for mirror/field routes.
- **DoD:** Zero `pool.query` calls in any file under `backend/routes/` (except observability).

#### Task 1.3.1: Refactor ok.js
- **Goal:** Delegate OK management.
- **Action:** `routes/ok.js` — replace direct SQL for threshold and burn with `threshold-service` and `burn-service`.

#### Task 1.3.2: Refactor mirror.js
- **Goal:** Delegate projection.
- **Action:** `routes/mirror.js` — move complex joins to `mirror-service.js`.

#### Task 1.3.3: Refactor field/annotations
- **Goal:** Delegate data retrieval.
- **Action:** `routes/field.js` and `routes/annotations.js` — replace direct SQL with repository or service calls.

---

## Epic 2: Testing & CI Integration
- **Goal:** Ensure 100% test pass rate (175/175) and automate verification.
- **Risks:** Flaky DB-dependent tests.
- **Canon Link:** TESTING.md (if exists) or AGENTS.md requirements.

### Feature 2.1: Local Test Execution
- **Goal:** Verify logic stability.
- **PR:** `PR #4: Test stabilization and CI config`
- **Risks:** Local environment differences.
- **DoD:** 175/175 tests pass in the environment with DB.

#### Task 2.1.1: Run sync tests
- **Action:** Run and fix any issues in sync tests (87 + 63 + 17 = 167).

#### Task 2.1.2: Run async tests
- **Action:** Verify 8 DB-dependent async tests pass with a local PostgreSQL instance.

### Feature 2.2: Replay Verification
- **Goal:** Ensure SSOT consistency.
- **PR:** Included in `PR #4`.
- **DoD:** 0 mismatches in Replay reports.

#### Task 2.2.1: Execute test cycle
- **Action:** Execute `node tools/run-test-cycle.js` to verify acts_log -> ue_units consistency.

---

## Epic 3: Sandbox Alignment (Manual Audit)
- **Goal:** Verify logic alignment with the "golden version" `sandbox-v0.3.26.05`.
- **Risks:** Misinterpretation of legacy logic in `logic.js`.
- **Canon Link:** CANON.md (normative source).

### Feature 3.1: Logical Comparison
- **Goal:** Document alignment.
- **PR:** `PR #5: Sandbox audit documentation`
- **DoD:** Documented verification that PDA/Canon reproduces sandbox logic correctly.

#### Task 3.1.1: Audit logic.js
- **Action:** Audit `sandbox-v0.3.26.05/logic.js` against `backend/core/canon/`.

#### Task 3.1.2: Create comparison doc
- **Action:** Create `docs/SANDBOX-COMPARISON.md` mapping constants, phases, and protocols.

---

## Epic 4: Replay Gate Hardening
- **Goal:** Prevent inconsistent state transitions by enforcing Replay status checks.
- **Risks:** Legitimate actions being blocked due to replay lag or minor mismatches.
- **Canon Link:** REPLAY-TEST.md.

### Feature 4.1: ENFORCED Mode Activation
- **Goal:** Enable hard enforcement.
- **PR:** `PR #6: Replay gate enforcement`
- **Risks:** System-wide lockout if replay fails.
- **DoD:** System refuses to commit new acts if the state is inconsistent.

#### Task 4.1.1: Change Gate Mode
- **Action:** Change `REPLAY_GATE_MODE` from `WARNING` to `ENFORCED` in `PDA/core/execution-gateway.js`.

#### Task 4.1.2: Verify Enforcement
- **Action:** Verify that execution is blocked if Replay mismatches exist.

---

## Epic 5: Documentation Update
- **Goal:** Reflect the post-refactor architecture in all governance documents.
- **Risks:** Documentation becoming out of sync with code.
- **Canon Link:** AGENTS.md.

### Feature 5.1: Governance Alignment
- **Goal:** Update all relevant docs.
- **PR:** `PR #7: Documentation finalization`
- **DoD:** Documents accurately describe the 6-layer architecture with thin adapters.

#### Task 5.1.1: Update AGENTS.md
- **Action:** Update `AGENTS.md` (file ownership table).

#### Task 5.1.2: Update ARCHITECTURE_MAP.md
- **Action:** Update `ARCHITECTURE_MAP.md` (PDA as sole entry point).

#### Task 5.1.3: Update System Maps
- **Action:** Update `CHANGE_POLICY.md` and `AI-SYSTEM-MAP.md`.

---

## Final Definition of Done (Phase DoD)
1. [ ] 0 inline SQL in `backend/routes/`.
2. [ ] `server.js` is a thin HTTP adapter.
3. [ ] 175/175 tests pass (including DB-dependent ones).
4. [ ] Replay verified with 0 mismatches.
5. [ ] Replay Gate in `ENFORCED` mode.
6. [ ] `docs/SANDBOX-COMPARISON.md` created.
7. [ ] All governance docs updated and English-first.
8. [ ] Human Review passed for all Pull Requests.

---

## Questions Requiring Separate Approval
1. Should we introduce a generic `Repository` layer for common SQL queries used by multiple services?
2. Are there any specific legacy protocols in Sandbox `logic.js` that are NOT yet in `CANON.md`?
3. Do we need to support `REPLAY_GATE_MODE=ENFORCED` even without a `DATABASE_URL`?
