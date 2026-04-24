# Storybook + Design System Migration Plan

> Legacy note (April 24, 2026): this migration is complete and this file is retained for historical implementation context only.
> Canonical status tracking now lives in:
> - `docs/planning/TASKS.md`
> - `docs/planning/IMPLEMENTATION-ROADMAP.md`
> - `docs/planning/PHASE-7-TESTING-GOVERNANCE-DOCS.md`

## Status (2026-04-15)

Storybook integration is now implemented in-repo with a hybrid story layout.

## Implemented Footprint

- `.storybook/main.ts`
- `.storybook/preview.ts`
- Collocated stories in `src/components/**`
- Cross-cutting stories in `src/stories/`
- Section story fixtures in `src/components/sections/sectionStoryFixtures.ts`

## Active Config

### `.storybook/main.ts`

- Story globs:
  - `../src/components/**/*.stories.@(ts|tsx|mdx)`
  - `../src/stories/**/*.stories.@(ts|tsx|mdx)`
- Framework: `@storybook/react-vite`
- Addons:
  - `@storybook/addon-docs`
  - `@storybook/addon-a11y`
- Vite alias `@` is wired for stories.

### `.storybook/preview.ts`

- Imports `tokens.css` and `base.css`.
- Sets default Storybook parameters for actions/controls/layout.

### `package.json` scripts

- `storybook`
- `build-storybook`
- `test:storybook`

Script detail:
- `storybook`: `storybook dev --port 6006`

## Migration Checklist

### Phase 0 - Decisions

- [x] Storybook remains in this repository.
- [x] Story layout is hybrid (collocated + `src/stories`).

### Phase 1 - Scaffolding

- [x] Added Storybook dependencies.
- [x] Added `.storybook/main.ts` and `.storybook/preview.ts`.
- [x] Verified `@` alias in stories.
- [x] Added Storybook scripts to `package.json`.

### Phase 2 - Foundations

- [x] Added token story (`src/stories/Tokens.stories.tsx`).
- [x] Added typography and layout stories (`Text`, `Heading`, `src/stories/Layout.stories.tsx`).

### Phase 3 - Primitives

- [x] Added stories for primary UI primitives (`Button`, `Link`, `Card`, `Badge`, `Text`, `Heading`, layout primitives).
- [x] Added variant/state args for primitive coverage.

### Phase 4 - Sections

- [x] Added stories for Hero, Timeline, Skills, Projects, Learning, and Contact sections.
- [x] Stories use fixtures/normalized section inputs, not raw Contentful responses.

### Phase 5 - Quality Gates

- [x] Added `@storybook/test-runner` dependency and script.
- [x] Added CI step for `npm run build-storybook` in `.github/workflows/ci.yml`.

## Constraints

- Use adapters/fixtures for story data.
- Keep stories canonical and contract-focused.
- Update tokens before touching story visuals.
