import { NextResponse } from "next/server";
import { getAllEvents } from "@/lib/events";
import { buildIcsFeed } from "@/lib/calendar";

// Always regenerate on request so calendar apps that periodically re-fetch
// this feed (subscribe, not one-time add) pick up any event changes.
export const dynamic = "force-dynamic";

export async function GET() {
  const events = await getAllEvents();
  const ics = buildIcsFeed(events);
  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": "inline; filename=pack786.ics",
    },
  });
}
