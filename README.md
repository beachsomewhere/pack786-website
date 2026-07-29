# Cub Scout Pack 786 Website

A Next.js + TypeScript + Tailwind site for recruiting new families and
supporting current Pack 786 families with event info, volunteer
coordination, and resources.

## Start here
- `docs/SITEMAP.md` — full page list + UX notes for each audience
- `docs/DATA_MODEL.md` — data models + Supabase SQL schema
- `docs/SECURITY.md` — privacy/child-safety measures and what's still needed before launch
- `docs/SETUP.md` — install, run, deploy, and calendar import instructions
- `docs/INFO_NEEDED.md` — checklist of real info Pack 786 leaders need to supply
- `docs/FUTURE_ENHANCEMENTS.md` — recommended next steps

## What's real vs. placeholder in this build
**Real / functional now:**
- All public pages, navigation, and content structure
- The full event system, reading from `data/events.json` (imported from the
  pack's current planning sheet) through a swappable `lib/events.ts` layer
- Recruitment, volunteer, and contact forms, posting to Next.js API route
  stubs with a honeypot + Cloudflare Turnstile spam/bot check, and notifying
  Discord in real time
- Calendar export (Google Calendar, Outlook, .ics) per event
- A CSV import script (`scripts/import-events.ts`) mapping Google Sheets
  exports into the event schema
- An admin dashboard shell with role definitions, gated by placeholder
  middleware

**Needs phase 2 (Supabase) to go live:**
- Persisting form submissions (currently logged server-side only)
- Real authentication for `/admin/*`
- Document/gallery uploads
- Live CSV import → publish workflow

See `docs/SETUP.md` for exactly how to wire Supabase in without touching the
public-facing pages.

## Quick start
```bash
npm install
npm run dev
```
