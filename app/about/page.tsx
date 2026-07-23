import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Pack 786" };

const DENS = [
  { name: "Lion", grade: "Kindergarten" },
  { name: "Tiger", grade: "1st Grade" },
  { name: "Wolf", grade: "2nd Grade" },
  { name: "Bear", grade: "3rd Grade" },
  { name: "Webelos", grade: "4th Grade" },
  { name: "Arrow of Light", grade: "5th Grade" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="eyebrow">About Us</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">About Pack 786</h1>

      <section className="mt-8 space-y-4 text-trail-ink/80">
        <p>
          Pack 786&rsquo;s mission is to give elementary-aged kids and their families a place to build
          confidence, try new skills, serve their community, and make lasting memories together.
        </p>
        <p>
          Cub Scouting is a family program for kids from kindergarten through 5th grade, built around
          small-group &ldquo;den&rdquo; meetings, monthly pack-wide events, and outdoor adventures throughout the
          year — camping trips, service projects, Pinewood Derby, and more.
        </p>
        <p>
          We meet at <strong>[MEETING LOCATION]</strong> on <strong>[MEETING SCHEDULE]</strong>. Families are
          always welcome to visit a meeting before deciding to join.
        </p>
      </section>

      <div className="trail-divider" />

      <section>
        <h2 className="font-display text-2xl font-bold text-trail-blue">Dens & Age Groups</h2>
        <p className="mt-2 text-trail-ink/70">
          Cub Scouts are grouped into dens by grade. Exact den availability in a given year depends on
          current enrollment and adult leadership.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {DENS.map((den) => (
            <div key={den.name} className="card text-center">
              <p className="font-display font-bold text-trail-blue">{den.name}</p>
              <p className="text-sm text-trail-ink/60">{den.grade}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="trail-divider" />

      <section>
        <h2 className="font-display text-2xl font-bold text-trail-blue">The Role of Families</h2>
        <p className="mt-2 text-trail-ink/80">
          Cub Scouting is a family program — parents and guardians are involved every step of the way, from
          attending den meetings to helping with events. Parents do not need prior Scouting experience; pack
          leaders provide support, resources, and training.
        </p>
      </section>

      <div className="trail-divider" />

      <section>
        <h2 className="font-display text-2xl font-bold text-trail-blue">Pack Leadership</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="card">
            <p className="font-display font-bold">[PACK LEADER NAME]</p>
            <p className="text-sm text-trail-ink/60">Cubmaster</p>
          </div>
          <div className="card">
            <p className="font-display font-bold">[PACK LEADER NAME]</p>
            <p className="text-sm text-trail-ink/60">Committee Chair</p>
          </div>
        </div>
      </section>

      <div className="mt-12 card bg-trail-gold/10 text-center">
        <p className="font-display text-lg font-bold text-trail-blue">Come see us before you decide.</p>
        <p className="mt-1 text-trail-ink/70">Families are always welcome to visit an upcoming meeting.</p>
      </div>
    </div>
  );
}
