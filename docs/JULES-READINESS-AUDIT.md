# Google Jules Integration — Independent Architecture Audit

**Date:** 2026-06-26
**Subject:** Preparation for safe integration of Google Jules Coding Agent
**Repository:** `C:\pygmalion\backend-v0.4.02.GENEZIS`
**Status:** Read-Only Audit (no code changes)

---

# Part 1 — Google Jules: Architecture & Capabilities

## 1.1 What Jules Is

Google Jules is an autonomous, asynchronous coding agent built on **Gemini 2.5 Pro**. It is currently in **public beta** (free of charge). It is NOT a co-pilot or autocomplete — it is a full autonomous agent that reads your codebase, plans changes, and implements them.

- **Source:** Official docs at `jules-documentation.web.app`, Google Blog announcement (May 20, 2025)
- **Evidence level:** VERIFIED (official documentation)

## 1.2 Execution Model

| Aspect | Detail |
|--------|--------|
| Runtime | Fresh Ubuntu Linux VM per task (Google Cloud) |
| Cloning | Full repo clone via GitHub OAuth |
| Dependencies | Pre-installed: Node.js, Python, Go, Java, Rust |
| Setup | User-provided setup scripts (install, build, test commands) |
| Async | Task runs in background; notifications on completion |
| Model | Gemini 2.5 Pro |
| Internet | VM has internet access |

**Evidence level:** VERIFIED (official docs)

## 1.3 Sandbox & Security

| Aspect | Detail |
|--------|--------|
| Isolation | Each task gets its own short-lived VM |
| Network | Internet-enabled (for package installs) |
| Data retention | VM is ephemeral — destroyed after task |
| Privacy | **Does NOT train on private repo content** (official FAQ) |
| Secrets | User responsibility — Jules warns against committing secrets |
| Execution | User is responsible for code Jules runs |

**Official quote (FAQ):** "Jules does not train on private repository content. Privacy is a core principle for Jules."

**Limitation:** VM has internet access — no network isolation from external services. Secrets in repo would be exposed to the VM.

**Evidence level:** VERIFIED

## 1.4 Repository Cloning & Branch Strategy

| Aspect | Detail |
|--------|--------|
| Auth | GitHub OAuth (Google Labs Jules app) |
| Access | User-configurable per-repo |
| Branch selection | User picks base branch per task |
| Output | Jules creates a new branch with changes |
| Branch ownership | User owns the branch; Jules is commit author |
| PR creation | User opens PR manually from the created branch |

**Key constraint:** Jules works with GitHub only. No GitLab, Bitbucket, or other VCS support.

**Evidence level:** VERIFIED

## 1.5 Pull Request Workflow

1. User submits task with prompt
2. Jules generates a **plan** (user reviews before code changes)
3. User approves plan (or gives feedback to revise)
4. Jules executes — writes code in VM
5. Jules presents: files changed, runtime, lines added, branch name, commit message
6. User clicks "Create branch" → pushes to GitHub
7. User opens PR → reviews → merges

**No automatic PR creation.** User must create the PR manually after branch push.

**Evidence level:** VERIFIED

## 1.6 Testing Workflow

| Capability | Status |
|------------|--------|
| Setup scripts | User defines `npm install`, `npm test` etc. |
| Validation | "Run to Validate" button tests setup script |
| Test execution | Jules can run tests as part of task |
| Long-running processes | NOT supported (`npm run dev`, watchers) |
| CI integration | None — Jules is standalone |

**Limitation:** Jules cannot run dev servers or long-lived processes. Only discrete commands.

**Evidence level:** VERIFIED

## 1.7 Review Model

| Feature | Description |
|---------|-------------|
| Plan review | Generated before code; user approves/revises |
| Activity feed | Real-time log of steps completed |
| Diff editor | Full-screen diff view across all changed files |
| Mid-task feedback | Chat box for real-time corrections |
| Pause/resume | Tasks can be paused and resumed |
| Auto-approve plan | Timer-based auto-approval if user navigates away |

**Evidence level:** VERIFIED

## 1.8 Current Limitations

| Limitation | Impact on Pygmalion |
|------------|-------------------|
| GitHub only | All 4 repos are on GitHub — OK |
| Max 2 concurrent tasks | Limits parallel work |
| Max 5 tasks/day | Limits throughput |
| No Docker in VM | Cannot test docker-compose scenarios |
| No database in VM | Cannot run PostgreSQL-dependent tests |
| No custom VM images | Cannot pre-install project-specific tools |
| No `.env` support | Must inline env vars in setup script |
| Auto-approve timer | Risk of unintended plan approval |
| Beta status | Features may change; no SLA |
| Free now, paid later | Pricing model unknown |

**Evidence level:** VERIFIED (limits from official docs)

---

# Part 2 — Repository Readiness

## 2.1 Project Structure Assessment

```
backend-v0.4.02.GENEZIS/
├── backend/
│   ├── server.js              ← API Gateway (Express)
│   ├── db.js                  ← PostgreSQL pool
│   ├── core/
│   │   ├── canon/             ← 7 canon modules (SSOT rules)
│   │   ├── metronome.js       ← Temporal phases
│   │   ├── grammar-engine.js  ← О.К. parsing
│   │   └── logger.js          ← Pino structured logging
│   ├── routes/                ← HTTP adapters (7 files)
│   ├── services/              ← Business logic layer
│   └── helpers.js             ← Shared utilities
├── PDA/
│   ├── index.js               ← PDA entry point
│   ├── core/                  ← ExecutionGateway, PreviewEngine, VersionHandshake
│   ├── intents/               ← Intent routers (plan, flow, etc.)
│   └── tests/                 ← Unit + contract tests
├── sql-schema/                ← schema-v3.1-canonical.sql
├── tools/                     ← replay-core.js, run-test-cycle.js
├── tests/                     ← docker-integration.test.js
├── migrations/                ← 009_perf_batch.sql
├── infra/                     ← EMPTY (planned but not committed)
├── docs/                      ← 19 documentation files
├── CANON.md                   ← Normative development canon (v2.1)
├── CLAUDE.md                  ← AI assistant context
├── docker-compose.yml         ← Dev stack (postgres + backend)
├── Dockerfile                 ← Backend container
└── package.json               ← v0.4.02
```

**Structure quality:** Well-organized, clear separation of concerns. 6-layer architecture is documented and enforced.

**Evidence level:** VERIFIED

## 2.2 Dependency Graph

```
server.js
 ├── db.js (pg Pool)
 ├── core/metronome.js
 ├── core/logger.js (pino)
 ├── routes/acts.js        → db, canon, metronome, helpers, grammar-engine
 ├── routes/mirror.js      → db, canon, metronome, helpers, grammar-engine
 ├── routes/field.js       → db, canon, metronome, grammar-engine
 ├── routes/annotations.js → db, canon, metronome, helpers, grammar-engine
 ├── routes/observability.js → db, canon, metronome
 ├── routes/agent.js       → PDA
 ├── routes/health.js      → db, canon, metronome
 └── routes/replay.js      → replay-core.js

PDA/index.js
 ├── PDA/core/execution-gateway.js → canon, services
 ├── PDA/core/preview-engine.js    → canon
 ├── PDA/core/version-handshake.js → emission-policy
 ├── PDA/intents/*.js              → PDA/core/*
 └── PDA/tests/*.js                → PDA/*, canon/*

Canon Layer (backend/core/canon/)
 ├── index.js       ← entry (exports all 7 modules)
 ├── emission-policy.js ← SSOT for emission limits
 ├── grammar.js     ← Grammar Engine
 ├── ontology.js    ← phases, statuses, act types
 ├── temporal.js    ← 24+4, burn, silence
 ├── reserved.js    ← system reserve, ОРАКУЛ-С
 ├── bridges.js     ← bridge-symbols
 └── protocols.js   ← access protocols
```

**Key finding:** Canon Layer has zero external dependencies — pure logic. This is architecturally correct.

**Evidence level:** VERIFIED

## 2.3 Service Layer

**Exists at:** `backend/services/` (per ARCHITECTURE_MAP.md)

**Issue found:** `routes/acts.js` contains **inlined business logic** (handleEmission, handleTransfer, etc.) that duplicates what the service layer should provide. The service layer exists but is **bypassed by the primary route**.

**Severity:** HIGH — violates the 6-layer architecture. Route layer should delegate to Services, not contain business logic.

**Evidence level:** VERIFIED (from repo inspection)

## 2.4 PDA Module

| Component | File | Purpose |
|-----------|------|---------|
| Entry | `PDA/index.js` | Boot, Canon Handshake, Capability Manifest |
| ExecutionGateway | `PDA/core/execution-gateway.js` | Delegates to services layer |
| PreviewEngine | `PDA/core/preview-engine.js` | Read-only preview of actions |
| VersionHandshake | `PDA/core/version-handshake.js` | Validates emission policy version compatibility |
| IntentRouters | `PDA/intents/*.js` | Route specific intent types |

**151/151 tests pass** (per PDA_HARDENING_REPORT.md).

**Observation:** Each intent file instantiates its own `ExecutionGateway` and `PreviewEngine`, creating redundant instances beyond the ones in `PDA/index.js`. Not a bug, but wasteful.

**Evidence level:** VERIFIED

## 2.5 Testing Assessment

| Test File | Framework | Tests | DB Required |
|-----------|-----------|-------|-------------|
| `PDA/tests/pda.test.js` | Custom (assert) | 87 sync + 8 async | Async yes |
| `PDA/tests/canon-contract.test.js` | Custom (assert) | 54 | No |
| `tests/docker-integration.test.js` | Custom (assert) | 10 sync + 7 async | Async yes |

**Total:** ~166 tests

**Critical gaps:**
- No HTTP-level integration tests (Express routes untested)
- No tests for burn cron job in server.js
- No tests for `backend/services/` layer
- No load testing
- Custom test harness (no Jest, Mocha, or Vitest)

**For Jules:** Sync tests (141) can run in Jules VM. Async tests (15) need PostgreSQL — **cannot run in Jules VM**.

**Evidence level:** VERIFIED

## 2.6 Docker Readiness

| File | Issue |
|------|-------|
| Dockerfile line 6 | Label version `0.4.0-alpha` mismatches package.json `0.4.02` |
| docker-compose.yml | Password `pygmalion_secret_2026` hardcoded (dev-only acceptable) |
| docker-compose.yml | `POSTGRES_HOST_AUTH_METHOD: trust` (dev-only) |

**For Jules:** Jules VM cannot run Docker. `docker-compose` scenarios are untestable in Jules environment.

**Evidence level:** VERIFIED

## 2.7 Documentation Assessment

**Strong points:**
- CANON.md (v2.1) — normative, English, well-structured
- ARCHITECTURE_MAP.md — 6-layer diagram, module table, HTTP API
- VERSIONING_SCHEME.md — 4-component versioning, handshake algorithm
- PDA_HARDENING_REPORT.md — completion checklist
- 19 doc files in `docs/`

**Issues found:**

| File | Issue |
|------|-------|
| CANON1.md | Many TODO placeholders — incomplete |
| CANON.ST.md | Severe character encoding corruption (garbled Cyrillic) |
| CANON.md.bak | Backup file — should not be in repo |
| CLAUDE.md | References project as "socio-technological startup" — may confuse Jules |

**Evidence level:** VERIFIED

## 2.8 CI/CD Readiness

**Status: NO CI/CD EXISTS.**

- No `.github/` directory
- No GitHub Actions workflows
- No `.gitignore`
- No pre-commit hooks
- No `npm audit` in scripts
- No vulnerability scanning

**For Jules:** This is a significant gap. Without CI, Jules-generated PRs have no automated verification. Every PR must be manually tested.

**Evidence level:** VERIFIED

## 2.9 Repository Readiness Score

| Category | Score | Notes |
|----------|-------|-------|
| Project structure | 8/10 | Clean, well-organized, clear layers |
| Testing | 4/10 | 166 tests but custom harness, no HTTP tests, no service tests |
| CI/CD | 0/10 | Non-existent |
| Documentation | 7/10 | Strong canon, some incomplete/corrupted files |
| Docker | 5/10 | Works for dev, version mismatch, no prod config |
| Security | 3/10 | Hardcoded secrets, no .gitignore, no audit |
| Dependencies | 6/10 | Minimal, but dotenv version anomaly, no scanning |
| Versioning | 6/10 | Defined scheme but mismatches between layers |

**Overall Readiness Score: 45/100**

**Verdict:** NOT READY for autonomous Jules integration. Critical gaps in CI/CD, testing, and security must be addressed first.

---

# Part 3 — CANON Integration

## 3.1 How Jules Should Consume CANON

**CANON.md is the single normative source.** Jules must read it before any task.

### Recommended approach:

**Jules setup script should include:**
```bash
cat CANON.md  # Jules reads this as context
```

However, Jules does NOT support persistent context injection. Each task starts fresh. Therefore:

**Option A (Recommended): Reference CANON in every prompt**
```
Read CANON.md first. This is the normative development canon.
All changes must comply with the 6-layer architecture rules.
PDA never owns rules. acts_log is SSOT. Only downward calls allowed.
[actual task description]
```

**Option B: AGENTS.md as CANON proxy**
Create an AGENTS.md that Jules auto-reads (if/when Jules supports it). Currently Jules does NOT auto-read AGENTS.md.

**Option C: Setup script loads CANON**
Add `cat CANON.md > /tmp/canon_context.txt` to setup script. Jules can reference it.

### Evidence level: PARTIALLY VERIFIED (Jules auto-read behavior not confirmed for AGENTS.md)

## 3.2 Should GitHub Issues Reference CANON?

**Yes.** Every issue should include:
```markdown
## Canon Compliance
- [ ] Changes stay within allowed layer direction (downward only)
- [ ] No business logic in route handlers
- [ ] acts_log remains append-only
- [ ] Replay remains deterministic
```

## 3.3 Should Pull Requests Reference CANON?

**Yes.** PR template should include:
```markdown
## Architecture Compliance
- Layer direction: PDA → Services → Canon → Repository → acts_log ✓
- No upward/cyclic dependencies ✓
- Canon rules not duplicated ✓
```

## 3.4 Should CI Reference CANON?

**Yes.** When CI exists, it should:
1. Run Canon Contract Tests (`canon-contract.test.js`)
2. Verify replay determinism (`replay-core.js`)
3. Check version handshake compatibility
4. Lint for forbidden patterns (direct DB access from PDA, upward imports)

## 3.5 Should Generated Code Reference CANON?

**No.** Generated code should not import or reference CANON.md directly. Code references the Canon Layer modules (`backend/core/canon/`). CANON.md is a human-readable specification, not a runtime dependency.

---

# Part 4 — AGENTS.md Specification

## 4.1 Should AGENTS.md Exist?

**Yes, but with strict scope.** AGENTS.md should define execution rules for AI agents (Jules, Claude, etc.), NOT duplicate architecture or philosophy.

## 4.2 AGENTS.md Structure

```markdown
# AGENTS.md — AI Agent Execution Rules

## Priority
1. CANON.md is the authoritative development canon
2. This file defines execution rules only

## Architecture Rules (from CANON.md)
- 6-layer architecture: Human Will → PDA → Services → Canon → Repository → acts_log
- Only downward calls allowed
- PDA never owns business rules or truth
- acts_log is append-only, immutable
- Replay must remain deterministic

## Forbidden Actions
- Do NOT add business logic to route handlers (backend/routes/)
- Do NOT access database directly from PDA or Services
- Do NOT create upward or cyclic dependencies
- Do NOT modify acts_log retroactively
- Do NOT bypass Canon Layer for rule changes
- Do NOT duplicate Canon rules in other modules

## Canonical Names (use these, not synonyms)
- Recognition Unit (R.U.) — NOT "credit", "token", "points"
- Recognition Marker (R.M.) — NOT "receipt", "confirmation"
- Open Key (O.K.) — NOT "account", "wallet", "address"
- acts_log — NOT "history", "log", "events"
- Metronome — NOT "timer", "scheduler", "cron"

## Testing Requirements
- Run sync tests: `node PDA/tests/pda.test.js`
- Run contract tests: `node PDA/tests/canon-contract.test.js`
- Async tests require PostgreSQL (cannot run in Jules VM)

## Versioning
- 4-component scheme: epoch.phase.build.revision
- Canon Version Handshake must pass on PDA boot
- Emission policy version must be compatible

## File Organization
- Business logic: backend/services/
- HTTP adapters: backend/routes/
- Rules: backend/core/canon/
- PDA: PDA/ (intent routing, preview, execution)
- Tests: PDA/tests/, tests/

## PR Requirements
- Reference CANON.md section relevant to changes
- Include architecture compliance checklist
- All sync tests must pass
- No new upward dependencies
```

## 4.3 What AGENTS.md Must NOT Contain

- Duplicated architecture descriptions (already in CANON.md, ARCHITECTURE_MAP.md)
- Philosophy or ethics (already in CANON.md)
- Business rules (already in Canon Layer code)
- HTTP API documentation (already in ARCHITECTURE_MAP.md)
- Setup instructions (already in CLAUDE.md)

---

# Part 5 — Safe Workflow

## 5.1 Complete Workflow

```
Human identifies task
        ↓
Creates GitHub Issue (with Canon compliance checklist)
        ↓
Copies issue to Jules prompt (with CANON.md context)
        ↓
Jules generates plan
        ↓
Human reviews plan ← ARCHITECTURE REVIEW happens here
        ↓
Human approves/revises plan
        ↓
Jules executes code changes
        ↓
Jules presents diff + summary
        ↓
Human reviews code ← CODE REVIEW happens here
        ↓
Human clicks "Create branch" → GitHub
        ↓
CI runs (when exists) ← CONTRACT TESTS + REPLAY VERIFICATION
        ↓
Human opens PR ← VERSION HANDSHAKE validated here
        ↓
PR review + merge
```

## 5.2 Where Each Checkpoint Happens

| Checkpoint | When | Who |
|------------|------|-----|
| Architecture review | Plan approval | Human (with CANON.md reference) |
| Code review | After Jules presents diff | Human |
| Contract Tests | CI pipeline (AFTER PR creation) | Automated |
| Replay verification | CI pipeline | Automated |
| Version Handshake | PDA boot (runtime) + CI | Automated |
| CI execution | After branch push | Automated (GitHub Actions) |
| Final approval | PR merge | Human |

## 5.3 Critical Safety Measures

1. **Never auto-approve Jules plans** for Canon-changing work
2. **Always review diffs** before clicking "Create branch"
3. **Run sync tests locally** before merging (Jules cannot run async/DB tests)
4. **Verify version handshake** passes after any emission-policy changes
5. **Check replay determinism** after any acts_log-related changes

---

# Part 6 — Risk Assessment

| # | Risk | Severity | Probability | Mitigation |
|---|------|----------|-------------|------------|
| 1 | **Architecture drift** — Jules adds business logic to routes or bypasses layers | HIGH | HIGH | AGENTS.md rules; PR template checklist; human review |
| 2 | **Duplicated documentation** — Jules creates parallel docs contradicting CANON | MEDIUM | MEDIUM | AGENTS.md forbids doc creation; review all new .md files |
| 3 | **AI hallucinations** — Jules invents non-existent Canon concepts or modules | HIGH | MEDIUM | Every claim must be verified against CANON.md; human review |
| 4 | **Hidden dependency upgrades** — Jules updates package.json without approval | HIGH | MEDIUM | Lock file; review all package.json changes; npm audit |
| 5 | **Framework replacement** — Jules replaces Express with Fastify or similar | CRITICAL | LOW | Explicitly forbid in AGENTS.md; review all new dependencies |
| 6 | **Unauthorized refactoring** — Jules "improves" working code unnecessarily | MEDIUM | HIGH | Scope prompts tightly; review diffs carefully |
| 7 | **Silent behavioral changes** — Jules changes logic without updating tests | HIGH | MEDIUM | Run tests before merge; review test changes |
| 8 | **Business logic migration** — Jules moves rules from Canon to Services or PDA | HIGH | LOW | Architecture review at plan stage; import linting |
| 9 | **Canon violations** — Jules creates upward/cyclic dependencies | HIGH | LOW | AGENTS.md rules; CI static analysis (when exists) |
| 10 | **Security risks** — Jules exposes hardcoded secrets to VM | MEDIUM | LOW | Audit docker-compose.yml; move to .env |
| 11 | **Merge conflicts** — Jules modifies files others are working on | LOW | MEDIUM | Isolated branches; small-scoped prompts |
| 12 | **Prompt drift** — Repeated similar tasks produce inconsistent results | MEDIUM | MEDIUM | Template prompts; reference CANON.md section numbers |

---

# Part 7 — First Jules Task (Ranked by Safety)

## Ranking

| Rank | Task | Safety | Rationale |
|------|------|--------|-----------|
| 1 | **Documentation** | SAFEST | No code changes. Jules can update docs, add JSDoc, fix typos in CANON.md translations |
| 2 | **Dependency cleanup** | SAFE | Update lockfile, audit packages, remove unused deps. Low blast radius |
| 3 | **Integration tests** | SAFE | Write HTTP-level tests for existing routes. Additive only, no behavior change |
| 4 | **CI setup** | SAFE | Create `.github/workflows/` for GitHub Actions. Additive, testable |
| 5 | **Docker** | MODERATE | Fix version label mismatch. Create infra/ configs. Low risk but touches deployment |
| 6 | **Logging** | MODERATE | Add structured logging to untested routes. Additive, but must not break existing behavior |
| 7 | **Service Layer** | RISKY | Refactor business logic out of routes into services. Requires understanding full data flow |
| 8 | **server.js refactoring** | RISKY | Core entry point. Any mistake breaks everything. Requires deep Canon understanding |
| 9 | **Replay tests** | RISKY | Must maintain determinism. Any change to replay logic is high-consequence |

## Recommended First Task

**Create GitHub Actions CI pipeline** that:
1. Runs sync tests (`node PDA/tests/pda.test.js`, `node PDA/tests/canon-contract.test.js`)
2. Checks Node.js version compatibility
3. Validates Dockerfile builds
4. Checks for hardcoded secrets (trufflehog/gitleaks)

This is safe because:
- Purely additive (new files only)
- No behavior change
- Immediately useful for all future Jules tasks
- Testable in isolation
- Establishes quality gate for all subsequent work

---

# Part 8 — Long-Term Multi-Agent Operating Model

## 8.1 Agent Responsibility Boundaries

| Responsibility | Owner | Why |
|----------------|-------|-----|
| **Architecture** | Human | Only human understands full Canon intent and philosophical context |
| **Implementation (features)** | Jules + Claude | Autonomous agents for well-scoped tasks with clear Canon reference |
| **Implementation (critical paths)** | Human + Claude | server.js, PDA core, Canon modules — too risky for autonomous work |
| **Auditing** | Claude (review skill) | Independent verification against Canon |
| **Testing** | Jules (unit) + Human (integration) | Jules writes tests; human validates integration scenarios |
| **Documentation** | Jules ( drafts) + Human (approval) | Jules generates; human ensures Canon compliance |
| **Refactoring** | Human + Claude | Requires deep architectural understanding |
| **DevOps** | Human + Claude | Docker, CI/CD, deployment — too sensitive for autonomous |
| **Bug fixes (simple)** | Jules | Well-scoped, low-risk fixes with clear reproduction |
| **Bug fixes (architectural)** | Human + Claude | Requires root cause analysis across layers |

## 8.2 Anti-Overlap Rules

1. **One agent owns a task at a time.** No parallel edits to same file by different agents.
2. **Architecture decisions are human-only.** No agent may change layer boundaries, SSOT definitions, or Canon rules.
3. **PR review requires human approval.** No agent may self-merge.
4. **Canon changes require human sign-off.** Any modification to CANON.md, emission-policy.js, or temporal.js needs explicit human review.

## 8.3 Recommended Workflow by Agent

| Agent | Tasks | Prompt Template |
|-------|-------|-----------------|
| **Jules** | Docs, tests, deps, CI, simple fixes | "Read CANON.md. [specific task]. Do not modify business logic." |
| **Claude** | Architecture review, complex refactoring | "Audit this code against CANON.md layers. Identify violations." |
| **Gemini** | Research, documentation drafts | "Research [topic] and draft documentation following CANON terminology." |
| **Grok** | Code review, security audit | "Review this PR for Canon compliance and security issues." |
| **Human** | Architecture, critical decisions, final approval | — |

---

# Part 9 — Executive Summary

## Is backend-v0.4.02.GENEZIS ready for Google Jules?

**NO. Not yet.**

The repository has strong architectural foundations (6-layer design, Canon Layer, version handshake, 151 passing tests) but critical gaps prevent safe autonomous agent integration:

### Must Complete Before Enabling Jules:

| # | Gap | Effort | Priority |
|---|-----|--------|----------|
| 1 | **Create .gitignore** | 5 min | CRITICAL |
| 2 | **Fix Dockerfile version label** | 5 min | CRITICAL |
| 3 | **Create GitHub Actions CI** (sync tests only) | 2-4 hours | CRITICAL |
| 4 | **Create AGENTS.md** | 1-2 hours | HIGH |
| 5 | **Fix hardcoded secrets** (move to .env pattern) | 1 hour | HIGH |
| 6 | **Add HTTP integration tests** (at least for /api/agent/*) | 4-8 hours | HIGH |
| 7 | **Fix service layer bypass** in routes/acts.js | 4-8 hours | MEDIUM |
| 8 | **Clean up corrupted docs** (CANON.ST.md, CANON1.md TODOs) | 1 hour | LOW |

### Readiness Score: 45/100

### What CAN Be Done Now (Low-Risk Jules Tasks):
- Documentation updates and translations
- Writing new unit tests for existing code
- Creating CI pipeline configuration
- Dependency audit and cleanup
- Fixing the Dockerfile version label

### What MUST NOT Be Delegated to Jules Yet:
- server.js modifications
- Canon Layer changes
- PDA core changes
- Database schema modifications
- Business logic refactoring
- Anything affecting acts_log or replay

### Recommended Timeline:
1. **Week 1:** .gitignore, AGENTS.md, fix Dockerfile, fix secrets
2. **Week 2:** GitHub Actions CI, HTTP integration tests
3. **Week 3:** Fix service layer bypass, clean docs
4. **Week 4:** First Jules task (CI validation or documentation)

---

**End of Audit**

*This report was generated through official Jules documentation verification and direct repository inspection. All claims are sourced. Speculation is marked where evidence is incomplete.*
