# Contributing

Thanks for your interest in contributing to this project!

## Code of Conduct

Please see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for our community standards.

## How to Contribute

### Reporting Issues

Found a bug or have a feature request? Please [open an issue](https://github.com/gah-code/gilbertoaharo/issues/new/choose).

**For bugs, include:**
- Clear description of the problem
- Steps to reproduce
- Expected vs. actual behavior
- Environment (Node version, browser, OS)

**For features, include:**
- Use case or motivation
- Proposed solution (if you have one)
- Alternatives you've considered

### Submitting Pull Requests

1. **Fork** the repo and create a branch from `master`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test locally:
   ```bash
   npm install
   npm run dev
   npm run lint
   npm run build
   ```

3. **Write a clear PR description:**
   - Explain what problem this solves
   - Reference any related issues (#123)
   - Describe testing done

4. **Keep commits atomic** — one logical change per commit

5. **Follow the code style:**
   - Run `npm run lint` and fix any issues
   - Use TypeScript with strict mode
   - Format with Prettier (run `npm run format`)

### Development Setup

```bash
# Install dependencies
npm install

# Create .env.local from .env.example
cp .env.example .env.local

# Get Contentful credentials and add to .env.local
# https://app.contentful.com/spaces/YOUR-SPACE/api/keys

# Start dev server
npm run dev
```

See [README.md](README.md) for full setup instructions.

## Project Structure

- `src/pages/` — Route-level views
- `src/router/` — Lightweight SPA routing
- `src/content/` — CMS boundary (adapters, API, fixtures)
- `src/components/sections/` — Page sections
- `src/components/ui/` — Reusable primitives
- `src/styles/` — Design tokens and base styles
- `docs/` — Architecture and design system docs

## Code Standards

### TypeScript
- Use strict mode (`strict: true` in tsconfig.json)
- Explicit types for function parameters and return values
- Avoid `any` type

### React
- Functional components with hooks
- Keep components small and focused
- Use `@` alias for imports: `import { Button } from '@/components/ui'`

### Styling
- Use CSS custom properties (design tokens) from `src/styles/tokens.css`
- Keep component styles in `src/components/**/*.tsx` (scoped classNames)
- Global styles in `src/styles/`

### Accessibility
- Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- ARIA labels where needed
- Focus states for interactive elements
- Alt text for images

## Content & CMS

This project uses **Contentful** for content management.

**Important:** All CMS data flows through `src/content/` adapters. Never use raw Contentful responses in components—always map through adapters first.

See `docs/cms-advanced.md` for content modeling guidelines.

## Testing & Quality

```bash
# Lint
npm run lint

# Type check
npm run typecheck

# Build
npm run build

# Preview production build
npm run preview
```

All PRs must pass linting and type checking.

## Documentation

- Update `docs/` if you change architecture
- Add inline comments for complex logic
- Update README.md if behavior changes

## Questions?

Open an issue or reach out in the discussion section. We're here to help!

---

**Thank you for contributing!** 🎉
