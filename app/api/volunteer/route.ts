import { NextRequest, NextResponse } from "next/server";

// PHASE 2 TODO: persist to Supabase `volunteer_signups` table.
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  console.log("New volunteer signup (not yet persisted):", body.email);
  await notifyDiscord(body);
  return NextResponse.json({ ok: true });
}

async function notifyDiscord(body: Record<string, unknown>) {
  const webhookUrl = process.env.DISCORD_VOLUNTEER_WEBHOOK_URL;
  if (!webhookUrl) return;

  const areas = Array.isArray(body.areasOfInterest) ? body.areasOfInterest.join(", ") : "—";

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "New Volunteer Sign-Up",
            color: 0x1c3d5a,
            fields: [
              { name: "Name", value: String(body.name || "—"), inline: true },
              { name: "Email", value: String(body.email || "—"), inline: true },
              { name: "Phone", value: String(body.phone || "—"), inline: true },
              { name: "Child's Den", value: String(body.childDen || "—"), inline: true },
              { name: "Areas of Interest", value: areas },
              { name: "Availability", value: String(body.availability || "—") },
              { name: "Skills/Certifications", value: String(body.skills || "—") },
              { name: "Interested in Leadership Role?", value: body.interestedInLeadership ? "Yes" : "No", inline: true },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch (err) {
    console.error("Failed to notify Discord for volunteer signup:", err);
  }
}
