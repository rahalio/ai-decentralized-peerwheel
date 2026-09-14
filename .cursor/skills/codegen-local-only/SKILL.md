---
name: codegen-local-only
description: >-
  Enforce that .codegen stays local-only and is never committed or pushed.
  Use when cloning codegen tooling, running zero-codegen, or editing .gitignore
  / Cursor rules related to codegen.
---

# Codegen local-only

## Hard rule

**`.codegen/` must never be committed or pushed to GitHub.**

It is a local copy of the vendored `zero-codegen` tool from `zero-apps-codegen-scaffold`. Collaborators obtain it by copying from the scaffold, not from this repo’s git history.

## Safeguards

- `.gitignore` must include `.codegen/` (and related patterns such as `**/zero_codegen/`).
- Cursor rule: `.cursor/rules/codegen-no-commit.mdc` (`alwaysApply: true`).

## If missing

```bash
rsync -a --exclude 'node_modules' \
  /path/to/zero-apps-codegen-scaffold/.codegen/ \
  ./.codegen/
pnpm codegen:paths
```

Do not commit the result. Do not rebuild equivalent infrastructure from scratch.
