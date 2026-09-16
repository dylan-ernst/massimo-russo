# Massimo Russo

Website for Australian pianist Massimo Russo. The site is React + TypeScript (Vite) on GitHub Pages; all content (text, photos, videos, schedule) lives in Sanity, and Massimo edits it in Sanity Studio.

Content changes go live without a rebuild: the site reads published content from Sanity's CDN when a page loads.

## First-time setup

Prerequisites: Node 22 (`nvm use` picks it up from `.nvmrc`) and a Sanity account.

```bash
nvm install 22 && nvm use

# Website
cd web && npm install

# Studio
cd ../studio && npm install
```

Connect Sanity (once the project exists):

```bash
cd studio
npx sanity login
npx sanity init --env          # or create the project at sanity.io/manage
cp .env.example .env           # fill in SANITY_STUDIO_PROJECT_ID
npx sanity dataset visibility set production public
npx sanity cors add http://127.0.0.1:5173 --no-credentials
npm run seed                   # uploads the starting content from studio/seed
```

Then `cp web/.env.example web/.env` and set `VITE_SANITY_PROJECT_ID` to the same id.

## Running

```bash
# Website at http://127.0.0.1:5173
cd web && npm run dev

# Studio at http://localhost:3333
cd studio && npm run dev
```

Without `VITE_SANITY_PROJECT_ID`, `npm run dev` shows the seed content from `studio/seed` so the site can be worked on offline. Production builds never include it.

Other commands:

| Command | Where | What it does |
|---|---|---|
| `npm run build` | `web/` | Typecheck and build the site into `web/dist` |
| `npx oxlint` | `web/` | Lint the site |
| `npm run build` | `studio/` | Build the Studio |
| `npm run deploy` | `studio/` | Publish the Studio to `<name>.sanity.studio` |
| `npm run seed` | `studio/` | Replace dataset content with `studio/seed/content.ts` |

## Deploying

Pushing to `main` builds `web/` and publishes it to GitHub Pages (`.github/workflows/deploy.yml`). Set repository variables `SANITY_PROJECT_ID` (and optionally `SANITY_DATASET`) first. When the custom domain is added, also run `npx sanity cors add https://<domain> --no-credentials`.

## Structure

| File | What it does | State |
|---|---|---|
| `web/src/App.tsx` | Routes and the shared nav/footer layout | Done |
| `web/src/pages/` | Home, Biography, Gallery, Contact, 404 | Done |
| `web/src/components/` | Nav (with phone menu), Footer, PageHero, Reveal, SocialLinks, icons, loading/error state | Done |
| `web/src/content/` | Types, GROQ queries, Sanity fetch with per-visit cache, dev seed preview | Done |
| `web/src/lib/` | Image sizing and focal points, event sorting/formatting, YouTube ids, reveal and parallax | Done |
| `web/src/styles/` | Design tokens, global styles, buttons | Done |
| `studio/schemaTypes/` | Content model: site settings, page singletons, performances | Done |
| `studio/structure.ts` | Studio sidebar: one entry per page plus the schedule list | Done |
| `studio/seed/` | Starting content from the design, optimised photos, import script | Done, UNSW logo missing |
| `.github/workflows/deploy.yml` | Build and publish the site to GitHub Pages | Ready, needs repo variables |
| Schedule page | Full list of performances (`/schedule`) | Not built yet, currently 404s |
