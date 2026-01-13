# UI Design Guide

Purpose

- Central place for design decisions, UI standards, and how we build pages.

Principles

- Consistent spacing and typography through tokens.
- Prefer semantic tokens over raw values.
- Layout rhythm first, then component styling.
- Accessibility is a baseline, not an enhancement.

Design Tokens

- Source of truth: `src/styles/tokens.css`
- Categories:
  - Colors: primitives + semantic mappings
  - Typography: font families, sizes, line-height
  - Spacing: scale only (no random values)
  - Radius, shadows, motion
- Usage: use `var(--token-name)` in components.

Base Styles

- `src/styles/base.css` sets global defaults:
  - body font, colors, background, line height
  - box-sizing: border-box
  - heading and paragraph defaults
  - link and image defaults

Layout Styles

- `src/styles/layout.css` defines layout primitives and utilities:
  - container widths and page padding
  - section spacing and vertical rhythm
  - grid helpers and responsive rules

Layout Architecture

- Page shell sets max width, page padding, and vertical rhythm.
- Section shell enforces consistent section spacing.
- Avoid per-page spacing hacks.

Component Guidelines

- Use tokens for spacing/color/typography.
- If a style repeats twice, extract to UI component or shared utility.
- Keep layouts responsive by default.

Accessibility

- Color contrast meets WCAG AA.
- Focus states are visible.
- Semantic HTML first.

## TODO Workflow

### 1. Foundations

- [x] Implement color tokens in `src/styles/tokens.css`. (Added warm palette tokens, semantic mappings, and legacy aliases.)
- [x] Define typography tokens in `src/styles/tokens.css`. (Added font stacks and size scale tokens in `src/styles/tokens.css`.)
- [ ] Set up spacing scale, radius, and shadow tokens in `src/styles/tokens.css`.
- [ ] Configure layout density tokens in `src/styles/tokens.css`.

### 2. Global Layout Rules

- [ ] Apply `box-sizing: border-box` across all elements.
- [ ] Ensure full-height root setup for `html`, `body`, and `#root`.
- [x] Style body with typography and background tokens. (Updated `src/styles/base.css` to use `--color-text-primary` and `--color-bg`.)
- [ ] Define heading styles and spacing rules.
- [ ] Set content width and section spacing.
- [ ] Add section separation rules.

### 3. Accessibility and Interaction

- [ ] Implement skip link for `#main-content`.
- [ ] Style focus-visible states for `a` and `button`.
- [ ] Create sticky header with blur and gradient background.

### 4. Components

#### Header and Navigation

- [ ] Implement `.page-header` with sticky and blurred background.
- [ ] Align `.page-header-inner` with logo and navigation.
- [ ] Style `.logo` and `.page-nav`.

#### Buttons

- [ ] Define base button styles.
- [ ] Style primary and secondary buttons.

#### Pills (Badges)

- [ ] Create `.pill` styles for badges.

#### Cards

- [ ] Implement shared card styles for `.card`, `.timeline-card`, `.project-card`, and `.learning-item`.

#### Hero Section

- [ ] Implement hero section variants (`hero--typographic`, `hero--avatar`, `hero--image`).
- [ ] Style hero section elements (title, tagline, actions, highlights, avatar, image).

#### Timeline Section

- [ ] Implement timeline section structure and styles.
- [ ] Add responsive layout for timeline section.
- [ ] Plan for future CMS-controlled illustrations and CTAs.

#### Projects Section

- [ ] Create responsive grid for projects.
- [ ] Style project cards, metadata, and links.

#### Skills Section

- [x] Implement skills section grid and styles. (Rebuilt layout in `src/components/sections/SkillsSection.tsx`.)
- [x] Style skill rows, badges, and keywords. (Added row dividers, level pills, and keyword styling in `src/components/sections/SkillsSection.tsx`.)

#### Learning Section

- [ ] Create learning section grid and styles.
- [ ] Style learning items and links.

#### Contact Section

- [ ] Implement contact section layout and styles.
- [ ] Style contact intro and CTAs.

### 5. Responsive Behavior

- [ ] Define breakpoints and responsive styles for all sections.

### 6. Content and Assets

- [ ] Integrate Contentful for primary content.
- [ ] Map timeline media assets in `src/assets/timeline`.

### 7. Usage Guidelines

- [x] Use token values for spacing, type, and color. (Replaced hard-coded colors with tokens in `src/components/ui/Button.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Card.tsx`, `src/components/ui/Text.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/SkillsSection.tsx`.)
- [ ] Prefer existing component classes before adding new ones.
- [ ] Maintain consistency in card styles.
- [ ] Update media assets or mapping for new timeline items.

### Detailed TODO for "Implement color tokens in `src/styles/tokens.css`"

1. **Review Existing Tokens**:
   - Open `src/styles/tokens.css` and check for existing color tokens.
   - Ensure the file structure supports semantic and primitive tokens.

2. **Define Primitive Colors**:
   - Add base color definitions (e.g., `--color-bg`, `--color-surface`, `--color-accent`).
   - Use HEX, RGB, or HSL values for clarity.

3. **Map Semantic Tokens**:
   - Create semantic mappings for text, borders, and focus states.
   - Example: `--color-text-primary: var(--color-text)`.

4. **Ensure Consistency**:
   - Verify that all tokens follow a consistent naming convention.
   - Use comments to group related tokens (e.g., background, text, borders).

5. **Test Tokens**:
   - Apply tokens in a test component or page.
   - Check for visual consistency and accessibility (e.g., WCAG contrast).

6. **Document Tokens**:
   - Update `README-UI.md` or relevant documentation to include the new tokens.
   - Provide usage examples for developers.

## Project Details

### Overview

This project captures the current UI foundations, layout rules, and components used by the landing experience. It is derived from the code in the following files:

- `src/styles/tokens.css`
- `src/styles/layout.css`
- `src/index.css`
- Section components in `src/components/sections`

### Key Sections

#### 1. Foundations

- **Color Tokens**: Defined in `src/styles/tokens.css`.
  - Includes background, surface, accent, text, and border colors.
- **Typography Tokens**: Font families, sizes, and line heights.
- **Spacing Scale**: Based on a 4px base.
- **Radius and Shadow**: Includes small, medium, large, and pill radii.
- **Layout Density Tokens**: Content width, section padding, and vertical rhythm.

#### 2. Global Layout Rules

- Box-sizing: `border-box` applied globally.
- Full-height root setup for `html`, `body`, and `#root`.
- Body styles: Typography, background, and color tokens.
- Heading and lede spacing rules.
- Content width and section spacing.
- Section separation rules.

#### 3. Accessibility and Interaction

- Skip link for `#main-content`.
- Focus-visible styling for `a` and `button`.
- Sticky header with blur and gradient background.

#### 4. Components

- **Header and Navigation**: Sticky header, logo, and navigation styles.
- **Buttons**: Base, primary, and secondary button styles.
- **Pills (Badges)**: Small bordered badges.
- **Cards**: Shared styles for utility, timeline, project, and learning cards.
- **Hero Section**: Variants for typographic, avatar, and image layouts.
- **Timeline Section**: Structure, responsive layout, and CMS integration.
- **Projects Section**: Responsive grid and project card styles.
- **Skills Section**: Grid layout, skill rows, and badges.
- **Learning Section**: Compact grid and learning item styles.
- **Contact Section**: Layout and CTA styles.

#### 5. Responsive Behavior

- Breakpoints for mobile, tablet, and desktop layouts.
- Adjustments for padding, spacing, and layout density.

#### 6. Content and Assets

- Primary content sourced from Contentful.
- Static fallback in `src/data/page-personal-landing.ts`.
- Timeline media assets located in `src/assets/timeline`.

#### 7. Usage Guidelines

- Use token values for spacing, type, and color.
- Prefer existing component classes before adding new ones.
- Maintain consistency in card styles.
- Update media assets or mapping for new timeline items.

### References

- Tokens: `src/styles/tokens.css`
- Layout and components: `src/styles/layout.css`
- Global baseline: `src/index.css`
- Section components: `src/components/sections`
- Page layout: `src/components/layout/Page.tsx`

Notes

- Update this doc when design decisions change.
