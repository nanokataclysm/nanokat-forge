# NANOKAT Forge — exactly what we have right now

**Snapshot time (PT):** 2026-07-21 **6:27 PM PDT**  
**Snapshot time (UTC):** 2026-07-22 **01:27 UTC**  
**Extended organizer deadline:** 2026-07-21 **8:00 PM PT**  
**Original deadline:** 2026-07-21 **5:00 PM PT**  

This document is the **full current inventory**.  
The freeze / transparency narrative for organizers is in:

- [`01-submission-text/ORGANIZER_FREEZE_PACKAGE.md`](01-submission-text/ORGANIZER_FREEZE_PACKAGE.md)  
- [`01-submission-text/ORGANIZER_EMAIL_TRANSPARENT.md`](01-submission-text/ORGANIZER_EMAIL_TRANSPARENT.md)  
- [`FREEZE.md`](FREEZE.md)

Together: **freeze record + exact state at this moment**.

---

## 1. Live services

| Surface | URL | Health now |
|---------|-----|------------|
| **Primary (freeze target)** | https://nanokat-forge-z4l33yvnfq-uc.a.run.app | `ok`, `qwen-plus`, **`approvalGate: session-bound`** |
| Alternate hostname | https://forge.nanokat.com | `ok`, `qwen3.7-plus` (older **Function Compute** stack — **not** the freeze target) |
| YouTube demo | https://youtu.be/xooMILR0bmU | Public |
| GitHub | https://github.com/nanokataclysm/nanokat-forge | **Public** |

### Cloud Run freeze pin

| Field | Value |
|-------|--------|
| Service | `nanokat-forge` |
| Region | `us-central1` |
| Revision @ 100% | **`nanokat-forge-00005-bfp`** |
| Traffic | 100% → that revision |

### Health JSON (primary)

```json
{"ok":true,"service":"nanokat-forge-orchestrator","provider":"Alibaba Cloud Model Studio","model":"qwen-plus","approvalGate":"session-bound"}
```

Also stored: `03-proof/logs/health-now.json`, `03-proof/logs/health-freeze.json`.

---

## 2. Git

| Field | Value |
|-------|--------|
| Branch | `main` |
| Commit (short) | `50fa5bd` |
| Freeze tag | **`buildweek-submit-freeze-20260722T012545Z`** |
| Work branch history | `feat/mission-society-runtime` (feature history; main is what organizers should open) |

```bash
git clone https://github.com/nanokataclysm/nanokat-forge.git
cd nanokat-forge
git checkout buildweek-submit-freeze-20260722T012545Z   # or main
```

---

## 3. Product behavior (as running on primary URL)

1. **Demo access code** gates APIs (`x-nanokat-demo-token` / `DEMO_SHARED_SECRET`) — not in git.  
2. **`POST /api/plan`** — Qwen returns structured plan JSON.  
3. **`POST /api/approve`** — binds human approval: HttpOnly `SameSite=Lax` cookie + plan digest + one-time nonce.  
4. **`POST /api/build-preview`** — requires cookie + matching plan + nonce; client-only `approved: true` is rejected.  
5. Preview = isolated HTML; no production deploy / DNS / secret exposure.

Unit tests (local): `cd apps/orchestrator && npm test` → **30 pass** (as of session-bound gate commit).

---

## 4. Responsibility / tooling disclosure

| Role | Who |
|------|-----|
| Architecture, safety, handoffs, submission planning | GPT-5.6 (ChatGPT) |
| Implementation & verification when available | Codex (Sylvia) — sessions `019f6508-e856-7e80-bdc0-d132525a1a16`, `019f7be3-39e0-7541-afc5-45074f72fb7f` |
| Host ops, Cloud Run, evidence packaging | Grok (Mira) |
| **Live inference** | **Qwen** (`qwen-plus`) via Alibaba Model Studio / DashScope |
| Hosting (freeze) | Google Cloud Run |

---

## 5. Evidence pack layout (repo)

```text
evidence/
├── WHAT_WE_HAVE_NOW.md          ← this file
├── FREEZE.md                    ← one-page pin
├── START_HERE.md                ← map
├── README.md
├── brand/
│   └── forge-thumbnail.jpg      ← Nexus Dark cover
├── 01-submission-text/          ← all paste + organizer docs
├── 02-media/
│   ├── video/                   ← MP4 + Jenny VO
│   └── (screenshots may live under archive/ after reorg)
├── 03-proof/
│   ├── logs/                    ← health + test captures
│   └── exports/                 ← scrubbed Grok session
└── archive/images/              ← historical UI + anime saga stills
```

### Organizer-facing docs (text)

| File | Contents |
|------|----------|
| `01-submission-text/ORGANIZER_EMAIL_TRANSPARENT.md` | Email to send |
| `01-submission-text/ORGANIZER_FREEZE_PACKAGE.md` | Freeze + transparency |
| `01-submission-text/DEVPOST_PASTE.md` | Devpost field paste |
| `01-submission-text/SUBMISSION.md` | Submission sheet |
| `01-submission-text/SUBMISSION_FORM_PASTE.md` | Generic form blocks |
| `01-submission-text/JIC_SUBMISSION_EMAIL.md` | Forge-floor alternate email |
| `01-submission-text/VIDEO_STORYBOARD.md` | Script / shots |
| `01-submission-text/INSPIRATION_AND_GALLERY.md` | Inspiration + gallery captions |

### Media

| Artifact | Location |
|----------|----------|
| YouTube | https://youtu.be/xooMILR0bmU |
| Local demo MP4 | `02-media/video/nanokat-forge-build-week-demo.mp4` |
| Soft VO | `02-media/video/narration-jenny.mp3` |
| Subtitles | `02-media/video/narration-jenny.vtt` |
| Thumbnail | `brand/forge-thumbnail.jpg` |

### Proof

| Artifact | Location |
|----------|----------|
| Health (now) | `03-proof/logs/health-now.json` |
| Health (freeze) | `03-proof/logs/health-freeze.json` |
| Test/smoke log (session export) | `03-proof/exports/20260721-grok-session/OVERALL_TEST_DEBUG.log` |
| Scrubbed chat | `03-proof/exports/20260721-grok-session/` |

---

## 6. Transparency (same story as freeze email)

1. Deadline extended to **8:00 PM PT** for **organizer site issues**.  
2. Our **Devpost submission was shut down / blocked** — offline package is intentional.  
3. **Upload friction** — large assets prepared offline; video is on YouTube.  
4. **Judge Cloud Run URL**, not necessarily `forge.nanokat.com` (older FC / different model string).  
5. Work after original 5:00 PM PT and **before this freeze (~6:27 PM PT)** is included as the state we are delivering under the extended deadline.  
6. **No further product deploys** against this freeze unless organizers request a fix.

---

## 7. Offline zip(s) on the operator machine

| Zip | Path |
|-----|------|
| **Freeze + current package** | `~/Documents/NANOKAT-Forge-FREEZE-PACKAGE-20260721.zip` |
| Full prior pack (if present) | `~/Documents/NANOKAT-Forge-BuildWeek-PACK-20260721.zip` |
| Pointer | `~/Documents/NANOKAT-Forge-FREEZE-README.txt` |

Rebuild command (from repo root):

```bash
cd ~/hack/nk-forge
zip -r ~/Documents/NANOKAT-Forge-WHAT-WE-HAVE-NOW.zip \
  evidence/WHAT_WE_HAVE_NOW.md \
  evidence/FREEZE.md \
  evidence/START_HERE.md \
  evidence/README.md \
  evidence/01-submission-text \
  evidence/brand \
  evidence/02-media/video/nanokat-forge-build-week-demo.mp4 \
  evidence/02-media/video/narration-jenny.mp3 \
  evidence/02-media/video/narration-jenny.vtt \
  evidence/03-proof \
  README.md AGENTS.md \
  -x '*/_work/*'
```

---

## 8. Operator checklist for sending

- [ ] Attach or link **WHAT_WE_HAVE_NOW** + freeze email  
- [ ] Include YouTube + Cloud Run URL  
- [ ] Include git tag name  
- [ ] Do **not** put demo access code in email  
- [ ] Fill name + Devpost email on email draft  
- [ ] Stop product edits unless organizers ask  

**Contact line:** Kumori / NANOKAT
