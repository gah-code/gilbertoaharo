# Timeline Section (4.6) Reference

Purpose: Single source for timeline/experience section behavior, structure, and styling so another agent can implement or modify it consistently.

Sources of truth
- `docs/design-system.md`
- `src/components/sections/TimelineSection.tsx`
- `src/styles/layout.css`
- `src/styles/tokens.css`
- `src/components/sections/SectionRenderer.tsx`
- `src/data/page-personal-landing.ts`
- `src/services/fetchPersonalLandingPage.ts`
- `src/assets/timeline/` (local SVG illustrations)

## Data model
`TimelineSection` (from `src/data/page-personal-landing.ts`):
- Required: `id`, `sectionType: "timeline"`, `anchorId`, `title`, `items`
- `items`: array of `TimelineItem`

`TimelineItem`:
- Required: `id`, `kind: "role" | "education" | "milestone"`, `title`, `startDate`
- Optional: `organization`, `location`, `endDate`, `summary`, `highlights` (string[]), `tags` (string[])
- Rendering uses `startDate` + `endDate ?? "present"` verbatim (no date formatting). `tags` are currently unused in the UI.

## Component logic (TimelineSection.tsx)
- Renders inside `<section class="section section-timeline">` via `SectionRenderer.tsx`.
- Structure:
  - Wrapper: `<div class="timeline">`
  - Heading: `<h2>{section.title}</h2>`
  - Ordered list: `<ol class="timeline-list">`
    - Each `<li class="timeline-item">` contains:
      - `.timeline-card` with:
        - Header row: `<h3>{item.title}</h3>` and optional `<span class="timeline-org">{item.organization}</span>`
        - Meta row: `<span>{startDate} – {endDate ?? "present"}</span>` plus optional location `<span class="timeline-location">`
        - Optional summary `<p class="timeline-summary">`
        - Optional highlights list `<ul class="timeline-highlights">` with `<li>` entries
      - Optional `.timeline-media` with `<img src={media.src} alt={media.alt} loading="lazy" />`
- Media assignment: static array of three local SVGs (`timeline-search.svg`, `timeline-journey.svg`, `timeline-creative.svg`). Items pick `timelineMedia[index % 3]`, so illustrations repeat in order and are not content-driven.

## Layout and styling (layout.css)
- Heading: `.timeline h2 { margin: 0 0 var(--heading-mb); }`
- List: `.timeline-list` is a grid; default gap `var(--space-10)`.
- Items: `.timeline-item` grid with single column by default; gap `var(--space-4)`.
- Card: `.timeline-card` uses shared surface (`background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `box-shadow: var(--shadow-soft)`, `border-radius: var(--radius-lg)`, `padding: var(--space-4)`).
- Media: `.timeline-media img` framed like cards, width 100% up to 24rem, padded `var(--space-4)`, rounded corners.
- Typography and color:
  - `.timeline-item-header h3` uses `--font-size-lg`, margin 0.
  - `.timeline-org` uses `--font-size-sm`, muted color.
  - `.timeline-meta` uses `--font-size-xs`, flex wrap with `gap: var(--space-2)`.
  - `.timeline-summary` and `.timeline-highlights` use `--font-size-sm`; highlights are muted and indented with `list-style: disc`.
  - `.timeline-org`, `.timeline-meta`, `.timeline-highlights` share muted text color (`--color-text-muted`).

## Responsive behavior
- ≤480px: `.section-timeline` tightens padding (`padding-inline: var(--space-4)`, `padding-block: var(--space-8)`); list gap shrinks; cards reduce padding; meta stacks column; media padding reduces and max-width ~88%.
- <768px: `.timeline-item` single column; `.timeline-media` ordered first (`order: -1`); media can stretch full width.
- ≥768px: two-column grid (`minmax(0, 1.1fr)` text, `minmax(0, 0.9fr)` media) with `gap: var(--space-6)`; `.timeline-media` centered; even items swap order to alternate media/text (`nth-child(even)`).
- ≥1024px: larger gaps (`var(--space-12)` list, `var(--space-8)` item) and media can grow to max-width 28rem.

## Contentful mapping rules (fetchPersonalLandingPage.ts)
- `mapTimelineSection` pulls `title`, `anchorId`, and `items` from the entry.
- `anchorId` defaults to the entry `sys.id` when missing.
- Items: fields `kind`, `title`, `organization`, `location`, `startDate`, `endDate`, `summary`, `highlights`, `tags` are copied as-is; `highlights`/`tags` default to `[]` via `safeArray`.
- No CMS-provided media; UI continues using static SVG rotation until the model is expanded.

## Adaptable conditions
- Missing `organization` or `location`: those spans are simply omitted; layout flex-wrap keeps spacing tidy.
- Missing `summary`: card shows only header/meta/highlights.
- Missing or empty `highlights`: list is not rendered.
- Missing `endDate`: UI shows `"present"` automatically.
- Adding more items than three: SVGs repeat due to modulo assignment; add more assets or a media field if unique art is required.
- If CMS adds media fields later, update `TimelineItem` type, mapper, and component to use those assets instead of the static `timelineMedia` array.

## Implementation steps
1) Define `TimelineSection` data (`title`, `anchorId`, `items`) in `page-personal-landing.ts` or fetch from CMS using the existing mapper.
2) Keep `sectionType: "timeline"` so `SectionRenderer` wraps it with `.section.section-timeline`.
3) Render with `TimelineSectionView` to preserve classnames and responsive layout.
4) Adjust spacing or typography in `src/styles/layout.css`; rely on tokens in `src/styles/tokens.css`.
5) When introducing CMS-controlled media, extend the data model and mapper, then replace the static `timelineMedia` selection logic.

## Notes and gotchas
- `tags` exist in the data model but are not displayed; avoid relying on them in UX until the component renders them.
- Date strings are shown verbatim; supply human-friendly formats (e.g., `"2022–01"` or `"2022"`). There is no formatting or validation in the component.
- Images use `loading="lazy"`; keep alt text meaningful if you replace the static assets.
- Even-item alternating order relies on DOM position; if you filter or sort dynamically, verify the pattern still holds.

## Adaptable checklist for new builds
- [x] Align data model: confirm `TimelineSection`/`TimelineItem` fields and add media/CTA fields if the CMS will control illustrations. (Added optional media image + alt and CTA fields to `TimelineItem`; component renders media/CTA when provided.)
- [x] Map content source: implement/adjust a mapper (or static seed) to produce the expected shape; default `anchorId` and arrays to safe values. (Added static fixtures with timeline items + media/CTA, and static content source uses them.)
- [x] Wire renderer: ensure the section is routed through a renderer (e.g., `SectionRenderer`) with `sectionType: "timeline"` and `anchorId` set for navigation. (`SectionRenderer` already renders `sectionTimeline`; static fixtures set `anchorId: "timeline"`.)
- [x] Hook up media strategy: decide on static art rotation vs. per-item media; add assets or CMS fields and update component logic accordingly. (TimelineSection now prefers per-item media; otherwise rotates timeline SVGs by index with default alt text.)
- [ ] Style tokens: verify spacing, colors, and typography tokens exist; port timeline rules into the target stylesheet and match classnames. (Moved to TODO-UI under Timeline section.)
- [ ] Responsive passes: test ≤480px, <768px, ≥768px, ≥1024px to validate column swaps, gaps, and media sizing. (Moved to TODO-UI under Timeline section.)
- [ ] Content QA: check date string format, optional fields (org/location/summary/highlights) rendering, and empty states for highlights. (Moved to TODO-UI under Timeline section.)
- [ ] Accessibility: confirm heading hierarchy, list semantics (`<ol>`/`<li>`), alt text for media, and focus order if links are added later. (Moved to TODO-UI under Timeline section.)
