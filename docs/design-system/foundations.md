# Foundations

Purpose: canonical token, typography, layout, and style-layer guidance for the design system.

## Source of truth
- Tokens: `src/styles/tokens.css`
- Global base rules: `src/styles/base.css`
- Layout primitives: `src/components/ui/{Container,Stack,Inline,Cluster,Grid}.tsx`
- Section wrapper baseline: `src/components/sections/SectionShell.tsx`
- Foundation stories: `src/stories/{Tokens,Typography,Layout}.stories.tsx`

## Token governance
Token groups are intentionally organized in this order:
1. Typography families and scales.
2. Typography role aliases (`display`, heading levels, body/meta/caption, line-height, tracking).
3. Semantic color + state color tokens.
4. Spacing and readable-measure tokens.
5. Layout and section rhythm tokens.
6. Radius/border/elevation tokens.
7. Motion tokens.
8. Breakpoint reference tokens (documentation + JS anchors).
9. Control sizing/state tokens.
10. Primitive interaction/component tokens (`button`, `link`, `card`).

Rules:
- Prefer adding semantic aliases over renaming heavily-used tokens.
- Keep raw values centralized in `tokens.css`; consume aliases in component CSS.
- Breakpoint tokens are documented references; media-query usage remains explicit in CSS until custom-properties-in-media-queries are safely universal.

## Typography foundation
Role guidance:
- `display`: hero-grade heading emphasis.
- `h1` to `h4`: structural page/section heading hierarchy.
- `bodyLarge`: intro/lead paragraphs.
- `body`: default readable copy.
- `bodySmall`: supporting copy blocks.
- `meta`: bylines, small labels, secondary supporting text.
- `eyebrow`: uppercase section labels.
- `caption`: asset/helper copy.

Primitive alignment:
- `Heading` supports semantic `level` and a visual `size` map, now including `size="display"`.
- `Text` supports a `kind` contract (`body`, `bodyLarge`, `bodySmall`, `meta`, `eyebrow`, `caption`) with safe defaults and explicit overrides.
- Long-form readable line length target remains ~62ch-68ch.

## Style ownership rules
- `tokens.css`: design token values and semantic aliases only.
- `base.css`: global defaults, reset behavior, cross-app focus/rhythm rules.
- Primitive CSS (`src/components/ui/*.css`): reusable control visuals and interaction states.
- Section/page CSS (`src/components/sections/*`, `src/pages/*`): route/feature-specific composition and visual details.

Guardrails:
- Do not move section/page-specific styling into `base.css`.
- Do not bypass token layer with repeated magic numbers when a tokenized value is feasible.
- Keep inline styles in primitives minimal and structural (for example `Container`/`Stack` composition hooks).

## Layout primitives contract
- `Container`: centered width boundary with configurable `maxWidth` and `paddingX`.
- `Stack`: vertical flow with token-aware gap contract.
- `Inline`: one-row grouping with alignment/justify/gap + optional wrap.
- `Cluster`: wrapped group for chips/actions/badges.
- `Grid`: typed responsive columns, min-width, gap, and alignment options.

## Responsive and motion baseline
- Section and container density are token-driven.
- Navigation keeps CMS-owned mobile breakpoint (`menu.mobileBreakpointPx`).
- Motion behavior uses shared duration/easing tokens with reduced-motion fallbacks in primitive/nav CSS.

## Deferred to Phase 6
- Broad component/section visual refinements.
- Deeper breakpoint normalization across all section CSS.
- Expanded rich-text code-block and long-form editorial visual treatment.
