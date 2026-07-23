import { NextRequest, NextResponse } from "next/server";

// PHASE 2 TODO: persist to Supabase `volunteer_signups` table and notify the
// Volunteer Coordinator by email.
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  console.log("New volunteer signup (not yet persisted):", body.email);
  return NextResponse.json({ ok: true });
}
