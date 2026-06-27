---
name: Engineering Task
about: Standard issue template for all development work
title: '[{type}] {short description}'
labels: []
assignees: []
---

## Type

- [ ] Bug fix
- [ ] Feature
- [ ] Test
- [ ] Documentation
- [ ] Refactoring
- [ ] CI/CD
- [ ] Dependency update

## Description

{What needs to be done and why}

## Canon Compliance

- [ ] Changes stay within allowed layer direction (downward only)
- [ ] No business logic added to route handlers
- [ ] acts_log remains append-only
- [ ] Replay remains deterministic
- [ ] No new frameworks introduced

## Acceptance Criteria

- [ ] {Criterion 1}
- [ ] {Criterion 2}
- [ ] All existing tests pass
- [ ] New tests added (if applicable)

## Files Likely Affected

- {file 1}
- {file 2}

## Executor

- [ ] Human
- [ ] Jules (Level 1: docs, tests, CI, Docker)
- [ ] Jules (Level 2: services, refactoring — after approval)
