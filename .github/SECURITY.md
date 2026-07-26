# Security policy — NANOKAT Forge

## Supported surfaces

| Surface | Notes |
|---|---|
| Cloud Run demo | Public UI and gated APIs; the demo token is not a production authentication system |
| This repository | Historical demo source, documentation, tests, and curated public evidence |

## Reporting a vulnerability

Use GitHub's private vulnerability-reporting or security-advisory feature for this repository when available. Otherwise, contact the repository owner through the `nanokataclysm` GitHub profile without posting sensitive details publicly.

Include:

- the affected file, API route, or demo behavior;
- the security impact;
- minimal reproduction steps using placeholders rather than live credentials;
- any recommended mitigation, when known.

Do not open a public issue containing keys, tokens, connection strings, cookies, private URLs, personal information, or private key material.

## Secrets and sensitive material

1. Never commit live `.env` files, cloud environment dumps, credentials, cookies, or private keys.
2. Demo secrets and provider credentials belong only in operator-controlled runtime configuration.
3. If a live secret enters Git history, revoke or rotate it immediately and treat the repository as affected until history and caches are reviewed.
4. Public evidence must be curated. Raw agent sessions, workstation paths, local inventories, and account-specific exports are not public evidence artifacts.
5. Cryptographic signing, if introduced, must remain server-side and use separately managed production key custody.

## Scope note

This repository is a historical public demo. It does not grant access to NANOKAT production systems, client data, DNS, cloud accounts, private repositories, or recovery materials.

## Acknowledgments

Responsible reports that help keep the demo safe and accurately documented are appreciated.
