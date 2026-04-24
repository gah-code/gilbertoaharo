# Contributing

Thanks for contributing.

## Code of Conduct

Follow [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) in all issues, PRs, and discussions.

## Before You Start

- Node: `>=22.12.0 <23`
- Install deps: `npm install`
- Configure env: `cp .env.example .env.local`

## Branch + PR Flow

1. Branch from `main`.
2. Keep PR scope focused (one logical change set per PR).
3. Describe:
   - what changed
   - why it changed
   - how it was validated

## Required Validation

Run locally before opening or updating a PR:

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
- Update `docs/planning/TASKS.md` for active execution state.
- Update `docs/planning/IMPLEMENTATION-ROADMAP.md` only for phase-sequence or active-phase note changes.
- Add/update relevant `docs/planning/PHASE-*.md` record for phase-specific implementation notes.
- Update `docs/design-system/*` when tokens/primitives/foundation guidance changes.

## Need Help?

Use [`SUPPORT.md`](SUPPORT.md) for support channels and common troubleshooting paths.
