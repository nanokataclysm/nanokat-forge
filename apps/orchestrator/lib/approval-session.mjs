/**
 * Session-bound approval gate for NANOKAT Forge preview generation.
 *
 * Opaque server session + HttpOnly cookie binding:
 * - canonical plan digest (SHA-256 of stable JSON)
 * - short TTL
 * - one-time nonce (replay rejection)
 *
 * Does not touch Ed25519 issuer keys; signing remains a separate path.
 */

import crypto from "node:crypto";

export const COOKIE_NAME = "nf_approval_session";
export const DEFAULT_TTL_MS = 10 * 60 * 1000;

/**
 * Stable JSON for hashing: sort object keys recursively.
 * @param {unknown} value
 * @returns {string}
 */
export function canonicalJson(value) {
  return JSON.stringify(sortKeysDeep(value));
}

/**
 * @param {unknown} value
 * @returns {unknown}
 */
export function sortKeysDeep(value) {
  if (Array.isArray(value)) {
    return value.map(sortKeysDeep);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = sortKeysDeep(value[key]);
    }
    return out;
  }
  return value;
}

/**
 * @param {unknown} plan
 * @returns {string} hex sha256
 */
export function planDigest(plan) {
  return crypto.createHash("sha256").update(canonicalJson(plan)).digest("hex");
}

/**
 * @param {string | undefined} header
 * @returns {Record<string, string>}
 */
export function parseCookies(header) {
  const out = {};
  if (!header || typeof header !== "string") return out;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    const key = part.slice(0, index).trim();
    const raw = part.slice(index + 1).trim();
    if (!key) continue;
    try {
      out[key] = decodeURIComponent(raw);
    } catch {
      out[key] = raw;
    }
  }
  return out;
}

/**
 * @param {string} name
 * @param {string} value
 * @param {{ maxAgeSec: number, secure?: boolean }} opts
 */
export function buildSessionCookie(name, value, opts) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${Math.max(1, Math.floor(opts.maxAgeSec))}`,
  ];
  if (opts.secure) parts.push("Secure");
  return parts.join("; ");
}

/**
 * @param {string} name
 */
export function clearSessionCookie(name, secure = false) {
  const parts = [
    `${name}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

/**
 * In-memory approval session store (demo-scale).
 */
export function createApprovalStore(options = {}) {
  const ttlMs = options.ttlMs ?? DEFAULT_TTL_MS;
  /** @type {Map<string, { planDigest: string, nonce: string, expiresAt: number, used: boolean }>} */
  const sessions = options.sessions ?? new Map();

  function prune(now = Date.now()) {
    for (const [id, row] of sessions) {
      if (row.expiresAt <= now || row.used) {
        // keep used briefly? drop used and expired
        if (row.expiresAt <= now || row.used) sessions.delete(id);
      }
    }
  }

  /**
   * Create a session bound to a plan digest.
   * @param {unknown} plan
   */
  function create(plan) {
    prune();
    const digest = planDigest(plan);
    const sessionId = crypto.randomBytes(24).toString("base64url");
    const nonce = crypto.randomBytes(24).toString("base64url");
    const expiresAt = Date.now() + ttlMs;
    sessions.set(sessionId, {
      planDigest: digest,
      nonce,
      expiresAt,
      used: false,
    });
    return {
      sessionId,
      nonce,
      planDigest: digest,
      expiresAt,
      ttlMs,
    };
  }

  /**
   * Consume approval for preview: validates cookie session, digest, nonce; marks used.
   * @param {{ sessionId?: string, plan: unknown, nonce?: string }} input
   */
  function consume(input) {
    prune();
    const { sessionId, plan, nonce } = input;
    if (!sessionId || typeof sessionId !== "string") {
      return { ok: false, status: 401, error: "Approval session required" };
    }
    if (!nonce || typeof nonce !== "string") {
      return { ok: false, status: 401, error: "Approval nonce required" };
    }
    if (!plan || typeof plan !== "object" || Array.isArray(plan)) {
      return { ok: false, status: 400, error: "A valid approved plan is required" };
    }

    const row = sessions.get(sessionId);
    if (!row) {
      return { ok: false, status: 401, error: "Approval session missing or expired" };
    }
    if (row.expiresAt <= Date.now()) {
      sessions.delete(sessionId);
      return { ok: false, status: 401, error: "Approval session expired" };
    }
    if (row.used) {
      return { ok: false, status: 409, error: "Approval nonce already used" };
    }

    const digest = planDigest(plan);
    if (digest !== row.planDigest) {
      return {
        ok: false,
        status: 409,
        error: "Plan does not match approved session digest",
      };
    }
    if (nonce !== row.nonce) {
      return { ok: false, status: 401, error: "Invalid approval nonce" };
    }

    row.used = true;
    sessions.delete(sessionId);

    return { ok: true, planDigest: digest };
  }

  /** Test/helper: inspect store size */
  function size() {
    prune();
    return sessions.size;
  }

  /** Test helper: force-expire a session */
  function expire(sessionId) {
    const row = sessions.get(sessionId);
    if (row) row.expiresAt = Date.now() - 1;
  }

  return { create, consume, size, expire, ttlMs, COOKIE_NAME };
}
