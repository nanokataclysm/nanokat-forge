# Evidence manifest — how to draw inference

## Claim → proof map

| Claim | Evidence |
|-------|----------|
| Live service exists | `03-proof` health capture + https://nanokat-forge-z4l33yvnfq-uc.a.run.app |
| Demo video published | https://youtu.be/xooMILR0bmU |
| Human gate works | `03-proof/exports/20260721-grok-session/OVERALL_TEST_DEBUG.log` (409 deny / 401 unauth) |
| Qwen powers plan | Same log (`model: qwen-plus`) + health provider string |
| Offline tests exist | Same log (`21` tests pass) |
| UI evolved over days | `../archive/images/product-screenshots/Screenshot_20260718_*` … `20260721_*` |
| Screenshots remain externally retained | `03-proof/exports/20260721-grok-session/SCREENSHOT_INVENTORY.md` and `.json` |
| Public export is curated | `03-proof/exports/20260721-grok-session/INDEX.md`; raw sessions, workstation state, and secret-bearing material are excluded |

## What not to infer

- Screenshots alone do not prove Mission Society multi-agent is live.
- The retained test log proves demo behavior; the runtime model disclosed there is Qwen.
- Operator-named PNGs (`terrible.png`, etc.) are informal; prefer timestamped `Screenshot_*` files for formal narrative.
- The public evidence tree does not establish production signing-key custody or production deployment authority.

## Screenshot index

See `../archive/images/product-screenshots/MANIFEST.json` for file sizes and hashes.
