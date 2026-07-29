import { getAllEvents } from "@/lib/events";

// This page sits behind middleware.ts, which currently checks only for a
// placeholder cookie. Do not treat this as production-ready access control —
// wire real Supabase auth + role checks before launch (see docs/SECURITY.md).

export default async function AdminDashboard() {
  const events = await getAllEvents();
  const upcoming = events.filter((e) => e.status !== "Completed" && e.status !== "Canceled");
  const tentative = events.filter((e) => e.status === "Tentative");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-trail-blue">Pack 786 Admin Dashboard</h1>
      <p className="mt-1 text-sm text-trail-ink/60">
        Concept dashboard — wire to Supabase for live data, auth, and role-based permissions.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Total events" value={events.length} />
        <Stat label="Upcoming / active" value={upcoming.length} />
        <Stat label="Tentative (needs confirmation)" value={tentative.length} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Section title="Calendar Import">
          <ul className="list-disc space-y-1 pl-5 text-sm text-trail-ink/70">
            <li>Import events from a CSV exported from Google Sheets</li>
            <li>Preview events before publishing</li>
            <li>Flag possible duplicate events</li>
            <li>Publish, save as draft, or ignore each row</li>
            <li>Edit imported details before publishing</li>
          </ul>
          <a href="/admin/import" className="btn-secondary mt-4 inline-flex">Go to Import Tool</a>
        </Section>

        <Section title="Program Year">
          <p className="text-sm text-trail-ink/70">
            Active program year: <strong>2026–2027</strong>. Admins can designate a new program year as
            active once ready, without deleting the prior schedule — past years move to Archived.
          </p>
        </Section>

        <Section title="Form Submissions">
          <p className="text-sm text-trail-ink/70">
            View Contact, Volunteer, and Recruitment form submissions (also notified to Discord in
            real time). Children's personal details are never exposed publicly.
          </p>
        </Section>

        <Section title="Roles">
          <ul className="space-y-2 text-sm text-trail-ink/70">
            <li><strong>Site Administrator</strong> — full access: users, roles, all content, exports, settings.</li>
            <li><strong>Pack Leader</strong> — manage events, announcements, resources, gallery, recruitment inquiries.</li>
            <li><strong>Event Coordinator</strong> — manage volunteer signups for assigned events only.</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="card">
      <p className="text-3xl font-display font-bold text-trail-blue">{value}</p>
      <p className="text-sm text-trail-ink/60">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <p className="font-display font-bold text-trail-blue">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
