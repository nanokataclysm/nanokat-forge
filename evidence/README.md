# Evidence pack — NANOKAT Forge

**Canonical root for all Build Week / Devpost materials.**

## Layout

| Folder | Contents |
|--------|----------|
| **[`START_HERE.md`](START_HERE.md)** | 5-minute checklist |
| **[`brand/`](brand/)** | Nexus Dark thumbnail (`forge-thumbnail.jpg`) |
| **[`01-submission-text/`](01-submission-text/)** | Canonical submission text, email draft, storyboard, dossier |
| **[`02-media/`](02-media/)** | Submission-ready demo video + audio |
| **[`03-proof/`](03-proof/)** | Canonical Grok session, test, and deploy export |
| **[`archive/images/`](archive/images/)** | Historical product screenshots + anime story images |

### 01 — submission text

| File | Use |
|------|-----|
| `DEVPOST_PASTE.md` | Field-by-field Devpost / OpenAI Build Week |
| `SUBMISSION_FORM_PASTE.md` | Generic form blocks + zip recipe |
| `JIC_SUBMISSION_EMAIL.md` | Just-in-case email to contest organizers |
| `VIDEO_STORYBOARD.md` | Shot list + spoken script |
| `INSPIRATION_AND_GALLERY.md` | Inspiration section + anime gallery captions |
| `SUBMISSION.md` | Operator submission sheet |
| `OPENAI_BUILD_WEEK_EVIDENCE_DOSSIER.md` | Evidence dossier |
| `MANIFEST.md` | Claim → proof map |

### 02 — submission media

| Path | Use |
|------|-----|
| `video/nanokat-forge-build-week-demo.mp4` | Main demo (~1:38) |
| `video/narration-jenny.mp3` | Soft VO only |
| `video/narration-jenny.vtt` | Subtitles |
| `video/anime-saga-reel.mp4` | Optional story-panel montage |
| `video/_work/` | Segments/slides (not for judges) |

### 03 — proof

| Path | Use |
|------|-----|
| `exports/20260721-grok-session/` | Scrubbed chat, provenance, test log, and live health capture |

### Archive

`archive/images/` preserves visual history without mixing it into the active submission package. The Forge thumbnail remains under `brand/` because it is still a current submission asset.

## Live product & submission links

| Item | URL / path |
|------|------------|
| Live demo | https://nanokat-forge-z4l33yvnfq-uc.a.run.app |
| Health | https://nanokat-forge-z4l33yvnfq-uc.a.run.app/health |
| **YouTube demo** | **https://youtu.be/xooMILR0bmU** |
| GitHub | https://github.com/nanokataclysm/nanokat-forge (public) |
| Thumbnail | [`brand/forge-thumbnail.jpg`](brand/forge-thumbnail.jpg) |
| Local MP4 | [`02-media/video/nanokat-forge-build-week-demo.mp4`](02-media/video/nanokat-forge-build-week-demo.mp4) |

Host note: kumori MBP = Ubuntu 26.04 LTS on Apple hardware (see root `AGENTS.md`).

### Multi-agent / evidence reorg

If archiving or moving media: **commit deletes + new paths in one step**. Concurrent agents (Grok, Codex, aether) plus `git restore` of tracked files will re-create old trees until the reorg is committed. Prefer a single owner for `evidence/` changes.

## Host docs (repo root)

- `AGENTS.md` · `README.md` · `docs/handoffs/sylvia-signing.md`
