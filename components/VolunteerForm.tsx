"use client";

import { useState } from "react";

const AREAS = [
  "Event setup & cleanup",
  "Food coordination",
  "Transportation",
  "Activity stations",
  "Photography",
  "Fundraising",
  "Den leadership",
  "Committee roles",
  "Equipment support",
  "Camping support",
];

export default function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);
    if (form.get("company")) {
      setStatus("done");
      return;
    }
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        body: JSON.stringify({
          ...Object.fromEntries(form),
          areasOfInterest: form.getAll("areasOfInterest"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card bg-trail-green/10">
        <p className="font-display font-bold text-trail-green-dark">Thank you for stepping up!</p>
        <p className="mt-1 text-trail-ink/70">A pack leader will follow up about next steps.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-5" noValidate>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="v-company">Company</label>
        <input id="v-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          Name
          <input name="name" required className="rounded-xl border border-trail-line p-3" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Email
          <input name="email" type="email" required className="rounded-xl border border-trail-line p-3" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Phone
          <input name="phone" type="tel" className="rounded-xl border border-trail-line p-3" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Child's Den
          <input name="childDen" className="rounded-xl border border-trail-line p-3" />
        </label>
      </div>

      <fieldset>
        <legend className="text-sm font-medium">Areas of interest — pick as many as you like</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {AREAS.map((area) => (
            <label key={area} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="areasOfInterest" value={area} className="h-4 w-4" />
              {area}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-1 text-sm font-medium">
        Availability
        <input name="availability" placeholder="e.g. weekday evenings, weekend mornings" className="rounded-xl border border-trail-line p-3" />
      </label>

      <label className="grid gap-1 text-sm font-medium">
        Useful skills or certifications
        <textarea name="skills" rows={3} className="rounded-xl border border-trail-line p-3" />
      </label>

      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" name="interestedInLeadership" className="h-4 w-4" />
        I'm interested in a den or pack leadership role.
      </label>

      <button type="submit" disabled={status === "submitting"} className="btn-primary">
        {status === "submitting" ? "Sending…" : "Sign Up to Help"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong. Please try again or email{" "}
          <a href="mailto:cubscoutpack786crco@gmail.com" className="underline">cubscoutpack786crco@gmail.com</a>.
        </p>
      )}
    </form>
  );
}
