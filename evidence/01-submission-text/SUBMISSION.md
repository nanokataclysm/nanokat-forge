# NANOKAT Forge — OpenAI Build Week submission sheet

**Live demo:** https://nanokat-forge-z4l33yvnfq-uc.a.run.app  
**Source root:** `/home/nanokat/hack/nk-forge`  
**Deploy unit:** `apps/orchestrator` on Google Cloud Run  
**Primary branch (work):** `feat/mission-society-runtime`

## One-paragraph product claim (truthful)

NANOKAT Forge is a human-gated website planning slice: a demo access code unlocks the API; **Qwen** (Alibaba Cloud Model Studio) turns a messy small-business brief into a structured plan; a human must approve before an isolated HTML preview is rendered. No production site is deployed, no DNS is changed, and no secrets are exposed to the client. GPT-5.6 shaped architecture, safety boundaries, and handoffs; Codex/Sylvia contribute implementation when available; Qwen is the live inference runtime.

## Demo path (CLI or browser)

1. Open the live URL (or `curl` the APIs below).
2. Enter the demo access code (`DEMO_SHARED_SECRET` — operator-held; not committed).
3. Submit a short business brief → **Plan**.
4. Review plan cards (pages, palette, risks, validation steps).
5. **Approve** → isolated preview + execution trace.
6. Without approval, preview returns **409**. Wrong token returns **401**.

### API smoke

```bash
# Health
curl -sS https://nanokat-forge-z4l33yvnfq-uc.a.run.app/health

# Plan (token from operator env — do not paste secrets into public docs)
curl -sS -X POST https://nanokat-forge-z4l33yvnfq-uc.a.run.app/api/plan \
  -H 'Content-Type: application/json' \
  -H "x-nanokat-demo-token: $DEMO_SHARED_SECRET" \
  -d '{"brief":"Austin pottery studio. Four pages. Warm palette."}'
```

Local automated tests (no network / no Qwen):

```bash
cd apps/orchestrator && npm test
```

## Responsibility split

| Role | Who |
|------|-----|
| Architecture, product correction, safety review, handoffs | GPT-5.6 (ChatGPT project) |
| Repository implementation & verification when available | Codex (Sylvia) |
| Live model for plan generation | Qwen via DashScope |
| Hosting | Google Cloud Run |

## What is shipped

- Express orchestrator: `/health`, `/api/plan`, `/api/build-preview`
- Static UI with access code, plan approval, preview
- Palette normalization (array or Qwen object shapes)
- Unit tests with mock Qwen (`node --test`)
- Fail-fast required env: `DASHSCOPE_API_KEY`, `DASHSCOPE_BASE_URL`, `DEMO_SHARED_SECRET`
- Dev Ed25519 keypair present under `.nanokat/keys/` for the **next** signing slice

## What is not shipped (do not claim)

- Multi-agent Mission Society council as the live path
- Signed ZIP / cryptographic receipts (see `docs/handoffs/sylvia-signing.md` — in progress)
- Persistent client preference memory
- Production key custody / HSM
- Fake email verification

## Runtime disclosure

- **Inference:** Alibaba Cloud Model Studio (Qwen), default model `qwen-plus`
- **Host:** Google Cloud Run (`nanokat-forge`, `us-central1`)
- **Not:** OpenAI API as the production inference path for this demo

## Evidence pointers

- **Canonical pack:** [`evidence/`](..) (submission text, media, proof, archive)
- Video script: [`VIDEO_STORYBOARD.md`](VIDEO_STORYBOARD.md)
- This file + root `README.md` + `AGENTS.md` (Ubuntu MBP host truth)
- [`OPENAI_BUILD_WEEK_EVIDENCE_DOSSIER.md`](OPENAI_BUILD_WEEK_EVIDENCE_DOSSIER.md)
- `docs/handoffs/sylvia-signing.md` (signing next)
- Git history on `feat/mission-society-runtime` and `main`
- Live `/health` + plan/preview smoke

## Operator notes after the competition

```bash
# Scale to zero is already configured (min-instances=0).
# To remove the demo service when finished:
# gcloud run services delete nanokat-forge --region=us-central1
```
