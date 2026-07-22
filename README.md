# NANOKAT Forge

Human-gated website **plan + preview** for small-business briefs.

## What ships now

1. Demo access code gates the API.
2. **Qwen** (Alibaba Cloud Model Studio) turns a brief into a structured website plan.
3. A human must approve before preview generation.
4. A scoped endpoint validates the plan and returns an **isolated HTML preview** — no production deploy, DNS change, or secret access.

Live demo (Cloud Run):

https://nanokat-forge-z4l33yvnfq-uc.a.run.app

Demo video (YouTube, public):

https://youtu.be/xooMILR0bmU

Repo: https://github.com/nanokataclysm/nanokat-forge · default work branch `feat/mission-society-runtime` (also on `main` for community templates).

## Runtime truth

| Layer | Provider |
|--------|----------|
| Inference | Qwen via DashScope compatible API (`qwen-plus` on Cloud Run) |
| Host | Google Cloud Run (`apps/orchestrator`) |
| Architecture / handoffs | GPT-5.6 + Codex during OpenAI Build Week |
| Ops / evidence packaging | Grok (Mira) |

## Multi-agent worktree note

Several agents may touch this repo at once (Grok, Codex/Sylvia, aether routes). **Do not** run concurrent rewrites of `evidence/` without coordinating. A copy-to-archive without committing deletions will reappear after `git restore` / checkout of tracked paths. Prefer one owner for evidence reorgs; finish with a single commit of adds + deletes.

## API

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/health` | Service + model + `approvalGate: session-bound` |
| `POST` | `/api/plan` | Header `x-nanokat-demo-token` + JSON `{ "brief": "..." }` |
| `POST` | `/api/approve` | Demo token + `{ "plan" }` → HttpOnly session cookie + one-time `nonce` + `planDigest` |
| `POST` | `/api/build-preview` | Demo token + session cookie + `{ "plan", "nonce" }` (client `approved: true` alone is rejected) |

## Local

```bash
cd apps/orchestrator
# export DASHSCOPE_API_KEY DASHSCOPE_BASE_URL DEMO_SHARED_SECRET QWEN_MODEL=qwen-plus
npm start
npm test
npm run smoke   # hits FORGE_URL or the live Cloud Run URL
```

## Host (agents)

Operator machine is a **physical MacBook Pro(2017 14,3) running Ubuntu 26.04 LTS** — not macOS.  
See [`AGENTS.md`](AGENTS.md).

## Submission & evidence

**Start:** [`evidence/START_HERE.md`](evidence/START_HERE.md)

| Path | Role |
|------|------|
| [`evidence/`](evidence/) | Full pack (text · media · proof · brand) |
| [`evidence/01-submission-text/DEVPOST_PASTE.md`](evidence/01-submission-text/DEVPOST_PASTE.md) | Devpost field paste |
| [`evidence/01-submission-text/SUBMISSION.md`](evidence/01-submission-text/SUBMISSION.md) | Canonical submission sheet |
| [`evidence/01-submission-text/JIC_SUBMISSION_EMAIL.md`](evidence/01-submission-text/JIC_SUBMISSION_EMAIL.md) | Just-in-case organizer email draft |
| [`evidence/02-media/video/`](evidence/02-media/video/) | Local demo MP4 + soft VO |
| **Demo video (YouTube)** | https://youtu.be/xooMILR0bmU |
| [`evidence/archive/images/`](evidence/archive/images/) | Archived screenshots + story images |
| [`evidence/brand/forge-thumbnail.jpg`](evidence/brand/forge-thumbnail.jpg) | Cover image (Nexus Dark) |
| [`docs/handoffs/sylvia-signing.md`](docs/handoffs/sylvia-signing.md) | Signing handoff (Sylvia) |

## Codex build chats

| Role | Session ID |
|------|------------|
| Primary Forge build, signing, testing, and handoff | `019f6508-e856-7e80-bdc0-d132525a1a16` |
| Supporting Qwen / NANOKAT CLI troubleshooting | `019f7be3-39e0-7541-afc5-45074f72fb7f` |

Internal guardian runs are intentionally omitted because they are not user-resumable chats.

## Not claimed (yet)

- Multi-agent Mission Society council as the live path
- Signed ZIP / cryptographic receipts as shipped product (in progress — handoff above)
- Persistent client preference memory or full site generation deploy

Those remain architecture/spec under `docs/`.
