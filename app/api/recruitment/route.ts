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

  return NextResponse.json({ ok: true });
}
