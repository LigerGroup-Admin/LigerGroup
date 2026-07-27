import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export function proxy(request: NextRequest) {
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

  const destination = request.nextUrl.clone();
  destination.pathname = pathname === "/" ? routePrefix : `${routePrefix}${pathname}`;

  const response = NextResponse.rewrite(destination);
  response.headers.set("x-liger-site", routePrefix.slice(1));
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
