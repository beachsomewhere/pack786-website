export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-24">
      <h1 className="font-display text-2xl font-bold text-trail-blue">Pack 786 Admin</h1>
      <p className="mt-2 text-sm text-trail-ink/60">
        This is a placeholder sign-in screen. In production, this form posts to Supabase Auth
        (email/password or magic link) and sets a secure, httpOnly session cookie server-side.
      </p>
      <form className="card mt-6 grid gap-4">
        <label className="grid gap-1 text-sm font-medium">
          Email
          <input type="email" required className="rounded-xl border border-trail-line p-3" />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Password
          <input type="password" required className="rounded-xl border border-trail-line p-3" />
        </label>
        <button type="submit" className="btn-primary" disabled>
          Sign In (not yet connected)
        </button>
      </form>
    </div>
  );
}
