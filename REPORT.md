# PDA Integration Audit Report (sandbox-v0.3.26.05 → GENEZIS)

**Version:** 0.4.02.AUDIT.v3
**Date:** 2026-06-30
**Mode:** AUDIT ONLY (Analysis of frozen reference implementation)

---

## 1. Current Interaction Flow (Frontend Behavior Only)

The `sandbox-v0.3.26.05` manages the user journey through the following client-side behaviors:

*   **Entry Phase:** The user interacts with `threshold.html` to generate an identity. The specialized keyboard handles Unicode characters and validation. The O.K. is stored in `localStorage`.
*   **Presence Phase:** `index.html` loads and initializes the `AppState`. It calculates "Spiritual Dynamics" and reputation weight based on the local transaction history.
*   **Emission Phase:** The user selects triads. The interface validates these against local rules (3-13 R.U. limit). If valid, U.E. units are added to the local `ueUnits` array with an `impulse` status.
*   **Flow Phase:** The user selects active U.E. units and provides a recipient O.K. Optional metadata (buyout dates, guest keys) is collected. The `Storage` module records the transfer in a local `acts_log`.
*   **Time Rhythm:** A local metronome (`timeRhythm.js`) tracks UTC time to trigger phase shifts (e.g., converting `impulse` to `active` at 04:00 UTC) and calculate `burnAt` timestamps.

---

## 2. PDA Mapping (DESCRIPTIVE ONLY)

Mapping of deterministic paths from Action to SSOT:

| Frontend Action | PDA Intent | Backend Service | Repository Layer | acts_log Impact | Replay Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `confirmOK()` | `THRESHOLD` | `threshold-service` | `ok_identity` | `THRESHOLD_CROSSED` | Identity Creation |
| `emitUE()` | `PLAN` | `emission-service` | `acts_log` + `ue_units` | `EMISSION` | Asset Creation |
| `confirmTransfer()`| `FLOW` | `transfer-service` | `ue_units` | `TRANSFER` | Asset Movement |
| `loadState()` | `MIRROR` | `mirror-service` | `acts_log` view | *(Read-only)* | State Projection |
| `checkBurn()` | *(Internal)* | `burn-service` | `ue_units` | `BURNED` | Asset Destruction |

---

## 3. Missing PDA Coverage

The following capabilities in the sandbox reference lack direct mapping or intent coverage in the current PDA backend:

*   **Extended Metadata Intents:** The current `FLOW` (pro.2) intent does not support the payload fields for `buyoutDate`, `temporaryKey` (v.K.), and `deliveryTerm` used in the sandbox.
*   **Social Protocol Intents:** Sandbox supports `ORDER_JOIN` and `DEPARTMENT_JOIN`. These are missing as high-level PDA intents (currently only in legacy route logic).
*   **Externalization Requirement:** The following logic currently inside the frontend must be externalized to Backend Services:
    *   `calculateWeight()`: Reputation score based on daily activity.
    *   `calculateSpiritualDynamics()`: Scoring based on triad engagement.
    *   `calculateBurnAt()`: Determining the expiration timestamp of U.E.
    *   `isEmissionAllowed()`: Phase-gate logic based on UTC Metronome.

---

## 4. Pilot Readiness Assessment

**Overall Readiness Score: 84%**

*   **Canon & Rules (100%):** The 6-layer architecture and SSOT (acts_log) principles are correctly established.
*   **Backend Services (80%):** Core business logic (Emission, Transfer, Burn) is isolated but requires metadata hardening.
*   **PDA Entry Layer (75%):** Basic intent routing works; requires social and bulk intents.
*   **Frontend (85%):** Sandbox is a mature UI; readiness is limited by the need to replace `localStorage` with API adapters.

The system is ready for a pilot after the "Critical" gaps identified in section 5 are addressed.

---

## 5. Gap Analysis

*   **🔴 Critical:**
    *   **Metadata Divergence:** `transfer-service` must be updated to accept and validate the full sandbox metadata payload (v.K., buyoutDate).
    *   **Route Bypass:** Refactoring legacy `acts.js` to use Services instead of direct SQL to ensure logic consistency.
*   **🟡 Recommended:**
    *   **Social Intents:** Define `GOVERNANCE` intents for Order/Department joining.
    *   **Projection Logic:** Move reputation and weight calculations to `mirror-service`.
*   **🟢 Optional:**
    *   **Bulk Operations:** Support for multi-UE transfers in a single Act.

---

## 6. Migration Overview (HIGH LEVEL ONLY)

The migration to the Pilot architecture will transition the system from a "Local-First" to a "Canon-First" model:

1.  **Handshake:** Implementation of version handshake to ensure client/server rule compatibility.
2.  **API Decoupling:** Replacing the frontend `Storage` module with a PDA API Client.
3.  **State Handover:** Initializing the server-side `acts_log` from the final valid `crystal_state`.
4.  **SSOT Switch:** Deprecating `localStorage` as the source of truth, treating it only as an ephemeral UI cache.

---

## 7. Risks

*   **Replay Inconsistency:** If `burnAt` calculation logic differs by even one second between `logic.js` and `temporal.js`, the Replay will fail to reconstruct the state.
*   **Divergence (localStorage vs acts_log):** Acts performed locally without server confirmation (e.g., during network lag) will cause the frontend state to diverge from the SSOT, requiring complex reconciliation or state rollback.
*   **Timestamp Skew:** Dependency on local clock for Act creation (if not synchronized) can break the deterministic order of the `acts_log`.
*   **Performance:** The O(N) nature of state reconstruction from `acts_log` may introduce latency as the volume of acts grows.

---
*End of Report*
