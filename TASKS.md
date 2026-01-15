# Growth-focused Structure Task List

This file tracks repo-wide tasks to align the project with growth-focused structure and GitHub community best practices.

## 1) Repo Hygiene and Security

- [ ] Confirm repo visibility (public/private) and adjust policy files accordingly.
- [ ] Remove tracked `.env` and `.env.local` from git history if present.
- [ ] Ensure `.gitignore` includes `node_modules`, `dist`, `.env*`, and `tsconfig.tsbuildinfo`.
- [ ] Stop ignoring `docs/` so documentation changes are reviewable.
- [ ] Add a `.env.example` policy section in `README.md` or `docs/`.

## 2) Community Standards (GitHub Best Practices)

- [ ] Add `CONTRIBUTING.md` with setup, workflow, and PR guidelines.
- [ ] Add `CODE_OF_CONDUCT.md` (Contributor Covenant recommended).
- [ ] Add `SECURITY.md` with reporting instructions.
- [ ] Add `SUPPORT.md` with support channels and expectations.
- [ ] Add `.github/ISSUE_TEMPLATE/` (bug + feature templates).
- [ ] Add `.github/PULL_REQUEST_TEMPLATE.md`.
- [ ] Add `.github/CODEOWNERS`.

## 3) Automation and CI

- [ ] Add `.github/workflows/ci.yml` for lint, typecheck, and build.
- [ ] Add `.github/dependabot.yml` for npm dependency updates.
- [ ] Add `build-storybook` to CI once Storybook is added.

## 4) Tooling and Quality Gates

- [ ] Add `format` and `format:check` scripts (Prettier).
- [ ] Add `typecheck` script (tsc -b or tsc --noEmit).
- [ ] Add `test` script (Vitest) and a small smoke test.
- [ ] Define Prettier config in `.prettierrc`.
- [ ] Ensure ESLint config covers React + TS and is run in CI.

## 5) Codebase Structure for Growth

- [ ] Add `src/features/` for domain-specific UI (e.g., landing, articles).
- [ ] Move `src/components/sections/*` into feature folders as appropriate.
- [ ] Add `src/lib/` for shared utilities.
- [ ] Add `src/config/` for runtime configuration and constants.
- [ ] Update imports and index files to preserve public APIs.

## 6) Documentation and Architecture

- [ ] Add `docs/architecture/` for decisions and system overview.
- [ ] Add `docs/roadmap.md` for multi-phase plan.
- [ ] Keep `docs/design-system.md` and `docs/storybook-migration-plan.md` in sync with code.
- [ ] Update `README.md` structure map after refactors.

## 7) Design System + Storybook

- [ ] Add Storybook dependencies and scaffold `.storybook/` configs.
- [ ] Create token, typography, and layout stories.
- [ ] Create stories for all primitives in `src/components/ui`.
- [ ] Add fixture data in `src/content/static/fixtures.ts` for section stories.
- [ ] Add section stories in `src/components/sections`.
- [ ] Add basic a11y checks and interactions tests for critical components.

## 8) Release Tracking

- [ ] Keep `CHANGELOG.md` updated for all user-facing changes.
- [ ] Update `VERSION.md` whenever `package.json` version changes.
