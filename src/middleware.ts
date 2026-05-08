import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval'"
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;
  const cspHeader = `
    default-src 'self';
    script-src ${scriptSrc};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://your-wordpress-site.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;
  const cspValue = cspHeader.replace(/\s{2,}/g, " ").trim();

  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";
  const pathname = url.pathname;

  // Préserve le rewrite admin.<domain> -> /admin
  if (hostname.startsWith("admin.") && !pathname.startsWith("/admin")) {
    url.pathname = `/admin${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("Content-Security-Policy", cspValue);
    response.headers.set("x-nonce", nonce);
    return response;
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginRoute = pathname === "/admin/login";

  if (isAdminRoute) {
    const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = sessionToken
      ? await verifyAdminSession(sessionToken)
      : null;

    if (!session && !isAdminLoginRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.headers.set("Content-Security-Policy", cspValue);
      response.headers.set("x-nonce", nonce);
      return response;
    }

    if (session && isAdminLoginRoute) {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      adminUrl.search = "";
      const response = NextResponse.redirect(adminUrl);
      response.headers.set("Content-Security-Policy", cspValue);
      response.headers.set("x-nonce", nonce);
      return response;
    }
  }

  const response = NextResponse.next();
  response.headers.set("Content-Security-Policy", cspValue);
  response.headers.set("x-nonce", nonce);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|Ouez-corp-fav.jpg).*)",
  ],
};
