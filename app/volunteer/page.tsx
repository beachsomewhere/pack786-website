import type { Metadata } from "next";
import VolunteerForm from "@/components/VolunteerForm";

export const metadata: Metadata = { title: "Volunteer" };

const WAYS_TO_HELP = [
  { title: "One-Time Help", desc: "Show up for a single event — no ongoing commitment." },
  { title: "Event Setup & Cleanup", desc: "Extra hands before and after pack events." },
  { title: "Food Coordination", desc: "Organize snacks or a potluck for a gathering." },
  { title: "Transportation", desc: "Help carpool families to an off-site activity." },
  { title: "Activity Stations", desc: "Run a station at Pack Olympics, derby day, or a campout." },
  { title: "Photography", desc: "Capture the moments for our gallery and recap stories." },
  { title: "Fundraising", desc: "Support popcorn, Butterbraid, or other pack fundraisers." },
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

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
