import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { requireAdminEmail } from "@/server/admin-auth";
import { deleteSubmissions } from "@/server/submissions/repository";

export async function POST(request: NextRequest) {
  const email = await requireAdminEmail();
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const ids = formData.getAll("id").map(String).filter(Boolean);
  const redirectTo = String(formData.get("redirectTo") || "/admin/leads");

  if (ids.length > 0) {
    await deleteSubmissions(ids);
  }

  // redirectTo is our own hidden field (the admin's current filter state),
  // never user input from elsewhere — but resolve it against the request
  // origin rather than trusting it as an absolute URL regardless.
  const destination = new URL(redirectTo, request.url);
  destination.searchParams.set("deleted", String(ids.length));
  return NextResponse.redirect(destination, 303);
}
