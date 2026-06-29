# Implementation Roadmap: Pygmalion / К.Р.И.С.Т.А.Л.Л. (v0.5.1000.02)

**Non-binding draft pending Grok approval**

---

## 1. Current Maturity Assessment

| Component | Readiness (%) | Observations |
| :--- | :--- | :--- |
| **Backend** | 65% | Core Canon Layer and Metronome are stable. However, significant business logic is inlined in Route handlers (`acts.js`), bypassing the Service Layer. |
| **PDA** | 90% | Highly mature. Rule-based intent routing, preview engine, and version handshake are implemented and well-covered by 150+ tests. |
| **Service Layer** | 40% | Architecture defined but underutilized. Services for `emission` and `transfer` exist but are often bypassed by direct database calls in routes. |
| **Replay** | 80% | Functional and deterministic. Successfully reconstructs `ue_units` from `acts_log`. Scaling is currently $O(N)$, which is a risk for Pilot loads. |
| **CI/CD** | 70% | GitHub Actions are active for sync and DB-dependent tests. Replay verification is integrated into the PR pipeline. |
| **Database** | 85% | Schema v3.1 is canonical, enforcing immutability via triggers and Merkle hashing. Well-indexed for current loads. |
| **Frontend** | 30% | The "Golden Version" (v0.3.26.05) is phenomenologically rich but lacks integration with v0.4 protocols (Threshold, Replay) and multi-user security. |

**Overall Pilot Readiness: ~60%**

---

## 2. Gap Analysis

### Critical (System-Breaking)
*   **Replay Scaling:** Current reconstruction reads the entire `acts_log`. At 20,000 tx/day, the reconstruction time will eventually exceed the operational "Silence" window.
*   **90-Day Rule:** No logic exists to enforce inactivity timeouts or require "presence confirmation" acts to maintain O.K. status.
*   **Accounting List:** Protocol `::про.14::` (Threshold) lacks a mechanism to validate joining O.K.s against an authorized list (voluntary entry gate).

### Important
*   **Service Layer Refactoring:** Routes must be stripped of business logic to ensure all acts follow identical validation paths through the Service Layer.
*   **Global O.K. Registry:** No mechanism for cross-instance identity validation or synchronization.
*   **Protocols ::про.5::–::про.13:::** These are currently placeholders and require canonical implementation for governance (Orders, Unions).

### Optional
*   **Reputation Weight (::про.4::):** Enhancement of the "Mirror" to include weight calculations based on `um_markers` history.

---

## 3. 2–3 Month Roadmap

### Phase 1: Foundation Hardening (Weeks 1–4)
*   **Objective:** Achieve architectural purity and optimize core SSOT processes.
*   **Deliverables:** Refactored `acts.js` delegating to Services; Replay Optimization (Checkpointing); CI/CD performance tuning.
*   **Dependencies:** Backend v0.4.02 parity.
*   **Completion Criteria:** 100% of acts processed via Service Layer; Replay reconstruction time < 30 seconds for 100k acts.

### Phase 2: Protocol & Rule Evolution (Weeks 5–8)
*   **Objective:** Implement missing Pilot-grade rules and governance protocols.
*   **Deliverables:** 90-Day Inactivity Service; Accounting List validation for `THRESHOLD_CROSSED`; Implementation of `::про.5::` (Union Emission).
*   **Dependencies:** Phase 1 completion.
*   **Completion Criteria:** Automated O.K. "Sleep" status after 90 days; Threshold acts blocked if O.K. not in Accounting List.

### Phase 3: Frontend Convergence & Scaling (Weeks 9–12)
*   **Objective:** Transition to multi-user secure platform and verify Pilot capacity.
*   **Deliverables:** Sovereign Frontend (signing acts with O.K. private keys); Integration of v0.3.26 visual components into v0.5 backend; 1000-user load test report.
*   **Dependencies:** Public Key infrastructure in `ok_identity`.
*   **Completion Criteria:** Successful 20,000 tx/day simulation; Zero PII stored in centralized DB; Multi-user concurrent sessions verified.

---

## 4. Architecture Recommendations: Frontend Evolution
*   **Identity Sovereignty:** Evolve the v0.3.26 frontend to support local key generation. Acts sent to the backend must be signed by the O.K. key.
*   **Live Mirroring:** Utilize the `/api/observability` and `/api/mirror` routes to restore the "live" feel (Burn Timers, Indicators) identified in the migration map.
*   **Stateless UI:** The frontend should remain a pure projection of the `acts_log`. Avoid local caches that can drift from the SSOT.

---

## 5. Protocol Evolution

| Protocol | Current Role | Missing Functionality | Priority |
| :--- | :--- | :--- | :--- |
| **::про.1:: (PLAN)** | Emission | Multi-triad batching | High |
| **::про.2:: (TRANSFER)** | Ro.DAG Flow | 90-day inactivity check | Critical |
| **::про.5:: (UNION)** | Placeholder | Collective emission logic | Important |
| **::про.14:: (THRESHOLD)**| Registration | Accounting List verification | Critical |

---

## 6. Scalability Estimates (Target: 20k tx/day)

*   **Database:** PostgreSQL 15+ can handle 20k write ops/day with minimal tuning. Primary bottleneck is the growth of JSONB indexes.
*   **Service Layer:** Horizontal scaling of the Node.js backend is possible since the Service Layer is stateless (all state is in Postgres).
*   **Replay:** **CRITICAL RISK.** Must move from full reconstruction to "Checkpoint + Delta" model to support long-term growth.

---

## 7. Risks

1.  **Technical (High):** Replay reconstruction time growing linearly with `acts_log` size.
2.  **Architectural (Medium):** Drift between "Golden" frontend phenomenology and new v0.5 protocol requirements.
3.  **Organizational (Low):** Complexity of managing the "Accounting List" without introducing centralized PII.

---

**Pygmalion / К.Р.И.С.Т.А.Л.Л.**
Implementation Planning v0.5.1000.02
