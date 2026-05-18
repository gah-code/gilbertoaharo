# Phase 4 Image Delivery Implementation Plan

Date: May 18, 2026

Mode: plan only; no implementation changes

## 1. Executive Recommendation

Implement Phase 4 image delivery in small batches, starting with a pure Contentful image URL helper and then adopting it on the two confirmed payload owners: Hero media through `MediaFrame`, then Timeline media.

Do not implement CLS fixes in the first image-delivery batches. The repeat desktop Lighthouse check reproduced severe CLS (`0.908`), but the affected node is still the broad `main#main-content` region. CLS mitigation should stay blocked until a trace/filmstrip review identifies the specific shift source.

Recommended order:

1. Batch 4.1: add and test a pure Contentful image URL helper.
2. Batch 4.2: add generic `srcSet`/`sizes` support to `MediaFrame` and adopt it for Hero media.
3. Batch 4.3: add responsive delivery for Timeline media images.
4. Batch 4.4: extend the proven pattern to Projects, ArticleCard, ArticlePage, and RichTextRenderer only after Hero/Timeline validation.

## 2. Evidence Basis

- Phase 4 evidence report: `docs/planning/phase-4-image-cls-evidence.md`.
- Confirmed payload issue: fresh and repeat desktop Lighthouse runs report about `8,355-8,356 KiB` total byte weight and `8,101 KiB` estimated image-delivery savings.
- Confirmed image owners: one Contentful Hero image and four Contentful Timeline images.
- CLS status: conflicting and unstable across runs, but severe CLS reproduced in the repeat check.
- Why CLS fixes remain blocked: both severe runs identify only `body > div#root > div.page-shell > main#main-content`, which is too broad to assign root cause or justify layout-reservation changes.

Repeat CLS sanity check:

| Artifact | Performance | CLS | LCP | TBT | Speed Index | Total byte weight |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `.tmp/design-system-audit/lighthouse-phase-4-cls-repeat.report.json` | `0.57` | `0.908` | `1.5 s` | `200 ms` | `2.1 s` | `8,355 KiB` |

## 3. Implementation Principles

- Preserve CMS models, CMS fields, and Contentful content.
- Preserve normalized data contracts; no migration or model expansion is required for the first batches.
- Preserve current layout, aspect-ratio reservations, route structure, and IA.
- Derive image delivery URLs from existing raw asset URLs.
- Keep the helper pure, string-based, and unit-testable.
- Preserve non-Contentful URL behavior.
- Adopt the pattern surface-by-surface instead of refactoring every image renderer at once.
- Validate with Lighthouse before/after payload metrics, not visual preference.

## 4. Helper Contract

Proposed file:

- `src/lib/images/contentfulImage.ts`

Rationale:

- The helper is a pure URL utility, not a Contentful fetcher or CMS adapter.
- Keeping it under `src/lib/images/*` avoids adding rendering logic to `src/content/contentful/*` while still keeping the Contentful-specific behavior isolated.
- UI components can depend on a small image-delivery utility without direct CMS fetching or model coupling.

Proposed API:

```ts
export type ContentfulImageFormat = "webp" | "avif" | "jpg" | "png";

export type ContentfulImageFit = "fill" | "scale" | "crop" | "thumb" | "pad";

export type ContentfulImageOptions = {
  width?: number;
  quality?: number;
  format?: ContentfulImageFormat;
  fit?: ContentfulImageFit;
};

export function normalizeImageUrl(url?: string | null): string | undefined;

export function isContentfulImageUrl(url?: string | null): boolean;

export function buildContentfulImageUrl(
  url: string,
  options: ContentfulImageOptions,
): string;

export function buildContentfulSrcSet(
  url: string,
  widths: number[],
  options?: Omit<ContentfulImageOptions, "width">,
): string | undefined;
```

Non-Contentful fallback:

- `normalizeImageUrl` should preserve the existing protocol-relative behavior by converting `//images.ctfassets.net/...` to `https://images.ctfassets.net/...`.
- `buildContentfulImageUrl` should return the normalized original URL for non-Contentful URLs.
- `buildContentfulSrcSet` should return `undefined` for non-Contentful URLs so surfaces can keep existing single-`src` behavior.

Protocol-relative handling:

- Normalize before parsing.
- Preserve existing query parameters where possible, then set or replace image transform parameters.

Testing plan:

- Protocol-relative Contentful URL normalizes to `https`.
- Non-Contentful URL is preserved.
- Width/quality/format/fit parameters are added predictably.
- Existing query parameters are preserved unless intentionally replaced by helper options.
- `srcSet` widths are sorted/deduplicated and omit invalid widths.

## 5. Responsive Image Strategy

### Hero / MediaFrame

- Widths: `480`, `720`, `960`, `1200`.
- Sizes: `(min-width: 1024px) 40vw, 90vw`.
- Format: start with `webp` for broad support; consider `avif` only after compatibility and visual review.
- Quality: start around `75`; adjust only with visual evidence.
- Loading: preserve current `loading="eager"` for Hero media.
- Decoding: preserve current `decoding="async"`.
- Expected impact: reduce the `hero-design.jpeg` transfer from about `2.56 MB` toward a viewport-appropriate transformed asset while preserving current layout and aspect ratio.

Implementation shape:

- Add optional `srcSet` and `sizes` props to `MediaFrame`.
- Keep `src` as a transformed fallback for Contentful URLs and the original URL for non-Contentful URLs.
- Do not add layout reservation changes in this batch.

### Timeline

- Widths: `320`, `480`, `640`, `800`.
- Sizes: `(min-width: 768px) 316px, 90vw`.
- Format: start with `webp`.
- Quality: start around `75`.
- Loading: preserve current `loading="lazy"`.
- Decoding: preserve current `decoding="async"`.
- Expected impact: reduce four Timeline PNG transfers currently around `1.43-1.47 MB` each while preserving the current `aspect-ratio: 4 / 3` frame.

Implementation shape:

- Add `srcSet`/`sizes` directly to Timeline image elements or extract a tiny render helper after Hero proves the pattern.
- Do not change Timeline grid, card sizing, alternation, or media reservation.

## 6. Implementation Batches

| Batch | Goal | Files likely affected | Risk | Acceptance |
| --- | --- | --- | --- | --- |
| 4.1 | Add pure Contentful image helper and tests. | `src/lib/images/contentfulImage.ts`, `src/lib/images/contentfulImage.test.ts` | Low | Helper tests pass; non-Contentful URLs and protocol-relative URLs preserve current behavior. |
| 4.2 | Adopt responsive delivery for Hero through `MediaFrame`. | `src/components/sections/primitives/MediaFrame.tsx`, `src/components/sections/HeroSection.tsx`, related tests/stories if needed | Medium | Hero layout unchanged; Lighthouse image payload drops; CLS/LCP do not materially regress. |
| 4.3 | Adopt responsive delivery for Timeline media. | `src/components/sections/TimelineSection.tsx`, Timeline tests/stories if needed | Medium | Timeline layout unchanged; Timeline image transfer drops; lazy loading remains. |
| 4.4 | Extend the proven pattern to later surfaces. | `ProjectsSection`, `ArticleCard`, `ArticlePage`, `RichTextRenderer` | Medium | Extension only after Hero/Timeline validates cleanly. |

Batch details:

### Batch 4.1 — Contentful Image Helper

- Objective: create a small, pure URL helper for Contentful image transforms.
- Out of scope: UI rendering changes, CMS changes, layout changes.
- Validation commands: `npm run test -- src/lib/images/contentfulImage.test.ts`, `npm run lint`, `npm run build`.
- Rollback: remove the helper and tests.
- Acceptance criteria: helper handles Contentful, non-Contentful, protocol-relative, invalid width, query-param, and `srcSet` cases.

### Batch 4.2 — Hero / MediaFrame Adoption

- Objective: reduce Hero image transfer while preserving the existing MediaFrame layout.
- Out of scope: Hero copy/layout redesign, CLS fixes, route/IA changes.
- Validation commands: `npm run test`, `npm run build`, `npm run build-storybook`, Lighthouse desktop before/after.
- Rollback: remove `srcSet`/`sizes` props and restore single-`src` Hero media.
- Acceptance criteria: Hero image transfer drops; `unsized-images` remains passing; CLS/LCP do not materially regress.

### Batch 4.3 — Timeline Media Adoption

- Objective: reduce Timeline media transfer while preserving the current timeline layout and lazy loading.
- Out of scope: Timeline layout, card hierarchy, heading semantics, visual polish.
- Validation commands: `npm run test -- src/components/sections/TimelineSection.test.tsx`, `npm run build`, Lighthouse desktop before/after.
- Rollback: remove Timeline `srcSet`/`sizes` usage.
- Acceptance criteria: Timeline image transfer drops; layout remains unchanged; lazy loading remains.

### Batch 4.4 — Extend Later

- Objective: apply the proven image delivery strategy to remaining image surfaces.
- Out of scope: starting before Hero/Timeline results are validated.
- Validation commands: targeted component tests, Storybook build, Lighthouse route checks where relevant.
- Rollback: surface-specific revert.
- Acceptance criteria: each later surface reduces transfer without layout or contract changes.

## 7. Validation Plan

Commands:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run build-storybook` with Node `22.12+`
- Lighthouse desktop before/after
- Lighthouse mobile spot check after Hero/Timeline adoption
- Image payload comparison from Lighthouse JSON

Metrics:

- Total byte weight
- Image transfer bytes
- Wasted image bytes
- LCP
- CLS
- TBT
- Speed Index
- `unsized-images`
- Visual/manual viewport notes for `375`, `768`, `1024`, and desktop widths

Current baseline to compare against:

- Repeat desktop total byte weight: `8,355 KiB`.
- Repeat desktop image transfer: `8,387,523 B`.
- Repeat desktop image-delivery estimated savings: `8,101 KiB`.
- Repeat desktop CLS: `0.908`, with root cause unconfirmed.

## 8. Decision Gates

### Before Implementation

- Plan approved.
- CLS fixes remain blocked unless a specific shift source is confirmed.
- Helper design accepted.
- First implementation batch limited to helper/tests.

### After Helper Batch

- Helper tests pass.
- Non-Contentful URL behavior is preserved.
- Protocol-relative URL behavior matches existing normalizers.
- No rendering behavior changes have been introduced.

Batch 4.1 checkpoint, May 18, 2026:

- Status: complete.
- Added `src/lib/images/contentfulImage.ts`.
- Added `src/lib/images/contentfulImage.test.ts`.
- Targeted validation passed: `npm run test -- src/lib/images/contentfulImage.test.ts`.
- No UI image adoption, image rendering component change, layout change, CMS model change, Contentful migration, or CLS fix was introduced.

### After Hero/Timeline Adoption

- No layout change.
- Payload reduced for the adopted surface.
- `unsized-images` remains passing.
- Lighthouse does not materially regress CLS or LCP.
- Any severe CLS result is documented but not fixed unless its source is isolated.

## 9. Out of Scope

- CLS fixes.
- Layout reservation changes.
- CMS model changes.
- Contentful migrations.
- Typography/card/elevation polish.
- Project, article, and rich-text adoption until Hero/Timeline prove the pattern.
- Any route or IA change.

## 10. Open Questions

- Should the helper prefer `webp` for the first implementation, or should it expose `format` while each surface defaults independently?
- Should the Hero fallback `src` use the largest planned transformed width (`1200`) or preserve the original URL while relying on `srcSet`?
- Should `MediaFrame` receive generic `srcSet`/`sizes` props, or should Hero own those attributes directly until another MediaFrame consumer needs them?
- What payload reduction target should define success for the first Hero/Timeline implementation batch?
- Should repeated severe CLS be investigated in DevTools performance panel before or after image delivery is improved?
