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

---

## 8) Article Editorial QA Checklist

Use this checklist to confirm Contentful article formatting will render consistently in the polished article template.

### Supported formatting matrix

| Formatting | Contentful usage | Frontend behavior | Editorial rule |
| --- | --- | --- | --- |
| Article title | Title field | Renders as page `h1` | Do not add another H1 in body |
| Heading 1 in body | Rich text heading 1 | Downgraded to `h2` | Prefer Heading 2 instead |
| Heading 2 | Rich text heading 2 | Renders as `h2` | Use for main article sections |
| Heading 3 | Rich text heading 3 | Renders as `h3` | Use for subsections |
| Heading 4 | Rich text heading 4 | Renders as `h4` | Use sparingly |
| Paragraph | Rich text paragraph | Renders as `p` | Keep paragraphs focused |
| Bulleted list | Rich text unordered list | Renders as `ul` | Use for scannable ideas |
| Numbered list | Rich text ordered list | Renders as `ol` | Use for steps/processes |
| Quote | Rich text quote | Renders as `blockquote` | Use for emphasis, not long sections |
| Horizontal rule | Rich text divider | Renders as `hr` | Use to separate major article movements |
| Hyperlink | Rich text link | External links open safely | Use descriptive link text |
| Bold | Rich text bold | Renders as `strong` | Use sparingly |
| Italic | Rich text italic | Renders as `em` | Use for subtle emphasis |
| Code | Rich text code mark | Renders as `code` | Use for inline technical terms |
| Embedded image | Rich text embedded asset | Renders with article image styling | Use supporting images, not hero replacements |
| Embedded file | Rich text embedded asset | Renders as file link | Use when attachments belong in article body |

### Editorial rules

- Use the article `Title` field for the page title.
- Do not intentionally use Heading 1 inside the rich text body.
- Start article body sections with Heading 2.
- Use Heading 3 for subsections under Heading 2.
- Keep paragraphs short enough for web reading.
- Use lists for steps, comparisons, or grouped ideas.
- Use blockquotes for emphasis, not regular body copy.
- Use descriptive link text instead of "click here."
- Use embedded images only when they support the article body.
- Use the Hero Image field for the main article image.
- Avoid placing the same image in both the Hero Image field and the body.

### Contentful Rich Text authoring notes

- Do not paste Markdown heading syntax like `### Heading` into the Rich Text body.
- Use Contentful heading controls instead.
- Use Heading 2 for main sections and Heading 3 for course or certification subsections.
- Do not paste raw certificate URLs into body copy.
- Use descriptive link text such as `View certificate`.
- Long URLs should be stored as hyperlinks, not visible paragraph text.

### Pre-publish QA checklist

- [ ] Article has a clear title.
- [ ] Excerpt summarizes the article in one or two sentences.
- [ ] Published date is present.
- [ ] Updated date is present when the article has been revised.
- [ ] Hero image is present when the article needs visual framing.
- [ ] Body does not rely on Heading 1.
- [ ] Headings follow a logical order.
- [ ] Paragraphs are readable and not overly long.
- [ ] Lists render correctly.
- [ ] Blockquotes render correctly if used.
- [ ] Links use descriptive text.
- [ ] External links have been checked manually.
- [ ] Embedded images render correctly.
- [ ] Embedded files render as links.
- [ ] Article has been reviewed on mobile, tablet, and desktop.

### Developer notes

The article body is rendered through the custom `RichTextRenderer`.

Current renderer behavior:

- Invalid or missing rich text returns `null`.
- Rich text Heading 1 renders as `h2` to preserve article page hierarchy.
- External `http(s)` and protocol-relative links open in a new tab with safe `rel` attributes.
- Internal links open in the same tab.
- Embedded image assets render with `.embedded-asset`.
- Non-image embedded assets render as file links.
- Entry hyperlinks currently preserve child text only.
- Inline embedded entries currently preserve child content only.

Future routing work may add support for entry hyperlinks once article/project route contracts are finalized.
