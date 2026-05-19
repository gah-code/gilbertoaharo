# Design System Snapshot Audit - Current State

Audit date: May 15, 2026  
Primary live URL tested: `https://gilbertaharo.com/`  
Audit scope: live site, local React/Vite codebase, Storybook, design-system foundations, accessibility, SEO, responsiveness, performance, Contentful/data boundaries, and roadmap readiness.

## 1. Executive Summary

The project is in a mature maintenance-mode state for a UI-first, CMS-backed personal portfolio and article site. The strongest areas are source/adapter separation, section normalizer-first rendering, typed primitives, Storybook coverage, and local validation discipline. The current app shape is confirmed as React 19 + TypeScript + Vite 7 with Contentful/static source switching through `ContentSource`.

The highest-priority risks are not broad architecture gaps. They are focused release-quality issues:

- Phase 2 live SEO gate is now closed: `robots.txt` returns plain robots rules, `sitemap.xml` returns XML, live fallback metadata is updated, canonical behavior passes, and Lighthouse SEO follow-up returned `100`.
- Live performance has heavy Contentful image payloads and a serious desktop CLS Lighthouse lab finding that needs trace/filmstrip confirmation before root cause is assigned.
- Accessibility is generally strong but has content/name mismatches caused by CMS-provided `ariaLabel` values that do not include visible button/link text.
- Heading levels skip from section headings to `h4` in timeline and learning cards.
- Phase 3 token verification is closed: the confirmed `--space-5` defect is fixed, the CSS variable scan passes, motion/responsive baselines are documented, and deferred findings are preserved for later QA/polish.

Recommended next move: start Phase 4 with evidence capture only. Confirm desktop CLS with Lighthouse trace/filmstrip evidence and review image payloads before assigning root cause or changing image delivery. The preferred path remains conservative: keep the Phase 2 SEO evidence closed, keep Phase 3 token/motion/responsive closeout intact, then improve image delivery only after evidence while preserving IA, routing, CMS boundaries, and layout strategy.

## 2. Evidence and Method

Commands run:

| Command | Result | Notes |
| --- | --- | --- |
| `rg --files` | Pass | Used to inventory repo files. |
| `git status --short` | Clean at start | After audit, `.tmp/` is untracked because measurement artifacts were saved there. |
| `curl -I https://gilbertaharo.com/` | Pass | HTTP/2 200. |
| `curl -I https://www.gilbertaharo.com/` | Pass | HTTP/2 301 to `https://gilbertaharo.com/`. |
| `curl -I https://gilbertoharo.com/` | DNS fail | Could not resolve host. |
| `curl -I https://www.gilbertoharo.com/` | DNS fail | Could not resolve host. |
| `curl -s https://gilbertaharo.com/robots.txt` | Pass, invalid content | Body inspection returned SPA HTML, not robots rules. |
| `curl -s https://gilbertaharo.com/sitemap.xml` | Pass, invalid content | Body inspection returned SPA HTML, not XML sitemap. |
| Phase 2 live `curl -s` follow-up | Pass | `robots.txt` now returns robots rules and `sitemap.xml` now returns XML; neither returns SPA HTML. |
| Phase 2 Lighthouse SEO follow-up | Pass | SEO score `100`; canonical, robots, and crawlability audits pass. |
| `npx --yes lighthouse@latest ... desktop` | Pass after network escalation | Wrote JSON/HTML artifacts. Default network sandbox blocked initial registry lookup. |
| `npx --yes lighthouse@latest ... mobile` | Pass after network escalation | Wrote JSON/HTML artifacts. |
| PageSpeed Insights API curl | Blocked by quota | API returned 429 quota exceeded. |
| CrUX API curl without key | Blocked by auth | API returned 403 unregistered caller. |
| `npm run lint` | Pass | No lint errors. |
| `npm run build` | Pass with warning | Vite warns default Node `22.2.0` is below required floor. |
| `npm run test` | Pass | 31 files, 101 tests after Phase 2 coverage additions. |
| `npm run build-storybook` | Fail on default Node | Expected runtime-floor failure. |
| `npm run build-storybook` on Node 22.12+ via `.nvmrc`/`.node-version` or equivalent version manager | Pass | Storybook v10.3.5 built successfully when the documented Node floor is met. |

Files and areas inspected:

- Project metadata: `package.json`, `README.md`, `VERSION.md`, `CHANGELOG.md`, `.node-version`, `.nvmrc`, `.gitignore`, `netlify.toml`
- Planning/design-system docs: `docs/**`, including `TASKS.md`, `IMPLEMENTATION-ROADMAP.md`, Phase A-F records, foundations/components docs, historical audits
- CI and Storybook: `.github/workflows/ci.yml`, `.storybook/main.ts`, `.storybook/preview.ts`, `src/**/*.stories.*`
- Foundations: `src/styles/tokens.css`, `src/styles/base.css`
- UI primitives: `src/components/ui/**`
- Layout/nav/SEO: `src/components/layout/**`, `src/components/navigation/**`, `src/lib/seo.ts`, `src/router/**`
- Sections: `src/components/sections/**`
- Articles/rich text: `src/components/articles/**`, `src/pages/articles/**`, `src/pages/ArticlePage.*`, `src/components/rich-text/**`
- Content/data: `src/content/**`, `src/preview/**`, `src/env.ts`
- Tests: `src/**/*.test.*`

Known limitations:

- No production code was changed, by request.
- No Contentful migration was run.
- No secrets were read from `.env` files.
- Lighthouse lab metrics are point-in-time results, not field Core Web Vitals.
- PageSpeed/CrUX field data was not available without quota/authenticated API access.
- Visual screenshot inspection was limited to Lighthouse artifacts; no manual browser screenshot set was committed.

## 3. Current Project Status Scorecard

| Area | Current status | Confidence | Evidence | Risk | Recommended next action |
| --- | --- | --- | --- | --- | --- |
| Foundations/tokens | Strong, organized token layer with typography, color, spacing, radius, shadow, motion, breakpoint references, controls, focus, button/link/card tokens. Phase 3 added the missing `--space-5` midpoint token and is now closed. | High | `src/styles/tokens.css`, `src/stories/Tokens.stories.tsx`, `foundations.md` | Navigation still has hard-coded transition values; broader motion alignment is deferred. | Preserve Phase 3 closeout; move next to Phase 4 evidence capture. |
| Typography | Solid system stack and role aliases; readable line-height; headline tracking is slightly tight but controlled. | High | `tokens.css`, `Heading`, `Text`, `ArticlePage.css` | Brand could remain generic; article pages could use stronger editorial rhythm. | Decide whether to stay system-font or test one variable sans. |
| Color/contrast | Automated contrast passes in Lighthouse; semantic colors exist. | High | Lighthouse color contrast score 1, tokens. | Border token `#8f887e` can feel heavy if overused. | Keep palette; tune border/elevation locally if visual noise appears. |
| Spacing/whitespace | Strong section/card spacing tokens and colocated usage; `--space-5` now exists as the midpoint between `--space-4` and `--space-6`. | High | `tokens.css`, `base.css`, Phase D docs | Breakpoint values are still explicit by design because CSS custom properties are not reliable in media queries. | Keep token verification scoped; do not redesign spacing. |
| Shadows/elevation | Simple elevation system exists (`soft`, `soft-strong`) and is used consistently for cards/media. | Medium-high | `tokens.css`, `Card.css`, `ArticleCard.css`, sections | Elevated shadow may be too frequent/heavy for all cards. | Define no-shadow/border/soft/elevated usage guidance. |
| Motion/interactions | Motion tokens and reduced-motion rules exist in primitives/sections/nav. | High | `Button.css`, `Card.css`, `ProjectsSection.css`, `Navigation.css` | Some hard-coded transition durations remain in nav. | Gradually align nav transitions to motion tokens. |
| Visual hierarchy | Clear professional/editorial hierarchy; hero, sections, cards are scannable. | Medium-high | Section implementations and Lighthouse DOM labels | Projects slider and learning roadmap may compete visually; CTA naming issues. | Polish cards and labels after SEO/accessibility basics. |
| UI primitives | Button, Link, Card, Badge, Heading, Text, layout primitives are typed and Storybook-covered. | High | `src/components/ui/**`, stories, tests | `Container` and `Stack` still use structural inline styles by design. | Keep; document structural inline style exception. |
| Layout/navigation | Header, skip link, responsive nav, focus trap/return, footer wrapper are strong. | High | `Header`, `ResponsiveNav`, tests | Desktop menu region is not a true menu pattern; fine for current nav, but should be retested after changes. | Add Storybook/interaction coverage for nav states later. |
| Hero | Normalized data, shared primitives, responsive media, eager hero image. | High | `HeroSection`, `normalizeHeroSection` | Live hero image is oversized and contributes major payload. | Use Contentful image transforms/responsive sizes. |
| Timeline | Normalized, ordered list, media fallback, responsive alternation. | High | `TimelineSection`, normalizer tests | Heading level skips to `h4`; timeline images are oversized. | Adjust semantic level in a11y phase; optimize image delivery. |
| Skills | Clean split-list, avoids card clutter, strong normalizer compatibility. | High | `SkillsSection`, `normalizeSkillsSection` | Badge nowrap could be tight for long labels, though current labels are short. | Keep; add long-label story if content expands. |
| Projects | Rich normalized project cards in scroll-snap slider. | Medium-high | `ProjectsSection`, stories, tests | Slider discoverability and image payloads need QA; accessible names can mismatch visible labels. | Card/action copy pass and image strategy. |
| Learning | Strong roadmap concept and responsive timeline; the `--space-5` wide-breakpoint token defect is fixed. | Medium | `LearningSection`, `LearningRoadmapTimeline` | `h4` heading skip and wide-breakpoint behavior still need viewport/a11y QA. | Heading-level review and viewport QA in later a11y/responsive phase. |
| Contact | Straightforward conversion surface with email and link chips. | High | `ContactSection`, test/story | Contact links rely on generic link styling, but acceptable. | Keep; no redesign needed. |
| ArticleCard/article surfaces | ArticleCard exists and is the canonical article-list card with stories/tests. | High | `src/components/articles/ArticleCard.*` | CTA text "Read article" is good; project/card hierarchy can still be polished later. | Keep ArticleCard; defer deeper card polish until after token/a11y/performance evidence. |
| Rich text/blog article experience | Handles marks, links, embedded assets, metadata, attachments. | Medium-high | `RichTextRenderer`, `ArticlePage.css` | No code block language labels, no schema, hero alt uses title. | Defer editorial refinements; add article schema later. |
| Storybook | Present, Storybook 10, docs/a11y addons, foundation + primitives + sections + ArticleCard stories. | High | `.storybook`, 20 story files, CI gate | `test:storybook` exists but was not run; visual regression not configured. | Add runner coverage later after core issues. |
| Tests/CI | Strong unit/render coverage and CI gates. | High | 31 test files, 101 tests, `.github/workflows/ci.yml` | No browser E2E or visual regression. | Add selective Playwright/Storybook runner only when value is clear. |
| Contentful/data modeling | Good boundary: content source, adapters, typed raw models, normalizers. | High | `src/content/**`, `src/components/sections/*/normalize*` | Browser-side delivery token remains transitional; Contentful image transforms not used. | Preserve boundary; add safe image transform helpers later. |
| SEO | Phase 2 live gate is closed: crawler files, fallback metadata, canonical behavior, and Lighthouse SEO follow-up pass. | High | `phase-2-deploy-artifact-validation-spec.md`, live curl checks, Lighthouse SEO `100` | Route-owned OG/Twitter metadata and structured data remain future opportunities. | Keep crawler/canonical evidence as release baseline; defer schema/social metadata expansion. |
| Accessibility | Automated score 0.98; strong keyboard/nav patterns. | High | Lighthouse, code/tests | Heading-order and label-content-name mismatch warnings. | Fix content/ARIA labels and heading levels. |
| Responsive design | Generally solid; explicit breakpoints across sections; nav uses CMS breakpoint. | Medium-high | CSS media queries, stories | Breakpoints are reference tokens only, not enforced; Learning wide token issue. | Viewport QA and token alignment phase. |
| Performance | Local bundle is reasonable, but live images dominate payload; desktop CLS is a serious Lighthouse lab finding that needs trace/filmstrip confirmation. | High for lab | Lighthouse, `dist` review | Image bytes and potential desktop layout shift can hurt user experience and CWV. | Confirm CLS with trace/filmstrip review, then address image transform/sizing before visual polish. |

## 4. Live Site Statistics

### Domain and Canonical Status

| URL checked | Result | Redirect behavior | Notes |
| --- | --- | --- | --- |
| `https://gilbertaharo.com/` | HTTP/2 200 | No redirect | Primary live URL is reachable over HTTPS. |
| `https://www.gilbertaharo.com/` | HTTP/2 301 | Redirects to `https://gilbertaharo.com/` | Good canonical host behavior for `www`. |
| `https://gilbertoharo.com/` | DNS resolution failed | None observed | Alternate domain does not resolve from curl. |
| `https://www.gilbertoharo.com/` | DNS resolution failed | None observed | Alternate `www` domain does not resolve from curl. |

Canonical conclusion:

- Operational canonical host appears to be `https://gilbertaharo.com/`.
- The repo/context also references `gilbertoharo.com`, but that domain did not resolve. This is not duplicate-content risk today; it is brand/domain drift risk. If the alternate domain is owned, add a redirect. If it is not owned, make docs consistently use `gilbertaharo.com`.
- Lighthouse reported "Document does not have a valid `rel=canonical`" on the live landing page before Phase 2. Phase 2 live verification now confirms canonical behavior passes with Lighthouse SEO `100`.

### Robots and Sitemap

| Resource | Status | Content observed | Risk |
| --- | --- | --- | --- |
| `https://gilbertaharo.com/robots.txt` | HTTP 200 | Plain robots rules | Phase 2 live verification passed; `/debug` and `/debug/` are excluded. |
| `https://gilbertaharo.com/sitemap.xml` | HTTP 200 | XML sitemap | Phase 2 live verification passed; homepage, article index, and known article routes are listed. |

### Lighthouse Mobile

Artifact: `.tmp/design-system-audit/lighthouse-mobile.report.json` and `.html`

| Category/metric | Result | Target/status |
| --- | --- | --- |
| Performance | 97 | Good lab score |
| Accessibility | 98 | Strong, but not perfect |
| Best Practices | 100 | Good |
| SEO | 77 | Needs work |
| FCP | 1.6 s | Good |
| LCP | 2.4 s | Under 2.5 s good threshold, close to limit |
| TBT | 110 ms | Good |
| CLS | 0.018 | Good |
| Speed Index | 1.9 s | Good |

Top mobile problems:

- `robots.txt` invalid.
- Canonical link invalid/missing.
- Link text: one "Read more" link found.
- Large image payloads: total transfer around 6.9 MB, mostly Contentful images.
- Main-thread work: 2.3 s with style/layout and script evaluation as major contributors.

### Lighthouse Desktop

Artifact: `.tmp/design-system-audit/lighthouse-desktop.report.json` and `.html`

| Category/metric | Result | Target/status |
| --- | --- | --- |
| Performance | 73 | Needs investigation |
| Accessibility | 98 | Strong, but not perfect |
| Best Practices | 100 | Good |
| SEO | 77 | Needs work |
| FCP | 0.5 s | Good |
| LCP | 0.7 s | Good |
| TBT | 0 ms | Good |
| CLS | 0.908 | Poor; target is <= 0.1 |
| Speed Index | 1.5 s | Good |

Top desktop problems:

- Serious desktop CLS Lighthouse lab finding on `main#main-content`; confirm with trace/filmstrip before assigning root cause.
- Historical SEO issues from the original audit are resolved by Phase 2; the remaining desktop priority is CLS trace/filmstrip confirmation.
- Large image payloads: total transfer around 8.3 MB.
- Contentful images are far larger than their displayed dimensions.
- Unused JS estimated savings around 52 KB.

### Lighthouse Top Opportunities

| Rank | Opportunity | Evidence | Recommended direction |
| --- | --- | --- | --- |
| 1 | Improve image delivery | Mobile estimated savings 6,560 KiB; desktop estimated savings 8,101 KiB. | Use Contentful image transforms, responsive widths, and modern formats. |
| 2 | Reduce unused JavaScript | Around 51-52 KiB estimated savings from the main app bundle. | Defer until SEO/a11y work; consider route-level or debug-route splitting later. |
| 3 | Address render-blocking CSS | Lighthouse flagged `assets/index-DipqUKQY.css` as render-blocking. | Keep for now; revisit critical CSS only if LCP worsens after image work. |
| 4 | Improve cache lifetimes | Lighthouse estimated around 5 KiB savings. | Review deploy/cache headers after SEO static-file cleanup. |
| 5 | Keep server response fast | Root document was short: desktop around 190 ms, mobile around 50 ms. | Preserve current hosting/CDN path while fixing crawler files. |

### Lighthouse Top Diagnostics

| Rank | Diagnostic | Evidence | Recommended direction |
| --- | --- | --- | --- |
| 1 | Invalid `robots.txt` | Lighthouse reports 15 parse errors because HTML is served. | Add valid robots file and ensure SPA rewrite does not catch it. |
| 2 | Invalid canonical | Lighthouse reports no valid `rel=canonical`. | Ensure absolute canonical output on live routes. |
| 3 | Desktop CLS | Desktop CLS 0.908 with `main#main-content` as shifting node in Lighthouse lab output. | Confirm with trace/filmstrip, then investigate the verified shift source. |
| 4 | Accessible-name mismatch | Hero/project/footer links have `aria-label` values that omit visible text. | Align content and aria labels; prefer descriptive visible labels. |
| 5 | Heading-order skips | Timeline and Learning card headings render as `h4` after section headings. | Use semantic `h3` and visual size overrides if needed. |

### Core Web Vitals / PSI / CrUX Availability

Reference targets:

- LCP good: at or under 2.5 s.
- INP good: at or under 200 ms. Lighthouse lab cannot directly measure real INP.
- CLS good: at or under 0.1.
- Use 75th percentile field data when available.

Results:

- PageSpeed Insights API attempt returned 429 quota exceeded for both mobile and desktop.
- CrUX API no-credential attempt returned 403 permission denied.
- No public field data was available from those API attempts. This report uses Lighthouse lab data only and does not fabricate field metrics.

## 5. Design-System Foundation Inventory

| Foundation | Exists | Used | Duplicated | Missing/gap | Change now or defer |
| --- | --- | --- | --- | --- | --- |
| Typography tokens | `--font-sans`, `--font-mono`, sizes, roles, line-height, tracking. | `Heading`, `Text`, sections, pages. | Some page/section CSS uses direct clamps. | No web-font decision recorded for brand direction. | Defer font change; document decision first. |
| Spacing tokens | `--space-1/2/3/4/5/6/8/10/12/16`, section/card/grid aliases. | Broadly used. | Explicit media-query values duplicate breakpoint intent. | No concrete undefined spacing-token references remain after Phase 3 closeout. | Preserve token scan evidence; defer broad spacing changes. |
| Color tokens | Background/surface/accent/text/muted/border/state colors. | Broadly used. | Some local `rgba` and `color-mix` values. | No formal non-text contrast token matrix. | Defer matrix; keep contrast QA. |
| Radius tokens | `sm`, `md`, `lg`, `pill`. | Cards, badges, nav, sections. | Some `calc(radius + px)` local usage. | No elevation/radius pairing guidance. | Defer to polish phase. |
| Shadow/elevation tokens | `--shadow-soft`, `--shadow-soft-strong`. | Cards/media/ArticleCard/sections. | Nav has some hard-coded shadows. | No "no shadow vs border vs elevated" spec. | Add guidance before visual tuning. |
| Motion tokens | Fast/base duration and standard easing. | Primitives, cards, sections. | Nav still has hard-coded `0.12s`/`0.15s`. | No token for long/entrance motion. | Defer unless adding motion. |
| Breakpoint tokens | Reference values for sm/md/nav/lg/xl. | Documentation anchors; explicit CSS media queries. | Media query values are manually repeated. | Cannot use CSS custom properties in media queries reliably. | Keep as reference tokens. |
| Focus tokens | Color and button/link/card focus shadows. | Button, Link, Card, footer, base focus. | Nav has some local focus shadows. | No full focus-ring contrast matrix. | Defer; fix specific a11y issues first. |
| Component state tokens | Controls, button, link, card state tokens. | Strong primitive usage. | Some section/local action states. | Badge state token coverage is simpler. | Defer. |

Historical gaps now resolved:

- Motion tokens now exist.
- Breakpoint reference tokens now exist.
- Focus-visible styles are implemented across base, primitives, nav, cards, and footer.
- Storybook and tests are implemented and gated in CI.
- ArticleCard exists and has stories/tests.

## 6. Typography Audit

Current personality fit:

- Professional: strong. The system stack reads cleanly and avoids novelty.
- Web engineering: strong. Type hierarchy is practical and utilitarian.
- Content systems: strong. The readable measures and section rhythm support explainers.
- Technical clarity: strong. Body copy has comfortable line-height.
- Approachable portfolio: adequate. It is more restrained than distinctive.
- Blog/readability: good but can be improved with article-specific rhythm and optional editorial accent.

Current font stack:

- `tokens.css` uses a performance-first system sans stack with Apple/SF, Segoe UI, Roboto, Helvetica, Arial fallbacks.
- No Google Fonts or external font files are loaded by the production app.
- This is excellent for performance, privacy, and avoiding font-display problems.

Assessment:

- Body line length is generally comfortable (`--measure-body: 68ch`, `--lede-max: 62ch`).
- Body line-height is good (`1.55`, loose `1.7`).
- Heading tracking uses `--tracking-tight: -0.02em`; acceptable for large headings but should not spread into compact card headings.
- Type scale is constrained and understandable.
- Some section/page CSS uses clamp values directly. This is acceptable where layout-specific, but the design-system doc should identify where clamps are intentional.

Typeface options:

| Option | Candidates | Pros | Cons | Recommendation |
| --- | --- | --- | --- | --- |
| Performance-first/system stack | Current system stack | Fast, no external dependency, stable. | Less distinctive. | Preferred near-term. |
| Professional sans | Inter, Source Sans 3, IBM Plex Sans, Spline Sans | More consistent brand voice across OSes. | Adds font loading and maintenance. | Test only after SEO/perf fixes. |
| Editorial/blog accent | Source Serif 4, Merriweather, Lora, Literata | Gives articles a stronger editorial feel. | Multiple families can hurt performance and cohesion. | Defer; article-only experiment if needed. |
| Accessibility/readability | Atkinson Hyperlegible, Source Sans 3 | Clear letterforms and inclusive readability. | Atkinson has a strong personality that may not fit all UI. | Consider if readability feedback warrants it. |

Preferred direction:

Keep the system stack for now. Tune scale, line-height, and article rhythm before adding web fonts. If a stronger brand signal is needed later, test one variable sans such as Source Sans 3 or IBM Plex Sans. Avoid loading multiple font families unless article readability clearly benefits.

Implementation guidance for later:

- Use `font-display: swap`.
- Prefer variable fonts.
- Subset weights.
- Keep body text readable.
- Use a constrained type scale.
- Avoid tiny mobile text.
- Tune headline tracking only where needed.

## 7. Shadows and Elevation Audit

Current state:

- Tokens: `--shadow-soft` and `--shadow-soft-strong`.
- Used by `Card`, `ArticleCard`, `MediaFrame`, article hero/embedded assets, project cards, learning next-up state, nav panels/drawer.
- Interactive cards lift subtly on hover/focus and support reduced motion.

Concerns:

- Default `Card` uses `--shadow-soft`, so card surfaces can become more visually elevated than necessary.
- `ArticleCard`, project cards, media frames, timeline cards, and learning cards all use elevation in some form. This can make the hierarchy noisy when many cards are visible.
- Nav has several hard-coded shadow values outside the token system.

Recommended elevation model:

| Level | Usage | Treatment |
| --- | --- | --- |
| None | Flat section groups, skills rows, text lists | No shadow, maybe border/divider only. |
| Border-only | Static cards or low-priority grouped content | `border: 1px solid --color-border-subtle`, no shadow. |
| Soft | ArticleCard/project/learning cards at rest only when surface needs separation | `--shadow-soft`, subtle border. |
| Elevated hover/focus | Clickable cards and active/next-up states | `--shadow-soft-strong`, focus ring included. |

Do not redesign the card system now. Add the model to docs first, then tune ArticleCard/Projects/Learning in a later polish phase.

## 8. Whitespace and Layout Rhythm Audit

Strengths:

- Section spacing is tokenized with `--section-pad-y`, `--section-pad-y-mobile`, `--section-stack-gap`, and `--section-content-gap`.
- Card padding and flow gaps are tokenized.
- Skills intentionally avoids card chrome and uses row dividers, which improves scan quality.
- Contact is compact and conversion-focused.

Concerns:

- Learning wide-breakpoint padding now resolves through the added `--space-5` token.
- Some sections use local clamp values for widths/gaps. This is acceptable but should remain documented.
- Article spacing is readable but not as polished as the homepage sections.
- Project slider spacing is functional; card density should be checked after image and CTA cleanup.

Recommendations:

- Keep the `--space-5` fix covered by token scan validation.
- Keep section rhythm rules from Phase D.
- Add "card internal spacing rules" to design-system docs before making visual edits.
- QA 375, 412, 768, 1024, 1280, and 1440 px before changing Learning/Projects spacing.
- Avoid large layout redesign.

## 9. Visual Hierarchy and UX Audit

Current UX:

- Hero clearly communicates web engineering, content systems, and frontend architecture.
- Primary/secondary CTA placement is visible.
- Timeline is scannable and credible.
- Skills is dense but organized.
- Projects are richer after recent work, with media, highlights, tags, and actions.
- Learning is distinctive but visually complex at larger widths.
- Contact is clear.
- Latest writing section helps blog discoverability from the landing page.

UX concerns:

- Live hero CTAs have visible labels that do not match their accessible names. This is confusing for assistive tech and voice control.
- The live audit found a weak project CTA label, "Read more"; local Phase 2 now guards exact generic project-action labels, and deploy verification should confirm the live label changes.
- Projects slider controls use text labels "Previous"/"Next"; functional, but icon+text could eventually improve control compactness.
- Desktop CLS is a serious Lighthouse lab finding; trace/filmstrip review should confirm the shifting source before root cause is assigned.
- Large images make the site feel heavier than the local bundle suggests.

Recommendations:

- Optimize current layout rather than replacing it.
- Keep hero structure, but align CTA destinations, labels, and accessible names.
- Keep project article actions descriptive in visible text, for example "Read about [project]" when space allows.
- Keep Learning as a roadmap surface, but fix token/heading issues before visual changes.
- Treat position, size, color, spacing, borders, shadows, and motion as refinements to the current system, not a new IA.

## 10. Accessibility Audit

Automated baseline:

- Lighthouse accessibility: 98 mobile, 98 desktop.
- Contrast passed.
- Image alt audit passed.
- Main landmark passed.
- Skip link passed.
- Touch targets passed in Lighthouse.
- No positive tabindex detected.

Confirmed strengths:

- Skip link in `Header`.
- `main#main-content` in `PageShell`.
- `ResponsiveNav` has dialog semantics, focus return, Escape close, accordion hidden state, and tests.
- `Button`/`Link` disabled link semantics use `aria-disabled` and `tabIndex=-1`.
- Focus-visible styles exist in base, primitives, cards, nav, and footer.
- Reduced-motion rules are present across primitives/nav/sections.

Confirmed issues:

| Issue | Severity | Evidence | Affected files | Recommended fix | Storybook/a11y coverage |
| --- | --- | --- | --- | --- | --- |
| Accessible names do not include visible text for several links/buttons. | High | Lighthouse `label-content-name-mismatch`; hero CTAs, project action, footer link. | `ActionGroup.tsx`, `ProjectsSection.tsx`, `FooterSection.tsx`, CMS link content. | Prefer visible text that is already descriptive; otherwise ensure `aria-label` includes visible text. | Add a11y stories/notes for CTA labels. |
| Heading order skips to `h4` under `h2` sections. | Medium | Lighthouse `heading-order`; timeline card and learning roadmap card headings. | `TimelineSection.tsx`, `LearningRoadmapTimeline.tsx` | Use semantic `level={3}` with visual size override if needed. | Add section stories with a11y addon checks. |
| `robots.txt` invalid affects SEO, not WCAG, but automated audit flags crawler/accessibility-adjacent structure. | Medium | Lighthouse SEO audit. | `public/robots.txt` missing; Netlify redirect behavior. | Add static `robots.txt`; ensure redirect rule does not rewrite it. | Not Storybook. |
| Project "Read more" link is not descriptive. | Medium | Lighthouse SEO `link-text`. | Current live CMS/content and `ProjectsSection` visible action labels. | Change visible label in content/model to descriptive text. | Add Projects story with descriptive CTAs. |

Manual review notes:

- Keyboard navigation implementation is stronger than the automated score alone shows.
- Automated checks are incomplete; focus-obscured and drawer scroll behavior still need manual viewport testing before release.
- Footer and hero link aria labels appear content-driven, so content QA should be part of release checks.

## 11. Responsive Design Audit

Current responsive strategy:

- Breakpoint reference tokens exist in `tokens.css`.
- Media queries remain explicit in CSS, which is currently pragmatic.
- Navigation breakpoint is CMS-driven through `menu.mobileBreakpointPx`, with a minimum of 640.
- Timeline changes at 640, 768, and 1024 px.
- Learning widens at 80rem and 96rem.
- Projects use scroll snap with slide widths clamped by viewport.
- Article grid collapses at 640 px.

Strengths:

- Mobile nav drawer uses dialog semantics and body scroll lock.
- Text uses readable measures and wraps with `overflow-wrap` where needed.
- Project and ArticleCard images use aspect ratios.
- Motion is reduced via `prefers-reduced-motion`.

Concerns:

- Learning wide-breakpoint spacing now resolves through `--space-5`; continue viewport QA before any section polish.
- Explicit breakpoints can drift from documented tokens if not checked.
- Projects scroll-snap needs device QA for discoverability and keyboard/touch behavior.
- Desktop CLS requires focused trace/filmstrip confirmation before a responsive/layout root cause is assigned.

Screenshots:

- Lighthouse HTML reports include screenshots, but no separate screenshots were committed.
- Recommended later: capture 375, 768, 1024, and 1440 px views after SEO/token fixes.

## 12. Component and Primitive Audit

| Component | File path | Public API | Token usage | States | Accessibility | Responsive behavior | Storybook | Tests | Gaps | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | `src/components/ui/Button.tsx` | `variant`, `size`, `fullWidth`, `disabled`, link/button modes | Strong control/button tokens | hover, focus, active, disabled | Good disabled link semantics | Size tokens; full width option | Yes | Yes | `aria-label` can be misused by consumers/CMS | Add usage guidance: aria label must include visible text. |
| Link | `src/components/ui/Link.tsx` | `variant`, `size`, `disabled` | Link/focus tokens | hover, active, focus, disabled | External target/rel computed | Text-level | Yes | Yes | Uses `noreferrer`; okay | Keep. |
| Card | `src/components/ui/Card.tsx` | `variant`, `density`, `interactive` | Card/elevation tokens | hover/focus-within/active | Focus-within support | Structural | Yes | No direct test found | Default shadow may be strong | Add elevation guidance. |
| Badge | `src/components/ui/Badge.tsx` | `tone`, `size` | State colors/radius/spacing | Static | Text span | `nowrap` by default | Yes | No direct test found | Long badge labels can overflow in some contexts | Keep, allow wrapping locally as Learning does. |
| Heading | `src/components/ui/Heading.tsx` | `level`, `size`, `weight`, `tone`, `tracking` | Strong typography tokens | Static | Semantic heading level | Visual size decoupled | Yes | No direct test found | Consumers sometimes choose `h4` where `h3` is needed | Use semantic level first, visual size second. |
| Text | `src/components/ui/Text.tsx` | `as`, `kind`, `tone`, `size`, `weight`, `tracking`, `muted` | Strong typography tokens | Static | Semantic via `as` | Text wraps naturally | Yes | Yes | `as` can create headings but does not enforce hierarchy | Keep. |
| Container | `src/components/ui/Container.tsx` | `as`, `maxWidth`, `paddingX` | Uses token defaults | Static | Semantic via `as` | Responsive padding token | Layout story | No direct test found | Uses inline structural styles | Keep as documented structural exception. |
| Stack | `src/components/ui/Stack.tsx` | `as`, `gap` | Token-aware gap | Static | Semantic via `as` | Structural | Layout story | No direct test found | Inline style structural gap | Keep. |
| Inline | `src/components/ui/Inline.tsx` | align/justify/gap/wrap | Token gap classes | Static | Semantic via `as` | Wrap option | Layout story | No direct test found | Limited gap scale | Keep. |
| Cluster | `src/components/ui/Cluster.tsx` | align/gap | Token gap classes | Static | Semantic via wrapper | Wrapped chips/actions | Layout story | No direct test found | None material | Keep. |
| Grid | `src/components/ui/Grid.tsx` | columns/minItemWidth/gap/align | Token gap classes | Static | Semantic via `as` | Auto-fit support | Layout story | No direct test found | No responsive prop variants | Keep. |
| PageShell | `src/components/layout/PageShell.tsx` | title/description/canonical/children | Container tokens | Static | Header, main, footer | Container responsive | Indirect | Yes | Head tags are client-side only | Keep; SEO phase may improve head/canonical. |
| Header | `src/components/layout/Header.tsx` | none | Container/nav styles | loading/error states | Skip link, brand current state | ResponsiveNav controls | Indirect | Header via nav/page tests | Include header/main layout in CLS trace review | Consider skeleton/reserved header area only if confirmed by CLS evidence. |
| ResponsiveNav | `src/components/navigation/ResponsiveNav.tsx` | `menu` data | Nav CSS uses tokens and some local values | desktop panel, mobile drawer, accordion | Strong focus behavior | CMS breakpoint | No direct story found | Yes | Some hard-coded motion/shadow | Add story later; do not refactor now. |
| RichTextRenderer | `src/components/rich-text/RichTextRenderer.tsx` | `document`, `className` | Styled by ArticlePage CSS | Handles marks/assets/links | Alt fallback and safe external links | Images responsive in CSS | No story found | Yes | No code block language/tables/schema | Defer editorial upgrades. |
| ArticleCard | `src/components/articles/ArticleCard.tsx` | `article` | Own CSS plus tokens | hover/focus, missing image/excerpt/meta states | Article semantics, title and CTA links | Responsive grid host | Yes | Yes | Image alt uses title; card has multiple links to same article | Keep; consider stretched-link pattern later only if approved. |

## 13. Section-by-Section Audit

| Section | Implementation summary | Data/model source | Strengths | Concerns | Coverage | Preferred recommendation |
| --- | --- | --- | --- | --- | --- | --- |
| Hero | `HeroSection` renders normalized model through `SectionHeader`, `ProofList`, `MediaFrame`. | Contentful/static `sectionHero`; `normalizeHeroSection`. | Clear brand, strong CTAs, responsive media. | Live CTA aria labels mismatch visible text; hero image oversized. | Story + normalizer tests. | Keep layout; fix content labels and image delivery. |
| Timeline | Ordered list of normalized timeline items with media and Card. | `sectionTimeline`; normalizer. | Scannable, responsive alternation, media fallback. | `Heading level={4}` skips levels; timeline images oversized. | Story + tests. | Change semantic heading level later; optimize image URLs. |
| Skills | Split-list grouped rows with badges. | `sectionSkills`; normalizer. | Dense and readable; avoids over-carded UI. | Long badges should be tested if content changes. | Story + tests. | Keep. |
| Projects | Scroll-snap slider with rich cards, actions, media, highlights. | `sectionProjects`; normalizer and project links. | High content density and strong card structure. | Slider/image payload issues remain; generic CTA labels have a Phase 2 guard now live-verified. | Story + tests. | Polish card hierarchy and image strategy after token/a11y/performance evidence. |
| Learning | Roadmap timeline inside surface wrapper. | `sectionLearning`; normalizer. | Distinctive learning narrative, good status badges; `--space-5` token defect fixed. | `h4` skip and wide breakpoint QA still needed. | Story + tests. | Review heading semantics and viewport behavior before visual polish. |
| Contact | Email plus link chips. | `sectionContact`; normalizer. | Clear conversion path. | No major issue. | Story + tests. | Keep. |
| Blog/article surfaces | Landing latest writing, `/articles`, `/articles/:slug`. | `getAllArticles`, `getArticleBySlug`. | ArticleCard exists; article detail handles rich text/assets. | SEO schema/social metadata missing; article hero alt could be more descriptive. | Tests + ArticleCard story. | Add SEO/schema later; keep ArticleCard. |
| ArticleCard | Canonical article-list surface. | `ArticleListItem`. | Good missing-content resilience; stories cover states. | Multiple links to same destination; no category/tags yet. | Story + tests. | Keep as canonical; no new duplicate card component. |

SEO and discoverability notes for projects/articles:

- `/articles` exists and is linked from nav/footer/landing.
- Project actions can link to article case studies, but visible labels should be descriptive.
- Article schema and Person schema would improve machine readability without changing UI.

## 14. SEO Audit

Current implementation:

- `SeoHead` sets `document.title`, meta description, and canonical link via React effects.
- `buildCanonicalUrl` uses `VITE_SITE_URL` when available and now falls back to `https://gilbertaharo.com`.
- Landing, articles index, article detail, debug, and 404 routes pass SEO values.
- `public/robots.txt` and `public/sitemap.xml` now exist locally and build into `dist`.
- `index.html` now contains a stronger fallback title, description, favicon, theme color, and baseline share metadata.

Confirmed live findings after Phase 2 closeout:

- `gilbertaharo.com` is reachable.
- `www.gilbertaharo.com` redirects to `gilbertaharo.com`.
- `gilbertoharo.com` and `www.gilbertoharo.com` did not resolve.
- `curl -s https://gilbertaharo.com/robots.txt` returns valid robots text.
- `curl -s https://gilbertaharo.com/sitemap.xml` returns valid XML sitemap content.
- Neither crawler file returns SPA HTML.
- Live root metadata uses the updated Phase 2 fallback title, description, favicon, Open Graph, and Twitter metadata.
- Lighthouse SEO follow-up score is `100`.
- Lighthouse confirms valid canonical, valid robots, and crawlability.
- Prior blocker root cause: Netlify stale deploy/cache.

Remaining gaps:

- Keep `robots.txt` and `sitemap.xml` body inspection in future release checks because HTTP status/header checks alone can pass while the body is SPA fallback HTML.
- Route-owned Open Graph metadata is not yet generated by `SeoHead`; only the `index.html` fallback has baseline share metadata.
- Route-owned Twitter/X card metadata is not yet generated by `SeoHead`; only the `index.html` fallback has baseline share metadata.
- No JSON-LD structured data.
- No article schema.
- No person/profile schema.
- No project/work schema.
- SPA rendering means crawlers that do not execute JS see only the app shell.

Recommendations:

- Preserve the Phase 2 live verification baseline and keep crawler body checks in the release checklist.
- Keep canonical URLs absolute by setting/validating `VITE_SITE_URL=https://gilbertaharo.com`; the helper fallback now protects missing/invalid env values.
- Decide whether the static sitemap should remain manually maintained or become generated from the article source.
- Add route-owned OG/Twitter metadata in `SeoHead`.
- Add lightweight JSON-LD for Person and Article in a later phase.
- Keep weak visible link labels out of CMS content; local project-action normalization now guards exact generic labels such as "Read more".

Do not promise rankings. These changes help search engines understand the site and help users decide to visit.

## 15. Storybook Audit

Status:

- Storybook exists with `@storybook/react-vite` v10.3.5.
- Addons: docs and a11y.
- Stories are hybrid:
  - Foundations in `src/stories/*`
  - Component/section stories colocated under `src/components/**`
- CI runs `npm run build-storybook` on Node 22.12.
- Local default Node fails Storybook, but the build passes when Node 22.12+ is selected through `.nvmrc`, `.node-version`, or an equivalent version manager.

Story coverage found:

- Foundations: Tokens, Typography, Layout, Interaction States.
- UI: Button, Link, Card, Badge, Heading, Text, LayoutPrimitives.
- Sections: Hero, Timeline, Skills, Projects, Learning, Contact, Footer, LearningRoadmapTimeline.
- Articles: ArticleCard with realistic missing-content states.

Gaps:

- `test:storybook` was not run in this audit.
- No visual regression setup.
- No direct ResponsiveNav story found.
- A11y addon exists, but there is no evidence of CI-enforced Storybook a11y checks.

Recommendations:

- Keep the existing Storybook architecture.
- Add targeted a11y stories/checks for Button, Link, Card, ArticleCard, ProjectsSection, LearningSection, and ResponsiveNav.
- Add Storybook test-runner only for critical flows once stories are stable.
- Consider Playwright screenshots or Chromatic later; do not require paid services.

## 16. Contentful and Data Boundary Audit

Confirmed strengths:

- `ContentSource` owns source contract with `getLandingPage`, `getArticleBySlug`, `getAllArticles`, `getNavigationMenu`, and `getFooter`.
- `getContentSource` switches `contentful` vs `static` through public Vite env.
- Contentful API helpers are isolated in `src/content/contentful/api.ts`.
- Adapter layer maps raw Contentful entries to app data.
- Section renderers consume normalized view models.
- Static fixtures support UI-first development.
- Footer/navigation/articles are source-driven, not hardcoded into sections.
- Contentful migrations were not run.

Concerns:

- Contentful fetches use include depth 10 for landing/footer/article detail. This is simple but should be watched for payload growth.
- Browser-side Contentful delivery token remains a documented transitional boundary.
- Live images are fetched directly at original/high sizes from Contentful; image transforms are not applied in render helpers.
- CTA accessible-name mismatches appear content-driven, which means CMS QA needs to include a11y label checks.
- `src/content/source.ts` still contains old commented code. It is harmless but could be cleaned in a maintenance sweep if desired.

Safe migration guidance:

- Keep additive field sequencing.
- Do not delete fields in one step.
- Maintain fallback mapping while content is backfilled.
- Keep raw CMS types separate from UI-ready normalized types.
- Require explicit approval for any CMS field or migration change.

## 17. Risk Register

Phase 2 closeout note (May 15, 2026):

- Local repo changes now add valid `public/robots.txt`, valid `public/sitemap.xml`, stronger `index.html` fallback metadata, a replacement favicon, absolute canonical fallback behavior, and a generic project-action label guard.
- Live-site verification now passes: `robots.txt` returns valid robots text, `sitemap.xml` returns valid XML, neither crawler file returns SPA HTML, live root metadata is updated, and Lighthouse SEO follow-up returned `100`.
- Resolved blocker: the live site originally served stale SPA HTML for crawler files because of Netlify stale deploy/cache. The current production deploy now serves the Phase 2 artifact.

Phase 3 token verification note (May 15, 2026):

- Phase 3 started only after Phase 2 live verification passed.
- Added `--space-5: 1.25rem` to `src/styles/tokens.css` and included it in `src/stories/Tokens.stories.tsx`.
- Focused undefined CSS variable scan found no remaining concrete undefined custom property references. The only pre-filter false positive was the dynamic `Stack` template string (`var(--space-${gap})`).
- Navigation still has local hard-coded transition durations; this remains a deferred motion-token alignment task, not part of the first token defect fix.
- Validation passed: `npm run lint`, `npm run test`, `npm run build`, focused CSS custom property scan, and `npm run build-storybook` with Node `22.12.0` selected through the local version manager.

Phase 3 motion/responsive baseline note (May 15, 2026):

- Motion inventory confirms primitives, ArticleCard, Projects, Hero, and Footer use shared motion tokens with reduced-motion coverage.
- Navigation uses local `0.12s`, `0.15s`, and `0.2s` `ease` transitions. No exact-equivalent token substitution was made because the current token easing and durations do not match those values exactly.
- Responsive inventory confirms the documented breakpoint reference tokens (`40rem`, `48rem`, `60rem`, `64rem`, `80rem`) and keeps explicit media query values as the current browser-safe CSS strategy.
- Deferred responsive findings are documented for Learning `96rem`, Hero `820px`, Footer/Header `900px`/`901px`, and compact `480px` tuning.
- README Storybook guidance was updated to portable Node `22.12+` instructions through `.nvmrc`, `.node-version`, or an equivalent version manager.
- No layout, IA, routing, CMS model, Contentful migration, typography, card/elevation, image delivery, CLS, or visual polish work was started.

Phase 3 closeout note (May 18, 2026):

- Phase 3 is closed.
- Closeout evidence: `--space-5` token defect resolved, focused CSS custom property scan passes with only the documented dynamic `Stack` false positive, motion baseline documented, responsive/breakpoint baseline documented, and current Storybook guidance uses portable Node `22.12+` instructions.
- Deferred findings remain intentionally open for later QA/polish: navigation hard-coded transition values, section-specific breakpoint values, and manual responsive QA.
- Validation passed: `npm run lint`, `npm run test`, `npm run build`, `npm run build-storybook` with Node `22.12.0`, CSS variable scan, motion scan, breakpoint scan, machine-specific command scan for current guidance, and `git diff --check`.
- No layout, IA, routing, CMS model, Contentful migration, typography/card/elevation polish, image delivery, CLS implementation, or production behavior changes were introduced during Phase 3 closeout.

Phase 4 readiness note (May 18, 2026):

- Phase 4 is ready to begin, but implementation has not started.
- Phase 4 should start with evidence capture: review Lighthouse desktop trace/filmstrip evidence and image network payloads before assigning CLS root cause or changing image delivery.
- Existing local evidence lives in `.tmp/design-system-audit/` and remains untracked.
- Missing evidence: confirmed desktop CLS source, asset-by-asset payload inventory, and an evidence-backed decision on whether Contentful image sizing, async content, media reservation, header/footer behavior, or font fallback contributes to the measured shift.

Phase 4 evidence checkpoint (May 18, 2026):

- Evidence report: `docs/planning/phase-4-image-cls-evidence.md`.
- Fresh Lighthouse desktop artifacts were captured locally under `.tmp/design-system-audit/` and remain untracked.
- CLS evidence is conflicting: the prior desktop artifact reported `0.908`, while the fresh Phase 4 desktop run reported `0.009`; root cause remains unconfirmed because the reported shifted node is the broad `main#main-content` region.
- Image payload issue is confirmed: fresh desktop total byte weight is `8,356 KiB`, with `5` image requests totaling `8,388,839 B` and estimated image-delivery savings of `8,101 KiB`.
- Largest payload contributors are raw Contentful hero/timeline images. Future implementation should preserve current CMS contracts while adding derived image URL delivery, responsive `srcset`/`sizes`, modern format, and quality parameters.
- No image delivery implementation, CLS fix, layout change, routing change, CMS model change, Contentful migration, typography/card/elevation polish, or production behavior change was introduced during evidence capture.

Phase 4 implementation planning checkpoint (May 18, 2026):

- Plan: `docs/planning/phase-4-image-delivery-implementation-plan.md`.
- Repeat desktop Lighthouse sanity check reproduced severe CLS (`0.908`), but the affected node remains the broad `main#main-content` region. CLS fixes remain blocked until a specific source is isolated.
- Recommended first implementation path: pure Contentful image URL helper, then Hero/MediaFrame responsive image adoption, then Timeline media adoption.
- Later surfaces remain deferred: Projects, ArticleCard, ArticlePage, and RichTextRenderer.
- No image delivery implementation, CLS fix, layout reservation change, CMS model change, Contentful migration, typography/card/elevation polish, or production behavior change was introduced during planning.

Phase 4 Batch 4.1 checkpoint (May 18, 2026):

- Added pure Contentful image URL helper and tests: `src/lib/images/contentfulImage.ts`, `src/lib/images/contentfulImage.test.ts`.
- Helper covers image URL normalization, Contentful image URL detection, transform query generation, and `srcset` generation while preserving non-Contentful behavior.
- No UI adoption has started. Hero/MediaFrame and Timeline image rendering remain unchanged.
- CLS fixes remain blocked until trace/filmstrip review isolates a specific shift source.
- No layout, IA, routing, CMS model, Contentful migration, typography/card/elevation polish, or production rendering behavior change was introduced in Batch 4.1.

Phase 4 Batch 4.2 checkpoint (May 18, 2026):

- Adopted the existing Contentful image helper for Hero media through `HeroSection` and `MediaFrame`.
- `MediaFrame` now supports optional generic `srcSet` and `sizes` props without changing CSS, wrapper markup, loading/decoding defaults, or aspect-ratio behavior.
- Hero Contentful images now use transformed fallback `src`, responsive `srcset`, and `(min-width: 1024px) 40vw, 90vw` sizes; non-Contentful Hero images keep the existing single-`src` behavior.
- Timeline, Projects, ArticleCard, ArticlePage, and RichTextRenderer remain deferred and unchanged.
- CLS fixes remain blocked until trace/filmstrip review isolates a specific shift source.
- No layout, IA, routing, CMS model, Contentful migration, typography/card/elevation polish, or unrelated production behavior change was introduced in Batch 4.2.

Phase 4 Batch 4.2 deploy verification checkpoint (May 18, 2026):

- Netlify production is ready on commit `e4b2ac06cbc26ccece8f36780f5f96450f951d56`.
- Live root serves the expected current build asset. Because the app is client-rendered, raw `curl` confirms the shell and deployed JS, while Lighthouse provides rendered Hero node and network-request evidence.
- Lighthouse confirms the Hero image is requested as transformed WebP (`hero-design.jpeg?w=720&q=75&fm=webp`) with rendered `sizes`/`srcset` on the Hero image node.
- Total byte weight improved from about `8,356 KiB` to `5,874 KiB`; image transfer improved from about `8,388,839 B` to `5,846,759 B`; Hero image transfer improved from about `2,565,640 B` to `24,470 B`.
- Remaining estimated image-delivery savings are about `5,631 KiB`, concentrated in Timeline media. Timeline adoption is approved as the next image-delivery batch.
- Lighthouse still reports CLS `0.908` against broad `main#main-content`, so CLS fixes remain blocked until a specific source is isolated.
- No production code changed during this verification pass.

Phase 4 Batch 4.3 checkpoint (May 18, 2026):

- Adopted the existing Contentful image helper for Timeline media only through `TimelineSection`.
- Timeline Contentful images now use transformed fallback `src`, responsive `srcset`, and `(min-width: 768px) 316px, 90vw` sizes; non-Contentful Timeline media keeps the existing single-`src` behavior.
- Timeline loading remains `lazy`, decoding remains `async`, and no Timeline CSS, card hierarchy, layout, or aspect-ratio reservation changed.
- Hero/MediaFrame behavior is preserved. Projects, ArticleCard, ArticlePage, and RichTextRenderer remain deferred and unchanged.
- CLS fixes remain blocked until trace/filmstrip review isolates a specific shift source.
- No layout, IA, routing, CMS model, Contentful migration, typography/card/elevation polish, or unrelated production behavior change was introduced in Batch 4.3.

Phase 4 Batch 4.3 deploy verification checkpoint (May 18, 2026):

- Production serves the Batch 4.3 bundle and live Lighthouse confirms Timeline image requests are transformed Contentful WebP URLs at `w=320&q=75&fm=webp`.
- Total byte weight improved from the Batch 4.2 post-Hero value of `5,874 KiB` to `235 KiB`; image transfer improved from `5,846,759 B` to `72,782 B` including favicon.
- Timeline image requests are `10,148 B`, `10,241 B`, `13,049 B`, and `14,067 B`; remaining estimated image-delivery savings are `18 KiB`.
- Lighthouse after deploy reports performance `0.84`, LCP `1.6 s`, CLS `0.009`, and TBT `210 ms`.
- Later image surfaces may proceed to a separate Batch 4.4 planning step with route-specific evidence. CLS fixes remain blocked until a specific severe shift source is isolated.
- No production code changed during this verification pass.

Phase 4 Batch 4.4 later image-surface evidence checkpoint (May 18, 2026):

- Created `docs/planning/phase-4-batch-4-4-later-image-surfaces.md`.
- Route-specific Lighthouse evidence was gathered for `/`, `/articles`, and all three sitemap article detail routes.
- `/articles` remains a confirmed payload issue: total byte weight `3,859 KiB`, image transfer `3,794,510 B`, Contentful image transfer `3,793,727 B`, and estimated image-delivery savings `2,044 KiB` from ArticleCard images.
- ProjectsSection, ArticlePage, and RichTextRenderer image adoption are deferred because current route evidence does not show meaningful image-delivery savings for those surfaces.
- No production code changed during this planning/evidence pass.

| Risk | Severity | Likelihood | Evidence | User impact | Recommended mitigation | Owner/phase |
| --- | --- | --- | --- | --- | --- | --- |
| Invalid robots/sitemap | Low | Resolved | Phase 2 live `curl -s` checks return robots text/XML, not SPA HTML | Regression would harm crawl control and sitemap discovery | Keep body checks in release validation | Phase 2 closed |
| Invalid live canonical | Low | Resolved | Lighthouse SEO follow-up score `100`; canonical audit passes | Regression would create duplicate/ambiguous URL signals | Keep canonical spot checks in release validation | Phase 2 closed |
| Desktop CLS severe lab finding | High | Reproduced; root cause unconfirmed | Previous desktop CLS `0.908`; fresh Phase 4 desktop CLS `0.009`; repeat Phase 4 desktop CLS `0.908`; affected node remains broad `main#main-content` | Potential jarring layout shift and CWV risk | Trace/filmstrip review must isolate the specific shift source before any layout-reservation fix | Phase 4/8 |
| Oversized Contentful images | Medium | Improved on homepage; route surfaces still need evidence | Baseline desktop total byte weight `8,356 KiB`; Batch 4.3 deploy verification total byte weight `235 KiB`; remaining estimated image-delivery savings `18 KiB` | Route-specific images may still create data cost or LCP risk | Plan later-surface adoption with route-specific Lighthouse/network evidence before implementation | Phase 4/7 |
| Oversized ArticleCard images | High | Confirmed on `/articles` | `/articles` total byte weight `3,859 KiB`; image transfer `3,794,510 B`; estimated image-delivery savings `2,044 KiB` | Slow article index loading and data cost | Implement narrow ArticleCard responsive Contentful image delivery, then deploy-verify `/articles` | Phase 4 |
| Accessible-name mismatches | High | Confirmed by Lighthouse | Label/content-name audit | Voice control/screen reader confusion | Align visible labels and aria labels | Phase 8 |
| Undefined `--space-5` | Low | Resolved | `--space-5` added to `tokens.css`; undefined-variable scan clean | Regression would affect wide Learning spacing | Keep token scan in release validation | Phase 3 closed |
| Navigation hard-coded motion values | Low-medium | Confirmed | `Navigation.css` uses local `0.12s`, `0.15s`, and `0.2s` `ease` transitions; reduced-motion block exists | Possible motion inconsistency, but current behavior is stable | Defer until a motion-token alignment phase can preserve or intentionally change behavior | Phase 3 closed / later polish |
| Section-specific breakpoint drift | Low-medium | Confirmed | Learning `96rem`, Hero `820px`, Footer/Header `900px`/`901px`, compact `480px` values | Potential responsive maintenance friction | Keep documented as content-specific values; verify during responsive QA before changing | Phase 8 |
| Heading order skips | Medium | Confirmed by Lighthouse | `TimelineSection`, `LearningRoadmapTimeline` | Screen reader navigation clarity | Use semantic `h3` visual size override | Phase 8 |
| Default Node drift | Medium | Confirmed | Node `22.2.0`; Storybook fails | Local validation friction | Make default shell resolve 22.12+ | Phase 10 |
| Browser-side delivery token | Medium | Known architecture | `env.ts`, `client.ts` | Public delivery token exposure pattern | Keep documented; later server boundary if needed | Future data phase |
| Storybook a11y not CI-enforced | Low-medium | Confirmed | Addon exists; runner not run | Regressions may slip | Add targeted runner checks later | Phase 9 |

## 18. Recommendations

### Immediate No-Regret Improvements

| Recommendation | Impact | Effort | Risk | Files likely affected | Layout/functionality change |
| --- | --- | --- | --- | --- | --- |
| Keep live `robots.txt` release body checks in place. | High | Low | Low | validation notes | No layout; crawler behavior only |
| Keep live `sitemap.xml` release body checks in place; decide whether static or generated maintenance is preferred. | High | Low-medium | Low | `public/sitemap.xml` or build script | No layout |
| Preserve crawler-file body validation with `curl -s` and reject SPA fallback HTML. | High | Low | Low | deploy config, validation notes | No layout |
| Keep live canonical validation in release checks. | High | Low-medium | Medium | `src/lib/seo.ts`, env/deploy config, `SeoHead` tests | No layout |
| Keep `index.html` fallback SEO title, description, icons, and baseline share metadata aligned with route metadata. | Medium | Low | Low | `index.html`, `public/*` | No layout |
| Preserve Phase 3 token/motion/responsive closeout evidence in release checks. | Medium | Low | Low | `tokens.css`, foundations docs, planning docs | No layout redesign |

### Design Polish

| Recommendation | Impact | Effort | Risk | Files likely affected | Layout/functionality change |
| --- | --- | --- | --- | --- | --- |
| Define elevation model before tuning cards. | Medium | Low docs | Low | design-system docs | No |
| Tune ArticleCard/Projects/Learning card hierarchy after SEO/a11y. | Medium | Medium | Medium | card/section CSS | Minor layout polish |
| Keep typography system stack unless brand distinction becomes a goal. | Medium | Low | Low | docs first | No |

### Accessibility Fixes

| Recommendation | Impact | Effort | Risk | Files likely affected | Layout/functionality change |
| --- | --- | --- | --- | --- | --- |
| Ensure aria labels include visible text or remove redundant aria labels. | High | Low-medium | Medium if CMS content changes | CMS content, `ActionGroup`, `ProjectsSection`, `FooterSection` | No visual layout required |
| Adjust timeline/learning card headings to semantic `h3`. | Medium | Low | Low | `TimelineSection.tsx`, `LearningRoadmapTimeline.tsx` | No visual change if size override used |
| Add Storybook a11y states for CTA label patterns. | Medium | Medium | Low | stories | No |

### Responsive Fixes

| Recommendation | Impact | Effort | Risk | Files likely affected | Layout/functionality change |
| --- | --- | --- | --- | --- | --- |
| Investigate desktop CLS with Lighthouse trace/filmstrip evidence before assigning root cause. | High | Medium | Low | likely layout/header/section loading after confirmation | Maybe minor reservation changes |
| QA Projects slider at mobile/tablet/desktop. | Medium | Medium | Low | docs/test notes first | No unless issues confirmed |
| Verify Learning at 80rem/96rem after token fix. | Medium | Low | Low | `LearningSection.css` | Minor spacing |

### SEO Fixes

| Recommendation | Impact | Effort | Risk | Files likely affected | Layout/functionality change |
| --- | --- | --- | --- | --- | --- |
| Add OG/Twitter metadata to `SeoHead`. | Medium | Medium | Low | `SeoHead`, pages/SEO helpers | No layout |
| Keep favicon and fallback `index.html` title/description/share metadata aligned with route metadata. | Medium | Low | Low | `public/*`, `index.html` | No layout |
| Add Person and Article JSON-LD later. | Medium | Medium | Medium | route SEO helpers/pages | No layout |

### Storybook/Testing Improvements

| Recommendation | Impact | Effort | Risk | Files likely affected | Layout/functionality change |
| --- | --- | --- | --- | --- | --- |
| Add ResponsiveNav story. | Medium | Medium | Low | `ResponsiveNav.stories.tsx` | No |
| Run `test:storybook` after stable stories. | Medium | Medium | Low | Storybook config/scripts | No |
| Add optional Playwright screenshot smoke tests later. | Medium | Medium-high | Medium | test setup | No app behavior |

### Content/Data Model Improvements

| Recommendation | Impact | Effort | Risk | Files likely affected | Layout/functionality change |
| --- | --- | --- | --- | --- | --- |
| Add Contentful image transform helper. | High | Medium | Medium | normalizers/render helpers | No IA; image URLs change |
| Add content QA rule for action `ariaLabel`. | High | Low docs | Low | content docs | No |
| Keep browser-side token boundary documented until a server boundary is planned. | Medium | Medium future | Medium | architecture/env docs | Future functionality |

### Defer/Avoid For Now

- Do not redesign IA, routing, or CMS model.
- Do not refactor production components during this audit.
- Do not add multiple font families now.
- Do not introduce visual regression services before core SEO/a11y fixes.
- Do not run destructive Contentful migrations.

## 19. Open Questions

- Is `gilbertoharo.com` owned? If yes, should it redirect to `gilbertaharo.com`?
- Is live `VITE_SITE_URL` set to `https://gilbertaharo.com`?
- Should the sitemap be static, generated at build time, or served by a future API/server function?
- Which Contentful image parameters are acceptable for the current assets (`w`, `fm=webp`, `q`, responsive `srcset`)?
- Are hero/project CTA labels intended to be user-visible changes or only content corrections?
- Should article pages eventually have editorial serif accents, or should the portfolio remain single-font?

## 20. Appendix

Measurement artifacts:

- `.tmp/design-system-audit/lighthouse-desktop.report.json`
- `.tmp/design-system-audit/lighthouse-desktop.report.html`
- `.tmp/design-system-audit/lighthouse-mobile.report.json`
- `.tmp/design-system-audit/lighthouse-mobile.report.html`
- `.tmp/design-system-audit/pagespeed-mobile.json` (429 quota error)
- `.tmp/design-system-audit/pagespeed-desktop.json` (429 quota error)
- `.tmp/design-system-audit/crux-origin.json` (403 unregistered caller)

Command output summary:

- `npm run lint`: pass.
- `npm run build`: pass; Vite warning because shell Node is `22.2.0`, below `20.19+ or 22.12+`.
- `npm run test`: pass, 31 test files, 101 tests after Phase 2 canonical/project-label coverage was added.
- `npm run build-storybook`: fail on default Node `22.2.0`.
- `npm run build-storybook` with Node 22.12+ selected through `.nvmrc`, `.node-version`, or an equivalent version manager: pass.
- `xmllint --noout dist/sitemap.xml`: pass after Phase 2.
- Built `dist/robots.txt` and `dist/sitemap.xml`: present and do not contain SPA HTML.
- Lighthouse: pass after network escalation; initial `npx` attempt failed due sandbox DNS to npm registry.

Assumptions:

- Live site is the deployed production target.
- Contentful data visible in Lighthouse reflects current published live content.
- Existing UI-first, CMS-second architecture remains the desired direction.

Known limitations:

- No field Core Web Vitals were available.
- No secrets were read.
- No production components were changed.
- `.tmp/` is untracked and contains bulky local audit artifacts.

## Checkpoint Log Entry

Date: May 15, 2026

Scope:

- Current design-system snapshot audit for live site and local repo.
- Verified domains, Lighthouse, PageSpeed/CrUX availability, local validation, Storybook, tokens, components, sections, SEO, a11y, responsive behavior, and Contentful/data boundaries.
- Validation correction pass: updated the audit and roadmap to require body-based crawler checks, add `index.html` fallback SEO cleanup, move image delivery/desktop CLS confirmation before typography/card polish, replace machine-specific Storybook commands with portable Node 22.12+ guidance, and treat desktop CLS as a serious Lighthouse lab finding pending trace/filmstrip confirmation.
- Phase 2 implementation checkpoint: added local crawler files, absolute canonical fallback behavior, fallback metadata, favicon, safe generic project-action label normalization, and deploy/Lighthouse follow-up notes.
- Phase 2 closeout checkpoint: live crawler files, root metadata, canonical behavior, deployed commit, and Lighthouse SEO `100` passed. Prior Netlify stale deploy/cache blocker is resolved.
- Phase 3 start checkpoint: token verification began after Phase 2 closeout; `--space-5` was added and the focused undefined-variable scan is clean.
- Phase 3 validation checkpoint: `npm run lint`, `npm run test`, `npm run build`, focused CSS custom property scan, and `npm run build-storybook` with Node `22.12.0` passed. Default shell Node remains `v22.2.0`, so `npm run build` still prints the known Vite Node-floor warning.
- Phase 3 motion/responsive baseline checkpoint: documented current motion-token coverage, deferred navigation hard-coded transitions, breakpoint reference-token strategy, section-specific responsive values, and portable Storybook/Node guidance. No visual polish or component behavior changes were made.
- Phase 3 closeout checkpoint: Phase 3 is closed as of May 18, 2026 after lint/test/build/Storybook, CSS variable scan, motion scan, breakpoint scan, machine-specific command scan for current guidance, and `git diff --check` passed. Phase 4 is ready for evidence capture only; no Phase 4 implementation has started.
- Phase 4 evidence checkpoint: created `docs/planning/phase-4-image-cls-evidence.md`, captured fresh Lighthouse desktop artifacts locally, confirmed image payload weight, documented conflicting CLS evidence, and inspected image rendering/code paths. No image delivery or CLS implementation was started.
- Phase 4 planning checkpoint: created `docs/planning/phase-4-image-delivery-implementation-plan.md`, repeated the CLS sanity check, kept CLS fixes blocked, and planned the first image-delivery path around a pure Contentful image URL helper plus Hero/Timeline adoption. No implementation was started.
- Phase 4 Batch 4.1 checkpoint: added pure Contentful image URL helper and unit tests, preserving non-Contentful/protocol-relative behavior and avoiding all UI image adoption or CLS work.
- Phase 4 Batch 4.2 checkpoint: adopted responsive Contentful delivery for Hero media through `MediaFrame`, preserving non-Contentful behavior and leaving Timeline/later image surfaces and CLS work untouched.
- Phase 4 Batch 4.2 deploy verification checkpoint: production serves commit `e4b2ac06`, Hero transformed delivery is verified by Lighthouse, total byte weight improved to `5,874 KiB`, and Timeline adoption is approved next while CLS fixes remain blocked.
- Phase 4 Batch 4.3 checkpoint: adopted responsive Contentful delivery for Timeline media, preserving Timeline layout/CSS, Hero behavior, later image surfaces, CMS boundaries, and CLS blockers.
- Phase 4 Batch 4.3 deploy verification checkpoint: production serves the Batch 4.3 bundle, Timeline transformed delivery is verified by Lighthouse, total byte weight improved to `235 KiB`, remaining image-delivery savings dropped to `18 KiB`, and later image surfaces are cleared for separate Batch 4.4 planning while CLS fixes remain blocked.
- Phase 4 Batch 4.4 later-surface evidence checkpoint: route-specific evidence confirms ArticleCard images on `/articles` still need optimization, while ProjectsSection, ArticlePage, and RichTextRenderer are deferred. No production code changed.

Files created:

- `docs/design-system/design-system-snapshot-audit-current.md`
- `docs/planning/design-system-roadmap-current.md`

Commands run:

- `curl` domain/header checks
- `curl -s` robots/sitemap body checks
- Lighthouse desktop/mobile through `npx --yes lighthouse@latest`
- PageSpeed Insights and CrUX API attempts
- `npm run lint`
- `npm run build`
- `npm run test`
- `npm run build-storybook`
- `npm run build-storybook` with Node 22.12+ selected through `.nvmrc`, `.node-version`, or an equivalent version manager
- `xmllint --noout dist/sitemap.xml`
- Built crawler file body inspection for `dist/robots.txt` and `dist/sitemap.xml`

Next recommended phase:

- Finish Phase 3 documentation/validation, then continue to Phase 4 CLS trace/filmstrip confirmation and image delivery investigation before visual polish.
