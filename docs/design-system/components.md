# Components

**Purpose:** Current components, API contracts, and style colocation.

## Primitives (`src/components/ui`)
- **Button** (`Button.tsx`, `Button.css`): explicit `variant` (`primary|secondary|text`), `size` (`sm|md|lg`), `fullWidth`, disabled behavior for button/link modes, reduced-motion handling, touch-friendly button behavior, centered labels, and subtle hover/focus/press interaction states. Link-mode buttons must keep variant text color across hover, active, and visited states.
- **Link** (`Link.tsx`, `Link.css`): explicit `variant` (`default|muted|unstyled`), `size` (`sm|md|lg`), `disabled` contract (`aria-disabled`, tab exclusion, click guard), safe external web-link defaults (`target="_blank"` with `noreferrer noopener`), same-context non-web links such as `mailto:`, and readable token-aligned underline/tint transitions.
- **Accessible action names** (`accessibleName.ts`): shared helper for CTA/button-like links whose optional `aria-label` must include the visible label text. Prefer no `aria-label` when the visible label is already descriptive.
- **Card** (`Card.tsx`, `Card.css`): explicit `variant` (`default|subtle|elevated`), `density` (`sm|md|lg`), optional `interactive` state styles, and restrained hover/focus lift for interactive surfaces only.
- **Badge** (`Badge.tsx`, `Badge.css`): explicit `tone` (`default|muted|success|warning`) and `size` (`sm|md`).
- **Text** (`Text.tsx`, `Text.css`): semantic `kind` presets (`body`, `bodyLarge`, `bodySmall`, `meta`, `eyebrow`, `caption`) with explicit override props (`tone`, `size`, `weight`, `tracking`) and semantic `as`.
- **Heading** (`Heading.tsx`, `Heading.css`): semantic `level` + explicit `size`, `weight`, `tone`, `tracking` contracts, including `size="display"` for high-emphasis hero/title contexts.
- **Stack** (`Stack.tsx`): vertical flow with token-aware gap contract; section/header/card rhythm should prefer Phase D spacing aliases over one-off values.
- **Container** (`Container.tsx`): content max-width + horizontal padding with optional `maxWidth`/`paddingX` overrides.
- **Inline / Cluster / Grid** (`Inline.tsx`, `Cluster.tsx`, `Grid.tsx` + colocated CSS): reusable horizontal/wrapping/grid layout primitives replacing repeated flex/grid snippets.

## Layout (`src/components/layout`)
- **PageShell**: page wrapper (`SeoHead`, `Header`, main landmark).
- **Header**: content-source navigation fetch + skip link + responsive nav.
- **SeoHead**: title/description/canonical meta.

## Navigation (`src/components/navigation`)
- **ResponsiveNav.tsx**: desktop panel + mobile drawer from CMS menu data.
- Accessibility updates: button `type` guards, menu panel conditional rendering, mobile drawer mount/unmount behavior, focus return to mobile toggle, escape-to-close behavior.
- **Navigation.css**: tokenized interaction states and reduced-motion support.

## Sections (`src/components/sections`)
- **SectionShell**: standard wrapper (`.section`, container, stack).
- **HeroSection** (`HeroSection.tsx`, `HeroSection.css`): normalized hero model + grid/layout primitives.
- **TimelineSection** (`TimelineSection.tsx`, `TimelineSection.css`): normalized timeline model + tokenized card/media/action states, with explicit header/content rhythm and responsive media/content spacing.
- **SkillsSection** (`SkillsSection.tsx`, `SkillsSection.css`): normalized skills model + grid/inline primitives, with tighter section/header/gap consistency.
- **ProjectsSection** (`ProjectsSection.tsx`, `ProjectsSection.css`): normalized projects model + cluster-based tag/action groups, with refined media fallbacks, metadata rhythm, interactive card polish, and responsive spacing normalization.
- **LearningSection** (`LearningSection.tsx`, `LearningSection.css`): normalized learning model + status tone mapping, with clearer roadmap framing and responsive surface spacing.
  - `LearningRoadmapTimeline` responsive contract:
    - small screens: stacked roadmap with left rail/marker line
    - medium screens: readable 2-column roadmap grid
    - large screens: horizontal journey layout
    - XL screens: horizontal journey layout with wider Learning-only container breathing room
- **ContactSection** (`ContactSection.tsx`, `ContactSection.css`): normalized contact model + cluster-based link rows, with clearer email-primary CTA hierarchy, token-aligned section spacing, and polished fallback treatment.
- **Section primitives** (`components/sections/primitives/*` + colocated CSS): `SectionHeader`, `ActionGroup`, `ProofList`, `MediaFrame` now class-based (no inline visual styling).
- **SectionRenderer**: typed renderer mapping keyed by section content type IDs; cast-free dispatch.

## Articles (`src/components/articles`)
- **ArticleCard** (`ArticleCard.tsx`, `ArticleCard.css`): canonical article-list surface with improved title/meta/excerpt hierarchy, clearer CTA rhythm, and intentional missing-image fallback.

## Section normalizers (view-model boundary)
- `hero/normalizeHeroSection.ts`
- `timeline/normalizeTimelineSection.ts`
- `skills/normalizeSkillsSection.ts`
- `projects/normalizeProjectsSection.ts`
- `learning/normalizeLearningSection.ts`
- `contact/normalizeContactSection.ts`

Section components now render from stable normalized view models only.

## Storybook and tests
- Storybook scaffolded (`.storybook/main.ts`, `.storybook/preview.ts`) with hybrid layout:
  - Collocated stories: `src/components/**/*.stories.tsx`
  - Cross-cutting stories: `src/stories/*`
- Foundation stories include:
  - `Foundations/Tokens`
  - `Foundations/Typography`
  - `Foundations/Layout`
  - `Foundations/Interaction States`
- Primitive story expectations:
  - show canonical usage patterns first, then controlled variant references
  - include accessibility-relevant states where appropriate (focus-visible, disabled, link-mode behavior)
  - avoid redundant no-op variants that add no contract coverage
- Section story expectations:
  - use realistic fixture-backed variability (default, sparse/empty, long-content)
  - avoid exhaustive permutations that reduce scan quality in Storybook
- Primitive interaction tests: `src/components/ui/*.test.tsx`
- Normalizer tests: `src/components/sections/**/normalize*.test.ts`
- Renderer coverage test: `src/components/sections/SectionRenderer.test.tsx`

## Placement and ownership conventions (Phase E)
- Naming quick rules:
  - component/section/page modules: `PascalCase.tsx`
  - colocated styles: matching `PascalCase.css`
  - stories: `*.stories.tsx` and story-only styles as `*.stories.css`
  - tests: `*.test.tsx` (render behavior) and `*.test.ts` (pure logic)
  - scoped fixtures: `*.fixture.ts`
- Story placement:
  - colocate component/section-specific stories with their owning component
  - keep only cross-cutting foundation/system stories in `src/stories/*`
- Test placement:
  - colocate tests with the module or route they validate
  - keep pure normalizer/utility tests as `*.test.ts` beside their source
- Fixture placement:
  - app/content baseline fixture source: `src/content/static/fixtures.ts` (canonical app fixture baseline)
  - section story fixture source: `src/components/sections/sectionStoryFixtures.ts` (cross-section Storybook fixtures)
  - component fixture files under local `__fixtures__/` (component-specific story/test fixtures)
- Normalizer vs render ownership:
  - normalizers own CMS-shape coercion and fallback mapping
  - render components own semantic markup and layout composition
  - route folders own route-level orchestration and route-local helpers

## Deferred primitive cleanup (Phase 6)
- Evaluate whether `Container`/`Stack` should move all structural defaults into dedicated CSS classes.
- Review potential tokenized breakpoint helpers for layout primitives and section CSS once wider component refinement begins.
