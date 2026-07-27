import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.ADMIN_PREVIEW_ENABLED !== "true"
  ) {
    notFound();
  }

  return <AdminShell>{children}</AdminShell>;
}
