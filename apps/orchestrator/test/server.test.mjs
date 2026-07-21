import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../server.mjs";

const DEMO_SECRET = "test-demo-secret-not-real";
const AUTH_HEADER = { "x-nanokat-demo-token": DEMO_SECRET };

/** @type {import('http').Server} */
let server;
/** @type {string} */
let baseUrl;

/** @type {{ createCalls: unknown[], failNext: boolean, responseContent: string | null }} */
const qwenState = {
  createCalls: [],
  failNext: false,
  responseContent: JSON.stringify({
    businessSummary: "Mock studio",
    archetype: "Craft",
    pages: ["Home", "About"],
    palette: { primary: "#111111", secondary: "#eeeeee", accent: "#333333" },
    motif: "Mock motif",
    approvalCheckpoints: ["human"],
    validationSteps: ["preview"],
    risks: ["none"],
  }),
};

const mockQwen = {
  chat: {
    completions: {
      async create(payload) {
        qwenState.createCalls.push(payload);
        if (qwenState.failNext) {
          qwenState.failNext = false;
          const error = new Error("mock upstream failure");
          error.status = 503;
          throw error;
        }
        return {
          choices: [
            {
              message: {
                content: qwenState.responseContent,
              },
            },
          ],
          usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
        };
      },
    },
  },
};

async function jsonRequest(method, path, { headers = {}, body } = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      ...(body !== undefined ? { "content-type": "application/json" } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { _raw: text };
  }

  return { status: response.status, json, text };
}

before(async () => {
  const app = createApp({
    demoSecret: DEMO_SECRET,
    model: "mock-qwen",
    qwen: mockQwen,
  });

  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (!server) return;
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe("GET /health", () => {
  it("returns ok without auth", async () => {
    const { status, json } = await jsonRequest("GET", "/health");
    assert.equal(status, 200);
    assert.equal(json.ok, true);
    assert.equal(json.service, "nanokat-forge-orchestrator");
    assert.equal(json.model, "mock-qwen");
  });
});

describe("POST /api/plan auth and validation", () => {
  it("rejects missing token", async () => {
    const { status, json } = await jsonRequest("POST", "/api/plan", {
      body: { brief: "A small bakery site" },
    });
    assert.equal(status, 401);
    assert.equal(json.ok, false);
    assert.equal(json.error, "Unauthorized");
  });

  it("rejects wrong token", async () => {
    const { status, json } = await jsonRequest("POST", "/api/plan", {
      headers: { "x-nanokat-demo-token": "wrong-token" },
      body: { brief: "A small bakery site" },
    });
    assert.equal(status, 401);
    assert.equal(json.ok, false);
  });

  it("returns 400 on empty brief", async () => {
    const { status, json } = await jsonRequest("POST", "/api/plan", {
      headers: AUTH_HEADER,
      body: { brief: "   " },
    });
    assert.equal(status, 400);
    assert.equal(json.ok, false);
    assert.match(json.error, /brief must contain/i);
  });

  it("returns 400 on oversized brief", async () => {
    const { status, json } = await jsonRequest("POST", "/api/plan", {
      headers: AUTH_HEADER,
      body: { brief: "x".repeat(8_001) },
    });
    assert.equal(status, 400);
    assert.equal(json.ok, false);
    assert.match(json.error, /8,000/i);
  });

  it("returns a plan via mocked Qwen without live network", async () => {
    qwenState.createCalls.length = 0;
    const { status, json } = await jsonRequest("POST", "/api/plan", {
      headers: AUTH_HEADER,
      body: { brief: "Pottery studio in Portland" },
    });
    assert.equal(status, 200);
    assert.equal(json.ok, true);
    assert.equal(json.model, "mock-qwen");
    assert.equal(json.plan.businessSummary, "Mock studio");
    assert.equal(qwenState.createCalls.length, 1);
  });
});

describe("POST /api/build-preview", () => {
  const validPlan = {
    businessName: "Moonlit Kiln",
    businessSummary: "Handmade ceramics",
    archetype: "Craft / artisan",
    motif: "Studio kiln",
    pages: ["Home", "Work", "About", "Contact"],
    palette: ["#9b4a35", "#f2eadf", "#202020"],
  };

  it("rejects missing token", async () => {
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      body: { approved: true, plan: validPlan },
    });
    assert.equal(status, 401);
    assert.equal(json.ok, false);
  });

  it("requires approved=true", async () => {
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      headers: AUTH_HEADER,
      body: { approved: false, plan: validPlan },
    });
    assert.equal(status, 409);
    assert.equal(json.ok, false);
    assert.match(json.error, /approval/i);
  });

  it("validates plan shape", async () => {
    const missing = await jsonRequest("POST", "/api/build-preview", {
      headers: AUTH_HEADER,
      body: { approved: true },
    });
    assert.equal(missing.status, 400);
    assert.match(missing.json.error, /valid approved plan/i);

    const arrayPlan = await jsonRequest("POST", "/api/build-preview", {
      headers: AUTH_HEADER,
      body: { approved: true, plan: ["not", "an", "object"] },
    });
    assert.equal(arrayPlan.status, 400);
  });

  it("builds preview for array palette", async () => {
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      headers: AUTH_HEADER,
      body: { approved: true, plan: validPlan },
    });
    assert.equal(status, 200);
    assert.equal(json.ok, true);
    assert.deepEqual(json.preview.palette, validPlan.palette);
    assert.equal(json.validation.productionMutation, false);
    assert.equal(json.validation.secretsAccessed, false);
  });

  it("uses hex values when palette is a Qwen-style object", async () => {
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      headers: AUTH_HEADER,
      body: {
        approved: true,
        plan: {
          ...validPlan,
          palette: {
            primary: "#aa5500",
            secondary: "#fff8f0",
            accent: "#101010",
          },
        },
      },
    });

    assert.equal(status, 200);
    assert.equal(json.ok, true);
    assert.deepEqual(json.preview.palette, [
      "#aa5500",
      "#fff8f0",
      "#101010",
    ]);
  });
});
