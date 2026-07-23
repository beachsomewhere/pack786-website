import type { PackEvent } from "@/types";

function parseStartEnd(event: PackEvent): { start: Date; end: Date } | null {
  const firstDate = event.date?.split("/")[0];
  if (!firstDate) return null;
  const start = new Date(`${firstDate}T${to24h(event.startTime) ?? "18:00"}:00`);
  const end = new Date(`${firstDate}T${to24h(event.endTime) ?? to24h(event.startTime) ?? "19:00"}:00`);
  if (isNaN(start.getTime())) return null;
  return { start, end: end > start ? end : new Date(start.getTime() + 60 * 60 * 1000) };
}

function to24h(time?: string): string | undefined {
  if (!time) return undefined;
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return undefined;
  let [, h, m, ap] = match;
  let hour = parseInt(h, 10);
  if (ap.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (ap.toUpperCase() === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${m}`;
}

function fmt(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildGoogleCalendarUrl(event: PackEvent): string {
  const range = parseStartEnd(event);
  if (!range) return "#";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.name,
    dates: `${fmt(range.start)}/${fmt(range.end)}`,
    details: event.description ?? "",
    location: event.location ?? "",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildOutlookUrl(event: PackEvent): string {
  const range = parseStartEnd(event);
  if (!range) return "#";
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.name,
    startdt: range.start.toISOString(),
    enddt: range.end.toISOString(),
    body: event.description ?? "",
    location: event.location ?? "",
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function buildIcsDataUrl(event: PackEvent): string {
  const range = parseStartEnd(event);
  const start = range ? fmt(range.start) : "";
  const end = range ? fmt(range.end) : "";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pack 786//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@pack786`,
    start && `DTSTART:${start}`,
    end && `DTEND:${end}`,
    `SUMMARY:${event.name}`,
    `LOCATION:${event.location ?? ""}`,
    `DESCRIPTION:${(event.description ?? "").replace(/\n/g, "\\n")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}
