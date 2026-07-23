# Security & Privacy Notes

## Child safety principles baked into this build
- No child full names, photos-with-names, or contact info in any public page or public API response (see `types/index.ts` — `PackEvent` is the only type used on public pages; registration/inquiry types are server-only).
- Gallery captions must use first name + last initial at most, per the "Photo Gallery" requirements — enforce this in the admin gallery upload form in phase 2.
- Registration and recruitment data (medical info, emergency contacts, children's ages) lives in tables with **no public read policy at all** (see `docs/DATA_MODEL.md`), not just a "hidden" UI.

## Current state vs. what's still needed before launch
This deliverable ships the frontend, data shapes, and API route *stubs*.
Before real families submit real data, you still need to:
1. Stand up Supabase, run the SQL in `docs/DATA_MODEL.md`, and wire real reads/writes in place of the `console.log` stubs in `app/api/*/route.ts`.
2. Replace the placeholder cookie check in `middleware.ts` with real Supabase session verification, and add server-side role checks on every admin API route (not just the middleware).
3. Add server-side rate limiting on public forms (recruitment, volunteer, contact) in addition to the client-side honeypot field already in place.
4. Add a CAPTCHA or equivalent (e.g., Cloudflare Turnstile) if spam becomes a problem — the current honeypot is a first line of defense, not a complete one.
5. Draft and publish real Privacy Policy and Terms pages (`/privacy`, `/terms`) — a template alone isn't sufficient; have your council or a trusted adult review language about data collected from minors.
6. Store all API keys and Supabase credentials in environment variables (`.env.local`, see `.env.example`) — never commit them.
7. Confirm your Google Sheets import (`scripts/import-events.ts`) is run manually or via a scheduled job you control — don't grant the website itself standing write access to the Sheet.

## Ongoing practices
- Every admin action that touches registration or inquiry data should require authentication — never add a public API route that reads from `event_registrations`, `recruitment_inquiries`, or `volunteer_signups`.
- When exporting CSVs (attendee lists, emergency contacts) from the admin dashboard, treat the exported file itself as sensitive — it should never be emailed to a public list or posted anywhere public.
- Review the Google Sheet's sharing settings periodically; the import script only reads event content, never sharing/ownership metadata, and the site never surfaces who owns or can edit the source spreadsheet.
