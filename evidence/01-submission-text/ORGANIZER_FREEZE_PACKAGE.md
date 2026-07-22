# OpenAI Build Week — organizer freeze package (transparent)

**As of:** 2026-07-21 ~6:25 PM Pacific (PDT) / 2026-07-22 ~01:25 UTC  
**Official deadline (extended):** 2026-07-21 **8:00 PM PT** (site issues on organizer side)  
**Original deadline:** 2026-07-21 5:00 PM PT  

This package is what we are handing organizers **now**: the live product + evidence as frozen at this moment, with transparency about Devpost/site friction and our own late polish inside the **extended** window.

**Devpost lockup:** The operator believed the page had submitted; the UI locked up / hung and **did not actually submit** the prepared materials. Offline package is intentional. Operator is **okay with ~30 minutes of lateness** past the extended 8:00 PM PT deadline if needed for this complete delivery.

---

## Status snapshot (freeze)

| Item | Value |
|------|--------|
| **Live demo** | https://nanokat-forge-z4l33yvnfq-uc.a.run.app |
| **Health** | `GET /health` → `ok`, `model: qwen-plus`, `approvalGate: session-bound` |
| **Cloud Run revision (pinned 100%)** | `nanokat-forge-00005-bfp` |
| **Demo video** | https://youtu.be/xooMILR0bmU |
| **Public repo** | https://github.com/nanokataclysm/nanokat-forge |
| **Git tag (freeze)** | `buildweek-submit-freeze-*` on `main` (see `git tag -l 'buildweek-submit-freeze*'` ) |
| **Primary Codex session** | `019f6508-e856-7e80-bdc0-d132525a1a16` |
| **Supporting Codex session** | `019f7be3-39e0-7541-afc5-45074f72fb7f` |
| **Track** | Developer tools |
| **Team** | Kumori / NANOKAT |

Local evidence root: `evidence/START_HERE.md`

---

## Transparency — what went wrong on the way in

1. **Organizer / Devpost site issues** — deadline was extended to **8:00 PM PT**. We treat that extension as the authoritative cutoff for this package.
2. **Our Devpost submission was shut down / blocked** — we could not complete a clean in-platform submit the way we intended (uploads / form state / project shut down on our side of the flow). That is why this **offline / email-style record** exists.
3. **Upload friction** — video and large evidence were prepared offline; YouTube is public; zip packs live under `~/Documents/` and `evidence/`. Any missing binary on Devpost is an upload-path problem, not a missing product.
4. **Two demo hostnames** — Cloud Run URL above is the Build Week freeze target. `https://forge.nanokat.com` may still resolve to an older Alibaba Function Compute stack. **Please judge the Cloud Run URL** for this submission.
5. **Work after 5:00 PM PT, before 8:00 PM PT** — within the extended window we finished:
   - YouTube link wiring in docs  
   - Session-bound approval gate (cookie + plan digest + one-time nonce)  
   - Cloud Run redeploy of that gate (`00005-bfp`)  
   - Submission email / evidence packaging  

   We are **not** claiming silent post-**8pm** product churn in this freeze; this document freezes **now** (~6:25 PM PT, still inside the extended deadline).

6. **Honesty about process** — GPT-5.6 / Codex shaped architecture and code when available; **live inference is Qwen** on Cloud Run. We disclose that so the runtime is not misread as OpenAI.

---

## What the product is (as frozen)

Human-gated website planning:

1. Demo access code gates the API.  
2. Qwen returns a structured plan from a free-form brief.  
3. Human approval binds a short-lived **server session** (HttpOnly cookie + plan digest + one-time nonce).  
4. Preview is isolated HTML — no production deploy, no DNS change, no secret exposure.  
5. Client-only `approved: true` without a session is rejected.

---

## How to verify quickly

```bash
curl -sS https://nanokat-forge-z4l33yvnfq-uc.a.run.app/health
# expect: ok, qwen-plus, approvalGate: session-bound

# open video
# https://youtu.be/xooMILR0bmU

# clone / browse
# https://github.com/nanokataclysm/nanokat-forge
```

Demo access code is **not** in git; available via approved reviewer channel only.

---

## Artifacts for organizers

| Artifact | Location |
|----------|----------|
| This freeze note | `evidence/01-submission-text/ORGANIZER_FREEZE_PACKAGE.md` |
| Paste / form text | `evidence/01-submission-text/DEVPOST_PASTE.md` |
| JIC email (Chuck voice) | `evidence/01-submission-text/JIC_SUBMISSION_EMAIL.md` |
| Video | https://youtu.be/xooMILR0bmU · local `evidence/02-media/video/nanokat-forge-build-week-demo.mp4` |
| Thumbnail | `evidence/brand/forge-thumbnail.jpg` |
| Proof export | `evidence/03-proof/` |
| Start map | `evidence/START_HERE.md` |

---

## Operator ask

Please accept this freeze package as our submission record for the **extended 8:00 PM PT** deadline, given Devpost/site issues that prevented a normal in-platform completion. We will not continue product edits against this freeze unless you request a fix.

Contact: Kumori / NANOKAT (Devpost account email on file)
