# CANON.md Ч Pygmalion Development Canon

**Status:** Normative  
**Audience:** Developers & Architects  
**Priority:** Highest (overrides all other architecture documents)  
**Language:** English (Normative / SSOT for code and development)  
**Version:** 2.1  
**Translations:** CANON.ru.md (Informative)

## Hierarchy of Authority
1. **CANON.md** Ч  онституци€ проекта (неизмен€ема€ основа).  
2. Policies (EMISSION_POLICY.md, etc.) Ч конкретные правила.  
3. Architecture (ARCHITECTURE_MAP.md).  
4. Implementation (code, PDA, Services).  
5. Tests & Documentation.

**Rule:** If any document, code or test contradicts CANON.md Ч it is incorrect.

## Core Principles
- **SSOT**: `acts_log` is the single source of truth (append-only, immutable).  
- **Preview > Execute**: All actions require preview and explicit human confirmation.  
- **Replay**: Full system state must be recoverable from `acts_log` with 0 mismatch.  
- **Canon Layer**: Single source of all rules, limits, Metronome and contracts.  
- **PDA Role**: Only intent router, preview engine and execution gateway. **PDA never owns rules or truth.**  
- **Forbidden**: Direct DB access from PDA/Services, bypassing Canon/Metronome/Replay, upward or cyclic dependencies.

## Canonical Names (Normative)
The following terms are canonical and must not be replaced by synonyms in code or architecture:

- Recognition Unit (R.U.)  
- Recognition Marker (R.M.)  
- Open Key (O.K.)  
- Canon Layer  
- acts_log (SSOT)  
- Metronome  
- Preview > Execute  
- ro.DAG  

Prohibited synonyms: Recognition Credit, Recognition Token, etc.

## Architecture Layers
1. Human Will  
2. PDA (Intent Router + Preview + Execute)  
3. Services (Business logic)  
4. Canon Layer (Rules + Metronome + Contracts)  
5. Repository  
6. acts_log (SSOT)

Only downward calls allowed.

## Protocol Registry
Official protocol identifiers are defined in **PROTOCOL_REGISTRY.md**.  
Core protocols (stable): `::pro.1.PLAN::`, `::pro.2.TOK::`, `::pro.3.MIRROR::`, `::pro.4.VES::`.

## Emission Policy
Defined in **EMISSION_POLICY.md** (base daily 3Ц13 R.U., triads T1ЦT5, phases, special roles, etc.).

## Versioning & Contracts
- 4-component scheme (epoch.phase.build.revision) Ч see VERSIONING_SCHEME.md.  
- Canon Version Handshake on PDA startup.  
- Canon Contract Tests must fail on incompatible changes.

**This document is the single normative source for all development decisions.**