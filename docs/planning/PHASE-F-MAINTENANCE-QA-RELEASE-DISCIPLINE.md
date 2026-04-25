# Phase F — Maintenance QA / Release Discipline (Roadmap v2)

Status: Completed (April 24, 2026).

Roadmap v2 closeout note:
- Roadmap v2 is fully closed (`Phase A` through `Phase F` complete).

## 1. Goal

Finalize a lightweight, realistic maintenance and release-discipline workflow so routine updates stay reliable without architecture churn.

## 2. Maintenance Workflow

### Recurring checks

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run build-storybook` (Node `22.12+`)
- docs sync when contracts/processes change
- screenshot/demo refresh review when visible UI is intentionally changed

### When to run

- Before PR/update:
  - `lint`, `test`, `build`
- Before release/demo refresh:
  - route smoke checks on `/`, `/articles`, `/articles/:slug`, `/debug`, `/debug/github`
  - metadata spot-check (`title`, `description`, canonical URL) on key routes
  - `build-storybook` with Node `22.12+`
- After changing tokens, Storybook config/stories, major UI surfaces, or route behavior:
  - rerun full validation (`lint`, `test`, `build`, `build-storybook`)
  - update docs surfaces that own changed behavior

## 3. Release Checklist

Use this short release-readiness checklist:

1. Runtime check:
   - verify Node target is `22.12+` for Storybook parity
2. Validation:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - `npm run build-storybook` (Node `22.12+`)
3. Smoke checks:
   - verify landing, article index/detail, and debug routes render
4. Metadata checks:
   - spot-check route titles/descriptions/canonical URLs
5. Documentation checks:
   - update `README.md`, `CONTRIBUTING.md`, `docs/planning/TASKS.md`, and any affected phase/design-system docs
6. Visual/demo checks:
   - confirm screenshots/demo placeholders are still accurate or intentionally deferred

## 4. Local/CI Parity Notes

Parity state in this repository is explicitly documented:

- `package.json` engines: `>=22.12.0 <23`
- `.nvmrc`: `22.12.0`
- `.node-version`: `22.12.0`
- CI (`.github/workflows/ci.yml`) uses Node `22.12`

Current local shell note (at closeout):
- default shell Node is `22.2.0`
- `npm run build-storybook` fails on default shell runtime floor
- `PATH="/Users/gilbertharo/.n/bin:$PATH" npm run build-storybook` passes with Node `22.12.0`

This is treated as an environment parity issue, not an application architecture failure.

## 5. Canonical Docs Map

- `README.md`: front door (overview, setup, quality checks, runtime expectations)
- `CONTRIBUTING.md`: contributor workflow, required validation, guardrails, docs update rules
- `docs/planning/TASKS.md`: active maintenance tracker and roadmap closeout status
- `docs/planning/IMPLEMENTATION-ROADMAP.md`: canonical roadmap sequence/history
- `docs/planning/PHASE-*.md`: historical implementation records by phase
- `docs/design-system/*`: design-system foundations, component contracts, and ownership guidance
- `docs/planning/ROADMAP.md`: legacy context only (non-canonical)

## 6. Deferred Items / Blockers

Short post-roadmap deferred list:

- Persist default local shell/runtime so `node -v` resolves to `22.12.0` without PATH override.
- Replace README screenshot placeholders with current captures.
- Optional lightweight JSON-LD enhancements if kept route-owned and maintainable.
- Optional expansion of Storybook interaction-runner coverage for critical interaction paths.
- Optional small integration smoke-test additions where they provide clear regression value.

## 7. Planning Consistency Check

Pre-implementation check (Phase F start):
- `TASKS.md` pointed to `Phase F` as active queue.
- Phase records `A` through `E` were present and marked complete.
- `IMPLEMENTATION-ROADMAP.md` listed the correct v2 order (`A` -> `F`) with Phase F active.

Post-implementation check (Phase F closeout):
- `TASKS.md` marks Roadmap v2 as complete and Phase F as completed.
- `TASKS.md` no longer implies an unfinished v2 phase remains.
- `IMPLEMENTATION-ROADMAP.md` lists v2 order with Phase F marked completed.
- Phase records `A` through `F` are aligned and preserved as historical references.

Acceptance reminder:
- if planning docs drift from actual phase state, roadmap closeout is not complete.

## 8. Verification Results

Verification run for Phase F closeout:
- `npm run lint`: pass
- `npm run test`: pass
- `npm run build`: pass (default-shell Node warning remains)
- `npm run build-storybook`:
  - default shell Node `22.2.0`: fails due runtime floor
  - `PATH="/Users/gilbertharo/.n/bin:$PATH"` (Node `22.12.0`): pass

## 9. Closeout / Reopen Note

Phase F is closed and preserved as a completed reference phase.

Do not reopen unless a true regression is discovered in one or more of the following:
- maintenance workflow clarity
- release-readiness discipline
- local/CI/runtime parity guidance
- planning consistency and closeout queue accuracy
