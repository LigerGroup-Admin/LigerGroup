import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Email confirmation",
  robots: { index: false, follow: false },
};

const messages = {
  confirmed: {
    heading: "Your email is confirmed",
    body: "Thanks — we've verified your email address. Our team will be in touch shortly.",
  },
  invalid: {
    heading: "This link isn't valid",
    body: "This confirmation link has already been used or doesn't match a submission. If you're not sure why you're here, you can safely ignore this.",
  },
  error: {
    heading: "Something went wrong",
    body: "We couldn't confirm your email just now. Please try the link again in a moment, or reach out to us directly.",
  },
} as const;

export default async function VerifiedPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: rawStatus } = await searchParams;
  const status = rawStatus && rawStatus in messages ? (rawStatus as keyof typeof messages) : "invalid";
  const { heading, body } = messages[status];

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
      <h1 style={{ fontSize: "1.5rem", margin: 0 }}>{heading}</h1>
      <p style={{ color: "#555", maxWidth: "28rem", margin: 0 }}>{body}</p>
      <Link
        href="/"
        style={{
          padding: "0.6rem 1.2rem",
          border: "1px solid #222",
          background: "#222",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        Back to Liger Group
      </Link>
    </div>
  );
}
