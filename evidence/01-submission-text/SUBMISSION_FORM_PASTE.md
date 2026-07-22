# OpenAI Build Week — paste-ready fields

Copy each block into the matching form field.  
**Do not paste demo tokens, API keys, or private PEMs.**

---

## Project / product name

```
NANOKAT Forge
```

## One-line tagline / elevator pitch (short)

```
Human-gated website planning: Qwen turns a messy brief into a plan; you approve; an isolated preview renders — no silent deploys.
```

## Short description (~280–400 chars)

```
NANOKAT Forge is a human-gated website planner for small businesses. Paste a messy brief; Qwen (Alibaba Model Studio) returns a structured plan; a human must approve before an isolated HTML preview is generated. Built during OpenAI Build Week with GPT-5.6 for architecture, Codex for implementation when available, and Qwen as the live runtime on Google Cloud Run.
```

## Long description / about the project

```
NANOKAT Forge turns an unstructured small-business website brief into a structured plan and an isolated preview — with a human on the consequential step.

How it works:
1. Demo access code gates the API.
2. The user submits a free-form brief (e.g. pottery studio, four pages, warm palette).
3. Qwen (Alibaba Cloud Model Studio, model qwen-plus) returns JSON: summary, pages, palette, validation steps, and risks.
4. The human reviews and must explicitly approve.
5. A scoped builder validates constraints and returns an isolated HTML preview plus an execution trace.
6. Without approval, preview is refused (HTTP 409). Wrong token is refused (HTTP 401). No production DNS, deploys, or secret access.

OpenAI Build Week contribution split (truthful):
• GPT-5.6 (ChatGPT): architecture, product scoping, safety boundaries, handoffs, debugging guidance, evidence and submission planning.
• Codex (when available): repository implementation and verification.
• Grok: host ops, Cloud Run deploy, tests, evidence packaging.
• Qwen: live inference for plan generation (not OpenAI as the production model for this demo).

What we deliberately do not claim as shipped: multi-agent Mission Society council as the live path, or production cryptographic package signing (dev keypair + design handoff exist for the next slice).

Operator host for build/deploy: physical MacBook Pro running Ubuntu 26.04 LTS (Linux), not macOS.
```

## Demo URL / live link

```
https://nanokat-forge-z4l33yvnfq-uc.a.run.app
```

## Demo video (YouTube — paste into Devpost)

```
https://youtu.be/xooMILR0bmU
```

## Health check (for you / judges who curl)

```
https://nanokat-forge-z4l33yvnfq-uc.a.run.app/health
```

## GitHub repository URL

```
https://github.com/nanokataclysm/nanokat-forge
```

## Primary branch

```
feat/mission-society-runtime
```

## Demo unit path (in repo)

```
apps/orchestrator
```

## Tech stack

```
Node.js, Express, Qwen via DashScope OpenAI-compatible API, static frontend, Google Cloud Run, node:test unit suite
```

## Models / AI tools used

```
• GPT-5.6 (ChatGPT) — architecture, safety, handoffs, submission planning
• Codex — repository implementation and verification when available
• Grok — deploy, ops, tests, evidence packaging
• Qwen (qwen-plus via Alibaba Cloud Model Studio / DashScope) — live plan generation
```

## How OpenAI models helped (if the form asks specifically)

```
GPT-5.6 in ChatGPT was the primary architecture and continuity partner: scoping the vertical slice, designing human approval gates, diagnosing product drift, producing Codex handoffs, and planning evidence and submission wording. Codex contributed in-repo implementation and verification when usage was available. The live deployed inference path uses Qwen (Alibaba Model Studio), which we disclose explicitly so OpenAI is not misrepresented as the production model for the running demo.
```

## Team / developer

```
Kumori / NANOKAT (solo operator)
```

## Project start date

```
2026-07-19
```

## Category / track (if free text)

```
Agentic systems / human-in-the-loop tooling / developer tools
```

## Keywords / tags

```
human-in-the-loop, Qwen, Cloud Run, website planning, agent orchestration, approval gates, OpenAI Build Week, Codex, GPT-5.6
```

## What makes this different / unique value

```
Most “AI website builders” jump straight to generation. Forge forces a structured plan, a visible human approval, and an isolated preview with an execution trace that states no production mutation. The OpenAI tools shaped architecture and implementation; the live model is honestly disclosed as Qwen.
```

## Demo instructions for judges

```
1. Open https://nanokat-forge-z4l33yvnfq-uc.a.run.app
2. Enter the demo access code provided by the operator (not stored in the public repo).
3. Paste a short business brief (e.g. “Austin pottery studio; pages Home, Work, About, Contact; warm earthy palette”).
4. Click Plan — wait for Qwen structured cards.
5. Click Approve — view isolated preview and execution trace.
6. Optional: reject path — without approve, preview is blocked.

Alternative proof without the token: open `/health` for the live service and model, then review the test and smoke log under `evidence/03-proof/exports/20260721-grok-session/`.
```

## Video description (YouTube / form caption)

```
NANOKAT Forge — OpenAI Build Week demo (no face cam). Soft voiceover (JennyNeural) over product screenshots and narration of the live Cloud Run path: brief → Qwen plan → human approve → isolated preview. Architecture and handoffs: GPT-5.6 + Codex; live inference: Qwen. Demo: https://nanokat-forge-z4l33yvnfq-uc.a.run.app Video: https://youtu.be/xooMILR0bmU Repo: https://github.com/nanokataclysm/nanokat-forge
```

## Evidence / how we used OpenAI (long form for evidence field)

```
NANOKAT Forge was created during OpenAI Build Week through a combined workflow in which GPT-5.6 provided architecture, orchestration, security review, product correction, implementation handoffs, debugging guidance, and submission planning; Codex contributed repository implementation and verification when available; Grok handled host deploy and evidence packaging; and Qwen powers the deployed runtime. Git history, conversation exports, screenshots under evidence/, test logs, and the narrated demo document that contribution without misrepresenting the runtime provider.
```

## Codex session ID

```
019f6508-e856-7e80-bdc0-d132525a1a16
```

Supporting Forge troubleshooting session: `019f7be3-39e0-7541-afc5-45074f72fb7f`.

## ChatGPT / GPT project evidence

```
Screenshots: evidence/archive/images/product-screenshots/
Evidence dossier: evidence/01-submission-text/OPENAI_BUILD_WEEK_EVIDENCE_DOSSIER.md
Grok session export: evidence/03-proof/exports/20260721-grok-session/
```

## Built with / powered by (checkbox-style text)

```
OpenAI GPT-5.6 (architecture & planning), OpenAI Codex (implementation when available), Alibaba Qwen via DashScope (live inference), Google Cloud Run (hosting)
```

## License

```
ISC (see repository LICENSE)
```

---

# Files to upload / attach

Copy these into your upload folder (or zip as below).

### Required / high value

| File | Local path |
|------|------------|
| Demo video (YouTube) | https://youtu.be/xooMILR0bmU |
| Demo video (local MP4) | `/home/nanokat/hack/nk-forge/evidence/02-media/video/nanokat-forge-build-week-demo.mp4` |
| Voice-only backup | `/home/nanokat/hack/nk-forge/evidence/02-media/video/narration-jenny.mp3` |
| Storyboard (optional PDF/text) | `/home/nanokat/hack/nk-forge/evidence/01-submission-text/VIDEO_STORYBOARD.md` |
| This paste sheet | `/home/nanokat/hack/nk-forge/evidence/01-submission-text/SUBMISSION_FORM_PASTE.md` |

### Evidence pack (optional zip for judges)

| Path | Contents |
|------|----------|
| `/home/nanokat/hack/nk-forge/evidence/archive/images/product-screenshots/` | Archived UI screenshots |
| `/home/nanokat/hack/nk-forge/evidence/03-proof/exports/20260721-grok-session/OVERALL_TEST_DEBUG.log` | Tests + live smoke |
| `/home/nanokat/hack/nk-forge/evidence/03-proof/exports/20260721-grok-session/health-live.json` | Live health JSON |
| `/home/nanokat/hack/nk-forge/evidence/03-proof/exports/20260721-grok-session/` | Scrubbed session export |
| `/home/nanokat/hack/nk-forge/evidence/01-submission-text/OPENAI_BUILD_WEEK_EVIDENCE_DOSSIER.md` | Evidence dossier |
| `/home/nanokat/hack/nk-forge/evidence/01-submission-text/SUBMISSION.md` | Submission sheet |
| `/home/nanokat/hack/nk-forge/README.md` | Project README |

### Package command (creates a zip on Desktop)

```bash
cd /home/nanokat/hack/nk-forge
ZIP=~/Documents/NANOKAT-Forge-BuildWeek-upload-$(date +%Y%m%d).zip
zip -r "$ZIP" \
  evidence/02-media/video/nanokat-forge-build-week-demo.mp4 \
  evidence/02-media/video/narration-jenny.mp3 \
  evidence/02-media/video/narration-jenny.vtt \
  evidence/01-submission-text/VIDEO_STORYBOARD.md \
  evidence/01-submission-text/SUBMISSION_FORM_PASTE.md \
  evidence/01-submission-text/JIC_SUBMISSION_EMAIL.md \
  evidence/README.md \
  evidence/01-submission-text/MANIFEST.md \
  evidence/03-proof/exports/20260721-grok-session \
  README.md \
  AGENTS.md \
  -x 'evidence/02-media/video/_work/*'
ls -lh "$ZIP"
echo "Upload zip: $ZIP"
```

### Do **not** upload

- `.env*`, `apps/orchestrator/.env.cloudrun.local`
- `.nanokat/keys/*private*.pem`
- `local-scratch/`, `.venv-tts/`, `node_modules/`
- Demo access code / DashScope API keys in any text field

---

# Operator blanks (fill once)

| Field | Your value |
|-------|------------|
| Demo access code for judges | _give out-of-band if required; not in repo_ |
| Primary Codex session ID | `019f6508-e856-7e80-bdc0-d132525a1a16` |
| Your display name on form | Kumori / NANOKAT (or legal name if required) |
| Contact email | _your form email_ |
