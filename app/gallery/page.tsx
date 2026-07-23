import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Gallery" };

const CATEGORIES = ["Camping", "Pinewood Derby", "Hiking", "Service Projects", "Pack Meetings", "Ceremonies", "Summer Activities"];

function getGalleryPhotos(): string[] {
  const dir = path.join(process.cwd(), "public", "media", "photos");
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  return files.sort().map((f) => `/media/photos/${f}`);
}

export default function GalleryPage() {
  const photos = getGalleryPhotos();

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
        {photos.map((src) => (
          <a
            key={src}
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden rounded-trail bg-trail-green/10"
          >
            <Image
              src={src}
              alt="Pack 786 event photo"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition hover:scale-105"
            />
          </a>
        ))}
      </div>

      <div className="mt-10 card bg-trail-gold/10 text-sm text-trail-ink/80">
        Only photos approved by a parent or guardian are published here, and children are never identified
        by full name.
      </div>
    </div>
  );
}
