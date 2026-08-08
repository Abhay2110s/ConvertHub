// Local development server.
//
// This is NOT used by Vercel in production - Vercel auto-discovers every
// file under `api/` and runs each one as its own serverless function,
// with `req.query` already parsed and `res.status()/.json()` already
// attached by its Node.js runtime.
//
// Running the *same* handler files locally with plain `node` therefore
// needs a tiny compatibility shim that reproduces those two things. That
// way `api/**/*.js` stays the single source of truth - nothing about a
// route is duplicated between local dev and production, so behavior
// can't drift between the two.
//
// Usage:
//   npm run dev        -> node --watch server.js   (auto-restarts on save)
//   npm start           -> node server.js
//
// No Vercel CLI, account, or network login required for this path.

import http from "node:http";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_DIR = path.join(__dirname, "api");
const PORT = Number(process.env.PORT) || 3000;

// Mirrors Vercel's req.query shape: a single string per key, or an
// array of strings if the same key appears more than once.
function buildQuery(searchParams) {
  const query = {};
  for (const key of new Set(searchParams.keys())) {
    const values = searchParams.getAll(key);
    query[key] = values.length > 1 ? values : values[0];
  }
  return query;
}

// Mirrors the .status()/.json() helpers Vercel's Node runtime adds to
// the response object, so route files don't need to know which
// environment they're running in.
function enhanceResponse(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    if (!res.hasHeader("Content-Type")) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(JSON.stringify(body));
    return res;
  };
  return res;
}

// Maps a request path to its handler file, e.g.
// /api/currency/convert -> api/currency/convert.js
async function resolveHandler(pathname) {
  if (!pathname.startsWith("/api/")) return null;

  const relative = pathname.slice("/api/".length).replace(/\/+$/, "");
  if (!relative) return null;

  const filePath = path.normalize(path.join(API_DIR, `${relative}.js`));
  if (!filePath.startsWith(API_DIR + path.sep)) return null; // block path traversal

  try {
    const mod = await import(pathToFileURL(filePath).href);
    return typeof mod.default === "function" ? mod.default : null;
  } catch (err) {
    if (err.code === "ERR_MODULE_NOT_FOUND") return null;
    throw err;
  }
}

const server = http.createServer(async (req, res) => {
  enhanceResponse(res);

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  req.query = buildQuery(url.searchParams);

  if (url.pathname === "/" || url.pathname === "/api") {
    res.status(200).json({
      service: "converthub-backend",
      status: "ok",
      routes: [
        "/api/health",
        "/api/currency/currencies",
        "/api/currency/rates?base=USD",
        "/api/currency/convert?amount=100&from=USD&to=INR",
        "/api/time/current?timezone=Asia/Kolkata",
        "/api/time/timezones",
        "/api/time/convert?dateTime=2026-08-08T10:00&from=Asia/Kolkata&to=America/New_York"
      ]
    });
    return;
  }

  try {
    const handler = await resolveHandler(url.pathname);
    if (!handler) {
      res.status(404).json({ error: { message: `No route for ${url.pathname}`, code: "NOT_FOUND" } });
      return;
    }
    await handler(req, res);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[server] unhandled error on ${url.pathname}:`, err);
    if (!res.headersSent) {
      res.status(500).json({ error: { message: "Internal server error", code: "INTERNAL_ERROR" } });
    }
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`ConvertHub backend running at http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Try:   http://localhost:${PORT}/api/health`);
});
