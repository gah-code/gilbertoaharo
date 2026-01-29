# Changelog

## [2026-01-28]

### Added

- **Public Repository Governance & Security:**
  - `CONTRIBUTING.md`: Comprehensive development guide covering setup, code standards, PR process, project structure, testing, and documentation expectations
  - `CODE_OF_CONDUCT.md`: Community standards based on Contributor Covenant v2.1; establishes inclusive, respectful environment
  - `SECURITY.md`: Security policy with vulnerability reporting guidelines, best practices for contributors and users, dependency vulnerability management
  - `SUPPORT.md`: Support channels (issues, discussions), documentation resources, response time commitments, common troubleshooting guide
  - `.github/CODEOWNERS`: Code ownership assignment to @gah-code
  - `.github/ISSUE_TEMPLATE/bug.md`: Standardized bug report template with environment/reproduction/context fields
  - `.github/ISSUE_TEMPLATE/feature.md`: Feature request template with motivation/proposed solution/alternatives sections
  - `.github/PULL_REQUEST_TEMPLATE.md`: PR submission template with change description, testing checklist, and related issues
- **Environment Documentation:**
  - Enhanced `README.md` "Environment Variables" section with step-by-step setup guide, detailed variable explanations, and security warnings
  - Updated `.env.example` with comprehensive comments explaining each variable's purpose and required format
  - Added "Contributing" section to README with quick-start guide and links to governance docs

### Changed

- `.gitignore`: Removed `docs/*` rules to make documentation changes reviewable in PRs; added `tsconfig.tsbuildinfo` to prevent build artifacts
- `README.md`: Updated table of contents to include Contributing section and governance links

### Security

- **Verified**: No secrets in git history (`.env` and `.env.local` were never committed; only `.env.example` tracked)
- **Verified**: Repository is public-ready with professional governance standards
- **Verified**: Build artifacts and local config files properly ignored

### Repository Status

- Repository is now **PUBLIC** with complete governance documentation
- All NOW (P0) Repository Hygiene & Security tasks completed
- Community + Governance tasks completed

---

## [2026-01-21]

### Changed

- Heading component now supports preset weights (`regular`, `semibold`, `bold`) while keeping tokenized sizes/line-heights; hero tagline uses the semibold preset with muted color for consistency.
- Skills section title now uses the tokenized heading defaults instead of a custom size.
- Synced `TODO-UI.md` to reflect completed header/navigation tasks and added senior-level design system enhancement checklist items (state/motion/focus tokens, API standards, responsive tokens).
- Added semantic state tokens (success/warn/error text, bg, border) in `src/styles/tokens.css` and global focus-visible styling using tokens in `src/styles/base.css`.
- Timeline data model extended with optional media/CTA fields on timeline items; `TimelineSection` now renders media and CTA when present, and checklist doc updated.
- Added static content source + fixtures with timeline media/CTA populated from local assets, and `getContentSource` now honors `VITE_CONTENT_SOURCE` (`static` vs `contentful`).
- Timeline renderer already wires `sectionTimeline` through `SectionRenderer`; checklist updated with anchor note.
- Timeline media strategy implemented: per-item media preferred; otherwise rotates local SVGs with sensible alt text fallback; checklist updated.
- Timeline checklist items for styling/responsive/QA/accessibility moved into `TODO-UI.md` under the Timeline section for active tracking.
- Added `docs/design-system-architect-checklist.md` capturing discovery → evolution tasks tailored to the current system state; refined for Contentful-first setup and upcoming Storybook integration.
- Timeline grid now uses a responsive auto-fit layout for 2-column cards on larger viewports while stacking on small screens; added TODO entry to centralize timeline CSS.
- Adjusted timeline grid breakpoints and gaps to better match the reference 2-column layout while stacking on narrow screens.
- Timeline grid tweaks: added card max-widths and staggered vertical offsets for alternating items to mirror the reference spacing on large screens.
- Timeline layout restructured: media sits in its own column beside content on larger screens, with single-column stacking on mobile and alternating order on even items; timeline CSS updated accordingly.

### Verification

- `npm run build` (passes; Vite warns Node 22.2.0 is below the recommended 22.12+).

## [2026-01-20]

### Added

- Spacing scale extensions (space-10/12/16), radius tokens (sm/md/lg/pill), and shared soft shadow token in `src/styles/tokens.css`.
- Layout density tokens (content max, section padding clamps, stack/heading rhythm, lede width) in `src/styles/tokens.css`.

### Changed

- UI primitives now consume spacing/radius/shadow tokens: card surfaces use `--radius-lg` + `--shadow-soft`; buttons/badges and skills level pills use tokenized pill radius and spacing.
- Navigation styles aligned to tokenized radii and shadow for panels, pills, toggles, and panel chrome in `src/styles/components/navigation.css`.
- Updated `TODO-UI.md` to reflect the completed spacing/radius/shadow token task.
- Layout density tokens now drive shell spacing: `Container` uses `--content-max` and `--section-pad-x`, `SectionShell` uses `--section-pad-y` + `--stack-gap`, and `PageShell` lets the container defaults handle main spacing.
- Navigation/header resilience on smaller viewports: `Container` now uses border-box sizing to prevent padding overflow, and header/nav flex rows allow shrinking (`min-width: 0`) to avoid wrap/overflow on medium and down.
- Global box-sizing reset applied to all elements in `src/styles/base.css` to stabilize layout calculations.
- Full-height root + layout rhythm: `html`, `body`, and `#root` now use `min-height: 100%`; section padding/borders/headings/lede spacing are driven by layout density tokens via `.section` rules; `SectionShell` carries the `.section` class and optional custom class.

### Verification

- Not run (style/token updates only).

## [2026-01-16]

### Added

- Contentful navigation model types (`navigationMenu`, `navLink`, `navPanel`, `navCard`) and UI-ready shapes in `src/content/contentful/types.ts`.
- Navigation adapter that maps sorted links/panels/cards, resolves CTA, clamps mobile breakpoint, and normalizes asset URLs in `src/content/contentful/adapters.ts`.
- Header + responsive navigation components (`src/components/layout/Header.tsx`, `src/components/navigation/ResponsiveNav.tsx`) with desktop dropdowns, mobile drawer/accordions, skip link, and brand wiring.
- Navigation styles in `src/styles/components/navigation.css` covering sticky header, desktop mega panel, mobile drawer, accordions, CTA, and focus/hover states.

### Changed

- `PageShell` now renders the new `Header` and main landmark with padding.
- Mobile/touch UX refinements: tighter padding, single-column nav cards, smaller icons, sticky drawer header, safe-area padding, softer gradients/shadows, and accordion/link focus states tuned for small viewports.

### Verification

- `npm run build` (passes; Vite warns Node 22.2.0 is below the recommended 22.12+).

## [2026-01-15]

### Added

- `VERSION.md` to track versioning rules and baseline history.

### Changed

- Bumped version to `0.0.1` in `package.json` and `VERSION.md`.

### Docs

- Added Design System Roadmap summary and linked `docs/storybook-migration-plan.md` in `README.md`.

### Verification

- Not run (documentation change only).

## [2026-01-14]

### Added

- `docs/storybook-migration-plan.md` outlining the Storybook architecture, draft config, and phased migration checklist aligned to the current repo layout.

### Verification

- Not run (documentation change only).

### Next Steps

- Decide on in-repo Storybook ownership and story placement (collocated vs `src/stories`).
- Add Storybook dependencies and scaffold `.storybook/main.ts` + `.storybook/preview.ts`.
- Create initial token, typography, and primitive stories, then section stories backed by fixtures.

## [2026-01-13]

### Added

- `HeroStyle` type and new `sectionHero` fields (`heroStyle`, `avatarImage`, `heroImage`) to reflect the updated Contentful model in `src/content/contentful/types.ts`.
- Typography tokens (font stacks + size scale) in `src/styles/tokens.css` for consistent type usage.
- Color tokens and semantic mappings in `src/styles/tokens.css` to centralize palette usage across the UI.
- `SectionShell` `style` prop to allow per-section backgrounds in `src/components/sections/SectionShell.tsx`.

### Changed

- Hero rendering logic in `src/components/sections/HeroSection.tsx` now:
  - resolves asset URLs with `https:` prefix when Contentful returns protocol-relative URLs,
  - selects an `effectiveStyle` based on `heroStyle` + available assets,
  - renders avatar/image panels only when assets exist, otherwise falls back to typographic layout.
- Skills layout in `src/components/sections/SkillsSection.tsx` updated to a two-column grid with group headers, row dividers, level pills, and keyword lines.
- UI components now consume tokens instead of hard-coded colors:
  - `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Text.tsx`
  - `src/components/sections/HeroSection.tsx`, `src/components/sections/SkillsSection.tsx`
  - `src/styles/base.css` uses semantic tokens for body text and background.

### Docs

- Added layout guidance + checklist item in `README-UI.md`.
- Checked off completed tasks with notes in `TODO-UI.md`.

### Verification

- Not run (UI/style changes only).

### Next Steps

- Review hero entries for each `heroStyle` to confirm fallbacks and responsive layout.
- Consider adding `layout.css` if layout primitives expand beyond the component layer.
- Decide whether to wire typography tokens into `Heading`/`Text` for scale consistency.
