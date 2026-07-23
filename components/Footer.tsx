import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-trail-line bg-trail-blue text-trail-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold">Cub Scout Pack 786</p>
          <p className="mt-2 text-sm text-trail-bg/80">
            Aspen View Academy &middot; 1st Tuesday of every month, 6:00&ndash;7:30 PM
          </p>
          <p className="mt-2 text-sm text-trail-bg/80">
            <a href="mailto:cubscoutpack786crco@gmail.com" className="hover:underline">
              cubscoutpack786crco@gmail.com
            </a>
          </p>
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
          <ul className="mt-3 space-y-2 text-sm text-trail-bg/80">
            <li>
              <a
                href="https://www.facebook.com/groups/cubscoutpack786"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook Group
              </a>
            </li>
            <li>
              <a
                href="https://discord.gg/tBC9TtpsDq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Discord
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-trail-bg/60">
        Pack 786 is not an official Boy Scouts of America website. &copy; {new Date().getFullYear()} Pack 786 Families.
      </div>
    </footer>
  );
}
