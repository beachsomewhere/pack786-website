import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-trail-line bg-trail-blue text-trail-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">Cub Scout Pack 786</p>
          <p className="mt-2 text-sm text-trail-bg/80">
            [MEETING LOCATION] &middot; [MEETING SCHEDULE]
          </p>
          <p className="mt-2 text-sm text-trail-bg/80">[PACK EMAIL]</p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow text-trail-gold">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/join">Join Pack 786</Link></li>
            <li><Link href="/events">Upcoming Events</Link></li>
            <li><Link href="/families">Family Resources</Link></li>
            <li><Link href="/volunteer">Volunteer</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Website Terms</Link></li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow text-trail-gold">Follow along</p>
          <p className="mt-3 text-sm text-trail-bg/80">[SOCIAL MEDIA LINKS]</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-trail-bg/60">
        Pack 786 is not an official Boy Scouts of America website. &copy; {new Date().getFullYear()} Pack 786 Families.
      </div>
    </footer>
  );
}
