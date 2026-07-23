import Link from "next/link";
import type { PackEvent } from "@/types";

const STATUS_STYLES: Record<string, string> = {
  Confirmed: "bg-trail-green/10 text-trail-green-dark",
  "Registration Open": "bg-trail-green/10 text-trail-green-dark",
  Tentative: "bg-trail-gold/20 text-trail-gold-dark",
  Draft: "bg-trail-line text-trail-ink/60",
  Postponed: "bg-trail-gold/20 text-trail-gold-dark",
  Canceled: "bg-red-100 text-red-700",
  Completed: "bg-trail-line text-trail-ink/60",
  "Registration Closed": "bg-trail-line text-trail-ink/60",
};

export default function EventCard({ event }: { event: PackEvent }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="card flex flex-col gap-2 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="eyebrow">{event.category}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[event.status] ?? "bg-trail-line"}`}>
          {event.status}
        </span>
      </div>
      <h3 className="font-display text-xl font-bold text-trail-blue">{event.name}</h3>
      <p className="text-sm text-trail-ink/70">
        {event.dateLabel}
        {event.startTime ? ` · ${event.startTime}${event.endTime ? `–${event.endTime}` : ""}` : ""}
      </p>
      {event.location && <p className="text-sm text-trail-ink/70">📍 {event.location}</p>}
      {event.status === "Tentative" && (
        <p className="text-xs font-medium text-trail-gold-dark">Date or details subject to change</p>
      )}
    </Link>
  );
}
