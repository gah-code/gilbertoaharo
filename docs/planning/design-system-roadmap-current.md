# Design System + UX Roadmap - Current

Date: May 15, 2026  
Status: Phase 3 closed; Phase 4 ready for evidence capture
Mode: preserve UI-first, CMS-second architecture; no layout/IA/routing/CMS changes without explicit approval.

Preferred path:

Audit and measure first -> fix canonical/SEO basics -> verify tokens and interaction states -> confirm desktop CLS and image delivery evidence -> decide typography conservatively -> improve Card/ArticleCard/Projects/Learning polish -> harden accessibility/responsive behavior -> expand Storybook and regression coverage -> release with checkpoint log.

## Phase 1 - Baseline Freeze and Measurement

Objective:

- Freeze the current evidence baseline before any implementation changes.

Why it matters:

- The live site has mixed signals: strong local validation, high mobile Lighthouse performance, weak SEO, a serious desktop CLS Lighthouse lab finding that still needs trace/filmstrip confirmation, and image payload issues. A baseline prevents accidental scope creep.

Scope:

- Preserve `.tmp/design-system-audit/` locally as raw measurement evidence.
- Record current Lighthouse scores and local command results.
- Confirm current Node/runtime parity note.
- Decide whether `.tmp/` should remain untracked or be cleaned manually before PR.

Out of scope:

- Production component changes.
- CMS changes.
- Design polish.

Files likely affected:

- Docs only: audit and roadmap docs.
- Optional later: `docs/planning/TASKS.md` if this roadmap is accepted as active.

Acceptance criteria:

- Current audit and roadmap docs exist.
- Baseline metrics are captured.
- Known blocked checks are documented.
- No production code changes are included.

Risk:

- Low.

Dependencies:

- None.

Validation commands:

- `git status --short`
- Review `.tmp/design-system-audit/` artifact list.

Rollback strategy:

- Remove the new docs if the roadmap is rejected.

Type:

- Audit-only / docs-only.

## Phase 2 - Domain/SEO Foundation Cleanup

Objective:

- Fix crawler basics and canonical confidence.

Why it matters:

- The initial audit found Lighthouse SEO at 77 because `robots.txt` and `sitemap.xml` returned SPA HTML and canonical was not valid on the live page. Phase 2 closeout now verifies these live SEO basics are fixed.

Scope:

- Add valid `robots.txt`.
- Add valid `sitemap.xml` or a documented build-time generation path.
- Ensure Netlify redirect rules do not rewrite crawler files.
- Validate crawler file bodies with `curl -s`, not headers alone.
- Require `robots.txt` and `sitemap.xml` to avoid SPA fallback HTML such as `<!doctype html>` or `<div id="root">`.
- Verify `VITE_SITE_URL` or canonical generation yields absolute canonical URLs.
- Clean up `index.html` fallback SEO: title, meta description, favicon/app icon references, and baseline share metadata where appropriate.
- Replace weak visible link text where content-only updates are enough.
- Clarify canonical domain as `gilbertaharo.com` unless alternate domain ownership changes.

Out of scope:

- Article schema and Person schema unless the basic files are already stable.
- Route restructuring.
- CMS migrations.

Files likely affected:

- `public/robots.txt`
- `public/sitemap.xml` or sitemap generation script
- `index.html`
- `public/*` icon assets or manifest files, if fallback icon references need correction
- `src/lib/seo.ts`
- `src/components/layout/SeoHead.tsx`
- relevant SEO tests
- deployment env/config docs

Acceptance criteria:

- `curl -s https://gilbertaharo.com/robots.txt` returns valid robots text with expected directives.
- `curl -s https://gilbertaharo.com/sitemap.xml` returns XML sitemap content.
- Neither crawler file body contains SPA fallback HTML such as `<!doctype html>` or `<div id="root">`.
- Lighthouse SEO target is >= 95.
- Canonical is absolute and valid.
- `index.html` has a portfolio-appropriate fallback title, meta description, favicon/app icon references, and baseline share metadata where appropriate.
- Debug routes are handled intentionally in robots/sitemap policy.

Risk:

- Low-medium, because canonical/deploy env mistakes can affect indexing.

Dependencies:

- Phase 1 baseline.

Validation commands:

- `npm run lint`
- `npm run test`
- `npm run build`
- `curl -s https://gilbertaharo.com/robots.txt`
- `curl -s https://gilbertaharo.com/sitemap.xml`
- Inspect both crawler file bodies and confirm no SPA fallback HTML is returned.
- Lighthouse SEO rerun.

Rollback strategy:

- Revert SEO file additions and canonical helper changes; restore previous deploy config.

Type:

- Implementation, but no layout/functionality change.

Closeout checkpoint (May 15, 2026):

- Status: Closed.
- Local Phase 2 implementation completed and live deploy verification passed.
- Added static crawler files, absolute canonical fallback behavior, stronger `index.html` fallback metadata, a replacement favicon, and a generic project-action label guard.
- Netlify fallback config was inspected and left unchanged because static files should shadow the SPA fallback when present.
- Validation passed locally: `npm run lint`, `npm run test`, `npm run build`, `xmllint --noout dist/sitemap.xml`, and built `dist/robots.txt`/`dist/sitemap.xml` body inspection.
- Live verification passed: `robots.txt` returns valid robots text, `sitemap.xml` returns XML, neither crawler file returns SPA HTML, and live root metadata is updated.
- Lighthouse SEO follow-up returned `100`; canonical, robots, and crawlability audits passed.
- Root cause of the prior blocker: Netlify stale deploy/cache. The local source/build artifact was valid, but the live site had not yet served the Phase 2 deploy artifact.
- No layout, IA, routing, CMS model, Contentful migration, Phase 3 token work, or production component behavior changes were introduced during Phase 2 closeout.

Resolved blocker history (May 15, 2026):

- Initial live verification was blocked because the live site still served old SPA HTML for `robots.txt` and `sitemap.xml`, and the root HTML still showed old Vite-era fallback metadata.
- Deploy/cache refresh resolved the mismatch. Current evidence is documented in `docs/planning/phase-2-deploy-artifact-validation-spec.md`.

## Phase 3 - Token Verification and Responsive/Motion Token Alignment

Objective:

- Fix token defects and document the responsive/motion baseline before visual work.

Why it matters:

- The initial confirmed defect was that `LearningSection.css` referenced undefined `--space-5`; that first token fix is now applied. Breakpoints and motion tokens exist, but some CSS still uses local values that should be documented before broader polish.

Scope:

- Fix or define `--space-5`.
- Audit undefined CSS custom properties.
- Keep breakpoint reference-token strategy documented.
- Align obvious hard-coded nav/section transition values where safe.
- Add token QA notes to foundations docs.

Out of scope:

- Broad visual redesign.
- Replacing all explicit media queries.

Files likely affected:

- `src/styles/tokens.css`
- `src/components/sections/LearningSection.css`
- possibly `src/components/navigation/Navigation.css`
- `docs/design-system/foundations.md`
- token stories

Acceptance criteria:

- No undefined design token references in production CSS.
- Learning wide breakpoints preserve intended padding.
- Motion/reduced-motion behavior remains intact.

Risk:

- Low.

Dependencies:

- Phase 1.

Validation commands:

- `rg -n -- "var\\(--space-5\\)|--space-5" src docs`
- `npm run lint`
- `npm run test`
- `npm run build`
- Use Node 22.12+ via `.nvmrc`, `.node-version`, or an equivalent version manager, then run `npm run build-storybook`

Rollback strategy:

- Revert token/CSS changes.

Type:

- Implementation, token-only.

Current implementation checkpoint (May 15, 2026):

- Status: In progress — first token defect fixed.
- Phase 2 live SEO gate was confirmed closed before Phase 3 work began.
- Added missing `--space-5: 1.25rem` to `src/styles/tokens.css` and included it in `src/stories/Tokens.stories.tsx`.
- Decision used: add the missing midpoint token because `LearningSection.css` intentionally uses `--space-5` between `--space-4` and `--space-6` at wide breakpoints.
- Focused undefined CSS custom property scan found no concrete undefined references after the fix. The only pre-filter false positive was the dynamic `Stack` template string (`var(--space-${gap})`), which is not a concrete token reference.
- Responsive/motion baseline review: breakpoint reference tokens and motion tokens exist; explicit media-query values remain intentional because CSS custom properties are not reliable in media queries. Navigation still has local hard-coded transition values and should remain a deferred polish item, not part of this token defect fix.
- Validation passed: `npm run lint`, `npm run test`, `npm run build`, focused CSS custom property scan, and `npm run build-storybook` with Node `22.12.0` selected through the local version manager.
- Node note: default shell Node remains `v22.2.0`; `npm run build` passes but prints the known Vite Node-floor warning. `.nvmrc` and `.node-version` both specify `22.12.0`.
- No layout, IA, routing, CMS model, Contentful migration, typography, card/elevation, section redesign, or production component behavior changes were made.

Batch 2 checkpoint (May 15, 2026):

- Status: In progress — motion/responsive baseline documented.
- Motion inventory confirms primitives, ArticleCard, Projects, Hero, and Footer use shared motion tokens with reduced-motion coverage.
- Navigation still uses local `0.12s`, `0.15s`, and `0.2s` `ease` transitions. No exact-equivalent substitution was made because the current tokens use `120ms`/`180ms` with `cubic-bezier(0.2, 0, 0, 1)`, so replacing navigation values would be a behavior change rather than token hygiene.
- Responsive inventory confirms breakpoint reference tokens exist for `40rem`, `48rem`, `60rem`, `64rem`, and `80rem`; explicit media-query values remain acceptable because CSS custom properties are not reliable inside media queries.
- Deferred responsive findings: Learning's `96rem` wide-layout breakpoint, `820px` hero tuning, `900px`/`901px` footer/header tuning, and compact `480px` adjustments should be reviewed during responsive QA instead of Phase 3.
- README Storybook guidance now uses portable Node `22.12+` instructions via `.nvmrc`, `.node-version`, or an equivalent version manager instead of a machine-specific PATH command.
- No layout, IA, routing, CMS model, Contentful migration, typography, card/elevation, image delivery, CLS, or visual polish work was started.

Closeout checkpoint (May 18, 2026):

- Status: Closed.
- `--space-5` token defect is resolved and documented in `src/styles/tokens.css`, `src/stories/Tokens.stories.tsx`, and `docs/design-system/foundations.md`.
- Focused CSS custom property scan passes. The only remaining scan hit is the documented dynamic `Stack` false positive (`--space-` from `var(--space-${gap})`).
- Motion baseline is documented: primitives, ArticleCard, Projects, Hero, and Footer use shared motion tokens with reduced-motion coverage.
- Responsive/breakpoint baseline is documented: reference tokens remain documentation/JS anchors, and explicit media-query values remain the browser-safe CSS strategy.
- Deferred findings are preserved for navigation hard-coded transition values and section-specific breakpoints (`96rem`, `820px`, `900px`/`901px`, `480px`); these are later QA/polish findings, not Phase 3 blockers.
- Current Storybook guidance uses portable Node `22.12+` instructions through `.nvmrc`, `.node-version`, or an equivalent version manager.
- Validation passed: `npm run lint`, `npm run test`, `npm run build`, `npm run build-storybook` with Node `22.12.0`, focused CSS custom property scan, motion scan, breakpoint scan, machine-specific command scan for current guidance, and `git diff --check`.
- No layout, IA, routing, CMS model, Contentful migration, typography/card/elevation polish, image delivery, CLS implementation, or production behavior changes were introduced during Phase 3 closeout.
- Reopen only if a true regression is discovered in token definitions, undefined custom property hygiene, motion/reduced-motion documentation, breakpoint reference documentation, or current Storybook Node guidance.

## Phase 4 - Image Delivery and Desktop CLS Confirmation

Objective:

- Confirm the serious desktop CLS Lighthouse lab finding with trace/filmstrip review and address image delivery before typography or card visual polish.

Why it matters:

- The audit found heavy live image payloads and a serious desktop CLS Lighthouse lab finding. The CLS finding needs trace and filmstrip evidence before its root cause is assigned.

Scope:

- Review Lighthouse trace/filmstrip output for desktop CLS before assigning root cause.
- Identify whether the shift is caused by async content, media sizing, header/footer behavior, font fallback, or another source.
- Review Contentful image delivery and responsive image sizing opportunities.
- Define the smallest safe image delivery adjustment path that preserves current UI-first, CMS-second contracts.
- Keep any later implementation limited to asset sizing/format/reservation behavior unless explicit approval expands scope.

Out of scope:

- Layout redesign.
- Routing changes.
- CMS migrations or destructive Contentful field changes.
- Typography, card, or section visual polish.

Files likely affected:

- `src/content/contentful/*`
- `src/components/sections/*`
- `src/components/articles/ArticleCard.*`
- `src/components/rich-text/*`
- performance/audit docs

Acceptance criteria:

- Desktop CLS has trace/filmstrip evidence before root cause is documented.
- Image delivery recommendations distinguish confirmed issues from likely issues.
- Any approved image work preserves existing content contracts and section layout concepts.
- Lighthouse desktop/mobile performance is rerun after any image or reservation change.

Risk:

- Medium, because asset sizing changes can affect live visual quality.

Dependencies:

- Phase 1 baseline.
- Phase 2 SEO cleanup preferred first if crawler fixes are already in motion.

Validation commands:

- Lighthouse desktop rerun with trace/filmstrip artifacts.
- Lighthouse mobile rerun if image delivery changes.
- `npm run build`
- Review generated asset/network payloads.

Rollback strategy:

- Revert image helper, sizing, or reservation changes; preserve trace evidence in the audit folder.

Type:

- Investigation first; implementation only after confirmation.

Readiness checkpoint (May 18, 2026):

- Status: Ready / next, but not started.
- Why Phase 4 exists: the current audit found heavy live image payloads and a serious desktop CLS Lighthouse lab finding that should be confirmed before visual polish or implementation changes.
- Current evidence: `.tmp/design-system-audit/lighthouse-desktop.report.json`, `.tmp/design-system-audit/lighthouse-desktop.report.html`, `.tmp/design-system-audit/lighthouse-mobile.report.json`, `.tmp/design-system-audit/lighthouse-mobile.report.html`, and Phase 2 SEO follow-up artifacts remain local/untracked.
- Missing evidence: trace/filmstrip review that identifies the exact desktop CLS source, image payload inventory by asset/source, and confirmation of whether Contentful image sizing, async content, media reservation, header/footer behavior, or font fallback contributes to the shift.
- Required first task: capture or review Lighthouse desktop trace/filmstrip evidence and image network payload evidence before assigning root cause or changing image delivery.
- Files likely affected later, after evidence: `src/content/contentful/*`, `src/components/sections/*`, `src/components/articles/ArticleCard.*`, `src/components/rich-text/*`, and performance/audit docs.
- Out of scope until Phase 4 implementation starts: image helper changes, `srcset`/format changes, layout reservation changes, CLS fixes, route changes, CMS migrations, typography, card/elevation, or section visual polish.

Evidence checkpoint (May 18, 2026):

- Status: Evidence captured; implementation not started.
- Evidence report: `docs/planning/phase-4-image-cls-evidence.md`.
- Fresh Lighthouse desktop artifacts were captured locally under `.tmp/design-system-audit/` and remain untracked.
- CLS evidence is conflicting: previous desktop artifact reported `0.908`, while the fresh Phase 4 desktop run reported `0.009` and only identified the broad `main#main-content` node. Do not assign a CLS root cause or implement layout reservation changes until a repeated trace/filmstrip review confirms a specific source.
- Image payload issue is confirmed: fresh Lighthouse desktop reports `8,356 KiB` total byte weight, `5` image requests totaling `8,388,839 B`, and `8,101 KiB` estimated image-delivery savings. The largest assets are raw Contentful hero/timeline images.
- Code-path inspection found raw Contentful asset URLs flowing through hero, timeline, project, article card, article detail, and rich-text rendering paths. Future implementation should use derived Contentful image URLs/`srcset`/`sizes` without changing CMS models or normalized content contracts.
- No image delivery implementation, CLS fix, layout change, routing change, CMS model change, Contentful migration, typography/card/elevation polish, or production behavior change was introduced during evidence capture.

Implementation planning checkpoint (May 18, 2026):

- Status: Planning complete; implementation not started.
- Plan: `docs/planning/phase-4-image-delivery-implementation-plan.md`.
- Repeat desktop Lighthouse sanity check reproduced severe CLS (`0.908`) but still identified only the broad `main#main-content` node. CLS fixes remain blocked until trace/filmstrip review isolates a specific source.
- Recommended first implementation batch: add a pure, unit-tested Contentful image URL helper at `src/lib/images/contentfulImage.ts`.
- Recommended first adoption surfaces: Hero media through `MediaFrame`, then Timeline media images. Projects, ArticleCard, ArticlePage, and RichTextRenderer remain later extensions after Hero/Timeline prove the pattern.
- No image rendering, layout reservation, CMS model, Contentful migration, route, typography/card/elevation, or production behavior change was introduced during planning.

Batch 4.1 checkpoint (May 18, 2026):

- Status: Helper implemented; no UI adoption yet.
- Added pure Contentful image URL helper and tests: `src/lib/images/contentfulImage.ts`, `src/lib/images/contentfulImage.test.ts`.
- Helper covers URL normalization, Contentful image URL detection, transformed URL generation, and `srcset` generation while preserving non-Contentful URL behavior.
- Targeted validation passed: `npm run test -- src/lib/images/contentfulImage.test.ts`.
- No Hero, MediaFrame, Timeline, Projects, ArticleCard, ArticlePage, RichTextRenderer, CSS, layout, routing, CMS model, Contentful migration, CLS fix, typography/card/elevation, or production image rendering adoption was introduced in Batch 4.1.

Batch 4.2 checkpoint (May 18, 2026):

- Status: Hero/MediaFrame adoption implemented; Timeline and later image surfaces remain untouched.
- `MediaFrame` now accepts optional generic `srcSet` and `sizes` props while preserving existing `src`, `alt`, `loading`, `decoding`, markup, CSS, and aspect-ratio behavior.
- `HeroSection` derives transformed Contentful Hero image `src`, `srcset`, and `sizes` values using the existing helper (`webp`, quality `75`, widths `480/720/960/1200`, fallback width `1200`, sizes `(min-width: 1024px) 40vw, 90vw`).
- Non-Contentful Hero image URLs keep the existing single-`src` behavior and omit `srcset`/`sizes`.
- Targeted validation passed: `npm run test -- src/components/sections/HeroSection.test.tsx` and `npm run test -- src/lib/images/contentfulImage.test.ts`.
- No Timeline, Projects, ArticleCard, ArticlePage, RichTextRenderer, layout CSS, routing, IA, CMS model, Contentful migration, CLS fix, typography/card/elevation, or unrelated production behavior change was introduced in Batch 4.2.

## Phase 5 - Typography Decision and Type-Scale Refinement

Objective:

- Decide whether to keep the system stack or test one web font, then tune type only where evidence supports it.

Why it matters:

- The current system stack performs well. Typography is clear, but brand distinction and article readability can be improved without loading fonts.

Scope:

- Document preferred typography direction.
- Tune article/readable rhythm if needed.
- Avoid more than one new family if testing a web font.
- Keep body size readable on mobile.

Out of scope:

- Full brand redesign.
- Multiple font families.
- Font loading before SEO, image delivery, and CLS evidence are addressed.

Files likely affected:

- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/pages/ArticlePage.css`
- `src/stories/Typography.stories.tsx`
- design-system docs

Acceptance criteria:

- Typography direction is documented.
- If no web font is chosen, current stack remains explicit.
- If a web font is tested, `font-display: swap`, subset weights, and performance impact are documented.

Risk:

- Medium if adding web fonts; low if staying system stack.

Dependencies:

- Phases 2, 3, and 4 preferred first.

Validation commands:

- `npm run build`
- Lighthouse performance spot check if font changes.
- Visual viewport review.

Rollback strategy:

- Revert token/font CSS changes.

Type:

- Docs-first; implementation only after decision.

## Phase 6 - Component State/Elevation and ArticleCard/Card Pattern Polish

Objective:

- Tighten Button/Link/Card/Badge states, elevation guidance, and ArticleCard/project card hierarchy without changing component architecture.

Why it matters:

- Primitives are mature, and ArticleCard exists as a strong canonical article-list card. The remaining risk is inconsistent hierarchy across article, project, learning, media, and nav surfaces.

Scope:

- Define no-shadow, border-only, soft, elevated-hover usage.
- Verify focus rings remain visible over all surfaces.
- Tune only small state/elevation values if needed.
- Keep ArticleCard as canonical article-list card.
- Audit whether project/article cards should share only tokens or a deeper card spec.
- Improve visible link labels where generic labels remain.
- Add metadata rhythm guidance for article/project cards.
- Add or update stories for hover/focus/disabled/elevated/card examples only where a real state is missing.

Out of scope:

- New primitive architecture.
- Creating duplicate card components prematurely.
- Changing `/articles` routing.
- CMS field migrations.

Files likely affected:

- `src/components/ui/Card.css`
- `src/components/articles/ArticleCard.*`
- `src/components/sections/ProjectsSection.*`
- relevant section CSS
- `src/stories/InteractionStates.stories.tsx`
- `src/components/ui/Card.stories.tsx`
- story fixtures and docs

Acceptance criteria:

- Elevation model is documented.
- Focus-visible remains clear.
- Static content does not imply clickability.
- ArticleCard remains canonical.
- Generic "Read more" labels are replaced where possible.
- Card hierarchy supports scanning on mobile and desktop.

Risk:

- Medium, because subtle CSS and copy changes affect many surfaces.

Dependencies:

- Phase 2 for SEO/link text.
- Phase 3 for token correctness.
- Phase 4 for image/CLS evidence.

Validation commands:

- `npm run lint`
- `npm run test`
- `npm run test -- src/components/articles/ArticleCard.test.tsx src/pages/articles/ArticlesPage.test.tsx`
- `npm run build`
- Use Node 22.12+ via `.nvmrc`, `.node-version`, or an equivalent version manager, then run `npm run build-storybook`

Rollback strategy:

- Revert elevation/state CSS, story, and card copy changes.

Type:

- Docs plus small implementation with content-safe changes only.

## Phase 7 - ProjectsSection and LearningSection Design Pass

Objective:

- Refine the highest-density homepage sections after foundation and SEO/a11y issues are addressed.

Why it matters:

- Projects and Learning carry the strongest product signal, but they also have the most visual complexity and performance/a11y findings.

Scope:

- Projects: card hierarchy, action labels, confirmed image sizing strategy if Phase 4 identified one, slider discoverability.
- Learning: token fix verification, heading semantics, wide breakpoint spacing.
- Preserve current section order and layout concept.
- Preserve Contentful model and normalizer-first rendering.

Out of scope:

- Replacing scroll-snap slider with a third-party carousel.
- Changing IA.
- CMS migrations.

Files likely affected:

- `src/components/sections/ProjectsSection.*`
- `src/components/sections/LearningSection.*`
- `src/components/sections/learning/LearningRoadmapTimeline.*`
- section stories/tests

Acceptance criteria:

- No generic project action labels in visible UI.
- Learning spacing works at 80rem/96rem.
- Heading order is valid or intentionally documented.
- Any image delivery changes follow Phase 4 evidence and do not break CMS contracts.

Risk:

- Medium.

Dependencies:

- Phases 3, 4, 5, and 6.

Validation commands:

- `npm run test -- src/components/sections/ProjectsSection.test.tsx src/components/sections/LearningSection.test.tsx`
- `npm run build`
- Use Node 22.12+ via `.nvmrc`, `.node-version`, or an equivalent version manager, then run `npm run build-storybook`
- Lighthouse rerun if image changes

Rollback strategy:

- Revert section CSS/TSX and fixture/story changes.

Type:

- Implementation, scoped visual/a11y polish.

## Phase 8 - Accessibility and Responsive QA Hardening

Objective:

- Close Lighthouse/manual a11y issues and verify key responsive states.

Why it matters:

- Automated accessibility is high, but known issues affect screen reader/voice control users and semantic heading navigation.

Scope:

- Fix label-content-name mismatches.
- Fix heading-order skips.
- Verify mobile drawer focus return and focus trap after any nav changes.
- Verify focus is not obscured.
- Check touch target and text reflow on common viewport widths.
- Respect reduced motion.

Out of scope:

- Visual redesign.
- New routing.

Files likely affected:

- `ActionGroup.tsx`
- `ProjectsSection.tsx`
- `FooterSection.tsx`
- `TimelineSection.tsx`
- `LearningRoadmapTimeline.tsx`
- tests/stories

Acceptance criteria:

- Lighthouse accessibility remains >= 98 and known warnings are resolved where measurable.
- Manual keyboard path passes for nav, project slider controls, contact links, and article cards.
- Responsive checks pass at 375, 412, 768, 1024, 1280, 1440 px.

Risk:

- Low-medium.

Dependencies:

- Phase 6/7 content and section decisions.

Validation commands:

- `npm run test`
- Lighthouse mobile/desktop a11y
- Use Node 22.12+ via `.nvmrc`, `.node-version`, or an equivalent version manager, then run `npm run build-storybook`
- Manual keyboard/viewport checklist

Rollback strategy:

- Revert semantic/label changes; restore previous tests.

Type:

- Implementation and QA.

## Phase 9 - Storybook Documentation, A11y Stories, and Visual Regression Readiness

Objective:

- Convert the current Storybook coverage into stronger regression guidance.

Why it matters:

- Storybook exists and builds, but a11y/interaction checks are not yet used as a routine gate.

Scope:

- Add high-value a11y stories for Button, Link, Card, ArticleCard, Projects, Learning, ResponsiveNav.
- Add story docs for elevation and CTA labeling.
- Trial `test:storybook` on a small set if a dev server workflow is stable.
- Define visual regression readiness without requiring paid tools.

Out of scope:

- Full visual regression rollout before stories are stable.
- Paid service dependency as a requirement.

Files likely affected:

- `.storybook/*`
- `src/**/*.stories.tsx`
- possibly package scripts/docs

Acceptance criteria:

- High-risk states are represented in stories.
- Storybook build continues to pass on Node 22.12+.
- Optional story test-runner path is documented.

Risk:

- Low-medium.

Dependencies:

- Phases 5-8.

Validation commands:

- Use Node 22.12+ via `.nvmrc`, `.node-version`, or an equivalent version manager, then run `npm run build-storybook`
- Optional `npm run test:storybook` after server setup

Rollback strategy:

- Revert story additions/config changes.

Type:

- Docs/story implementation.

## Phase 10 - Release, Regression Guardrails, and Checkpoint Logging

Objective:

- Release the accepted improvements with evidence and maintenance guardrails.

Why it matters:

- The repo is in maintenance mode. Changes should ship with clear validation and no roadmap drift.

Scope:

- Run full validation.
- Rerun Lighthouse after SEO/a11y/performance changes.
- Update checkpoint log or add checkpoint section in report if `agent/CHECKPOINT_LOG.md` remains absent.
- Recommend CHANGELOG entry only if project convention expects audit docs to be logged.
- Confirm no production code changes outside approved phases.

Out of scope:

- New phase work.
- Broad refactors.

Files likely affected:

- `docs/planning/TASKS.md` if this roadmap becomes active.
- checkpoint docs if an `agent` directory is introduced later.
- optional `CHANGELOG.md` only with explicit convention/approval.

Acceptance criteria:

- `npm run lint` passes.
- `npm run test` passes.
- `npm run build` passes.
- `npm run build-storybook` passes on Node 22.12+ via `.nvmrc`, `.node-version`, or an equivalent version manager.
- Lighthouse SEO/a11y/performance deltas are documented.
- Roadmap state is clear.

Risk:

- Low.

Dependencies:

- Accepted implementation phases.

Validation commands:

- `npm run lint`
- `npm run test`
- `npm run build`
- Use Node 22.12+ via `.nvmrc`, `.node-version`, or an equivalent version manager, then run `npm run build-storybook`
- Lighthouse mobile/desktop

Rollback strategy:

- Revert release docs/checkpoint updates; preserve raw audit artifacts locally if needed.

Type:

- Docs/checkpoint/release validation.

## Decision Tree

### A. Live Site Metrics

- If Lighthouse accessibility < 95: prioritize accessibility before visual polish.
- If performance < 90 or LCP/CLS/TBT are poor: prioritize performance and asset/font strategy.
- If SEO < 95: prioritize canonical, metadata, sitemap, robots, and structured data.
- If scores are high: proceed to component polish and Storybook docs.

Current branch:

- Phase 2 SEO follow-up is now 100 and the live crawler/canonical blocker is closed. Continue with token verification and trace/filmstrip confirmation before assigning desktop CLS root cause or starting visual polish.

### B. Typography

- If current font stack performs well and matches personality: keep it and tune scale/line-height.
- If readability is weak but performance is strong: adjust type scale before adding web fonts.
- If brand personality needs more distinction: test one variable sans font.
- If blog/editorial pages feel plain: consider a serif accent for articles only, but avoid loading multiple families unless justified.

Current branch:

- Keep the system stack. Tune article rhythm before adding fonts.

### C. ArticleCard

- If ArticleCard exists: audit and improve states, hierarchy, metadata, and Storybook coverage.
- If ArticleCard does not exist: define an ArticleCard spec first, then create implementation in a later phase.
- If current Card can support article use: extend Card API carefully instead of creating duplicate components.

Current branch:

- ArticleCard exists with stories/tests. Keep it canonical; improve visible link/copy patterns around related project/article cards.

### D. Projects and Learning Sections

- If content is strong but visual hierarchy is weak: adjust card layout, headings, metadata, badges, and CTAs.
- If content model is weak: recommend Contentful/content changes before UI polish.
- If both are weak: prioritize content clarity first, then visual treatment.

Current branch:

- Content model is reasonably strong. Fix CTA label content, confirm image delivery/CLS evidence, resolve the token defect, and address heading semantics before visual polish.

### E. Storybook

- If Storybook is absent: scaffold after primitive API is stable.
- If Storybook exists but coverage is thin: add stories for primitives and high-value sections.
- If Storybook and CI are already strong: add a11y/visual regression readiness.

Current branch:

- Storybook and CI are strong. Add targeted a11y/interaction readiness after core SEO/a11y fixes.

### F. Implementation Safety

- If a recommendation changes layout/IA: defer and require explicit approval.
- If a recommendation only tokenizes existing behavior: safe early phase.
- If a recommendation affects CMS fields: require migration plan and fallback mapping.

Current branch:

- Early work should be docs/SEO/token/a11y-safe. CMS migrations are not needed for the first phases.

## Preferred Path

1. Complete Phase 1 baseline freeze.
2. Phase 2 SEO cleanup is closed: robots, sitemap, canonical, `index.html` fallback metadata/icons/share tags, weak link text, and body checks now pass on the live site.
3. Phase 3 token verification is closed.
4. Begin Phase 4 with Lighthouse trace/filmstrip review and image payload evidence capture before visual polish or implementation changes.
5. Keep typography system-stack for now.
6. Define elevation model and card hierarchy before broad card CSS tuning.
7. Improve ArticleCard/project visible link labels and card hierarchy.
8. Polish Projects and Learning within existing layout patterns.
9. Harden accessibility and responsive QA.
10. Expand Storybook a11y/visual readiness and close with release checkpoint.

## Logging Requirements

For each accepted phase, record:

- Date.
- Scope.
- Files changed.
- Commands run.
- Pass/fail summary.
- Next recommended phase.

Current checkpoint:

- `agent/CHECKPOINT_LOG.md` does not exist in this repo, so the current audit report includes a "Checkpoint Log Entry" section.
- This roadmap has received a docs-only validation correction pass on May 15, 2026 to clarify body-based crawler validation, `index.html` fallback SEO cleanup, portable Node guidance, and desktop CLS confirmation requirements.
- Phase 2 implementation checkpoint added on May 15, 2026: local crawler files, canonical fallback, fallback metadata, favicon, generic project-action label guard, tests, build output inspection, and deploy/Lighthouse follow-up are documented.
- Phase 2 closeout checkpoint added on May 15, 2026: live crawler files, root metadata, canonical behavior, deployed commit, and Lighthouse SEO `100` are documented in `docs/planning/phase-2-deploy-artifact-validation-spec.md`. The prior blocker is preserved as a resolved Netlify stale deploy/cache incident.
- Phase 3 implementation checkpoint added on May 15, 2026: token verification started only after Phase 2 closeout; the missing `--space-5` token was added and the undefined-variable scan found no remaining concrete undefined references.
- Phase 3 Batch 2 checkpoint added on May 15, 2026: motion/responsive baseline documentation completed, navigation transition alignment deferred, section-specific breakpoints documented, and README Storybook guidance made portable.
- Phase 3 closeout checkpoint added on May 18, 2026: Phase 3 is closed after validation; Phase 4 is ready for evidence capture only and no Phase 4 implementation has started.

CHANGELOG guidance:

- `CHANGELOG.md` has a verification convention for implementation changes. This audit did not modify production behavior, so this roadmap recommends a changelog entry only if the project owner wants audit docs tracked there. Do not modify `CHANGELOG.md` automatically for this docs-only audit.
