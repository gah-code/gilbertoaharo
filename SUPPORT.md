# Support

## Getting Help

If you have questions or need support, here are the best ways to reach out:

### Issues & Discussions

- **Bug reports:** [Open an issue](https://github.com/gah-code/gilbertoaharo/issues/new?template=bug.md)
- **Feature requests:** [Open an issue](https://github.com/gah-code/gilbertoaharo/issues/new?template=feature.md)
- **Questions:** Use [GitHub Discussions](https://github.com/gah-code/gilbertoaharo/discussions) (coming soon)

### Documentation

Check these resources first:
- [README.md](README.md) — Project overview and setup
- [docs/design-system.md](docs/design-system.md) — Design tokens and patterns
- [docs/cms-advanced.md](docs/cms-advanced.md) — Contentful integration
- [CONTRIBUTING.md](CONTRIBUTING.md) — Development guide

### Security Issues

For security vulnerabilities, see [SECURITY.md](SECURITY.md) — do not open public issues.

## Common Issues

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Dev Server Won't Start

```bash
# Check Node version (need 20.19+)
node --version

# Kill any existing processes
npx lkill :5173 2>/dev/null || true

# Restart
npm run dev
```

### Contentful Connection Issues

- Verify `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_DELIVERY_TOKEN` in `.env.local`
- Check Contentful space is active
- Ensure token has "Content Delivery API" permission
- Try in incognito/private browser (clear cache)

### Styling Issues

- Clear browser cache (Cmd+Shift+Delete)
- Verify design tokens are imported: `src/styles/tokens.css`
- Check Prettier formatting: `npm run format`

## Response Times

- **Bug reports:** We aim to respond within 48 hours
- **Feature requests:** We aim to review within 1 week
- **Security issues:** We aim to respond within 24 hours

## Code of Conduct

Please see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community guidelines.

---

**Thanks for using this project!**
