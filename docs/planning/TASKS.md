# TASKS

Phase-aligned execution tracker.  
Canonical sequence and baseline are defined in:

- `docs/planning/PHASE-0-BASELINE.md`
- `docs/planning/IMPLEMENTATION-ROADMAP.md`

---

## Now: Phase 7 — Testing + Governance + Docs

### Goal

Lock quality gates, governance clarity, and canonical documentation for sustainable iteration after Phases 0-6.

### Ordered execution queue

#### 1. Testing consolidation

- [x] Audit current test coverage across shell/layout, routes, SEO, GitHub service layer, navigation, sections, and primitives.
- [x] Add focused regression tests for remaining high-value blind spots:
  - `PageShell` shell-level contract
  - route parser continuity (`parsePathname` / `buildArticlePath`)
- [x] Keep test additions behavioral and non-brittle.

#### 2. Governance + quality workflow

- [x] Align `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `SUPPORT.md` with actual repo scripts and architecture boundaries.
- [x] Document explicit quality-check workflow (`lint`, `test`, `build`, `build-storybook`).
- [x] Preserve Storybook Node floor mismatch as environment/tooling blocker, not architecture failure.

#### 3. Documentation canonicalization

- [x] Clarify canonical source ownership across README/planning/design-system docs.
- [x] Keep legacy roadmap/history docs clearly labeled as non-canonical.
- [x] Add Phase 7 closeout record with final deferred-item notes.

#### 4. Planning hygiene

- [x] Mark Phase 6 complete in this tracker.
- [x] Move active phase note to Phase 7 in `IMPLEMENTATION-ROADMAP.md`.
- [x] Keep phase records (`PHASE-*.md`) intact as historical implementation references.

---

## Phase 7 completion gate

- [x] Phase 6 is marked complete in `TASKS.md`
- [x] Phase 7 is the active queue in `TASKS.md`
- [x] remaining high-value testing gaps are addressed or clearly documented
- [x] governance/working-agreement guidance is clearer
- [x] canonical docs are clearer and less ambiguous
- [x] README is aligned with the final repo shape
- [x] remaining blockers/deferred items are recorded honestly
- [x] architecture guardrails remain intact
- [x] Phase 6 is not reopened except for a true discovered regression

---

## Recently completed: Phase 6 — Component + Section Refinement

- [x] Refined section rhythm/density across Hero, Timeline, Skills, Projects, Learning, and Contact.
- [x] Hardened responsive behavior and sparse-content edge states.
- [x] Improved section Storybook realism with sparse/empty/long-content variants.
- [x] Added focused section edge-case tests.
- [x] Documented Phase 6 outcomes in:
  - `docs/planning/PHASE-6-COMPONENT-SECTION-REFINEMENT.md`

### Phase 6 closure note

Do not reopen Phase 6 unless Phase 7 QA/governance work finds a true regression in section behavior, responsive consistency, or content-edge handling.

---

## Guardrails

- Keep `src/content` as the core content boundary.
- Keep `src/components/ui` and `src/components/sections` ownership split.
- Keep route-level organization under `src/pages/articles`.
- Keep `PageShell` as shared shell owner for global layout chrome and SEO wiring.
- Keep section normalizer-first rendering pattern.
- Keep route-level SEO ownership introduced in Phase 2.
- Keep GitHub integration under `src/lib/github/*`.
- Avoid broad refactors unless a post-roadmap phase explicitly justifies them.

---

## Links

- Baseline: `docs/planning/PHASE-0-BASELINE.md`
- Canonical roadmap: `docs/planning/IMPLEMENTATION-ROADMAP.md`
- Phase 2: `docs/planning/PHASE-2-SEO-FOUNDATION.md`
- Phase 3: `docs/planning/PHASE-3-PERFORMANCE-ACCESSIBILITY.md`
- Phase 4: `docs/planning/PHASE-4-UX-NAVIGATION.md`
- Phase 5: `docs/planning/PHASE-5-DESIGN-SYSTEM-FOUNDATIONS.md`
- Phase 6: `docs/planning/PHASE-6-COMPONENT-SECTION-REFINEMENT.md`
- Phase 7: `docs/planning/PHASE-7-TESTING-GOVERNANCE-DOCS.md`
- Legacy roadmap (history): `docs/planning/ROADMAP.md`

---

## Final wrap-up / known blockers

- Local Storybook build remains blocked on Node `22.2.0`; Storybook requires `22.12+`.
- This blocker is environment/tooling only and does not indicate architecture or implementation regression.
