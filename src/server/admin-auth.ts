import { currentUser } from "@clerk/nextjs/server";

// Routes under /admin/* inherit the layout's auth check automatically, but
// anything under /api/* does not — the proxy explicitly excludes /api from
// its matcher (the public form-submission endpoint needs to stay open), so
// any admin-only API route must check this itself.
const allowedAdminEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export async function requireAdminEmail(): Promise<string | null> {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  if (!email || !allowedAdminEmails.includes(email)) return null;
  return email;
}
