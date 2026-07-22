import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { createApp } from "../server.mjs";
import { COOKIE_NAME } from "../lib/approval-session.mjs";

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

/**
 * @param {string} method
 * @param {string} path
 * @param {{ headers?: Record<string, string>, body?: unknown }} [opts]
 */
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

  const setCookie = response.headers.getSetCookie?.() ?? [];
  // Node fetch may expose getSetCookie; fall back to raw header
  const cookieHeader =
    setCookie.length > 0
      ? setCookie
      : response.headers.get("set-cookie")
        ? [response.headers.get("set-cookie")]
        : [];

  return { status: response.status, json, text, setCookie: cookieHeader };
}

/** Extract name=value pairs for Cookie request header from Set-Cookie list. */
function cookieJarFromSetCookie(setCookieList) {
  const pairs = [];
  for (const line of setCookieList) {
    if (!line) continue;
    const first = line.split(";")[0];
    if (first.includes("=")) pairs.push(first);
  }
  return pairs.join("; ");
}

async function approveSession(plan) {
  const { status, json, setCookie } = await jsonRequest("POST", "/api/approve", {
    headers: AUTH_HEADER,
    body: { plan },
  });
  assert.equal(status, 200, json?.error ?? "approve failed");
  assert.equal(json.ok, true);
  const cookie = cookieJarFromSetCookie(setCookie);
  assert.match(cookie, new RegExp(COOKIE_NAME));
  return { nonce: json.nonce, planDigest: json.planDigest, cookie };
}

before(async () => {
  const app = createApp({
    demoSecret: DEMO_SECRET,
    model: "mock-qwen",
    qwen: mockQwen,
    secureCookies: false,
  });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

describe("GET /health", () => {
  it("returns ok without auth and advertises session gate", async () => {
    const { status, json } = await jsonRequest("GET", "/health");
    assert.equal(status, 200);
    assert.equal(json.ok, true);
    assert.equal(json.service, "nanokat-forge-orchestrator");
    assert.equal(json.model, "mock-qwen");
    assert.equal(json.approvalGate, "session-bound");
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

describe("session-bound approval → build-preview", () => {
  const validPlan = {
    businessName: "Moonlit Kiln",
    businessSummary: "Handmade ceramics",
    archetype: "Craft / artisan",
    motif: "Studio kiln",
    pages: ["Home", "Work", "About", "Contact"],
    palette: ["#9b4a35", "#f2eadf", "#202020"],
  };

  it("rejects build-preview without approval session", async () => {
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      headers: AUTH_HEADER,
      body: { plan: validPlan, nonce: "nope" },
    });
    assert.equal(status, 401);
    assert.equal(json.ok, false);
    assert.match(json.error, /session/i);
  });

  it("rejects client-only approved:true without session", async () => {
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      headers: AUTH_HEADER,
      body: { approved: true, plan: validPlan },
    });
    assert.equal(status, 401);
    assert.match(json.error, /session|nonce/i);
  });

  it("approve + preview happy path", async () => {
    const session = await approveSession(validPlan);
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      headers: {
        ...AUTH_HEADER,
        cookie: session.cookie,
      },
      body: { plan: validPlan, nonce: session.nonce },
    });
    assert.equal(status, 200);
    assert.equal(json.ok, true);
    assert.equal(json.validation.sessionBound, true);
    assert.equal(json.validation.nonceConsumed, true);
    assert.deepEqual(json.preview.palette, validPlan.palette);
    assert.equal(json.planDigest, session.planDigest);
  });

  it("rejects changed plan after approve", async () => {
    const session = await approveSession(validPlan);
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      headers: {
        ...AUTH_HEADER,
        cookie: session.cookie,
      },
      body: {
        plan: { ...validPlan, businessName: "Evil Corp" },
        nonce: session.nonce,
      },
    });
    assert.equal(status, 409);
    assert.match(json.error, /digest/i);
  });

  it("rejects nonce replay", async () => {
    const session = await approveSession(validPlan);
    const first = await jsonRequest("POST", "/api/build-preview", {
      headers: {
        ...AUTH_HEADER,
        cookie: session.cookie,
      },
      body: { plan: validPlan, nonce: session.nonce },
    });
    assert.equal(first.status, 200);

    const second = await jsonRequest("POST", "/api/build-preview", {
      headers: {
        ...AUTH_HEADER,
        cookie: session.cookie,
      },
      body: { plan: validPlan, nonce: session.nonce },
    });
    assert.equal(second.status, 401);
  });

  it("uses hex values when palette is a Qwen-style object", async () => {
    const objectPlan = {
      ...validPlan,
      palette: {
        primary: "#aa5500",
        secondary: "#fff8f0",
        accent: "#101010",
      },
    };
    const session = await approveSession(objectPlan);
    const { status, json } = await jsonRequest("POST", "/api/build-preview", {
      headers: {
        ...AUTH_HEADER,
        cookie: session.cookie,
      },
      body: { plan: objectPlan, nonce: session.nonce },
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
