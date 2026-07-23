import type { PackEvent, ProgramYear } from "@/types";
import eventsData from "@/data/events.json";

// ---------------------------------------------------------------------------
// This file is the ONLY place that knows where event data lives. Today that's
// a static JSON file (data/events.json). To move to Supabase later:
//   1. Create a Postgres `events` table matching the PackEvent shape.
//   2. Replace the body of getAllEvents() with a `supabase.from('events').select()`.
//   3. Leave every function signature the same — no page/component changes needed.
// ---------------------------------------------------------------------------

const ACTIVE_PROGRAM_YEAR: ProgramYear = "2025-2026"; // admin-toggleable setting in phase 2

export async function getAllEvents(): Promise<PackEvent[]> {
  return eventsData as PackEvent[];
}

export async function getActiveProgramYearEvents(): Promise<PackEvent[]> {
  const all = await getAllEvents();
  return all.filter((e) => e.programYear === ACTIVE_PROGRAM_YEAR);
}

export async function getUpcomingEvents(limit?: number): Promise<PackEvent[]> {
  const all = await getAllEvents();
  const upcoming = all
    .filter((e) => e.status !== "Completed" && e.status !== "Canceled")
    .sort((a, b) => (a.date || "9999").localeCompare(b.date || "9999"));
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export async function getFeaturedEvents(): Promise<PackEvent[]> {
  const all = await getAllEvents();
  return all.filter((e) => e.featured);
}

export async function getPastEvents(): Promise<PackEvent[]> {
  const all = await getAllEvents();
  return all
    .filter((e) => e.status === "Completed")
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function getEventBySlug(slug: string): Promise<PackEvent | undefined> {
  const all = await getAllEvents();
  return all.find((e) => e.slug === slug);
}

export async function getEventCategories(): Promise<string[]> {
  const all = await getAllEvents();
  return Array.from(new Set(all.map((e) => e.category)));
}
