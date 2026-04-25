# Contributing

Thanks for contributing.

## Code of Conduct

Follow [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) in all issues, PRs, and discussions.

## Before You Start

- Node: `>=22.12.0 <23`
- Install deps: `npm install`
- Configure env: `cp .env.example .env.local`
- Local version files: `.nvmrc` and `.node-version` are pinned to `22.12.0`
- CI runtime: Node `22.12` (`.github/workflows/ci.yml`)

If your local Node runtime is below `22.12.0`, upgrade before validating:

```bash
# nvm
nvm install 22.12.0
nvm use 22.12.0

# fnm
fnm install 22.12.0
fnm use 22.12.0
```

## Branch + PR Flow

1. Branch from `main`.
2. Keep PR scope focused (one logical change set per PR).
3. Describe:
   - what changed
   - why it changed
   - how it was validated

## Required Validation

Before opening or updating a PR, run:

```bash
npm run lint
npm run test
npm run build
```

If your change touches Storybook stories/config/design-system foundations, also run:

```bash
npm run build-storybook
```

If Storybook fails only because local Node is below `22.12`, note that explicitly in the PR.
Treat this as a local runtime/tooling parity blocker, not an application behavior failure.

## Release / Demo Refresh Checklist

Before a release or demo refresh:

1. Run `npm run lint`, `npm run test`, and `npm run build`.
2. Run `npm run build-storybook` with Node `22.12+`.
3. Smoke-check routes: `/`, `/articles`, `/articles/:slug`, `/debug`, `/debug/github`.
4. Spot-check metadata (`title`, `description`, canonical URL) on landing, articles, and not-found routes.
5. Update docs when behavior/workflow changes (`README.md`, `docs/planning/TASKS.md`, relevant `docs/planning/PHASE-*.md`, and `docs/design-system/*` as needed).

Maintenance workflow source:
- `docs/planning/PHASE-F-MAINTENANCE-QA-RELEASE-DISCIPLINE.md`

## Architecture Guardrails

- Keep `src/content/*` as the content boundary (do not bypass adapters/source contracts).
- Keep `PageShell` as shell owner for shared layout + SEO application.
- Keep route-level SEO ownership in page files.
- Keep `src/components/ui` (primitives) and `src/components/sections` (section composition) split.
- Keep section normalizer-first rendering pattern.
- Keep GitHub integration inside `src/lib/github/*` service layer.

## Documentation Expectations

When behavior, contracts, or workflow changes:

- Update `README.md` for front-door usage/setup changes.
- Update `docs/planning/TASKS.md` for roadmap closeout status and maintenance follow-ups.
- Update `docs/planning/IMPLEMENTATION-ROADMAP.md` only for phase-sequence or completion-state note changes.
- Add/update relevant `docs/planning/PHASE-*.md` record for phase-specific implementation notes.
- Keep Phase F maintenance/release discipline guidance current in `docs/planning/PHASE-F-MAINTENANCE-QA-RELEASE-DISCIPLINE.md`.
- Update `docs/design-system/*` when tokens/primitives/foundation guidance changes.

## Need Help?

Use [`SUPPORT.md`](SUPPORT.md) for support channels and common troubleshooting paths.
