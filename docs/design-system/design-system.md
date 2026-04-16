# Design System — Hub

Single source of truth for the current UI system. Start here, then dive deeper via the links below.

## Quick links
- Foundations (tokens, base, layout): `docs/design-system/foundations.md`
- Components & sections: `docs/design-system/components.md`
- Checklist (only checklist): `docs/design-system/checklists/architect.md`
- Latest audit (2026-03): `docs/design-system/audit/2026-03-snapshot.md`
- Senior readiness context (2026-04): `docs/design-system/audit/2026-04-15-senior-readiness-context.md`
- Deprecated stubs (pointers only): `docs/design-system/ui-foundation.md`, `docs/design-system/hero-section-ui-spec.md`

## Principles (kept short)
- **Content-driven, layout-agnostic:** CMS provides meaning; UI owns layout, breakpoints, and hierarchy.
- **Primitives first:** `components/ui` → `components/sections` → `pages`; keep CMS shapes out of UI.
- **Accessibility default:** semantic HTML, visible focus, keyboard paths; fix focus-visible gaps called out in audits.
- **Colocation:** globals limited to `tokens.css` + `base.css`; feature styles live next to their components.

## Current state (Apr 2026)
- Styles: globals (`tokens.css`, `base.css`) plus colocated CSS across primitives, sections, nav, and article page.
- Nav breakpoint comes from CMS (`menu.mobileBreakpointPx`); timeline responsive at 640/768/1024.
- Content layer swaps Contentful/static via `content/source.ts`; all sections render from normalized view-model mappers.
- Storybook and CI gates are integrated (`lint`, `build`, `test`, `build-storybook`).
- Remaining gaps: preview wiring is partial and shared breakpoint token governance still needs formalization.

Repo map (design-system–relevant roots)
- Styles: `src/styles/{tokens.css,base.css}`
- Nav: `src/components/navigation/{ResponsiveNav.tsx,Navigation.css}`
- Timeline: `src/components/sections/{TimelineSection.tsx,TimelineSection.css}`
- Article page: `src/pages/{ArticlePage.tsx,ArticlePage.css}`
- Sections: `src/components/sections/*`
- Primitives: `src/components/ui/*`
- Content boundary: `src/content/*` (adapters, types, static fixtures)

## How to contribute
1) Update `foundations.md` when tokens/base/responsive rules change.
2) Update `components.md` when component APIs or colocated styles change.
3) Add a dated file under `audit/` for deep dives; keep the latest linked above.
4) Keep checklists in `checklists/architect.md`—don’t duplicate checklists elsewhere.

## Next recommended moves
- Add shared breakpoint tokens and migrate nav/timeline breakpoints to tokenized values.
- Expand Storybook interaction coverage with `test:storybook` for critical flows.
- Optional: capture the next audit as `audit/2026-06-snapshot.md` after breakpoint-token rollout.
