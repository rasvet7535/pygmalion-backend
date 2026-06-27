# AI_GOVERNANCE.md — Multi-Agent Development Regulations

**Status:** Normative
**Priority:** Second after CANON.md
**Scope:** Defines roles, permissions, and workflows for all AI agents in the project

## Principle

CANON.md is the constitution of the project.
AI_GOVERNANCE.md is the working regulations of the team, including AI agents.

## Role Registry

| Role | Agent | Permission | Boundary |
|------|-------|------------|----------|
| Initiator | Human | Decide what to build | Sets direction, approves all final decisions |
| Architectural Discussion | ChatGPT, Claude, Grok | Propose solutions, challenge approaches | No code changes, no final decisions |
| Independent Audit | Claude, MiMo, OpenCode | Verify compliance, find violations | Read-only, no modifications |
| Deterministic Engineering Executor | Jules | Implement scoped engineering tasks | Executes approved plans, creates PRs |
| Final Decision | Human | Approve or reject | Gates all merges and architectural changes |

## Permission Matrix

| Action | Human | ChatGPT/Claude/Grok | Jules |
|--------|-------|---------------------|-------|
| Modify CANON.md | YES | NO | NO |
| Modify acts_log schema | YES | NO | NO |
| Propose architecture | YES | YES | NO |
| Implement features | YES | NO | YES |
| Write tests | YES | NO | YES |
| Run independent audit | NO | YES | NO |
| Create PR | YES | NO | YES |
| Approve PR | YES | NO | NO |
| Modify PDA/core | YES | NO | NO |
| Modify Canon Layer | YES | NO | NO |
| Modify Services layer | YES | NO | YES |
| Modify Routes layer | YES | NO | YES |
| Update documentation | YES | YES | YES |

## Jules Operating Protocol

### Designation

Jules is the **Deterministic Engineering Executor**.

Not an architect. Not an author. Not an auditor. An executor of engineering tasks.

### Scope

Jules may only:
- Implement tasks explicitly described in a GitHub Issue
- Create branches and PRs
- Write code within approved architectural boundaries
- Run tests defined in AGENTS.md

### Restrictions

Jules may NOT:
- Make architectural decisions
- Modify Canon Layer or PDA core
- Change emission policy or temporal rules
- Replace frameworks or introduce new dependencies (without approval)
- Self-merge PRs
- Modify this file or AGENTS.md

### Prompt Template

Every Jules task must begin with:

```
Read CANON.md and AGENTS.md first.

Task: [specific description]

Constraints:
- Stay within allowed file ownership (see AGENTS.md)
- No architecture changes
- No framework changes
- All sync tests must pass
```

## Workflow

```
Human creates Issue
    ↓
Architectural discussion (ChatGPT / Claude / Grok)
    ↓
Human approves approach
    ↓
Independent audit (Claude / MiMo)
    ↓
Audit passes → Human assigns to Jules
    ↓
Jules implements → creates PR
    ↓
CI runs tests (GitHub Actions)
    ↓
Human reviews PR
    ↓
Human merges or rejects
```

## Escalation Rules

| Situation | Action |
|-----------|--------|
| Jules proposes Canon change | REJECT. Reassign to human. |
| Jules modifies PDA/core | REJECT. Reassign to human. |
| Jules replaces a framework | REJECT. Escalate to architectural discussion. |
| Tests fail after Jules PR | BLOCK merge. Jules must fix or human intervenes. |
| Architectural disagreement | Human decides. No AI has final say. |
| Audit finds Canon violation | BLOCK merge. Violation must be resolved. |

## Document Hierarchy

```
1. CANON.md          — Constitution (what the system IS)
2. AI_GOVERNANCE.md  — Regulations (who does WHAT)
3. AGENTS.md         — Execution rules (how agents ACT)
4. CLAUDE.md         — Project context (for AI assistants)
```

Each lower document may not contradict the one above it.
