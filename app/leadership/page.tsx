import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Leadership" };

const LEADERS = [
  { name: "Kyle Barnes", role: "Cubmaster", email: "kylecbarnes@gmail.com", phone: "720-320-9648", photo: "/media/leaders/kyle-barnes.jpg" },
  { name: "Colby Young", role: "Committee Chair", email: "colbypyoung@gmail.com" },
  { name: "Tiffany Reyes", role: "Treasurer", email: "tandbreyes@me.com" },
  { name: "Sarah Humbargar", role: "Recruitment Chair", email: "sarah.humbargar@gmail.com" },
  { name: "Josh Barnes", role: "Lion Den Leader", grade: "Kindergarten", email: "joshua.b.barnes@gmail.com" },
  { name: "Ryan Means", role: "Wolf Den Leader", grade: "2nd Grade", email: "scouting@means.tech" },
  { name: "Dan Shehan", role: "Webelos Den Leader", grade: "4th Grade", email: "shehandn@gmail.com" },
  { name: "Matt Finuf", role: "Webelos Den Leader", grade: "4th Grade", email: "matt.finuf@gmail.com" },
  { name: "Daniel McElwaine", role: "AOL Den Leader", grade: "5th Grade", email: "Disco73@msn.com" },
];

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
              <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
                <Image src={leader.photo} alt={leader.name} fill className="object-cover" sizes="80px" />
              </div>
            ) : (
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-trail-blue/10 font-display text-xl font-bold text-trail-blue">
                {initials(leader.name)}
              </div>
            )}
            <p className="mt-4 font-display font-bold text-trail-blue">{leader.name}</p>
            <p className="text-sm text-trail-ink/60">{leader.role}</p>
            {leader.grade && <p className="text-sm text-trail-ink/60">{leader.grade}</p>}
            <a href={`mailto:${leader.email}`} className="mt-2 inline-block text-sm underline">
              {leader.email}
            </a>
            {leader.phone && <p className="mt-1 text-sm text-trail-ink/60">{leader.phone}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
