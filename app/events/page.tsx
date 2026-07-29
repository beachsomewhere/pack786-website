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
        Prefer a calendar app? Downloadable .ics and Google/Apple/Outlook add-to-calendar links are
        available on each event's page.
      </p>
    </div>
  );
}
