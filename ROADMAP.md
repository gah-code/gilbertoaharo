# ROADMAP

> Execution plan + backlog.  
> Standards live in: `ui-design-guide.md`

---

## Now / Next / Later (priority view)

> This is a priority lens (with feedback).  
> ✅ **Single source of truth for completion is the Full Checklist below** (avoid duplicate checkboxes).

### NOW (P0) — Repository Hygiene & Security ✅

- ✅ **Confirm repo visibility (public/private) and adjust policy files accordingly.**  
  _Status:_ Repository is PUBLIC. Created CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, SUPPORT.md, .github/ templates and pushed.

- ✅ **Remove tracked `.env` and `.env.local` from git history if present.**  
  _Status:_ Verified—no secrets in git history. .env files were never committed; only .env.example is tracked.

- ✅ **Ensure `.gitignore` includes `node_modules`, `dist`, `.env*`, and `tsconfig.tsbuildinfo`.**  
  _Status:_ .gitignore updated with tsconfig.tsbuildinfo. All artifacts properly ignored and verified.

- ✅ **Stop ignoring `docs/` so documentation changes are reviewable.**  
  _Status:_ Removed docs/* rules from .gitignore. Documentation is now reviewable in PRs.

- ✅ **Add a `.env.example` policy section in `README.md` or `docs/`.**  
  _Status:_ Enhanced README with detailed "Environment Variables" section, step-by-step setup guide, and security warnings.

### NEXT (P0) — Accessibility & UX Stability

- **NAV-A11Y** — Validate keyboard nav, focus states, and ARIA updates for desktop dropdown + mobile drawer.  
  _Feedback:_ Treat this like a mini security audit—focus trapping, Escape behavior, and correct ARIA are where regressions hide.

- **TIMELINE-A11Y+QA** — Timeline content QA + accessibility pass (headings, list semantics, alt text, focus order).  
  _Feedback:_ Tight semantics now prevents future CMS-driven content from becoming chaotic/invalid.

### NEXT (P1) — Section Completion + Responsive Audit

- **PROJECTS** — Create responsive grid + style project cards/metadata/links.  
  _Feedback:_ Lock the grid + card system first; metadata styling should be a variant, not bespoke CSS per card.

- **LEARNING** — Create learning grid + style learning items/links.  
  _Feedback:_ Keep density intentionally tighter than Projects; the visual rhythm should feel “reference-like.”

- **CONTACT** — Implement contact layout + style CTAs + a11y.  
  _Feedback:_ Keep this section brutally simple: clear hierarchy, obvious CTA, strong focus states.

- **RESPONSIVE-AUDIT** — Define breakpoints/responsive behavior across all sections (tablet/desktop alignment w/ tokens).  
  _Feedback:_ Use a consistent test matrix (≤480, <768, ≥768, ≥1024). Avoid one-off “fixes” that break rhythm.

### LATER (P2) — Integration + Design System Maturity + Automation

- **CONTENTFUL-INTEGRATION** — Integrate Contentful for primary content + map assets.
- **NAV-MODEL-IMPORT** — Add/import Contentful navigation models + verify schema.
- **MOTION+BREAKPOINT-TOKENS** — Motion tokens + breakpoint tokens + container rules.
- **STORYBOOK-MIGRATION** — Storybook + design system workspace (phased plan below).
- **CI + Templates + Release Hygiene** — CI workflows, templates, policy docs, changelog/versioning.

---

## Full Checklist (single source of truth)

## TODO Workflow

### 1. Foundations

- [x] Implement color tokens in `src/styles/tokens.css`. (Added warm palette tokens, semantic mappings, and legacy aliases.)
- [x] Define typography tokens in `src/styles/tokens.css`. (Added font stacks and size scale tokens in `src/styles/tokens.css`.)
- [x] Set up spacing scale, radius, and shadow tokens in `src/styles/tokens.css`. (Added rem-based spacing scale, radius + shadow tokens, and wired components/navigation to use them.)
- [x] Configure layout density tokens in `src/styles/tokens.css`. (Added content width, section padding clamps, stack/heading rhythm, and lede width tokens.)

### 2. Global Layout Rules

- [x] Apply `box-sizing: border-box` across all elements. (Added universal box-sizing reset in `src/styles/base.css`.)
- [x] Ensure full-height root setup for `html`, `body`, and `#root`. (Set min-height: 100% on root elements in `src/styles/base.css`.)
- [x] Style body with typography and background tokens. (Updated `src/styles/base.css` to use `--color-text-primary` and `--color-bg`.)
- [x] Define heading styles and spacing rules. (Added heading rhythm rules and lede spacing in `src/styles/base.css`.)
- [x] Set content width and section spacing. (Container and SectionShell now use layout density tokens for width and padding.)
- [x] Add section separation rules. (Adjacent sections gain a subtle border and reset top padding.)

### 3. Accessibility and Interaction

- [x] Implement skip link for `#main-content`. (Added skip link in header with styles in `src/styles/components/navigation.css`.)
- [x] Style focus-visible states for `a` and `button`. (Added global focus-visible outline using tokens in `src/styles/base.css`.)
- [x] Create sticky header with blur and gradient background. (Site header is sticky with blur/gradient and border in `src/styles/components/navigation.css`.)

### 4. Components

#### Header and Navigation

- [x] Implement `.page-header` with sticky and blurred background. (Done in `src/styles/components/navigation.css`.)
- [x] Align `.page-header-inner` with logo and navigation. (Header uses `Container` and flex layout.)
- [x] Style `.logo` and `.page-nav`. (Brand dot/label and nav list styled in `src/styles/components/navigation.css`.)
- [x] Add `src/components/layout/Header.tsx` as the header entry component. (Header renders brand + nav + skip link.)
- [x] Add `src/components/navigation/ResponsiveNav.tsx` for mega menu + mobile drawer. (Implemented desktop dropdowns and mobile drawer/accordions.)
- [x] Add navigation styles in `src/styles/components/navigation.css`. (Desktop, mega panel, drawer, accordions, CTA, focus states.)
- [x] Query Contentful for `navigationMenu` and wire the data into the header/nav. (Adapters fetch and map navigation menu data.)
- [x] Map `navigationMenu.links[]` to desktop nav and mobile drawer links. (ResponsiveNav renders links/panels across desktop/mobile.)
- [x] Render mega menu dropdown when `navLink.panel` exists (use `navPanel.cards[]`). (Desktop panels render mapped cards.)
- [x] Render mobile drawer accordion using the same cards (Projects open by default if configured). (Drawer accordions reuse panel cards.)
- [x] Implement desktop interactions (toggle, outside click, Escape, `aria-expanded`). (Handled in ResponsiveNav state/effects.)
- [x] Implement mobile drawer interactions (toggle, Escape, scroll lock, close on link click, `aria-*`). (Drawer controls aria, escape, and scroll lock.)
- [x] Apply responsive rules (hide desktop nav below breakpoint, show hamburger, full-viewport drawer). (Breakpoint driven by Contentful with clamp.)

<a id="task-nav-a11y"></a>

- [ ] Validate keyboard nav, focus states, and aria updates (expanded/hidden/modal).

#### Buttons

- [x] Define base button styles. (Button primitive uses tokenized padding, radius, and accent styles.)
- [x] Style primary and secondary buttons. (Primary filled and secondary outline handled via style overrides.)

#### Pills (Badges)

- [x] Create `.pill` styles for badges. (Badge primitive uses pill radius and token padding.)

#### Cards

- [x] Implement shared card styles for `.card`, `.timeline-card`, `.project-card`, and `.learning-item`. (Card primitive provides shared surface/border/shadow.)

#### Hero Section

- [x] Implement hero section variants (`hero--typographic`, `hero--avatar`, `hero--image`). (HeroSection selects layout based on content + heroStyle.)
- [x] Style hero section elements (title, tagline, actions, highlights, avatar, image). (Token-driven heading/tagline, action buttons, avatar/image framing.)

#### Timeline Section

- [x] Implement timeline section structure and styles. (Section uses timeline list/grid, content + media columns, alternating layout.)
- [x] Add responsive layout for timeline section (validate ≤480px, <768px, ≥768px, ≥1024px for column swaps, gaps, and media sizing). (Auto-fit grid on tablet/desktop; stacks on mobile.)
- [ ] Plan for future CMS-controlled illustrations and CTAs (state tokens exist; media strategy supports per-item media + CTA fallbacks).
- [x] Style tokens applied: verify spacing, colors, and typography tokens are used; ensure classnames match timeline stylesheet (when added). (Tokenized spacing/radius/shadow; timeline CSS extracted.)

<a id="task-timeline-a11y-qa"></a>

- [ ] Content QA: date format, optional org/location/summary/highlights rendering, empty states.
- [ ] Accessibility: heading hierarchy, list semantics (`<ol>/<li>`), alt text for media, focus order if links/CTAs are present.

- [x] Add timeline-specific CSS (grid gaps, breakpoint tweaks, alternating layout) to avoid inline styles and ensure consistency with tokens. (Added `src/styles/components/timeline.css`.)

#### Projects Section

<a id="task-projects"></a>

- [ ] Create responsive grid for projects.
- [ ] Style project cards, metadata, and links.

#### Skills Section

- [x] Implement skills section grid and styles. (Rebuilt layout in `src/components/sections/SkillsSection.tsx`.)
- [x] Style skill rows, badges, and keywords. (Added row dividers, level pills, and keyword styling in `src/components/sections/SkillsSection.tsx`.)

#### Learning Section

<a id="task-learning"></a>

- [ ] Create learning section grid and styles.
- [ ] Style learning items and links.

#### Contact Section

<a id="task-contact"></a>

- [ ] Implement contact section layout and styles.
- [ ] Style contact intro and CTAs.

### 5. Responsive Behavior

<a id="task-responsive-audit"></a>

- [ ] Define breakpoints and responsive styles for all sections. (Next: audit each section for tablet/desktop behavior; align with tokens.)

### 6. Content and Assets

<a id="task-contentful-integration"></a>

- [ ] Integrate Contentful for primary content.
- [ ] Map timeline media assets in `src/assets/timeline`.

#### Navigation Menu Content Model (Contentful)

<a id="task-nav-model-import"></a>

- [ ] Add `contentful/models/navigationMenu.json` to the repo.
- [ ] Run the Contentful import script against that file (space + environment).
- [ ] Verify `Navigation Menu` content type exists.
- [ ] Verify related types exist (`Nav Link`, `Nav Panel`, `Nav Card`).
- [ ] Confirm all fields match the schema.

### 7. Usage Guidelines

- [x] Use token values for spacing, type, and color. (Replaced hard-coded colors with tokens in `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Text.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/SkillsSection.tsx`.)
- [ ] Prefer existing component classes before adding new ones.
- [ ] Maintain consistency in card styles.
- [ ] Update media assets or mapping for new timeline items.
- [ ] Centralize active checklists/doc TODOs into `TODO-UI.md` (deprecate duplicated items in other docs).

### 8. Design System Enhancements

- [x] Add semantic state tokens (success/warn/error text, bg, border) and wire them into alerts/badges. (State tokens added to `src/styles/tokens.css`.)

<a id="task-motion-breakpoints"></a>

- [ ] Define motion tokens (durations/easing) and apply to hover/focus and nav/accordion transitions.

- [x] Add global focus-visible styling for interactive elements (`a`, `button`, form controls) using tokens. (Global outline in `src/styles/base.css`.)
- [ ] Document component API/variant standards (props, variants, disabled/hover/focus states).
- [ ] Add breakpoint tokens and responsive container rules to align section layouts across viewports.

### 9. Repo Hygiene, Community, and Workflow

<a id="repo-hygiene-security"></a>

#### Repository Hygiene and Security (NOW) ✅

- [x] Confirm repo visibility (public/private) and adjust policy files accordingly. (Repository is PUBLIC with complete governance documentation.)
- [x] Remove tracked `.env` and `.env.local` from git history if present. (Verified—no secrets in history.)
- [x] Ensure `.gitignore` includes `node_modules`, `dist`, `.env*`, and `tsconfig.tsbuildinfo`. (Updated and verified.)
- [x] Stop ignoring `docs/` so documentation changes are reviewable. (Removed from .gitignore.)
- [x] Add a `.env.example` policy section in `README.md` or `docs/`. (Enhanced README with setup guide.)

#### Community + Governance ✅

- [x] Add policy docs: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `SUPPORT.md`, `.github/CODEOWNERS`. (All created and committed)
- [x] Add templates: `.github/ISSUE_TEMPLATE/` (bug/feature) and `.github/PULL_REQUEST_TEMPLATE.md`. (Created and committed)

#### CI / Automation / Tooling

- [ ] CI/automation: add `.github/workflows/ci.yml` (lint/typecheck/build) and `.github/dependabot.yml`.
- [ ] Tooling scripts: add `format`/`format:check` (Prettier), `typecheck` (tsc), `test` (Vitest smoke), ensure ESLint covers React+TS and runs in CI.

#### Structure + Docs

- [ ] Structure for growth: consider `src/features/`, `src/lib/`, `src/config/`; reorganize sections under features and update imports.
- [ ] Docs: add `docs/architecture/`, `docs/roadmap.md`; keep design-system/storybook docs in sync; update README structure map after refactors.

#### Release Hygiene

- [ ] Release hygiene: keep `CHANGELOG.md` current and update `VERSION.md` when bumping `package.json`.

---

### Detailed TODO for "Implement color tokens in `src/styles/tokens.css`"

1. **Review Existing Tokens**:
   - Open `src/styles/tokens.css` and check for existing color tokens.
   - Ensure the file structure supports semantic and primitive tokens.

2. **Define Primitive Colors**:
   - Add base color definitions (e.g., `--color-bg`, `--color-surface`, `--color-accent`).
   - Use HEX, RGB, or HSL values for clarity.

3. **Map Semantic Tokens**:
   - Create semantic mappings for text, borders, and focus states.
   - Example: `--color-text-primary: var(--color-text)`.

4. **Ensure Consistency**:
   - Verify that all tokens follow a consistent naming convention.
   - Use comments to group related tokens (e.g., background, text, borders).

5. **Test Tokens**:
   - Apply tokens in a test component or page.
   - Check for visual consistency and accessibility (e.g., WCAG contrast).

6. **Document Tokens**:
   - Update `README-UI.md` or relevant documentation to include the new tokens.
   - Provide usage examples for developers.

---

<a id="storybook-migration-plan"></a>

## Storybook + Design System Migration Plan

## Current Structure Snapshot

This plan mirrors the current repo layout so the migration is incremental:

- `src/styles/` for tokens + base styles
- `src/components/ui/` for primitives
- `src/components/sections/` for compositions
- `src/components/layout/` for page chrome
- `src/components/rich-text/` for CMS-safe rendering
- `src/content/` for CMS boundary + adapters
- `src/pages/` + `src/router/` for route-level wiring
- `src/preview/` for draft-content support

## Target End State

- Storybook becomes the design system workspace (tokens, primitives, sections, docs).
- CMS data is only used through adapters or fixtures, never raw Contentful data.
- The design system remains in-repo until there is clear multi-product demand.

## Proposed Storybook Footprint

- `.storybook/main.ts`
- `.storybook/preview.ts`
- `src/components/**/Component.stories.tsx` (collocated)
- `src/stories/` for cross-cutting stories (tokens, typography, layout)
- `src/content/static/fixtures.ts` for Storybook-ready content data

## Draft Storybook Config

### `.storybook/main.ts`

```ts
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.@(ts|tsx|mdx)",
    "../src/stories/**/*.stories.@(ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src")
        }
      }
    })
};

export default config;
```

### `.storybook/preview.ts`

```ts
import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "../src/styles/base.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
    layout: "padded"
  }
};

export default preview;
```

### `package.json` scripts (add)

```json
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

## Migration Plan (TODO)

### Phase 0 - Decisions

- [ ] Confirm Storybook stays in this repo for now.
- [ ] Agree on story placement (collocated vs `src/stories`).
- [ ] Decide on ownership for design system changes.

### Phase 1 - Scaffolding

- [ ] Add Storybook dependencies.
- [ ] Create `.storybook/main.ts` and `.storybook/preview.ts` from the draft config.
- [ ] Confirm Vite alias `@` works in stories.
- [ ] Add Storybook scripts to `package.json`.

### Phase 2 - Foundations

- [ ] Create token stories for colors, type, spacing, radius.
- [ ] Add typography stories using `Heading` and `Text`.
- [ ] Add layout stories for `Container` and `Stack`.

### Phase 3 - Primitives (`src/components/ui`)

- [ ] Create stories for each primitive (`Button`, `Badge`, `Card`, `Link`, etc.).
- [ ] Use args and controls for variant coverage.
- [ ] Add basic a11y checks for interactive components.

### Phase 4 - Sections (`src/components/sections`)

- [ ] Add fixture content in `src/content/static/fixtures.ts`.
- [ ] Create stories for each section with fixture data.
- [ ] Wrap sections with `SectionShell` for consistent spacing.

### Phase 5 - Layout + Pages (Optional)

- [ ] Add a `PageShell` story to define base layout.
- [ ] Add a `LandingPage` story using the static source.

### Phase 6 - Documentation

- [ ] Add Storybook docs pages that mirror `docs/design-system.md`.
- [ ] Document CMS boundary rules in Storybook docs.

### Phase 7 - Quality Gates

- [ ] Add `@storybook/test-runner` for critical stories.
- [ ] Add a CI step to run `build-storybook`.

## Notes and Constraints

- Use adapters or fixtures for story data, never raw Contentful responses.
- Keep stories lean: 1-2 canonical variants per component.
- Update tokens first, then update affected stories.
