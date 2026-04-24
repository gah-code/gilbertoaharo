# Security Policy

## Reporting a Vulnerability

Do not open public issues for suspected vulnerabilities.

Use GitHub private vulnerability reporting for this repository:

- <https://github.com/gah-code/gilbertoaharo/security/advisories/new>

Include:

- vulnerability description
- affected area/files
- reproduction details
- impact assessment
- suggested remediation (if available)

## Scope

This policy covers:

- application/runtime code in this repository
- dependency vulnerabilities we can patch in this repository
- configuration hygiene related to Contentful/GitHub client-side integration

## Security Baselines

- Never commit secrets or real env values.
- Keep `.env.local` and runtime secrets out of git.
- Treat `VITE_*` variables as client-exposed runtime config.
- Do not treat `VITE_GITHUB_TOKEN` as a secure private token channel.
- Use server-side proxy patterns for future sensitive/private access use cases.

## Disclosure Handling

- Reports are triaged privately.
- Confirmed issues are patched and released as quickly as practical.
- Public disclosure follows after a fix is available.
