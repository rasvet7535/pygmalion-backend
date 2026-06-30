# PDA Integration Phase Implementation Plan (v2.0)

**Version:** 2.0.0
**Date:** 2026-06-30
**Status:** DRAFT (Awaiting Approval)
**Based on:** `REPORT.md` (Audit Phase)

---

## 0. General Execution Rules

- **Policy Compliance:** All tasks follow `JULES_EXECUTION_POLICY.md` (v1.2) and `AGENTS.md`.
- **Plan Gate:** Transition to "Execute" requires explicit "Plan approved" from the Human.
- **Minimal Scope:** "No Silent Improvements." Focus strictly on PDA integration and refactoring.
- **Architecture:** Maintain 6-layer architecture (Human Will → PDA → Services → Canon → Repository → acts_log).

---

## Epic 1: Route Layer Refactoring (Thin HTTP Adapter)
**Goal:** Remove all inline SQL and business logic from the `backend/routes/` and `server.js`.
**Canon Link:** UM-LAYER.md (Access Layer).
**Risks:** Breaking API endpoints; regression in business logic validation.

### Feature 1.1: server.js Hardening
- **Goal:** Transform `server.js` into a thin entry point.
- **PR:** `PR #1: server.js refactoring`
- **DoD:** 0 SQL strings in `server.js`; all logic delegated to services.

#### Task 1.1.1: Move burn cron logic
- **Action:** Extract midnight burn logic to `backend/services/burn-service.js`.

#### Task 1.1.2: Replace direct SQL
- **Action:** Replace `pool.query` calls with service/repository methods.

### Feature 1.2: acts.js Refactoring
- **Goal:** Delegate act handling to services.
- **PR:** `PR #2: acts.js refactoring`
- **DoD:** `acts.js` contains only request parsing and service delegation.

#### Task 1.2.1: Refactor handleEmission
- **Action:** Delegate fully to `emission-service.js`.

#### Task 1.2.2: Refactor handleTransfer
- **Action:** Delegate fully to `transfer-service.js`.

---

## Epic 2: PDA Metadata Hardening (Gap Closure)
**Goal:** Update PDA intents to support extended metadata from sandbox-v0.3.26.05.
**Canon Link:** pro.2 (Transfer).
**Risks:** Payload size increase; potential validation complexity.

### Feature 2.1: Extended FLOW Metadata
- **Goal:** Support `buyoutDate`, `temporaryKey`, and `deliveryTerm` in `FLOW` intent.
- **PR:** `PR #3: PDA Metadata Hardening`
- **DoD:** `transfer-service` records and validates extended metadata.

---

## Epic 3: Social Architecture Integration
**Goal:** Implement intents for social protocols identified in the audit.
**Canon Link:** protocols.js.
**Risks:** Expanding PDA scope beyond MVP requirements.

### Feature 3.1: Social Intents (Join/Create)
- **Goal:** Implement `ORDER_JOIN` and `DEPARTMENT_JOIN` intents.
- **PR:** `PR #4: Social Architecture Intents`
- **DoD:** PDA supports `ORDER_JOIN` and `DEPARTMENT_JOIN` with validation.

---

## Epic 4: Testing & Replay Stability
**Goal:** Achieve 175/175 tests passing.
**Canon Link:** REPLAY-TEST.md.
**Risks:** Flaky DB-dependent tests in CI environments.

### Feature 4.1: Test Stabilization
- **Goal:** 100% pass rate in CI.
- **PR:** `PR #5: CI Stabilization`
- **DoD:** 175/175 tests pass; Replay verified with 0 mismatches. (REPLAY_GATE_MODE remains WARNING per safety instructions).

---

## Epic 5: Documentation & System Map
**Goal:** Align all governance docs with the new state.
**Risks:** Documentation lag.

### Feature 5.1: Governance Update
- **Goal:** English-first normative documentation.
- **PR:** `PR #6: Documentation finalization`
- **DoD:** `AGENTS.md`, `ARCHITECTURE_MAP.md`, and `AI-SYSTEM-MAP.md` updated.

---

## Phase Definition of Done
1. [ ] 0 inline SQL in `backend/routes/`.
2. [ ] PDA supports extended transfer metadata (`temporaryKey`, etc.).
3. [ ] 175/175 tests pass (including DB-dependent ones).
4. [ ] Replay verified with 0 mismatches.
5. [ ] All governance docs updated and English-first.

---

## Questions Requiring Separate Approval
1. Should we create a new `metadata-service.js` or keep metadata logic within `transfer-service.js`?
2. Is `temporaryKey` validation required at the PDA level or only at the Service level?
