
# Gilberto A. Haro — Personal Site (SPA)

Single-page **React + TypeScript + Vite** site powered by **Contentful**.  
The landing page is composed from modular CMS sections, and article pages render deep dives with Rich Text.

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
