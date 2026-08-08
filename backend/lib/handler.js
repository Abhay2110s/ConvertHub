import { applyCors } from "./cors.js";
import { isRateLimited } from "./rateLimit.js";
import { UpstreamError } from "./http.js";

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.status = 400;
  }
}

// Wraps a GET-only serverless function with:
// - CORS handling (incl. OPTIONS preflight)
// - a basic method guard
// - a best-effort rate limit
// - consistent JSON error responses
export function withApi(fn) {
  return async function apiHandler(req, res) {
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
      await fn(req, res);
    } catch (err) {
      const status = err.status || (err instanceof UpstreamError ? err.status : 500);
      const code = err.name || "INTERNAL_ERROR";
      if (status >= 500) {
        // eslint-disable-next-line no-console
        console.error(`[api-error] ${req.url}:`, err);
      }
      res.status(status).json({
        error: {
          message: err.message || "Something went wrong",
          code
        }
      });
    }
  };
}
