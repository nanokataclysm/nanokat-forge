#!/usr/bin/env node
/**
 * CLI smoke against a running Forge (local or Cloud Run).
 * Loads DEMO_SHARED_SECRET from env or apps/orchestrator/.env.cloudrun.local
 * Never prints secrets.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base =
  process.env.FORGE_URL?.replace(/\/$/, "") ||
  "https://nanokat-forge-z4l33yvnfq-uc.a.run.app";

function loadSecret() {
  if (process.env.DEMO_SHARED_SECRET) return process.env.DEMO_SHARED_SECRET;
  const candidates = [
    path.join(__dirname, "../.env.cloudrun.local"),
    path.join(__dirname, "../../../.env.cloudrun.local"),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      if (line.startsWith("DEMO_SHARED_SECRET=")) {
        return line.slice("DEMO_SHARED_SECRET=".length).trim();
      }
    }
  }
  throw new Error("DEMO_SHARED_SECRET not set and no .env.cloudrun.local found");
}

async function main() {
  const secret = loadSecret();
  console.log("base:", base);

  const health = await fetch(`${base}/health`).then((r) => r.json());
  console.log("health:", health);
  if (!health.ok) process.exit(1);

  const planRes = await fetch(`${base}/api/plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-nanokat-demo-token": secret,
    },
    body: JSON.stringify({
      brief:
        "Smoke test studio: handmade goods in Austin. Pages Home, Work, About, Contact. Warm earthy palette.",
    }),
  });
  const planBody = await planRes.json();
  console.log("plan status:", planRes.status, "ok:", planBody.ok, "model:", planBody.model);
  if (!planRes.ok || !planBody.plan) {
    console.error("plan failed:", planBody.error || planBody);
    process.exit(1);
  }

  const prevRes = await fetch(`${base}/api/build-preview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-nanokat-demo-token": secret,
    },
    body: JSON.stringify({ approved: true, plan: planBody.plan }),
  });
  const prevBody = await prevRes.json();
  console.log(
    "preview status:",
    prevRes.status,
    "ok:",
    prevBody.ok,
    "palette:",
    prevBody.preview?.palette,
  );
  if (!prevRes.ok) process.exit(1);

  const deny = await fetch(`${base}/api/build-preview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-nanokat-demo-token": secret,
    },
    body: JSON.stringify({ approved: false, plan: planBody.plan }),
  });
  console.log("deny status (expect 409):", deny.status);

  const unauth = await fetch(`${base}/api/plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-nanokat-demo-token": "wrong",
    },
    body: JSON.stringify({ brief: "x" }),
  });
  console.log("unauth status (expect 401):", unauth.status);

  console.log("SMOKE_OK");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
