# Phase 7 — Testing + Governance + Docs

Status: Implemented in this pass (April 24, 2026). Active implementation phase remains Phase 7 until final closeout.

## Scope

Phase 7 consolidates test coverage, governance guidance, and canonical documentation without changing stable architecture boundaries (`PageShell`, `src/content/*`, section normalizer-first rendering, and GitHub service layering).

## What This Phase Finalized

### 1) Testing consolidation

- Audited current test surface by area:
  - layout/shell
  - SEO behavior
  - GitHub service layer
  - route states
  - navigation behavior
  - section edge cases
  - primitive contracts
- Added focused regression tests for remaining high-value gaps:
  - `src/components/layout/PageShell.test.tsx` (shell-level contract)
  - `src/router/routes.test.ts` (route continuity and path parsing)
- Kept additions behavior-focused and avoided snapshot-heavy coverage.

### 2) Governance and quality workflow alignment

- Updated front-door governance docs (`README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`) so instructions match actual scripts and architecture boundaries.
- Standardized quality-check expectations to:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - `npm run build-storybook` (when environment supports required Node floor)
- Preserved the known Storybook/Node mismatch as environment/tooling context only.

### 3) Documentation canonicalization

- Clarified canonical source ownership:
  - `README.md`: project overview + canonical doc map + quality workflow
  - `docs/planning/TASKS.md`: active execution tracker
  - `docs/planning/IMPLEMENTATION-ROADMAP.md`: canonical phase sequence
  - `docs/planning/PHASE-*.md`: historical phase execution records
  - `docs/design-system/*`: design-system reference truth
- Kept `docs/planning/ROADMAP.md` as clearly-labeled legacy history.

### 4) Planning hygiene

- Marked Phase 6 complete and moved active queue to Phase 7 in `TASKS.md`.
- Updated active phase note in `IMPLEMENTATION-ROADMAP.md`.
- Kept phase records additive and sequence-stable.

## Remaining blockers / deferred items

- Local Storybook build remains blocked on Node `22.2.0`; Storybook requires `22.12+`.
- Broader post-roadmap enhancements (beyond Phases 0-7) remain intentionally deferred:
  - additional integration-level route smoke coverage
  - optional Storybook interaction-runner expansion (`test:storybook`)
  - any future feature work outside current roadmap scope

## Guardrail check

- `src/content/*` responsibility unchanged.
- `PageShell` remains shell owner.
- `src/components/ui` vs `src/components/sections` ownership split unchanged.
- Section normalizer-first rendering unchanged.
- GitHub integration remains under `src/lib/github/*`.
- SEO ownership from Phase 2 remains route-owned through `PageShell` + `SeoHead`.
