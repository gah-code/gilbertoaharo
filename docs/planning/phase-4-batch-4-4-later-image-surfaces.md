# Phase 4 Batch 4.4 Later Image Surfaces Evidence

Date: May 18, 2026
Mode: planning/evidence only; no implementation changes

## 1. Executive Verdict

Approve narrowly scoped later-surface implementation for `ArticleCard` only.

Route-specific Lighthouse evidence shows `/articles` still has meaningful Contentful image payload waste from article-card hero images. Homepage Projects do not contribute meaningful initial-route image weight after Hero/Timeline adoption, and the current article detail routes do not expose Contentful hero or rich-text image payload in Lighthouse. Defer `ProjectsSection`, `ArticlePage`, and `RichTextRenderer` image adoption until route/content evidence justifies it.

CLS fixes remain blocked. The homepage still reproduced severe CLS in this run, but the attribution remains broad and does not isolate a specific shift source.

## 2. Evidence Summary

| Route | Surface | Payload issue? | Image savings | Recommendation |
| --- | --- | --- | ---: | --- |
| `/` | ProjectsSection | No meaningful initial-route contribution | `18 KiB` remaining homepage image-delivery savings, attributed to the already optimized Hero image | Defer Projects image adoption. |
| `/articles` | ArticleCard | Yes | `2,044 KiB` estimated savings | Approve a narrow ArticleCard image-delivery batch. |
| `/articles/resilient-content-systems` | ArticlePage / RichTextRenderer | No | `0 KiB` | Defer ArticlePage and RichTextRenderer. |
| `/articles/editorial-frontend-partnership` | ArticlePage / RichTextRenderer | No | `0 KiB` | Defer ArticlePage and RichTextRenderer. |
| `/articles/thoughtful-interface-work` | ArticlePage / RichTextRenderer | No | `0 KiB` | Defer ArticlePage and RichTextRenderer. |

## 3. Route Payload Evidence

| Route | Total byte weight | Image transfer | Estimated image savings | Largest image contributors |
| --- | ---: | ---: | ---: | --- |
| `/` | `235 KiB` | `72,789 B` | `18 KiB` | Optimized Hero WebP `24,475 B`; optimized Timeline WebP images `10,156 B`, `10,248 B`, `13,047 B`, `14,073 B`; favicon `790 B`. |
| `/articles` | `3,859 KiB` | `3,794,510 B` | `2,044 KiB` | Article card PNGs: `1,678,700 B` and `2,115,027 B`; the largest finding is the `About Me` card image with `2,092,562 B` wasted. |
| `/articles/resilient-content-systems` | `149 KiB` | `791 B` | `0 KiB` | Favicon only. |
| `/articles/editorial-frontend-partnership` | `149 KiB` | `792 B` | `0 KiB` | Favicon only. |
| `/articles/thoughtful-interface-work` | `149 KiB` | `789 B` | `0 KiB` | Favicon only. |

Artifacts are local and untracked under `.tmp/design-system-audit/batch-4-4/`:

- `home.report.json` / `home.report.html`
- `articles.report.json` / `articles.report.html`
- `article-detail.report.json` / `article-detail.report.html`
- `article-editorial.report.json` / `article-editorial.report.html`
- `article-interface.report.json` / `article-interface.report.html`

## 4. Surface Decision Matrix

| Surface | Evidence | Decision | Reason |
| --- | --- | --- | --- |
| ProjectsSection | Homepage route now totals `235 KiB`; Lighthouse image requests are Hero, Timeline, and favicon only. Projects thumbnails are not a meaningful initial-route contributor in the current live content state. | Defer | Implementation risk is not justified by current route payload evidence. Recheck only if live project thumbnails become a measured payload contributor. |
| ArticleCard | `/articles` route totals `3,859 KiB`; Contentful article card images transfer `3,793,727 B`; Lighthouse estimates `2,044 KiB` savings. | Implement now | Measurable route-specific waste exists and the implementation can reuse the proven Contentful image helper with a narrow ArticleCard-only scope. |
| ArticlePage | All three sitemap article detail routes show about `149 KiB` total weight, favicon-only image transfer, and no image-delivery findings. | Defer | Current live article detail content does not expose a measurable image payload issue. |
| RichTextRenderer | The same article detail routes show no embedded Contentful image transfer and no image-delivery savings. Code supports embedded assets, but current content does not justify implementation. | Defer | Needs future evidence from article content that actually renders embedded images. |

## 5. Decision Rule Applied

> If Projects/Article/RichText image payloads are not meaningfully contributing to route weight, defer implementation and move toward Phase 4 closeout or the next roadmap risk.

The evidence supports one exception: `ArticleCard` is meaningfully contributing to `/articles` route weight, so it should receive a narrow implementation batch. `ProjectsSection`, `ArticlePage`, and `RichTextRenderer` are not meaningful contributors in current route evidence and should be deferred.

## 6. Recommended Next Action

Implement a narrowly scoped Batch 4.5 for ArticleCard image delivery only, then deploy-verify `/articles` payload before deciding whether Phase 4 can close.

## 7. Out of Scope Confirmed

- no production code changes
- no image adoption
- no CLS implementation
- no CMS model changes
- no Contentful migrations
- no layout changes
- no typography/card/elevation polish
