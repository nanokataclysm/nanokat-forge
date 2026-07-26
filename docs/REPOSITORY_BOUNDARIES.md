# NANOKAT Repository Boundaries

This document is the routing policy for humans and agents working across NANOKAT repositories. Its purpose is to prevent code, evidence, credentials, client material, recovery assets, and experiments from being pushed to the wrong place.

## Core rule

Before creating or moving a file, identify its authoritative repository. When the correct destination is uncertain, stop and open a review issue or draft pull request instead of guessing.

GitHub is the source of truth for code, documentation, prompts, templates, and change history. Secrets, raw local state, and protected recovery material are never committed.

## Repository roles

| Repository | Visibility | Authoritative purpose | Must not contain |
|---|---|---|---|
| `nanokat` | Private | Active platform monorepo, client-site source, internal tooling, operational documentation, reusable systems, and integration code | Public marketing claims, raw secrets, protected recovery workspace copies, disposable agent dumps |
| `solforge` | Private until deliberately released | Active Solforge product development and future flagship public product | Client-private data, NANOKAT recovery materials, unrelated hackathon archives, unreviewed credentials or deployment state |
| `nanokat-forge` | Public | Historical Forge demo, reproducible public implementation, public-safe tests, curated hackathon evidence, and community documentation | Active production infrastructure, client work, raw chat exports, session IDs, machine inventories, local paths, credentials, recovery assets |
| `nk-cli` | Public | Standalone, reusable NANOKAT command-line tooling with its own tests and documentation | Product-specific frontend code, client sites, private orchestration state, hackathon evidence bundles |
| `aetherkin` | Private / experimental | Isolated research and experimental work that is not yet an approved NANOKAT baseline | Production claims, client delivery code, authoritative operational policy |
| `nanokat-pipeline-lab` | Private / local workflow | Pipeline experiments, recovery-safe validation, baseline tooling, and migration rehearsal before promotion | Production secrets, public marketing assets, direct copies of protected recovery material |
| `hardware-drivers` | Private / local workflow | Hardware-specific drivers, host integration, and machine-dependent support code | Product application code, client content, credentials |
| `nanokat-baselines` | Protected historical | Immutable or carefully versioned historical snapshots and comparison baselines | Active feature work, casual cleanup, rewritten history |
| `nanokat-recovery-work` | Protected local workspace | Confirmed recovery kits and host-local MCP/Ollama recovery baseline | Git vendoring, public publication, destructive normalization, unrelated product development |

The empty public repository `nk-forge` is deprecated and should be deleted. Do not recreate it. Use `nanokat-forge` for the historical public demo and `solforge` for active product work.

## Placement rules

### Put work in `nanokat` when

- it serves multiple NANOKAT products or client sites;
- it is operational platform code;
- it contains private client implementation or approved client copy;
- it defines shared internal prompts, templates, policies, adapters, or dashboards;
- it is not yet safe or useful to publish independently.

### Put work in `solforge` when

- it directly implements the active Solforge product;
- it belongs to the future public product surface rather than the historical demo;
- it can be separated cleanly from client-private and host-specific NANOKAT operations.

Do not make `solforge` public merely because a feature works. Publication requires a separate security, licensing, documentation, history, and secret-scan review.

### Put work in `nanokat-forge` when

- it is required to reproduce or understand the public Forge demo;
- it is curated evidence supporting a public claim;
- it is public-safe documentation for the historical implementation;
- it is a narrowly scoped maintenance or security correction to the archived demo.

Do not use `nanokat-forge` as the active Solforge development repository.

### Put work in `nk-cli` when

- the functionality is a reusable command-line interface;
- the package can be installed and tested independently;
- its documentation does not depend on private NANOKAT repository access.

### Put work in a lab or experimental repository when

- the approach is not yet accepted as a baseline;
- the change needs destructive or failure-prone testing;
- promotion into the active monorepo should happen only after verification.

## Never commit

The following must not enter any Git repository:

- API keys, access tokens, private keys, passwords, recovery codes, cookies, or secret values;
- `.env` files other than intentionally sanitized examples;
- raw chat exports or model transcripts containing system prompts, session IDs, local paths, tool inventories, account data, or private reasoning;
- database dumps or client data without an explicit approved sanitization process;
- screenshots or logs containing secrets, private URLs, account identifiers, or personal information;
- the contents of the protected recovery workspace;
- generated dependency trees, build caches, local virtual environments, or agent scratch state.

## Public-evidence standard

Public evidence should prove a claim with the least sensitive material necessary. Prefer:

- test summaries;
- reproducible commands with placeholders;
- screenshots reviewed for private data;
- deployment health output with account identifiers removed;
- architecture diagrams;
- short curated excerpts rather than entire transcripts.

Raw agent sessions are not evidence artifacts. They should remain local or private and should be summarized into public-safe proof.

## Agent routing protocol

Every agent handoff or implementation request must state:

1. objective;
2. authoritative repository;
3. branch;
4. allowed paths;
5. protected paths;
6. whether publication is permitted;
7. verification commands;
8. non-goals;
9. rollback path;
10. definition of done.

Agents must inspect the repository, branch, status, remotes, recent history, local instruction files, manifests, workflows, tests, deployment configuration, generated content, and protected paths before structural changes.

When a task spans repositories, use separate branches and separate pull requests. Never move unrelated changes together merely for convenience.

## Promotion path

Use this default progression:

1. Experiment in the appropriate lab or private repository.
2. Verify behavior, tests, secret scans, and rollback.
3. Promote the smallest reusable change into the authoritative repository.
4. Prepare a separate public-safe change when publication is useful.
5. Open a draft pull request and review the diff before merge.

Historical snapshots and recovery materials are not promotion sources by default. Use thin adapters and documented extraction rather than copying whole protected trees.

## Naming and branding

- **NANOKAT** is the umbrella platform and internal ecosystem.
- **Solforge** is the active product direction and intended flagship public brand.
- **NANOKAT Forge** refers to the historical public demo in `nanokat-forge`.
- **nk-cli** is the standalone open-source CLI.

Repository names with historical value should remain stable unless a migration plan includes redirects, dependency updates, documentation changes, and rollback.

## Change control

Changes to these boundaries should be proposed through a dedicated pull request. The pull request must explain:

- what source of truth is changing;
- which repositories and agents are affected;
- how existing files will be migrated;
- how accidental cross-repository pushes will be detected;
- how the change can be rolled back.
