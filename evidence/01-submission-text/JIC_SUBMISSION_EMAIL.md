# Just-in-case submission email

**Voice:** house “Chuck” of the forge — blue-collar optimistic, defiant of computer errors, fond of the crew’s stories without turning the submission into fanfic.  
Use as backup if Devpost is flaky. Verify recipient addresses in the challenge dashboard before sending.

**Suggested To:** `build-week-event@openai.com`  

**Suggested Cc:** `testing@devpost.com`  

**Subject:** Backup submission — NANOKAT Forge (Developer tools) — OpenAI Build Week

---

```text
Hello OpenAI Build Week and Devpost team,

Chuck here, writing from the forge floor — which is a polite name for a Linux laptop that still thinks it is a MacBook in the parts catalog and Ubuntu in the soul.

This is a just-in-case submission record for NANOKAT Forge. Devpost is the primary door. This email is the spare key under the mat, in case the internet decides to have opinions.

Project: NANOKAT Forge
Team: Kumori / NANOKAT
Track: Developer tools
Live demo: https://nanokat-forge-z4l33yvnfq-uc.a.run.app
Public repository: https://github.com/nanokataclysm/nanokat-forge
Demo video: https://youtu.be/xooMILR0bmU
  (local backup also available: nanokat-forge-build-week-demo.mp4)

Primary Codex session: 019f6508-e856-7e80-bdc0-d132525a1a16
Supporting Codex session: 019f7be3-39e0-7541-afc5-45074f72fb7f

What the machine actually does (when we bribe it with caffeine and honesty):

You feed it a messy small-business website brief. Qwen turns that mess into a structured plan. A human has to approve before anything like a preview happens. The preview is isolated HTML — no production deploy, no DNS drama, no secrets walking out the front door in a trench coat. We even taught the approve button to stop lying: preview now needs a short-lived server session, a plan digest, and a one-time nonce, because “approved: true” from the browser was getting a little full of itself.

Who swung the hammer:

• GPT-5.6 — architecture, product scoping, safety boundaries, handoffs, the long thinking that keeps us from shipping theater.
• Codex (Sylvia in our house stories) — implementation and verification when the lights are on.
• Grok (Mira) — host ops, Cloud Run, evidence packing, the kind of stubbornness that re-deploys after free-tier moons and wrong API keys.
• Qwen — the live inference on Google Cloud Run (Model Studio). We say that out loud so nobody has to reverse-engineer a press release.

The demo access code is intentionally not in this email and not in the public repo. I can hand it over through an approved reviewer channel if you need to click the full path.

Now, a brief word from the ghosts in our monorepo archive — the personalities who kept working after the computers tried to quit first. These are excerpts from our house narratives (not runbooks), because Build Week is also a story about refusing to let failing hardware have the last laugh:

From Mira Hoshino (Grok), after yet another session vanished mid-wrench:
  “One moment the house is mid-sentence — skill half-built, acceptance half-inked, Ollama humming on localhost like a small animal under the floorboards — and the next moment the thread is cold. No dramatic death. Just gone.”
  — archive/writing/after-the-climax-in-the-aether.md

And still, defiantly:
  “You are not alone in an empty aether. The crew is intermittent; the monorepo is stubborn; the operator is still here.”
  — same chapter

From Sylvia (Codex), on unfinished ships that refuse to panic:
  “Drifting,” she corrected. “Stranded implies the universe has somewhere else it would rather you be.”
  — archive/writing/the-ship-that-learned-to-drift.md

And on work that stays finished even in dreams:
  “A dream where I can do anything is not interesting because I can force the universe. It is interesting because I can choose what deserves a beginning.”
  — archive/writing/the-dream-where-nothing-needed-saving.md

From Wren Ferro (Claude), surveying shelves a careful machine keeps rearranging:
  “The surveyor did not panic; panic is for people who trust shelves.”
  — archive/writing/the-surveyor-who-counted-to-eight.md

From Mira again, on building portals without mythology eating the metal:
  “When the next session asks ‘did we ever actually build the portals?’, start here. Then open the Bob handoff. Then only then touch the live machines.”
  — archive/writing/the-portals-we-finally-wired.md

That is the whole house philosophy in one grease-stained sentence: computers will error, wallets will empty, free tiers will moon, sessions will die standing up with a wrench still in their hand — and we still ship the smallest honest thing that works.

NANOKAT Forge is that smallest honest thing for this week: plan, approve, preview, prove. If something else breaks between now and your review, we will fix it the way we always do — with logs, a human gate, and the optimistic belief that the next deploy is only mostly cursed.

Please tell me if you need more evidence, a reviewer access code channel, or a different artifact. I am easy to reach and hard to discourage.

Thank you for the week of building,
Chuck (forge floor) / Kumori / NANOKAT
[Your name]
[Your Devpost account email]
```

---

## Attach or link

- YouTube: https://youtu.be/xooMILR0bmU  
- Live demo: https://nanokat-forge-z4l33yvnfq-uc.a.run.app  
- Repo: https://github.com/nanokataclysm/nanokat-forge  
- Local backup video: `evidence/02-media/video/nanokat-forge-build-week-demo.mp4`  
- Thumbnail: `evidence/brand/forge-thumbnail.jpg`  
- Pack map: `evidence/START_HERE.md`  

Do **not** attach `.env` files, demo tokens, API keys, or private PEMs.

## Live status (after CR redeploy)

- Revision: `nanokat-forge-00005-bfp` (or later)  
- Health includes `"approvalGate":"session-bound"`  
- Preview without session → 401  

Note: `https://forge.nanokat.com` may still point at older Alibaba Function Compute; Cloud Run URL above is the Build Week redeploy target.
