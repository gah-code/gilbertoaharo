# Design System

## Design System — gilbertoaharo

This document defines the **foundation** for building UI in `gilbertoaharo`:

- consistent primitives (typography, spacing, layout)
- predictable composition patterns (sections, cards, lists)
- clean seams between **Contentful content** and **frontend components**
- accessible, testable, maintainable UI conventions

It is intentionally minimal on styling. The goal is a strong skeleton you can grow.

---

## 1) Principles

### 1.1 Content-driven, layout-agnostic

Content models describe **meaning**, not layout. The UI owns layout decisions:

- Contentful provides: `title`, `slug`, `sections[]`, `projects[]`, `article.body`
- UI provides: grids, columns, breakpoints, spacing, visual hierarchy

### 1.2 Primitives first, sections second

- `components/ui/*` are **primitives**
- `components/sections/*` are **compositions**
- `pages/*` are thin orchestration layers (fetch → map → render)

### 1.3 CMS boundary is sacred

UI components should not know Contentful shapes.

- Contentful → `content/contentful/api.ts` (fetch)
- Contentful → `content/contentful/adapters.ts` (map)
- UI consumes adapter outputs and stable types

### 1.4 Accessibility is default

Every primitive must ship with:

- keyboard support
- visible focus
- semantic HTML
- appropriate color contrast (even in minimal styling)

---

## 2) Tokens

Tokens live in `src/styles/tokens.css`.

### 2.1 Token naming

Use `--{category}-{scale}`:

- `--space-1`, `--space-2`, …
- `--font-size-1`, `--font-size-2`, …
- `--radius-1`, `--radius-2`, …
- `--color-text`, `--color-muted`, …

### 2.2 Minimal token set (current baseline)

Recommended baseline tokens:

- Typography:
  - `--font-sans`
  - `--font-size-1..6`
  - `--line-height-body`, `--line-height-heading`
- Color:
  - `--color-bg`, `--color-surface`
  - `--color-text`, `--color-muted`
  - `--color-border`, `--color-link`
- Spacing:
  - `--space-1..10`
- Radius + shadow:
  - `--radius-1..3`
  - `--shadow-1`

### 2.3 Base styles

Base styles live in `src/styles/base.css` and should:

- import tokens
- set global typography
- set safe defaults for headings, paragraphs, links
- set consistent box-sizing
- define focus outlines

---

## 3) Layout System

### 3.1 Container

Use a single container rule across the app:

- max-width + responsive padding
- keeps line-length readable
- prevents section-level components from reinventing layout

**Component:** `components/ui/Container.tsx`

**Guideline:** Never hardcode page width in sections. Always wrap section content in `Container`.

### 3.2 Stack

Vertical rhythm is driven by spacing scale. Most layouts are stacks.
**Component:** `components/ui/Stack.tsx`

**Guideline:** Prefer Stack over manual `margin-bottom`.

### 3.3 Section shell

All sections use `SectionShell` to standardize:

- anchor id
- section spacing
- title rendering
- consistent landmark semantics

**Component:** `components/sections/SectionShell.tsx`

---

## 4) Typography System

Typography primitives:

- `Heading` (H1–H4)
- `Text` (body and supporting text)

### 4.1 Heading rules

- H1 appears once per page (Landing: can be Hero title; Article: article title)
- Rich text body must not emit H1
- Use H2 for major content sections, H3/H4 for sub-sections

### 4.2 Text rules

- Default body should target readability:
  - comfortable line-height
  - max line width via Container
- `muted` variant for secondary metadata:
  - dates
  - roles
  - location
  - tags

---

## 5) Primitives (UI components)

Primitives live in `src/components/ui/*` and must be:

- small
- predictable
- content-agnostic
- style-token driven (no hard-coded colors)

### 5.1 Required primitives

- `Container` — page width + padding
- `Stack` — vertical spacing layout
- `Heading` — typography headings
- `Text` — typography body
- `Link` — internal/external safe anchor
- `Button` — CTA UI (render as `<button>` or `<a>`)
- `Card` — surface container
- `Badge` — label/chip

### 5.2 Primitive API conventions

- Prefer `variant` props over multiple components.
- Prefer boolean semantics:
  - `muted`, `inline`, `fullWidth`
- Avoid passing raw className everywhere. Keep className optional, but rely on variants.

---

## 6) Composition Patterns (Section-level)

Sections live in `components/sections/*`.

### 6.1 SectionRenderer contract

`SectionRenderer` selects section components based on Contentful section type IDs:

- `sectionHero`
- `sectionTimeline`
- `sectionSkills`
- `sectionProjects`
- `sectionLearning`
- `sectionContact`

**Rule:** Section components render only what the section describes, not global layout.

### 6.2 Recommended patterns

- Hero:
  - main title + tagline + intro
  - primary/secondary actions
  - highlights list
- Timeline:
  - list of `timelineItem` entries
  - badges for `kind` and tags
- Skills:
  - groups as cards
  - skills as list or chip rows
- Projects:
  - Project cards
  - Links resolved by adapter logic
- Learning:
  - list of learning items with status badges
- Contact:
  - email CTA + social links

---

## 7) Link + CTA Rules (Internal vs External)

### 7.1 Internal link resolution

Internal “Read more” links are resolved through references:

- `projectLink.article` → build `/articles/:slug`
- fallback: `projectLink.url`

**Rule:** Route prefixes are owned by code, not content.

### 7.2 Analytics labeling

CTA components should accept `analyticsLabel` (string). Use it for:

- click tracking
- event naming conventions

Fallback if missing:

- use label text

---

## 8) Rich Text Rendering

Rich text lives in `components/rich-text/RichTextRenderer.tsx`.

### 8.1 Controlled renderer

The renderer should map allowed node types to primitives:

- paragraph → `Text`
- heading-2/3/4 → `Heading`
- list → semantic `<ul>/<ol>`
- quote → `<blockquote>`
- hyperlink → `Link`
- embedded-asset → `Media` (future enhancement)

### 8.2 Safety defaults

Unknown node types should:

- render nothing (safe) OR
- render a debug placeholder in development only

---

## 9) SEO System

SEO logic lives in `components/layout/SeoHead.tsx`.

### 9.1 SEO contract

Each page supplies:

- title
- description (optional)
- canonicalUrl (optional)

### 9.2 Fallback rules (Article)

- title: `metaTitle ?? title`
- description: `metaDescription ?? excerpt ?? first paragraph of body`
- canonical: `canonicalUrl ?? siteUrl + /articles/:slug`

---

## 10) Preview Mode (Draft content)

Preview mode lives in `src/preview/*`.

### 10.1 Requirements

- visible banner when preview is active
- easy disable/enable locally via env flags
- separate Contentful host/token when preview is active

---

## 11) Testing / Quality Gates (Lean)

Recommended minimum:

- Render tests for each section component
- Adapter tests for:
  - `resolveProjectLink`
  - `mapLandingPage`
  - `mapArticlePage` SEO fallbacks
- `/debug` route exists for validation of seeded models

---

## 12) File ownership map (where changes belong)

- Design tokens and global styles:
  - `src/styles/tokens.css`
  - `src/styles/base.css`

- Primitives:
  - `src/components/ui/*`

- Composition patterns:
  - `src/components/sections/*`

- CMS and data shape:
  - `src/content/contentful/types.ts`
  - `src/content/contentful/api.ts`
  - `src/content/contentful/adapters.ts`

- Route structure and matching:
  - `src/router/*`

- Page orchestration:
  - `src/pages/*`

---

## 13) Implementation checklist (to grow the system safely)

1) Lock tokens (even if minimal)
2) Implement primitives with stable props
3) Implement SectionShell + SectionRenderer
4) Implement adapter functions and keep them unit-tested
5) Implement RichTextRenderer mappings incrementally
6) Add PreviewBanner + debug route
7) Only then iterate on visual polish

---
