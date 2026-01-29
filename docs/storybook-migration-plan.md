# Storybook + Design System Migration Plan

## Current Structure Snapshot

This plan mirrors the current repo layout so the migration is incremental:

- `src/styles/` for tokens + base styles
- `src/components/ui/` for primitives
- `src/components/sections/` for compositions
- `src/components/layout/` for page chrome
- `src/components/rich-text/` for CMS-safe rendering
- `src/content/` for CMS boundary + adapters
- `src/pages/` + `src/router/` for route-level wiring
- `src/preview/` for draft-content support

## Target End State

- Storybook becomes the design system workspace (tokens, primitives, sections, docs).
- CMS data is only used through adapters or fixtures, never raw Contentful data.
- The design system remains in-repo until there is clear multi-product demand.

## Proposed Storybook Footprint

- `.storybook/main.ts`
- `.storybook/preview.ts`
- `src/components/**/Component.stories.tsx` (collocated)
- `src/stories/` for cross-cutting stories (tokens, typography, layout)
- `src/content/static/fixtures.ts` for Storybook-ready content data

## Draft Storybook Config

### `.storybook/main.ts`

```ts
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: [
    "../src/components/**/*.stories.@(ts|tsx|mdx)",
    "../src/stories/**/*.stories.@(ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src")
        }
      }
    })
};

export default config;
```

### `.storybook/preview.ts`

```ts
import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "../src/styles/base.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
    layout: "padded"
  }
};

export default preview;
```

### `package.json` scripts (add)

```json
{
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

## Migration Plan (TODO)

### Phase 0 - Decisions

- [ ] Confirm Storybook stays in this repo for now.
- [ ] Agree on story placement (collocated vs `src/stories`).
- [ ] Decide on ownership for design system changes.

### Phase 1 - Scaffolding

- [ ] Add Storybook dependencies.
- [ ] Create `.storybook/main.ts` and `.storybook/preview.ts` from the draft config.
- [ ] Confirm Vite alias `@` works in stories.
- [ ] Add Storybook scripts to `package.json`.

### Phase 2 - Foundations

- [ ] Create token stories for colors, type, spacing, radius.
- [ ] Add typography stories using `Heading` and `Text`.
- [ ] Add layout stories for `Container` and `Stack`.

### Phase 3 - Primitives (`src/components/ui`)

- [ ] Create stories for each primitive (`Button`, `Badge`, `Card`, `Link`, etc.).
- [ ] Use args and controls for variant coverage.
- [ ] Add basic a11y checks for interactive components.

### Phase 4 - Sections (`src/components/sections`)

- [ ] Add fixture content in `src/content/static/fixtures.ts`.
- [ ] Create stories for each section with fixture data.
- [ ] Wrap sections with `SectionShell` for consistent spacing.

### Phase 5 - Layout + Pages (Optional)

- [ ] Add a `PageShell` story to define base layout.
- [ ] Add a `LandingPage` story using the static source.

### Phase 6 - Documentation

- [ ] Add Storybook docs pages that mirror `docs/design-system.md`.
- [ ] Document CMS boundary rules in Storybook docs.

### Phase 7 - Quality Gates

- [ ] Add `@storybook/test-runner` for critical stories.
- [ ] Add a CI step to run `build-storybook`.

## Notes and Constraints

- Use adapters or fixtures for story data, never raw Contentful responses.
- Keep stories lean: 1-2 canonical variants per component.
- Update tokens first, then update affected stories.
