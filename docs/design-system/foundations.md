# Foundations

**Purpose:** Single source for tokens, global styles, layout primitives, and responsive rules currently in the codebase.

## Source of truth
- Tokens: `src/styles/tokens.css`
- Global base: `src/styles/base.css`
- Layout primitives: `src/components/ui/Container.tsx`, `src/components/ui/Stack.tsx`
- Section wrapper: `src/components/sections/SectionShell.tsx`

## Tokens (current)
- Color: `--color-bg`, `--color-surface`, `--color-surface-2`, `--color-accent`, `--color-accent-soft`, `--color-text`, `--color-muted`, `--color-border`, `--color-border-subtle`, `--color-focus-ring`
- Typography: `--font-sans`, `--font-mono`, `--font-size-{xs,sm,base,lg,xl,2xl,3xl}`
- Spacing: `--space-{1,2,3,4,6,8,10,12,16}`
- Layout: `--content-max`, `--section-pad-{x,y}`, `--stack-gap`, `--heading-gap`, `--heading-mb`, `--lede-max`
- Radius/shadow: `--radius-{sm,md,lg,pill}`, `--shadow-soft`

## Global base (base.css)
- Imports tokens.
- Universal `box-sizing`.
- Full-height root (`html, body, #root`).
- Body typography/background uses tokens.
- Heading rhythm (h1–h4 line-height + letter-spacing).
- Section padding + subtle divider on stacked sections.
- Focus ring for interactive elements using `--color-focus-ring`.

## Layout primitives
- **Container**: max-width `--content-max`, horizontal padding `--section-pad-x`; `as` prop for semantic tag; used by Header, PageShell, and SectionShell.
- **Stack**: vertical spacing via `gap` (token values); primary layout for sections and cards.
- **SectionShell**: applies `.section`, optional `anchorId`, wraps children in Container + Stack (`--stack-gap`).
- **PageShell**: page wrapper with `SeoHead`, `Header`, and `main#main-content` Container.

## Styles footprint (what’s global vs local)
- Global: `tokens.css`, `base.css`.
- Colocated component CSS:
  - Nav: `src/components/navigation/Navigation.css`
  - Timeline: `src/components/sections/TimelineSection.css`
  - Article page: `src/pages/ArticlePage.css`
- Everything else styled inline with tokens via UI primitives.

## Responsive rules (current)
- Section/container padding clamps via tokens globally.
- Navigation switches desktop ↔ drawer using CMS-provided `menu.mobileBreakpointPx`; drawer refined at `max-width: 960px` in `Navigation.css`.
- Timeline breakpoints at 640/768/1024 in `TimelineSection.css` (stack → two-column with flip → wider gaps/media).
- Article page responsiveness handled in `ArticlePage.css` (hero image + body spacing).

## Known gaps
- No shared breakpoint or motion tokens; easing/durations are per-component.
- Focus styling exists globally, but nav/drawer and buttons lack dedicated focus-visible variants.
- Lint backlog: `@typescript-eslint/no-explicit-any` errors in several UI/content files.
