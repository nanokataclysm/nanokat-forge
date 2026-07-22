# Organizer email — freeze package (extended deadline + site issues)

**As of freeze:** 2026-07-21 ~6:25 PM PT (inside extended 8:00 PM PT window)  
**Git tag:** `buildweek-submit-freeze-20260722T012545Z`  
**Cloud Run:** `nanokat-forge-00005-bfp` @ 100% traffic  

**Suggested To:** `build-week-event@openai.com`  
**Suggested Cc:** `testing@devpost.com`  
**Subject:** NANOKAT Forge — freeze package after Devpost/site issues (extended 8pm PT deadline)

---

```text
Hello OpenAI Build Week and Devpost team,

I am writing with a transparent freeze package for NANOKAT Forge.

Your side extended the deadline to 8:00 PM PT because of site issues. On our side, our Devpost submission flow was shut down / blocked before we could complete a normal in-platform submit and upload path. This email is the offline submission record for what we have frozen now—merged product + evidence as of ~6:25 PM PT on 2026-07-21—still inside the extended window. The timestamps below are meant to reflect that freeze moment, not to hide later work after 8:00 PM PT.

Project: NANOKAT Forge
Team: Kumori / NANOKAT
Track: Developer tools

Live demo (please use this URL):
https://nanokat-forge-z4l33yvnfq-uc.a.run.app

Health check (expect approvalGate: session-bound):
https://nanokat-forge-z4l33yvnfq-uc.a.run.app/health

Demo video (public YouTube):
https://youtu.be/xooMILR0bmU

Public repository:
https://github.com/nanokataclysm/nanokat-forge

Git freeze tag:
buildweek-submit-freeze-20260722T012545Z

Cloud Run revision pinned at freeze:
nanokat-forge-00005-bfp (100% traffic)

Primary Codex session:
019f6508-e856-7e80-bdc0-d132525a1a16

Supporting Codex session:
019f7be3-39e0-7541-afc5-45074f72fb7f

What it does:
NANOKAT Forge turns an unstructured small-business website brief into a structured plan and an isolated HTML preview. Qwen generates the plan. A human must approve; approval is bound to a short-lived server session (HttpOnly cookie + plan digest + one-time nonce) before preview generation. The preview path does not deploy a production site, change DNS, or expose secrets.

Disclosure of tools:
GPT-5.6 supported architecture, product scoping, safety boundaries, handoffs, and submission planning. Codex contributed repository implementation and verification. Grok assisted with host ops, Cloud Run, and evidence packaging. Live inference is Qwen (Alibaba Model Studio) on Google Cloud Run.

Transparency notes:
1. Original deadline 5:00 PM PT; extended to 8:00 PM PT for organizer site issues.
2. Our Devpost project submission was shut down / incomplete for upload—hence this freeze package.
3. Work between 5:00 and ~6:25 PM PT (YouTube link docs, session-bound approval gate, CR redeploy, packaging) is included intentionally as the state we are freezing under the extended deadline.
4. Please judge the Cloud Run URL above. forge.nanokat.com may still point at an older Function Compute deployment and is not the freeze target.
5. Demo access code is not in git or this email; available via approved reviewer channel.

Evidence map in the repo:
evidence/START_HERE.md
evidence/01-submission-text/ORGANIZER_FREEZE_PACKAGE.md
evidence/01-submission-text/DEVPOST_PASTE.md
evidence/02-media/video/nanokat-forge-build-week-demo.mp4
evidence/brand/forge-thumbnail.jpg
evidence/03-proof/

I am not making further product edits against this freeze unless you request a fix. Thank you for the extension and for any guidance on reopening or accepting this offline record.

Best regards,
Kumori / NANOKAT
[Your name]
[Your Devpost account email]
```

---

Do not attach secrets, `.env`, or private PEMs.
