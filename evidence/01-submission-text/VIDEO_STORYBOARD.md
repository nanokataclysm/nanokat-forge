# Video storyboard & script — NANOKAT Forge

**Target length:** 2:00–2:45 (hard cap **3:00**)  
**Format:** screen recording + optional face/voice; 1080p; quiet room  
**Demo URL:** https://nanokat-forge-z4l33yvnfq-uc.a.run.app  
**Access:** demo code (operator only — do not put the secret on-screen longer than needed; blur if exporting public cuts)

**Tone:** calm, precise, slightly warm. No hype. No “AI built everything.”

---

## On-screen cast

| Element | Source |
|---------|--------|
| Live Forge UI | Cloud Run URL |
| Optional CLI proof | Terminal: `curl …/health` or `npm run smoke` (token not shown) |
| Optional stills | `evidence/archive/images/product-screenshots/` if live UI glitches |
| B-roll (optional) | `Screenshot_20260719_07*` early UI; `Screenshot_20260720_*` mid arc |

---

## Shot list (timed)

| # | Time | Visual | Action |
|---|------|--------|--------|
| 0 | 0:00–0:08 | Title card or browser tab | Show “NANOKAT Forge” + Cloud Run badge |
| 1 | 0:08–0:20 | `/health` in browser or terminal | Prove live service + **Qwen / Model Studio** |
| 2 | 0:20–0:35 | Intake panel | Enter access code (cut/blur if needed), paste short brief |
| 3 | 0:35–1:05 | Plan generation | Click **Plan**; wait for cards (summary, pages, palette, risks) |
| 4 | 1:05–1:25 | Approval | Scroll plan; click **Approve** — say why the human gate matters |
| 5 | 1:25–1:50 | Preview | Isolated preview + execution trace (“no production mutation”) |
| 6 | 1:50–2:05 | Negative path (fast) | Revise/restart or show deny: no approve → no build |
| 7 | 2:05–2:25 | Responsibility split | One slide or spoken only: GPT architecture · Codex impl · **Qwen runtime** · Grok ops |
| 8 | 2:25–2:45 | Close | One-liner + URL; “signed packages next / not claimed today” |

If short on time, **drop shot 6 and 7 visuals** — keep them spoken only.

---

## Spoken script (≈145 seconds)

### [0:00] Cold open
“This is NANOKAT Forge — a human-gated website planning demo built during OpenAI Build Week.”

### [0:08] Live proof
“It’s running on Google Cloud Run. Health check shows Alibaba Model Studio as the provider, and Qwen as the live model — not an offline stub.”

### [0:20] Brief
“I give it a messy small-business brief. Loose notes are fine. The system structures them.”

*(Paste something like: Austin pottery studio, four pages, warm palette, no ecommerce.)*

### [0:35] Plan
“Qwen returns a structured plan: business summary, pages, palette, validation steps, and risks. Nothing is deployed yet.”

### [1:05] Human gate
“Consequential work waits for me. I approve only when the plan is acceptable. Without approval, the preview endpoint refuses.”

### [1:25] Preview
“After approval, a scoped builder validates constraints and renders an isolated HTML preview. No production DNS, no secret access, no site push.”

### [1:50] Honesty
“GPT-5.6 helped architecture and safety. Codex implements in-repo when available. Grok handled host deploy and verification. **Qwen powers the live inference path.**”

### [2:10] Boundary
“We’re not claiming multi-agent Mission Society or cryptographic package signing as shipped today — those are the next vertical slice. What you see is the working kernel: plan, approve, preview, prove.”

### [2:30] Close
“NANOKAT Forge: create something useful, know how it was made, and keep a human on the consequential step. Link in the description.”

---

## B-roll mapping (if live UI is slow)

| Beat | Still from `evidence/archive/images/product-screenshots/` |
|------|-------------------------------------|
| Early UI | `Screenshot_20260719_071117.png` … `071405.png` |
| Mid iteration | `Screenshot_20260720_021557.png`, `035030.png` |
| Late / dense | `Screenshot_20260720_210203.png`, `Screenshot_20260721_182755.png` |
| Avoid as primary | Informal names (`terrible.png`, `whyeven.png`) unless joking cut |

---

## Recording checklist

- [ ] Incognito or clean profile (no unrelated tabs)
- [ ] Zoom UI to readable (110–125%)
- [ ] Demo token not left in a screenshot for public repo cuts
- [ ] Captions optional; speech clear
- [ ] Export MP4 H.264 under 3 minutes
- [x] Filename: `evidence/02-media/video/nanokat-forge-build-week-demo.mp4`
- [ ] Upload link + this storyboard referenced in submission form

---

## One-line description for the form

> Human-gated Qwen website planner on Cloud Run: brief → structured plan → approve → isolated preview; GPT/Codex for architecture and implementation; Qwen for live inference.
