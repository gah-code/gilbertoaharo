# Environment Classification (Phase 3)

This document defines the current client/server environment boundary without changing runtime flow. Phase 4 will implement the migration path.

## Classification Table

| Variable | Classification | Current use |
| --- | --- | --- |
| `VITE_CONTENT_SOURCE` | `public-client` | Chooses static vs Contentful source in the browser runtime (`src/env.ts`, `src/content/source.ts`). |
| `VITE_BUILD_TARGET` | `public-client` | Controls preview/prod runtime mode parsing (`src/env.ts`). |
| `VITE_SITE_URL` | `public-client` | Public canonical/base URL value (`src/env.ts`). |
| `VITE_SITE_NAME` | `public-client` | Optional browser title fallback (`src/components/layout/SeoHead.tsx`). |
| `VITE_ARTICLE_ROUTE_PREFIX` | `public-client` | Client routing prefix for article paths (`src/env.ts`, `src/router/routes.ts`). |
| `VITE_CONTENTFUL_SPACE_ID` | `public-client` | Contentful space identifier used by client SDK (`src/env.ts`, `src/content/contentful/client.ts`). |
| `VITE_CONTENTFUL_ENVIRONMENT` | `public-client` | Contentful environment selector (`src/env.ts`, `src/content/contentful/client.ts`). |
| `VITE_CONTENTFUL_INCLUDE_CONTENT_SOURCE_MAPS` | `public-client` | Boolean Contentful CSM flag (`src/env.ts`). |
| `VITE_CONTENTFUL_DELIVERY_TOKEN` | `temporary-client-exposed` | Delivery token currently passed to browser-side Contentful client (`src/env.ts`, `src/content/contentful/client.ts`). |
| `CONTENTFUL_DELIVERY_TOKEN` | `server-only-target` | Intended server-side replacement for delivery access in a later phase (not wired yet). |
| `CONTENTFUL_SPACE_ID` | `server-only-target` | Intended server-side Contentful space id in a later phase (not wired yet). |
| `CONTENTFUL_ENVIRONMENT` | `server-only-target` | Intended server-side Contentful environment in a later phase (not wired yet). |
| `VITE_CONTENTFUL_USE_PREVIEW` | `unused-or-obsolete` | Not used by current source runtime. |
| `VITE_CONTENTFUL_PREVIEW_TOKEN` | `unused-or-obsolete` | Not used by current source runtime. |

## Migration Decision Note

- Option A: Keep `VITE_CONTENTFUL_DELIVERY_TOKEN` temporarily client-exposed for published read-only content while preserving current architecture.
- Option B: Move delivery access server-side and remove browser token usage for a stricter security boundary.

Phase 4 will choose and implement one of these paths.
