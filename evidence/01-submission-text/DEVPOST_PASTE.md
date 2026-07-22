# Devpost — OpenAI Build Week (paste map)

Your join/edit link (login required):  
https://devpost.com/software/1360607/joins/aXDk1YQ34intLMQNRBr7yg  

Challenge hub: https://openai.devpost.com/  
**Deadline:** Tuesday, July 21, 2026 · **5:00 PM PT**

This page is behind login from agents — map below matches **official Build Week requirements** + standard Devpost project fields.

---

## 1. Join the project first

1. Open the join URL while logged into **your** Devpost account.
2. Accept the team invitation if prompted.
3. Confirm you appear under **Team** on the project.
4. Then open **Edit project** / submission form for challenge **OpenAI Build Week**.

---

## 2. Field-by-field paste

### Project name

```
NANOKAT Forge
```

### Tagline (Devpost often caps ~60–120 chars)

```
Human-gated website plans with Qwen — approve before preview, no silent deploys
```

### “Built With” / technologies (add as tags)

```
openai
codex
gpt-5.6
qwen
alibaba-cloud
google-cloud-run
nodejs
express
javascript
```

### Elevator pitch / short summary (if separate from About)

```
NANOKAT Forge turns a messy small-business website brief into a structured plan and an isolated HTML preview. A human must approve before preview generation. Built with Codex and GPT-5.6 for architecture and implementation; live inference runs on Qwen (Alibaba Model Studio) on Google Cloud Run.
```

### About the project / detailed description  
*(paste into the main “About” / “Project Story” rich-text box)*

```
## Inspiration

Small-business site tools often jump from a prompt to “generated” output with no clear plan and no human gate. NANOKAT Forge is the opposite: structure the idea, show the plan, require approval, then render only an isolated preview.

## What it does

1. Demo access code gates the API.
2. User pastes a free-form brief (e.g. Austin pottery studio, four pages, warm palette).
3. Qwen returns a structured plan: summary, pages, palette, validation steps, risks.
4. Human reviews and must click Approve.
5. Scoped builder validates constraints and returns an isolated HTML preview + execution trace stating no production mutation.
6. Without approval → preview refused. Wrong token → unauthorized.

Live demo: https://nanokat-forge-z4l33yvnfq-uc.a.run.app  
Health: https://nanokat-forge-z4l33yvnfq-uc.a.run.app/health  

## How we built it (OpenAI Build Week)

- **GPT-5.6 (ChatGPT):** architecture, product scoping, human-approval design, safety boundaries, Codex handoffs, debugging guidance, evidence and submission planning.
- **Codex:** repository implementation and verification when usage was available (core orchestrator, tests, tooling).
- **Grok:** host ops on Ubuntu MBP, Cloud Run deploy, smoke tests, evidence packaging.
- **Qwen (qwen-plus via DashScope / Alibaba Model Studio):** live plan generation for the deployed demo.
- **Google Cloud Run:** public hosting (min instances 0).

We disclose the runtime honestly: OpenAI tools drove design and coding; Qwen is the live inference provider on the deployed service.

## Challenges

- Time-box: ship one vertical slice, not the full multi-agent Mission Society design.
- Model free-tier limits forced a switch from qwen3.7-plus to qwen-plus on Cloud Run.
- Trust model for signing/receipts designed but not over-claimed as shipped.

## Accomplishments

- Live Cloud Run demo with plan → approve → preview.
- Unit tests (mock Qwen) + live smoke evidence under `evidence/`.
- Narrated demo video under 3 minutes (no face cam).
- Clear responsibility split in README and submission materials.

## What we learned

Human gates and honest provider disclosure matter as much as model choice. A working kernel beats an unfinished multi-agent fiction.

## What's next

Server-side signed version packages (dev Ed25519 path designed), richer multi-agent Mission Society when it does not break the demo truth.
```

### Category / track *(required — pick one)*

**Recommended:**

```
Developer tools
```

Alternates if dropdown differs: “Work and productivity” only if they force three fixed tracks and dev tools is unavailable.

Official tracks: Apps for your life · Work and productivity · **Developer tools**.

### “Try it out” / Demo link

```
https://nanokat-forge-z4l33yvnfq-uc.a.run.app
```

### GitHub / code repository URL *(required)*

```
https://github.com/nanokataclysm/nanokat-forge
```

If the form asks for a branch:

```
feat/mission-society-runtime
```

Repo is **public**. If it is ever private again, share with  
`testing@devpost.com` and `build-week-event@openai.com`.

### Demo video *(required)*

**YouTube URL (public — paste into Devpost):**

```
https://youtu.be/xooMILR0bmU
```

- Length: under 3 minutes (~1:38).
- Covers the project and how **Codex** and **GPT-5.6** were used (process); live inference is **Qwen**.
- Local backup file:  
  `/home/nanokat/hack/nk-forge/evidence/02-media/video/nanokat-forge-build-week-demo.mp4`
- Thumbnail: `evidence/brand/forge-thumbnail.jpg`

**YouTube title:**

```
NANOKAT Forge — OpenAI Build Week Demo
```

**YouTube description (already on the video; keep consistent):**

```
NANOKAT Forge — human-gated website planning demo for OpenAI Build Week.

Live demo: https://nanokat-forge-z4l33yvnfq-uc.a.run.app
Repo: https://github.com/nanokataclysm/nanokat-forge
Video: https://youtu.be/xooMILR0bmU

How we used OpenAI:
• GPT-5.6 — architecture, safety, human-approval design, handoffs, submission planning
• Codex — repository implementation and verification when available

Live inference on the deployed service: Qwen (Alibaba Model Studio) on Google Cloud Run.

Narration: soft TTS (no face cam). Evidence: github.com/nanokataclysm/nanokat-forge (evidence/)
```

### Codex `/feedback` Session ID *(required by Build Week)*

```
019f6508-e856-7e80-bdc0-d132525a1a16
```

Supporting Forge troubleshooting session: `019f7be3-39e0-7541-afc5-45074f72fb7f`.

### Images / gallery

Upload from:

```
/home/nanokat/hack/nk-forge/evidence/archive/images/product-screenshots/
```

Prefer chronological `Screenshot_20260719_07*.png` and `Screenshot_20260720_*.png` as gallery covers.

### Custom question answers (if present)

**How did you use Codex and GPT-5.6?**

```
GPT-5.6 in ChatGPT scoped the vertical slice, designed the human approval boundary, reviewed safety, produced Codex handoffs, and guided deploy/debug and submission evidence. Codex implemented and verified repository code when available (Express orchestrator, plan/preview APIs, tests). The live demo’s plan generation uses Qwen on Cloud Run; we state that explicitly so judges are not misled about the runtime model.
```

**Is this a new project or extension?**

```
New focused hackathon vertical slice (NANOKAT Forge) developed during Build Week; related NANOKAT monorepo context exists separately but this submission is the Forge repo and Cloud Run demo.
```

---

## 3. Pre-submit checklist (Build Week)

- [ ] Project builds / demo URL loads (`/health` returns ok)
- [ ] Track selected: **Developer tools**
- [ ] Description pasted
- [x] **Public YouTube** https://youtu.be/xooMILR0bmU (&lt; 3 min; Codex + GPT-5.6 in narration)
- [x] Repo URL public https://github.com/nanokataclysm/nanokat-forge
- [ ] **Codex `/feedback` session ID** filled
- [ ] Team invites accepted on Devpost
- [ ] No secrets in description or screenshots
- [ ] Submit / save before **5:00 PM PT** July 21, 2026

---

## 4. Upload zip (optional extra materials)

```
~/Documents/NANOKAT-Forge-BuildWeek-upload-20260721.zip
```

Contains video, VO, screenshots, logs, exports — not required if Devpost only wants YouTube + repo, but useful offline.
