# Sylvia handoff — Forge signing / receipt system

**Repo:** `/home/nanokat/hack/nk-forge`  
**Branch:** `feat/mission-society-runtime`  
**Live demo (do not break):** https://nanokat-forge-z4l33yvnfq-uc.a.run.app  
**Working product today:** brief → Qwen plan → human approve → isolated preview (`apps/orchestrator`)

Prepared for Codex / Sylvia to implement the encryption key + signed package path without re-litigating architecture.

---

## Already on disk (use these)

| Path | Role |
|------|------|
| `.nanokat/keys/demo-signing-private.pem` | **Dev-only** Ed25519 private (mode 600, gitignored) |
| `.nanokat/keys/demo-signing-public.pem` | Public PEM (safe with verifier artifacts) |
| `.gitignore` | `.nanokat/keys/*private*.pem` already present |

Label everywhere: **development signing identity — not production key custody.**

Do not regenerate unless the existing pair is missing or compromised. If regenerating:

```bash
cd /home/nanokat/hack/nk-forge
mkdir -p .nanokat/keys && chmod 700 .nanokat/keys && umask 077
openssl genpkey -algorithm ED25519 -out .nanokat/keys/demo-signing-private.pem
openssl pkey -in .nanokat/keys/demo-signing-private.pem -pubout -out .nanokat/keys/demo-signing-public.pem
chmod 600 .nanokat/keys/demo-signing-private.pem
chmod 644 .nanokat/keys/demo-signing-public.pem
```

Never print, paste, commit, or ship `demo-signing-private.pem`.

---

## Hard architecture rules

1. **Server-side only** for the NANOKAT issuer signature. Never put the private key in the browser or public frontend.
2. **ZIP must not try to sign itself.** Correct order:
   - files → per-file digests → canonical manifest → manifest digest  
   - receipt (includes digests + metadata) → sign receipt  
   - pack files + manifest + receipt + signature into ZIP  
   Optional external ZIP checksum is **outside** the signed payload.
3. **Public key in package ≠ trust.** Verifier must pin or fetch an independent public key. For the hackathon: ship public PEM + fingerprint; production later can use something like `https://nanokat.com/.well-known/signing-keys.json`.
4. **No fake email / HMAC theater.** Keep the existing demo token gate (`x-nanokat-demo-token` / `DEMO_SHARED_SECRET`).
5. **Do not claim production key management.** Dev key + explicit banner is enough for this slice.

---

## Suggested minimal vertical slice

1. After approval, `POST /api/package` (or extend build-preview carefully):
   - Canonical `manifest.json` (request id, plan digests, file digests, parent version if any)
   - `receipt.json` (manifest digest, issuer id, created_at, model, mode)
   - `receipt.sig` (Ed25519 over canonical receipt bytes)
2. Load dev key from env, e.g. `NANOKAT_SIGNING_PRIVATE_KEY_PATH` defaulting to `.nanokat/keys/demo-signing-private.pem`.
   - Local: filesystem path  
   - Cloud Run later: Secret Manager / mounted secret PEM — not required for first local green tests
3. Read-only public key / fingerprint endpoint (or static public PEM alongside verifier).
4. Local verifier CLI or pure function: verify signature + recompute digests; **mutating one file byte fails**.
5. Optional but high-value: **two version branches** (v1 → v2A / v2B) with `parentVersionDigest` — product differentiator, not a decorative receipt.

---

## Do not spend time on

- Client-side signing  
- Production HSM / KMS  
- Full Mission Society multi-agent council as the live path  
- Replacing live Qwen with silent fixtures  
- Overwriting Cloud Run service `infra-dash`  
- Breaking `/health`, `/api/plan`, `/api/build-preview`

---

## Integration notes

- Orchestrator is testable: `createApp({...})`, `lib/preview.mjs`, `lib/approval-session.mjs`, `npm test` (unit suite with mock Qwen).
- Prefer pure crypto helpers + unit tests (no network).
- Keep private key out of logs, responses, and git.
- Live Cloud Run currently uses `DASHSCOPE_*`, `DEMO_SHARED_SECRET`, `QWEN_MODEL=qwen-plus` — add signing path/secret separately; do not clobber those.
- Default model is `qwen-plus` (free tier for `qwen3.7-plus` was exhausted).

### Session-bound approval gate (landed by Mira after Sylvia handoff)

Preview generation is no longer client-asserted `approved: true` alone.

| Step | Behavior |
|------|----------|
| `POST /api/approve` | Demo token + plan → HttpOnly `nf_approval_session` cookie + one-time `nonce` + `planDigest` |
| `POST /api/build-preview` | Demo token + cookie + same plan + nonce → digest match, nonce consume, then preview |

See `apps/orchestrator/lib/approval-session.mjs`. Signing package path remains separate; Ed25519 private key never enters the browser.

---

## Acceptance (slam criteria)

- [ ] Private key never leaves server / secret store  
- [ ] Manifest → receipt → signature → ZIP order is non-circular  
- [ ] Unit test: good package verifies; one-byte tamper fails  
- [ ] UI or CLI can download package after approve  
- [ ] README / UI says **dev signing identity** only  
- [ ] Live plan/preview path still green  

---

## Truthful product one-liner

> NANOKAT signs the **approved version’s canonical manifest**, not a browser key and not the ZIP container that holds the signature.

---

## Context for judges / README (do not overclaim)

Shipped demo today: human-gated Qwen plan + isolated HTML preview on Cloud Run.  
Signing + branchable version history is the next vertical slice you are implementing here.
