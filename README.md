# Botswana Agricultural Intelligence System - Railway deploy

This folder is a self-contained, deploy-ready package for the field data platform. It serves the single-page app over a tiny zero-dependency Node server (no database, no build step). User data is stored in each visitor's browser (localStorage), so a hosted copy is a perfect shareable demo.

Files: `index.html` (the app), `server.js` (static host on `process.env.PORT`), `package.json`, `railway.json` (Nixpacks + healthcheck at `/healthz`).

## Option A - Railway CLI (fastest, ~2 minutes)

Run these from inside this `railway-deploy` folder on your computer:

```bash
npm i -g @railway/cli      # install the CLI (once)
railway login              # opens your browser to authenticate
railway init               # create a new project (give it a name)
railway up                 # uploads this folder and deploys it
railway domain             # generate a public https URL
```

`railway up` reads `railway.json`, runs `npm start`, and exposes the app. `railway domain` prints the live URL to share.

## Option B - GitHub + Railway dashboard (no terminal)

1. Put this folder in a GitHub repo (new repo, then upload these files).
2. At https://railway.com, click **New Project -> Deploy from GitHub repo** and pick the repo.
3. Railway auto-detects Node, runs `npm start`, and deploys.
4. Under the service **Settings -> Networking**, click **Generate Domain** for a public URL.

## Notes

- No environment variables are required.
- Node 18+ (set in `package.json` engines).
- Health check: `GET /healthz` returns `ok`.
- To update the deployed app later, replace `index.html` with the latest build and re-run `railway up` (Option A) or push to GitHub (Option B).
