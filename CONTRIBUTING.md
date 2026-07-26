# Contributing to NANOKAT Forge

NANOKAT Forge is a historical public demo and evidence archive. Contributions should improve reproducibility, safety, documentation, tests, or narrowly scoped maintenance without turning this repository into the active private product workspace.

## Before opening a change

- Read `README.md` and `.github/SECURITY.md`.
- Keep secrets, local paths, workstation details, account identifiers, raw agent sessions, client material, and recovery data out of Git.
- Preserve the human-approval boundary. Do not add production deployment, DNS mutation, secret access, or autonomous publishing behavior.
- Keep changes small and reversible.

## Local setup

```bash
cd apps/orchestrator
cp .env.example .env
npm install
npm test
npm start
```

Replace placeholders only in your untracked local `.env`. Never commit real credentials.

## Pull requests

A pull request should include:

- the problem being solved;
- the files and behavior changed;
- tests or checks run and their results;
- anything not tested;
- security or privacy considerations;
- a rollback path.

Use a draft pull request for incomplete or unverified work. Do not mix unrelated cleanup, policy changes, and feature work in one branch.

## Evidence and documentation

Public evidence must support a specific claim with the least sensitive material necessary. Prefer test summaries, sanitized screenshots, short logs, and reproducible commands. Do not commit raw chat exports or machine-state dumps.

## Reporting security issues

Do not disclose vulnerabilities or credentials in a public issue. Follow `.github/SECURITY.md`.
