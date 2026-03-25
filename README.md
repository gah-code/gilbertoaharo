
# Gilberto A. Haro — Personal Site

My personal website, built with **React + TypeScript + Vite** and **Contentful**: modular landing sections, long-form article pages, and a strict CMS boundary enforced through adapters and minimal primitives.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Stack](#stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Local Preview Checklist](#local-preview-checklist)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [Content Modeling Notes](#content-modeling-notes)
- [Safety & Publishing](#safety--publishing)
- [Contributing](#contributing)
- [Docs](#docs)
- [Design System Roadmap](#design-system-roadmap)

---

## Overview

This repo powers a personal landing experience and long-form writing pages:

- **Landing** (`/`) renders a single `pagePersonalLanding` entry composed of modular section entries.
- **Articles** (`/articles/:slug`) render `article` entries (Rich Text + optional hero image + attachments).
- A **lean router** keeps this as a lightweight SPA without adding a routing dependency.

---

## Features

- Content-driven landing page from **Contentful modular sections**
- Article pages with **SEO metadata fallbacks**
- Minimal, reusable UI primitives (`src/components/ui`)
- Small, explicit “content layer” (`src/content/`) that isolates CMS concerns from UI concerns
- Custom SPA router with internal link interception
- Responsive navigation header powered by Contentful `navigationMenu` (desktop dropdowns + mobile drawer/accordions)

---

## Stack

- **React 19**, **TypeScript**, **Vite** (path alias `@` → `src`)
- **Contentful delivery SDK** + light mappers (`src/content/contentful`)
- Minimal design primitives and section renderers (`src/components/ui`, `src/components/sections`)
- Custom SPA router for:
  - `/`
  - `/articles/:slug`
  - 404

---

## Project Structure

High-level map:

- `src/pages` — `LandingPage`, `ArticlePage`, `NotFoundPage`
- `src/router` — path parsing and SPA navigation helpers
- `src/content` — source contract + Contentful client/API/adapters/types; `static/` holds fixtures for UI-first prototyping
- `src/components/sections` — per-section renderers driven by CMS content type id
- `src/components/ui` & `src/components/layout` — lightweight UI primitives and SEO wrapper
- `src/components/rich-text` — minimal rich text renderer
- `src/styles` — tokens + base resets
- `docs/` — IA, design system notes, CMS guidance

---

# 📁 Project Structure — `gilbertoaharo`

> **Architecture stance:**
> **Single-Page App (Vite + React)** with a **clean CMS boundary**, a **lightweight router**, and a **design-system-driven UI**.
> Content models live outside UI logic and flow through adapters before rendering.

```text
gilbertoaharo/
├─ .env.example               # Sample env vars (Contentful, site config, preview flags)
├─ LICENSE                    # Project license
├─ README.md                  # Project overview, setup, and architecture notes
├─ eslint.config.js            # ESLint rules (React + TS)
├─ index.html                 # Vite HTML entry template
├─ package.json               # Scripts, dependencies, metadata
├─ package-lock.json          # npm dependency lockfile
├─ tsconfig.json              # Base TS config with project references
├─ tsconfig.app.json          # TS config for the app bundle
├─ tsconfig.node.json         # TS config for Node/Vite tooling
├─ vite.config.ts             # Vite dev/build config (aliases, plugins, tests)
│
├─ public/                    # Static assets copied as-is to build output
│  ├─ _redirects              # SPA redirect rules (Netlify-style hosting)
│  └─ vite.svg                # Example static asset
│
└─ src/                       # Application source
   ├─ main.tsx                # React entry point (mounts <App />)
   ├─ App.tsx                 # Root app component (router + global wiring)
   ├─ env.ts                  # Centralized env parsing + defaults (fail-fast)
   ├─ vite-env.d.ts           # Vite/TS env type declarations
   │
   ├─ assets/                 # Bundled app assets (imported by JS/TS)
   │
   ├─ styles/                 # Global styling layer
   │  ├─ tokens.css           # Design tokens (colors, spacing, typography)
   │  └─ base.css             # Base resets/global styles (imports tokens)
   │
   ├─ router/                 # Lightweight SPA routing (no react-router)
   │  ├─ routes.ts            # Route parsing & route definitions
   │  ├─ Router.tsx           # Route state + view selection
   │  └─ link.ts              # Internal navigation helpers (history-based)
   │
   ├─ pages/                  # Route-level views (thin, data-driven)
   │  ├─ LandingPage.tsx      # `/` — Personal landing page
   │  ├─ ArticlePage.tsx      # `/articles/:slug` — Long-form article view
   │  ├─ NotFoundPage.tsx     # 404 fallback
   │  └─ DebugPage.tsx        # Debug/diagnostics view (CMS visibility)
   │
   ├─ components/             # UI components (design system + composition)
   │  ├─ layout/              # Page-level layout & chrome
   │  │  ├─ PageShell.tsx     # Page wrapper (SEO, spacing, structure) + Header
   │  │  ├─ Header.tsx        # Sticky header + nav (brand, CTA, mega/drawer)
   │  │  └─ SeoHead.tsx       # Document head + meta tags
   │  │
   │  ├─ rich-text/           # Controlled rich-text rendering
   │  │  └─ RichTextRenderer.tsx
   │  │     # Maps allowed Contentful nodes → UI primitives
   │  │
   │  ├─ sections/            # Content-driven page sections
   │  │  ├─ SectionRenderer.tsx # Switch on section content-type ID
   │  │  ├─ SectionShell.tsx   # Shared section framing (anchors, spacing)
   │  │  ├─ HeroSection.tsx
   │  │  ├─ ProjectsSection.tsx
   │  │  ├─ SkillsSection.tsx
   │  │  ├─ TimelineSection.tsx
   │  │  ├─ LearningSection.tsx
   │  │  └─ ContactSection.tsx
   │  │
   │  ├─ navigation/          # Responsive nav system (desktop + mobile)
   │  │  └─ ResponsiveNav.tsx # Mega menu + drawer/accordion behaviors
   │  │
   │  └─ ui/                  # Design-system primitives (reusable atoms)
   │     ├─ Badge.tsx         # Badge / label primitive
   │     ├─ Button.tsx        # Button primitive (CTA)
   │     ├─ Card.tsx          # Card surface primitive
   │     ├─ Container.tsx     # Layout container primitive
   │     ├─ Heading.tsx       # Heading typography primitive
   │     ├─ Link.tsx          # Styled anchor primitive
   │     ├─ Stack.tsx         # Stack/spacing layout primitive
   │     └─ Text.tsx          # Text typography primitive
   │
   ├─ content/                # Content layer (CMS abstraction boundary)
   │  ├─ source.ts            # ContentSource interface (UI-first contract)
   │  │
   │  ├─ static/              # UI-first prototyping (no CMS dependency)
   │  │  ├─ fixtures.ts       # Local fixture content data
   │  │  └─ staticSource.ts   # Static ContentSource implementation
   │  │
   │  └─ contentful/          # Contentful implementation of ContentSource
   │     ├─ client.ts         # Contentful SDK client (delivery/preview)
   │     ├─ api.ts            # Raw Contentful query helpers
   │     ├─ includes.ts       # Include/reference depth helpers
   │     ├─ types.ts          # Contentful model/type definitions
   │     ├─ adapters.ts       # CMS → UI data mapping (contracts live here)
   │     └─ contentfulSource.ts # Contentful ContentSource implementation
   │
   └─ preview/                # Preview-mode support (draft content)
      ├─ previewMode.ts       # Preview state helpers (env + toggles)
      └─ PreviewBanner.tsx    # Preview mode UI indicator
```

---

## Getting Started

### Prerequisites

- Node: **20.19+** or **22.12+**
- npm

### Install

```bash
npm install
````

### Run locally

```bash
npm run dev
```

Open: `http://localhost:5173`

---

## Environment Variables

### Setup

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Get your Contentful credentials from **Space Settings → API Keys**:
   - Go to `https://app.contentful.com/spaces/{SPACE_ID}/api/keys`
   - Copy the **Space ID**, **Environment**, and **Delivery API Token** (read-only)

3. Fill in `.env.local` with your values

4. Verify it works:

   ```bash
   npm run dev
   ```

### Variable Guide

All variables are prefixed with `VITE_` (accessible to client via `import.meta.env`).

**Contentful API** (required):

- `VITE_CONTENTFUL_SPACE_ID` — Your Contentful space identifier
- `VITE_CONTENTFUL_ENVIRONMENT` — Content environment (`master` for production, `testing` for draft)
- `VITE_CONTENTFUL_DELIVERY_TOKEN` — Read-only API token (safe; can be public)

**Site Configuration** (recommended):

- `VITE_SITE_URL` — Absolute URL for canonical links and fallbacks (e.g., `https://gilbertoaharo.com`)
- `VITE_ARTICLE_ROUTE_PREFIX` — URL prefix for articles (e.g., `/articles`)

**Build Mode** (advanced):

- `VITE_BUILD_TARGET` — `prod` (default) or `preview` (enables draft toggles and preview API)
- `VITE_CONTENT_SOURCE` — `contentful` (currently the only supported source)

**Preview Integration** (optional, for draft content):

- `VITE_CONTENTFUL_USE_PREVIEW` — Set to `true` to enable preview mode UI toggles
- `VITE_CONTENTFUL_PREVIEW_TOKEN` — Preview API token (for unpublished entries)

### Security

- **Never commit `.env.local`** — Git is configured to ignore it (see `.gitignore`)
- **Only commit `.env.example`** — Use placeholder values (empty strings or descriptive names)
- `.env.example` documents what variables are needed without exposing real values
- If you accidentally commit real tokens, [rotate them in Contentful](https://www.contentful.com/developers/docs/references/content-management-api/#/reference/api-keys/delete-an-api-key)

---

## How It Works

### Landing page

- `LandingPage` fetches the single `pagePersonalLanding` entry.
- The page’s `sections[]` are rendered by `SectionRenderer`.
- `SectionRenderer` dispatches to a section component based on **Contentful content type id**.

### Article pages

- `ArticlePage` fetches an `article` entry by `slug`.
- Renders:

  - title / excerpt
  - optional hero image
  - `RichTextRenderer` for body
  - optional attachments list
- SEO meta is applied via `SeoHead`:

  - `<title>`
  - meta description
  - canonical link fallback

### Router

- `Router` listens to `popstate` and routes between landing, article, and not-found states.
- A lightweight `Link` / navigation helper intercepts internal links for SPA navigation.

### Navigation header

- `Header` calls `ContentSource.getNavigationMenu()` to fetch the single `navigationMenu` entry, then adapters shape it into UI props (sorted links/cards, CTA, clamped breakpoint).
- `ResponsiveNav` renders:
  - **Desktop**: ordered `navLink` list with optional dropdown panels (`navPanel.cards[]`), aria-expanded/button wiring, outside click + Escape to close, lighter pill CTA.
  - **Mobile/Tablet**: full-height drawer with sticky brand/title row, scroll lock + overlay, accordion behavior when `mobileBehavior`/`mobileVariant` dictate, and CTA near the footer.
- Sorting: `navLink` and `navCard` use their `order` fields; `mobileBreakpointPx` controls when drawer mode activates (guarded to a sensible minimum).

### Content source contract

- `src/content/source.ts` defines the `ContentSource` contract.
- `contentfulSource` is the default implementation.
- A `staticSource` exists for UI-first prototyping via fixtures (optional workflow).

---

## Local Preview Checklist

Use this when “it loads but content is missing”:

1. Contentful tokens are present and correct (`.env.local`)
2. You’re using the right environment (`VITE_CONTENTFUL_ENVIRONMENT`)
3. Entries are **Published** (Delivery API only)
4. `pagePersonalLanding` exists and has `sections[]`
5. At least one `article` exists with a known slug (e.g. `article-test`)
6. Visit:

   - `/` (landing)
   - `/articles/<slug>` (article route)

---

## Scripts

```bash
npm run dev        # start local dev server
npm run build      # type-check + build
npm run preview    # preview built app
npm run lint       # eslint
```

---

## Troubleshooting

### 401 Unauthorized

- Missing/invalid Contentful token
- Fix: verify `VITE_CONTENTFUL_DELIVERY_TOKEN`, restart dev server

### Landing page loads but no sections

- `pagePersonalLanding` missing, unpublished, or `sections[]` empty
- Fix: publish the entry and ensure `sections[]` contains the section entries

### Article 404

- Wrong route prefix or slug mismatch
- Fix: confirm route prefix (`/articles`) and the article’s `slug` field

### Missing nested references

- Include depth too low or referenced entries unpublished
- Fix: increase `include` depth in fetch logic and publish referenced entries

---

## Content Modeling Notes

- Internal navigation should prefer **references over hard-coded URLs**:

  - `projectLink.article` (internal) wins over `projectLink.url` (external)
- Rich Text is intentionally guarded; the renderer supports a minimal set of nodes.
- Slugs are treated as stable identifiers once published.

---

## Safety & Publishing

- Secrets: `.env`, `.env.*` are gitignored; commit `.env.example` only.
- Audit: search for credentials before pushing:

  ```bash
  rg -i "secret|token|password|apikey"
  ```

- Dependencies: lockfile is `package-lock.json`.
- Docs are tracked and safe to publish (no env values in docs).

---

## Contributing

This is a public, open-source project. Contributions are welcome!

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Development guide, code standards, PR process
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** — Community guidelines
- **[SECURITY.md](SECURITY.md)** — Security policy and vulnerability reporting
- **[SUPPORT.md](SUPPORT.md)** — Getting help and support

### Quick Start for Contributors

```bash
# Fork, clone, and set up
git clone https://github.com/YOUR-USERNAME/gilbertoaharo.git
cd gilbertoaharo
npm install
cp .env.example .env.local
# Add your Contentful credentials to .env.local

# Make changes and test
npm run dev
npm run lint
npm run build

# Submit a PR!
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for full details.

---

## Docs

- `docs/architecture/ia.md` — Information architecture & content mapping
- `docs/content/editorial-guidelines.md` — writing/SEO/link rules
- `docs/design-system/design-system.md` — UI primitives and component patterns
- `docs/planning/storybook-migration-plan.md` — Storybook architecture + migration checklist

## Design System Roadmap

Near-term plan for evolving the design system; see `docs/planning/storybook-migration-plan.md`.

- Storybook workspace for tokens, primitives, sections, and docs.
- Foundational stories: tokens, typography, and layout primitives.
- Primitive stories with args/controls and basic a11y checks.
- Section stories driven by fixture data in `src/content/static/fixtures.ts`.
- Optional page-level stories (PageShell, LandingPage) for layout review.
- Quality gates: `@storybook/test-runner` for key stories and `build-storybook` in CI.
