// Best-effort, in-memory, fixed-window rate limiter.
//
// IMPORTANT: this is intentionally simple because the project may not
// use a database. On Vercel each serverless function can run in
// multiple concurrent containers, so this limit is per-container, not
// global - it will not perfectly stop abuse, but it does protect a
// single warm container (and the upstream APIs it calls) from being
// hammered by a runaway client/loop. Good enough with no DB; swap in
// Vercel KV/Upstash Redis here if you ever add persistent storage.

const hits = new Map();
const WINDOW_MS = 60_000;

export function isRateLimited(req) {
  const limit = Number(process.env.RATE_LIMIT_PER_MINUTE || 60);
  if (!limit || limit <= 0) return false;

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const key = `${ip}:${Math.floor(Date.now() / WINDOW_MS)}`;
  const count = (hits.get(key) || 0) + 1;
  hits.set(key, count);

  // Opportunistically clear old windows so the map doesn't grow forever.
  if (hits.size > 5000) {
    const currentWindow = Math.floor(Date.now() / WINDOW_MS);
    for (const k of hits.keys()) {
      const windowPart = Number(k.split(":").pop());
      if (windowPart < currentWindow) hits.delete(k);
    }
  }

  return count > limit;
}
