import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  createApprovalStore,
  planDigest,
  parseCookies,
  buildSessionCookie,
  COOKIE_NAME,
} from "../lib/approval-session.mjs";

const plan = {
  businessName: "Moonlit Kiln",
  pages: ["Home", "About"],
  palette: ["#111", "#eee", "#222"],
};

describe("planDigest", () => {
  it("is stable under key reordering", () => {
    const a = planDigest({ b: 1, a: 2 });
    const b = planDigest({ a: 2, b: 1 });
    assert.equal(a, b);
  });

  it("changes when plan content changes", () => {
    const a = planDigest(plan);
    const b = planDigest({ ...plan, businessName: "Other" });
    assert.notEqual(a, b);
  });
});

describe("parseCookies / buildSessionCookie", () => {
  it("round-trips cookie header values", () => {
    const header = buildSessionCookie(COOKIE_NAME, "abc+/=", {
      maxAgeSec: 60,
      secure: false,
    });
    assert.match(header, /HttpOnly/);
    assert.match(header, /SameSite=Lax/);
    const parsed = parseCookies(header.split(";")[0]);
    // only name=value first segment for parseCookies of full Set-Cookie is odd;
    // parse typical Cookie request header:
    const requestHeader = `${COOKIE_NAME}=${encodeURIComponent("abc+/=")}`;
    assert.equal(parseCookies(requestHeader)[COOKIE_NAME], "abc+/=");
  });
});

describe("createApprovalStore", () => {
  it("rejects missing session", () => {
    const store = createApprovalStore();
    const result = store.consume({ plan, nonce: "x" });
    assert.equal(result.ok, false);
    assert.equal(result.status, 401);
  });

  it("accepts matching plan + nonce once", () => {
    const store = createApprovalStore();
    const created = store.create(plan);
    const first = store.consume({
      sessionId: created.sessionId,
      plan,
      nonce: created.nonce,
    });
    assert.equal(first.ok, true);
    assert.equal(first.planDigest, created.planDigest);

    const replay = store.consume({
      sessionId: created.sessionId,
      plan,
      nonce: created.nonce,
    });
    assert.equal(replay.ok, false);
    assert.match(replay.error, /missing or expired|already used/i);
  });

  it("rejects changed plan", () => {
    const store = createApprovalStore();
    const created = store.create(plan);
    const result = store.consume({
      sessionId: created.sessionId,
      plan: { ...plan, businessName: "Tampered" },
      nonce: created.nonce,
    });
    assert.equal(result.ok, false);
    assert.equal(result.status, 409);
    assert.match(result.error, /digest/i);
  });

  it("rejects expired session", () => {
    const store = createApprovalStore({ ttlMs: 60_000 });
    const created = store.create(plan);
    store.expire(created.sessionId);
    const result = store.consume({
      sessionId: created.sessionId,
      plan,
      nonce: created.nonce,
    });
    assert.equal(result.ok, false);
    assert.equal(result.status, 401);
    assert.match(result.error, /expired|missing/i);
  });

  it("rejects wrong nonce", () => {
    const store = createApprovalStore();
    const created = store.create(plan);
    const result = store.consume({
      sessionId: created.sessionId,
      plan,
      nonce: "not-the-nonce",
    });
    assert.equal(result.ok, false);
    assert.equal(result.status, 401);
  });
});
