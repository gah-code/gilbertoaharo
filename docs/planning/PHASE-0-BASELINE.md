# PHASE-0-BASELINE

## Scope and Constraints

- Phase 0 is documentation-only and planning-only.
- Production behavior remains unchanged.
- No UI redesign, SEO implementation, GitHub API implementation, or broad refactors in this phase.
- Baseline captured from the current repo state and local verification runs on April 23, 2026.

## Repo Architecture Snapshot

### Route structure

- Runtime router is implemented in `src/router/Router.tsx` + `src/router/routes.ts`.
- Current route map:
  - `/` -> `LandingPage`
  - `/articles` -> `ArticlesPage`
  - `/articles/:slug` -> `ArticlePage`
  - `/debug` -> `DebugPage`
  - fallback -> `NotFoundPage`
- `VITE_ARTICLE_ROUTE_PREFIX` (default `/articles`) controls article route prefix.

### Ownership split: shell vs pages vs sections vs primitives

- Shell/layout ownership (`src/components/layout/*`):
  - `PageShell` owns `SeoHead`, `Header`, main container, and global `Footer`.
  - `Header` and `Footer` fetch navigation/footer data from the content source.
- Page ownership (`src/pages/*`, `src/pages/articles/*`):
  - Pages own data loading, loading/error/not-found states, and page-level SEO values.
- Section ownership (`src/components/sections/*`):
  - `SectionRenderer` dispatches typed section entries to section components.
  - Section components render normalized view models, not raw CMS payload assumptions.
- Primitive ownership (`src/components/ui/*`, section primitives):
  - UI primitives provide shared contracts (Button, Link, Card, Badge, Text, Heading, layout primitives).
  - Section primitives (`SectionHeader`, `ActionGroup`, `ProofList`, `MediaFrame`) support section-level composition.

### Content-source boundaries

- `src/content/source.ts` defines a strict `ContentSource` interface:
  - `getLandingPage`
  - `getArticleBySlug`
  - `getAllArticles`
  - `getNavigationMenu`
  - `getFooter`
- `getContentSource()` switches between:
  - `contentfulSource`
  - `staticSource`
- Boundary is already architecture-safe: pages and layout consume `ContentSource`, not Contentful SDK directly (except the dedicated debug page).

### Contentful adapter/normalizer flow

- Contentful flow:
  - `src/content/contentful/client.ts` -> `src/content/contentful/api.ts` -> `src/content/contentful/adapters.ts` -> `src/content/contentful/contentfulSource.ts` -> pages/layout components.
- Section render flow:
  - adapter-mapped entries -> section normalizers -> section components.
- Existing section normalizers:
  - `hero/normalizeHeroSection.ts`
  - `timeline/normalizeTimelineSection.ts`
  - `skills/normalizeSkillsSection.ts`
  - `projects/normalizeProjectsSection.ts`
  - `learning/normalizeLearningSection.ts`
  - `contact/normalizeContactSection.ts`
  - `footer/normalizeFooterSection.ts`

### Current section/component architecture

- `SectionRenderer` is typed and map-driven by section content type IDs.
- Landing page content sections are rendered through `SectionRenderer`; footer is owned globally by `PageShell`.
- Hero supports both legacy and new field compatibility via normalization fallback behavior.
- Articles have dedicated index/detail routes and route-local normalization/sorting utilities.

### Storybook setup and coverage

- Storybook is configured in `.storybook/main.ts` and `.storybook/preview.ts`.
- Coverage includes:
  - Foundations (`src/stories/Tokens.stories.tsx`, `src/stories/Layout.stories.tsx`)
  - UI primitives (`src/components/ui/*.stories.tsx`)
  - Sections (`src/components/sections/**/*.stories.tsx`)
  - Article card stories (`src/components/articles/ArticleCard.stories.tsx`)
- Story data comes from static fixtures or section story fixtures, not direct raw API calls.

### Testing setup and baseline status

- Test/runtime tooling:
  - Vitest config in `vite.config.ts` (`happy-dom`, setup file `src/test/setup.ts`)
  - Assertions bootstrap in `src/test/setup.ts` (`@testing-library/jest-dom/vitest`)
- Current coverage includes:
  - section normalizers
  - section renderer
  - content adapters
  - article route utilities/pages
  - UI primitives (`Button`, `Link`)
- Baseline command status:
  - `npm run lint`: pass
  - `npm run test`: pass (14 files / 42 tests)
  - `npm run build`: pass with Node version warning
  - `npm run build-storybook`: blocked due to Node version (`22.2.0`), Storybook requires `20.19+` or `22.12+`

### Styling architecture

- Global foundations:
  - `src/styles/tokens.css` for design tokens
  - `src/styles/base.css` for global resets/rhythm/focus baseline
- Component architecture:
  - Colocated CSS for primitives, sections, navigation, and page-specific surfaces.
- Styling split is clear:
  - global tokens/base for cross-cutting rules
  - colocated CSS for component-specific visuals and responsive behavior.

### Env/config surfaces

- `src/env.ts` is the central env parsing boundary.
- `.env.example` defines public client vars and transitional client-exposed Contentful token.
- `netlify.toml` defines SPA build/deploy settings and redirects.
- `vite.config.ts` defines aliases and test config.
- `docs/env-classification.md` documents current env classification and migration targets.

## Current Strengths (Protect; Do Not Rebuild)

- Shared shell architecture (`PageShell`, global header/footer, SEO insertion point).
- Content source abstraction (`ContentSource` + static/contentful switching).
- Typed Contentful adapter boundary and map layer.
- Normalized section rendering model (normalizer-first section components).
- Storybook workspace and broad story coverage already in place.
- Vitest coverage for critical normalization and route behavior.
- CI gates already running `lint`, `build`, `test`, and `build-storybook`.
- Global header/footer ownership through shell and layout boundaries.
- Article route structure and dedicated article page/index patterns.
- Hero compatibility for legacy and new Contentful field shapes.

## Gaps by Phase (Future Work Map)

### Phase 1 — GitHub API foundation

- Add a service-layer GitHub client boundary under `src/lib/github/*`.
- Add env/config support for public-read GitHub usage.
- Add mapper and error-handling tests.
- Add setup/security documentation and optional debug validation route.

### Phase 2 — SEO foundation

- Expand metadata coverage across landing/article/list/error surfaces.
- Add consistent canonical/metadata derivation rules.
- Add explicit SEO verification checklist and tests for critical pages.

### Phase 3 — Performance + accessibility

- Address interaction/performance hotspots (navigation, heavy section surfaces).
- Run accessibility sweeps for keyboard/focus semantics and landmarks.
- Add measurable budgets and baseline metrics for core routes.

### Phase 4 — UX + navigation

- Tighten navigation interaction quality and responsive behavior.
- Improve empty/error/loading UX patterns for primary user-facing routes.
- Standardize route and cross-page UX consistency.

### Phase 5 — Design system foundations

- Formalize breakpoint/motion/state token governance.
- Tighten primitive API contracts and documentation.
- Expand Storybook contract and interaction coverage for core primitives.

### Phase 6 — Component + section refinement

- Refine section-level visual/behavior consistency without architectural churn.
- Improve underspecified public surfaces (cards, section density/rhythm, long-content handling).
- Keep normalizer and section ownership boundaries stable.

### Phase 7 — Testing + governance + docs

- Expand governance docs and contribution/testing standards.
- Add missing integration and regression coverage.
- Consolidate planning/design-system docs around canonical sources.

## Do-Not-Disturb List

- Preserve `src/content` as the content-system boundary.
- Preserve `src/components/ui` vs `src/components/sections` separation.
- Preserve route-level organization under `src/pages/articles`.
- Preserve `PageShell` as shared layout shell owner.
- Preserve Storybook hybrid layout (colocated stories + `src/stories`).
- Preserve section normalizer pattern as the required pre-render contract.
- Preserve `ContentSource` abstraction as the only page/layout content entry point.
- Preserve typed `SectionRenderer` dispatch model.
- Preserve article prefix configurability through `VITE_ARTICLE_ROUTE_PREFIX`.

## First Task Queue (Phase 1 Only: GitHub API Foundation)

1. Add GitHub env entries in `.env.example` and parse them in `src/env.ts` with explicit public-read constraints.
2. Create `src/lib/github/types.ts` for API payload and view-model contracts.
3. Create `src/lib/github/client.ts` for HTTP boundary, request handling, and basic error normalization.
4. Create `src/lib/github/mappers.ts` to convert external payloads into render-safe local models.
5. Create `src/lib/github/githubService.ts` as the only public service entry point for UI consumers.
6. Ensure no direct UI fetches to GitHub endpoints; all UI calls must go through `githubService`.
7. Keep GitHub integration out of `ContentSource` in Phase 1; do not introduce GitHub as first-class content source yet.
8. Add optional debug validation route/page for service-level sanity checks.
9. Add tests for mapper behavior, partial/invalid payloads, and error propagation.
10. Document setup and security notes, including explicit `VITE_*` client exposure warning.
11. Document public-read-first mode and define constraints for unauthenticated/limited-access behavior.
12. Record serverless proxy recommendation for any future sensitive/private GitHub access use cases.

## Phase 0 Analysis Questions (Answered)

1. **What is the current route map?**  
   `/`, `/articles`, `/articles/:slug`, `/debug`, plus fallback not-found route.

2. **What lives in shell/layout vs page vs section vs primitive?**  
   Shell/layout owns global chrome and head metadata insertion (`PageShell`, `Header`, `Footer`, `SeoHead`); pages own data fetching and route-level states; sections own normalized section rendering; primitives own reusable UI contracts and layout primitives.

3. **What is the content-source boundary?**  
   `src/content/source.ts` (`ContentSource` + `getContentSource`) is the runtime boundary between page/layout consumers and backing data implementations (`contentfulSource` or `staticSource`).

4. **How does Contentful data become render-safe UI data?**  
   Contentful SDK client (`client.ts`) fetches raw entries (`api.ts`), adapters map and normalize field shape (`adapters.ts`), source exposes contract-compliant methods (`contentfulSource.ts`), then section normalizers produce render-safe per-section view models before components render.

5. **Which sections are already normalized and tested?**  
   Hero, timeline, skills, projects, learning, contact, and footer all have dedicated normalizers with associated test coverage.

6. **What Storybook coverage already exists?**  
   Foundations, UI primitives, section components, learning roadmap timeline, footer section, and article card stories are already implemented and wired through Storybook config.

7. **What token foundations already exist?**  
   Typography, color palette/semantic colors, spacing, radius, shadows, motion/control tokens, and component-level interaction token variables are defined in `src/styles/tokens.css`, with global base usage in `src/styles/base.css`.

8. **Which public UX surfaces still look under-specified?**  
   Navigation keyboard/focus QA is not fully documented as complete, public loading/error states are minimal and inconsistent by page, and some page-level SEO/UX polish (not architecture) remains thin.

9. **Which SEO surfaces already exist?**  
   `SeoHead` currently sets title, description, and canonical link; landing/article pages pass SEO data; articles receive mapped SEO fallback values from adapters.

10. **Where should GitHub API integration live without disturbing architecture?**  
    Under a new `src/lib/github/*` service layer (`types`, `client`, `mappers`, `githubService`) consumed by pages/components as needed; not embedded directly in UI components and not introduced as a `ContentSource` backend in Phase 1.

## Phase 0 Acceptance Check

- Baseline doc exists and captures architecture truth: yes.
- Roadmap doc and phased sequencing are defined separately in `IMPLEMENTATION-ROADMAP.md`: yes.
- `TASKS.md` is synced to the phase roadmap: yes.
- Mature completed work is explicitly protected: yes.
- GitHub API foundation is mapped to Phase 1: yes.
- Production behavior changed: no.

