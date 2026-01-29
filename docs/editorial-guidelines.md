# Editorial Guidelines (Writing, SEO, Link Rules)

These rules keep content consistent, searchable, and easy to render in the UI.

---

## 1) Voice & Style

### Default voice

- Clear, specific, outcome-oriented.
- Use concrete nouns and verbs. Avoid buzzword stacking.
- Prefer short paragraphs (2–4 lines) and scannable lists.

### Structure

- One idea per paragraph.
- Use headings to create a readable outline.

---

## 2) Slugs (Routing Contract)

### Article slugs

- Required format: kebab-case (lowercase, numbers, hyphens).
- Treat slug as immutable after publish.
- Example: `narrative-interface-system-deep-dive`

### URL construction

- CMS provides slug only.
- Frontend constructs URL with a stable prefix:
  - `/articles/:slug` (recommended)

Do not hardcode route prefixes in content fields.

---

## 3) SEO Rules

### Meta title

Use `metaTitle` when:

- You want a shorter/cleaner browser title than the H1.
- You want to include your name or brand consistently.

Guideline: <= 60 characters.

Fallback logic:

- `metaTitle ?? title`

### Meta description

Use `metaDescription` when:

- The article excerpt is not an ideal search snippet.
- You need a marketing-style summary.

Guideline: <= 160 characters.

Fallback logic:

- `metaDescription ?? excerpt ?? first paragraph of body`

### Canonical URL

Use `canonicalUrl` only when:

- Content is syndicated or intentionally duplicated.
- You need to consolidate ranking signals.

Fallback:

- `canonicalUrl ?? absoluteUrl("/articles/" + slug)`

---

## 4) Rich Text Rules (Article Body)

### Headings

- Use H2 for main sections.
- Use H3/H4 for subsections.
- Do not use H1 inside body (UI uses `title` as H1).

### Links

- Prefer descriptive anchor text (“Read the full case study”) instead of raw URLs.
- For internal references inside rich text:
  - link to other `article` entries using entry hyperlinks (restricted by the model).

### Lists

- Use lists for steps, features, and comparisons.
- Keep list items short and parallel.

### Images / embedded assets

- Embed images in-body only when they clarify the story.
- Use the asset “title/description” fields as the source for alt/caption in the UI.

---

## 5) Attachments vs Embedded Media

### heroImage

- One primary image that represents the page.
- Use for social previews and page header visuals.

### attachments[]

- Supporting downloads or extra visuals (PDFs, diagrams, additional screenshots).
- Keep filenames readable:
  - `project-name-architecture-diagram.pdf`

---

## 6) Internal Link Rules (Project Links)

### Prefer references over strings

For internal “Read more” links:

- Use `projectLink.article` reference
- Leave `projectLink.url` empty

For external links (GitHub, live demo, etc.):

- Use `projectLink.url`

### Analytics labeling

Use `projectLink.analyticsLabel` for event tracking consistency.

- Example: `projects:narrative-interface-system:read-more`

Fallback if empty:

- UI uses `label`

---

## 7) Publishing Checklist

Before publishing an article:

- Slug is correct and final
- Title is descriptive and human-first
- Excerpt is present and clean
- Meta description is set (or excerpt is acceptable)
- Hero image is set (if needed)
- Links tested in preview

When updating:

- If changes are meaningful, set `updatedAt`.
