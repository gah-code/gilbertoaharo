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
`TimelineSection` (from `src/content/contentful/types.ts` / fixtures):
- Required: `id`, `sectionType: "timeline"`, `anchorId`, `title`, `items`
- Optional: `eyebrow`, `intro`
- `items`: array of `TimelineItem`

`TimelineItem`:
- Required: `id`, `kind: "role" | "education" | "milestone"`, `title`
- Legacy dates: `startDate`, `endDate`
- Additive dates: `startDateValue`, `endDateValue`, `isCurrent`
- Optional: `organization`, `location`, `context`, `summary`, `highlights` (string[]), `tags` (string[])
- Media: `media` (asset or `{src, alt}`) or legacy `mediaImage`; `mediaAlt` overrides asset title
- Action: `action` (linkAction or inline object) with `label`, `href`, `variant` (`primary` | `secondary` | `text`), `openInNewTab`, `ariaLabel`
- Rendering formats date ranges with ISO parsing when possible; `isCurrent` forces `Present`. `tags` render as chips.

## Component logic (TimelineSection.tsx)
- Renders inside `<section class="section section-timeline">` via `SectionRenderer.tsx`.
- Structure:
  - Wrapper: `<div class="timeline">`
  - Heading: `<h2>{section.title}</h2>`
  - Optional eyebrow `<p class="timeline-eyebrow">`
  - Optional intro `<p class="timeline-intro">`
  - Ordered list: `<ol class="timeline-list">`
    - Each `<li class="timeline-item">` contains:
      - `.timeline-card` with:
        - Header row: `<h3>{item.title}</h3>` and optional `<span class="timeline-org">{item.organization}</span>`
        - Context row: optional `<p class="timeline-context">`
        - Meta row: formatted date range + optional location `<span class="timeline-location">`
        - Optional summary `<p class="timeline-summary">`
        - Optional highlights list `<ul class="timeline-highlights">` with `<li>` entries
        - Optional tags `<div class="timeline-tags">` with `<span class="timeline-tag">`
        - Optional action `<Button variant="text|primary|secondary" size="sm">`
      - Optional `.timeline-media` with `<img src={media.src} alt={media.alt} loading="lazy" />`
- Media assignment: prefers CMS `media`/`mediaImage`; falls back to static SVG rotation (`timeline-search.svg`, `timeline-journey.svg`, `timeline-creative.svg`).

## Layout and styling (TimelineSection.css)
- Heading: `.timeline h2 { margin: 0 0 var(--heading-mb); }`
- Eyebrow: uppercase, letterspaced, muted `.timeline-eyebrow`
- Intro: muted lede width `.timeline-intro`
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
  - Tags: `.timeline-tags` flex wrap; `.timeline-tag` uses pill background.
  - Actions: use shared `Button` API variants (`text|primary|secondary`) so CTA states come from `src/components/ui/Button.css` + tokens.

## Responsive behavior
- ≤480px: `.section-timeline` tightens padding (`padding-inline: var(--space-4)`, `padding-block: var(--space-8)`); list gap shrinks; cards reduce padding; meta stacks column; media padding reduces and max-width ~88%.
- <768px: `.timeline-item` single column; `.timeline-media` ordered first (`order: -1`); media can stretch full width.
- ≥768px: two-column grid (`minmax(0, 1.1fr)` text, `minmax(0, 0.9fr)` media) with `gap: var(--space-6)`; `.timeline-media` centered; even items swap order to alternate media/text (`nth-child(even)`).
- ≥1024px: larger gaps (`var(--space-12)` list, `var(--space-8)` item) and media can grow to max-width 28rem.

## Contentful mapping rules
- `mapTimelineSection` (adapters) pulls `title`, `eyebrow`, `intro`, `anchorId`, and `items`.
- `anchorId` defaults to the entry `sys.id` when missing.
- Items map `context`, legacy dates (`startDate`, `endDate`), additive dates (`startDateValue`, `endDateValue`, `isCurrent`), `highlights`, `tags`, `media`, `mediaImage`, `mediaAlt`, and `action`; arrays fall back to `[]`.
- Media prefers `media`/`mediaImage`; still falls back to static SVG rotation when missing.

## Adaptable conditions
- Missing `organization` or `location`: those spans are simply omitted; layout flex-wrap keeps spacing tidy.
- Missing `summary`: card shows only header/meta/highlights.
- Missing or empty `highlights`: list is not rendered.
- Missing `endDate` + `isCurrent`: UI shows `"Present"` automatically.
- Adding more items than three: SVGs repeat via fallback rotation; provide CMS media for unique art.

## Implementation steps
1) Define `TimelineSection` data (`title`, `anchorId`, `items`) in `page-personal-landing.ts` or fetch from CMS using the existing mapper.
2) Keep `sectionType: "timeline"` so `SectionRenderer` wraps it with `.section.section-timeline`.
3) Render with `TimelineSectionView` to preserve classnames and responsive layout.
4) Adjust spacing or typography in `src/components/sections/TimelineSection.css`; rely on tokens in `src/styles/tokens.css`.
5) CMS media now supported; static `timelineMedia` remains as fallback rotation.

## Notes and gotchas
- Tags now render as pills; keep them concise.
- Date strings are formatted when ISO-like; non-ISO strings render verbatim to avoid breaking legacy data.
- Images use `loading="lazy"`; alt priority: `mediaAlt` > asset title > derived from item title.
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
