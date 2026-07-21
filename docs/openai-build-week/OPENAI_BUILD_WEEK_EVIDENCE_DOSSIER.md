# NANOKAT Forge — OpenAI Build Week Evidence Dossier

**Project:** NANOKAT Forge  
**Developer:** Kumori / NANOKAT  
**Primary repository:** `~/hack/nk-forge`  
**Project start:** July 19, 2026

## Purpose

This dossier summarizes the available NANOKAT project conversations and artifacts that show how GPT-5.6 in ChatGPT and Codex materially contributed to the project.

It is a curated evidence record, not a raw export of every transcript. Preserve screenshots, Git history, Codex session identifiers, deployment records, and test outputs separately.

## Accurate responsibility split

### GPT-5.6 / ChatGPT

GPT-5.6 served as the project’s:

- architecture and orchestration layer;
- product-definition and continuity partner;
- safety and permission-boundary reviewer;
- implementation-handoff author;
- deployment and debugging guide;
- evaluator of product drift;
- evaluation and submission strategist.

The project conversations show GPT-5.6:

- scoping NANOKAT Forge as a focused hackathon vertical slice;
- designing the Alibaba Function Compute backend and Qwen integration;
- defining `/health`, `/api/plan`, approval, validation, and preview behavior;
- diagnosing startup, static-asset, custom-domain, and TLS problems;
- identifying that the project had drifted into a linear website-prompt engine;
- redesigning it as an all-Qwen Mission Society;
- defining dynamic agent selection, disagreement, cross-examination, scenario analysis, granular approval, signed mission envelopes, allowlisted tools, validation, and one bounded repair attempt;
- producing detailed Codex implementation handoffs;
- producing `QWEN_NANOKAT_MISSION_SOCIETY_MASTER_HANDOFF.md`;
- planning the OpenAI Build Week evidence, README wording, and demo narrative.

### Codex

Codex contributed when usage was available through:

- repository inspection;
- implementation and refactoring;
- test execution and verification;
- handoff-driven changes;
- recovery and sandbox guidance.

Do not exaggerate this role. The accurate statement is:

> Codex contributed repository implementation and verification when usage was available. GPT-5.6 supplied the architecture, orchestration, safety model, handoffs, debugging guidance, and continuity.

### Qwen

Qwen is the deployed runtime engine for:

- mission classification;
- specialist roles;
- parallel analysis;
- disagreement and rebuttal;
- synthesis;
- scenario generation;
- artifact generation;
- validation interpretation;
- bounded repair.

The submission must say this plainly rather than implying OpenAI powers the deployed inference path.

## Dated development evidence

### July 5, 2026 — NANOKAT recovery and source-of-truth planning

Earlier project conversations established:

- GitHub as source of truth;
- recoverability before feature expansion;
- secrets excluded from Git and chat;
- doctor/test/smoke gates before deployment;
- scoped tools and read-only defaults;
- handoffs for implementation agents;
- avoiding new infrastructure before stabilizing the baseline.

Relevant artifacts include:

- `codex_nanokat_recovery_prompt.md`
- `claude_nanokat_project_context.md`
- `docs/runbooks/codex-reset-posture-and-mcp-status.md`
- agent-routing and hardened-sandbox guidance

### July 8, 2026 — Codex workflow and local MCP discipline

Project conversations established:

- local Codex/CLI as an implementation surface;
- `AGENTS.md` and handoffs as repository-scoped instructions;
- reusable skills to reduce repeated context;
- MCP as the external-tool boundary;
- preservation of the host-local MCP/Ollama recovery baseline;
- separation of protected recovery work from active repositories.

### July 18, 2026 — Hackathon positioning

NANOKAT Forge was framed as an experimental AI ecosystem and prepared as a focused submission rather than a dump of the full NANOKAT platform.

### July 19, 2026 — Forge implementation begins

GPT-5.6 scoped and guided:

- the Function Compute backend;
- Model Studio/Qwen integration;
- the public-safe repository strategy;
- human approval and validation;
- a concise demo path.

The working backend used:

- `server.mjs`
- `GET /health`
- `POST /api/plan`
- `qwen3.7-plus`
- `DASHSCOPE_API_KEY`
- `DASHSCOPE_BASE_URL`
- `DEMO_SHARED_SECRET`

Project milestones recorded in conversation include:

- `/health` returning HTTP 200;
- Function Compute starting with `node server.mjs`;
- Qwen plan generation succeeding;
- static frontend files being added;
- a custom domain and HTTPS being configured;
- exposed credentials being rotated;
- Git and TruffleHog checks being run.

### July 19–20, 2026 — Product drift correction

The initial flow had become:

```text
brief → one Qwen plan → approval → preview builder → website mockup
```

GPT-5.6 identified that this no longer demonstrated a credible Agent Society or Autopilot Agent.

The corrected design became:

```text
mission intake
→ Navigator classification
→ prompt-specific specialist selection
→ parallel analysis
→ evidence separation
→ disagreement detection
→ cross-examination
→ scenario analysis
→ Council Chair resolution
→ granular human approval
→ signed mission envelope
→ allowlisted execution
→ deterministic validation
→ one bounded repair attempt
→ recoverable mission package
```

The major supporting artifact is:

- `QWEN_NANOKAT_MISSION_SOCIETY_MASTER_HANDOFF.md`

It contains the all-Qwen architecture, agent roles, self-naming process, security boundaries, fixtures, implementation order, tests, and deployment flow.

### July 20, 2026 — OpenAI Build Week pivot

After the Qwen submission deadline was missed, GPT-5.6 helped reposition the project for OpenAI Build Week and clarified the truthful narrative:

- the project began during the event period;
- GPT-5.6 materially designed and orchestrated it;
- Codex materially contributed when available;
- Qwen may remain the deployed runtime;
- the README and video must explain the division honestly;
- evidence should include Git history, handoffs, screenshots, test results, and a Codex session identifier.

## Major GPT-5.6 architectural contributions

### Mission Society

GPT-5.6 designed a system that identifies the user’s actual objective before choosing an artifact.

Potential outcomes include:

- campaign strategy;
- research brief;
- workflow design;
- data analysis;
- résumé or portfolio;
- flyer or event page;
- business process recommendations;
- website preview.

A website is one possible artifact, not the product itself.

### Agent roles

The planned all-Qwen society includes:

- Navigator
- Researcher
- Domain Analyst
- Human-Factors Analyst
- Opportunity Strategist
- Skeptical Analyst
- Forecaster
- Stakeholder Simulator
- Ethics and Compliance Analyst
- Systems Analyst
- Creative Director
- Council Chair
- Validator
- Repair Agent

Agents may choose display names and personalities, but role IDs and permissions remain immutable.

### Approval and security

The project requires:

- individual action approval;
- signed, expiring mission envelopes;
- allowlisted tools;
- no arbitrary shell execution;
- no DNS or deployment mutation;
- no secret access;
- no purchasing or outreach;
- explicit non-actions;
- clear separation of evidence, inference, and prediction.

### Validation and repair

Deterministic checks precede model judgment.

Checks include:

- valid schemas;
- bounded outputs;
- no secret-like strings;
- no fabricated citations;
- no unsupported research claims;
- no unapproved actions;
- no production-change claims;
- accessibility basics;
- complete execution traces.

The Repair Agent receives only the approved plan, failed output, and failed checks. It gets one attempt.

## Evidence artifacts to include

Recommended public-safe artifacts:

- `docs/openai-build-week/GPT56_CONTRIBUTION.md`
- `docs/openai-build-week/OPENAI_BUILD_WEEK_EVIDENCE_DOSSIER.md`
- `docs/handoffs/CODEX_MISSION_SOCIETY_RUNTIME.md`
- `QWEN_NANOKAT_MISSION_SOCIETY_MASTER_HANDOFF.md`
- relevant public-safe security and routing documents
- dated Git history
- exact test results
- the primary Codex session ID
- screenshots of GPT-5.6 planning and review work
- deployment screenshots with secrets hidden

Do not commit unrelated client data, raw private chats, credentials, or protected recovery materials.

## Recommended Devpost wording

> GPT-5.6 served as NANOKAT Forge’s architecture, orchestration, security-review, evaluation, and continuity layer. It scoped the product, designed the agent-society workflow, defined approval and validation boundaries, produced implementation handoffs, guided deployment and debugging, and identified a major product drift in which the project had collapsed into a linear website-prompt generator.
>
> Codex was used for repository implementation, inspection, refactoring, and verification whenever usage was available.
>
> The deployed runtime uses Qwen through Alibaba Model Studio. GPT-5.6 and Codex were used meaningfully to design and build the submitted product, while Qwen performs the deployed runtime inference.

## Recommended video wording

> I built NANOKAT Forge with GPT-5.6 and Codex. GPT-5.6 acted as the architecture and orchestration layer: it designed the agent society, approval model, validation loop, and recovery boundaries, and it caught a major drift toward a simplistic website generator. Codex contributed repository implementation and verification when usage was available. The deployed runtime uses Qwen, and that provider split is disclosed directly.

## Evidence still needed

### Git

```bash
cd ~/hack/nk-forge
git log --date=iso --pretty='format:%h | %ad | %an | %s'
git status --short
git remote -v
```

### Codex

Preserve:

- primary session ID;
- `/feedback` or equivalent session metadata;
- screenshots of repository work;
- exact test commands and results.

### GPT-5.6

Capture screenshots or exports showing:

- initial scoping;
- Function Compute architecture;
- approval and safety design;
- product-drift diagnosis;
- Mission Society redesign;
- Codex handoff generation;
- OpenAI Build Week pivot;
- evidence planning.

Ensure screenshots contain no secrets.

## Claims to avoid

Do not claim:

- GPT-5.6 is the runtime when it is not;
- Codex implemented every change;
- live research exists without retrieved sources;
- predictions are validated if they are scenario estimates;
- external actions were taken when only plans or artifacts were produced;
- the full NANOKAT platform was created during Build Week;
- OpenAI API credits were granted if they were not.

## Submission checklist

- [ ] Public repository available
- [ ] README explains GPT-5.6, Codex, and Qwen responsibilities
- [ ] Codex session ID included
- [ ] Git timestamps preserved
- [ ] GPT-5.6 evidence screenshots captured
- [ ] Secrets absent from Git and screenshots
- [ ] Public demo works
- [ ] Narrated video is under three minutes
- [ ] Agent disagreement is visible
- [ ] Granular approval is visible
- [ ] Validation and bounded repair are visible
- [ ] Runtime provider is disclosed accurately
- [ ] Project start date is accurate
- [ ] Submission completed before the deadline

## One-paragraph evidence statement

> NANOKAT Forge was created during OpenAI Build Week through a combined workflow in which GPT-5.6 provided architecture, orchestration, security review, product correction, implementation handoffs, debugging guidance, and submission planning; Codex contributed repository implementation and verification when available; and Qwen powers the deployed runtime. Git history, GPT-5.6 project conversations, Codex session evidence, the master Mission Society handoff, deployment records, and the narrated demo document that contribution without misrepresenting the runtime provider.
