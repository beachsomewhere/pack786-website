import type { Metadata } from "next";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata: Metadata = { title: "Volunteer" };

const CURRENT_NEEDS = [
  { title: "Tiger Den Leader", grade: "1st Grade", desc: "Lead the Tiger den's monthly meetings and activities." },
  { title: "Bear Den Leader", grade: "3rd Grade", desc: "Lead the Bear den's monthly meetings and activities." },
  { title: "Fundraising Chair", desc: "Coordinate Butterbraid sales, spirit nights, and other fundraising activities." },
];

const WAYS_TO_HELP = [
  { title: "One-Time Help", desc: "Show up for a single event — no ongoing commitment." },
  { title: "Event Setup & Cleanup", desc: "Extra hands before and after pack events." },
  { title: "Food Coordination", desc: "Organize snacks or a potluck for a gathering." },
  { title: "Transportation", desc: "Help carpool families to an off-site activity." },
  { title: "Activity Stations", desc: "Run a station at Pack Olympics, derby day, or a campout." },
  { title: "Photography", desc: "Capture the moments for our gallery and recap stories." },
  { title: "Fundraising", desc: "Support Butterbraid sales, spirit nights, and other fundraising activities." },
  { title: "Den Leadership", desc: "Lead or co-lead a den's monthly meetings." },
  { title: "Committee Roles", desc: "Help with planning, finances, or advancement tracking." },
  { title: "Equipment & Camping Support", desc: "Help manage pack gear or support campouts." },
];

export default function VolunteerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="eyebrow">Get Involved</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">Help Pack 786 Run</h1>
      <p className="mt-3 text-trail-ink/70">
        Pack 786 runs entirely on parent volunteers — and there's a role for every kind of schedule and
        skill set. Small one-time help matters just as much as a standing leadership role.
      </p>

      <div className="mt-6 card bg-trail-blue/5 text-sm text-trail-ink/70">
        All registered adult leaders (den leaders, committee members, and other registered volunteer
        roles) are required to complete BSA Youth Protection Training and other applicable adult leader
        training before taking on a leadership role. Learn more and get started at{" "}
        <a
          href="https://www.scouting.org/programs/cub-scouts/leader-resources/adult-leader-training/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline"
        >
          scouting.org/programs/cub-scouts/leader-resources/adult-leader-training
        </a>
        .
      </div>

      <h2 className="mt-10 font-display text-2xl font-bold text-trail-blue">Current Volunteer Needs</h2>
      <p className="mt-1 text-sm text-trail-ink/60">These roles need to be filled soonest — but every role below matters too.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {CURRENT_NEEDS.map((item) => (
          <div key={item.title} className="card border-2 border-trail-gold bg-trail-gold/10">
            <span className="rounded-full bg-trail-gold px-3 py-1 text-xs font-display font-semibold text-trail-blue-dark">Needed Now</span>
            <p className="mt-3 font-display font-bold text-trail-blue">{item.title}</p>
            {item.grade && <p className="text-sm text-trail-ink/60">{item.grade}</p>}
            <p className="mt-1 text-sm text-trail-ink/70">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold text-trail-blue">Other Ways to Help</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {WAYS_TO_HELP.map((item) => (
          <div key={item.title} className="card">
            <p className="font-display font-bold text-trail-blue">{item.title}</p>
            <p className="mt-1 text-sm text-trail-ink/70">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="trail-divider" />

      <section>
        <h2 className="font-display text-2xl font-bold text-trail-blue">Volunteer Interest Form</h2>
        <div className="mt-6">
          <VolunteerForm />
        </div>
      </section>
    </div>
  );
}
