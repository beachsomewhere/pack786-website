import type { Metadata } from "next";
import EventCard from "@/components/EventCard";
import { getAllEvents } from "@/lib/events";
import EventFilters from "./EventFilters";

export const metadata: Metadata = { title: "Events" };

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const all = await getAllEvents();
  const categories = Array.from(new Set(all.map((e) => e.category)));
  const filtered = searchParams.category
    ? all.filter((e) => e.category === searchParams.category)
    : all;

  const upcoming = filtered.filter((e) => e.status !== "Completed" && e.status !== "Canceled");
  const past = filtered.filter((e) => e.status === "Completed");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow">What's Happening</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">Pack 786 Events</h1>

      <div id="subscribe" className="mt-6 card bg-trail-blue/5 scroll-mt-24">
        <p className="font-display font-bold text-trail-blue">Subscribe to Pack 786's Calendar</p>
        <p className="mt-1 text-sm text-trail-ink/70">
          Add this once and every event automatically stays up to date in your own calendar app — if a
          date, time, or location changes, you'll see it without having to re-add anything.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <a href="webcal://pack786.com/calendar.ics" className="btn-primary">Subscribe (Apple/Outlook)</a>
          <a
            href="https://pack786.com/calendar.ics"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
          >
            Copy feed URL for Google Calendar
          </a>
        </div>
        <p className="mt-2 text-xs text-trail-ink/50">
          In Google Calendar: Other calendars (+) → From URL → paste the link above.
        </p>
      </div>

      <EventFilters categories={categories} active={searchParams.category} />

      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold text-trail-blue">Upcoming</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {upcoming.map((event) => <EventCard key={event.slug} event={event} />)}
          {upcoming.length === 0 && <p className="text-trail-ink/60">No upcoming events in this category yet.</p>}
        </div>
      </section>

      <div className="trail-divider" />

      <section>
        <h2 className="font-display text-2xl font-bold text-trail-blue">Past Events Archive</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          {past.map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      </section>

      <p className="mt-10 text-xs text-trail-ink/50">
        Only want one event instead of the full calendar? Each event's page has its own one-time
        Google/Apple/Outlook add-to-calendar links — those won't update automatically if details change.
      </p>
    </div>
  );
}
