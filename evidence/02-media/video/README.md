# Demo video assets (no face cam)

Soft female narration via **Microsoft Edge TTS** voice **`en-US-JennyNeural`**  
(rate −8%, pitch −2 Hz — calmer / closer to a default assistant tone).

| File | Role |
|------|------|
| **`nanokat-forge-build-week-demo.mp4`** | Ready cut (~1:38): evidence screenshots + full VO |
| **`narration-jenny.mp3`** | Full voiceover only (use under live screen capture if preferred) |
| **`narration-jenny.vtt`** | Subtitles |
| **`narration.txt`** | Script source |
| **`segments/*.mp3`** | Per-beat clips for re-edit |

## Regenerate

```bash
cd /home/nanokat/hack/nk-forge
.venv-tts/bin/edge-tts --voice en-US-JennyNeural --rate=-8% --pitch=-2Hz \
  --file evidence/02-media/video/narration.txt \
  --write-media evidence/02-media/video/narration-jenny.mp3
```

## Submission tip

Judges prefer a **live UI** pass if you have 10 minutes: play `narration-jenny.mp3` while you click through Cloud Run, then swap the slideshow video. This MP4 is a complete fallback with no camera.
