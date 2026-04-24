# Phase 4 — UX + Navigation

Status: Completed (April 24, 2026). Active implementation phase moved to Phase 5.

Phase closure note: keep Phase 4 closed unless later design-system/component work reveals a true UX/navigation regression that requires direct remediation.

## Scope

Phase 4 refined cross-route UX and navigation consistency without changing architecture boundaries (`PageShell`, `src/content/*`, section normalizer pattern, and GitHub service boundary).

## What This Phase Improved

### 1) Navigation consistency

- Added route-aware active cues in header and responsive navigation (`aria-current="page"` + active classes).
- Kept mobile drawer behavior predictable while preserving Phase 3 accessibility improvements.
- Added footer route-aware active cues so global navigation intent is consistent between header and footer surfaces.

### 2) Cross-route continuity

- Added clearer recovery pathways on `NotFoundPage` (`/`, `/articles`, `/#projects`).
- Added context links on article detail pages to keep readers connected to index/home/projects.
- Improved debug route readability with simple recovery links while keeping debug surfaces intentionally separate from public product UX.

### 3) Homepage and writing discovery

- Added a lightweight homepage “Latest writing” bridge sourced from the existing content source (`getAllArticles`), with links to:
  - article detail routes
  - `/articles`
  - `/#projects`
- Strengthened article-index continuity with explicit header action links back to homepage/projects.
- Improved article-card CTA clarity using article-specific accessible labels.

## Deferred to Phase 5/6

- Broader visual-system adjustments and foundation governance (Phase 5).
- Deeper section-level rhythm and component refinements (Phase 6).
- Any broad navigation redesign beyond consistency and continuity fixes done here.

## Environment / Tooling Note

- `npm run build-storybook` may still fail locally on Node `22.2.0` because Storybook requires `22.12+`.
- This remains an environment/tooling constraint, not a Phase 4 architecture failure.

## Guardrail Check

- `src/content/*` responsibility unchanged.
- `PageShell` remains the shared shell owner.
- Route-level organization remains under `src/pages/*` and `src/pages/articles/*`.
- GitHub integration remains under `src/lib/github/*` and untouched by Phase 4.
