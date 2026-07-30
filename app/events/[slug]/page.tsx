import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllEvents, getEventBySlug } from "@/lib/events";
import { buildGoogleCalendarUrl, buildIcsDataUrl, buildOutlookUrl } from "@/lib/calendar";

export async function generateStaticParams() {
  const events = await getAllEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow">{event.category}</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">{event.name}</h1>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-trail-blue/10 px-3 py-1 text-sm font-semibold text-trail-blue">
          {event.status}
        </span>
        {event.status === "Tentative" && (
          <span className="text-sm font-medium text-trail-gold-dark">Date or details subject to change</span>
        )}
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <Detail label="Date">{event.dateLabel}</Detail>
        {event.startTime && <Detail label="Time">{event.startTime}{event.endTime ? `–${event.endTime}` : ""}</Detail>}
        {event.location && <Detail label="Location">{event.location}</Detail>}
        {event.cost && <Detail label="Cost">{event.cost}</Detail>}
        {event.audience && <Detail label="Who May Attend">{event.audience}</Detail>}
        {event.den && <Detail label="Den">{event.den}</Detail>}
        {event.organizer && <Detail label="Organizer">{event.organizer}</Detail>}
        {event.registrationDeadline && <Detail label="Registration Deadline">{event.registrationDeadline}</Detail>}
      </dl>

      {event.description && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-bold text-trail-blue">Details</h2>
          <p className="mt-2 text-trail-ink/80">{event.description}</p>
        </div>
      )}

      {event.notes && <p className="mt-4 text-sm text-trail-ink/60">{event.notes}</p>}

      {event.packingList && event.packingList.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-bold text-trail-blue">What to Bring</h2>
          <ul className="mt-2 list-disc pl-5 text-trail-ink/80">
            {event.packingList.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {event.registrationLink && (
          <a href={event.registrationLink} className="btn-primary">RSVP / Register</a>
        )}
        {event.volunteerNeeds && (
          <a href="/volunteer" className="btn-secondary">Sign Up to Volunteer</a>
        )}
      </div>

      <div className="trail-divider" />

      <div>
        <h2 className="font-display text-lg font-bold text-trail-blue">Add to Calendar</h2>
        <p className="mt-1 text-xs text-trail-ink/50">
          Already subscribed to our{" "}
          <Link href="/events#subscribe" className="underline">
            full pack calendar
          </Link>
          ? This event is already there — adding it here creates a separate, duplicate entry that won't
          update if details change.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a className="underline" href={buildGoogleCalendarUrl(event)} target="_blank" rel="noreferrer">Google Calendar</a>
          <a className="underline" href={buildOutlookUrl(event)} target="_blank" rel="noreferrer">Outlook</a>
          <a className="underline" href={buildIcsDataUrl(event)} download={`${event.slug}.ics`}>Apple Calendar (.ics)</a>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-trail-ink/50">{label}</dt>
      <dd className="text-trail-ink/80">{children}</dd>
    </div>
  );
}
