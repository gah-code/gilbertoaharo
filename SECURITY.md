# Security Policy

## Reporting Security Vulnerabilities

**Please do not open public issues for security vulnerabilities.** 

If you discover a security vulnerability, please report it responsibly by emailing: **[maintainer email or security contact]**

Include:
- Description of the vulnerability
- Affected versions
- Steps to reproduce (if possible)
- Potential impact
- Suggested fix (if you have one)

We will:
- Acknowledge your report within 48 hours
- Investigate and validate the vulnerability
- Develop and test a fix
- Credit you in the security advisory (unless you prefer anonymity)

## Scope

This security policy covers:
- **Code vulnerabilities** in this repository
- **Dependency vulnerabilities** we can control
- **Contentful integration vulnerabilities**

## Security Best Practices

### For Users

- Keep your `.env.local` secure—never commit it
- Rotate Contentful API tokens regularly
- Use environment-specific tokens (never share prod tokens)
- Run `npm audit` periodically to check dependencies

### For Contributors

- Never commit secrets (API keys, tokens, passwords)
- Use `.env.example` with placeholder values
- Follow the CMS boundary pattern (see `docs/cms-advanced.md`)
- Assume all environment variables are potentially public
- Review `.gitignore` before committing

## Dependency Vulnerabilities

We use GitHub's [Dependabot](https://dependabot.com/) to scan for vulnerabilities in dependencies.

- Monitor [Security Advisories](https://github.com/gah-code/gilbertoaharo/security/advisories)
- Critical vulnerabilities trigger automatic security alerts
- We patch dependencies regularly

## Disclosure Timeline

When we fix a security vulnerability:
1. **Day 1:** Develop and test fix
2. **Day 2-3:** Release patched version
3. **Day 3:** Publish security advisory with credit
4. **Day 4:** Announce in releases/changelog

## Public Repositories

**Important:** This is a public repository. Assume all code, commits, and issues are visible to the world.

- Do not commit secrets
- Do not include private information
- Do not assume anything is confidential

---

**Thank you for helping keep this project secure.**
