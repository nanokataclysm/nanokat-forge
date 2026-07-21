# Proof pack — 2026-07-21 Grok Forge session

Curated evidence for OpenAI Build Week **inference** (what was built, by whom, and what works).

## How to read this (judges / auditors)

| Question | Start here |
|----------|------------|
| What is the live product? | `../..//SUBMISSION.md` or root `README.md` + live URL below |
| What happened in this Grok session? | `CHAT_TRANSCRIPT.md` (user + assistant; secrets redacted) |
| Machine-readable chat? | `chat_scrubbed.jsonl` + `PROVENANCE.json` |
| Did tests pass? | `OVERALL_TEST_DEBUG.log` |
| Repo state at capture? | `GIT_STATE.txt` |
| Prior UI screenshots? | `SCREENSHOT_INVENTORY.md` → originals in `~/Documents/Qwen-Hack-Capture/` |

## Live demo

https://nanokat-forge-z4l33yvnfq-uc.a.run.app

- Runtime inference: **Qwen** (Alibaba Cloud Model Studio), model `qwen-plus`
- Host: **Google Cloud Run**
- Architecture / handoffs: **GPT-5.6** + **Codex/Sylvia** when available
- This capture session: **Grok** (ops, deploy, tests, proof export)

## Session provenance

- Session id: `019f86d1-ccb3-7331-a41c-c526b159e162`
- Source: `~/.grok/sessions/.../chat_history.jsonl` (SHA-256 in `PROVENANCE.json`)
- Full copies also under:
  - `~/Documents/Qwen-Hack-Capture/20260721-grok-forge-session/`
  - `~/Documents/Qwen_hack_capture/20260721-grok-forge-session/`

## Inference claims supported by this pack

1. **Human-gated plan → preview** works end-to-end on Cloud Run (`SMOKE_OK` in log).
2. **Auth gates** work (401 bad token, 409 without approval).
3. **Unit suite** is offline/mockable (`21` tests pass).
4. **Palette object** shapes from Qwen are normalized (regression in log).
5. **UI discloses Cloud Run · Qwen** (not Function Compute).
6. Screenshots in Documents remain external evidence of earlier UI work; inventory is linked without bloating git with multi‑MB PNGs.

## Not claimed here

- Multi-agent Mission Society as the live path
- Signed ZIP / production key custody (see `docs/handoffs/sylvia-signing.md`)
- That GPT-5.6 is the runtime model

## File list

- `INDEX.md` — this file
- `CHAT_TRANSCRIPT.md` — readable export
- `chat_scrubbed.jsonl` — full scrubbed message stream
- `PROVENANCE.json` — ids, hashes, counts
- `summary.json` — Grok session summary
- `OVERALL_TEST_DEBUG.log` — tests + live smoke + regressions
- `GIT_STATE.txt` — branch/log/status at capture
- `SCREENSHOT_INVENTORY.md` / `.json` — Documents screenshot index
