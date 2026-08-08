// Small, dependency-free CORS handler.
// Returns true if the request was a preflight (OPTIONS) and has already
// been responded to - the caller should stop processing in that case.
export function applyCors(req, res) {
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || "*")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);

  const requestOrigin = req.headers.origin;
  const allowAll = allowedOrigins.length === 0 || allowedOrigins.includes("*");

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
    return true;
  }

  return false;
}
