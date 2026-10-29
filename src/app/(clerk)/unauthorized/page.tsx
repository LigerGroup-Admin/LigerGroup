import type { Metadata } from "next";
import { SignOutButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Not authorized",
  robots: { index: false, follow: false },
};

export default function UnauthorizedPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", margin: 0 }}>You don&apos;t have access to this dashboard</h1>
      <p style={{ color: "#555", maxWidth: "28rem", margin: 0 }}>
        This account isn&apos;t on the admin allowlist. If you believe this is a
        mistake, contact the site owner.
      </p>
      <SignOutButton>
        <button
          type="button"
          style={{
            padding: "0.6rem 1.2rem",
            border: "1px solid #222",
            background: "#222",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </SignOutButton>
    </div>
  );
}
