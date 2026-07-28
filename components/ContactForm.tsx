"use client";

import { useState } from "react";
import TurnstileWidget from "./TurnstileWidget";

export default function ContactForm() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(form)),
        headers: { "Content-Type": "application/json" },
      });
      setStatus(res.ok ? "done" : "error");
      if (!res.ok) (window as any).turnstile?.reset();
    } catch {
      setStatus("error");
      (window as any).turnstile?.reset();
    }
  }

  if (status === "done") {
    return (
      <div className="card mt-8 bg-trail-green/10">
        <p className="font-display font-bold text-trail-green-dark">Message sent!</p>
        <p className="mt-1 text-trail-ink/70">A Pack 786 leader will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card mt-8 grid gap-4" noValidate>
      {/* Honeypot field — hidden from real users via CSS, not display:none, to fool basic bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

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
      <TurnstileWidget />

      <button type="submit" disabled={status === "submitting"} className="btn-primary">
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong sending your message. Please try again or email{" "}
          <a href="mailto:cubscoutpack786crco@gmail.com" className="underline">cubscoutpack786crco@gmail.com</a> directly.
        </p>
      )}
    </form>
  );
}
