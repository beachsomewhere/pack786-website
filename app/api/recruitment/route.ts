import { NextRequest, NextResponse } from "next/server";
import type { RecruitmentInquiry } from "@/types";

// ---------------------------------------------------------------------------
// PHASE 2 TODO: replace this stub with a real Supabase insert + email notify.
//   const { data, error } = await supabase.from('recruitment_inquiries').insert(...)
//   await sendEmail({ to: process.env.PACK_LEAD_EMAIL, ... })
// Add server-side rate limiting (e.g. Upstash/Vercel KV) in addition to the
// client-side honeypot before going live.
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.guardianName || !body.email || !body.consent) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const inquiry: RecruitmentInquiry = {
    id: crypto.randomUUID(),
    guardianName: body.guardianName,
    email: body.email,
    phone: body.phone ?? "",
    childName: body.childName ?? "",
    childGrade: body.childGrade ?? "",
    childSchool: body.childSchool ?? "",
    preferredContact: body.preferredContact ?? "Email",
    message: body.message ?? "",
    consentToContact: Boolean(body.consent),
    submittedAt: new Date().toISOString(),
    status: "New",
  };

  // Not persisted yet — logging only until the database is connected.
  console.log("New recruitment inquiry (not yet persisted):", inquiry.id);
  const discordDebug = await notifyDiscord(inquiry);

  // TEMPORARY: discordDebug exposes only booleans/status codes (never the
  // webhook URL itself) to help diagnose why production isn't notifying.
  // Remove once confirmed working.
  return NextResponse.json({ ok: true, discordDebug });
}

async function notifyDiscord(inquiry: RecruitmentInquiry) {
  const webhookUrl = process.env.DISCORD_RECRUITMENT_WEBHOOK_URL;
  if (!webhookUrl) return { configured: false };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "New Recruitment Inquiry",
            color: 0x1c3d5a,
            fields: [
              { name: "Parent/Guardian", value: inquiry.guardianName || "—", inline: true },
              { name: "Email", value: inquiry.email || "—", inline: true },
              { name: "Phone", value: inquiry.phone || "—", inline: true },
              { name: "Preferred Contact", value: inquiry.preferredContact || "—", inline: true },
              { name: "Child's Name", value: inquiry.childName || "—", inline: true },
              { name: "Child's Grade", value: inquiry.childGrade || "—", inline: true },
              { name: "Child's School", value: inquiry.childSchool || "—", inline: true },
              { name: "Questions/Comments", value: inquiry.message || "—" },
            ],
            timestamp: inquiry.submittedAt,
          },
        ],
      }),
    });
    return { configured: true, discordStatus: res.status };
  } catch (err) {
    console.error("Failed to notify Discord for recruitment inquiry:", err);
    return { configured: true, error: String(err) };
  }
}
