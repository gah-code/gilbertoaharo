# Phase 1 — Learning Roadmap Layout Contract

## 1. Problem Summary

`LearningRoadmapTimeline` text became squeezed on medium-to-large viewports because the roadmap switched into a horizontal equal-width layout too early.

## 2. Root-Cause Summary

The previous CSS moved from stacked layout to horizontal card layout at `min-width: 900px`.
With realistic item counts and copy length, this forced each card into narrow columns before enough viewport width existed.

## 3. Final Layout Rule

Use a hybrid responsive contract:

- small viewports: stacked vertical roadmap with left rail/marker treatment
- medium viewports: readable intermediate layout (grid-based, no forced equal-width horizontal cards)
- wide viewports only: horizontal roadmap presentation

Core rule:
- do not force equal-width horizontal roadmap cards until the viewport is genuinely wide enough for readable card content.

## 4. Breakpoint Behavior

- `< 768px`: stacked roadmap (`1` item per row) with vertical rail flow
- `768px` to `1359px`: intermediate `2`-column roadmap grid
- `>= 1360px`: horizontal roadmap mode with equal-width cards and horizontal rail lines

## 5. Storybook Validation States

Validated in `src/components/sections/LearningSection.stories.tsx`:

- `Default`
- `MigrationCompatibility`
- `EmptyState`
- `LongCopyStress`
- `DenseRoadmap`
- `BadgeHeavy`
- `WideViewportIntent` (explicit wide-screen QA intent)

These states cover sparse content, long-copy stress, denser roadmap counts, badge-heavy wrapping, and wide-screen behavior checks.

## 6. Deferred Ideas

- Optional future container-query pass so the roadmap can key off component width rather than viewport width.
- Optional focused visual regression checks for roadmap breakpoints if Storybook interaction/visual tooling expands.
