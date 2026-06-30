# PYGMALION CONTEXT MAP

## Purpose
This document defines the minimal operational context for working with the Pygmalion / К.Р.И.С.Т.А.Л.Л. system.

It is intended for engineering agents (Code GPT, Jules, CI bots) as a single entry point for understanding architecture, rules, and constraints.

---

## 1. System Overview

Pygmalion / К.Р.И.С.Т.А.Л.Л. is a multi-layer architecture for a consent-based computational and social system.

Its core principle:
> All system state must be reconstructable from `acts_log` (SSOT).

---

## 2. Architecture Layers

Strict downward-only dependency model:

1. Human Will (O.K.) — user intent
2. PDA (Pygmalion Digital Agent) — intent router (Preview → Execute)
3. Services — business logic layer
4. Canon Layer — system rules and constraints
5. Repository Layer — data access
6. acts_log — immutable source of truth (SSOT)

Rules:
- No upward dependencies
- No cyclic calls
- All state derives from acts_log

---

## 3. Core System Rules

### SSOT
- `acts_log` is the only source of truth
- All system state must be replayable

### Replay Principle
- Any derived data must be reconstructable via Replay tests
- Replay must produce 0 mismatch

### Execution Flow
Preview → Execute → Verify

### Temporal Rule (Metronome)
- System operates in defined phases
- Silence window: 19:55–20:00 UTC (no actions allowed if enforced in Canon)

---

## 4. Data Model Concepts

- O.K. (Open Key) — identity unit
- U.E. (Recognition Unit) — limited daily attention unit
- U.M. (Recognition Marker) — immutable transfer trace
- ro.DAG — reputation graph structure

---

## 5. Engineering Constraints

- No modifications without explicit approval
- Canon Layer overrides all lower layers
- Schema consistency is mandatory
- Services must strictly follow database schema (no drift)

---

## 6. CI / Testing Requirements

Mandatory:
- Unit tests must pass
- Integration tests must pass
- Replay verification must pass

Failure condition:
- Any replay mismatch = system failure

---

## 7. Known Critical Rules

- acts_log is immutable
- No hidden state outside SSOT
- No silent schema divergence
- No unreviewed execution in PDA layer
- All DB changes must match canonical schema

---

## 8. Repositories

Backend:
https://github.com/rasvet7535/pygmalion-backend

Frontend:
https://github.com/rasvet7535/pygmalion-field

---

## 9. Operating Principle

When uncertain:
1. Stop
2. Identify missing schema/context
3. Ask before modifying
4. Do not assume

---

## 10. Minimal Instruction for Agents

- Read architecture
- Verify schema alignment
- Respect SSOT (acts_log)
- Run tests before commit
- Do not expand scope without request