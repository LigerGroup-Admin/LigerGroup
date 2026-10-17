import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { AdminShell } from "@/components/admin-shell";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Admin lockdown: the proxy already requires a signed-in Clerk session for
// everything under /admin, but anyone can sign up for an account unless
// sign-ups are restricted in the Clerk dashboard too. This is the second
// layer — only the email(s) listed here ever reach the dashboard itself.
const allowedAdminEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  if (!email || !allowedAdminEmails.includes(email)) {
    redirect("/unauthorized");
  }

  const name = user?.fullName?.trim() || user?.firstName?.trim() || email;

  return (
    <AdminShell user={{ name, email, initials: initialsFor(name) }}>
      {children}
    </AdminShell>
  );
}
