# Changelog

## [2026-04-21 - Update 3]

### Changed

- Sanitized environment templates to placeholder-only values and removed unused preview-token wiring from client env parsing. (`.env.example`, `src/env.ts`)
- Removed committed Storybook build artifacts that embedded prior runtime env values and added an ignore rule to keep generated Storybook output out of git. (`storybook-static/`, `.gitignore`)
- Pinned Netlify Node runtime to the Node 22 baseline for Vite/Storybook compatibility. (`netlify.toml`)
- Updated docs with Netlify deployment env boundaries (client-exposed vs never committed) and redeploy guidance after sanitization. (`README.md`)

### Verification

- `npm run build` (passes)
- `npm run test` (passes)
- Repo scan confirms no preview-token env wiring remains in tracked source.

## [2026-04-21 - Update 2]

### Added

- Added a global layout `Footer` wrapper that fetches footer content through the active content source and renders `FooterSection` only when footer data is present, while safely rendering nothing during loading/error/empty states. (`src/components/layout/Footer.tsx`)
- Added Contentful adapter tests that lock navigation/footer mapping to CMS-provided data (no auto-injected Articles links) and verify fallback footer passthrough behavior. (`src/content/contentful/adapters.test.ts`)
- Added Storybook coverage for `ArticleCard` with realistic states (`Default`, `NoImage`, `NoExcerpt`, `MinimalMeta`, `UpdatedOnly`, `LongTitle`) plus story framing styles for visual QA. (`src/components/articles/ArticleCard.stories.tsx`, `src/components/articles/ArticleCard.stories.css`)
- Added reusable article list fixtures for Storybook and tests. (`src/components/articles/__fixtures__/articleList.fixture.ts`)
- Added unit and rendering tests for article list helpers, `ArticleCard`, and `ArticlesPage` loading/error/empty/populated states. (`src/pages/articles/articlesPageUtils.test.ts`, `src/components/articles/ArticleCard.test.tsx`, `src/pages/articles/ArticlesPage.test.tsx`)

### Changed

- Updated `PageShell` to mount footer globally and removed per-page footer prop usage from the shell contract. (`src/components/layout/PageShell.tsx`)
- Simplified `LandingPage` to render landing sections only; footer mounting now comes from the shared shell path. (`src/pages/LandingPage.tsx`)
- Extended the shared `ContentSource` contract with `getFooter()` and implemented it for both static and Contentful sources. (`src/content/source.ts`, `src/content/static/staticSource.ts`, `src/content/contentful/contentfulSource.ts`)
- Exported `mapFooterSection` for direct use in `contentfulSource.getFooter()` mapping. (`src/content/contentful/adapters.ts`)
- Extracted Articles page sorting/normalization logic into a dedicated helper module and updated `ArticlesPage` to consume it without runtime behavior changes. (`src/pages/articles/articlesPageUtils.ts`, `src/pages/articles/ArticlesPage.tsx`)

### Verification

- `npm run test -- src/content/contentful/adapters.test.ts` (passes)
- `npm run test -- src/pages/articles/ArticlesPage.test.tsx src/components/articles/ArticleCard.test.tsx src/pages/articles/articlesPageUtils.test.ts` (passes: Vitest 19/19 tests)
- `npm run build` (passes: `tsc -b` + `vite build`; local Node warning persists when runtime is below the Node 22 baseline)

## [2026-04-21]

### Changed

- Introduced global footer content modeling in raw frontend types, including `sectionFooter`, `footerLinkGroup`, and `footerLink` fields (`kind`, `iconKey`, `openInNewTab`, link metadata), plus `LandingPageData.footer` support. (`src/content/contentful/types.ts`)
- Updated Contentful landing data flow to fetch a global footer entry, map footer links/groups defensively, and preserve fallback compatibility when a footer section is embedded in page sections. (`src/content/contentful/api.ts`, `src/content/contentful/adapters.ts`, `src/content/contentful/contentfulSource.ts`)
- Implemented footer normalization with stable defaults (`navigationGroups`/`socialLinks` arrays), invalid-link filtering (`href` required), key fallbacks (`internalName ?? label`), icon key passthrough, and open-in-new-tab heuristics (external `http/https` defaults true; anchors/relative/mailto defaults false). (`src/components/sections/footer/normalizeFooterSection.ts`)
- Built the editorial `FooterSection` UI with top and bottom dividers, brand block (title/subtitle/summary), inline social links, right-side nav groups, understated legal/meta row, and centralized SVG icon rendering from `iconKey` (`github`, `linkedin`, `email`, `external`, `arrow`, `none`). (`src/components/sections/FooterSection.tsx`, `src/components/sections/FooterSection.css`, `src/components/sections/footer/FooterLinkIcon.tsx`)
- Mounted the global footer from landing-page data through the page shell so footer rendering is explicit and outside normal section flow while keeping section-renderer compatibility. (`src/pages/LandingPage.tsx`, `src/components/layout/PageShell.tsx`)
- Added footer fixture/story/test coverage for static mode and rendering/normalization safety (link filtering, key fallback behavior, target defaults). (`src/content/static/fixtures.ts`, `src/components/sections/sectionStoryFixtures.ts`, `src/components/sections/footer/FooterSection.stories.tsx`, `src/components/sections/footer/normalizeFooterSection.test.ts`, `src/components/sections/SectionRenderer.test.tsx`)
- Added a production `/articles` index page using only the existing Article model (no `pageArticlesIndex` dependency), with loading/error/empty/success states, normalization, invalid-item filtering, and deterministic sort (`publishedAt` desc, fallback `updatedAt` desc, fallback title asc). (`src/pages/articles/ArticlesPage.tsx`, `src/pages/articles/ArticlesPage.css`)
- Added reusable article cards with optional hero media, metadata/date handling, excerpt, and detail CTA linking to the existing single-article route. (`src/components/articles/ArticleCard.tsx`, `src/components/articles/ArticleCard.css`)
- Extended content-source contracts with `getAllArticles()` and implemented both static and Contentful paths (including paginated Contentful article fetching and list-item mapping), then wired `/articles` route handling while preserving `/articles/:slug` detail routing. (`src/content/source.ts`, `src/content/static/staticSource.ts`, `src/content/static/fixtures.ts`, `src/content/contentful/api.ts`, `src/content/contentful/adapters.ts`, `src/content/contentful/contentfulSource.ts`, `src/router/routes.ts`, `src/router/Router.tsx`, `src/content/contentful/types.ts`)

### Verification

- `npm run lint` (passes)
- `npm run test` (passes: Vitest 17/17 tests)
- `npm run build` (passes: `tsc -b` + `vite build`; local Node warning persists when runtime is below the Node 22 baseline)

## [2026-04-17]

### Changed

- Expanded Skills content types for additive migration compatibility by supporting optional section/group metadata (`eyebrow`, `intro`, `description`, `iconKey`, `internalName`) and legacy+new skill level unions (`working|strong|expert` and `expanding|active|core`). (`src/content/contentful/types.ts`)
- Refactored Skills normalization into a stable view-model pipeline with safe array defaults, trimmed/fallback text handling, stable key generation, and explicit level normalization to render-only labels (`Core`, `Active`, `Expanding`). (`src/components/sections/skills/normalizeSkillsSection.ts`)
- Reworked `SkillsSection` into an editorial split-list layout: section header at top, two-column group layout on desktop/one-column on mobile, flat group blocks, row dividers, level pills, and muted keyword lines (`keywords.join(" · ")`) without card chrome or inline style usage. (`src/components/sections/SkillsSection.tsx`, `src/components/sections/SkillsSection.css`)
- Updated static and Storybook fixtures to exercise richer additive Skills shapes while preserving migration compatibility for sparse/legacy entries. (`src/content/static/fixtures.ts`, `src/components/sections/sectionStoryFixtures.ts`, `src/components/sections/SkillsSection.stories.tsx`)
- Expanded Skills normalizer tests to assert all enum compatibility mappings (`expert/core -> Core`, `strong/active -> Active`, `working/expanding/undefined -> Expanding`) plus fallback-key stability for missing IDs/arrays. (`src/components/sections/skills/normalizeSkillsSection.test.ts`)
- Refactored Projects from a stacked card/grid presentation to a responsive horizontal scroll-snap slider with lightweight prev/next controls, reduced-motion-aware scrolling, and maintained keyboard/touch accessibility without introducing a third-party carousel dependency. (`src/components/sections/ProjectsSection.tsx`, `src/components/sections/ProjectsSection.css`)
- Extended Projects normalization for slider-oriented view models: stable keys, safe array defaults, link destination filtering, article-aware href resolution, and `projectLink.kind`-based action variant mapping (`case-study/article -> primary`, `demo -> secondary`, `code/other -> text`). (`src/components/sections/projects/normalizeProjectsSection.ts`)
- Implemented Phase 2 additive Projects support across frontend types, adapter mapping, normalizer output, and slider card rendering by adding section `eyebrow/intro`, project `featured/thumbnail/thumbnailAlt/highlights`, and richer `projectLink` semantics (`internalName`, `href`, `variant`, `openInNewTab`, `ariaLabel`, `analyticsLabel`) with backfill-safe fallbacks. (`src/content/contentful/types.ts`, `src/content/contentful/adapters.ts`, `src/components/sections/projects/normalizeProjectsSection.ts`, `src/components/sections/ProjectsSection.tsx`)
- Updated Projects static fixtures and Storybook coverage to exercise richer slider cards (media, featured badge, highlights, metadata, varied action kinds/variants, and single-project fallback behavior) while preserving static and Contentful source compatibility. (`src/content/static/fixtures.ts`, `src/components/sections/sectionStoryFixtures.ts`, `src/components/sections/ProjectsSection.stories.tsx`)
- Expanded Projects normalizer tests to cover additive field normalization, protocol-relative thumbnail URL handling, thumbnail alt fallback order (`thumbnailAlt -> asset title -> project name`), link resolution order (`article -> href -> url`), open-in-new-tab defaults, variant fallback semantics, and invalid-link filtering. (`src/components/sections/projects/normalizeProjectsSection.test.ts`)
- Implemented Learning Phase 2 additive support end-to-end: expanded Learning raw types (`eyebrow`, `intro`, item `internalName`, `focusAreas`), added defensive Contentful adapter mapping, rewrote Learning normalizer for safe defaults (`items -> []`, `status -> exploring`, `focusAreas -> []`), explicit status labels (`Exploring`, `Practicing`, `Shipping`), stable keys (`internalName ?? topic`), and strict legacy action gating (`linkLabel` + `linkUrl` required). (`src/content/contentful/types.ts`, `src/content/contentful/adapters.ts`, `src/components/sections/learning/normalizeLearningSection.ts`)
- Refreshed Learning UI and coverage to render section eyebrow/title/intro plus richer cards (status treatment, focus-area badges, optional action link) using shared primitives and colocated CSS only; updated static/story fixtures and Storybook/testing scenarios for sparse/backfill data compatibility. (`src/components/sections/LearningSection.tsx`, `src/components/sections/LearningSection.css`, `src/content/static/fixtures.ts`, `src/components/sections/sectionStoryFixtures.ts`, `src/components/sections/LearningSection.stories.tsx`, `src/components/sections/learning/normalizeLearningSection.test.ts`)

### Verification

- `npm run lint` (passes)
- `npm run test` (passes: Vitest 13/13 tests)
- `npm run build` (passes: `tsc -b` + `vite build`; local Node warning persists when runtime is below the Node 22 baseline)
- `npm run build-storybook` (blocked locally by Node runtime requirement: Storybook requires `>=20.19` or `>=22.12`)

## [2026-04-16]

### Changed

- Added explicit Node engine constraints to enforce a Storybook/Vite-compatible Node 22 runtime baseline. (`package.json`)
- Updated local setup docs to prioritize Homebrew-based Node upgrades and include shell cache/path guidance after upgrading. (`README.md`)
- Standardized Storybook dev script to explicit long-form port flag (`storybook dev --port 6006`) for clearer runtime invocation. (`package.json`, `docs/planning/storybook-migration-plan.md`)

### Verification

- `node -v` resolves to a Node 22 runtime in the workspace shell.
- `npm run storybook -- --help` runs and prints Storybook CLI usage.

## [2026-04-15]

### Added

- Added shared error normalization helper `getErrorMessage` to standardize unknown error handling in async UI flows. (`src/lib/errors.ts`)
- Added a consolidated senior-readiness context/spec document to capture architecture findings, decisions, anti-drift protocol, and component API rollout guidance. (`docs/design-system/audit/2026-04-15-senior-readiness-context.md`)
- Added reusable layout primitives `Inline`, `Cluster`, and `Grid` with typed contracts and colocated CSS for repeated flex/grid patterns. (`src/components/ui/{Inline,Cluster,Grid}.{tsx,css}`)
- Added section normalization modules for timeline/skills/projects/learning/contact to enforce stable view-model inputs before render. (`src/components/sections/*/normalize*.ts`)
- Added Storybook workspace scaffolding and stories (primitives, sections, and foundation stories). (`.storybook/*`, `src/components/**/*.stories.tsx`, `src/stories/*`)
- Added component/normalizer test coverage plus renderer integration coverage. (`src/components/ui/*.test.tsx`, `src/components/sections/**/normalize*.test.ts`, `src/components/sections/SectionRenderer.test.tsx`)
- Added CI workflow gates for `lint`, `build`, `test`, and `build-storybook`. (`.github/workflows/ci.yml`)

### Changed

- Updated `README.md` to match current routing/content behavior (`/debug`, `contentful` vs `static` source support), corrected env var guidance, and refreshed troubleshooting/checklist wording. (`README.md`)
- Removed `any`-based error parsing in page/layout fetch states by routing unknown errors through `getErrorMessage`. (`src/components/layout/Header.tsx`, `src/pages/LandingPage.tsx`, `src/pages/ArticlePage.tsx`, `src/pages/DebugPage.tsx`)
- Tightened `RichTextRenderer` typing by replacing untyped node handling with explicit rich-text node/mark shapes and safer document normalization. (`src/components/rich-text/RichTextRenderer.tsx`)
- Hardened polymorphic UI primitives typing to avoid unsafe `any` element casts while preserving `as` support for HTML tags. (`src/components/ui/Container.tsx`, `src/components/ui/Heading.tsx`, `src/components/ui/Stack.tsx`, `src/components/ui/Text.tsx`)
- Centralized runtime configuration usage by wiring Contentful client/adapters to shared `env` values and removing conflicting inline env defaults. (`src/env.ts`, `src/content/contentful/client.ts`, `src/content/contentful/adapters.ts`)
- Updated Contentful API fetch helpers to use explicit unknown-bridge casts compatible with strict TypeScript checks and removed stale legacy blocks. (`src/content/contentful/api.ts`)
- Tightened static data typing: `makeSys` now uses `EntryTypeId`, and static article source now explicitly consumes unused slug input. (`src/content/static/fixtures.ts`, `src/content/static/staticSource.ts`)
- Implemented a token-driven button API surface with explicit `variant` (`primary`/`secondary`/`text`), `size` (`sm`/`md`/`lg`), `fullWidth`, and consistent disabled/focus/active behavior across anchor/button render modes. (`src/components/ui/Button.tsx`, `src/components/ui/Button.css`, `src/styles/tokens.css`, `src/components/ui/Link.tsx`)
- Removed section-level CTA style overrides by migrating Hero/Timeline action rendering to the shared Button variants and cleaning timeline-specific CTA variant CSS. (`src/components/sections/primitives/ActionGroup.tsx`, `src/components/sections/TimelineSection.tsx`, `src/components/sections/TimelineSection.css`)
- Synced design-system docs with the new button API and context source of truth link. (`docs/design-system/design-system.md`, `docs/design-system/components.md`, `docs/design-system/foundations.md`)
- Standardized primitive API contracts for `Link`, `Card`, `Badge`, `Text`, and `Heading` with explicit variants/sizes/states and class-driven styling (no style-prop hacks in section consumers). (`src/components/ui/*`)
- Removed inline visual styles from Hero/Skills/Projects/Learning/Contact and section primitives by moving styles into colocated CSS and layout primitives. (`src/components/sections/{Hero,Skills,Projects,Learning,Contact}Section.*`, `src/components/sections/primitives/*`)
- Refactored `TimelineSection` to render from normalized view models and updated timeline card/date/summary class contracts. (`src/components/sections/TimelineSection.tsx`, `src/components/sections/TimelineSection.css`, `src/components/sections/timeline/normalizeTimelineSection.ts`)
- Hardened `SectionRenderer` with a typed section mapping keyed by content type IDs and removed cast-based dispatching. (`src/components/sections/SectionRenderer.tsx`)
- Improved navigation accessibility behavior (explicit button types, mobile drawer mount semantics, focus return, reduced-motion coverage). (`src/components/navigation/ResponsiveNav.tsx`, `src/components/navigation/Navigation.css`, `src/components/layout/Header.tsx`)
- Updated Storybook migration documentation and design-system docs to reflect implemented architecture state. (`docs/planning/storybook-migration-plan.md`, `docs/design-system/*`, `docs/design-system/audit/2026-04-15-senior-readiness-context.md`)

### Verification

- `npm run lint` (passes)
- `npm run build` (passes: `tsc -b` + `vite build`)
- `npm run test` (passes: Vitest 10/10 tests)
- `npm run build-storybook` (passes; Storybook v10 build succeeds)

## [2026-04-14]

### Verification

- `npm run build` (passes: tsc + vite)

## [2026-04-12]

### Changed

- Extended timeline types to support section eyebrow/intro, item context, additive date fields (`startDateValue`, `endDateValue`, `isCurrent`), media/media alt, actions, and tags; added reusable `TimelineMedia` and `TimelineAction` unions. (`src/content/contentful/types.ts`)
- Added defensive timeline mapping in the Contentful adapters with section/item normalization, `anchorId` fallback, safe array defaults, additive field passthrough, and legacy compatibility. (`src/content/contentful/adapters.ts`)
- Refreshed timeline rendering to support eyebrow/intro, context, backward-compatible date-range normalization (`Present` handling + ISO formatting fallback), tags, variant-aware actions, and CMS media preference while preserving static fallback illustration rotation. (`src/components/sections/TimelineSection.tsx`)
- Added timeline styles for new content pieces (`.timeline-eyebrow`, `.timeline-intro`, `.timeline-context`, `.timeline-tags`, `.timeline-tag`, `.timeline-action`) while preserving existing layout language and breakpoints. (`src/components/sections/TimelineSection.css`)
- Updated static timeline fixtures to include additive fields, media/media alt, actions, and section eyebrow/intro for local development coverage. (`src/content/static/fixtures.ts`)
- Synced design-system documentation for timeline model/API updates, mapping behavior, classnames, and CSS location. (`docs/design-system/sections/timeline-section.md`, `docs/design-system/components.md`)

### Verification

- Not run (`npm run build` not executed in this changelog update step).

## [2026-03-25]

### Added

- Section primitives extracted for reuse across sections: `SectionHeader` (eyebrow/name/title/lead/body/actions), `ActionGroup` (variant-aware CTAs), `ProofList` (muted proof bullets), and `MediaFrame` (avatar/image framing with tokenized radii). (src/components/sections/primitives/*)

### Changed

- Hero now renders through the new primitives and normalized data only: header + actions via `SectionHeader`, proof points via `ProofList`, media via `MediaFrame`, keeping the existing grid layout and action gating. (src/components/sections/HeroSection.tsx)
- Hero normalization hardened: coalesces new/legacy text and list fields, filters empty proof points, normalizes protocol-relative media URLs, and adds asset-title fallback for avatar alt text. (src/components/sections/hero/normalizeHeroSection.ts)
- Button component typing now supports both anchor and native button modes (target/rel/aria-label typed), removing the TS error when rendering link-style buttons. (src/components/ui/Button.tsx)

### Notes

- Hero schema is now treated as new-model only across code and docs; legacy fields and fallbacks were removed from `SectionHero`, hero normalization, static fixtures, and IA documentation.

### Verification

- `npm run build` (passes: tsc + vite)

## [2026-03-24]

### Changed

- Timeline section responsiveness hardened for medium/tablet widths: keep each item as a two-column text/visual pair from 640px up, activate alternating flip at the same breakpoint, tighten gaps, and clamp media widths so visuals shrink before stacking. Mobile (≤639px) now stacks with natural order; desktop (≥1024px) unchanged. (src/components/sections/TimelineSection.css)
- Article page readability improvements: rich text renderer now supports marks (bold/italic/underline/code), safe external links, and embedded asset rendering (inline + block) with captions/alt resolution; hero and attachment lists styled for clarity with responsive widths and type badges; page now formats author/published/updated metadata. (src/components/rich-text/RichTextRenderer.tsx, src/pages/ArticlePage.tsx, src/pages/ArticlePage.css)
- Hero section now normalizes legacy and new Contentful hero fields (lead/body/proofPoints/actions/alt text) into a single render shape; button variants respect action metadata; media alt and protocol-relative URLs handled consistently. (src/components/sections/HeroSection.tsx, src/components/sections/hero/normalizeHeroSection.ts, src/content/contentful/types.ts)

### Verification

- Manual check at ~900/800/720px: rows stay horizontal, row 2 flips (visual left), gaps/media slightly tighter.
- Manual check at ~620px: items stack vertically with natural reading order and comfortable spacing.
- Spot check ≥1024px: layout matches previous desktop behavior.
- Article sanity pass: render article with hero image, inline + block embedded assets, bold/code/links, and multiple attachments; verify images lazy-load, captions/alt show, links open in new tab with noopener, attachments display type badges and stay tappable on mobile.
- Hero sanity pass: render legacy hero entries (tagline/intro/highlights + split CTAs) and new entries (lead/body/proofPoints/actions with alt text); ensure variant buttons apply correct styles/targets and media fall back to typographic when assets are missing.

## [2026-03-20]

### Changed

- Mobile navigation drawer now spans the full viewport (left/right 0, 100% width) to stop small-screen overflow and ensure the menu overlays content instead of pushing it sideways. (src/components/navigation/Navigation.css)
- Global overflow hardening: `body` now hides horizontal overflow; drawer scroll-lock also hides `overflowX` while open to prevent scrollbars when toggling the menu. (src/styles/base.css, src/components/navigation/ResponsiveNav.tsx)

### Verification

- Manual checks recommended: 480/640/768/900 px open/close menu (no horizontal scrollbar, overlay dims background, content stable) and desktop >960 px unchanged, resize back and forth.


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
- Added static content source + fixtures with timeline media/CTA populated from local assets, and `getContentSource` now honors the `VITE_CONTENT_SOURCE` selector.
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
- Navigation styles aligned to tokenized radii and shadow for panels, pills, toggles, and panel chrome in `src/components/navigation/Navigation.css`.
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
- Navigation styles in `src/components/navigation/Navigation.css` covering sticky header, desktop mega panel, mobile drawer, accordions, CTA, and focus/hover states.

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
