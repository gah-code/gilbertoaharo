# Phase 3 — Performance + Accessibility

Status: Completed (April 24, 2026). Active implementation phase moved to Phase 4.

Phase closure note: Keep this phase closed unless a later UX/navigation pass reveals a true performance or accessibility regression that requires direct remediation.

## Scope

Phase 3 targets practical, high-impact accessibility and runtime performance improvements without changing core architecture boundaries.

## What This Phase Improved

### 1) Navigation and shell accessibility

- Header nav placeholder now uses stable status semantics (`role="status"`, `aria-live`, `aria-atomic`).
- Mobile drawer keeps `aria-expanded` and dialog semantics, and now:
  - traps keyboard focus while open
  - keeps collapsed accordion content hidden from tab order
  - continues supporting Escape-to-close behavior

### 2) Route loading/error/empty semantics

Improved status/alert semantics on primary route surfaces:

- `LandingPage`: loading uses `role="status"`, error uses `role="alert"`.
- `ArticlesPage`: loading/empty use `role="status"`, errors use `role="alert"`, section marks `aria-busy` while loading.
- `ArticlePage`: loading/not-found use `role="status"`, errors use `role="alert"`.
- `DebugPage` + `DebugGithubPage`: loading/error states now provide explicit heading + status/alert semantics.

### 3) Layout stability and media handling

- Timeline media frame now reserves space with `aspect-ratio` and uses `object-fit: cover`.
- Article hero and rich-text embedded images now include aspect-ratio hints to reduce layout shifts before intrinsic dimensions resolve.
- Timeline/project media decoding is explicit (`decoding="async"`).
- Rich-text embedded assets now apply intrinsic `width`/`height` when available from Contentful asset metadata.

## Lightweight Performance Checkpoints

Critical routes:

- `/`
- `/articles`
- `/articles/:slug`

Critical performance-sensitive surfaces:

- Hero media frame
- Article hero + rich-text embedded assets
- Timeline media cards
- Projects carousel media cards
- Navigation drawer open/close interaction path

Key metrics to track in later phases/tooling:

- CLS (image-heavy sections and article body embeds)
- LCP (hero surfaces and first meaningful route heading)
- INP (navigation drawer/menu interactions)
- JS execution around route-level data loading transitions

## Known Risks and Deferred Items

Deferred to Phase 4+:

- Broader UX/navigation redesign and content discoverability enhancements
- Deeper performance instrumentation (Lighthouse budgets, field telemetry)
- Expanded semantic/linking strategy for cross-route discovery patterns

Environment/tooling note:

- `npm run build-storybook` remains blocked locally by Node version (`22.2.0` vs required `22.12+`).
- This is an environment/tooling constraint, not a Phase 3 architecture failure.

## Guardrail Check

- `PageShell` remains the shell-level metadata/layout owner.
- Route pages remain responsible for route-specific state and metadata decisions.
- `src/content/*` boundary and `ContentSource` architecture remain unchanged.
- GitHub integration remains scoped under `src/lib/github/*` and untouched by Phase 3 changes.
