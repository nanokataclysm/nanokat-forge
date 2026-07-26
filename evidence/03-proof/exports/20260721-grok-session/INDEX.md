# Proof pack — curated Forge evidence

This directory retains the minimum public-safe evidence needed to support the NANOKAT Forge demo claims. Raw agent transcripts, session metadata, workstation paths, local Git state, and operator-only provenance are intentionally excluded.

## Supported claims

1. **Human-gated plan-to-preview flow works.** The retained test and smoke log records a successful plan request, approved preview build, and `SMOKE_OK`.
2. **Auth gates return the expected behavior.** The smoke log records `401` for an unauthenticated request and `409` when preview approval is missing.
3. **The unit suite passes 21 tests.** The retained log records 21 passing tests with no failures, cancellations, skips, or TODOs.
4. **Qwen palette normalization is regression-tested.** The unit output and retained palette regression check cover Qwen-style object palettes.
5. **The UI identifies the deployed providers.** The retained homepage check shows `Google Cloud Run · Qwen`.
6. **Screenshots are retained as external operator evidence.** The public inventories preserve filenames, byte counts, and shortened SHA-256 identifiers while the original image files remain in operator-controlled storage.

## Not claimed

- Multi-agent Mission Society is the live runtime path.
- Signed ZIP delivery or production signing-key custody is complete.
- GPT-5.6 is the runtime model.

## Retained files

- `INDEX.md` — this curated public-safe index.
- `OVERALL_TEST_DEBUG.log` — unit-test, smoke-test, provider-disclosure, and palette-regression output.
- `SCREENSHOT_INVENTORY.md` — human-readable inventory of externally retained screenshots.
- `SCREENSHOT_INVENTORY.json` — machine-readable inventory of externally retained screenshots.
