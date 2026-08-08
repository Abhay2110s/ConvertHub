# ConvertHub Backend

Serverless API backend for ConvertHub, built for zero-config deployment on
**Vercel**. It has **no database and no authentication** by design — every
endpoint is a stateless, read-only `GET` that proxies/derives data from real
third-party sources:

- **Currency** — live exchange rates from [Frankfurter](https://frankfurter.dev)
  (European Central Bank reference rates, free, no API key).
- **Time** — live world clock data from [Time.now's World Time API](https://time.now/developer)
  (free, no API key), with an automatic fallback to a locally computed
  result (via Node's built-in IANA time zone database) if that service
  is ever unreachable, so the endpoint never hard-fails.

## Endpoints

All responses are JSON. All endpoints are `GET` and CORS-enabled.

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check. |
| `GET /api/currency/currencies` | List of supported currency codes → names. |
| `GET /api/currency/rates?base=USD` | Latest exchange rates for a base currency. |
| `GET /api/currency/convert?amount=100&from=USD&to=INR` | Convert an amount between two currencies. |
| `GET /api/time/current?timezone=Asia/Kolkata` | Current date/time in an IANA time zone. |
| `GET /api/time/timezones` | List of all valid IANA time zone names. |
| `GET /api/time/convert?dateTime=2026-08-08T10:00&from=Asia/Kolkata&to=America/New_York` | Convert a date/time between two time zones. |

### Example

```
GET /api/currency/convert?amount=100&from=USD&to=INR

{
  "amount": 100,
  "from": "USD",
  "to": "INR",
  "rate": 87.12,
  "result": 8712,
  "date": "2026-08-07"
}
```

```
GET /api/time/current?timezone=Asia/Kolkata

{
  "timezone": "Asia/Kolkata",
  "datetime": "2026-08-08T15:41:12+05:30",
  "utc_datetime": "2026-08-08T10:11:12.000Z",
  "unixtime": 1786270272,
  "utc_offset": "+05:30",
  "abbreviation": "IST",
  "dst": false,
  "source": "time.now"
}
```

Errors always look like:

```json
{ "error": { "message": "\"from\" must be a 3-letter currency code, e.g. USD.", "code": "BadRequestError" } }
```

## Project layout

```
backend/
  api/
    health.js
    currency/
      currencies.js
      rates.js
      convert.js
    time/
      current.js
      timezones.js
      convert.js
  lib/
    cors.js          # CORS headers + preflight handling
    cache.js          # best-effort in-memory TTL cache
    http.js            # fetch-with-timeout + upstream error handling
    rateLimit.js         # best-effort in-memory rate limiting
    handler.js             # shared wrapper: CORS + rate limit + errors
    currencyService.js       # Frankfurter integration
    timeService.js             # Time.now integration + Intl fallback
  server.js       # local-only HTTP server; imports api/**/*.js directly
  package.json
  vercel.json
```

Every route in `api/` is picked up by Vercel automatically as its own
serverless function in production — there's no framework/router to
configure there. `server.js` (used only for local dev, see below) is the
one exception: it's a thin adapter, not a route file, so Vercel ignores it.

## Local development

```bash
cd backend
npm install   # optional - only needed if you also want the `vercel` CLI
npm run dev
```

This starts `server.js`, a small zero-dependency Node HTTP server
(`http://localhost:3000` by default, override with `PORT=...`), e.g.
`http://localhost:3000/api/currency/rates?base=USD`.

**Important:** `server.js` is not a second copy of the API — it dynamically
imports and calls the exact same files under `api/` that Vercel runs in
production, after adding the two things Vercel's runtime normally provides
for you (`req.query` and `res.status()/.json()`). So there is only one
implementation of every route; local dev and production can't drift apart.
`npm run dev` uses `node --watch`, so it restarts automatically on save.

If you want to test against the actual Vercel runtime locally (closest to
production, useful for catching platform-specific quirks before deploying),
you can still do that instead:

```bash
npx vercel dev
# or: npm run dev:vercel
```

## Deploying to Vercel

This folder is a self-contained Vercel project.

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **New Project → Import** and set the project's **Root
   Directory** to `backend`.
3. No build command / output directory needed — Vercel detects the `api/`
   functions automatically. No environment variables are required to get
   started; the optional ones below only tighten CORS/rate limiting.
4. Deploy. Your API will be live at `https://<your-project>.vercel.app/api/...`.

### Environment variables (optional)

See `.env.example`. None of these are required to get started — every one
has a working default baked in, so the app runs with zero env vars set.

- `CURRENCY_API_BASE_URL` — base URL for the currency rates API (defaults
  to Frankfurter, `https://api.frankfurter.dev/v1`). Override to point at
  a self-hosted Frankfurter instance or a different provider.
- `TIME_API_BASE_URL` — base URL for the world time API (defaults to
  Time.now, `https://time.now/developer/api`). Override to point at a
  different provider.
- `ALLOWED_ORIGINS` — comma-separated list of origins allowed to call the
  API (defaults to `*`). Set this to your deployed frontend's URL(s) once
  you know them, e.g. `https://converthub.vercel.app,http://localhost:5173`.
- `RATE_LIMIT_PER_MINUTE` — best-effort per-IP request cap per function
  instance (defaults to `60`).

## Connecting the frontend

Set an environment variable in the **frontend** project pointing at this
backend's deployed URL, e.g. in `frontend/.env`:

```
VITE_API_BASE_URL=https://<your-backend-project>.vercel.app
```

Then call it with `fetch`/`axios`, e.g.:

```js
const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/currency/convert?amount=100&from=USD&to=INR`);
const data = await res.json();
```

If you deploy the frontend and backend as **two separate Vercel projects**
(recommended, since this backend has no build step), make sure to set
`ALLOWED_ORIGINS` on the backend to the frontend's real domain before going
to production.

## Notes on the "no database, no auth" constraint

- Nothing here is user-specific or needs to persist between requests, so a
  database was never necessary — the in-memory cache (`lib/cache.js`) is
  just a performance optimization, not storage.
- Because there's no auth, every endpoint is public and read-only by
  design; don't add any endpoint that writes/mutates data without adding
  proper authentication first.
- The in-memory cache and rate limiter are **per serverless instance**,
  not shared/global. That's a known, accepted limitation of a
  database-free deployment. If you outgrow it, swap `lib/cache.js` and
  `lib/rateLimit.js` for something like Vercel KV/Upstash Redis without
  touching any route file.
