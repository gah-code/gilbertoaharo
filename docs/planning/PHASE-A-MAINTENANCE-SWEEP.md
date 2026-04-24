# Phase A — Maintenance Sweep (Roadmap v2)

Status: Completed (April 24, 2026)
Closeout note: keep Phase A closed unless a true cleanup regression is discovered.

## 1. Summary

Phase A performed a conservative maintenance cleanup focused on stale, duplicate, or low-value artifacts without changing architecture boundaries or refactoring the content layer.

Audit coverage included:
- `README.md`
- `docs/planning/*`
- `docs/design-system/*`
- `docs/architecture/*`
- `.storybook/*`
- `package.json`
- `src/stories/*`
- `src/components/**/*.stories.tsx`
- `src/components/**/__fixtures__/*`
- `src/content/static/*`
- `src/content/contentful/*`
- `src/pages/*`
- `src/pages/articles/*`
- `src/preview/*`
- `public/*`
- debug route surfaces (`/debug`, `/debug/github`)

## 2. Keep List

Kept as canonical/current and actively useful:
- `README.md`
- `docs/planning/IMPLEMENTATION-ROADMAP.md`
- `docs/planning/PHASE-0-BASELINE.md`
- `docs/planning/PHASE-2-SEO-FOUNDATION.md`
- `docs/planning/PHASE-3-PERFORMANCE-ACCESSIBILITY.md`
- `docs/planning/PHASE-4-UX-NAVIGATION.md`
- `docs/planning/PHASE-5-DESIGN-SYSTEM-FOUNDATIONS.md`
- `docs/planning/PHASE-6-COMPONENT-SECTION-REFINEMENT.md`
- `docs/planning/PHASE-7-TESTING-GOVERNANCE-DOCS.md`
- `docs/planning/TASKS.md`
- `docs/planning/ROADMAP.md` (historical record retained)
- `docs/design-system/design-system.md`
- `docs/design-system/foundations.md`
- `docs/design-system/components.md`
- `docs/design-system/audit/*`
- `.storybook/main.ts`, `.storybook/preview.ts`
- Storybook hybrid layout (`src/components/**/*.stories.tsx` + `src/stories/*`)
- Fixture ownership split:
  - `src/components/articles/__fixtures__/articleList.fixture.ts` (article card test/story fixture)
  - `src/components/sections/sectionStoryFixtures.ts` (section story fixtures)
  - `src/content/static/fixtures.ts` (content-source static fixture baseline)
- Debug validation routes:
  - `src/pages/DebugPage.tsx`
  - `src/pages/DebugGithubPage.tsx`
- Public runtime assets used by app/deploy:
  - `public/_redirects`
  - `public/vite.svg` (current favicon)
- Content boundary implementation and adapters under `src/content/*` (unchanged)

## 3. Removed Items

Safe deletions/compression completed:
- `docs/planning/finished.md`
  - Empty file (`0` bytes), no active ownership, only historical tree mention in old audit snapshot.
- Duplicate no-op Storybook variants removed:
  - `src/components/sections/SkillsSection.stories.tsx` (`EditorialSplitList`)
  - `src/components/sections/ProjectsSection.stories.tsx` (`Slider`, `RichCards`)
  - `src/components/sections/LearningSection.stories.tsx` (`RoadmapTimeline`)
  - These exported identical args/rendering to `Default` stories and added no extra coverage.
- Stale commented legacy route implementation removed from:
  - `src/router/routes.ts`
  - Active route logic is unchanged; file readability improved.

## 4. Legacy/Labeled Items

Retained but explicitly labeled as historical/legacy context:
- `docs/planning/storybook-migration-plan.md`
  - Added legacy note and canonical pointers to current planning docs.
- `docs/design-system/checklists/architect.md`
  - Added legacy context note and pointers to canonical design-system/planning docs.
- `docs/design-system/sections/timeline-section.md`
  - Added legacy context note and canonical source pointers.
- `docs/design-system/design-system.md`
  - Clarified checklist link as historical context and updated contribution note accordingly.

## 5. Deferred Review Items

Intentionally kept pending human/product decision (not safe for speculative deletion in this pass):
- `src/preview/PreviewBanner.tsx` and `src/preview/previewMode.ts`
  - Currently not integrated into runtime flow, but represent partial preview-mode direction and are referenced by docs/history.
- `docs/architecture/contentful-cm-view.png` and `docs/architecture/contentful-cm-view-v2.png`
  - Potential consolidation candidate, but both are still referenced in README screenshot section.
- `public/vite.svg`
  - Default Vite favicon is low-value branding-wise, but still actively used by `index.html`; replacement requires explicit branding decision.
- Foundation/layout story overlap (`src/stories/Layout.stories.tsx` vs `src/components/ui/LayoutPrimitives.stories.tsx`)
  - Potential merge candidate, but each currently serves a distinct framing level (foundations vs primitive API examples).

## 6. Notes on Architecture Boundaries Preserved

Phase A preserved all guardrails:
- `src/content/*` remained untouched and continues to own content sourcing and adapter boundaries.
- `src/components/layout/*` remains shell ownership.
- `src/components/ui/*` remains primitive ownership.
- `src/components/sections/*` remains section rendering ownership.
- `src/pages/*` and `src/pages/articles/*` remain route-level behavior ownership.
- Section normalizer-first rendering remains intact.
- Storybook remains in-repo with hybrid story structure (colocated stories + `src/stories`).

## 7. Recommended Next Phase Handoff (Phase B)

Proceed to **Phase B — Storybook Productization** with this starting context:
- Storybook now has less duplicate/no-op story noise.
- Legacy and canonical planning/docs boundaries are clearer.
- Candidate Phase B focus:
  - strengthen high-value interaction stories/tests (`test:storybook` on critical primitives/sections)
  - decide on foundation story overlap consolidation only where it improves signal
  - keep section and content boundaries unchanged while tightening story quality and confidence gates
