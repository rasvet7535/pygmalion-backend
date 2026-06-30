# PDA Integration Audit Report (Phase 4 — Analysis Only)

**Version:** 0.4.02.AUDIT
**Date:** 2026-06-30
**Subject:** Integration Analysis of `sandbox-v0.3.26.05` with GENEZIS PDA Backend

---

## 1. Current Interaction Flow (Sandbox Golden Version)

The `sandbox-v0.3.26.05` operates as a self-contained client-side environment:

1.  **Identity:** User creates an Open Key (O.K.) in `threshold.html`. It is saved to `localStorage`.
2.  **State Management:** `logic.js` maintains an `AppState` object, which is synchronized with `localStorage` via `Storage.js` (`crystal_state` key).
3.  **Action Cycle:**
    *   **Emission:** User selects triads → `emitUE()` → Local `AppState` update → `Storage.recordEmission` (Append-only `acts_log` in JSON).
    *   **Transfer:** User selects UE + Recipient → `confirmTransfer()` → Local `AppState` update → `Storage.recordTransfer`.
4.  **Replay:** On load, `Storage.loadCrystalState()` reconstructs the current state.
5.  **Time:** `timeRhythm.js` manages phases (Active/Silence/Impulse) and calculates `burnAt` timestamps.

---

## 2. PDA Integration Map

Mapping of Sandbox Frontend Actions to the 6-Layer GENEZIS Architecture:

| Sandbox Action | PDA Intent | Backend Service | target Table | Replay Role |
| :--- | :--- | :--- | :--- | :--- |
| `confirmOK` | `THRESHOLD` | `threshold-service` | `ok_identity` | Identity anchor |
| `emitUE` | `PLAN` | `emission-service` | `ue_units` | Emission SSOT |
| `confirmTransfer` | `FLOW` | `transfer-service` | `ue_units` | Ownership move |
| `loadState` | `MIRROR` | `mirror-service` | *(Projection)* | State projection |
| `checkBurn` | *(Internal)* | `burn-service` | `ue_units` | Lifecycle end |
| `System Audit` | `REPLAY` | `replay-service` | `acts_log` | Integrity verify |

---

## 3. Missing PDA Responsibilities

The following features present in the Sandbox are currently "homeless" or partially implemented in the PDA/Backend layer:

1.  **Extended Transfer Metadata:** Sandbox supports `temporaryKey` (v.K.), `deliveryTerm`, `buyoutDate`, and `RIP` protocols. The PDA `FLOW` intent lacks specific fields for these.
2.  **Social Architecture Acts:** `ORDER_JOIN` and `DEPARTMENT_JOIN` logic is present in Sandbox `Storage.js` but missing from PDA intents.
3.  **Bulk UE Transfer:** Sandbox UI allows multi-select for transfers; PDA current service handles single `ue_uuid` or "oldest available".
4.  **Reputation/Weight Logic:** `calculateWeight()` and `calculateSpiritualDynamics()` in `logic.js` are complex frontend-only calculations that should be projected via `MIRROR`.

---

## 4. Pilot Readiness Assessment

| Component | Readiness | Note |
| :--- | :--- | :--- |
| **Frontend (Sandbox)** | 85% | UI is mature; needs API adapter layer instead of localStorage. |
| **PDA Layer** | 70% | Core intents (1, 2, 3, 14) are stable; needs metadata hardening. |
| **Service Layer** | 80% | Business logic is isolated but bypassed by legacy routes. |
| **Replay Integrity** | 95% | Deterministic reconstruction is verified (151 tests pass). |
| **CI/Stability** | 90% | Automated contract tests ensure Canon compliance. |

**Overall Pilot Readiness: 84%**

---

## 5. Gap Analysis

### 🔴 Critical (Must fix before Pilot)
- **Metadata Support:** PDA `FLOW` must accept and record extended transfer metadata (`buyoutDate`, `temporaryKey`) to prevent data loss during migration.
- **Route Bypass:** Architectural debt in `acts.js` (inline SQL) creates a risk of logic divergence between REST API and PDA.

### 🟡 Recommended
- **Social Intents:** Implement `ORDER_JOIN` and `DEPARTMENT_JOIN` intents to support the full 14-protocol scope.
- **Projection Expansion:** Move `calculateWeight` logic to `mirror-service` to ensure "One Truth" across all clients.

### 🟢 Optional (Post-Pilot)
- **Bulk Flow:** Optimize `transfer-service` for batch processing of multiple `ue_uuid`.

---

## 6. Migration Overview (Non-Implementation)

The transition from Sandbox to Pilot Version follows these steps:

1.  **Adapter Creation:** Replace the `Storage` engine in the frontend with a `PDAClient` that calls the `/api/agent` endpoints.
2.  **State Handover:** On first run, the local `crystal_state` is submitted as a series of `acts` to the backend to initialize the server-side `acts_log`.
3.  **Handshake Implementation:** Frontend must perform a version handshake with the PDA to ensure compatibility with `emission-policy` rules.
4.  **Phase Synchronization:** Frontend should subscribe to Metronome phases via `GET /api/metronome/phase` instead of local clock calculations.

---

## 7. Risks

*   **Replay Drift:** Any discrepancy in how `burnAt` is calculated between Sandbox logic and `temporal.js` will cause Replay failures.
*   **PDA Boundary Violation:** If the frontend continues to perform local state modifications without a corresponding Backend Act, the "Golden State" will diverge.
*   **Data Loss:** Legacy metadata in `localStorage` (e.g., custom gratitude messages) may be lost if not explicitly mapped to `acts_log.payload`.
*   **Latency:** Moving from synchronous `localStorage` to asynchronous API calls may impact the "snappiness" of the UI (Flower of Life).

---
*End of Report*
