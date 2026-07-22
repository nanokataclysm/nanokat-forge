# NANOKAT Forge — submission for organizers

**One place. One draft. No archive noise.**

| | |
|--|--|
| **Project** | NANOKAT Forge |
| **Team** | Kumori / NANOKAT |
| **Track** | Developer tools |
| **As of** | 2026-07-21, evening PT (extended deadline 8:00 PM PT) |
| **Git tag** | `buildweek-submit-freeze-20260722T012545Z` |
| **Repo commit** | `main` @ `bc725ef` or later on same freeze line |

---

## Please review these four links

1. **Live demo**  
   https://nanokat-forge-z4l33yvnfq-uc.a.run.app  

2. **Health** (expect `approvalGate: "session-bound"`)  
   https://nanokat-forge-z4l33yvnfq-uc.a.run.app/health  

3. **Demo video**  
   https://youtu.be/xooMILR0bmU  

4. **Source**  
   https://github.com/nanokataclysm/nanokat-forge  

**Do not use** `https://forge.nanokat.com` for judging — it may still point at an older Function Compute deploy. Use the **Cloud Run** URL above.

---

## What the project does

1. Enter a demo access code (not published in git).  
2. Paste a messy small-business website brief.  
3. **Qwen** returns a structured plan (pages, palette, risks, etc.).  
4. A human must approve. Approval is **session-bound** (HttpOnly cookie + plan digest + one-time nonce).  
5. Only then: isolated HTML preview — **no** production deploy, DNS change, or secret exposure.  

Client-only `approved: true` without a server session is **rejected**.

---

## How OpenAI tools were used (honest split)

| Tool | Role |
|------|------|
| **GPT-5.6** | Architecture, product scoping, safety, handoffs, submission planning |
| **Codex** | Implementation and verification when available |
| **Qwen** (`qwen-plus`) | **Live inference** on Cloud Run (Alibaba Model Studio) |
| **Grok** | Host ops, deploy, evidence packaging |

### Codex session IDs

- Primary: `019f6508-e856-7e80-bdc0-d132525a1a16`  
- Supporting: `019f7be3-39e0-7541-afc5-45074f72fb7f`  

---

## Why this is offline (not a jumbled Devpost form)

The official deadline was extended to **8:00 PM PT** for **site issues**.

On our side: the Devpost UI **appeared to submit**, then **locked up / hung**. It **did not actually submit** the materials we had prepared. We are therefore delivering this **clean offline package** instead of a half-broken form state.

We are comfortable with roughly **~30 minutes of lateness** past the extended deadline if that is what complete, non-broken delivery requires.

---

## Live freeze (what is pinned for review)

| Item | Value |
|------|--------|
| Cloud Run service | `nanokat-forge` · `us-central1` |
| Revision @ 100% traffic | **`nanokat-forge-00005-bfp`** |
| Model | `qwen-plus` |
| Approval gate | `session-bound` |

---

## Files in this folder

| File | Purpose |
|------|---------|
| **`00-READ-ME-FIRST.md`** | This document — start here |
| **`submission-email.txt`** | Plain-text email body to copy |
| **`thumbnail.jpg`** | Cover image (Nexus Dark) |
| **`demo-video.mp4`** | Same content as the YouTube video (local copy) |

Full repo evidence (optional deep dive): `../START_HERE.md`  
Everything else under `../` is internal packing history — **this folder is the curated face**.

---

## Access code

Not included. Available through an approved reviewer channel only.

---

## Contact

Kumori / NANOKAT  
(Devpost account email on the email body)

We will not keep redeploying against this freeze unless you request a change.
