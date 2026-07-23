import { NextRequest, NextResponse } from "next/server";

// PHASE 2 TODO: persist to Supabase and/or notify by email in addition to Discord.
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  console.log("New contact message (not yet persisted):", body.email);
  await notifyDiscord(body);
  return NextResponse.json({ ok: true });
}

async function notifyDiscord(body: Record<string, unknown>) {
  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "New Contact Message",
            color: 0x1c3d5a,
            fields: [
              { name: "Name", value: String(body.name || "—"), inline: true },
              { name: "Email", value: String(body.email || "—"), inline: true },
              { name: "Message", value: String(body.message || "—") },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch (err) {
    console.error("Failed to notify Discord for contact message:", err);
  }
}
