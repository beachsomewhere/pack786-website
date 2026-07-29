# Pack 786 Website — Sitemap

## Public pages
- `/` — Home
- `/about` — About Pack 786 (mission, dens, leadership)
- `/join` — Join Pack 786 (FAQ, costs, recruitment form)
- `/events` — Events list (calendar/list view, filters, archive)
- `/events/[slug]` — Individual event detail
- `/families` — Family resource library
- `/volunteer` — Volunteer opportunities + interest form
- `/gallery` — Photo gallery & pack stories
- `/contact` — Contact form, leadership contacts, map
- `/privacy` — Privacy policy (to be drafted with counsel/council guidance)
- `/terms` — Website terms

## Admin (protected, behind `middleware.ts` + Supabase Auth in phase 2)
- `/admin/login`
- `/admin` — Dashboard overview
- `/admin/import` — Google Sheets CSV calendar import
- `/admin/events` — Event CRUD (to be built alongside Supabase wiring)
- `/admin/announcements`
- `/admin/documents`
- `/admin/gallery`
- `/admin/volunteers`

## User experience notes
**Prospective families** land on `/`, get the pitch in the hero + "What We Do," see a
real upcoming event, and have two clear next steps: `Join Pack 786` or
`View Upcoming Events`. `/join` answers the FAQ a nervous first-time parent has
before they ever have to fill out a form.

**Current families** bookmark `/events` and `/families`. Navigation puts
"Families" and "Events" one click from anywhere, and event detail pages carry
everything needed for a single event (packing list, cost, RSVP, calendar
export) so a parent never has to hunt across pages.
