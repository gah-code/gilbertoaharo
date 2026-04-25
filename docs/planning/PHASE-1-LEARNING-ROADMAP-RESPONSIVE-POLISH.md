# Phase 1 — Learning Roadmap Responsive Polish

## 1. Problem Summary

The Learning roadmap still showed text compression on medium-to-large viewports when card content included long topics, badge-heavy metadata, and focus-area chips.

## 2. Why Squeeze Happened

- The roadmap switched into horizontal equal-width cards too early.
- The Learning section width stayed close to standard editorial width even when the roadmap needed more horizontal room.
- Realistic heading + badge + description combinations consumed card width faster than the early horizontal breakpoint allowed.

## 3. Final Responsive Contract

- Small (`< 48rem`): stacked vertical roadmap with left rail.
- Medium (`48rem` to `79.99rem`): readable 2-column roadmap grid.
- Large (`80rem` to `95.99rem`): horizontal journey layout.
- XL (`>= 96rem`): horizontal journey layout with additional width and spacing breathability.

Core rule:
- do not force horizontal equal-width roadmap cards before large viewports.

## 4. Width / Container Strategy

- Keep Learning header copy constrained for readability (`.learning-header` remains narrow).
- Make Learning a deliberate section-level width exception on large/XL only:
  - `80rem+`: widen section container via section-local `--content-max: 72rem`.
  - `96rem+`: widen further via section-local `--content-max: 82rem`.
- Increase roadmap surface padding and horizontal journey gaps at larger breakpoints for better scan rhythm.

## 5. Storybook Validation States

`src/components/sections/LearningSection.stories.tsx`:

- Existing core states: `Default`, `MigrationCompatibility`, `EmptyState`, `LongCopyStress`
- Responsive QA states: `MediumGridContract`, `LargeJourneyLayout`, `XLWideJourney`
- Stress states: `BadgeHeavy`, `DenseRoadmap`
- Compatibility alias retained: `WideViewportIntent`

## 6. Deferred Follow-Up Ideas

- Consider adding a viewport addon preset package for one-click medium/large/XL QA in Storybook.
- Consider container-query-based journey transitions if section-level embedding contexts expand in future layouts.
