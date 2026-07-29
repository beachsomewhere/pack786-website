import Image from "next/image";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { getFeaturedEvents, getUpcomingEvents } from "@/lib/events";

// Only one family has a signed photo-release waiver on file so far — the rest
// of the event photo batch is held out of `public/` until more come in.
const APPROVED_PHOTO = "/media/photos/750617643_10108625404761847_6173254261643733498_n.jpg";

const WHY_CUB_SCOUTING = [
  { title: "Character & Values", desc: "Building integrity and strong personal values that last a lifetime.", icon: "🌟" },
  { title: "Citizenship", desc: "Growing into a responsible, engaged member of the community.", icon: "🏛️" },
  { title: "Fitness & Sportsmanship", desc: "Healthy habits, teamwork, and pride in physical and mental growth.", icon: "🏅" },
  { title: "Family Connection", desc: "Strengthening family bonds through shared adventures.", icon: "👨‍👩‍👧‍👦" },
  { title: "Respect & Relationships", desc: "Encouraging kindness, cooperation, and respect for others.", icon: "🤗" },
  { title: "Achievement & Skills", desc: "Building confidence by learning new interests and skills.", icon: "🎯" },
  { title: "Service & Effort", desc: "Learning to help others and always do your best.", icon: "💪" },
  { title: "Fun & Adventure", desc: "Exciting, hands-on experiences that make growing up fun.", icon: "🔥" },
  { title: "Future Readiness", desc: "Preparing Scouts for their next journey into Scouts BSA.", icon: "🚀" },
];

export default async function HomePage() {
  const featured = (await getFeaturedEvents()).slice(0, 3);
  const upcoming = await getUpcomingEvents(3);
  const spotlight = featured.length ? featured : upcoming;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[520px] overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-trail-blue-dark bg-cover bg-bottom"
          style={{ backgroundImage: "url('/media/hero-nightsky.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="eyebrow text-trail-gold">Cub Scout Pack 786 &middot; Castle Rock, CO</p>
            <h1 className="mt-3 font-playful text-5xl font-extrabold leading-tight drop-shadow-md md:text-6xl">
              Adventure Starts Here
            </h1>
            <p className="mt-4 max-w-md text-lg text-white/85">
              Pack 786 is a Castle Rock, Colorado-based Cub Scout pack that helps kids build confidence,
              learn new skills, serve their community, and create unforgettable memories with their
              families.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/join" className="btn-primary">Join Pack 786</Link>
              <Link href="/events" className="rounded-full border-2 border-white px-6 py-3 font-display font-semibold hover:bg-white hover:text-trail-blue">
                View Upcoming Events
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] rotate-1 overflow-hidden rounded-trail border-4 border-white shadow-2xl">
            <Image
              src={APPROVED_PHOTO}
              alt="Pack 786 scout on an outdoor adventure"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="eyebrow">Who we are</p>
        <p className="mt-3 text-lg text-trail-ink/80">
          Pack 786 is a family-oriented, boys-only (non-coed) Cub Scout pack for elementary-aged boys and
          their families. Parents and volunteers of any gender are welcome and encouraged to get involved.
          No Scouting experience required — just a willingness to get outside, try new things, and pitch in
          where you can.
        </p>
      </section>

      {/* Where we meet */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">
          <p className="eyebrow">Where We Meet</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-trail-blue">
            Aspen View Academy &middot; Castle Rock, CO
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-trail-ink/70">
            Pack meetings are held on the 1st Tuesday of every month, 6:00&ndash;7:30 PM, at Aspen View
            Academy. Families are always welcome to stop by.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold text-trail-blue">
            You do not need to attend AVA to join — Pack 786 is open to all boys in the Cub Scout age
            range (kindergarten&ndash;5th grade), regardless of school.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Aspen+View+Academy+Castle+Rock+CO"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block btn-secondary"
          >
            Get Directions
          </a>
        </div>
        <div className="mt-8 h-[420px] overflow-hidden rounded-trail">
          <iframe
            title="Map to Aspen View Academy, Castle Rock, CO"
            src="https://www.google.com/maps?q=Aspen+View+Academy,+Castle+Rock,+CO&z=15&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <div className="trail-divider mx-auto max-w-6xl" />

      {/* Why Cub Scouting */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-center font-display text-3xl font-bold text-trail-blue">Why Cub Scouting?</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CUB_SCOUTING.map((item) => (
            <div key={item.title} className="card">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-3 font-display text-lg font-bold text-trail-blue">{item.title}</h3>
              <p className="mt-1 text-sm text-trail-ink/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="trail-divider mx-auto max-w-6xl" />

      {/* Upcoming events */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-trail-blue">Upcoming Adventures</h2>
          <Link href="/events" className="font-semibold text-trail-blue hover:underline">See all events →</Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {spotlight.map((event) => <EventCard key={event.slug} event={event} />)}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h2 className="font-display text-3xl font-bold text-trail-blue">From the Trail</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-trail-ink/60">
          Our full photo gallery is coming soon, once we&rsquo;ve collected photo-release consent from
          families.
        </p>
      </section>

      {/* Testimonial */}
      <section className="bg-trail-green/5 py-16">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="font-display text-2xl italic text-trail-green-dark">
            “Pack 786 made it so easy for our family to jump in — our Scout has made friends, learned real
            skills, and we finally know our neighbors.”
          </p>
          <p className="mt-4 text-sm font-semibold text-trail-ink/70">— A Pack 786 Parent</p>
        </div>
      </section>

      {/* Recruitment CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="font-display text-3xl font-bold text-trail-blue">Ready to Join the Adventure?</h2>
        <p className="mt-3 text-trail-ink/70">
          Not sure whether Cub Scouts is right for your family? Come visit an upcoming meeting and meet
          our leaders and families.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/join" className="btn-primary">Join Pack 786</Link>
          <Link href="/join#visit" className="btn-secondary">Visit a Pack Meeting</Link>
        </div>
      </section>
    </>
  );
}
