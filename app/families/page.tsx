import type { Metadata } from "next";

export const metadata: Metadata = { title: "Family Resources" };

const CATEGORIES: { name: string; href?: string; note?: string }[] = [
  {
    name: "Medical Forms",
    href: "https://filestore.scouting.org/filestore/healthsafety/pdf/680-001_ab.pdf",
    note: "Must be provided at each camping event. Forms are returned at the end of the event, or destroyed at the individual's request.",
  },
  { name: "Uniform Information", href: "https://www.scouting.org/programs/cub-scouts/cub-scout-uniform/" },
  { name: "Youth Protection Information", href: "https://www.scouting.org/training/safeguarding-youth/" },
  { name: "Payment Links", href: "https://venmo.com/u/CubScoutPack786" },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "How do I register my Scout each year?",
    a: "Register online through my.scouting.org. New Scouts: $110 (covers $85 BSA registration + a $25 one-time joining fee). Returning Scouts: $85 (BSA registration only). Adult leaders/volunteers: $60.",
  },
  {
    q: "What are pack dues, and how do I pay them?",
    a: "$40 per year per Scout, covering pack supplies and activities. Pay via Venmo (@CubScoutPack786), cash, or check payable to “Cub Scout Pack 786” with your Scout’s name in the memo.",
  },
  {
    q: "What do pack dues go towards?",
    a: "Each Scout's neckerchief and slide, plus their Scout handbook.",
  },
  {
    q: "How are pack events paid for?",
    a: "A mix of Butterbraid fundraiser sales and family contributions covers the cost of pack events.",
  },
  {
    q: "When and where do meetings happen?",
    a: "The full pack meets the 1st Tuesday of every month, 6:00–7:30 PM, at Aspen View Academy. Individual dens coordinate their own additional meetings separately.",
  },
  {
    q: "Do we have to attend Aspen View Academy to join?",
    a: "No. Pack 786 is open to any family with a boy in kindergarten through 5th grade, regardless of which school they attend.",
  },
  {
    q: "What if we can't afford the fees?",
    a: "Financial assistance is available — no family should miss out on Scouting due to cost. Reach out confidentially at cubscoutpack786crco@gmail.com.",
  },
  {
    q: "What's the policy on medical forms for camping trips?",
    a: "The BSA Annual Health and Medical Record must be brought to every camping event. It's returned at the end of the trip, or destroyed at your request.",
  },
  {
    q: "Can siblings come camping too?",
    a: "Yes! Cub Scouting is very family-focused, and we support and encourage sibling involvement — with the appropriate medical health forms filled out for each participant.",
  },
  {
    q: "How do I keep track of my child's advancement?",
    a: (
      <>
        Use the{" "}
        <a
          href="https://help.scoutbook.scouting.org/knowledge-base/scouting-mobile-app-for-scoutbook/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Scouting mobile app
        </a>
        , built on Scoutbook.
      </>
    ),
  },
  {
    q: "How do we stay updated on pack news and events?",
    a: "Join our Discord server and Facebook group — that's where announcements, schedule changes, and reminders get posted.",
  },
  {
    q: "Is Pack 786 open to girls?",
    a: "Pack 786 is chartered as a boys-only (non-coed) Cub Scout pack. Parents/guardians and volunteers of any gender are welcome and encouraged to participate.",
  },
  {
    q: "Can I volunteer as the mom to my son?",
    a: "Absolutely! While Pack 786 is a boys-only (non-coed) pack, volunteers are welcome regardless of gender.",
  },
  {
    q: "Who do I contact with questions?",
    a: "Cubmaster Kyle Barnes or Committee Chair Colby Young — both reachable at cubscoutpack786crco@gmail.com.",
  },
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
          <div key={cat.name} className="card">
            <div className="flex items-center justify-between">
              <p className="font-display font-medium text-trail-blue">{cat.name}</p>
              {cat.href ? (
                <a
                  href={cat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-trail-blue underline"
                >
                  View
                </a>
              ) : (
                <span className="text-xs text-trail-ink/40">[ documents to be uploaded ]</span>
              )}
            </div>
            {cat.note && <p className="mt-2 text-sm text-trail-ink/60">{cat.note}</p>}
          </div>
        ))}
      </div>

      <div className="mt-10 card bg-trail-blue/5 text-sm text-trail-ink/70">
        Venmo: <strong><a href="https://venmo.com/u/CubScoutPack786" target="_blank" rel="noopener noreferrer" className="underline">@CubScoutPack786</a></strong>
        {" "}&middot;{" "}
        Council registration: <strong><a href="https://my.scouting.org/online-registration/332f87fe-00a5-4a5d-bf56-1d50340780cb/applicant-type" target="_blank" rel="noopener noreferrer" className="underline">Register online</a></strong>
      </div>

      <div className="trail-divider" />

      <h2 className="font-display text-2xl font-bold text-trail-blue">Frequently Asked Questions</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {FAQ.map((item) => (
          <div key={item.q} className="card">
            <p className="font-display font-bold text-trail-blue">{item.q}</p>
            <p className="mt-1 text-sm text-trail-ink/70">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
