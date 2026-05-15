# Phase 2 Deploy Artifact Validation Specification

Date: May 15, 2026  
Repo: `gah-code/gilbertoaharo`  
Live URL: `https://gilbertaharo.com/`  
Current branch: `master`  
Latest local commit: `b4a51c897d536d4c87d91e66ff0422f4d0de4bdb`  
Expected Netlify production branch: `master`  
Observed Netlify production branch: `master`  
Expected publish directory: `dist`  
Observed publish directory: `dist`  
Expected deployed commit: `b4a51c897d536d4c87d91e66ff0422f4d0de4bdb`  
Observed deployed commit: `b4a51c897d536d4c87d91e66ff0422f4d0de4bdb`

## 1. Executive Verdict

Phase 2 is closed after checkpoint docs were updated.

The previous live verification blocker has been resolved. The current Netlify production deploy is `6a06fa023dd24e00088b30f8`, published from `master` at commit `b4a51c897d536d4c87d91e66ff0422f4d0de4bdb`. The deploy permalink and the custom domain both serve static `robots.txt`, static `sitemap.xml`, and updated root fallback metadata.

Lighthouse SEO follow-up was run against `https://gilbertaharo.com/` and returned an SEO score of `100`. The canonical, robots, and crawlability audits passed.

Closeout checkpoint update: `docs/planning/design-system-roadmap-current.md`, `docs/design-system/design-system-snapshot-audit-current.md`, `docs/design-system/foundations.md`, and `CHANGELOG.md` were updated after this validation spec to mark Phase 2 closed and Phase 3 token verification started.

Primary classification for the earlier blocker: `Netlify stale deploy/cache`. The issue was not a local build artifact problem, not a redirect fallback problem, and not a Contentful or app-code problem. The live site had not yet been serving the Phase 2 deploy artifact when the blocker was first observed.

## 2. Project Documentation Scan

### Docs inspected

- `README.md`
- `CHANGELOG.md`
- `VERSION.md`
- `docs/planning/design-system-roadmap-current.md`
- `docs/design-system/design-system-snapshot-audit-current.md`
- `docs/planning/ROADMAP.md`
- `docs/planning/TASKS.md`
- `docs/planning/IMPLEMENTATION-ROADMAP.md`
- `docs/design-system/design-system.md`
- `docs/design-system/checklists/architect.md`
- `docs/architecture/ia.md`
- Phase records under `docs/planning/PHASE-*.md`
- Design-system docs under `docs/design-system/**`

The requested `docs/planning/finished.md` and `docs/design-system/design-system-architect-checklist.md` paths do not exist. The closest current design-system checklist is `docs/design-system/checklists/architect.md`.

### Patterns learned

- The project uses a phase-based, docs-first workflow.
- Current roadmap authority is `docs/planning/design-system-roadmap-current.md`, with maintenance-mode state mirrored by `docs/planning/TASKS.md`.
- `docs/planning/ROADMAP.md` is legacy context and should not override current planning docs.
- Phase work is expected to close only after implementation, validation, roadmap/checkpoint updates, and the next phase or maintenance state are clear.
- Validation command patterns center on `npm run lint`, `npm run test`, `npm run build`, and `npm run build-storybook` on Node `22.12+`.
- The app is intentionally UI-first and CMS-second. Contentful supplies content; UI components and section renderers own layout, interaction, and presentation.
- SEO and deploy checks are release gates, not optional polish.
- Storybook is part of the design-system quality gate, but Storybook build requires a supported Node runtime.

### Project Patterns, Pitfalls, and Guardrails

Relevant guardrails:

- Do not change layout, IA, routing, CMS models, or Contentful migrations during this deploy validation.
- Do not start Phase 3 token work until Phase 2 live verification passes.
- Keep production component behavior unchanged.
- Preserve `src/content/*` as the content boundary and keep section rendering normalizer-first.
- Prefer body inspection for crawler files. Header-only checks are insufficient because a SPA fallback can still return `200`.

Pitfalls identified from docs and current evidence:

- Docs can get ahead of deployment. Phase 2 was locally correct before the live site served the updated artifact.
- A valid local `dist` folder does not prove the custom domain is serving that artifact.
- Netlify has two sites connected to the same GitHub repository. The custom domain currently belongs to `my-contentful-personal-website`, which is the site used for this validation.
- Node version drift remains a known local/runtime issue. Local shell Node is `v22.2.0`; Storybook and Vite expect Node `22.12+`.
- SPA fallback is intentional, but static files must shadow the fallback.
- Untracked `.tmp` audit artifacts should remain local evidence unless the project explicitly chooses to track them.

### Conflicts or stale docs

- Phase 3 Batch 2 resolved the current `README.md` machine-specific Storybook command by replacing it with portable Node `22.12+` guidance using `.nvmrc`, `.node-version`, or an equivalent version manager. Historical phase records may still preserve machine-specific runtime examples as evidence from the original validation snapshots.
- `docs/planning/ROADMAP.md` is historical; the current audit and roadmap files supersede it for this work.
- The prior current-roadmap checkpoint said Phase 2 was blocked at live verification. The evidence in this spec supersedes that blocker and supports closing Phase 2 after checkpoint docs are updated.

## 3. System Chain of Custody

| Layer | Expected | Observed | Evidence / Command | Status | Next Action |
| --- | --- | --- | --- | --- | --- |
| Docs + roadmap intent | Phase 2 live deploy gate before Phase 3 | Current docs define that gate and have been updated after validation | `docs/planning/design-system-roadmap-current.md`, `docs/design-system/design-system-snapshot-audit-current.md` | Pass | Continue Phase 3 within token-verification scope |
| Git working tree | No uncommitted source drift | Clean before spec generation | `git status --short --untracked-files=all` | Pass | Keep production code untouched |
| Git commit | Phase 2 files present in HEAD | `robots.txt`, `sitemap.xml`, `favicon.svg`, `index.html`, `netlify.toml` present | `git ls-tree -r HEAD -- ...` | Pass | None |
| GitHub branch | `origin/master` contains Phase 2 commit | `origin/master` equals local HEAD | `git remote show origin`, `git ls-remote origin refs/heads/master` | Pass | None |
| Netlify connected repo | `https://github.com/gah-code/gilbertoaharo` | Connected to expected repo | `netlify api getSite` | Pass | None |
| Netlify production branch | `master` | `master` | `netlify api getSite` | Pass | None |
| Build command | `npm run build` | `npm run build` | `netlify api getSite`, `netlify.toml` | Pass | None |
| Publish directory | `dist` | `dist` | `netlify api getSite`, `netlify.toml` | Pass | None |
| Build artifact | crawler files and updated index | Local `dist` contains valid crawler files and updated metadata | `npm run build`, `ls -la dist`, `cat dist/robots.txt`, `sed -n '1,100p' dist/sitemap.xml` | Pass | None |
| Deploy artifact | crawler files and updated index | Deploy permalink serves valid crawler files and updated metadata | `curl -s https://6a06fa023dd24e00088b30f8--my-contentful-personal-website.netlify.app/...` | Pass | None |
| Custom domain | `gilbertaharo.com` attached to current Netlify site | Attached to `my-contentful-personal-website` | `netlify api getSite` | Pass | None |
| Live response | crawler files served as static files | Live domain serves static crawler files and updated metadata | `curl -s` and `curl -I` against live URLs | Pass | None |
| Checkpoint closeout | Phase 2 closed only after live gate | Gate passes and checkpoint docs were updated after this spec was created | This spec plus roadmap/audit/changelog updates | Pass | Begin Phase 3 token verification within approved scope |

## 4. Local Artifact Evidence

Commands run:

```bash
git status --short --untracked-files=all
git branch --show-current
git log -1 --oneline
git remote -v
git remote show origin
git rev-parse HEAD
git ls-remote origin refs/heads/master
git ls-tree -r HEAD -- public/robots.txt public/sitemap.xml public/favicon.svg index.html netlify.toml
npm run build
ls -la dist
cat dist/robots.txt
sed -n '1,100p' dist/sitemap.xml
sed -n '1,120p' dist/index.html
grep -R "<!doctype html>" dist/robots.txt dist/sitemap.xml || true
grep -R "vite.svg\|gilbertoaharo" dist/index.html || true
xmllint --noout dist/sitemap.xml
```

Results:

- Current branch: `master`.
- Local HEAD: `b4a51c8 SEO , Design System Snapshot Audit + Roadmap , Made canonical URLs absolute, Lighthouse SEO and confirm movement toward 95+.`.
- Full HEAD SHA: `b4a51c897d536d4c87d91e66ff0422f4d0de4bdb`.
- `origin/master` matches local HEAD.
- `public/robots.txt`, `public/sitemap.xml`, `public/favicon.svg`, `index.html`, and `netlify.toml` are present in HEAD.
- `npm run build` passed. The known local Node warning appeared because the shell is on Node `v22.2.0`; the build still completed.
- `dist/robots.txt` exists and contains plain robots rules:

```text
User-agent: *
Allow: /
Disallow: /debug
Disallow: /debug/

Sitemap: https://gilbertaharo.com/sitemap.xml
```

- `dist/sitemap.xml` exists and includes `/`, `/articles`, and known article routes.
- `dist/sitemap.xml` passed `xmllint --noout`.
- `dist/robots.txt` and `dist/sitemap.xml` do not contain `<!doctype html>`.
- `dist/index.html` contains the updated fallback title, description, theme color, Open Graph metadata, Twitter metadata, and `/favicon.svg`.
- `dist/index.html` does not contain stale `/vite.svg` or `gilbertoaharo` fallback metadata.

Note: the local build artifact's JS filename does not need to byte-match the Netlify deploy artifact for this validation. The close gate depends on crawler files, metadata, canonical behavior, deployed commit, and live response evidence.

## 5. Netlify Artifact Evidence

Netlify project:

- Site name: `my-contentful-personal-website`
- Site ID: `80b7e809-3810-4be9-aee4-a5004d9ac7fd`
- Project URL: `https://gilbertaharo.com`
- Admin URL: `https://app.netlify.com/projects/my-contentful-personal-website`
- Connected repo: `https://github.com/gah-code/gilbertoaharo`
- Production branch: `master`
- Build command: `npm run build`
- Publish directory: `dist`
- Custom domain: `gilbertaharo.com`

Latest production deploy:

- Deploy ID: `6a06fa023dd24e00088b30f8`
- Deploy permalink: `https://6a06fa023dd24e00088b30f8--my-contentful-personal-website.netlify.app`
- Branch deploy URL: `https://master--my-contentful-personal-website.netlify.app`
- Context: `production`
- Branch: `master`
- Commit SHA: `b4a51c897d536d4c87d91e66ff0422f4d0de4bdb`
- Published at: `2026-05-15T10:49:19.506Z`
- State: `ready`

Commands run:

```bash
netlify status
netlify sites:list
netlify api getSite --data '{"site_id":"80b7e809-3810-4be9-aee4-a5004d9ac7fd"}'
netlify api listSiteDeploys --data '{"site_id":"80b7e809-3810-4be9-aee4-a5004d9ac7fd"}'
curl -s https://6a06fa023dd24e00088b30f8--my-contentful-personal-website.netlify.app/robots.txt | sed -n '1,40p'
curl -s https://6a06fa023dd24e00088b30f8--my-contentful-personal-website.netlify.app/sitemap.xml | sed -n '1,100p'
curl -s https://6a06fa023dd24e00088b30f8--my-contentful-personal-website.netlify.app/ | sed -n '1,120p'
```

Deploy permalink results:

- `/robots.txt` returns plain robots rules.
- `/sitemap.xml` returns XML sitemap content.
- `/` returns updated fallback metadata with the Phase 2 title, description, Open Graph metadata, Twitter metadata, and `/favicon.svg`.

The deploy artifact was validated through its Netlify deploy permalink and custom domain responses. Direct Netlify artifact file browsing was not required because the deploy permalink served the expected static files.

## 6. Live Domain Evidence

Commands run:

```bash
curl -s https://gilbertaharo.com/robots.txt | sed -n '1,40p'
curl -s https://gilbertaharo.com/sitemap.xml | sed -n '1,100p'
curl -s https://gilbertaharo.com/ | sed -n '1,120p'
curl -I https://gilbertaharo.com/robots.txt
curl -I https://gilbertaharo.com/sitemap.xml
curl -I https://gilbertaharo.com/
curl -s https://gilbertaharo.com/robots.txt | grep -i "<!doctype html>" || true
curl -s https://gilbertaharo.com/sitemap.xml | grep -i "<!doctype html>" || true
curl -s https://gilbertaharo.com/ | grep -i "vite.svg\|gilbertoaharo\|Gilberto Haro - Web Engineer" || true
```

Live `robots.txt` body:

```text
User-agent: *
Allow: /
Disallow: /debug
Disallow: /debug/

Sitemap: https://gilbertaharo.com/sitemap.xml
```

Live `sitemap.xml` body:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://gilbertaharo.com/</loc>
  </url>
  <url>
    <loc>https://gilbertaharo.com/articles</loc>
  </url>
  <url>
    <loc>https://gilbertaharo.com/articles/resilient-content-systems</loc>
    <lastmod>2026-03-12</lastmod>
  </url>
  <url>
    <loc>https://gilbertaharo.com/articles/editorial-frontend-partnership</loc>
    <lastmod>2026-02-02</lastmod>
  </url>
  <url>
    <loc>https://gilbertaharo.com/articles/thoughtful-interface-work</loc>
    <lastmod>2025-11-15</lastmod>
  </url>
</urlset>
```

Live headers:

- `https://gilbertaharo.com/robots.txt`: `HTTP/2 200`, `content-type: text/plain; charset=UTF-8`.
- `https://gilbertaharo.com/sitemap.xml`: `HTTP/2 200`, `content-type: application/xml`.
- `https://gilbertaharo.com/`: `HTTP/2 200`, `content-type: text/html; charset=UTF-8`.

Live root metadata:

- Title: `Gilberto Haro - Web Engineer & Content Systems`.
- Description: `Personal portfolio and writing from Gilberto Haro, focused on frontend engineering, content systems, design systems, and CMS-driven web experiences.`
- Favicon: `/favicon.svg`.
- Open Graph and Twitter fallback metadata are present.
- No stale `/vite.svg` or `gilbertoaharo` fallback metadata was found in the live root HTML.

Crawler file fallback checks:

- `robots.txt` does not contain `<!doctype html>`.
- `sitemap.xml` does not contain `<!doctype html>`.
- Static files are not being swallowed by the SPA fallback.

Lighthouse SEO follow-up:

```bash
npx --yes lighthouse@latest https://gilbertaharo.com/ \
  --only-categories=seo \
  --output=json \
  --output=html \
  --output-path=.tmp/design-system-audit/lighthouse-seo-phase-2 \
  --chrome-flags="--headless"
```

Results:

- SEO score: `100`.
- `Document has a valid rel=canonical`: pass.
- `robots.txt is valid`: pass.
- `Page isn't blocked from indexing`: pass.
- No failed SEO audits were reported.
- Artifacts written locally:
  - `.tmp/design-system-audit/lighthouse-seo-phase-2.report.json`
  - `.tmp/design-system-audit/lighthouse-seo-phase-2.report.html`

## 7. Root Cause Classification

Primary classification:

```text
Netlify stale deploy/cache
```

Secondary suspects:

```text
None currently active.
```

Explanation:

The local build artifact was valid, the Phase 2 files were committed, `origin/master` matched local HEAD, Netlify settings pointed to the expected repo, branch, command, and publish directory, and the current production deploy now serves the expected files. The earlier failure was therefore a stale live deploy state: the custom domain had not yet been serving the Phase 2 deploy artifact when the blocker was observed.

The current evidence rules out:

- Source changes not committed.
- Source changes not pushed.
- Netlify wrong branch.
- Netlify wrong repo.
- Netlify wrong publish directory.
- Redirect/fallback configuration problem.
- Build artifact generation problem.
- Custom domain attached to wrong Netlify site.
- DNS/custom-domain mismatch.

Confidence: high.

## 8. Decision Gates

### Phase 2 Close Gate

Pass.

Evidence:

- Live `robots.txt` returns plain robots rules.
- Live `sitemap.xml` returns XML.
- Neither live crawler file contains SPA HTML.
- Live root metadata matches the updated Phase 2 fallback intent.
- Live canonical behavior is confirmed by Lighthouse SEO.
- Netlify deployed commit SHA matches the Phase 2 commit.
- Lighthouse SEO follow-up was run and returned `100`.

Checkpoint action:

- Relevant roadmap/checkpoint docs were updated to record Phase 2 as live-verified and closed.

### Phase 3 Start Gate

Pass.

Phase 3 can start because the project docs now reflect Phase 2 live verification. No deploy-target ambiguity remains.

## 9. Recommended Next Action

Begin Phase 3 with the scoped `--space-5` token verification work.

Do not make a no-op deploy trigger commit. It is no longer needed because the current production deploy is already serving the Phase 2 artifact.

## 10. Constraints Confirmed

- No layout changes were made.
- No IA changes were made.
- No routing changes were made.
- No CMS model changes were made.
- No Contentful migrations were made.
- No Phase 3 token work was started during the deploy-artifact validation pass itself; the subsequent closeout pass started Phase 3 only after checkpoint docs were updated.
- No production component behavior changes were made.
- No app code was changed during this validation-spec pass.
