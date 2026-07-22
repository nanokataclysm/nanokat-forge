# Organizer email — freeze record + exactly what we have now

**Send this** (or use with the freeze-only email).  
**As of:** 2026-07-21 ~6:27 PM PT · **Extended deadline:** 8:00 PM PT  

**To:** `build-week-event@openai.com`  
**Cc:** `testing@devpost.com`  
**Subject:** NANOKAT Forge — full submission package (freeze + current state; Devpost/site issues)

---

```text
Hello OpenAI Build Week and Devpost team,

I am sending both:

  (A) a freeze / transparency record for the extended deadline, and
  (B) exactly what we have right now — live demo, video, repo tag, and evidence inventory.

Your side extended the deadline to 8:00 PM PT because of site issues. On our side, our Devpost submission was shut down / blocked before a normal in-platform complete submit and upload. This message is the offline package for that situation.

========== A) FREEZE / TIMING ==========

As of: 2026-07-21 approximately 6:27 PM Pacific (PDT)
Extended deadline: 2026-07-21 8:00 PM PT
Original deadline: 2026-07-21 5:00 PM PT

Git freeze tag: buildweek-submit-freeze-20260722T012545Z
GitHub (public): https://github.com/nanokataclysm/nanokat-forge
Commit on main at freeze packaging: 50fa5bd (and follow-up freeze docs on main)

Cloud Run service: nanokat-forge (us-central1)
Revision pinned 100%: nanokat-forge-00005-bfp
Live demo (please judge this URL):
  https://nanokat-forge-z4l33yvnfq-uc.a.run.app

Health (live):
  https://nanokat-forge-z4l33yvnfq-uc.a.run.app/health
  Currently returns: ok, model qwen-plus, approvalGate session-bound

Demo video (public YouTube):
  https://youtu.be/xooMILR0bmU

Note: https://forge.nanokat.com may still point at an older Alibaba Function Compute
deployment (health shows qwen3.7-plus). Please use the Cloud Run URL above for this package.

========== B) EXACTLY WHAT WE HAVE NOW ==========

Product:
- Human-gated website plan + isolated HTML preview
- Qwen generates the plan (Alibaba Model Studio on Cloud Run)
- Human approval is session-bound (HttpOnly cookie + plan digest + one-time nonce)
- Client-only approved:true without a session is rejected
- No production site deploy, DNS change, or secrets in the preview path

Tooling disclosure:
- GPT-5.6: architecture, scoping, safety, handoffs, submission planning
- Codex: implementation/verification when available
  Primary session: 019f6508-e856-7e80-bdc0-d132525a1a16
  Supporting session: 019f7be3-39e0-7541-afc5-45074f72fb7f
- Grok: host ops, Cloud Run, evidence packaging
- Live inference: Qwen (qwen-plus), not OpenAI as the runtime model

Repo evidence (clone or browse):
- evidence/WHAT_WE_HAVE_NOW.md          full inventory
- evidence/FREEZE.md                   one-page pin
- evidence/START_HERE.md               map
- evidence/01-submission-text/         all paste + organizer docs
- evidence/02-media/video/             local MP4 + soft VO
- evidence/brand/forge-thumbnail.jpg   cover art
- evidence/03-proof/                   health + scrubbed session export

Offline zip on our side (can re-send on request):
  NANOKAT-Forge-FREEZE-PACKAGE-20260721.zip
  NANOKAT-Forge-WHAT-WE-HAVE-NOW.zip

========== TRANSPARENCY ==========

1. Deadline extended to 8:00 PM PT for organizer site issues.
2. Our Devpost project was shut down / incomplete for normal upload — offline package is intentional.
3. Work after 5:00 PM PT and before this freeze (~6:27 PM PT) is included as the state we are delivering under the extension (session-bound gate, CR 00005, docs, packaging).
4. We are not making further product deploys against this freeze unless you request a fix.
5. Demo access code is not in git or this email; available via approved reviewer channel.

Track: Developer tools
Team: Kumori / NANOKAT

Please confirm if this freeze package + current inventory is acceptable as our submission record, or tell us what else you need.

Thank you,
Kumori / NANOKAT
[Your name]
[Your Devpost account email]
```

Do not attach secrets, `.env`, or private PEMs.
