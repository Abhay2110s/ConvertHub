// Thin wrapper around global fetch (available natively in the Vercel
// Node.js 18+ runtime, no dependency needed) with a timeout and a
// consistent error shape for upstream API calls.

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
      throw new UpstreamError(
        `Upstream request to ${new URL(url).host} failed with status ${response.status}`,
        502
      );
    }
    return await response.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new UpstreamError(`Upstream request to ${new URL(url).host} timed out`, 504);
    }
    if (err instanceof UpstreamError) throw err;
    throw new UpstreamError(`Upstream request to ${new URL(url).host} failed: ${err.message}`, 502);
  } finally {
    clearTimeout(timer);
  }
}
