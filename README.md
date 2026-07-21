# NANOKAT Forge

Human-gated website **plan + preview** for small-business briefs.

## What ships now

1. Demo access code gates the API.
2. **Qwen** (Alibaba Cloud Model Studio) turns a brief into a structured website plan.
3. A human must approve before preview generation.
4. A scoped endpoint validates the plan and returns an **isolated HTML preview** — no production deploy, DNS change, or secret access.

Live demo (Cloud Run):

https://nanokat-forge-z4l33yvnfq-uc.a.run.app

## Runtime truth

| Layer | Provider |
|--------|----------|
| Inference | Qwen via DashScope compatible API |
| Host | Google Cloud Run (`apps/orchestrator`) |
| Architecture / handoffs | GPT-5.6 + Codex during OpenAI Build Week |

## API

| Method | Path | Notes |
|--------|------|--------|
| `GET` | `/health` | Service + model |
| `POST` | `/api/plan` | Header `x-nanokat-demo-token` + JSON `{ "brief": "..." }` |
| `POST` | `/api/build-preview` | Same token + `{ "approved": true, "plan": { ... } }` |

## Local

```bash
cd apps/orchestrator
# export DASHSCOPE_API_KEY DASHSCOPE_BASE_URL DEMO_SHARED_SECRET QWEN_MODEL=qwen-plus
npm start
npm test
npm run smoke   # hits FORGE_URL or the live Cloud Run URL
```

## Submission

Operator-facing sheet: [`docs/SUBMISSION.md`](docs/SUBMISSION.md)  
Signing / receipt handoff for Sylvia: [`docs/handoffs/sylvia-signing.md`](docs/handoffs/sylvia-signing.md)

## Not claimed (yet)

- Multi-agent Mission Society council as the live path
- Signed ZIP / cryptographic receipts as shipped product (in progress — handoff above)
- Persistent client preference memory or full site generation deploy

Those remain architecture/spec under `docs/`.
