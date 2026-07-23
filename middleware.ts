import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// PHASE 2 TODO: replace this placeholder check with real Supabase session
// verification (e.g. @supabase/ssr `createServerClient` + `getUser()`).
// Every /admin route must fail closed: no session => redirect to /admin/login.
// ---------------------------------------------------------------------------

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin") && req.nextUrl.pathname !== "/admin/login") {
    const hasSession = req.cookies.get("pack786_session"); // placeholder cookie check only
    if (!hasSession) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
