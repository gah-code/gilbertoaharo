This document captures the current UI foundations, layout rules, and components used by the landing experience. It is derived from the code in `src/styles/tokens.css`, `src/styles/layout.css`, `src/index.css`, and the section components in `src/components/sections`.

## 1. Foundations

### 1.1 Color tokens (do not change without intent)

Defined in `src/styles/tokens.css`.

- `--color-bg: #f7f3ea` (warm paper background)
- `--color-surface: #fffdf8` (cards and raised surfaces)
- `--color-surface-2: #f2ede2` (raised chips/badges)
- `--color-accent: #0b2a6f` (deep navy accent)
- `--color-accent-soft: #dde6fb` (soft accent wash)
- `--color-text: #111827` (primary text)
- `--color-muted: #4b5563` (muted text)
- `--color-border: #8f887e` (higher-contrast borders)
- `--color-border-subtle: rgba(17, 24, 39, 0.08)` (hairline dividers)
- `--color-text-primary: var(--color-text)`
- `--color-text-muted: var(--color-muted)`
- `--color-focus-ring: #7aa2ff` (focus outline)

### 1.2 Typography tokens

Defined in `src/styles/tokens.css`.

- `--font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`
- `--font-size-xs: 0.75rem`
- `--font-size-sm: 0.875rem`
- `--font-size-base: 1rem`
- `--font-size-lg: 1.125rem`
- `--font-size-xl: 1.5rem`
- `--font-size-2xl: 2rem`
- `--font-size-3xl: 2.5rem`

### 1.3 Spacing scale (4px base)

Defined in `src/styles/tokens.css`.

- `--space-1: 0.25rem`
- `--space-2: 0.5rem`
- `--space-3: 0.75rem`
- `--space-4: 1rem`
- `--space-6: 1.5rem`
- `--space-8: 2rem`
- `--space-10: 2.5rem`
- `--space-12: 3rem`
- `--space-16: 4rem`

### 1.4 Radius and shadow

Defined in `src/styles/tokens.css`.

- `--radius-sm: 0.25rem`
- `--radius-md: 0.5rem`
- `--radius-lg: 1rem`
- `--radius-pill: 999px`
- `--shadow-soft: 0 18px 40px rgba(17, 24, 39, 0.1)`

### 1.5 Layout density tokens

Defined in `src/styles/tokens.css`.

- `--content-max: 1040px` (content column width)
- `--section-pad-y: clamp(var(--space-10), 6vw, var(--space-16))` (section vertical padding)
- `--section-pad-x: clamp(var(--space-4), 4vw, var(--space-12))` (section horizontal padding)
- `--stack-gap: var(--space-12)` (vertical rhythm between blocks)
- `--heading-gap: var(--space-3)` (default gap under h3s)
- `--heading-mb: var(--space-6)` (default gap under h2s)
- `--lede-max: 62ch` (lede text width cap)

## 2. Global layout rules

Defined in `src/styles/layout.css` and `src/index.css`.

- `box-sizing: border-box` across all elements.
- Full-height root: `html`, `body`, `#root` are 100% height.
- Body: uses `var(--font-sans)`, `line-height: 1.55`, `background: var(--color-bg)`, and `color: var(--color-text)`.
- Headings: `h1, h2` use `line-height: 1.12` with `letter-spacing: -0.02em`; `.section h2` uses `margin-bottom: var(--heading-mb)` and `.section h3` uses `margin-bottom: var(--heading-gap)`.
- Lede spacing: `.section h2 + p` uses `margin-bottom: var(--space-8)` and caps width at `--lede-max` with muted color.
- Content width: `.section`, `.page-header-inner`, and `.container` are capped at `max-width: var(--content-max)` and centered with auto margins.
- Section spacing: `.section` uses `padding: var(--section-pad-y) var(--section-pad-x)`.
- Section separation: `.section + .section` keeps a subtle border and resets top spacing to `padding-top: var(--space-10)` (no added margin).

## 3. Accessibility and interaction

- Skip link: `.skip-link` appears on focus and jumps to `#main-content`.
- Focus styling: `a:focus-visible` and `button:focus-visible` use `--color-focus-ring`.
- Sticky header: `.page-header` is `position: sticky; top: 0` with blur and gradient background.

## 4. Components

### 4.1 Header and navigation

Markup is in `src/components/layout/Page.tsx`.

- `.page-header` is sticky and blurred with a gradient background.
- `.page-header-inner` aligns logo and nav, max-width `var(--content-max)`.
- `.logo` is a 2rem circular badge.
- `.page-nav` is a horizontal list with muted links and hover highlight.

### 4.2 Buttons

Defined in `src/styles/layout.css`.

- Base: `.button` sets padding, pill radius, and text size.
- Primary: `.button-primary` uses `--color-accent` with dark text.
- Secondary: `.button-secondary` is transparent with border.

### 4.3 Pills (badges)

- `.pill` is a small bordered badge with `--radius-pill` and `--font-size-xs`.
- Used for projects "Featured" and learning status.

### 4.4 Cards (shared surface)

Base card styles (background, border, shadow):

- `.card` (utility)
- `.timeline-card`
- `.project-card`
- `.learning-item`

All share: `background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `box-shadow: var(--shadow-soft)`.

### 4.5 Hero section

Markup in `src/components/sections/HeroSection.tsx`.

Variants:

- `hero--typographic` (default)
- `hero--avatar`
- `hero--image`

Key styles:

- Title: `.hero-title` uses `--font-size-3xl`.
- Tagline: `.hero-tagline` uses `--font-size-lg` and muted color.
- Actions: `.hero-actions` wraps buttons.
- Highlights: `.hero-highlights` is a list with muted text.
- Avatar: `.hero-avatar` is a 10rem circle with border.
- Image: `.hero-image` is capped at 24rem width.

### 4.6 Timeline section (Experience)

Markup in `src/components/sections/TimelineSection.tsx`.

Structure:

- `.timeline` wraps section heading and list.
- `.timeline-list` is a grid with generous vertical gaps.
- `.timeline-item` is a two-column grid: text card + media.
- `.timeline-card` contains title, org, meta, summary, highlights.
- `.timeline-media` renders local SVGs (see `src/assets/timeline`).

Alternating layout:

- Even items swap order using `.timeline-item:nth-child(even)`.

Typography:

- Title: `h3` uses `--font-size-lg`.
- Meta: `.timeline-meta` uses `--font-size-xs`.
- Summary and highlights use `--font-size-sm`.

Media:

- SVGs are currently static and mapped by index in `TimelineSection`.
- Images are padded and framed with border + shadow to match cards.

Spacing:

- Default timeline list gap uses `--space-10`; cards use `--space-4` padding.
- Small screens tighten media width to ~88% while keeping cards and media centered with reduced padding (`section-timeline` uses inline `--space-4`, block `--space-8`).

Responsive layout:

- Mobile-first single column with images shown first, generous but tidy padding, stacked meta, tightened media width (~88%), and reduced section padding for small screens (~360–480px).
- Tablet (≥768px) switches to a two-column grid (~55/45 split) and restores alternating order.
- Desktop (≥1024px) increases spacing and allows larger media (up to 28rem) to balance cards and illustrations.

Content model note (future CMS control):

- Timeline items currently have no image/CTA fields in Contentful.
- To enable CMS-controlled illustrations and CTAs, add fields to the Timeline Item model:
  - `mediaImage` (Asset)
  - `mediaAlt` (Text)
  - `ctaLabel` (Text, optional)
  - `ctaUrl` (Text/URL, optional)
- If you do not update the model, keep using static/local images in code for the two-column layout.

### 4.7 Projects section

Markup in `src/components/sections/ProjectsSection.tsx`.

- `.projects-grid` is a responsive grid with `minmax(260px, 1fr)`.
- `.project-card` is a base card.
- `.project-meta` is a small muted row for role and period.
- `.project-link` is accent colored with stronger weight.

### 4.8 Skills section

Markup in `src/components/sections/SkillsSection.tsx`.

- `.skills-groups` grid uses `minmax(240px, 1fr)` with `gap: var(--space-4)`.
- Group headings are uppercase label-style.
- Each skill row uses `.skill-row` to align name and badge, ledger padding with dividers, and a muted keywords line.

### 4.9 Learning section

Markup in `src/components/sections/LearningSection.tsx`.

- `.learning-list` uses a compact grid.
- `.learning-item` is a small card with `--radius-md`.
- `.learning-link` uses `--color-accent`.

### 4.10 Contact section

Markup in `src/components/sections/ContactSection.tsx`.

- `.contact-intro` is limited to 38rem width.
- `.contact-links` wraps buttons and links.

## 5. Page structure

The landing page is defined in `src/components/layout/Page.tsx`.

- Header + nav at the top.
- Sections rendered in order via `SectionRenderer`:
  - Hero
  - Timeline
  - Skills
  - Projects
  - Learning
  - Contact
- Section anchors map to nav links (`#experience`, `#skills`, `#projects`, etc).

## 6. Responsive behavior

Defined in `src/styles/layout.css`.

- `min-width: 768px`: hero layouts become side-by-side; timeline switches to two-column with alternating order.
- `min-width: 1024px`: timeline list and item gaps increase; media can scale larger.
- `max-width: 640px`: header stacks vertically; section padding reduces to `--space-8` with `padding-inline: var(--space-4)`; hero title/tagline scale down (`--font-size-2xl` / `--font-size-base`).
- `max-width: 480px`: timeline padding tightens (`padding-inline: var(--space-4)`, `padding-block: var(--space-8)`), media width tightens to ~88%.
- `max-width: 420px`: skills badge stacks under the name inside `.skill-row`.

## 7. Content and assets

- Primary content comes from Contentful where available; static fallback exists in `src/data/page-personal-landing.ts`.
- Timeline media is currently local (static) and located at:
  - `src/assets/timeline/timeline-search.svg`
  - `src/assets/timeline/timeline-journey.svg`
  - `src/assets/timeline/timeline-creative.svg`
- Mapping is index-based in `src/components/sections/TimelineSection.tsx`.

## 8. Implementation references

- Tokens: `src/styles/tokens.css`
- Layout and components: `src/styles/layout.css`
- Global baseline: `src/index.css`
- Section components: `src/components/sections`
- Page layout: `src/components/layout/Page.tsx`

## 9. Usage guidelines

- Always use token values for spacing, type, and color.
- Prefer existing component classes before adding new ones.
- Keep cards consistent with `--color-surface`, `--color-border`, and `--shadow-soft`.
- When adding new timeline items, update media assets or mapping to avoid empty media slots.

---

## Hero Design Spec

Source of truth: `src/components/sections/HeroSection.tsx`, `src/styles/layout.css`, `src/styles/tokens.css`
Placement: Rendered inside `<section class="section section-hero">` via `src/components/sections/SectionRenderer.tsx`
Container: `.hero` wraps main copy + optional media

Anatomy

- Section heading: `<h1>` inside `.hero-main` with class `.hero-title`
- Eyebrow: optional `<p class="hero-eyebrow">`
- Tagline: `<p class="hero-tagline">`
- Intro: `<p class="hero-intro">`
- Actions: `<div class="hero-actions">` containing `.button` links
- Highlights: `<ul class="hero-highlights">` (optional)
- Media: `.hero-side` containing `.hero-avatar` or `.hero-image`

Layout + Spacing

- Section container: `.section` uses `padding: var(--section-pad-y) var(--section-pad-x)` with `max-width: var(--content-max)`, centered.
- Hero layout: `.hero` is column layout with `gap: var(--space-8)`; switches to row at `min-width: 768px` with `gap: var(--space-10)`
- Actions: `.hero-actions` uses `gap: var(--space-3)` and wraps

Typography

- Eyebrow: `--font-size-sm`, uppercase, `letter-spacing: 0.12em`
- Title: `.hero-title` uses `--font-size-3xl` (reduces to `--font-size-2xl` at `max-width: 640px`)
- Tagline: `.hero-tagline` uses `--font-size-lg` (reduces to `--font-size-base` at `max-width: 640px`)
- Intro: `.hero-intro` uses `--font-size-base`, `line-height: 1.6`

Color + Surface

- Eyebrow and primary accents use `--color-accent`
- Tagline uses `--color-text-muted`
- Avatar/image frames use `--color-border` and `--shadow-soft`

Responsive

- `min-width: 768px`: `.hero` switches to side-by-side layout
- `max-width: 640px`: title and tagline scale down for readability

---

## Timeline Design Spec

Source of truth: `src/components/sections/TimelineSection.tsx`, `src/styles/layout.css`, `src/styles/tokens.css`
Placement: Rendered inside `<section class="section section-timeline">` via `src/components/sections/SectionRenderer.tsx`
Container: `.timeline` wraps section heading + list

Anatomy

- Section heading: `<h2>` inside `.timeline` (also inherits `.section h2` rhythm)
- List: `<ol class="timeline-list">`
- Item: `<li class="timeline-item">`
- Item card: `.timeline-card` wrapping text content
- Item header: `.timeline-item-header` containing `<h3>` and optional `.timeline-org`
- Meta line: `.timeline-meta` containing date range and optional `.timeline-location`
- Summary: `.timeline-summary` (optional)
- Highlights: `.timeline-highlights` list (optional)
- Media: `.timeline-media` containing a local SVG `<img>`

Layout + Spacing

- Section container: `.section` uses `padding: var(--section-pad-y) var(--section-pad-x)`, `max-width: var(--content-max)`, centered; adjacent sections keep a subtle top border and add `padding-top: var(--space-10)` without margin.
- Timeline list: `display: grid`, `gap: var(--space-10)`, list-style removed, zero padding/margin in `src/styles/layout.css`
- Item: mobile-first single column with `gap: var(--space-4)`; `min-width: 768px` switches to two-column (`1.1fr / 0.9fr`) with `gap: var(--space-6)` and alternating order on even items; `min-width: 1024px` bumps list gap to `var(--space-12)` and item gap to `var(--space-8)`
- Card: `padding: var(--space-4)` (mobile tightens to `calc(var(--space-3) + var(--space-1))`), `border-radius: var(--radius-lg)` in `src/styles/layout.css`
- Item header: `display: flex`, `flex-wrap: wrap`, `gap: var(--space-2)`, `align-items: baseline`, `margin-bottom: var(--space-1)` in `src/styles/layout.css`
- Meta line: `display: flex`, `flex-wrap: wrap`, `gap: var(--space-2)`, `margin-bottom: var(--space-2)` in `src/styles/layout.css`
- Summary: `margin: 0 0 var(--space-2)` in `src/styles/layout.css`
- Highlights list: `padding-left: 1.25rem`, `margin: 0`, `list-style: disc` in `src/styles/layout.css`

Typography

- Heading (h2): `margin: 0 0 var(--heading-mb)` in `.timeline h2` and `.section h2` (`src/styles/layout.css`)
- Item title (h3): `font-size: var(--font-size-lg)`, `margin: 0` in `.timeline-item-header h3` (`src/styles/layout.css`)
- Org name: `font-size: var(--font-size-sm)` in `.timeline-org` (`src/styles/layout.css`)
- Meta line: `font-size: var(--font-size-xs)` in `.timeline-meta` (`src/styles/layout.css`)
- Summary + highlights: `font-size: var(--font-size-sm)` in `.timeline-summary`, `.timeline-highlights` (`src/styles/layout.css`)

Color + Surface

- Card surface: `background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `box-shadow: var(--shadow-soft)` in `.timeline-card` (`src/styles/layout.css`)
- Media frame: `.timeline-media img` uses the same surface, border, and shadow
- Muted text: `.timeline-org`, `.timeline-meta`, `.timeline-highlights` set to `color: var(--color-text-muted)` which aliases `--color-muted` in `src/styles/tokens.css`

Tokens (used by timeline)

- Colors: `--color-surface #fffdf8`, `--color-border #8f887e`, `--color-text #111827`, `--color-muted #4b5563`, `--color-text-muted → --color-muted` in `src/styles/tokens.css`
- Typography: `--font-size-xs 0.75rem`, `--font-size-sm 0.875rem`, `--font-size-lg 1.125rem` in `src/styles/tokens.css`
- Spacing: `--space-1 0.25rem`, `--space-2 0.5rem`, `--space-4 1rem`, `--space-12 3rem` in `src/styles/tokens.css`
- Radius + shadow: `--radius-lg 1rem`, `--shadow-soft 0 18px 40px rgba(17, 24, 39, 0.1)` in `src/styles/tokens.css`

Responsive

- Section padding: Default clamp via tokens; at `max-width: 640px`, `.section` overrides to `padding-block: var(--space-8)` and `padding-inline: var(--space-4)`; timeline further tightens to `padding-inline: var(--space-4)`, `padding-block: var(--space-8)` at ≤480px.
- Timeline layout: Mobile-first single column; media width tightens to ~88% at ≤480px; tablet (≥768px) switches to two-column with alternating order; desktop (≥1024px) increases list/item gaps and media size.

---

## Skills Design Spec

Source of truth: `src/components/sections/SkillsSection.tsx`, `src/styles/layout.css`, `src/styles/tokens.css`
Placement: Rendered inside `<section class="section section-skills">` via `src/components/sections/SectionRenderer.tsx`
Container: `.skills` wraps heading and skill groups

Anatomy

- Section heading: `<h2>`
- Groups container: `.skills-groups`
- Group: `.skills-group` with `<h3>`
- List: `.skills-group ul` with skill items and optional `.skill-row` wrapper
- Labels: `.skill-name`, `.skill-level`, `.skill-keywords`

Layout + Spacing

- Groups grid: `.skills-groups` uses `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))` with `gap: var(--space-4)`
- Group title: `.skills-group h3` is uppercase with `letter-spacing: 0.08em`, `font-size: var(--font-size-sm)`, `color: var(--color-muted)`, `margin-bottom: var(--space-2)`
- Group list: `.skills-group ul` is a column flex stack (no gap) that renders ledger rows
- Row: `.skills-group ul li` uses `padding-block: var(--space-2)`, `border-bottom: 1px solid var(--color-border-subtle)`, and a small vertical gap
- Row layout: `.skill-row` is a two-column grid (`1fr auto`) with `gap: var(--space-2)`; it stacks to a single column at `max-width: 420px`

Typography

- Skill name: `.skill-name` uses `font-weight: 600` and is the primary line
- Skill level badge: `.skill-level` uses `--font-size-xs`, uppercase, `letter-spacing: 0.08em`, `font-weight: 700`, and pill radius
- Keywords: `.skill-keywords` are block-level, `font-size: var(--font-size-sm)`, and rendered as a meta line joined with `" · "`

Color + Surface

- Muted text for `.skill-level` and `.skill-keywords` uses `--color-muted`
- Badges: `.skill-level` uses `background: var(--color-surface-2)`, `border: 1px solid var(--color-border-subtle)`, `color: var(--color-text)`; level nuance via `data-level` (`working` lowers opacity, `strong` uses `--color-border`, `expert` uses `--color-accent` for the border)

Responsive

- Grid automatically stacks via `auto-fit`; badge and name stack inside `.skill-row` at ≤420px to prevent collisions

---

## Projects Design Spec

Source of truth: `src/components/sections/ProjectsSection.tsx`, `src/styles/layout.css`, `src/styles/tokens.css`
Placement: Rendered inside `<section class="section section-projects">` via `src/components/sections/SectionRenderer.tsx`
Container: `.projects` wraps heading and grid

Anatomy

- Section heading: `.section-heading` with `<h2>` and optional `.pill`
- Grid: `.projects-grid`
- Item: `.project-card`
- Metadata: `.project-meta`
- Tech: `.project-tech`
- Links: `.project-links` containing `.project-link`

Layout + Spacing

- Grid: `display: grid`, `gap: var(--space-4)`, `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`
- Card: `padding: var(--space-4)`, `border-radius: var(--radius-lg)` and shared surface styles
- Links: `.project-links` uses a flex row with wrap and `gap: var(--space-2)`

Typography

- Tagline and tech: `--font-size-sm` with muted color
- Meta: `.project-meta` uses `--font-size-sm` and muted color
- Summary: `.project-summary` uses `line-height: 1.5`

Color + Surface

- `.project-card` uses surface + border + shadow tokens
- `.project-link` uses `--color-accent`

Responsive

- Grid collapses naturally using `auto-fit` with min width of 260px

---

## Learning Design Spec

Source of truth: `src/components/sections/LearningSection.tsx`, `src/styles/layout.css`, `src/styles/tokens.css`
Placement: Rendered inside `<section class="section section-learning">` via `src/components/sections/SectionRenderer.tsx`
Container: `.learning` wraps heading and list

Anatomy

- Section heading: `<h2>`
- List: `.learning-list`
- Item: `.learning-item`
- Header: `.learning-item-header` with `<h3>` and optional `.pill`
- Description: `.learning-description`
- Link: `.learning-link`

Layout + Spacing

- List: `display: grid`, `gap: var(--space-3)`
- Item: `padding: var(--space-3)`, `border-radius: var(--radius-md)`
- Header: `display: flex`, `gap: var(--space-2)`, `margin-bottom: var(--space-2)`

Typography

- Description: uses muted color and default body size
- Link: styled as accent text

Color + Surface

- `.learning-item` uses surface + border tokens
- `.learning-link` uses `--color-accent`

Responsive

- Grid stacks by default; no special breakpoints

---

## Contact Design Spec

Source of truth: `src/components/sections/ContactSection.tsx`, `src/styles/layout.css`, `src/styles/tokens.css`
Placement: Rendered inside `<section class="section section-contact">` via `src/components/sections/SectionRenderer.tsx`
Container: `.contact` wraps heading, intro, and CTAs

Anatomy

- Section heading: `<h2>`
- Intro: `.contact-intro`
- CTAs: `.contact-links` with `.button` items

Layout + Spacing

- Intro width: `.contact-intro` uses `max-width: 38rem` with `line-height: 1.6`
- CTA row: `.contact-links` uses flex wrap and `gap: var(--space-2)`

Typography

- Intro uses default body size with muted color

Color + Surface

- Buttons use standard primary/secondary styles

Responsive

- Buttons wrap automatically with flex on small screens
