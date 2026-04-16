# Gilberto A. Haro — My Personal Site

A personal site built with **React + TypeScript + Vite + Contentful**.
It is designed around a strict CMS boundary, typed section view models, and a design-system workflow validated through Storybook and CI.
It exists as a maintainable portfolio/content platform where content operations and frontend architecture can evolve independently.

![Content Model](./docs/architecture/contentful-cm-view.png)

## Table of Contents

- [Overview](#overview)
- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Repository Structure](#repository-structure)
- [Architecture Notes](#architecture-notes)
- [Quality Gates](#quality-gates)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repo powers:

- `/` — modular landing page from Contentful section entries
- `/articles/:slug` — article pages with SEO fallback behavior
- `/debug` — diagnostics for content and model visibility

## Core Features

- Typed section renderer with content-type keyed mapping
- Section normalization layer before rendering
- Reusable UI primitives with explicit variant/size/state contracts
- Layout primitives (`Stack`, `Inline`, `Cluster`, `Grid`, `Container`)
- Storybook 10 integrated as architecture workspace
- CI gates for lint, build, tests, and Storybook build

## Tech Stack

- React 19 + TypeScript
- Vite 7 (`@` alias to `src`)
- Contentful Delivery SDK
- Vitest + Testing Library
- Storybook 10

## Getting Started

### Prerequisites

- Node: **20.19+** or **22.12+**
- npm

If using Homebrew:

```bash
brew upgrade node
hash -r
node -v
```

If `node -v` is unexpected, verify path resolution:

```bash
which node
which -a node
```

### Install and Run

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
npm run dev                # local dev server
npm run build              # type-check + production build
npm run preview            # preview production build
npm run lint               # eslint
npm run test               # vitest run
npm run test:watch         # vitest watch mode
npm run storybook          # storybook dev --port 6006
npm run build-storybook    # static storybook output
npm run test:storybook     # storybook test runner
```

## Repository Structure

### High-level File Tree

```text
.
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── lib/
│   ├── pages/
│   ├── preview/
│   ├── router/
│   ├── stories/
│   ├── styles/
│   └── test/
├── docs/
├── .storybook/
├── .github/workflows/
├── package.json
├── vite.config.ts
├── tsconfig*.json
└── README.md
```

### Major Folders and Files

- `src/components/`  
  UI system and feature composition. `ui/` holds reusable primitives, `sections/` holds CMS-driven sections, `layout/` holds page shell/navigation chrome.

- `src/content/`  
  Content boundary layer. Defines the source contract and isolates Contentful mapping/normalization from rendering concerns.

- `src/pages/` and `src/router/`  
  Route-level pages and lightweight SPA navigation logic. Keeps routing simple without adding router framework overhead.

- `src/styles/`  
  Global design tokens and base styles. Component and section-specific visuals are colocated with their implementation.

- `src/stories/` and `.storybook/`  
  Storybook foundation stories plus workspace config for component architecture proofing.

- `docs/`  
  Architecture, planning, and design-system references used to keep implementation and docs aligned.

- `.github/workflows/ci.yml`  
  CI quality gate entrypoint for lint/build/test/storybook checks.

### Detailed Tree (Expandable)

<details>
<summary>Open detailed structure with key modules</summary>

```text
src/
├── App.tsx
├── main.tsx
├── env.ts
├── assets/
│   └── timeline/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── PageShell.tsx
│   │   └── SeoHead.tsx
│   ├── navigation/
│   │   ├── ResponsiveNav.tsx
│   │   └── Navigation.css
│   ├── rich-text/
│   │   └── RichTextRenderer.tsx
│   ├── sections/
│   │   ├── SectionRenderer.tsx
│   │   ├── SectionShell.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TimelineSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── LearningSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── hero/
│   │   ├── timeline/
│   │   ├── skills/
│   │   ├── projects/
│   │   ├── learning/
│   │   └── contact/
│   └── ui/
│       ├── Button.tsx / Button.css
│       ├── Link.tsx / Link.css
│       ├── Card.tsx / Card.css
│       ├── Badge.tsx / Badge.css
│       ├── Text.tsx / Text.css
│       ├── Heading.tsx / Heading.css
│       ├── Stack.tsx
│       ├── Inline.tsx / Inline.css
│       ├── Cluster.tsx / Cluster.css
│       ├── Grid.tsx / Grid.css
│       └── Container.tsx
├── content/
│   ├── source.ts
│   ├── contentful/
│   │   ├── client.ts
│   │   ├── api.ts
│   │   ├── adapters.ts
│   │   ├── includes.ts
│   │   ├── contentfulSource.ts
│   │   └── types.ts
│   └── static/
│       ├── fixtures.ts
│       └── staticSource.ts
├── lib/
│   └── errors.ts
├── pages/
│   ├── LandingPage.tsx
│   ├── ArticlePage.tsx
│   ├── NotFoundPage.tsx
│   └── DebugPage.tsx
├── preview/
│   ├── previewMode.ts
│   └── PreviewBanner.tsx
├── router/
│   ├── Router.tsx
│   ├── routes.ts
│   └── link.ts
├── stories/
├── styles/
│   ├── tokens.css
│   └── base.css
└── test/
    └── setup.ts
```

</details>

## Architecture Notes

- `src/content/source.ts` defines the runtime content contract.
- UI renders normalized view models, not raw CMS payloads.
- Section dispatch is keyed by typed content type IDs.
- Internal project linking prefers reference-driven routing over hardcoded URLs.

## Quality Gates

CI currently runs:

- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run build-storybook`

## Troubleshooting

### Storybook Node runtime error

- Ensure `node -v` is `>=20.19` or `>=22.12` in the same terminal.
- Recheck shell PATH ordering if multiple Node installs are present.

### Missing content

- Confirm `VITE_CONTENT_SOURCE` and Contentful token/env values.
- Ensure referenced entries are published.

### Article route not found in static mode

- Static source currently does not provide article bodies.
- Use `VITE_CONTENT_SOURCE=contentful` for article testing.

## Documentation

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

## License

MIT (see `LICENSE`).
