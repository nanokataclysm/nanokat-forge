# Evidence manifest — how to draw inference

## Claim → proof map

| Claim | Evidence |
|-------|----------|
| Live service exists | `03-proof` health capture + https://nanokat-forge-z4l33yvnfq-uc.a.run.app |
| Demo video published | https://youtu.be/xooMILR0bmU |
| Human gate works | `logs/OVERALL_TEST_DEBUG.log` (409 deny / 401 unauth) |
| Qwen powers plan | Same log (`model: qwen-plus`) + health provider string |
| Offline tests exist | Same log (`21` tests pass) |
| UI evolved over days | `../archive/images/product-screenshots/Screenshot_20260718_*` … `20260721_*` |
| Grok session continuity | `exports/20260721-grok-session/` + `transcripts/` |
| Secrets not leaked in export | `PROVENANCE.json` redaction note; no private PEMs in this tree |
| Host is Ubuntu MBP | Root `AGENTS.md` + monorepo `docs/project-state.md` |

## What not to infer

- Screenshots alone do not prove Mission Society multi-agent is live.
- Chat export proves **process** (deploy, fix, test); runtime is still Qwen.
- Operator-named PNGs (`terrible.png`, etc.) are informal; prefer timestamped `Screenshot_*` for formal narrative.

## Screenshot index

See `../archive/images/product-screenshots/MANIFEST.json` for file sizes and hashes.
