# Recommended Future Enhancements

- Full Supabase-backed admin CRUD for events, announcements, documents, and gallery (this build ships the schema, stub API routes, and UI shell).
- Real calendar view (month grid) alongside the current list view — a component like `react-day-picker` or a custom grid reading from the same `lib/events.ts` layer.
- Email notifications (e.g. via Resend) on new recruitment inquiries and volunteer signups.
- Automated Google Sheets sync (via a scheduled serverless function using the Google Sheets API) instead of manual CSV export, once leadership is comfortable granting read-only API access.
- Payment integration (Stripe or a Scout-friendly processor) for dues and event fees, replacing the external "[PAYMENT LINK]" placeholder.
- Searchable/filterable family resource library with tagging.
- A "recap story" builder for gallery events (title, date, photos, brief description, skills learned) as outlined in the brief.
- Multi-language support if the pack serves non-English-speaking families.
- Push/text reminders for upcoming events (opt-in) via a service like Twilio.
- Automated duplicate-event detection improvements in the CSV importer (fuzzy name+date matching).
