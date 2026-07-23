import type { Metadata } from "next";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="eyebrow">See Us in Action</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-trail-blue">Photo Gallery Coming Soon</h1>
      <p className="mt-4 text-trail-ink/70">
        We&rsquo;re collecting photo-release consent from families before publishing event photos here.
        Check back soon!
      </p>
      <div className="mt-8 card bg-trail-gold/10 text-sm text-trail-ink/80">
        Only photos approved by a parent or guardian will be published here, and children are never
        identified by full name.
      </div>
    </div>
  );
}
