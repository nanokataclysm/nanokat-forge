# AGENTS.md — NANOKAT Forge (`~/hack/nk-forge`)

## HOST — kumori MBP (Ubuntu, not macOS)

**Persistent. Do not invent a Mac software environment.**

| Fact | Value |
|------|--------|
| Hostname | `nanokatmbp` |
| Chassis | Physical **Apple MacBook Pro** (hardware only) |
| OS | **Ubuntu 26.04 LTS** (Resolute) · Linux x86_64 |
| Home | `/home/nanokat` |
| This repo | `/home/nanokat/hack/nk-forge` |
| Main monorepo | `/home/nanokat/dev/nanokat` |

**Rules for every agent (Grok, Codex/Sylvia, etc.):**

1. This is a **Linux** operator host. Prefer `apt`, `systemctl`, `ip`, `ss`, `journalctl`, `curl`.
2. **No** macOS install path: do not require Homebrew, `brew`, `launchctl`, Darwin-only paths, or `/Users/...` as default.
3. Networking: `ip` / `hostname -I` / `ip route` — **not** macOS `ipconfig` as first guidance.
4. Paths are Linux under `/home/nanokat`. “MBP” means the **physical laptop**, not macOS.

If a prompt or skill says “Mac” without Ubuntu, correct to **Apple hardware + Ubuntu 26.04 LTS**.

## Product truth (hackathon slice)

- Live demo: human-gated Qwen plan → approve → isolated preview on **Google Cloud Run**.
- Runtime inference: **Qwen** (Alibaba Model Studio). Not OpenAI as the live model.
- Signing / Mission Society multi-agent: design + handoff (`docs/handoffs/sylvia-signing.md`) — do not claim shipped unless code proves it.
- Evidence pack: **`evidence/`** at repo root (screenshots, exports, logs, video storyboard).

## Security

- Never commit secrets (`.env*`, private PEMs, demo tokens in public docs).
- Private signing key: `.nanokat/keys/demo-signing-private.pem` (gitignored).
- Demo token lives only in env / Cloud Run / operator files.

## Default commands

```bash
cd /home/nanokat/hack/nk-forge/apps/orchestrator
npm test
npm run smoke   # live Cloud Run
```
