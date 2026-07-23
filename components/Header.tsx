"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" },
  { href: "/events", label: "Events" },
  { href: "/families", label: "Families" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-trail-line bg-trail-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-display text-lg font-bold text-trail-blue">
          Pack 786 <span className="text-trail-gold-dark">🏕️</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="font-medium text-trail-ink hover:text-trail-blue">
              {item.label}
            </Link>
          ))}
          <Link href="/join" className="btn-primary">
            Join Pack 786
          </Link>
        </nav>

        <button
          className="lg:hidden rounded-full border border-trail-line p-3"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <div className="h-0.5 w-6 bg-trail-ink mb-1.5" />
          <div className="h-0.5 w-6 bg-trail-ink mb-1.5" />
          <div className="h-0.5 w-6 bg-trail-ink" />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden border-t border-trail-line px-4 py-4">
          <ul className="flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-4 text-lg font-medium hover:bg-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/join" className="btn-primary mt-2 w-full" onClick={() => setOpen(false)}>
                Join Pack 786
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
