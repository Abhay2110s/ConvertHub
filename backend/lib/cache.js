// Best-effort in-memory cache.
//
// Vercel serverless functions run in short-lived containers, but a warm
// container can serve many requests in a row - this module-level Map
// survives across those invocations and saves a round trip to the
// upstream API when the same data is requested again within its TTL.
// It is intentionally NOT a database: nothing here needs to be durable,
// it just softens bursts of traffic and upstream rate limits.

const store = new Map();

export function cacheGet(key) {
  const entry = store.get(key);
  if (!entry) return undefined;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return undefined;
  }
  return entry.value;
}

export function cacheSet(key, value, ttlMs) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}

export async function cached(key, ttlMs, loader) {
  const existing = cacheGet(key);
  if (existing !== undefined) return { value: existing, cached: true };
  const value = await loader();
  cacheSet(key, value, ttlMs);
  return { value, cached: false };
}
