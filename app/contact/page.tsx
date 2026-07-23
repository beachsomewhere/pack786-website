import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow">Get in Touch</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">Contact Pack 786</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card">
          <p className="font-display font-bold text-trail-blue">Pack Leadership</p>
          <p className="mt-1 text-sm text-trail-ink/70">
            Kyle Barnes, Cubmaster &middot;{" "}
            <a href="mailto:cubscoutpack786crco@gmail.com" className="hover:underline">
              cubscoutpack786crco@gmail.com
            </a>{" "}
            &middot; 720-320-9648
          </p>
          <p className="mt-2 text-sm text-trail-ink/70">
            Colby Young, Committee Chair &middot;{" "}
            <a href="mailto:cubscoutpack786crco@gmail.com" className="hover:underline">
              cubscoutpack786crco@gmail.com
            </a>{" "}
            &middot; 619-335-6733
          </p>
        </div>
        <div className="card">
          <p className="font-display font-bold text-trail-blue">Meetings</p>
          <p className="mt-1 text-sm text-trail-ink/70">Aspen View Academy</p>
          <p className="text-sm text-trail-ink/70">1st Tuesday of every month, 6:00&ndash;7:30 PM</p>
        </div>
      </div>

      <div className="mt-4 card flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display font-bold text-trail-blue">Join Us on Discord</p>
          <p className="mt-1 text-sm text-trail-ink/70">
            Pack announcements and family chat happen on our Discord server.
          </p>
          <a
            href="https://discord.gg/tBC9TtpsDq"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block btn-secondary"
          >
            Join our Discord
          </a>
        </div>
        <img
          src="/media/discord-qr.png"
          alt="QR code to join the Pack 786 Discord server"
          width={128}
          height={128}
          className="rounded-trail"
        />
      </div>

      <form className="card mt-8 grid gap-4" noValidate>
        <label className="grid gap-1 text-sm font-medium">
          Name
          <input name="name" required className="rounded-xl border border-trail-line p-3" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Email
          <input name="email" type="email" required className="rounded-xl border border-trail-line p-3" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Message
          <textarea name="message" rows={4} required className="rounded-xl border border-trail-line p-3" />
        </label>
        <button type="submit" className="btn-primary">Send Message</button>
      </form>

      <p className="mt-8 text-center text-trail-ink/70">
        Prefer to see us in person? <Link href="/events" className="font-semibold text-trail-blue underline">Come to an upcoming meeting.</Link>
      </p>
    </div>
  );
}
