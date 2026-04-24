# Components

**Purpose:** Current components, API contracts, and style colocation.

## Primitives (`src/components/ui`)
- **Button** (`Button.tsx`, `Button.css`): explicit `variant` (`primary|secondary|text`), `size` (`sm|md|lg`), `fullWidth`, disabled behavior for button/link modes, reduced-motion handling.
- **Link** (`Link.tsx`, `Link.css`): explicit `variant` (`default|muted|unstyled`), `size` (`sm|md|lg`), `disabled` contract (`aria-disabled`, tab exclusion, click guard), safe external rel handling.
- **Card** (`Card.tsx`, `Card.css`): explicit `variant` (`default|subtle|elevated`), `density` (`sm|md|lg`), optional `interactive` state styles.
- **Badge** (`Badge.tsx`, `Badge.css`): explicit `tone` (`default|muted|success|warning`) and `size` (`sm|md`).
- **Text** (`Text.tsx`, `Text.css`): semantic `kind` presets (`body`, `bodyLarge`, `bodySmall`, `meta`, `eyebrow`, `caption`) with explicit override props (`tone`, `size`, `weight`, `tracking`) and semantic `as`.
- **Heading** (`Heading.tsx`, `Heading.css`): semantic `level` + explicit `size`, `weight`, `tone`, `tracking` contracts, including `size="display"` for high-emphasis hero/title contexts.
- **Stack** (`Stack.tsx`): vertical flow with token-aware gap contract.
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
- **TimelineSection** (`TimelineSection.tsx`, `TimelineSection.css`): normalized timeline model + tokenized card/media/action states.
- **SkillsSection** (`SkillsSection.tsx`, `SkillsSection.css`): normalized skills model + grid/inline primitives.
- **ProjectsSection** (`ProjectsSection.tsx`, `ProjectsSection.css`): normalized projects model + cluster-based tag/action groups.
- **LearningSection** (`LearningSection.tsx`, `LearningSection.css`): normalized learning model + status tone mapping.
- **ContactSection** (`ContactSection.tsx`, `ContactSection.css`): normalized contact model + cluster-based link rows.
- **Section primitives** (`components/sections/primitives/*` + colocated CSS): `SectionHeader`, `ActionGroup`, `ProofList`, `MediaFrame` now class-based (no inline visual styling).
- **SectionRenderer**: typed renderer mapping keyed by section content type IDs; cast-free dispatch.

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

## Deferred primitive cleanup (Phase 6)
- Evaluate whether `Container`/`Stack` should move all structural defaults into dedicated CSS classes.
- Review potential tokenized breakpoint helpers for layout primitives and section CSS once wider component refinement begins.
