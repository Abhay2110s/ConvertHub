# ConvertHub

A multi-category conversion and calculation tool. Live currency and world-time
data comes from the `backend/` API; everything else (unit, date, everyday,
and the rest of finance) is calculated client-side in `frontend/`.

```
ConvertHub/
  frontend/   React + Vite app (see frontend/README.md)
  backend/    Serverless API on Vercel, no DB/auth (see backend/README.md)
```

## Deploying to Vercel

This is **two separate Vercel projects** sharing one repo - `frontend` has
no build step for the backend and `backend` has no build step at all, so
splitting them keeps each deploy simple and fast.

### 1. Deploy the backend first

1. Vercel → **New Project → Import** this repo, set **Root Directory** to `backend`.
2. No env vars are required to get started (see `backend/.env.example` for
   the optional ones). Deploy.
3. Copy the resulting URL, e.g. `https://converthub-backend.vercel.app`.

### 2. Deploy the frontend

1. Vercel → **New Project → Import** the same repo again, set **Root
   Directory** to `frontend`. Vercel auto-detects Vite (build: `vite build`,
   output: `dist`).
2. Before deploying, add an environment variable:
   `VITE_API_BASE_URL` = the backend URL from step 1 (no trailing slash).
   This **must** be set in the dashboard - the committed `frontend/.env` is
   a localhost-only default for local dev and is gitignored on purpose.
3. Deploy.

### 3. Lock down CORS (recommended, not required)

By default the backend's `ALLOWED_ORIGINS` is `*`, which is fine for public,
read-only data but is worth tightening once you know the frontend's real
domain: on the **backend** project, set
`ALLOWED_ORIGINS=https://<your-frontend-project>.vercel.app` and redeploy.

### Notes

- `frontend/vercel.json` adds a rewrite so client-side routes (e.g.
  `/calculator/length`) don't 404 on direct load/refresh - React Router
  needs this on any static host.
- If `frontend/.env` was already pushed to git before this was gitignored,
  remove it from tracking once (`git rm --cached frontend/.env`) so future
  commits don't reintroduce a localhost URL into the repo.
