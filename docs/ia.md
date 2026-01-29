# Information Architecture

Below is a **senior-level Information Architecture + UI mapping spec** for your current Contentful models (including the refined `article` + upgraded `projectLink`). This is written to become the backbone context for a future `design-system.md`, so the path from **content → components → layouts → pages** stays visible and repeatable.

---

## Information Architecture for `gilbertoharo.com` Content Models

## 1) Architecture goals and principles

### Primary goals

* Model a **single-page landing** (`pagePersonalLanding`) composed of modular sections.
* Support **deep-dive writing pages** (`article`) that can be referenced across the site (“Read more about this project/me/etc.”).
* Keep CMS content **layout-agnostic** (the UI owns layout), but keep content **editor-friendly** (clear field naming, predictable types, safe validations).

### Principles

* **References over URLs for internal navigation**
  Use `projectLink.article` for internal links. Keep `projectLink.url` for external destinations.
* **Stable routing contract**
  The CMS provides `slug`; the UI constructs the route:

  * Landing page uses `pagePersonalLanding.slug` (`/`)
  * Articles use `/articles/:slug` (recommended) or another consistent prefix.
* **SEO is a first-class concern**
  Every routable page should support:

  * `metaTitle` / `metaDescription` overrides
  * `canonicalUrl` override (rare but critical)
* **Rich Text is powerful—guard it**
  Rich text is the authoring surface; constrain it so your UI doesn’t need to handle “anything goes.”

---

## 2) System map: entities and relationships

### Top-level site structure

* **`pagePersonalLanding`** (1 entry, slug `/`)
  → ordered `sections[]` referencing one of:

  * `sectionHero`
  * `sectionTimeline`
  * `sectionSkills`
  * `sectionProjects`
  * `sectionLearning`
  * `sectionContact`

### Shared/supporting entities

* **`timelineItem[]`** referenced by `sectionTimeline.items[]`
* **`skillGroup[]`** referenced by `sectionSkills.groups[]`

  * each `skillGroup.skills[]` → `skill[]`
* **`project[]`** referenced by `sectionProjects.projects[]`

  * each `project.links[]` → `projectLink[]`

    * each `projectLink` resolves to either:

      * external `url`, OR
      * internal `article` reference (preferred)
* **`learningItem[]`** referenced by `sectionLearning.items[]`
* **`socialLink[]`** referenced by `sectionContact.links[]`
* **`article`** is routable content; can be referenced from `projectLink.article`

  * optional `article.author` → `personProfile`
* **`navigationMenu`** is a single root for the global header:

  * `links[]` → `navLink[]`
  * `ctaLink` → `navLink`
  * `navLink.panel` → `navPanel` (optional)
  * `navPanel.cards[]` → `navCard[]`

---

## 3) Content type specifications (fields, validations, usage)

Below, “UI notes” describe recommended component responsibilities and how the field should be used in UI patterns.

---

### A) `personProfile`

Core identity record (reusable across Hero/About, authoring, metadata).

| Field      | Type       | Req | Validations            | UI notes                                     |
| ---------- | ---------- | --: | ---------------------- | -------------------------------------------- |
| `name`     | Symbol     |   ✅ | —                      | Display name, also used in author schema.    |
| `title`    | Symbol     |   ✅ | —                      | Primary role/title line.                     |
| `shortBio` | Text       |   — | —                      | Small summary; ideal for hero or author bio. |
| `location` | Symbol     |   — | —                      | Optional.                                    |
| `avatar`   | Asset link |   — | image-only recommended | Use for profile/avatar component.            |

---

### B) `socialLink`

Normalized external links (LinkedIn/GitHub/email/etc.).

| Field   | Type   | Req | Validations | UI notes                                     |
| ------- | ------ | --: | ----------- | -------------------------------------------- |
| `label` | Symbol |   ✅ | —           | Button/link label.                           |
| `url`   | Symbol |   ✅ | —           | Fully qualified URL or `mailto:`.            |
| `kind`  | Symbol |   — | enum        | Use for icon selection + analytics grouping. |

---

### C) `pagePersonalLanding`

The root page entry for `/`.

| Field             | Type       | Req | Validations              | UI notes                              |
| ----------------- | ---------- | --: | ------------------------ | ------------------------------------- |
| `internalName`    | Symbol     |   ✅ | —                        | Editor-only.                          |
| `slug`            | Symbol     |   ✅ | must start with `/`      | Should be `/` for canonical landing.  |
| `metaTitle`       | Symbol     |   ✅ | —                        | `<title>` for landing.                |
| `metaDescription` | Text       |   — | —                        | `<meta name="description">`.          |
| `sections[]`      | Entry refs |   ✅ | restricted section types | Drives rendering order + nav anchors. |

**UI contract**

* Render a `SectionRenderer` that iterates `sections[]`.
* Use each section’s `anchorId` to create in-page nav.

---

## Section types (shared conventions)

Each section includes:

* `internalName` (editor label)
* `anchorId` (in-page id)
* `title` (section heading)

You should treat sections as **content modules** and render them through a stable `SectionShell` component.

---

### D) `sectionHero`

Top-of-page narrative + primary CTAs.

| Field                  | Type     | Req | Notes                                          |
| ---------------------- | -------- | --: | ---------------------------------------------- |
| `internalName`         | Symbol   |   ✅ | Editor label.                                  |
| `anchorId`             | Symbol   |   ✅ | Use for skip links / nav.                      |
| `title`                | Symbol   |   ✅ | Section heading or H1 variant depending on UI. |
| `eyebrow`              | Symbol   |   — | Optional micro-copy.                           |
| `tagline`              | Text     |   ✅ | Prominent value statement.                     |
| `intro`                | Text     |   ✅ | Supporting paragraph.                          |
| `primaryActionLabel`   | Symbol   |   — | CTA label.                                     |
| `primaryActionHref`    | Symbol   |   — | Link URL (could be internal or external).      |
| `secondaryActionLabel` | Symbol   |   — | Secondary CTA label.                           |
| `secondaryActionHref`  | Symbol   |   — | Secondary CTA URL.                             |
| `highlights[]`         | Symbol[] |   — | Bullets (impact, tools, outcomes).             |

**UI notes**

* Consider `primaryActionHref` pointing to an article route (`/articles/...`) or an anchor (`#projects`).
* Later improvement: allow `primaryActionArticle` reference, but not required now.

---

### E) `sectionTimeline` + `timelineItem`

Experience progression.

`sectionTimeline.items[] → timelineItem[]`

**timelineItem fields**

* `kind` enum: `role` | `education` | `milestone`
* `title` required
* `organization`, `location` optional
* `startDate` required, `endDate` optional
* `summary`, `highlights[]`, `tags[]`

**UI notes**

* Keep date formatting in UI. Store raw strings as you do now.
* If you later want sorting or timeline filtering, consider promoting dates to `Date` types.

---

### F) `sectionSkills` + `skillGroup` + `skill`

Skills inventory grouped by category.

`sectionSkills.groups[] → skillGroup[] → skills[] → skill[]`

**skill fields**

* `name` required
* `level` enum: `working` | `strong` | `expert`
* `keywords[]` optional

**UI notes**

* Render groups as cards/columns.
* Render skills as “chips” or list items with a level indicator.

---

### G) `sectionProjects` + `project` + `projectLink`

Project portfolio and CTAs.

`sectionProjects.projects[] → project[] → links[] → projectLink[]`

**project fields**

* `name` required
* `tagline`, `summary`, `role`, `period` optional
* `techStack[]` optional
* `links[]` (projectLink refs)

#### `projectLink` (refined)

Supports **external URLs** and **internal article references**.

| Field            | Type      | Req | Notes                                             |
| ---------------- | --------- | --: | ------------------------------------------------- |
| `label`          | Symbol    |   ✅ | CTA label: “Read more”, “Code”, “Demo”…           |
| `url`            | Symbol    |   — | External or fallback link.                        |
| `kind`           | Symbol    |   — | enum: code/demo/case-study/article/other          |
| `article`        | Entry ref |   — | **Restricted to `article`** for internal routing. |
| `analyticsLabel` | Symbol    |   — | Tracking key; defaults to label if empty.         |

**UI resolution rule (must be implemented)**

* If `projectLink.article` exists → build internal href from `article.slug`
* Else → use `projectLink.url`

This keeps old external links working and enables clean internal links going forward.

---

### H) `sectionLearning` + `learningItem`

Now/next learning tracks.

**learningItem fields**

* `topic` required
* `description` optional
* `status` enum: exploring/practicing/shipping
* `linkLabel`, `linkUrl` optional

**UI notes**

* Treat `status` as a badge.
* If `linkUrl` exists, render as inline CTA.

---

### I) `sectionContact`

Contact CTA and social links.

* `email` required (display + mailto)
* `links[] → socialLink[]`

**UI notes**

* Render as a clean CTA block with primary contact + icons.

---

## J) `article` (new, refined)

Routable long-form content pages with SEO + author + attachments.

| Field             | Type       | Req | Validations                                              | UI notes                                              |
| ----------------- | ---------- | --: | -------------------------------------------------------- | ----------------------------------------------------- |
| `internalName`    | Symbol     |   ✅ | —                                                        | Editor label.                                         |
| `slug`            | Symbol     |   ✅ | unique + kebab-case                                      | Route key: `/articles/:slug`.                         |
| `title`           | Symbol     |   ✅ | —                                                        | H1 + default meta title fallback.                     |
| `excerpt`         | Text       |   — | max 300 recommended                                      | Card snippet + meta description fallback.             |
| `author`          | Entry ref  |   — | personProfile only                                       | Use for author byline + structured data later.        |
| `publishedAt`     | Date       |   — | —                                                        | Sorting + “Published” line.                           |
| `updatedAt`       | Date       |   — | —                                                        | Optional “Updated” line.                              |
| `body`            | RichText   |   ✅ | restricted marks/nodes + entry-hyperlink to article only | Render via rich text renderer with semantic headings. |
| `heroImage`       | Asset ref  |   — | image-only recommended                                   | Responsive hero media.                                |
| `attachments[]`   | Asset refs |   — | —                                                        | Render as gallery/list.                               |
| `metaTitle`       | Symbol     |   — | max ~60 recommended                                      | Overrides `<title>`.                                  |
| `metaDescription` | Text       |   — | max ~160 recommended                                     | Overrides meta description.                           |
| `canonicalUrl`    | Symbol     |   — | —                                                        | Override canonical when needed.                       |

**SEO fallback logic (UI)**

* `metaTitle ?? title`
* `metaDescription ?? excerpt ?? firstTextFromBody`
* `canonicalUrl ?? absoluteUrl("/articles/" + slug)`

**Editorial rule**

* Treat `slug` as immutable post-publish.

---

## K) `navigationMenu` + `navLink` + `navPanel` + `navCard`

Global navigation configuration (desktop header + mobile drawer).

**navigationMenu fields**

| Field                | Type       | Req | Notes                                         |
| -------------------- | ---------- | --: | --------------------------------------------- |
| `internalName`       | Symbol     |   ✅ | Editor label.                                 |
| `brandLabel`         | Symbol     |   ✅ | Brand text in header.                         |
| `brandHref`          | Symbol     |   ✅ | Must start with `https://` or `/`.            |
| `links[]`            | Entry refs |   ✅ | Ordered top-level nav items (`navLink`).      |
| `ctaLink`            | Entry ref  |   ✅ | Required CTA (`navLink`).                     |
| `mobileBreakpointPx` | Number     |   — | Optional breakpoint; UI clamps to sane min.   |

**navLink fields**

| Field            | Type    | Req | Notes                                                              |
| ---------------- | ------- | --: | ------------------------------------------------------------------ |
| `label`          | Symbol  |   ✅ | Top-level label.                                                   |
| `href`           | Symbol  |   ✅ | Must start with `https://` or `/`.                                 |
| `order`          | Number  |   ✅ | Display order.                                                     |
| `isCta`          | Boolean |   — | CTA styling hint.                                                  |
| `isExternal`     | Boolean |   — | Forces external behavior if set.                                   |
| `mobileBehavior` | Enum    |   — | `link` \| `drawerAccordion`; UI defaults to accordion when panel.  |
| `panel`          | Ref     |   — | Optional `navPanel` for dropdown/accordion content.                |

**navPanel fields**

| Field               | Type    | Req | Notes                                           |
| ------------------- | ------- | --: | ----------------------------------------------- |
| `internalName`      | Symbol  |   ✅ | Editor label.                                   |
| `cards[]`           | Refs    |   ✅ | Ordered `navCard[]`.                            |
| `align`             | Enum    |   — | `center` \| `left` (default `center`).          |
| `widthPx`           | Number  |   — | Optional desktop width.                         |
| `mobileVariant`     | Enum    |   — | `dropdown` \| `accordionList` (UI honors).      |
| `defaultOpenMobile` | Boolean |   — | Accordion open by default in drawer.            |

**navCard fields**

| Field         | Type    | Req | Notes                                                       |
| ------------- | ------- | --: | ----------------------------------------------------------- |
| `title`       | Symbol  |   ✅ | Card title.                                                 |
| `description` | Text    |   — | Short description.                                          |
| `href`        | Symbol  |   ✅ | Must start with `https://` or `/`.                          |
| `order`       | Number  |   ✅ | Display order.                                              |
| `status`      | Enum    |   — | `default` \| `activeDefault` \| `comingSoon` (default).     |
| `iconType`    | Enum    |   — | `emoji` \| `svg` \| `asset`.                                |
| `iconValue`   | Symbol  |   — | Emoji or named SVG key.                                     |
| `iconAsset`   | Asset   |   — | Used when `iconType` is `asset`.                            |

**UI mapping notes**

* Sort `navLink` and `navCard` by `order` for display.
* Desktop: render dropdown mega menu when `navLink.panel` exists; respect `align` and `widthPx`.
* Mobile: render drawer; use `mobileBehavior` (`link` vs `drawerAccordion`) and `mobileVariant` to decide interaction.
* If `isExternal` is true, open in a new tab and show external affordances as needed.
* Icon rendering: `emoji`/`svg` uses `iconValue`; `asset` uses `iconAsset` URL.

---

# 4) UI mapping: from content to components

## A) Page templates

### `LandingPage` (slug `/`)

* Fetch the single `pagePersonalLanding` entry
* Render `sections[]` in order:

  * each section → dedicated component (see below)
* Build in-page nav from section `anchorId` + `title`

### `ArticlePage` (`/articles/:slug`)

* Query `article` by `slug`
* Render:

  * header (title, excerpt, byline, dates)
  * hero image (optional)
  * rich text body
  * attachments (optional)
* Apply SEO metadata

---

## B) Section components (content-driven)

Recommended mapping:

* `sectionHero` → `HeroSection`
* `sectionTimeline` → `TimelineSection`
* `sectionSkills` → `SkillsSection`
* `sectionProjects` → `ProjectsSection`
* `sectionLearning` → `LearningSection`
* `sectionContact` → `ContactSection`

Each section component should be wrapped by a shared layout primitive:

* `SectionShell`

  * handles anchor id, section spacing, title rendering
  * consistent width rules + background treatments

---

## C) Component patterns (design-system candidates)

### Foundational primitives

* `Container` (max width + padding)
* `Stack` (vertical spacing)
* `Grid` (responsive columns)
* `Text`, `Heading`
* `Link`, `Button`
* `Card`
* `Badge` (for status/level/tags)
* `Avatar`
* `Media` (image handling)
* `Icon`

### Content patterns

* `ProjectCard` (maps `project`)
* `ProjectLinks` (maps `projectLink[]` with resolution logic)
* `TimelineList` / `TimelineItem`
* `SkillGroupCard` + `SkillChip`
* `LearningItemRow`
* `ArticleHeader`, `ArticleBody`, `AttachmentList`

### Rich Text renderer

Build a controlled renderer that maps allowed nodes to your UI primitives:

* Headings → `Heading` variants
* Paragraphs → `Text`
* Lists → `List`
* Quotes → `Blockquote`
* Embedded assets → `Media`
* Hyperlinks → `Link`

Keep this renderer in a single place; treat it as a design-system “engine.”

---

# 5) Design System build plan (practical, senior workflow)

## Step 1 — Write `design-system.md` as a living contract

Suggested outline for your `design-system.md`:

1. **Principles**

   * content-driven, layout-agnostic, accessible-first
2. **Tokens**

   * typography scale (H1–H4, body, small)
   * spacing scale
   * color palette
   * border radius + shadow
3. **Layout**

   * container widths
   * section spacing rules
   * grid breakpoints
4. **Primitives**

   * props + usage notes for each primitive
5. **Patterns**

   * Project card, timeline, skills, article template
6. **Content bindings**

   * mapping tables from content fields → component props
7. **Accessibility**

   * skip links, focus states, keyboard nav
8. **Analytics hooks**

   * use `analyticsLabel` consistently in CTA components

## Step 2 — Lock your “content adapters”

Create “adapter” functions that convert CMS shapes into UI props.
This avoids leaking Contentful quirks everywhere.

Example pattern:

* `mapProject(projectEntry) -> ProjectCardProps`
* `resolveProjectLink(linkEntry) -> { href, label, kind, analyticsLabel }`

## Step 3 — Build primitives before sections

Do not start with `HeroSection`. Start with:

* `Container`, `Stack`, `Heading`, `Text`, `Link/Button`, `Card`, `Badge`

Then patterns become easy and consistent.

## Step 4 — Treat SEO as a component system

Implement a `SeoHead` utility that accepts:

* title, description, canonical, og image (optional)
  and use it on:
* Landing page
* Article page

## Step 5 — Editorial guidelines (ship with the system)

Add a `docs/editorial-guidelines.md` later:

* how to write headings in rich text
* how to write excerpts
* slug conventions
* when to use `projectLink.article` vs `projectLink.url`

---

# 6) Frontend recommended folder structure

This structure supports your UI-first flow, and clean separation between:

* design system primitives
* content sections
* CMS querying + mapping

```txt
src/
  pages/
    index.tsx                  # LandingPage
    articles/
      [slug].tsx               # ArticlePage (framework-dependent)

  data/
    types/
      contentful.ts            # Generated or hand-written types
      ui.ts                    # UI prop types
    adapters/
      article.ts               # mapArticle(), meta fallbacks
      project.ts               # mapProject(), resolveProjectLink()
      sections.ts              # mapSection() helpers

  lib/
    contentful/
      client.ts                # Contentful client config
      queries.ts               # Query strings / GraphQL fragments
      fetch.ts                 # fetchLandingPage(), fetchArticleBySlug()
      preview.ts               # preview toggles (optional)

  components/
    ui/                        # Design system primitives
      Container.tsx
      Stack.tsx
      Grid.tsx
      Text.tsx
      Heading.tsx
      Button.tsx
      Link.tsx
      Card.tsx
      Badge.tsx
      Avatar.tsx
      Media.tsx

    rich-text/
      RichTextRenderer.tsx     # Controlled renderer mapping nodes -> ui/

    layout/
      Page.tsx                 # App shell
      Header.tsx               # Sticky nav + skip link
      Footer.tsx
      SeoHead.tsx              # metaTitle/metaDescription/canonical

    sections/
      SectionRenderer.tsx      # Switch on section content type id
      SectionShell.tsx
      HeroSection.tsx
      TimelineSection.tsx
      SkillsSection.tsx
      ProjectsSection.tsx
      LearningSection.tsx
      ContactSection.tsx

    patterns/
      ProjectCard.tsx
      ProjectLinks.tsx
      TimelineList.tsx
      SkillGroupCard.tsx
      ArticleHeader.tsx
      AttachmentList.tsx

  styles/
    tokens.css                 # design tokens
    layout.css                 # global layout rules
    components.css             # optional
```

**Why this structure works**

* `components/ui` becomes your real design system.
* `data/adapters` isolates CMS changes from UI changes.
* `components/sections` stays stable because it depends on adapter outputs, not raw CMS entries.
* `components/rich-text` becomes the one place you handle content complexity.

---

# 7) Notes, tips, and gotchas (senior CMS engineer feedback)

### “Either `url` or `article`” cannot be enforced in the CMS

Contentful validations can’t enforce mutual exclusivity across fields.
Enforce it at:

* UI layer (render + link resolution)
* editorial guidance (docs + examples)
* optional build-time validation script (recommended later)

### Rich text guardrails are only half the job

The other half is your renderer:

* map allowed nodes to consistent components
* deny unknown nodes defensively (fail gracefully)

### Don’t leak routes into content

Keep the prefix (`/articles/`) in code, not in Contentful fields.
Content should provide `slug` only.

### Start with one canonical environment

Model import + content creation can drift quickly across environments.
Pick:

* `dev` for experiments
* `prod` (or `master`) for stable content

---

If you want, I can also generate:

* `docs/editorial-guidelines.md` (for writing/SEO and link rules)
* a `SectionRenderer` switch map based on your section IDs
* TypeScript interfaces for every content type + adapter signatures (UI prop shapes)
