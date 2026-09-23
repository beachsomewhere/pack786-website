import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Leadership" };

const LEADERS = [
  { name: "Kyle Barnes", role: "Cubmaster", email: "kylecbarnes@gmail.com", phone: "720-320-9648", photo: "/media/leaders/kyle-barnes.jpg" },
  { name: "Colby Young", role: "Committee Chair", email: "colbypyoung@gmail.com", photo: "/media/leaders/colby-young.jpg" },
  { name: "Tiffany Reyes", role: "Treasurer", email: "CubScoutPack786Treasurer@gmail.com", photo: "/media/leaders/tiffany-reyes.jpg" },
  { name: "Sarah Humbargar", role: "Recruitment Chair", email: "sarah.humbargar@gmail.com", photo: "/media/leaders/sarah-humbargar.jpg" },
  { name: "Josh Barnes", role: "Lion Den Leader", grade: "Kindergarten", email: "joshua.b.barnes@gmail.com" },
  { name: "Ryan Means", role: "Wolf Den Leader", grade: "2nd Grade", email: "scouting@means.tech", photo: "/media/leaders/ryan-means.jpg" },
  { name: "Dan Shehan", role: "Webelos Den Leader", grade: "4th Grade", email: "shehandn@gmail.com" },
  { name: "Matt Finuf", role: "Webelos Den Leader", grade: "4th Grade", email: "matt.finuf@gmail.com", photo: "/media/leaders/matt-finuf.jpg" },
  { name: "Daniel McElwaine", role: "AOL Den Leader", grade: "5th Grade", email: "Disco73@msn.com" },
];

/** An email with an explicit break opportunity before the "@", so a long address
 *  wraps at the domain boundary ("CubScoutPack786Treasurer" / "@gmail.com")
 *  rather than mid-word. `break-words` on the link stays as the fallback for a
 *  local part that is itself wider than the card. */
function EmailText({ email }: { email: string }) {
  const at = email.indexOf("@");
  if (at === -1) return <>{email}</>;
  return (
    <>
      {email.slice(0, at)}
      <wbr />
      {email.slice(at)}
    </>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function LeadershipPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="eyebrow">Meet the Team</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">Pack Leadership</h1>
      <p className="mt-3 max-w-2xl text-trail-ink/70">
        Pack 786 runs on volunteer parent leaders. Reach out to any of them with questions.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {LEADERS.map((leader) => (
          <div key={leader.name} className="card text-center">
            {leader.photo ? (
              <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full">
                <Image src={leader.photo} alt={leader.name} fill className="object-cover" sizes="144px" />
              </div>
            ) : (
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-trail-blue/10 font-display text-3xl font-bold text-trail-blue">
                {initials(leader.name)}
              </div>
            )}
            <p className="mt-4 font-display font-bold text-trail-blue">{leader.name}</p>
            <p className="text-sm text-trail-ink/60">{leader.role}</p>
            {leader.grade && <p className="text-sm text-trail-ink/60">{leader.grade}</p>}
            {/* An email is one unbreakable token (no spaces, and browsers don't
                break at "@" or "."), so a long one overflows the card at any width
                unless it is allowed to wrap. Block, not inline-block: a
                shrink-to-fit box ignores `break-words` when sizing itself. */}
            <a href={`mailto:${leader.email}`} className="mt-2 block break-words text-xs underline">
              <EmailText email={leader.email} />
            </a>
            {leader.phone && <p className="mt-1 text-sm text-trail-ink/60">{leader.phone}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
