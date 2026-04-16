# Foundations

**Purpose:** Tokens, global styles, and reusable layout primitives.

## Source of truth
- Tokens: `src/styles/tokens.css`
- Global base: `src/styles/base.css`
- Layout primitives: `src/components/ui/{Container,Stack,Inline,Cluster,Grid}.tsx`
- Section wrapper: `src/components/sections/SectionShell.tsx`

## Tokens (current)
- Color: `--color-*` palette + semantic text/surface/focus tokens.
- Typography: `--font-*` families and `--font-size-*` scale.
- Spacing: `--space-*` scale.
- Layout: `--content-max`, `--section-pad-*`, rhythm tokens.
- Radius/shadow: `--radius-*`, `--shadow-soft`, `--shadow-soft-strong`.
- Motion/control: `--motion-*`, `--control-*`.
- Component state tokens:
  - Button: `--button-*`
  - Link: `--link-*`
  - Card focus ring: `--card-focus-ring-shadow`

## Global base (`base.css`)
- Token import and universal `box-sizing`.
- Full-height root defaults.
- Body typography/background defaults.
- Section rhythm (`.section` spacing + dividers).
- Global focus-visible baseline across interactive elements.

## Layout primitives
- **Container**: max width + horizontal padding.
- **Stack**: vertical flow + tokenized gap.
- **Inline**: single-row flex alignment/justification/gap contract.
- **Cluster**: wrapped horizontal grouping for chips/actions.
- **Grid**: typed column/min-width/gap/alignment contract.
- **SectionShell**: section landmark + container + stack composition.

## Responsive/motion rules
- Section and container density comes from tokens.
- Navigation still honors CMS-configured mobile breakpoint.
- Timeline keeps section-local breakpoints (640/768/1024).
- Primitives/nav include `prefers-reduced-motion` handling for key transitions.

## Known gaps
- Shared breakpoint tokens are still pending (nav/timeline keep local breakpoints).
- Rich text code-block presentation is still minimal.
