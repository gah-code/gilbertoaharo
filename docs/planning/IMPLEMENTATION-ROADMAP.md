# IMPLEMENTATION-ROADMAP

Canonical phased execution plan for post-baseline implementation.  
This roadmap supersedes legacy sequencing in `docs/planning/ROADMAP.md`.
Roadmap status: Completed (Phases 0-7 closed on April 24, 2026).
Reopen prior phases only when a true regression is discovered.

## Post-Closeout Maintenance Log

- July 14, 2026 — CLS root-cause investigation recorded as an evidence-only maintenance batch, not a fix. Repeated production Lighthouse checks did not reproduce the prior severe homepage desktop CLS, but temporary browser `PerformanceObserver` evidence reproduced severe route-mount shifts and points to short async route loading states being replaced by much taller fetched CMS content after first paint. No source, CSS/layout, image-delivery, SEO, Netlify/env, CMS, or Contentful behavior changed. The next recommended batch is narrow CLS fix planning for route loading-state/layout reservation behavior.
- July 13, 2026 — Roadmap state sync recorded as a maintenance documentation update, not a phase reopen. Phase 4 image-delivery work is complete and deploy-verified through ArticleCard adoption on `/articles`; `.tmp/` repo hygiene is complete; robots/keywords metadata is verified locally and live; Netlify secret-scan redeploy verification remains parked; and CLS fixes remain blocked until root-cause evidence is confirmed. The next recommended active batch is CLS root-cause investigation with evidence only and no layout changes.
- May 23, 2026 — Button interaction hardening recorded as a maintenance fix, not a phase reopen. Updated the shared button/link interaction contract so link-mode buttons preserve variant text color across hover, active, and visited states; disabled buttons avoid press movement; action rows keep touch-friendly button behavior; external web links enforce `noreferrer noopener`; `mailto:` links stay in the current browsing context by default; and CTA `aria-label` values include visible button/link text. Affected surfaces: `Button`, `Link`, section `ActionGroup`, `ProjectsSection`, `TimelineSection`, and `FooterSection`. Validation passed with `npm test`, `npm run lint`, and `npm run build`; the build still prints the known local Node `22.2.0` warning against the project `22.12+` Vite floor.

## Roadmap v2 Follow-On Sequence (Post Closeout)

Tracked operationally in `docs/planning/TASKS.md` and phase records:
- Phase A — Maintenance Sweep
- Phase B — Storybook Productization
- Phase C — Component Cleanup + UX Polish
- Phase D — Spacing and Layout Spec Pass
- Phase E — Project Structure Hardening (completed April 24, 2026)
- Phase F — Maintenance QA / Release Discipline (completed April 24, 2026)

Roadmap v2 status: completed (all follow-on phases closed on April 24, 2026).

## 1) Phase 0 — Baseline + Execution Map

### Goal

- Capture current architecture truth, identify protected mature patterns, and define an execution map without changing production behavior.

### Why now

- Prevents duplicate work and refactor churn in later phases.
- Creates a stable decision baseline before adding new integration surfaces.

### Task list

- Produce `PHASE-0-BASELINE.md` with architecture snapshot, strengths, phase gaps, do-not-disturb list, and analysis Q&A.
- Produce this phased implementation roadmap.
- Sync `TASKS.md` to a phase-based execution tracker.
- Keep legacy `ROADMAP.md` with a canonical pointer.

### Deliverables

- `docs/planning/PHASE-0-BASELINE.md`
- `docs/planning/IMPLEMENTATION-ROADMAP.md`
- `docs/planning/TASKS.md` (phase-aligned)
- Legacy pointer notice in `docs/planning/ROADMAP.md`

### Dependencies

- None (starting phase).

## 2) Phase 1 — GitHub API Foundation

### Goal

- Introduce a safe, testable GitHub service layer that can be consumed by UI/pages without direct endpoint coupling.

### Why now

- Establishes integration boundaries early while preserving existing content architecture.
- Enables incremental feature adoption in later phases without UI fetch sprawl.

### Task list

- Add env config for GitHub in `.env.example` and `src/env.ts`.
- Create `src/lib/github/types.ts`.
- Create `src/lib/github/client.ts`.
- Create `src/lib/github/mappers.ts`.
- Create `src/lib/github/githubService.ts`.
- Add optional debug page/route for GitHub service validation.
- Add tests for mapping behavior and error handling.
- Document setup and security notes.
- Keep integration as a service layer (no direct UI fetches).
- Do not make GitHub a first-class content source in this phase.
- Use public-read mode first.
- Explicitly document that `VITE_*` values are client-exposed.
- Recommend serverless proxy for future sensitive/private access use cases.

### Deliverables

- Service-layer implementation under `src/lib/github/*`.
- GitHub env parsing/config wiring.
- Optional debug validation surface.
- Test suite for mapper and error scenarios.
- Documentation updates for setup and security.

### Dependencies

- Phase 0 baseline complete.
- Node/runtime environment supports local tests for new modules.

## 3) Phase 2 — SEO Foundation

### Goal

- Standardize and harden SEO metadata behavior across route surfaces.

### Why now

- SEO behavior is already partially present and should be normalized before broader UX/UI refinements.

### Task list

- Define canonical metadata contract for landing, articles, list page, and fallback routes.
- Unify title/description/canonical handling rules and defaults.
- Identify route-specific metadata gaps and close them without architecture churn.
- Add focused tests for SEO-critical route behavior.
- Document SEO ownership boundaries (shell/page/content mapping).

### Deliverables

- Consistent metadata behavior across core routes.
- SEO tests and updated planning/docs references.

### Dependencies

- Phase 0 baseline architecture decisions.
- Phase 1 may optionally provide external content inputs but is not required for initial SEO hardening.

## 4) Phase 3 — Performance + Accessibility

### Goal

- Improve interaction quality, accessibility reliability, and measurable runtime performance.

### Why now

- Performance and accessibility regressions compound quickly as features grow; this phase locks quality floors early.

### Task list

- Perform navigation keyboard/focus/escape/overlay behavior audit and close gaps.
- Standardize loading/error/empty-state accessibility messaging and semantics.
- Define and validate route-level performance checkpoints.
- Improve heavy UI surface behavior (images, expensive section interactions) where needed.
- Add/expand tests for accessibility-critical and performance-sensitive behavior.

### Deliverables

- Accessibility remediation set for critical user paths.
- Performance baseline report and targeted improvements.
- New/updated tests covering high-risk interaction paths.

### Dependencies

- Phase 0 architecture guardrails.
- Phase 2 SEO changes should be stabilized to avoid overlapping page-head churn.

## 5) Phase 4 — UX + Navigation

### Goal

- Refine cross-route UX quality and navigation consistency.

### Why now

- Core data/service boundaries are established by this point; UX can be improved without destabilizing foundations.

### Task list

- Harmonize page-level loading/error/empty UX copy and hierarchy.
- Improve navigation predictability across desktop/mobile interactions.
- Tighten route-to-route visual and interaction consistency.
- Validate responsive behavior and navigation semantics across breakpoints.
- Update docs for UX ownership conventions.

### Deliverables

- Consistent UX behavior matrix for core routes.
- Navigation interaction refinements and documentation.

### Dependencies

- Phase 3 accessibility/performance baseline complete.

## 6) Phase 5 — Design System Foundations

### Goal

- Consolidate and formalize design-system foundations for long-term maintainability.

### Why now

- After UX/performance stabilization, foundational token and primitive governance can be standardized with lower rework risk.

### Task list

- Formalize breakpoint/motion/state token governance.
- Tighten primitive API contracts and documentation.
- Expand Storybook foundation/primitive contract coverage.
- Normalize style ownership rules across global vs colocated CSS.
- Document design-system change protocols.

### Deliverables

- Updated foundation token strategy and docs.
- Hardened primitive contracts.
- Expanded Storybook documentation/coverage for foundations/primitives.

### Dependencies

- Phase 4 UX patterns stabilized.

## 7) Phase 6 — Component + Section Refinement

### Goal

- Refine section and component behavior/consistency while preserving existing architecture boundaries.

### Why now

- Foundation and UX layers are in place; refinements can now focus on quality rather than structural change.

### Task list

- Improve under-specified section behaviors and visual rhythm.
- Tighten section-level responsive behavior and content edge-case handling.
- Expand section contract docs and Storybook scenarios where gaps remain.
- Keep normalizer-first section rendering pattern intact.

### Deliverables

- Refined section/component behavior with reduced inconsistency.
- Updated docs and story scenarios for refined patterns.

### Dependencies

- Phase 5 design-system foundation work complete.

## 8) Phase 7 — Testing + Governance + Docs

### Goal

- Lock governance and quality gates for sustainable iteration.

### Why now

- Final phase ensures changes from earlier phases are protected and maintainable.

### Task list

- Expand targeted test coverage for integration, regressions, and critical paths.
- Consolidate planning/design-system docs to canonical sources.
- Update governance standards for contribution, release hygiene, and quality checks.
- Ensure backlog and roadmap references match implemented state.

### Deliverables

- Stronger test and governance baseline.
- Consolidated documentation set with clear canonical sources.

### Dependencies

- Phases 1-6 complete enough to formalize long-term governance and documentation.
