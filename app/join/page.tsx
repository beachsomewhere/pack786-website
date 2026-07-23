import type { Metadata } from "next";
import Link from "next/link";
import RecruitmentForm from "@/components/RecruitmentForm";

export const metadata: Metadata = { title: "Join Pack 786" };

const FAQ = [
  { q: "Who can join?", a: "Kids from kindergarten through 5th grade, along with their families." },
  { q: "What do Cub Scouts do?", a: "Camping, hiking, service projects, Pinewood Derby, STEM activities, and monthly pack meetings." },
  { q: "How much time does it take?", a: "Most families attend one den meeting and one pack meeting per month, plus optional weekend adventures." },
  { q: "How often do you meet?", a: "Weekly or monthly den meetings, plus a pack-wide meeting most months — see [MEETING SCHEDULE]." },
  { q: "How involved do parents need to be?", a: "Cub Scouting is a family program. Parents attend with their Scout, and many pitch in on events — no prior Scouting experience needed." },
  { q: "What about uniforms and handbooks?", a: "Each Scout wears a Cub Scout uniform and receives a rank handbook, available through local Scouting retailers or online." },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <p className="eyebrow">Get Started</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">Join Pack 786</h1>
      <p className="mt-3 max-w-2xl text-trail-ink/70">
        Not sure whether Cub Scouts is right for your family? Come visit an upcoming meeting and meet our
        leaders and families — no commitment required.
      </p>

      <div className="mt-6" id="visit">
        <Link href="/events" className="btn-secondary">Visit a Pack Meeting</Link>
      </div>

      <div className="trail-divider" />

      <section className="grid gap-6 sm:grid-cols-2">
        {FAQ.map((item) => (
          <div key={item.q} className="card">
            <p className="font-display font-bold text-trail-blue">{item.q}</p>
            <p className="mt-1 text-sm text-trail-ink/70">{item.a}</p>
          </div>
        ))}
      </section>

      <div className="trail-divider" />

      <section className="grid gap-6 sm:grid-cols-2">
        <div className="card">
          <p className="font-display font-bold text-trail-blue">Estimated Annual Costs</p>
          <ul className="mt-2 space-y-1 text-sm text-trail-ink/70">
            <li>Joining fee: <strong>[JOINING FEE]</strong></li>
            <li>Annual dues: <strong>[ANNUAL DUES]</strong></li>
            <li>Council registration: <strong>[COUNCIL REGISTRATION LINK]</strong></li>
          </ul>
          <p className="mt-3 text-sm text-trail-ink/70">
            Financial assistance is available — no family should miss out on Scouting due to cost.
            Contact us confidentially at <strong>[PACK EMAIL]</strong>.
          </p>
        </div>
        <div className="card">
          <p className="font-display font-bold text-trail-blue">Your First Meeting</p>
          <p className="mt-2 text-sm text-trail-ink/70">
            Just show up! A pack leader will greet you, introduce you to other families, and help your
            Scout jump into whatever activity is happening that night. No uniform or paperwork needed to
            visit.
          </p>
        </div>
      </section>

      <div className="trail-divider" />

      <section>
        <h2 className="font-display text-2xl font-bold text-trail-blue">Request Information</h2>
        <p className="mt-2 text-trail-ink/70">
          Tell us a bit about your family and we&rsquo;ll follow up with everything you need to get started.
        </p>
        <div className="mt-6">
          <RecruitmentForm />
        </div>
      </section>
    </div>
  );
}
