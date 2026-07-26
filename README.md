# NANOKAT Forge

NANOKAT Forge is a **human-approved website planning and preview system** built for small-business briefs.

This repository is the public, historical implementation and evidence archive from the 2026 hackathon cycle. Active product development continues privately under **Solforge** so operational infrastructure, credentials, client work, and unfinished experiments are not mixed into the public record.

## What the public demo does

1. A demo access code gates the API.
2. Qwen turns a business brief into a structured website plan.
3. A human explicitly approves the plan.
4. A scoped endpoint validates it and returns an isolated HTML preview.

The demo does **not** deploy a production website, change DNS, or access operator secrets.

- Live demo: https://nanokat-forge-z4l33yvnfq-uc.a.run.app
- Demo video: https://youtu.be/xooMILR0bmU
- Curated evidence: [`evidence/START_HERE.md`](evidence/START_HERE.md)

## Runtime

| Layer | Provider |
|---|---|
| Inference | Qwen through the DashScope-compatible API |
| Hosting | Google Cloud Run |
| Application | Node.js orchestrator under `apps/orchestrator` |
| Approval boundary | Session-bound approval, nonce, and plan digest |

## API

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/health` | Service and approval-gate status |
| `POST` | `/api/plan` | Convert a brief into a structured plan |
| `POST` | `/api/approve` | Bind human approval to the plan |
| `POST` | `/api/build-preview` | Return an isolated preview after approval |

## Local development

```bash
cd apps/orchestrator
# Set required values outside Git. Never commit .env files.
npm start
npm test
npm run smoke
```

See `.env.example` for variable names. Real credentials and private key material must remain outside the repository.

## Security posture

- No production credentials belong in this repository.
- `.env*`, private keys, operator state, and agent scratch are ignored.
- Demo signing material is hackathon-only and is not the production authentication model.
- Public evidence is curated; raw agent chat exports and workstation context are intentionally excluded.
- Production, DNS, secret, and client-data operations require separate operator approval and private infrastructure.

Security reports: [`.github/SECURITY.md`](.github/SECURITY.md)

## Repository boundary

This repository contains:

- the public Forge demo implementation;
- tests and public-safe technical documentation;
- curated hackathon evidence and media;
- community contribution and security guidance.

This repository does **not** contain:

- active Solforge product development;
- the private NANOKAT monorepo;
- client source, private copy, or client data;
- deployment credentials, DNS state, or recovery materials;
- raw agent transcripts, local paths, or operator-machine inventories.

## Status

The public demo remains a historical, reproducible snapshot. Future product claims should be made from the active Solforge repository only after that surface is deliberately prepared for publication.

## License

MIT. See [`LICENSE`](LICENSE).
