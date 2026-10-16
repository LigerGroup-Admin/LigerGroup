import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const hostRoutes: Record<string, string> = {
  "ligerremote.com": "/remote",
  "www.ligerremote.com": "/remote",
  "remote.localhost": "/remote",
  "ligerforce.com": "/force",
  "www.ligerforce.com": "/force",
  "force.localhost": "/force",
  "ligerlearn.org": "/learn",
  "www.ligerlearn.org": "/learn",
  "ligerlearn.com": "/learn",
  "www.ligerlearn.com": "/learn",
  "learn.localhost": "/learn",
  "admin.ligergroup.com": "/admin",
  "admin.localhost": "/admin",
};

// Top-level paths that already resolve on their own (shared pages, other
// brand sections reached via a sibling-brand or footer link, API routes).
// A branded domain must pass these through as-is rather than re-prefixing
// them, or e.g. ligerforce.com/privacy would rewrite to /force/privacy (404).
const passthroughSegments = new Set([
  "force",
  "remote",
  "learn",
  "admin",
  "sign-in",
  "unauthorized",
  "privacy",
  "images",
  "videos",
]);

const adminHosts = new Set(["admin.ligergroup.com", "admin.localhost"]);

const isAdminPath = createRouteMatcher(["/admin(.*)"]);

function routeByHost(request: NextRequest) {
  const host = (request.headers.get("host") ?? "")
    .split(":")[0]
    .toLowerCase();
  const routePrefix = hostRoutes[host];

  if (!routePrefix) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname === routePrefix || pathname.startsWith(`${routePrefix}/`)) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/")[1];
  if (passthroughSegments.has(firstSegment)) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = pathname === "/" ? routePrefix : `${routePrefix}${pathname}`;

  const response = NextResponse.rewrite(destination);
  response.headers.set("x-liger-site", routePrefix.slice(1));
  return response;
}

export default clerkMiddleware(async (auth, request) => {
  const host = (request.headers.get("host") ?? "")
    .split(":")[0]
    .toLowerCase();
  const { pathname } = request.nextUrl;
  const isSignInRoute = pathname === "/sign-in" || pathname.startsWith("/sign-in/");

  // Everything under the admin dashboard needs a signed-in session — on the
  // dedicated admin host "/" itself means the dashboard (it gets rewritten
  // to /admin below), so gate on the host too, not just the literal path.
  if (!isSignInRoute && (adminHosts.has(host) || isAdminPath(request))) {
    await auth.protect();
  }

  return routeByHost(request);
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|mov)$).*)",
  ],
};
