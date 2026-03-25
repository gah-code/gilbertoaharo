# Components

**Purpose:** Current components, props/variants, and where their styles live.

## Primitives (`src/components/ui`)
- **Button** (`Button.tsx`): accent-filled by default; renders `<a>` when `href` provided; inline token styles; gaps/padding/radius from tokens; needs focus-visible + variants work.
- **Link** (`Link.tsx`): safe external rel handling; inherits color; no custom focus yet.
- **Card** (`Card.tsx`): surface/border/shadow via tokens; inline styles.
- **Heading** (`Heading.tsx`): levels 1–6; optional `weight`; font size/line-height from tokens.
- **Text** (`Text.tsx`): body text with `muted` option.
- **Badge** (`Badge.tsx`): pill label using token radius/padding.
- **Stack** (`Stack.tsx`): vertical layout with `gap` prop.
- **Container** (`Container.tsx`): max width `--content-max`, side padding `--section-pad-x`, `as` prop.

## Layout (`src/components/layout`)
- **PageShell**: wraps page with `SeoHead`, `Header`, and `main#main-content` Container.
- **Header**: loads navigation menu via `getContentSource().getNavigationMenu()`, renders brand + skip link + `ResponsiveNav`; placeholder text while loading/error.
- **SeoHead**: title/description/canonical meta.

## Navigation (`src/components/navigation`)
- **ResponsiveNav.tsx**: desktop mega panels + mobile drawer; breakpoint from CMS (`menu.mobileBreakpointPx`); uses `Navigation.css` for styling (sticky header, panels, drawer, accordions, CTA).
- **Navigation.css**: tokenized spacing/color/shadow; breakpoint tweaks at `max-width: 960px`; needs focus-visible/motion tokens.

## Sections (`src/components/sections`)
- **SectionShell**: standard section wrapper (Container + Stack, optional anchorId).
- **HeroSection**: inline CSS grid; supports `heroStyle` avatar/image/typographic; actions rendered with Button; media framed via `MediaFrame`; proof points list.
- **TimelineSection**: uses `TimelineSection.css`; classes `timeline`, `timeline-list`, `timeline-item`, `timeline-item--flip`, `timeline-card*`, `timeline-card__media-frame`; breakpoints at 640/768/1024; fallback SVGs from `src/assets/timeline/*` when CMS media missing.
- **SkillsSection**: inline auto-fit grid (`minmax(280px,1fr)`), ledger rows, level pill, muted keywords.
- **ProjectsSection**: stack of Cards; tech badges; CTA Buttons from resolved links (`resolveProjectLink`).
- **LearningSection**: Card list with topic, description, status Badge, optional Link.
- **ContactSection**: heading, intro, mailto, and link row.
- **RichTextRenderer** (`components/rich-text`): controlled mapping for headings 2–4, lists, blockquote, links (noopener), embedded assets; no code block styling yet.
- **Section primitives** (`components/sections/primitives/*`): `SectionHeader`, `ProofList`, `MediaFrame`, `ActionGroup` used by Hero and other sections; all token-based inline styles.

## Pages (`src/pages`)
- **LandingPage**: fetches landing via `getContentSource`, renders SectionRenderer.
- **ArticlePage** + `ArticlePage.css`: handles SEO, hero image, rich text, attachments, date meta.
- **DebugPage**, **NotFoundPage**: simple route views.

## Stylesheets (colocated)
- `src/components/navigation/Navigation.css`
- `src/components/sections/TimelineSection.css`
- `src/pages/ArticlePage.css`
- Globals: `src/styles/base.css`, `src/styles/tokens.css`

## Known gaps / risks
- Missing motion + breakpoint tokens; easing/durations are one-off per component.
- Focus-visible states not bespoke for nav/drawer/buttons/links.
- Lint backlog: `no-explicit-any` occurrences across UI/content and one unused var in `staticSource.ts`.
- RichTextRenderer still lacks code-block styling and link focus states.
