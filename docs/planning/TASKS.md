# TASKS

Roadmap v1 status: complete. Phases `0` through `7` are closed.
Roadmap v2 status: complete. Phases `A` through `F` are closed (April 24, 2026).

---

## Now

- [ ] **Design System + UX Roadmap — Phase 4 readiness gate**
  - Phase 3 — Token Verification and Responsive/Motion Token Alignment is closed.
  - Phase 4 is ready to begin with evidence capture only: confirm desktop CLS with Lighthouse trace/filmstrip evidence and review image payload evidence before assigning root cause or changing implementation.
  - Do not start image delivery changes, CLS fixes, typography, card/elevation, section polish, routing, IA, CMS, or Contentful migration work without explicit Phase 4 implementation approval.

- [ ] **Roadmap v2 closeout complete — maintenance mode**
  - Use the Phase F maintenance workflow and release checklist for ongoing updates.
  - Keep queue/state transitions aligned with the closeout rule below.

Phase closeout rule:
A phase cannot be considered complete unless:
1. its implementation work is finished,
2. it is moved out of the active `Now` queue,
3. the next phase (or roadmap-complete state) is reflected in `TASKS.md`,
4. the corresponding phase doc includes a closeout/reopen note.

---

## Recently Completed

- [x] **Phase 3 — Token Verification and Responsive/Motion Token Alignment** (closed May 18, 2026)
  - `--space-5` token defect resolved, focused CSS custom property scan passes with only the documented dynamic `Stack` false positive, motion/responsive baseline notes are documented, and portable Storybook/Node guidance is current.
  - Deferred findings are preserved for navigation hard-coded transition alignment and section-specific responsive QA; these are not Phase 3 blockers.
  - Reopen only if a true regression is discovered in token definitions, undefined CSS custom property hygiene, motion/reduced-motion documentation, breakpoint reference documentation, or current Storybook Node guidance.

- [x] **Phase 2 — Domain/SEO Foundation Cleanup** (closed May 15, 2026)
  - Live crawler files, root fallback metadata, canonical behavior, deployed commit, and Lighthouse SEO `100` are documented in `docs/planning/phase-2-deploy-artifact-validation-spec.md`.
  - Prior blocker is preserved as a resolved Netlify stale deploy/cache incident.
  - Reopen only if a true regression is discovered in crawler file delivery, canonical behavior, fallback metadata, deploy artifact alignment, or SEO release validation.

- [x] **Phase F — Maintenance QA / Release Discipline** (completed April 24, 2026)
  - Maintenance workflow, release-readiness checklist, parity notes, and deferred items are documented in `docs/planning/PHASE-F-MAINTENANCE-QA-RELEASE-DISCIPLINE.md`.
  - Reopen only if a true regression is discovered in maintenance workflow clarity, release discipline, local/CI/runtime parity guidance, or planning consistency.

- [x] **Phase E — Project Structure Hardening** (completed April 24, 2026)
  - Structure and ownership hardening standards are documented in `docs/planning/PHASE-E-PROJECT-STRUCTURE-HARDENING.md`.
  - Reopen only if a true regression is discovered in structure rules, ownership guidance, placement conventions, or planning consistency.

- [x] **Phase D — Spacing and Layout Spec Pass** (completed April 24, 2026)
  - Spacing/layout rhythm rules and implementation notes are documented in `docs/planning/PHASE-D-SPACING-LAYOUT-SPEC.md`.
  - Reopen only if a true regression is discovered in spacing rhythm, layout consistency, responsive spacing behavior, or related Storybook layout-spec coverage.

- [x] **Phase C — Component Cleanup + UX Polish** (completed April 24, 2026)
  - Visible component polish and interaction/fallback refinements documented in `docs/planning/PHASE-C-COMPONENT-CLEANUP-UX-POLISH.md`.
  - Reopen only if a true regression is discovered in polished component behavior, interaction states, fallback surfaces, or related Storybook QA coverage.

- [x] **Phase B — Storybook Productization** (completed April 24, 2026)
  - Strengthened foundation stories (`Tokens`, `Typography`, `Layout`, `Interaction States`).
  - Tightened primitive stories as canonical usage references.
  - Clarified Storybook ownership rules in design-system docs.
  - Verification completed (`lint`, `test`, `build`, `build-storybook` with Node `22.12.0` runtime override).
  - Phase record: `docs/planning/PHASE-B-STORYBOOK-PRODUCTIZATION.md`
  - Reopen only if a true Storybook or design-foundation regression is discovered.

- [x] **Phase A — Maintenance Sweep** (completed April 24, 2026)
  - Cleanup audit and safe removals captured in `docs/planning/PHASE-A-MAINTENANCE-SWEEP.md`.
  - Reopen only if a true cleanup regression is discovered.

---

## Upcoming

- No additional roadmap phases remain after v2 closeout.
- Track only maintenance follow-ups and deferred candidates.

---

## Verification Snapshot (Latest: Phase 3 closeout gate, May 18, 2026)

- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run build`
- [x] `npm run build-storybook` (pass with Node `22.12.0` selected through the local version manager)
- [x] Focused CSS custom property scan (no concrete undefined references; dynamic `Stack` `--space-` scan hit remains a documented false positive)
- [x] Motion baseline scan (navigation local transition values documented as deferred)
- [x] Responsive/breakpoint scan (reference tokens confirmed; explicit media-query values documented)
- [x] Current Storybook guidance uses portable Node `22.12+` instructions instead of a machine-specific PATH command.
- [x] `git diff --check`

Runtime note:
- Default shell Node is still `22.2.0`.
- `npm run build` currently completes but prints the Vite Node-floor warning.
- `npm run build-storybook` still requires Node `22.12+`; use `.nvmrc`, `.node-version`, or an equivalent version manager rather than a machine-specific command.

---

## Guardrails

- Keep `src/content/*` as the content boundary and `ContentSource` contract owner.
- Keep shell ownership in `src/components/layout/*` (`PageShell` remains shell owner).
- Keep primitive ownership in `src/components/ui/*`.
- Keep section rendering ownership in `src/components/sections/*`.
- Keep route behavior ownership in `src/pages/*` and `src/pages/articles/*`.
- Keep section normalizer-first rendering intact.
- Keep Storybook in-repo and hybrid (`src/components/**/*.stories.*` + `src/stories/*`).
- Do not reopen closed phases unless a true regression is discovered.

---

## Canonical References

- Current design-system roadmap: `docs/planning/design-system-roadmap-current.md`
- Phase 2 deploy validation spec: `docs/planning/phase-2-deploy-artifact-validation-spec.md`
- Phase 4 evidence source: `.tmp/design-system-audit/` local Lighthouse artifacts (untracked)
- Phase F maintenance discipline record: `docs/planning/PHASE-F-MAINTENANCE-QA-RELEASE-DISCIPLINE.md`
- Phase E structure hardening record: `docs/planning/PHASE-E-PROJECT-STRUCTURE-HARDENING.md`
- Phase D spacing/layout record: `docs/planning/PHASE-D-SPACING-LAYOUT-SPEC.md`
- Phase C polish record: `docs/planning/PHASE-C-COMPONENT-CLEANUP-UX-POLISH.md`
- Phase B productization record: `docs/planning/PHASE-B-STORYBOOK-PRODUCTIZATION.md`
- Phase A maintenance record: `docs/planning/PHASE-A-MAINTENANCE-SWEEP.md`
- Canonical phase history (v1): `docs/planning/IMPLEMENTATION-ROADMAP.md`
- Phase history records: `docs/planning/PHASE-*.md`
- Legacy roadmap context (historical only): `docs/planning/ROADMAP.md`
- Design-system hub: `docs/design-system/design-system.md`
