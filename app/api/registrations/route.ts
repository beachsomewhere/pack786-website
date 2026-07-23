import { NextRequest, NextResponse } from "next/server";

// PHASE 2 TODO: insert into Supabase `event_registrations` (private table, no
// public select policy — see docs/DATA_MODEL.md) and send a confirmation email.
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.eventSlug || !body.familyName || !body.guardianContact) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  console.log("New event registration (not yet persisted):", body.eventSlug, body.familyName);
  return NextResponse.json({ ok: true });
}
