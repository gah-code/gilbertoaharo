# Phase 4 Image Delivery + Desktop CLS Evidence

Date: May 18, 2026

Live URL: `https://gilbertaharo.com/`

Mode: evidence capture only; no implementation changes

## 1. Executive Verdict

Evidence is sufficient to plan an image-delivery implementation pass, but not sufficient to assign a desktop CLS root cause.

- Image payload issue confirmed: fresh Lighthouse desktop reports `8,356 KiB` total transfer and `8,101 KiB` estimated image-delivery savings.
- CLS evidence is conflicting: the original desktop artifact reported `0.908`; the fresh Phase 4 desktop run reports `0.009`.
- Root cause is not confirmed. The fresh run reports the broad `main#main-content` node as the shifted element, which is not specific enough to justify layout reservation or CLS implementation changes.
- Phase 4 should continue with implementation planning for Contentful image sizing/format delivery and repeat CLS trace review before any layout changes.

## 2. Current Metrics

| Metric | Previous audit | Fresh audit | Notes |
| --- | ---: | ---: | --- |
| Performance | `0.73` | `0.82` | Fresh desktop performance improved but remains affected by payload weight and TBT. |
| CLS | `0.908` | `0.009` | Severe previous lab finding was not reproduced in the fresh run. |
| LCP | `0.7 s` | `1.5 s` | Still within good lab range in the fresh run. |
| TBT | `0 ms` | `240 ms` | Fresh run introduces a measurable blocking-time cost. |
| Speed Index | `1.5 s` | `1.5 s` | Stable across both desktop artifacts. |
| Total byte weight | `8,355 KiB` | `8,356 KiB` | Payload issue is stable and confirmed. |

Repeat CLS sanity check, May 18, 2026:

| Artifact | Performance | CLS | LCP | TBT | Speed Index | Total byte weight |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `.tmp/design-system-audit/lighthouse-phase-4-cls-repeat.report.json` | `0.57` | `0.908` | `1.5 s` | `200 ms` | `2.1 s` | `8,355 KiB` |

The repeat check reproduced the severe desktop CLS value, but the affected node remained the broad `main#main-content` region. That is enough to keep CLS in the Phase 4 risk register, but still not enough to implement a layout-reservation fix without isolating the specific source in trace/filmstrip review.

Artifacts used:

- Previous: `.tmp/design-system-audit/lighthouse-desktop.report.json`
- Previous: `.tmp/design-system-audit/lighthouse-desktop.report.html`
- Fresh: `.tmp/design-system-audit/lighthouse-phase-4-desktop.report.json`
- Fresh: `.tmp/design-system-audit/lighthouse-phase-4-desktop.report.html`

The fresh Lighthouse command initially failed inside the sandbox because the npm registry was unreachable. It passed after approved network access.

## 3. CLS Evidence

- CLS value: fresh desktop `0.009`; previous desktop `0.908`; repeat desktop `0.908`.
- Affected node(s): fresh and repeat runs report `body > div#root > div.page-shell > main#main-content`.
- Trace/filmstrip evidence: fresh Lighthouse JSON includes `screenshot-thumbnails` and `final-screenshot`; the broad shifted node does not isolate a root cause.
- Suspected cause: unconfirmed. Candidate areas remain async CMS content, header/main content positioning, media sizing, footer/header behavior, or font/render timing.
- Confidence: low for CLS root cause; high that the severe lab finding can reproduce.
- Root cause confirmed: no.

Do not assign CLS root cause from the `0.908` value alone. The affected node is too broad to justify a layout fix without another trace/filmstrip pass that identifies the specific shifting element or timing source.

## 4. Image Payload Inventory

| Asset / URL | Source | Rendered context | Transfer size | Wasted bytes | Likely owner | Later recommendation |
| --- | --- | --- | ---: | ---: | --- | --- |
| `hero-design.jpeg` | Contentful asset | Hero image, `MediaFrame` | `2,565,640 B` | `2,547,942 B` | Hero image | Add Contentful transform/responsive sizing and modern format path for hero media. |
| `ChatGPT_Image_Apr_23__2026__09_29_11_PM.png` | Contentful asset | Timeline media image | `1,466,049 B` | `1,447,225 B` | Timeline image | Add responsive size/format delivery for timeline media. |
| `ChatGPT_Image_Apr_23__2026__09_32_11_PM.png` | Contentful asset | Timeline media image | `1,463,329 B` | `1,444,280 B` | Timeline image | Add responsive size/format delivery for timeline media. |
| `ChatGPT_Image_Apr_23__2026__09_25_13_PM.png` | Contentful asset | Timeline media image | `1,462,017 B` | `1,443,066 B` | Timeline image | Add responsive size/format delivery for timeline media. |
| `ChatGPT_Image_Apr_23__2026__09_20_33_PM.png` | Contentful asset | Timeline media image | `1,431,804 B` | `1,413,116 B` | Timeline image | Add responsive size/format delivery for timeline media. |

Fresh Lighthouse image-delivery insight:

- Estimated savings: `8,101 KiB`.
- Resource summary: `5` image requests, `8,388,839 B` image transfer.
- Hero displayed dimensions in Lighthouse: about `337x252`; source file `2220x1776`.
- Timeline displayed dimensions in Lighthouse: about `316x316`; source files `1254x905`.
- `unsized-images` passes, which means the immediate issue is delivery size/format, not missing width/height attributes according to Lighthouse.

## 5. Code Path Inventory

| Area | File | Current behavior | Risk | Later candidate |
| --- | --- | --- | --- | --- |
| Contentful adapter | `src/content/contentful/adapters.ts` | Preserves raw asset fields and normalizes protocol-relative URLs only. | No centralized image transform path. | Introduce a helper that derives Contentful image URLs without changing CMS contracts. |
| Hero rendering | `src/components/sections/HeroSection.tsx`, `src/components/sections/primitives/MediaFrame.tsx` | Renders raw `src` through `MediaFrame`; hero uses `loading="eager"` and `decoding="async"`. | Large hero asset is fetched at full source size. | Add `srcSet`/`sizes` or transformed URL support through the media primitive. |
| Hero reservation | `src/components/sections/primitives/MediaFrame.css` | Uses CSS `aspect-ratio` for image frames. | Current reservation appears sufficient in fresh Lighthouse; do not change for CLS yet. | Keep reservation behavior while improving delivery. |
| Timeline rendering | `src/components/sections/TimelineSection.tsx` | Renders raw `item.mediaSrc` with `loading="lazy"` and `decoding="async"`. | Four large Contentful PNGs dominate transfer size. | Add timeline-specific responsive image sizes after helper design. |
| Timeline reservation | `src/components/sections/TimelineSection.css` | Uses media frame `aspect-ratio: 4 / 3`. | Reservation exists; fresh CLS does not prove a timeline layout-shift source. | Preserve while improving image delivery. |
| Projects rendering | `src/components/sections/ProjectsSection.tsx` | Renders raw project thumbnail `src` with lazy loading. | Future project assets could repeat the same payload issue. | Apply shared responsive image strategy after hero/timeline proof. |
| Article card rendering | `src/components/articles/ArticleCard.tsx` | Renders raw article hero URL with lazy loading. | Future article list images may be oversized. | Apply shared article-card image sizing if article images appear in payload traces. |
| Article detail | `src/pages/ArticlePage.tsx` | Renders raw article hero URL with lazy loading. | Article hero images may be oversized and should have route-appropriate sizing. | Add article detail sizes after homepage image path is proven. |
| Rich text embeds | `src/components/rich-text/RichTextRenderer.tsx` | Renders embedded assets with width/height when Contentful image details exist. | Better reservation than most paths, but no responsive transform. | Preserve dimensions; add transformed `srcSet`/`sizes` later. |

## 6. Implementation Decision Tree

### If CLS Source Is Confirmed

- Propose the smallest fix against the confirmed source only.
- Identify affected files after trace/filmstrip evidence points to a specific node or timing issue.
- Validate with repeat Lighthouse desktop runs and viewport review.
- Do not implement during this evidence-capture pass.

### If CLS Source Is Not Confirmed

- Capture another desktop Lighthouse run or inspect the HTML report filmstrip manually.
- Compare repeated runs before treating the earlier `0.908` as stable.
- Do not implement layout reservation changes.

### If Image Payload Issue Is Confirmed

- Plan a Contentful image transform/responsive image strategy that keeps existing normalized view models and CMS fields intact.
- Start with hero and timeline because they dominate the current transfer.
- Prefer derived URLs, `srcSet`, `sizes`, modern formats, and quality parameters without changing Contentful models.
- Do not implement during this evidence-capture pass.

### If Image Payload Issue Is Not Confirmed

- Preserve current implementation and monitor future Lighthouse payload evidence.

## 7. Recommended Phase 4 Implementation Plan

1. Repeat desktop Lighthouse once more or manually inspect the fresh HTML report filmstrip to decide whether the severe `0.908` CLS was transient.
2. Draft a small Contentful image URL helper that accepts the current raw asset URL and returns derived URLs for width, format, and quality.
3. Apply the helper first to `MediaFrame`/Hero and Timeline media with conservative `sizes` values matching current CSS frames.
4. Validate that the change reduces image transfer without changing layout, IA, routing, CMS models, or normalized content contracts.
5. Extend the same strategy to Projects, ArticleCard, ArticlePage, and rich text only after the first path is proven.

## 8. Out of Scope Confirmed

- No image delivery implementation.
- No CLS implementation.
- No layout changes.
- No routing changes.
- No CMS model changes.
- No Contentful migration.
- No typography/card/elevation polish.
- No production behavior changes.
