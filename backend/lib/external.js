// Helpers for talking to third-party APIs (Frankfurter, Time.now):
// a fetch with a timeout + consistent error shape, and a small in-memory
// cache so repeated requests within the TTL don't hit the upstream again.

// ---------------------------------------------------------------------
// fetchJson - fetch() with a timeout and a predictable error type
// ---------------------------------------------------------------------
export class UpstreamError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = "UpstreamError";
    this.status = status;
  }
}

export async function fetchJson(url, { timeoutMs = 8000, ...options } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) {
      throw new UpstreamError(`Upstream request to ${new URL(url).host} failed with status ${response.status}`, 502);
    }
    return await response.json();
  } catch (err) {
    if (err.name === "AbortError") throw new UpstreamError(`Upstream request to ${new URL(url).host} timed out`, 504);
    if (err instanceof UpstreamError) throw err;
    throw new UpstreamError(`Upstream request to ${new URL(url).host} failed: ${err.message}`, 502);
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------
// cached - "run this loader, but only once per TTL per key"
// ---------------------------------------------------------------------
// Vercel functions run in short-lived containers, but a warm container
// serves many requests in a row - this Map survives across those calls
// and saves a round trip when the same data is asked for again soon
// after. It's a performance optimization only, never durable storage.
const store = new Map();

export async function cached(key, ttlMs, loader) {
  const entry = store.get(key);
  if (entry && Date.now() <= entry.expiresAt) {
    return { value: entry.value, cached: true };
  }

  const value = await loader();
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
  return { value, cached: false };
}
