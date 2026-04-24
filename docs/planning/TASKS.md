# TASKS

Roadmap v1 status: complete. Phases `0` through `7` are closed.
Roadmap v2 status: active.

---

## Now

- [ ] **Phase C — Component Cleanup + UX Polish**

---

## Recently Completed

- [x] **Phase B — Storybook Productization** (completed April 24, 2026)
  - Strengthened foundation stories (`Tokens`, `Typography`, `Layout`, `Interaction States`).
  - Tightened primitive stories as canonical usage references.
  - Clarified Storybook ownership rules in design-system docs.
  - Verification completed (`lint`, `test`, `build`, `build-storybook` with Node `22.12.0` runtime override).
  - Phase record: `docs/planning/PHASE-B-STORYBOOK-PRODUCTIZATION.md`

- [x] **Phase A — Maintenance Sweep** (completed April 24, 2026)
  - Cleanup audit and safe removals captured in `docs/planning/PHASE-A-MAINTENANCE-SWEEP.md`.
  - Reopen only if a true cleanup regression is discovered.

---

## Upcoming

- [ ] **Phase D — Spacing and Layout Spec Pass**
- [ ] **Phase E — Project Structure Hardening**
- [ ] **Phase F — Maintenance QA / Release Discipline**

---

## Verification Snapshot (Latest: Phase B, April 24, 2026)

- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run build`
- [x] `npm run build-storybook` (pass with `PATH="/Users/gilbertharo/.n/bin:$PATH"` -> Node `22.12.0`)

Runtime note:
- Default shell Node is still `22.2.0`.
- `npm run build` currently completes but prints the Vite Node-floor warning.
- `npm run build-storybook` requires Node `22.12+` and fails on default shell Node unless runtime override is used.

---

## Guardrails

- Keep `src/content/*` as the content boundary and `ContentSource` contract owner.
- Keep shell ownership in `src/components/layout/*`.
- Keep primitive ownership in `src/components/ui/*`.
- Keep section rendering ownership in `src/components/sections/*`.
- Keep route behavior ownership in `src/pages/*` and `src/pages/articles/*`.
- Keep section normalizer-first rendering intact.
- Keep Storybook in-repo and hybrid (`src/components/**/*.stories.*` + `src/stories/*`).
- Do not reopen closed phases unless a true regression is discovered.

---

## Canonical References

- Phase B productization record: `docs/planning/PHASE-B-STORYBOOK-PRODUCTIZATION.md`
- Phase A maintenance record: `docs/planning/PHASE-A-MAINTENANCE-SWEEP.md`
- Canonical phase history (v1): `docs/planning/IMPLEMENTATION-ROADMAP.md`
- Phase history records (v1): `docs/planning/PHASE-*.md`
- Legacy roadmap context (historical only): `docs/planning/ROADMAP.md`
- Design-system hub: `docs/design-system/design-system.md`
