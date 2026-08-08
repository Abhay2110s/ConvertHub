// Everything that happens to a request BEFORE and AFTER your route logic
// runs lives in this one file: CORS, rate limiting, and error formatting.
//
// Every route file (api/**/*.js) is wrapped in withApi(), which handles:
//   1. CORS headers + OPTIONS preflight
//   2. Rejecting anything that isn't GET
//   3. A best-effort per-IP rate limit
//   4. Catching errors and turning them into a consistent JSON response
//
// That means route files only ever need to write the "happy path".

// Throw this from a service/route when the request itself is invalid
// (bad query params, missing fields, etc). withApi() turns it into a 400.
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
}

// ---------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------
// Every response is public, non-sensitive data with no cookies/auth, so
// allowing "*" is fine by default. Set ALLOWED_ORIGINS to lock it down.
function applyCors(req, res) {
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  const allowAll = allowedOrigins.length === 0 || allowedOrigins.includes("*");
  const requestOrigin = req.headers.origin;

  if (allowAll) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin);
    res.setHeader("Vary", "Origin");
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true; // preflight handled, stop here
  }
  return false;
}

// ---------------------------------------------------------------------
// Rate limiting
// ---------------------------------------------------------------------
// Simple in-memory counter, one bucket per IP per 60-second window.
// NOTE: on Vercel each warm container has its own memory, so this caps
// abuse per-container rather than globally. That's an accepted trade-off
// for a project with no database - swap in Vercel KV/Upstash if you ever
// need a true global limit.
const requestCounts = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;

function isRateLimited(req) {
  const limit = Number(process.env.RATE_LIMIT_PER_MINUTE || 60);
  if (!limit || limit <= 0) return false;

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  const windowKey = `${ip}:${Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS)}`;

  const count = (requestCounts.get(windowKey) || 0) + 1;
  requestCounts.set(windowKey, count);

  // Keep the map from growing forever - drop old windows once in a while.
  if (requestCounts.size > 5000) {
    const currentWindow = Math.floor(Date.now() / RATE_LIMIT_WINDOW_MS);
    for (const key of requestCounts.keys()) {
      if (Number(key.split(":").pop()) < currentWindow) requestCounts.delete(key);
    }
  }

  return count > limit;
}

// ---------------------------------------------------------------------
// The wrapper every route uses
// ---------------------------------------------------------------------
export function withApi(routeHandler) {
  return async function wrappedHandler(req, res) {
    if (applyCors(req, res)) return; // preflight already answered

    if (req.method !== "GET") {
      res.status(405).json({ error: { message: "Method not allowed", code: "METHOD_NOT_ALLOWED" } });
      return;
    }

    if (isRateLimited(req)) {
      res.status(429).json({ error: { message: "Too many requests, please slow down.", code: "RATE_LIMITED" } });
      return;
    }

    try {
      await routeHandler(req, res);
    } catch (err) {
      const status = err.status || 500;
      if (status >= 500) console.error(`[api-error] ${req.url}:`, err);
      res.status(status).json({
        error: { message: err.message || "Something went wrong", code: err.name || "INTERNAL_ERROR" }
      });
    }
  };
}
