# Gilberto A. Haro — Personal Site

Personal site built with **React + TypeScript + Vite + Contentful** with a strict CMS boundary, typed section view models, Storybook architecture coverage, and CI quality gates.

## Overview

- Landing page (`/`) is composed from modular Contentful sections.
- Article pages (`/articles/:slug`) render long-form content with SEO fallbacks.
- Debug page (`/debug`) shows content-model diagnostics.
- Router is intentionally lightweight (no routing framework dependency).

## Current Highlights

- Typed section renderer with cast-free mapping by content type ID.
- Section normalization layer before render (hero/timeline/skills/projects/learning/contact).
- Primitive API contracts with explicit variants/sizes/states:
  - `Button`, `Link`, `Card`, `Badge`, `Text`, `Heading`
- Reusable layout primitives:
  - `Stack`, `Inline`, `Cluster`, `Grid`, `Container`
- Colocated CSS for primitives and sections (inline visual style cleanup complete for target sections).
- Storybook integrated as in-repo architecture workspace.
- CI gates for lint/build/test/storybook build.

## Tech Stack

- React 19 + TypeScript
- Vite 7 (`@` alias to `src`)
- Contentful Delivery SDK + adapter/normalizer boundary
- Vitest + Testing Library
- Storybook 10

## Project Structure

- `src/components/ui` — primitives + layout primitives + stories/tests
- `src/components/sections` — sections, normalizers, section stories
- `src/components/layout` — shell/header/seo
- `src/content` — content source contract + Contentful/static implementations
- `src/router` — lightweight SPA routing helpers
- `src/pages` — route-level pages
- `src/styles` — tokens + base
- `src/stories` — cross-cutting foundation stories
- `.storybook` — Storybook config
- `.github/workflows/ci.yml` — lint/build/test/storybook gate

## Prerequisites

- Node: **20.19+** or **22.12+**
- npm

Homebrew flow:

```bash
brew upgrade node
hash -r
node -v
```

If `node -v` still shows an unexpected version, verify path resolution:

```bash
which node
which -a node
```

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:5173`.

## Environment Variables

Required:

- `VITE_CONTENTFUL_SPACE_ID`
- `VITE_CONTENTFUL_DELIVERY_TOKEN`

Recommended:

- `VITE_CONTENTFUL_ENVIRONMENT`
- `VITE_SITE_URL`
- `VITE_ARTICLE_ROUTE_PREFIX`

Mode/source:

- `VITE_BUILD_TARGET` (`prod` or `preview`)
- `VITE_CONTENT_SOURCE` (`contentful` or `static`)

## Scripts

```bash
npm run dev               # local dev
npm run build             # type-check + production build
npm run preview           # preview production build
npm run lint              # eslint
npm run test              # vitest run
npm run test:watch        # vitest watch mode
npm run storybook         # storybook dev --port 6006
npm run build-storybook   # build static storybook
npm run test:storybook    # storybook test runner
```

## Architecture Notes

- `src/content/source.ts` defines the runtime content contract.
- UI consumes normalized, stable section view models (not raw CMS fields).
- Section rendering is mapped by typed content-type IDs in `SectionRenderer`.
- Internal project links prefer references (e.g. `projectLink.article`) over URL strings.

## Quality Gates

CI runs:

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run build-storybook`

## Troubleshooting

### Storybook says Node is unsupported

- Ensure `node -v` is `>=20.19` or `>=22.12` in the same terminal session.
- Recheck PATH ordering if multiple Node installs exist.

### Content appears missing

- Confirm `VITE_CONTENT_SOURCE` and Contentful env/token values.
- Ensure entries/references are published.

### Article route returns not found in static mode

- Static source currently does not provide article content.
- Use `VITE_CONTENT_SOURCE=contentful` for article testing.

## Docs

- `docs/architecture/ia.md`
- `docs/design-system/design-system.md`
- `docs/design-system/audit/2026-04-15-senior-readiness-context.md`
- `docs/planning/storybook-migration-plan.md`
- `docs/planning/ROADMAP.md`

## Contributing

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- `SUPPORT.md`
