# Phase D — Spacing and Layout Spec Pass (Roadmap v2)

Status: Completed (April 24, 2026).

## Closeout Note

Phase D is closed and preserved as a completed reference phase.
Closeout correction: active execution queue moved forward to Phase E in planning/task tracking.

Do not reopen unless a true regression is discovered in one or more of the following:
- spacing rhythm
- layout consistency
- responsive spacing behavior
- related Storybook layout-spec surfaces used to validate these behaviors

## 1. Goal

Define and apply practical spacing/layout rhythm rules so section composition is more consistent, responsive behavior is easier to reason about, and CSS decisions are less ad hoc.

## 2. Spacing Rules

- Section shell rhythm:
  - section vertical padding remains token-driven via `--section-pad-y`
  - mobile section vertical padding uses `--section-pad-y-mobile`
  - section internal stack rhythm defaults to `--section-stack-gap`
- Section content rhythm:
  - section header grouping uses `--section-header-gap`
  - section body/content grouping uses `--section-content-gap`
- Text flow rhythm:
  - primary text flow uses `--text-flow-gap`
  - tighter metadata/text flow uses `--text-flow-gap-tight`

## 3. Layout Rules

- Container and section ownership remains unchanged (`SectionShell` + `Container` + layout primitives).
- Grid and row spacing now prefer shared aliases:
  - `--grid-gap-default`
  - `--grid-gap-wide`
- Action row rhythm now prefers:
  - `--cta-row-gap`
  - `--cta-row-gap-loose`

## 4. Section Rhythm Guidance

- Use a header stack (`eyebrow -> title -> intro`) with `--section-header-gap`.
- Separate header and body regions using `--section-content-gap`.
- For section surfaces with cards/media, keep content groups in explicit stacks rather than relying on legacy heading margins.
- Avoid one-off margin chaining when layout primitives already encode rhythm.

## 5. Card Rhythm Guidance

- Card padding now maps to semantic aliases:
  - `--card-pad-sm`
  - `--card-pad-md`
  - `--card-pad-lg`
- Internal card flow uses:
  - `--card-flow-gap`
  - `--card-flow-gap-tight`
- Metadata and CTA spacing should be explicit, not implied by inherited heading/text margins.

## 6. CTA Spacing Guidance

- Section action groups default to tighter spacing (`gap="2"`), then apply:
  - row spacing via `--cta-row-gap`
  - column spacing via `--cta-row-gap-loose`
- Wrapped CTA rows should preserve even spacing across breakpoints.
- Secondary/tertiary actions should not introduce custom one-off paddings unless section-specific and intentional.

## 7. Responsive Notes

Breakpoints used in this pass:
- `<=480`: reduce section/card/action density where needed
- `<768`: tighten stacked layouts, avoid oversized spacing on compact screens
- `>=768`: restore comfortable section/grid rhythm
- `>=1024`: expand card/grid/media spacing for desktop scan quality

Notable responsive refinements:
- base section shell now uses mobile-specific vertical padding token
- projects slider/header spacing adjusted for small screens and larger desktop gaps
- timeline media/content gaps normalized from mobile through desktop
- learning/contact empty-state and action-surface padding tightened on small screens

## 8. What Was Refined in Code

- Foundation tokens and base rhythm:
  - `src/styles/tokens.css`
  - `src/styles/base.css`
- Layout/card rhythm:
  - `src/components/ui/Card.css`
  - `src/components/sections/primitives/SectionHeader.tsx`
  - `src/components/sections/primitives/ActionGroup.tsx`
  - `src/components/sections/primitives/ActionGroup.css`
- Section spacing/layout pass:
  - `src/components/sections/HeroSection.tsx`
  - `src/components/sections/HeroSection.css`
  - `src/components/sections/TimelineSection.tsx`
  - `src/components/sections/TimelineSection.css`
  - `src/components/sections/SkillsSection.tsx`
  - `src/components/sections/SkillsSection.css`
  - `src/components/sections/ProjectsSection.tsx`
  - `src/components/sections/ProjectsSection.css`
  - `src/components/sections/LearningSection.tsx`
  - `src/components/sections/LearningSection.css`
  - `src/components/sections/ContactSection.tsx`
  - `src/components/sections/ContactSection.css`
  - `src/components/sections/FooterSection.css`
  - `src/components/articles/ArticleCard.css`
- Storybook spacing/layout spec support:
  - `src/stories/Layout.stories.tsx`

## 9. What Was Intentionally Deferred

- Broad token-system restructuring beyond additive aliases.
- Route-level layout redesigns.
- Architecture or ownership boundary changes.
- Wide visual-regression tooling expansion (kept out of Phase D scope).

## Verification Snapshot (April 24, 2026)

- `npm run lint`: pass
- `npm run test`: pass
- `npm run build`: pass (default-shell Node warning remains)
- `npm run build-storybook`:
  - default shell Node `22.2.0`: fails due runtime floor
  - runtime override `PATH="/Users/gilbertharo/.n/bin:$PATH"` (Node `22.12.0`): pass
