import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { AdminShell } from "@/components/admin-shell";
import { listSubmissions } from "@/server/submissions/repository";

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

  // This badge count must not take the whole shell down if the database
  // has a hiccup — error.tsx only guards page-level content, not the
  // layout itself, so a thrown error here would bypass it entirely.
  let needsReviewCount = 0;
  try {
    const submissions = await listSubmissions(1000);
    needsReviewCount = submissions.filter((s) => s.status === "new").length;
  } catch (error) {
    console.error("Failed to load needs-review count for admin topbar:", error);
  }

  return (
    <AdminShell user={{ name, email, initials: initialsFor(name) }} needsReviewCount={needsReviewCount}>
      {children}
    </AdminShell>
  );
}
