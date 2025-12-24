# Gilberto A. Haro — Personal Site

Single-page React + TypeScript site powered by Contentful. The landing page is composed from modular sections, and article pages render deep dives with Rich Text.

## Stack
- React 19, TypeScript, Vite (alias `@` → `src`)
- Contentful delivery SDK with light mappers (`src/content/contentful`)
- Minimal design primitives (`src/components/ui`, `src/components/layout`) and section renderers
- Custom SPA router for landing + `/articles/:slug`

## Project structure
- `src/pages` — `LandingPage`, `ArticlePage`, `NotFoundPage`
- `src/router` — path parsing and SPA navigation helpers
- `src/content` — source contract, Contentful client/API/adapters/types; `static/` holds fixtures for local prototyping
- `src/components/sections` — per-section renderers driven by CMS content
- `src/components/ui` & `src/components/layout` — lightweight UI primitives and SEO wrapper
- `src/styles` — tokens + base resets
- `docs/` — IA, design system notes, and CMS guidance

## How it works
- `LandingPage` fetches the single `pagePersonalLanding` entry then maps `sections[]` into `SectionRenderer`, which dispatches to the proper section component by content type id.
- `ArticlePage` fetches an article by slug and renders a minimal `RichTextRenderer` plus optional attachments and hero image.
- `Router` listens to `popstate` and uses `parsePathname` to route between landing, article, and not-found states. `Link` + `router/link` intercept internal clicks for SPA navigation.
- `contentfulSource` in `src/content/source.ts` is the default `ContentSource`; swap it for fixtures later if you want local prototyping.
- SEO meta is set via `SeoHead`, which updates `<title>`, description, and canonical link.

## Environment
Copy `.env.example` to `.env` and fill in your own values:
- `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_ENVIRONMENT` (defaults to `master`), `VITE_CONTENTFUL_DELIVERY_TOKEN` — Contentful Delivery API credentials (keep private)
- `VITE_ARTICLE_ROUTE_PREFIX` — defaults to `/articles`
- `VITE_SITE_URL` — absolute site URL for canonical fallbacks
- `VITE_SITE_NAME` — fallback document title

## Development
- Prereqs: Node 20.19+ or 22.12+ (Vite warns on 22.2.0), npm
- Install: `npm install`
- Dev server: `npm run dev`
- Type-check + build: `npm run build`
- Lint: `npm run lint`
- Preview built app: `npm run preview`

## Safety before publishing
- Secrets: `.env`, `.env.*` are gitignored; only commit `.env.example`. Never commit real tokens.
- Audit: search for stray credentials before pushing (`rg -i \"secret|token|password|apikey\"`).
- Dependencies: lockfile is `package-lock.json`.
- Docs are now tracked (removed `docs*` ignore) so IA/design notes publish safely without leaking env data.
