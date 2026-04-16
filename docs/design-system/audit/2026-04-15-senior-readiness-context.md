# Senior Readiness Context (Frontend + Contentful)

Date: 2026-04-15  
Owner: gilbertoaharo

## Why this file exists

This file captures architecture findings, implementation decisions, and rollout guidance in one place to reduce context drift while the design system and CMS boundary mature.

## Current architecture snapshot

### Strengths

- Clear CMS boundary with `ContentSource` and source switching (`contentful`/`static`).
- Contentful adapter layer exists (`api -> adapters -> source`).
- Design tokens + section shell primitives are in place.
- Navigation and timeline implementations are already CMS-driven.
- Lint and build are currently passing.

### Risks / gaps

- Fetch layer relies on high include depth and cast-based typing (`as unknown as ...`).
- Raw CMS types and UI-ready view models share one `types.ts`.
- Styling reuse is incomplete (many section-level inline styles).
- Preview mode is partially wired (helpers exist, not fully integrated).
- Some env usage still bypasses centralized env helper.
- Storybook/CI/test coverage is not yet in place.

## Decision log (this phase)

1. Prioritize component API maturity before Storybook:
   - Build Button variants/sizes/states with shared tokens.
   - Remove section-specific button style overrides.
2. Preserve current visual direction:
   - Introduce API + tokenized interactions without changing page IA or section content contracts.
3. Keep migration incremental:
   - Refactor consumers (`ActionGroup`, timeline actions) to new Button API.

## Move 1 scope (implemented)

### Objective

Create a reusable, explicit component API surface for interactive CTAs and stop styling variants ad hoc inside section components.

### Files changed

- `src/styles/tokens.css`
- `src/components/ui/Button.css` (new)
- `src/components/ui/Button.tsx`
- `src/components/ui/Link.tsx`
- `src/components/sections/primitives/ActionGroup.tsx`
- `src/components/sections/TimelineSection.tsx`
- `src/components/sections/TimelineSection.css`

## Button API specification

### Public props

```ts
type ButtonVariant = "primary" | "secondary" | "text";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant; // default: "primary"
  size?: ButtonSize; // default: "md"
  fullWidth?: boolean; // default: false
  disabled?: boolean;
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });
```

### Behavior contract

- Renders `<button>` when `href` is not provided.
- Renders `Link` (anchor semantics) when `href` is provided.
- Link-mode `disabled`:
  - applies `aria-disabled`,
  - removes keyboard tab stop (`tabIndex={-1}`),
  - prevents click navigation.
- Shared class naming:
  - `.ui-button`
  - `.ui-button--{variant}`
  - `.ui-button--{size}`
  - `.ui-button--full`
  - `.is-disabled`

## Shared interaction token specification

### New motion + control tokens

- `--motion-duration-fast`
- `--motion-duration-base`
- `--motion-ease-standard`
- `--control-font-size-{sm,md,lg}`
- `--control-height-{sm,md,lg}`
- `--control-px-{sm,md,lg}`
- `--control-disabled-opacity`

### New button tokens

- State colors:
  - `--button-primary-bg`, `--button-primary-bg-hover`, `--button-primary-bg-active`
  - `--button-secondary-bg`, `--button-secondary-bg-hover`, `--button-secondary-bg-active`
  - `--button-text-bg`, `--button-text-bg-hover`, `--button-text-bg-active`
- Structural/interaction:
  - `--button-font-weight`
  - `--button-focus-ring-shadow`
  - `--button-active-translate-y`

### Accessibility/interaction guarantees

- Focus-visible ring is explicit at component level.
- Disabled state has deterministic visual + interaction behavior.
- Reduced motion support via `prefers-reduced-motion: reduce`.

## Migration guide

### 1) Replacing section-level overrides

Previous pattern:

```tsx
<Button style={actionStyle(action.variant)}>{action.label}</Button>
```

Current pattern:

```tsx
<Button variant={action.variant ?? "primary"}>{action.label}</Button>
```

### 2) Timeline CTA migration

Previous pattern:

- Rendered `Link` with timeline-specific variant classes.

Current pattern:

- Render `Button` with `variant` + `size="sm"`.
- Timeline CSS no longer owns CTA variant visuals.

### 3) Suggested usage patterns

```tsx
<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="text">Text CTA</Button>
<Button size="sm">Compact</Button>
<Button size="lg">Large</Button>
<Button href="/articles/my-post">Read Article</Button>
<Button href="/contact" disabled>Temporarily unavailable</Button>
```

## Anti-drift protocol (for this workstream)

When changing interaction APIs:

1. Update `Button.tsx` and `Button.css`.
2. Add/adjust tokens in `tokens.css` first, not component-local magic numbers.
3. Remove local style overrides from section consumers.
4. Update this file’s “Move scope” and “Migration guide”.
5. Record outcomes in `CHANGELOG.md` verification section.

## Next steps after Move 1

1. Extend this API pattern to `Link`, `Card`, and interactive nav elements.
2. Add Storybook stories for Button variants/sizes/states (including disabled link-mode behavior).
3. Add interaction regression checks in CI (visual and/or DOM assertions).

## Move 2-6 scope (implemented)

### Phase 1 — inline style migration

- Removed inline visual styles from:
  - `HeroSection`, `SkillsSection`, `ProjectsSection`, `LearningSection`, `ContactSection`
  - section primitives: `ActionGroup`, `SectionHeader`, `ProofList`, `MediaFrame`
- Added colocated CSS files for all updated sections/primitives.
- Added reusable layout primitives:
  - `Inline`, `Cluster`, `Grid` in `src/components/ui`

### Phase 2 — primitive API standardization

- Formalized explicit contracts and colocated CSS for:
  - `Link` (`variant`, `size`, `disabled`)
  - `Card` (`variant`, `density`, `interactive`)
  - `Badge` (`tone`, `size`)
  - `Text` (`tone`, `size`, `weight`, `tracking`)
  - `Heading` (`level`, `size`, `weight`, `tone`, `tracking`)
- Added shared interaction tokens for link/card focus and stronger elevation.

### Phase 3 — section normalization layer

- Added normalized view-model mappers for all sections:
  - `timeline/normalizeTimelineSection.ts`
  - `skills/normalizeSkillsSection.ts`
  - `projects/normalizeProjectsSection.ts`
  - `learning/normalizeLearningSection.ts`
  - `contact/normalizeContactSection.ts`
- Refactored section components to render from normalized models only.

### Phase 4 — typed renderer hardening

- Replaced cast-based switching in `SectionRenderer.tsx` with a typed renderer map keyed by content type IDs.
- Enforced compile-time coverage of supported section IDs with `satisfies`.

### Phase 5 — accessibility contract pass

- Link/Button disabled semantics are explicit and consistent (`aria-disabled`, tab exclusion, click guard).
- Navigation keyboard/interaction behavior improved:
  - explicit button `type` handling,
  - desktop panel mount behavior,
  - mobile drawer focus return behavior,
  - reduced-motion support in nav transitions.

### Phase 6 — Storybook + tests + CI gates

- Implemented Storybook scaffold and hybrid story layout:
  - `.storybook/*`, collocated stories in `src/components/**`, docs stories in `src/stories/*`
- Added interaction/unit coverage:
  - primitive tests (`Button`, `Link`)
  - normalizer tests (timeline/skills/projects/learning/contact)
  - renderer coverage test (`SectionRenderer`)
- Added CI workflow gate:
  - `.github/workflows/ci.yml` running `lint`, `build`, `test`, `build-storybook`
