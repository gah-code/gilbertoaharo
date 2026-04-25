# Phase E — Project Structure Hardening (Roadmap v2)

Status: Completed (April 24, 2026).

## Closeout Note

Phase E is closed and preserved as a completed reference phase.

Do not reopen unless a true regression is discovered in one or more of the following:
- structure rules
- ownership guidance
- placement conventions
- planning consistency

Closeout reminder:
- A phase doc should not imply active status once `TASKS.md` has moved to the next phase.

## 1. Goal

Harden project structure standards so file ownership and placement decisions are predictable, low-drama, and maintainable without architecture churn.

## 2. Current Structure Strengths Preserved

- `src/content/*` remains the content boundary (`ContentSource`, adapters, source switching).
- `src/components/layout/*` remains shell ownership.
- `src/components/ui/*` remains primitive ownership.
- `src/components/sections/*` remains section ownership with normalizer-first rendering.
- `src/pages/*` and `src/pages/articles/*` remain route ownership.
- Storybook remains hybrid:
  - colocated component stories under `src/components/**`
  - cross-cutting foundation stories under `src/stories/*`
- Global style boundaries remain intact (`tokens.css`, `base.css`, colocated feature CSS).

## 3. Standards Clarified

### Naming Conventions

- Components, pages, sections: `PascalCase.tsx` and matching `PascalCase.css` when styled.
- Stories:
  - component and foundation stories use `*.stories.tsx`
  - story-only style helpers use `*.stories.css` (example: `ArticleCard.stories.css`)
- Tests:
  - component/page behavior: `*.test.tsx`
  - pure utilities/normalizers: `*.test.ts`
- Fixtures:
  - feature/story/test fixtures use `*.fixture.ts` when split from canonical sources
  - canonical content fixture source remains `fixtures.ts` under `src/content/static/`

### Placement Rules

- Content:
  - place source, adapters, and API mapping under `src/content/*`.
- Layout:
  - shell composition (`Header`, `Footer`, `PageShell`, `SeoHead`) under `src/components/layout/*`.
- Primitives:
  - reusable UI controls and layout primitives under `src/components/ui/*`.
- Sections:
  - section render components under `src/components/sections/*`.
  - section-specific normalizers under `src/components/sections/<section>/normalize*.ts`.
- Pages:
  - route entry/render logic under `src/pages/*`.
  - route-local helpers in page subfolders (example: `src/pages/articles/articlesPageUtils.ts`).
- Stories:
  - component-specific stories colocated near the component.
  - cross-cutting system stories in `src/stories/*`.
- Tests:
  - colocate test files with the module they validate.
  - keep route tests with route pages.
  - keep normalizer tests adjacent to normalizers.
- Fixtures:
  - canonical app/content fixtures: `src/content/static/fixtures.ts`
  - section story fixtures: `src/components/sections/sectionStoryFixtures.ts`
  - component-local fixtures: colocated `__fixtures__/` near the component.
- Styles:
  - tokens only in `src/styles/tokens.css`
  - global/reset rhythm only in `src/styles/base.css`
  - primitive styles in `src/components/ui/*.css`
  - section/page-specific styles in colocated section/page CSS

### Normalizer vs Renderer Rules

- Normalizers:
  - sanitize optional CMS fields
  - apply default/fallback values
  - produce stable render-model contracts for components
- Render components:
  - consume normalized models
  - own semantic markup, layout composition, and variant rendering
- Route utilities:
  - keep route-level sorting/filtering/derive logic close to route folders

## Placement Rules (Short Matrix)

- Content: `src/content/*`
- Layout: `src/components/layout/*`
- Primitives: `src/components/ui/*`
- Sections: `src/components/sections/*`
- Pages: `src/pages/*`, `src/pages/articles/*`
- Stories: colocated `src/components/**` + cross-cutting `src/stories/*`
- Tests: colocated by owning module/route
- Fixtures: canonical content (`src/content/static/fixtures.ts`), section-story (`src/components/sections/sectionStoryFixtures.ts`), component-local (`__fixtures__/`)
- Styles: tokens (`src/styles/tokens.css`), global baseline (`src/styles/base.css`), otherwise colocated

## 4. Safe Structure Changes Made

- No runtime architecture boundaries were moved.
- No aggressive folder reshuffle was performed.
- No route/content/section ownership boundaries were changed.
- Hardening changes are documentation-first:
  - clarified naming and placement conventions
  - clarified fixture ownership tiers
  - clarified story/test colocation expectations
  - clarified normalizer vs renderer vs route-utility responsibilities

## 5. Ownership Rules

- Content ownership: `src/content/*` and `ContentSource` contracts only.
- Primitive ownership: `src/components/ui/*`.
- Section ownership: `src/components/sections/*` + section normalizers.
- Route ownership: `src/pages/*`.
- Story ownership:
  - colocated for component contracts
  - `src/stories/*` for system-level guidance
- CSS ownership:
  - foundational/global vs primitive vs section/page styles remain intentionally separated.

## 6. Deferred Larger Structure Ideas

- Any `src/features/*` migration or major folder reshuffling.
- Any split of docs into a broader handbook structure beyond current canonical docs.
- Any test-folder centralization (kept colocated to preserve locality).
- Any Storybook tree redesign (hybrid structure retained).

## 7. Planning Consistency Check

Pre-implementation check:
- `TASKS.md` active queue points to Phase E.
- Phase A-D records are marked complete.
- `IMPLEMENTATION-ROADMAP.md` reflects v2 A-F order with Phase E active and Phase F upcoming.

Corrections applied before standards updates:
- none required in planning state for this pass (already coherent).

Post-implementation check:
- `TASKS.md` now points to Phase F as active queue.
- Phase A-E are marked complete in planning/task docs.
- Phase D remains closed with explicit reopen guard in `PHASE-D-SPACING-LAYOUT-SPEC.md`.
- `IMPLEMENTATION-ROADMAP.md` still reflects v2 order with Phase F as active.

## 8. Verification Results

- `npm run lint`: pass
- `npm run test`: pass
- `npm run build`: pass (default-shell Node warning remains)
- `npm run build-storybook`:
  - default shell Node `22.2.0`: fails due runtime floor
  - runtime override `PATH="/Users/gilbertharo/.n/bin:$PATH"` (Node `22.12.0`): pass
