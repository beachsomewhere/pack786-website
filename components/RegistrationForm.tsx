"use client";

import { useState } from "react";

export default function RegistrationForm({ eventSlug, eventName }: { eventSlug: string; eventName: string }) {
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
      const res = await fetch("/api/registrations", {
        method: "POST",
        body: JSON.stringify({ eventSlug, ...Object.fromEntries(form) }),
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
        <p className="font-display font-bold text-trail-green-dark">You're registered!</p>
        <p className="mt-1 text-sm text-trail-ink/70">A confirmation will be sent to the email you provided.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-4" noValidate>
      <p className="font-display font-bold text-trail-blue">Register for {eventName}</p>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="r-company">Company</label>
        <input id="r-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Family Name" name="familyName" required />
        <Field label="Guardian Contact (email or phone)" name="guardianContact" required />
        <Field label="Adults Attending" name="attendingAdults" placeholder="Names, comma-separated" />
        <Field label="Children Attending (name & age)" name="attendingChildren" placeholder="e.g. Sam (7), Jo (9)" />
        <Field label="Den or Rank" name="den" />
        <Field label="Number Attending" name="totalAttending" type="number" />
        <Field label="Dietary Restrictions" name="dietaryRestrictions" />
        <Field label="Allergies" name="allergies" />
        <Field label="Emergency Contact (name & phone)" name="emergencyContact" required />
        <Field label="Items You Can Bring" name="itemsBringing" />
      </div>

      <label className="grid gap-1 text-sm font-medium">
        Notes or special accommodations
        <textarea name="notes" rows={3} className="rounded-xl border border-trail-line p-3" />
      </label>

      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" name="volunteerInterest" className="h-4 w-4" />
        I'd like to help out at this event.
      </label>

      <button type="submit" disabled={status === "submitting"} className="btn-primary">
        {status === "submitting" ? "Submitting…" : "Submit Registration"}
      </button>

      {status === "error" && <p className="text-sm text-red-700">Something went wrong. Please try again.</p>}
    </form>
  );
}

function Field({ label, name, required, type = "text", placeholder }: { label: string; name: string; required?: boolean; type?: string; placeholder?: string }) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <input type={type} name={name} required={required} placeholder={placeholder} className="rounded-xl border border-trail-line p-3" />
    </label>
  );
}
