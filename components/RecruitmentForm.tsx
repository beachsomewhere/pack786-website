"use client";

import { useState } from "react";

export default function RecruitmentForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    // Honeypot spam check — a hidden field real users never fill in.
    if (form.get("company")) {
      setStatus("done"); // silently succeed for bots, don't tip them off
      return;
    }

    try {
      const res = await fetch("/api/recruitment", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form)),
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
        <p className="font-display font-bold text-trail-green-dark">Thanks for reaching out!</p>
        <p className="mt-1 text-trail-ink/70">
          A Pack 786 leader will contact you soon. In the meantime, feel free to come visit an upcoming meeting.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-5" noValidate>
      {/* Honeypot field — hidden from real users via CSS, not display:none, to fool basic bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Parent / Guardian Name" name="guardianName" required />
        <Field label="Email Address" name="email" type="email" required />
        <Field label="Phone Number" name="phone" type="tel" required />
        <Field label="Preferred Contact Method" name="preferredContact" as="select" options={["Email", "Phone", "Text"]} />
        <Field label="Child's Name" name="childName" />
        <Field label="Child's Grade" name="childGrade" />
        <Field label="Child's School" name="childSchool" />
      </div>

      <label className="grid gap-1 text-sm font-medium">
        Questions or Comments
        <textarea name="message" rows={4} className="rounded-xl border border-trail-line p-3" />
      </label>

      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4" />
        <span>I consent to being contacted by Pack 786 about my inquiry.</span>
      </label>

      <button type="submit" disabled={status === "submitting"} className="btn-primary">
        {status === "submitting" ? "Sending…" : "Request Information"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong sending your request. Please try again or email [PACK EMAIL] directly.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  as,
  options,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "select";
  options?: string[];
}) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      {as === "select" ? (
        <select name={name} className="rounded-xl border border-trail-line p-3">
          {options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          className="rounded-xl border border-trail-line p-3"
        />
      )}
    </label>
  );
}
