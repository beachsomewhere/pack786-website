import type { PackEvent, ProgramYear } from "@/types";
import eventsData from "@/data/events.json";

// ---------------------------------------------------------------------------
// This file is the ONLY place that knows where event data lives. Today that's
// a static JSON file (data/events.json). To move to Supabase later:
//   1. Create a Postgres `events` table matching the PackEvent shape.
//   2. Replace the body of getAllEvents() with a `supabase.from('events').select()`.
//   3. Leave every function signature the same — no page/component changes needed.
// ---------------------------------------------------------------------------

const ACTIVE_PROGRAM_YEAR: ProgramYear = "2026-2027"; // admin-toggleable setting in phase 2

// Whether an event is upcoming or past is decided by its DATE, not by someone
// remembering to flip its status to "Completed" — otherwise every event whose
// status was never updated sits in "Upcoming" forever. Status only overrides
// the date in the two cases where it carries information the date doesn't:
// "Completed" (explicitly done) and "Canceled" (never happened, so it belongs
// in neither list).
const PACK_TIMEZONE = "America/Denver";

/** Today's date in the pack's own timezone as "YYYY-MM-DD", so events don't
 *  drop off "Upcoming" hours early just because the server clock runs in UTC. */
function todayInPackTimezone(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PACK_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Last day an event runs. Multi-day events store a range ("2026-06-19/2026-06-21"),
 *  and a range is only past once its final day is. Returns "" for TBD events. */
export function getEventEndDate(event: PackEvent): string {
  const parts = (event.date ?? "").split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
}

/** Sort key: TBD events (no date yet) sort to the end of the upcoming list. */
function sortKey(event: PackEvent): string {
  return event.date || "9999";
}

export function isCanceledEvent(event: PackEvent): boolean {
  return event.status === "Canceled";
}

/** Past = explicitly Completed, or its last day is already behind us.
 *  An event with no date yet ("TBD; March") is never past. */
export function isPastEvent(event: PackEvent, today: string = todayInPackTimezone()): boolean {
  if (event.status === "Completed") return true;
  const endDate = getEventEndDate(event);
  return endDate !== "" && endDate < today;
}

export function isUpcomingEvent(event: PackEvent, today: string = todayInPackTimezone()): boolean {
  return !isCanceledEvent(event) && !isPastEvent(event, today);
}

/** Splits any event list into the two buckets the events page and home page
 *  render, so they can't drift apart. Canceled events land in neither. */
export function splitUpcomingAndPast(events: PackEvent[]): { upcoming: PackEvent[]; past: PackEvent[] } {
  const today = todayInPackTimezone();
  return {
    upcoming: events
      .filter((e) => isUpcomingEvent(e, today))
      .sort((a, b) => sortKey(a).localeCompare(sortKey(b))),
    past: events
      .filter((e) => !isCanceledEvent(e) && isPastEvent(e, today))
      .sort((a, b) => (b.date || "").localeCompare(a.date || "")),
  };
}

export async function getAllEvents(): Promise<PackEvent[]> {
  return eventsData as PackEvent[];
}

export async function getActiveProgramYearEvents(): Promise<PackEvent[]> {
  const all = await getAllEvents();
  return all.filter((e) => e.programYear === ACTIVE_PROGRAM_YEAR);
}

export async function getUpcomingEvents(limit?: number): Promise<PackEvent[]> {
  const all = await getAllEvents();
  const { upcoming } = splitUpcomingAndPast(all);
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export async function getFeaturedEvents(): Promise<PackEvent[]> {
  const upcoming = await getUpcomingEvents();
  return upcoming.filter((e) => e.featured);
}

export async function getPastEvents(): Promise<PackEvent[]> {
  const all = await getAllEvents();
  const { past } = splitUpcomingAndPast(all);
  return past;
}

export async function getEventBySlug(slug: string): Promise<PackEvent | undefined> {
  const all = await getAllEvents();
  return all.find((e) => e.slug === slug);
}

export async function getEventCategories(): Promise<string[]> {
  const all = await getAllEvents();
  return Array.from(new Set(all.map((e) => e.category)));
}
