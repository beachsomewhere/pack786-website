"use client";

import Link from "next/link";

export default function EventFilters({ categories, active }: { categories: string[]; active?: string }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter events by category">
      <Link
        href="/events"
        className={`rounded-full border px-4 py-2 text-sm font-medium ${
          !active ? "border-trail-blue bg-trail-blue text-white" : "border-trail-line text-trail-ink/70"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/events?category=${encodeURIComponent(cat)}`}
          className={`rounded-full border px-4 py-2 text-sm font-medium ${
            active === cat ? "border-trail-blue bg-trail-blue text-white" : "border-trail-line text-trail-ink/70"
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}
