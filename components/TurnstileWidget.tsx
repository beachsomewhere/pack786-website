export default function TurnstileWidget() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) return null;
  return <div className="cf-turnstile" data-sitekey={siteKey} />;
}
