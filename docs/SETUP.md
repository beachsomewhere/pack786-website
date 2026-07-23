# Setup & Deployment

## Local development
```bash
npm install
cp .env.example .env.local   # fill in values once Supabase is set up (optional for now)
npm run dev                  # http://localhost:3000
```
The site runs and looks complete without Supabase — event/content pages read
from `data/events.json`. Forms will submit to the stub API routes and log to
the server console rather than persisting anywhere, until phase 2 is wired up.

## Adding Supabase (phase 2)
1. Create a free project at supabase.com.
2. In the SQL editor, run the schema in `docs/DATA_MODEL.md`.
3. Copy your project URL and anon key into `.env.local`.
4. Replace the `console.log` stubs in `app/api/recruitment/route.ts` and
   `app/api/volunteer/route.ts` with real Supabase inserts.
5. Replace `lib/events.ts`'s `getAllEvents()` body with a Supabase query —
   every page that imports from `lib/events.ts` will keep working unchanged.
6. Wire `middleware.ts` and `/admin/login` to Supabase Auth.

## Deployment
Recommended: [Vercel](https://vercel.com) (built for Next.js).
1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add the same environment variables from `.env.local` in Vercel's project settings.
4. Deploy — Vercel builds and hosts automatically on every push to `main`.

## Importing the calendar
```bash
npm run import-events -- path/to/google-sheets-export.csv
```
This writes `data/events.import.json` for review — it never overwrites
`data/events.json` automatically. Once Supabase is wired up, this becomes the
`/admin/import` flow instead of a manual script.

## Updating content without touching code
- **Events**: edit `data/events.json` directly for now (or use `/admin/import` once Supabase is connected).
- **Documents, gallery photos, announcements**: placeholder UI only in this deliverable — build out `/admin/documents`, `/admin/gallery`, `/admin/announcements` alongside Supabase Storage once ready.
