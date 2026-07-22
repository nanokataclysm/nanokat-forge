# Evidence manifest — how to draw inference

## Claim → proof map

| Claim | Evidence |
|-------|----------|
| Live service exists | `logs/health-live.json` + open demo URL |
| Human gate works | `logs/OVERALL_TEST_DEBUG.log` (409 deny / 401 unauth) |
| Qwen powers plan | Same log (`model: qwen-plus`) + health provider string |
| Offline tests exist | Same log (`21` tests pass) |
| UI evolved over days | `screenshots/Screenshot_20260718_*` … `20260721_*` |
| Grok session continuity | `exports/20260721-grok-session/` + `transcripts/` |
| Secrets not leaked in export | `PROVENANCE.json` redaction note; no private PEMs in this tree |
| Host is Ubuntu MBP | Root `AGENTS.md` + monorepo `docs/project-state.md` |

## What not to infer

- Screenshots alone do not prove Mission Society multi-agent is live.
- Chat export proves **process** (deploy, fix, test); runtime is still Qwen.
- Operator-named PNGs (`terrible.png`, etc.) are informal; prefer timestamped `Screenshot_*` for formal narrative.

## Screenshot index

See `screenshots/MANIFEST.json` for file sizes and hashes.
