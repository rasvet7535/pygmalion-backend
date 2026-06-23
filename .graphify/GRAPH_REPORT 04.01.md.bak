# Graph Report - .  (2026-06-20)

## Corpus Check
- Corpus is ~37 704 words - fits in a single context window. You may not need a graph.

## Summary
- 160 nodes · 167 edges · 15 communities detected
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output
- Edge kinds: contains: 134 · calls: 18 · references: 6 · imports_from: 5 · conceptually_related_to: 2 · triggers: 2

## God Nodes (most connected - your core abstractions)
1. `getCurrentTime()` - 7 edges
2. `getCurrentPhase()` - 4 edges
3. `main()` - 4 edges
4. `getMaxUEPerDay()` - 3 edges
5. `getNextMidnightUTC()` - 3 edges
6. `calculateBurnAt()` - 3 edges
7. `now` - 3 edges
8. `acts_log` - 3 edges
9. `CANON Document` - 3 edges
10. `PYG Test Console Specification` - 3 edges

## Surprising Connections (you probably didn't know these)
- `CANON Document` --conceptually_related_to--> `ADR-01.2 Canonical Design`  [INFERRED]
  CANON.md → docs/ADR-01.2-CANONICAL.md
- `PYG Test Console Specification` --conceptually_related_to--> `GENEZIS Creation Report`  [INFERRED]
  PYG_TEST_CONSOLE_SPEC.md → GENEZIS_CREATION_REPORT.md
- `CANON Character Specification` --references--> `CANON Document`  [EXTRACTED]
  CANON-CHAR-SPEC.txt → CANON.md
- `Claude Documentation` --references--> `Docker Compose Configuration`  [EXTRACTED]
  CLAUDE.md → docker-compose.yml
- `Test Cycle Script` --references--> `PYG Test Console Specification`  [EXTRACTED]
  docs/TEST-CYCLE-SCRIPT.md → PYG_TEST_CONSOLE_SPEC.md

## Communities

### Community 0 - "Server API & Routes"
Cohesion: 0.04
Nodes (50): acts, acts24h, app, burn_echo, burnAt, burned_recently, burnedDetails, burnedUEs (+42 more)

### Community 1 - "Grammar Engine"
Cohesion: 0.12
Nodes (15): GrammarEngine, ALLOWED_CHARS, classifyOK(), COMMON_ALL, COMMON_PAIRS, DIGITS, fs, isValidOK() (+7 more)

### Community 2 - "Canon Module"
Cohesion: 0.14
Nodes (4): Canon, main(), { Pool }, validateDailyEmission()

### Community 3 - "Emission Policy"
Cohesion: 0.20
Nodes (6): BASE_TRIADS, EMISSION_POLICY, EXT_TRIADS, getMaxUEPerDay(), isOrderHead(), isPredstoyatel()

### Community 4 - "Database Schema"
Cohesion: 0.22
Nodes (8): acts_log, acts_log_immutable, acts_log_merkle, annotations, ok_identity, ro_dag_edges, ue_units, um_markers

### Community 5 - "Metronome Time"
Cohesion: 0.40
Nodes (9): calculateBurnAt(), calculateSilence(), getCurrentPhase(), getCurrentTime(), getCurrentTimeISO(), getNextMidnightUTC(), getWindowStart(), isEmissionAllowed() (+1 more)

### Community 6 - "Documentation & Design"
Cohesion: 0.25
Nodes (8): ADR-01.2 Canonical Design, CANON Document, CANON Character Specification, GENEZIS Creation Report, PYG Test Console, PYG Test Console Specification, Replay Test, Test Cycle Script

### Community 7 - "Temporal Rules"
Cohesion: 0.25
Nodes (7): emit, emitHour, hour, minute, nextMidnight, phase, t

### Community 8 - "Test Infrastructure"
Cohesion: 0.43
Nodes (6): get(), http, main(), { Pool }, post(), sleep()

### Community 9 - "Reserved Constants"
Cohesion: 0.67
Nodes (2): content, reserve

### Community 10 - "Mirror & Presence"
Cohesion: 0.67
Nodes (3): determineCyclePhase(), getMirrorData(), now

### Community 11 - "Character Bridges"
Cohesion: 1.00
Nodes (1): chars

### Community 12 - "DevOps Config"
Cohesion: 1.00
Nodes (2): Claude Documentation, Docker Compose Configuration

### Community 15 - "Frontend Migration"
Cohesion: 1.00
Nodes (1): Frontend Migration Map

### Community 16 - "Initiator Tree"
Cohesion: 1.00
Nodes (1): Initiator Tree Guide

## Knowledge Gaps
- **93 isolated node(s):** `chars`, `EMISSION_POLICY`, `BASE_TRIADS`, `EXT_TRIADS`, `GrammarEngine` (+88 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Reserved Constants`** (2 nodes): `content`, `reserve`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Character Bridges`** (1 nodes): `chars`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `DevOps Config`** (2 nodes): `Claude Documentation`, `Docker Compose Configuration`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Migration`** (1 nodes): `Frontend Migration Map`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Initiator Tree`** (1 nodes): `Initiator Tree Guide`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What connects `chars`, `EMISSION_POLICY`, `BASE_TRIADS` to the rest of the system?**
  _93 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Server API & Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.03508771929824561 - nodes in this community are weakly interconnected._
- **Should `Grammar Engine` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Canon Module` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._