# TASKS

Roadmap v1 status: complete. Phases `0` through `7` are closed.
Roadmap v2 status: complete. Phases `A` through `F` are closed (April 24, 2026).

---

## Now

- [ ] **Maintenance queue — next candidate batch selection**
  - Current roadmap state is synced as of July 14, 2026.
  - Phase 4 image-delivery work is complete and deploy-verified through ArticleCard adoption on `/articles`.
  - SEO metadata for robots and keywords is verified locally and live in production.
  - Repo hygiene now ignores `.tmp/` artifacts and keeps raw local evidence out of git.
  - Netlify secret-scan redeploy verification remains parked and should be revisited before the next Netlify deployment if needed.
  - CLS root-cause direction is identified with high confidence: short route loading states are replaced by much taller async CMS content after first paint, shifting `main#main-content` and the footer.
  - Recommended next active batch: narrow CLS fix planning for route loading-state/layout reservation behavior.
  - Do not start UI implementation, image delivery, SEO metadata, `.tmp` hygiene, Contentful/env cleanup, CMS migration, or Netlify secret-scan redeploy verification from this queue item.

Phase closeout rule:
A phase cannot be considered complete unless:
1. its implementation work is finished,
2. it is moved out of the active `Now` queue,
3. the next phase (or roadmap-complete state) is reflected in `TASKS.md`,
4. the corresponding phase doc includes a closeout/reopen note.

---

## Recently Completed

- [x] **CLS Root-Cause Investigation — evidence only** (completed July 14, 2026)
  - Status: complete.
  - Production Lighthouse evidence covered `/` and `/articles` on desktop and mobile with two runs each, plus one desktop/mobile check for `/articles/resilient-content-systems`.
  - Lighthouse route matrix did not reproduce the prior severe desktop homepage `0.908` value: `/` desktop was `0.009`/`0.009`, `/` mobile was `0.018`/`0`, `/articles` desktop was `0.004`/`0.004`, and `/articles` mobile was `0`/`0`.
  - Temporary browser `PerformanceObserver` evidence reproduced severe route-mount shifts outside Lighthouse: homepage desktop `0.908` in one run and homepage mobile `0.921` in another.
  - Attribution points to async route data loading replacing a very short loading state with much taller fetched CMS content after first paint; `main#main-content` and `footer.footer-section` are the shifted surfaces, with minor desktop horizontal movement consistent with scrollbar appearance.
  - Image delivery, Hero sizing, Timeline media, ArticleCard images, font loading, CSS loading order, SEO metadata, Netlify/env settings, CMS model shape, and `.tmp` hygiene were not changed and are not confirmed causes.
  - Raw evidence is local and ignored under `.tmp/cls-root-cause-2026-07-14/`.
  - Next recommended batch is narrow CLS fix planning; no fix was implemented in this investigation.

- [x] **Roadmap State Sync — close SEO metadata + update maintenance queue** (completed July 13, 2026)
  - Status: complete.
  - Synced the active maintenance queue after Phase 4 image delivery, repo hygiene, SEO metadata, and live SEO verification completed.
  - Parked Netlify secret-scan redeploy verification for a later deployment-focused pass.
  - Preserved deferred status for CLS fixes, ProjectsSection image delivery, ArticlePage image delivery, RichTextRenderer image delivery, CMS model changes, and Contentful migration.
  - Next recommended active batch is CLS root-cause investigation with evidence only and no layout changes.

- [x] **SEO Metadata — robots/keywords local + live verification** (closed July 13, 2026)
  - Status: complete.
  - Local verification confirmed `index.html`, `SeoHead`, and `src/lib/seo.ts` already expose robots and keywords metadata, so no code changes were required.
  - Live production verification passed for `https://gilbertaharo.com/` and `https://gilbertaharo.com/articles`: both routes expose `robots` as `index, follow` and include keyword metadata.
  - Guardrails: no UI, image delivery, CLS/layout/CSS, `.tmp`, Contentful/env cleanup, CMS migration, or Netlify secret-scan redeploy verification work was introduced.

- [x] **Repo Hygiene — .tmp ignore protection** (completed after Phase 4 Batch 4.4)
  - Status: complete.
  - `.tmp/` is ignored for local Lighthouse and temporary artifacts.
  - No `.tmp` files are tracked, and raw generated evidence remains local/untracked.
  - Useful docs/planning evidence remains tracked normally.

- [x] **Design System + UX Roadmap — Phase 4 image delivery closeout**
  - Status: complete and deploy-verified through Batch 4.4 ArticleCard adoption.
  - Batch 4.1 added the pure Contentful image URL helper and tests.
  - Batch 4.2 deployed Hero responsive Contentful image delivery; Hero transfer dropped from about `2,565,640 B` to `24,470 B`.
  - Batch 4.3 deployed Timeline responsive Contentful image delivery; checked-route total byte weight dropped from about `5,874 KiB` to `235 KiB`, image transfer dropped to `72,782 B`, and estimated image-delivery savings dropped to `18 KiB`.
  - Batch 4.4 deployed ArticleCard responsive Contentful image delivery on `/articles`; total byte weight improved from `3,859 KiB` to `194 KiB`, image transfer improved from `3,794,510 B` to `34,941 B`, and estimated image-delivery savings improved from `2,044 KiB` to `5 KiB`.
  - ProjectsSection, ArticlePage, and RichTextRenderer image delivery remain deferred because route evidence did not justify adoption.
  - CLS was observed only and not fixed; severe CLS root cause remains unconfirmed.

- [x] **Phase 9G — Article Mobile Overflow + Content Formatting Audit**
  - Status: complete.
  - Reviewed `/articles/web-development-certifications-learning-journey` from the live Contentful source at 375px, 430px, 768px, and 1280px. QA screenshots and metrics were captured under `.tmp/phase-9g-certifications-qa/` as local untracked evidence.
  - Findings: the article body is a Contentful Rich Text document containing only paragraph/text nodes, including 12 Markdown-like `###` heading strings and 11 raw certificate URLs. This is a content authoring issue, not a renderer bug.
  - Overflow defect: before the patch, the 375px viewport had horizontal overflow from `.article-body__content` caused by long visible URL text. After the CSS guardrail patch, all checked viewports reported no document or body overflow.
  - Patches: added local article body overflow guards in `ArticlePage.css` and added Contentful Rich Text authoring guidance to `docs/content/editorial-guidelines.md`.
  - Manual Contentful cleanup remains recommended: convert pasted `### Course Title` text into actual Heading 3 blocks, convert raw certificate URLs into descriptive `View certificate` hyperlinks, and keep provider/completed/hours content as paragraph text or structured list content.
  - Guardrails: no Contentful model changes, article data shape changes, route changes, `ArticlePage` refactor, `RichTextRenderer` refactor, or Markdown parser were added.

- [x] **Phase 9F — Article Rich Text Stress QA + Contentful Source Debug**
  - Status: complete.
  - Added the static-source article fixture `/articles/rich-text-formatting-qa` to exercise paragraph text, rich text heading 1 downgrade, h2/h3/h4 headings, unordered and ordered lists, blockquotes, horizontal rules, external and internal links, bold, italic, underline, inline code, embedded image assets, embedded non-image file assets, long paragraphs, long link text, and attachment rendering.
  - Reviewed the fixture route at 375px, 768px, and 1280px with the static content source. QA screenshots and metrics were captured under `.tmp/phase-9f-rich-text-qa/` as local untracked evidence.
  - Findings: the rich text rendering contract held across the article shell, including a single page-level `h1`, body heading 1 rendering as `h2`, safe external links, readable list/blockquote/hr rhythm, embedded asset layout, file fallback links, and no horizontal overflow.
  - Patches: no `ArticlePage.css`, `ArticlePage.tsx`, route, renderer, Contentful model, or Contentful adapter changes were needed. The only runtime data change was the static QA fixture.
  - Contentful source debug: local env keys for space, environment, and delivery token are present; `VITE_CONTENT_SOURCE` is not configured locally, so the app defaults to `contentful`. A sanitized delivery API query returned article slugs `web-development-certifications-learning-journey` and `about-me`; the previously preferred `/articles/resilient-content-systems` slug is not present in the configured delivery environment.
  - Live Contentful parity remains a content/configuration follow-up: confirm the intended article slug is published in the configured Contentful environment, or use `/articles/about-me` for live-source QA. Preview env vars are present, but preview mode is not wired into the current content source.
  - Verification passed with Node `22.12.0`: `npm run lint`, `npm run build`, `npm run test`, and `npm run build-storybook`.

- [x] **Phase 9E — Article Preview QA Pass**
  - Status: complete.
  - Reviewed `/articles/resilient-content-systems` at 375px, 768px, and 1280px using the static content source because the live Contentful source did not resolve article data in the local dev session.
  - Findings: article shell, context nav, title, metadata wrapping, lede rhythm, hero crop, body measure, footer nav, and horizontal overflow all passed for the available fixture content.
  - Patches: no CSS, renderer, route, Contentful model, or article data changes were needed. QA screenshots and metrics were captured under `.tmp/phase-9e-article-qa-static/` as local untracked evidence.

- [x] **Phase 9D — Contentful Article Editorial QA Checklist**
  - Status: complete.
  - Created editorial QA guidance for Contentful article formatting based on the Phase 9B article layout and Phase 9C `RichTextRenderer` contract.

- [x] **Phase 9A — ProjectsSection Card Scale Patch**
  - Goal: reduced oversized `ProjectsSection` card behavior, especially in the single-card state.
  - Scope: CSS-only patch in `ProjectsSection.css`, reduced single-card max width, tightened card rhythm, capped media height, and preserved slider, accessibility, reduced-motion, and data contracts.
  - Guardrails: no Contentful model changes, normalized data changes, route changes, or shared Card component changes.

- [x] **Phase 3 — Token Verification and Responsive/Motion Token Alignment** (closed May 18, 2026)
  - `--space-5` token defect resolved, focused CSS custom property scan passes with only the documented dynamic `Stack` false positive, motion/responsive baseline notes are documented, and portable Storybook/Node guidance is current.
  - Deferred findings are preserved for navigation hard-coded transition alignment and section-specific responsive QA; these are not Phase 3 blockers.
  - Reopen only if a true regression is discovered in token definitions, undefined CSS custom property hygiene, motion/reduced-motion documentation, breakpoint reference documentation, or current Storybook Node guidance.

- [x] **Phase 2 — Domain/SEO Foundation Cleanup** (closed May 15, 2026)
  - Live crawler files, root fallback metadata, canonical behavior, deployed commit, and Lighthouse SEO `100` are documented in `docs/planning/phase-2-deploy-artifact-validation-spec.md`.
  - Prior blocker is preserved as a resolved Netlify stale deploy/cache incident.
  - Reopen only if a true regression is discovered in crawler file delivery, canonical behavior, fallback metadata, deploy artifact alignment, or SEO release validation.

- [x] **Phase F — Maintenance QA / Release Discipline** (completed April 24, 2026)
  - Maintenance workflow, release-readiness checklist, parity notes, and deferred items are documented in `docs/planning/PHASE-F-MAINTENANCE-QA-RELEASE-DISCIPLINE.md`.
  - Reopen only if a true regression is discovered in maintenance workflow clarity, release discipline, local/CI/runtime parity guidance, or planning consistency.

- [x] **Phase E — Project Structure Hardening** (completed April 24, 2026)
  - Structure and ownership hardening standards are documented in `docs/planning/PHASE-E-PROJECT-STRUCTURE-HARDENING.md`.
  - Reopen only if a true regression is discovered in structure rules, ownership guidance, placement conventions, or planning consistency.

- [x] **Phase D — Spacing and Layout Spec Pass** (completed April 24, 2026)
  - Spacing/layout rhythm rules and implementation notes are documented in `docs/planning/PHASE-D-SPACING-LAYOUT-SPEC.md`.
  - Reopen only if a true regression is discovered in spacing rhythm, layout consistency, responsive spacing behavior, or related Storybook layout-spec coverage.

- [x] **Phase C — Component Cleanup + UX Polish** (completed April 24, 2026)
  - Visible component polish and interaction/fallback refinements documented in `docs/planning/PHASE-C-COMPONENT-CLEANUP-UX-POLISH.md`.
  - Reopen only if a true regression is discovered in polished component behavior, interaction states, fallback surfaces, or related Storybook QA coverage.

- [x] **Phase B — Storybook Productization** (completed April 24, 2026)
  - Strengthened foundation stories (`Tokens`, `Typography`, `Layout`, `Interaction States`).
  - Tightened primitive stories as canonical usage references.
  - Clarified Storybook ownership rules in design-system docs.
  - Verification completed (`lint`, `test`, `build`, `build-storybook` with Node `22.12.0` runtime override).
  - Phase record: `docs/planning/PHASE-B-STORYBOOK-PRODUCTIZATION.md`
  - Reopen only if a true Storybook or design-foundation regression is discovered.

- [x] **Phase A — Maintenance Sweep** (completed April 24, 2026)
  - Cleanup audit and safe removals captured in `docs/planning/PHASE-A-MAINTENANCE-SWEEP.md`.
  - Reopen only if a true cleanup regression is discovered.

---

## Upcoming

- No additional roadmap phases remain after v2 closeout.
- Track only maintenance follow-ups and deferred candidates.
- Next candidate batches:
  1. Narrow CLS fix planning — route loading-state/layout reservation behavior only.
  2. Netlify secret-scan redeploy verification — parked; return before the next Netlify deployment if needed.
  3. UX/design polish planning — typography/card/elevation/section polish after evidence gates.
  4. Contentful/CMS migration planning — deferred.

---

## Verification Snapshot (Latest: CLS root-cause investigation, July 14, 2026)

- [x] `node -v` confirmed default shell Node is `22.2.0`; project verification used Node `22.12.0`.
- [x] `npm run lint`
- [x] `npm run build`
- [x] Production Lighthouse route matrix captured for `/` and `/articles` on desktop/mobile with repeat runs.
- [x] Production Lighthouse check captured for `/articles/resilient-content-systems` on desktop/mobile.
- [x] Temporary browser `PerformanceObserver` layout-shift attribution captured locally.
- [x] Live SEO metadata verification passed for `/` and `/articles`.
- [x] Fresh desktop Lighthouse performance evidence captured locally under `.tmp/design-system-audit/` (untracked)
- [x] Repeat desktop Lighthouse CLS sanity check captured locally under `.tmp/design-system-audit/` (untracked)
- [x] Batch 4.2 live Lighthouse Hero-after evidence captured locally under `.tmp/design-system-audit/` (untracked)
- [x] Batch 4.3 live Lighthouse Timeline-after evidence captured locally under `.tmp/design-system-audit/` (untracked)
- [x] Batch 4.4 route-specific Lighthouse evidence captured locally under `.tmp/design-system-audit/batch-4-4/` (untracked)
- [x] Batch 4.4 ArticleCard deploy verification documented
- [x] Phase 4 image payload inventory and image code-path inventory documented
- [x] Phase 4 image-delivery implementation plan documented
- [x] `git diff --check`

Runtime note:
- Default shell Node is still `22.2.0`.
- `npm run build` currently completes but prints the Vite Node-floor warning.
- `npm run build-storybook` still requires Node `22.12+`; use `.nvmrc`, `.node-version`, or an equivalent version manager rather than a machine-specific command.

---

## Guardrails

- Keep `src/content/*` as the content boundary and `ContentSource` contract owner.
- Keep shell ownership in `src/components/layout/*` (`PageShell` remains shell owner).
- Keep primitive ownership in `src/components/ui/*`.
- Keep section rendering ownership in `src/components/sections/*`.
- Keep route behavior ownership in `src/pages/*` and `src/pages/articles/*`.
- Keep section normalizer-first rendering intact.
- Keep Storybook in-repo and hybrid (`src/components/**/*.stories.*` + `src/stories/*`).
- Do not reopen closed phases unless a true regression is discovered.

---

## Canonical References

- Current design-system roadmap: `docs/planning/design-system-roadmap-current.md`
- Phase 2 deploy validation spec: `docs/planning/phase-2-deploy-artifact-validation-spec.md`
- Phase 4 evidence report: `docs/planning/phase-4-image-cls-evidence.md`
- Phase 4 implementation plan: `docs/planning/phase-4-image-delivery-implementation-plan.md`
- Phase 4 Batch 4.4 later-surface evidence: `docs/planning/phase-4-batch-4-4-later-image-surfaces.md`
- Phase 4 raw evidence source: `.tmp/design-system-audit/` local Lighthouse artifacts (untracked)
- Phase F maintenance discipline record: `docs/planning/PHASE-F-MAINTENANCE-QA-RELEASE-DISCIPLINE.md`
- Phase E structure hardening record: `docs/planning/PHASE-E-PROJECT-STRUCTURE-HARDENING.md`
- Phase D spacing/layout record: `docs/planning/PHASE-D-SPACING-LAYOUT-SPEC.md`
- Phase C polish record: `docs/planning/PHASE-C-COMPONENT-CLEANUP-UX-POLISH.md`
- Phase B productization record: `docs/planning/PHASE-B-STORYBOOK-PRODUCTIZATION.md`
- Phase A maintenance record: `docs/planning/PHASE-A-MAINTENANCE-SWEEP.md`
- Canonical phase history (v1): `docs/planning/IMPLEMENTATION-ROADMAP.md`
- Phase history records: `docs/planning/PHASE-*.md`
- Legacy roadmap context (historical only): `docs/planning/ROADMAP.md`
- Design-system hub: `docs/design-system/design-system.md`
