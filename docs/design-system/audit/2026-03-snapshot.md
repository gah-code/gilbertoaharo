# Design System Snapshot Audit

## 1. Executive Summary

The system has a healthy token foundation (color/type/spacing/radius/shadow/layout) and a responsive nav/hero/timeline already in use. Gaps cluster around interaction quality: no motion or breakpoint tokens, focus/hover/active states are inconsistent, and prefers‑reduced‑motion is absent. Contentful is mid-migration: hero is normalized, but fixtures and other sections are not. Documentation exists, yet Storybook and automated QA are missing. Immediate wins: tokenize breakpoints/motion, ship a real button variant API, align fixtures to the new hero model, and add focus + reduced‑motion handling across nav/buttons.

## 2. Maturity Scorecard

| Area | Status | Confidence | Notes |
|------|--------|------------|-------|
| Discovery | Not started | Medium | No goals/SLOs, user journeys, or test targets captured. |
| Foundations | Established (no motion/breakpoints) | High | Color/type/spacing/radius/shadow/layout tokens in `src/styles/tokens.css`; motion + breakpoint tokens missing. |
| Navigation | Solid structure, QA pending | High | Desktop dropdowns + mobile drawer (`Header.tsx`, `ResponsiveNav.tsx`, `Navigation.css`); needs focus + motion polish. |
| Sections | Mixed | High | Hero/timeline built; Skills/Projects/Learning/Contact unreviewed. |
| Content Modeling | Partial | High | Hero normalized; fixtures now aligned; other sections not normalized. |
| Accessibility | Partial | Medium | Skip link + semantics present; focus/contrast/motion coverage incomplete. |
| Responsive System | Partial | High | Media queries at 640/768/960/1024 hardcoded; no shared tokens. |
| Documentation | Early | High | Specs/checklists written; Storybook/tests absent. |

## 3. Evidence Snapshot (grounded)

- Observed code: tokens (`src/styles/tokens.css`); base reset/focus ring (`src/styles/base.css`); navigation (`src/components/layout/Header.tsx`, `src/components/navigation/ResponsiveNav.tsx`, `src/components/navigation/Navigation.css`); primitives (`src/components/ui/*`); hero normalization (`src/components/sections/hero/normalizeHeroSection.ts`); hero + timeline sections; Contentful types; static fixtures.
- Missing/unsighted: motion tokens, breakpoint tokens, tests, Storybook; `src/styles/layout.css` (referenced nowhere); screenshots/UX or a11y bug log.
- Risks: inconsistent interaction states, breakpoint drift across CSS files, fixture/schema mismatch (hero), and unverified focus/motion behavior in nav/drawer.
- Lint state: flat config loads; `npm run lint` currently fails on existing `no-explicit-any` and one unused var across UI and content files.
- File map (high level): router in `src/App.tsx` → `src/router/*`; pages in `src/pages/*`; UI primitives in `src/components/ui/*`; layout in `src/components/layout/*`; nav in `src/components/navigation`; sections in `src/components/sections`; content sources in `src/content/*`; styles in `src/styles/*`.

## 4. Foundations Inventory

- Tokens: Color, typography, spacing, radius, shadow, layout are defined and used; success/warn/error tokens exist but are unused in components.
- Breakpoints: Hardcoded 640/768/960/1024 across CSS; no shared token source.
- Motion: No motion variables or prefers‑reduced‑motion handling.
- State tokens: Present but barely consumed; interaction states rely on ad-hoc CSS.
- Base: `src/styles/base.css` sets global reset and 2px focus ring.
- Component CSS: nav styles (`src/components/navigation/Navigation.css`) use tokens for spacing/color/shadow but fixed easing/duration; timeline styles (`src/components/sections/TimelineSection.css`) set responsive grid without focus styling; article page styles in `src/pages/ArticlePage.css` are stable.

## 5. Primitive / Component Inventory

| Primitive | Path | Token-driven | Variants | Accessibility Notes | Gaps |
|-----------|------|--------------|----------|---------------------|------|
| Heading | src/components/ui/Heading.tsx | Yes | Levels 1–6; weight override | Semantic via caller | No focus, no margin presets |
| Text | src/components/ui/Text.tsx | Yes (muted) | muted | Custom tag | No size scale/leading variants |
| Button | src/components/ui/Button.tsx | Partial base tokens | Single; variants hacked inline | Uses Link for href; no disabled/active/focus styles | Needs `variant` prop + states + reduced motion |
| Link | src/components/ui/Link.tsx | Minimal | n/a | Handles rel/target safety | No focus-visible; color inherits |
| Badge | src/components/ui/Badge.tsx | Yes | Single | Inline-flex | No focus/active states |
| Card | src/components/ui/Card.tsx | Yes | Single | n/a | No focusable/interactive variant; fixed padding |
| Stack | src/components/ui/Stack.tsx | Yes | n/a | Layout only | n/a |
| Container | src/components/ui/Container.tsx | Yes | n/a | Structural | No responsive padding tokens |
| PageShell | src/components/layout/PageShell.tsx | Uses Container | n/a | Adds Header + main id | Lacks footer/layout tokens |
| SeoHead | src/components/layout/SeoHead.tsx | Not reviewed | n/a | n/a | Audit pending |
| Header | src/components/layout/Header.tsx | CSS-driven | n/a | Skip link present | Focus + motion review needed |
| ResponsiveNav | src/components/navigation/ResponsiveNav.tsx | CSS-token dependent | Desktop dropdown, mobile drawer | ARIA labels + body scroll lock | Focus trap/tab order/motion not validated |
| Hero | src/components/sections/HeroSection.tsx + hero/normalizeHeroSection.ts | Yes | Typographic/avatar/image; actions | Alt handling, semantic list | Button variants ad-hoc; no motion |
| Timeline | src/components/sections/TimelineSection.tsx; src/components/sections/TimelineSection.css | Yes | Alternating two-column responsive | Semantic list; lazy imgs | Breakpoints hardcoded; focus states absent |
| RichTextRenderer | src/components/rich-text/RichTextRenderer.tsx | Minimal | Marks, links, assets | Alt/captions, noopener | No code-block styling; no link focus/hover |
| Navigation styles | src/components/navigation/Navigation.css | Yes | Desktop/mobile | Skip link, panels, drawer overlay | Focus + motion partial; no motion tokens |

## 6. Section Pattern Audit

- Hero: Reusable, normalized to the new fields only; CTA variants need a real Button API; no motion.
- Timeline: Reusable alternating layout; badges/cards present; breakpoints hardcoded; no focus states.
- Skills/Projects/Learning/Contact: Implemented but unreviewed; contract likely matches Contentful types; needs pattern + a11y sweep.

## 7. Content Contract Audit

- Types: `src/content/contentful/types.ts` covers LinkAction, SectionHero (new fields only), Timeline, Skills, Projects, Learning, Contact, Navigation, Article, and PagePersonalLanding union.
- Normalization: Only Hero has a normalization step (`hero/normalizeHeroSection.ts`) that resolves protocol-relative URLs and chooses LinkAction actions (no legacy merge now).
- Fixtures: `src/content/static/fixtures.ts` use the new hero fields with actions and alt text; parity with production hero is now covered. Other sections remain unnormalized.
- Adapters/queries: Contentful adapters map landing/articles/nav; `contentful/api.ts` fetches with broad include depth and loose typing, risking overfetch/shape drift.

## 8. Accessibility + Responsive QA Hotspots

- Focus-visible: Buttons/Links/Nav controls rely on defaults; no dedicated styles or outline offsets in components.
- Motion: Drawer/panels use fixed easing/duration; no prefers‑reduced‑motion guard or tokenization.
- Breakpoints: Hardcoded per component; drift risk between nav/timeline/pages.
- Contrast/state: Hover/active/pressed colors not defined in tokens; verify especially on nav pills and hero CTAs.
- Legacy CSS: Starter stylesheet removed to avoid regressions.

## 9. Patterns to Formalize

- Section normalization for every section, mirroring Hero.
- Button system: primary/secondary/tertiary-text + loading/disabled with shared state tokens.
- Breakpoint tokens consumed by CSS and TS helpers.
- Motion + state tokens (duration, easing, opacity/scale) with prefers‑reduced‑motion handling.
- Shared media helper for asset URLs + alt text resolution.

## 10. Architecture Debt / Variation Drift

- Removed starter CSS eliminated conflicting dark-theme defaults.
- Inline button overrides in Hero circumvent a missing variant API.
- Breakpoints/motion values duplicated per component; no tokens → drift.
- Fixtures trail schema changes, reducing confidence in UI-first work.

## 11. Recommended Sequencing

1) **Tokens first**: Add breakpoint + motion/state tokens; thread them into nav, drawer, buttons, timeline.
2) **Buttons**: Ship a `variant` API (primary/secondary/text + disabled/active/focus) and refactor Hero/Nav to consume it; add prefers‑reduced‑motion fallbacks.
3) **Content parity**: Update `src/content/static/fixtures.ts` to the new hero model; add normalization for Skills/Projects/Learning/Contact.
4) **A11y sweep**: Add focus-visible styles to Link/Button/Nav, validate tab order, add aria labels where missing; verify contrast.
5) **Docs + Storybook**: Document component APIs and start Storybook with tokens + primitives + nav/hero/timeline stories.

## 12. Missing Inputs Needed for Full Confidence

- Reviewed implementations for Skills/Projects/Learning/Contact sections (code + visual).
- SeoHead source, base layout/footer design intent.
- Testing plan: a11y/visual/regression and performance budgets.
- Screenshots or baseline visuals to validate contrast/spacing/motion.

## 13. Section Component Specs (UI snapshot)

| Component | Inputs/Props | Layout/Behavior | A11y/State | Gaps/Risks |
|-----------|--------------|-----------------|------------|------------|
| SectionShell (`src/components/sections/SectionShell.tsx`) | `anchorId?`, `children`, `style?`, `className?` | Wraps every section in `<section>` with id, `Container`, and `Stack` using `var(--stack-gap)` | Semantic section + containerized width | No motion/focus concerns; assumes `--stack-gap` token defined elsewhere |
| SectionRenderer (`src/components/sections/SectionRenderer.tsx`) | `section: SectionEntry` | Switch by Contentful `contentType` id → Hero/Timeline/Skills/Projects/Learning/Contact | Returns `null` on unknown type | No fallback UI; unhandled types silently drop |
| HeroSection (`src/components/sections/HeroSection.tsx`) | `SectionHero` normalized via `normalizeHeroSection` (actions, proofPoints, heroStyle avatar/image/typographic, alt) | CSS grid: single column for `typographic`, auto-fit cards otherwise; actions rendered as Buttons with inline style overrides; optional proof list; optional avatar/hero image with borders | Uses `<h1>` for title, `<h3>` for lead, Badge/Text for eyebrow/name; actions set `rel` for `_blank`; lists are semantic; alt passed through | Button variants are inline (no tokenized states); no motion/reduced-motion; spacing/layout not breakpoint-tokenized |
| TimelineSection (`src/components/sections/TimelineSection.tsx`) | `SectionTimeline.items[]` | Ordered list; alternating columns via `.timeline-item--flip` (CSS breakpoints 640/768/960/1024); Card with badge kind, muted meta, summary, highlights list, optional CTA Button, tags; fallback SVGs for missing media | Semantic `<ol>/<li>`; images `loading=\"lazy\"`; alt falls back to media title/item title | Focus states absent; motion not tokenized; inline box-shadow; CTA uses base Button only; breakpoints hardcoded |
| SkillsSection (`src/components/sections/SkillsSection.tsx`) | `SectionSkills.groups[]` | Grid `auto-fit minmax(280px,1fr)`; each group shows label + skill rows with optional uppercase level pill and keywords | Pure divs; no lists; relies on text contrast tokens | Lack of semantic lists; no focus/interactive states; layout gaps hardcoded |
| ProjectsSection (`src/components/sections/ProjectsSection.tsx`) | `SectionProjects.projects[]` (links resolved via `resolveProjectLink`) | Stack of Cards; headings, tagline, summary, tech badges, CTA Buttons for links | Buttons/Badges reuse primitives; semantic headings | Buttons lack variant/state tokens; no motion/focus styling; tech badges as plain chips |
| LearningSection (`src/components/sections/LearningSection.tsx`) | `SectionLearning.items[]` | Card list with topic heading, description, status Badge, optional Link | Uses Heading hierarchy (H4), Link for URLs | No focus styling; status badge untyped; layout fixed |
| ContactSection (`src/components/sections/ContactSection.tsx`) | `SectionContact` | SectionShell with H2, intro text, mailto Link, flex-wrapped Link list | Uses semantic heading/links; mailto exposed | No form/validation; no motion; link focus relies on primitive defaults |

## 14. UI Primitive Specs (design system snapshot)

| Component | Inputs/Props | Layout/Behavior | A11y/State | Gaps/Risks |
|-----------|--------------|-----------------|------------|------------|
| Container (`src/components/ui/Container.tsx`) | `as?`, HTML attrs | Centers content, max width `var(--content-max)`, horizontal padding `var(--section-pad-x)`, box-sizing border-box | Semantic via `as`; no role changes | Breakpoint padding not tokenized per size; depends on external CSS vars |
| Stack (`src/components/ui/Stack.tsx`) | `as?`, `gap?` (default `var(--space-4)`), HTML attrs | Flex column with configurable gap | Semantics from `as` | No responsive gap or wrap; gap not token-referenced per breakpoint |
| Heading (`src/components/ui/Heading.tsx`) | `level` (1–6, default 2), `weight?`, HTML attrs | Maps level → font-size/line-height/letter-spacing tokens; margin 0 | Uses semantic heading tag | No responsive scale; no `aria-level` support when used outside landmarks |
| Text (`src/components/ui/Text.tsx`) | `as?` (default `p`), `muted?`, HTML attrs | Margin 0; optional muted color `--color-text-muted` | Semantics from `as` | No size/leading variants; relies on parent width/line length |
| Link (`src/components/ui/Link.tsx`) | `href` (required), anchor attrs | Internal links handled via `handleLinkClick`; externals default to `_blank` + safe `rel`; inline color inherits | Standard anchor semantics | No focus-visible style; no disabled state; color depends on parent |
| Button (`src/components/ui/Button.tsx`) | Button attrs + optional `href` | Renders `Link` when `href` else `<button>`; pill shape, accent bg/border, inline-flex CTA | Clickable; inherits native focus/hover | Single visual style, no variants/sizes; no disabled styling; no reduced-motion tokens |
| Card (`src/components/ui/Card.tsx`) | HTML div attrs | Bordered, radius `var(--radius-lg)`, padding `var(--space-4)`, background surface, `var(--shadow-soft)` | Div container only | Not focusable; no interactive variants; shadow/token coupling inline |
| Badge (`src/components/ui/Badge.tsx`) | HTML span attrs | Inline-flex pill with background `--color-surface-2`, small text/letter spacing | Span semantics | Single size/style; no status variants; no focus states |

## 15. Layout / Navigation / Rich Text Specs

| Component | Inputs/Props | Layout/Behavior | A11y/State | Gaps/Risks |
|-----------|--------------|-----------------|------------|------------|
| PageShell (`src/components/layout/PageShell.tsx`) | `title?`, `description?`, `canonicalUrl?`, `children` | Wraps pages; injects `SeoHead`, `Header`, and `Container` as `<main id="main-content">` | Semantic main landmark via Container; inherits Header skip link | No footer slot; layout tokens not centralized |
| SeoHead (`src/components/layout/SeoHead.tsx`) | `title?`, `description?`, `canonicalUrl?` | Side-effect: sets document title/meta/`link rel=canonical` via DOM upsert | None (head-only) | Browser-only effects; no SSR; no open graph/meta image support |
| Header (`src/components/layout/Header.tsx`) | none; fetches nav via `getContentSource().getNavigationMenu()` | Renders brand link + `ResponsiveNav`; shows loading/error placeholder; includes skip link | `aria-live` on placeholder; skip link anchors `#main-content` | No retry/backoff; focus/motion not audited; nav fetch on client only |
| ResponsiveNav (`src/components/navigation/ResponsiveNav.tsx`) | `menu: NavigationMenuData` (brand, links, cta, mobileBreakpointPx) | Desktop: dropdown panels with caret, panel width override; mobile: drawer with accordions, overlay, body scroll lock; breakpoint from CMS | ARIA labels for menus/dialog; Escape closes; overlay click closes; images in panels `alt=""` | Focus trap/order not validated; no focus-visible styles; motion/easing not tokenized; no reduced-motion guard |
| RichTextRenderer (`src/components/rich-text/RichTextRenderer.tsx`) | `document`, `className?` | Renders Contentful rich text: h2–h4, p, ol/ul/li, blockquote, hr, hyperlinks open in new tab, inline/block embedded assets with lazy imgs/captions | Adds `rel="noreferrer noopener"` on links; alt from asset title/description/file name | No code block styling; no H1 support; no link focus styles; limited mark set (bold/italic/underline/code) |

# Project Folder and File Tree

```
CHANGELOG.md
CODE_OF_CONDUCT.md
CONTRIBUTING.md
eslint.config.js
index.html
LICENSE
package.json
README.md
SECURITY.md
SUPPORT.md
VERSION.md
vite.config.ts
.github/
 CODEOWNERS
 ISSUE_TEMPLATE/bug.md
 ISSUE_TEMPLATE/feature.md
 PULL_REQUEST_TEMPLATE.md
docs/
 architecture/
  ia.md
 content/
  editorial-guidelines.md
  cms-advanced.md
 design-system/
  design-system.md
  design-system-architect-checklist.md
  design-system-snapshot-audit.md
  hero-section-ui-spec.md
  ui-foundation.md
  sections/
   timeline-section.md
 planning/
  ROADMAP.md
  TASKS.md
  finished.md
  storybook-migration-plan.md
public/
 _redirects
src/
 App.tsx
 env.ts
 main.tsx
 vite-env.d.ts
 assets/
  timeline/
 components/
  layout/
   Header.tsx
   PageShell.tsx
   SeoHead.tsx
  navigation/
   ResponsiveNav.tsx
   Navigation.css
  rich-text/
   RichTextRenderer.tsx
  sections/
   ContactSection.tsx
   HeroSection.tsx
   LearningSection.tsx
   ProjectsSection.tsx
   SectionRenderer.tsx
   SectionShell.tsx
   SkillsSection.tsx
   TimelineSection.tsx
   TimelineSection.css
   hero/
    normalizeHeroSection.ts
   primitives/
    ActionGroup.tsx
    MediaFrame.tsx
    ProofList.tsx
    SectionHeader.tsx
  ui/
   Badge.tsx
   Button.tsx
   Card.tsx
   Container.tsx
   Heading.tsx
   Link.tsx
   Stack.tsx
   Text.tsx
 content/
  source.ts
  contentful/
   adapters.ts
   api.ts
   client.ts
   contentfulSource.ts
   includes.ts
   types.ts
  static/
   fixtures.ts
   staticSource.ts
 pages/
  ArticlePage.tsx
  ArticlePage.css
  DebugPage.tsx
  LandingPage.tsx
  NotFoundPage.tsx
 preview/
  PreviewBanner.tsx
  previewMode.ts
 router/
  link.ts
  Router.tsx
  routes.ts
styles/
 base.css
 tokens.css
```

## Project Context (concise)

- Purpose: Personal/professional web engineering site; UI-first, CMS-second with Contentful as primary source and static fixtures for UI-first work.
- Design system: Tokens for color/type/spacing/radius/shadow/layout; no motion/breakpoint tokens yet. Primitives include Heading/Text/Button/Link/Badge/Card/Stack/Container. Sections implemented: Hero, Timeline, Skills, Projects, Learning, Contact. Navigation includes desktop dropdowns and mobile drawer with skip link.
- Content model: Contentful types defined for SectionHero (legacy + new fields), Timeline, Skills, Projects, Learning, Contact, Navigation, Article; LinkAction introduced for hero actions. Static fixtures still use legacy hero fields.
- Styling: Base reset + focus ring in `src/styles/base.css`; component styles for navigation and timeline; page styles for article layout; tokens in `src/styles/tokens.css`; starter stylesheet removed.
- Routing: Client router with landing, article (slug), debug, and not-found routes.
- Known gaps: Motion/state tokens, breakpoint tokens, button variant system, alignment of fixtures to new hero model, Storybook integration, comprehensive accessibility and responsive QA.  
