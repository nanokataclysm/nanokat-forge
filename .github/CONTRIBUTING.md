# Contributing to NANOKAT Forge

Thanks for caring about a small, honest vertical slice.

## What this repo is

Human-gated website planning:

1. Brief → **Qwen** structured plan  
2. Human **approve**  
3. Isolated HTML **preview** (no production deploy)

Live demo (when up): https://nanokat-forge-z4l33yvnfq-uc.a.run.app  

Evidence / Build Week pack: [`evidence/START_HERE.md`](../evidence/START_HERE.md)

## What this repo is not (yet)

- Full multi-agent “Mission Society” as the default live path  
- Production cryptographic package custody  
- The main NANOKAT monorepo (`dash.nanokat.com`, clients, Alley)

## Ground rules

1. **No secrets in PRs.** Use env vars; see [SECURITY.md](SECURITY.md).
2. **Keep the human gate.** Preview must not skip approval without an explicit, documented reason.
3. **Name the runtime honestly.** Live plan generation is Qwen unless you change and document it.
4. **Linux operator host.** Primary dev box is Ubuntu 26.04 LTS on Apple hardware — don’t assume Homebrew/macOS paths.
5. **Prefer tests.** `cd apps/orchestrator && npm test`.

## Dev loop

```bash
cd apps/orchestrator
# export DASHSCOPE_API_KEY DASHSCOPE_BASE_URL DEMO_SHARED_SECRET QWEN_MODEL=qwen-plus
npm start          # local
npm test           # offline unit tests
npm run smoke      # hits FORGE_URL or live Cloud Run (needs token)
```

## PRs

Use the PR template. Small diffs beat speculative frameworks. If the change is design-only (signing, multi-agent), say so and avoid “live demo” language.

## Questions

Open a **Demo / judge feedback** or **Feature** issue template — or try the live demo first.
