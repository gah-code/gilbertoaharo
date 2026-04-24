# Support

## Getting Help

- Bug reports / feature requests: open a GitHub issue.
- Security concerns: follow [`SECURITY.md`](SECURITY.md) (private reporting only).

## Start With Docs

- Project overview/setup: [`README.md`](README.md)
- Active execution tracker: [`docs/planning/TASKS.md`](docs/planning/TASKS.md)
- Canonical phase roadmap: [`docs/planning/IMPLEMENTATION-ROADMAP.md`](docs/planning/IMPLEMENTATION-ROADMAP.md)
- Architecture baseline: [`docs/planning/PHASE-0-BASELINE.md`](docs/planning/PHASE-0-BASELINE.md)
- Design-system docs hub: [`docs/design-system/design-system.md`](docs/design-system/design-system.md)
- Contribution workflow: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## Common Troubleshooting

### Lint/Test/Build checks

```bash
npm run lint
npm run test
npm run build
```

### Storybook build fails locally

- Storybook in this repo requires Node `22.12+`.
- If local Node is `22.2.0`, `npm run build-storybook` will fail until Node is upgraded.

### Contentful fetch issues

- Verify `.env.local` values for `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_DELIVERY_TOKEN`, and `VITE_CONTENT_SOURCE`.
- Confirm Contentful credentials and environment are valid.

### GitHub debug route/service issues

- Verify optional `VITE_GITHUB_*` settings.
- Remember Phase 1 integration is public-read-first and client-exposed (`VITE_*`) by design.

## Response Expectations

- Critical regressions/security reports: priority triage.
- General issues/requests: reviewed as maintainership bandwidth allows.
