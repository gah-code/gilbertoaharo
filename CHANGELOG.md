# Changelog

## [2026-01-15]

### Added

- `VERSION.md` to track versioning rules and baseline history.

### Changed

- Bumped version to `0.0.1` in `package.json` and `VERSION.md`.

### Docs

- Added Design System Roadmap summary and linked `docs/storybook-migration-plan.md` in `README.md`.

### Verification

- Not run (documentation change only).

## [2026-01-14]

### Added

- `docs/storybook-migration-plan.md` outlining the Storybook architecture, draft config, and phased migration checklist aligned to the current repo layout.

### Verification

- Not run (documentation change only).

### Next Steps

- Decide on in-repo Storybook ownership and story placement (collocated vs `src/stories`).
- Add Storybook dependencies and scaffold `.storybook/main.ts` + `.storybook/preview.ts`.
- Create initial token, typography, and primitive stories, then section stories backed by fixtures.

## [2026-01-13]

### Added

- `HeroStyle` type and new `sectionHero` fields (`heroStyle`, `avatarImage`, `heroImage`) to reflect the updated Contentful model in `src/content/contentful/types.ts`.
- Typography tokens (font stacks + size scale) in `src/styles/tokens.css` for consistent type usage.
- Color tokens and semantic mappings in `src/styles/tokens.css` to centralize palette usage across the UI.
- `SectionShell` `style` prop to allow per-section backgrounds in `src/components/sections/SectionShell.tsx`.

### Changed

- Hero rendering logic in `src/components/sections/HeroSection.tsx` now:
  - resolves asset URLs with `https:` prefix when Contentful returns protocol-relative URLs,
  - selects an `effectiveStyle` based on `heroStyle` + available assets,
  - renders avatar/image panels only when assets exist, otherwise falls back to typographic layout.
- Skills layout in `src/components/sections/SkillsSection.tsx` updated to a two-column grid with group headers, row dividers, level pills, and keyword lines.
- UI components now consume tokens instead of hard-coded colors:
  - `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Text.tsx`
  - `src/components/sections/HeroSection.tsx`, `src/components/sections/SkillsSection.tsx`
  - `src/styles/base.css` uses semantic tokens for body text and background.

### Docs

- Added layout guidance + checklist item in `README-UI.md`.
- Checked off completed tasks with notes in `TODO-UI.md`.

### Verification

- Not run (UI/style changes only).

### Next Steps

- Review hero entries for each `heroStyle` to confirm fallbacks and responsive layout.
- Consider adding `layout.css` if layout primitives expand beyond the component layer.
- Decide whether to wire typography tokens into `Heading`/`Text` for scale consistency.
