# Components

**Purpose:** Current components, API contracts, and style colocation.

## Primitives (`src/components/ui`)
- **Button** (`Button.tsx`, `Button.css`): explicit `variant` (`primary|secondary|text`), `size` (`sm|md|lg`), `fullWidth`, disabled behavior for button/link modes, reduced-motion handling.
- **Link** (`Link.tsx`, `Link.css`): explicit `variant` (`default|muted|unstyled`), `size` (`sm|md`), `disabled` contract (`aria-disabled`, tab exclusion, click guard), safe external rel handling.
- **Card** (`Card.tsx`, `Card.css`): explicit `variant` (`default|subtle|elevated`), `density` (`sm|md|lg`), optional `interactive` state styles.
- **Badge** (`Badge.tsx`, `Badge.css`): explicit `tone` (`default|muted|success|warning`) and `size` (`sm|md`).
- **Text** (`Text.tsx`, `Text.css`): explicit `tone`, `size`, `weight`, `tracking`; supports semantic `as`.
- **Heading** (`Heading.tsx`, `Heading.css`): semantic `level` + explicit `size`, `weight`, `tone`, `tracking` contracts.
- **Stack** (`Stack.tsx`): vertical flow with tokenized gap.
- **Container** (`Container.tsx`): content max-width + horizontal padding.
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
- Primitive interaction tests: `src/components/ui/*.test.tsx`
- Normalizer tests: `src/components/sections/**/normalize*.test.ts`
- Renderer coverage test: `src/components/sections/SectionRenderer.test.tsx`
