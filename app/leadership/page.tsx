import type { Metadata } from "next";

export const metadata: Metadata = { title: "Leadership" };

const LEADERS = [
  { name: "Kyle Barnes", role: "Cubmaster", email: "kylecbarnes@gmail.com" },
  { name: "Colby Young", role: "Committee Chair", email: "colbypyoung@gmail.com" },
  { name: "Tiffany Reyes", role: "Treasurer", email: "tandbreyes@me.com" },
  { name: "Sarah Humbargar", role: "Recruitment Chair", email: "sarah.humbargar@gmail.com" },
  { name: "Daniel McElwaine", role: "Webelos Den Leader", email: "Disco73@msn.com" },
  { name: "Dan Shehan", role: "Bears Den Leader", email: "shehandn@gmail.com" },
  { name: "Matt Finuf", role: "Bears Den Leader", email: "matt.finuf@gmail.com" },
  { name: "Ryan Means", role: "Tigers/Lions Den Leader", email: "ryan@means.tech" },
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
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-trail-blue/10 font-display text-xl font-bold text-trail-blue">
              {initials(leader.name)}
            </div>
            <p className="mt-4 font-display font-bold text-trail-blue">{leader.name}</p>
            <p className="text-sm text-trail-ink/60">{leader.role}</p>
            <a href={`mailto:${leader.email}`} className="mt-2 inline-block text-sm underline">
              {leader.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
