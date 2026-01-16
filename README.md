
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
├─ tsconfig.tsbuildinfo       # TypeScript incremental build cache (generated)
├─ vite.config.ts             # Vite dev/build config (aliases, plugins, tests)
│
├─ public/                    # Static assets copied as-is to build output
│  ├─ _redirects              # SPA redirect rules (Netlify-style hosting)
│  └─ vite.svg                # Example static asset
│
└─ src/                       # Application source
   ├─ main.tsx                # React entry point (mounts <App />)
   ├─ App.tsx                 # Root app component (router + global wiring)
   ├─ App.css                 # Legacy Vite starter styles (currently unused)
   ├─ index.css               # Legacy Vite global styles (currently unused)
   ├─ env.ts                  # Centralized env parsing + defaults (fail-fast)
   ├─ vite-env.d.ts           # Vite/TS env type declarations
   │
   ├─ assets/                 # Bundled app assets (imported by JS/TS)
   │  └─ react.svg
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

Copy `.env.example` to `.env.local` (recommended) and fill in your values:

```bash
cp .env.example .env.local
```

Required:

- `VITE_CONTENTFUL_SPACE_ID`
- `VITE_CONTENTFUL_DELIVERY_TOKEN`
- `VITE_CONTENTFUL_ENVIRONMENT` (defaults to `master`)

Recommended:

- `VITE_ARTICLE_ROUTE_PREFIX` (defaults to `/articles`)
- `VITE_SITE_URL` (absolute URL for canonical fallbacks)

Optional (if you support draft preview later):

- `VITE_CONTENTFUL_USE_PREVIEW`
- `VITE_CONTENTFUL_PREVIEW_TOKEN`

> Never commit `.env.local` or tokens. Commit `.env.example` only.

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

## Docs

- `docs/ia.md` — Information architecture & content mapping
- `docs/editorial-guidelines.md` — writing/SEO/link rules
- `docs/design-system.md` — UI primitives and component patterns
- `docs/storybook-migration-plan.md` — Storybook architecture + migration checklist

## Design System Roadmap

Near-term plan for evolving the design system; see `docs/storybook-migration-plan.md`.

- Storybook workspace for tokens, primitives, sections, and docs.
- Foundational stories: tokens, typography, and layout primitives.
- Primitive stories with args/controls and basic a11y checks.
- Section stories driven by fixture data in `src/content/static/fixtures.ts`.
- Optional page-level stories (PageShell, LandingPage) for layout review.
- Quality gates: `@storybook/test-runner` for key stories and `build-storybook` in CI.
