import type { Metadata } from "next";

export const metadata: Metadata = { title: "Gallery" };

const CATEGORIES = ["Camping", "Pinewood Derby", "Hiking", "Service Projects", "Pack Meetings", "Ceremonies", "Summer Activities"];

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="eyebrow">See Us in Action</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">Photo Gallery & Pack Stories</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <span key={cat} className="rounded-full border border-trail-line px-4 py-2 text-sm font-medium text-trail-ink/70">
            {cat}
          </span>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-trail bg-trail-green/10 flex items-center justify-center text-xs text-trail-ink/50">
            [ Approved photo {i + 1} ]
          </div>
        ))}
      </div>

      <div className="mt-10 card bg-trail-gold/10 text-sm text-trail-ink/80">
        Only photos approved by a parent or guardian are published here, and children are never identified
        by full name.
      </div>
    </div>
  );
}
