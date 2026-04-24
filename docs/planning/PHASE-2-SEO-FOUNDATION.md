# Phase 2 — SEO Foundation

Status: Completed (April 24, 2026). Active implementation phase moved to Phase 3.

## Scope

Phase 2 standardizes route-level SEO ownership and fallback behavior for the core route surfaces without changing the content-source architecture.

## Route Metadata Inventory

| Route | Metadata owner | Title source | Description source | Canonical source | Fallback behavior |
| --- | --- | --- | --- | --- | --- |
| `/` | `src/pages/LandingPage.tsx` | `LandingPageData.metaTitle` | `LandingPageData.metaDescription` | `buildCanonicalUrl("/")` | Route fallback title/description if CMS value is missing. |
| `/articles` | `src/pages/articles/ArticlesPage.tsx` | Route constant | Route constant | `buildCanonicalUrl(env.articlePrefix)` | Stable route defaults are always applied. |
| `/articles/:slug` | `src/pages/ArticlePage.tsx` | `article.seo.title` | `article.seo.description` | `article.seo.canonicalUrl` | Falls back to article title/excerpt and route canonical when SEO values are blank. |
| `/debug` | `src/pages/DebugPage.tsx` | Route constant | Route constant | `buildCanonicalUrl("/debug")` | Stable debug defaults are always applied. |
| `not-found` | `src/pages/NotFoundPage.tsx` | Route constant | Route constant | `buildCanonicalUrl("/404")` | Stable not-found defaults are always applied. |

Note: `/debug/github` uses the same pattern in `src/pages/DebugGithubPage.tsx` and remains developer-focused.

## Metadata Contract

Route-level pages own SEO metadata and pass it through `PageShell` using:

- `title`
- `description`
- `canonicalUrl`

`PageShell` delegates to `SeoHead` for document updates. UI primitives and section components do not own route metadata.

## Fallback Rules

- Missing route metadata is resolved in the route page before rendering `PageShell`.
- `SeoHead` now removes stale `<meta name="description">` and `<link rel="canonical">` tags when a route omits those values.
- Canonical URLs are built with `buildCanonicalUrl()`:
  - if `VITE_SITE_URL` is set, canonical becomes absolute
  - if `VITE_SITE_URL` is unset, canonical falls back to a normalized path

## Internal Discoverability Inventory

Current crawlable internal-link surfaces:

- Header brand link to `/` (`src/components/layout/Header.tsx`)
- Navigation links from content source (`ResponsiveNav`)
- Article index cards linking to `/articles/:slug` (`src/components/articles/ArticleCard.tsx`)
- Not-found recovery link to `/` (`src/pages/NotFoundPage.tsx`)

Observed gaps and follow-ups:

- Article card CTA text is generic (`"Read article"`); title link is descriptive, but CTA anchor text can be improved later.
- Homepage-to-articles bridge depends on editorial/nav content; no dedicated hard-coded bridge block exists on `/`.
- Record a UX-phase follow-up to strengthen homepage-to-articles discovery and anchor-text quality.

## Completion Gate (Phase 2)

- [x] Metadata contract is clear across core routes.
- [x] Title/description/canonical behavior is standardized.
- [x] Route-level SEO tests exist.
- [x] Internal link inventory is documented.
- [x] Docs explain SEO ownership boundaries.
