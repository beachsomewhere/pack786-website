import type { Metadata } from "next";

export const metadata: Metadata = { title: "Family Resources" };

const CATEGORIES = [
  "New Family Information",
  "Annual Calendar",
  "Pack Handbook",
  "Medical Forms",
  "Permission Forms",
  "Camping Packing Lists",
  "Uniform Information",
  "Advancement Resources",
  "Youth Protection Information",
  "Payment Links",
  "Reimbursement Forms",
  "Leader Resources",
  "Frequently Asked Questions",
];

export default function FamiliesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="eyebrow">Current Families</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">Family Resource Library</h1>
      <p className="mt-3 text-trail-ink/70">
        Everything current Pack 786 families need, organized in one place. Documents are managed by pack
        leaders in the admin dashboard — no code changes needed to add, replace, or archive a file.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <div key={cat} className="card flex items-center justify-between">
            <p className="font-display font-medium text-trail-blue">{cat}</p>
            <span className="text-xs text-trail-ink/40">[ documents to be uploaded ]</span>
          </div>
        ))}
      </div>

      <div className="mt-10 card bg-trail-blue/5 text-sm text-trail-ink/70">
        Venmo: <strong><a href="https://venmo.com/u/CubScoutPack786" target="_blank" rel="noopener noreferrer" className="underline">@CubScoutPack786</a></strong>
        {" "}&middot;{" "}
        Council registration: <strong><a href="https://my.scouting.org/online-registration/332f87fe-00a5-4a5d-bf56-1d50340780cb/applicant-type" target="_blank" rel="noopener noreferrer" className="underline">Register online</a></strong>
      </div>
    </div>
  );
}
