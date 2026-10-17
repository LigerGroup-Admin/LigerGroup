"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin dashboard error:", error);
  }, [error]);

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
      <h1 style={{ fontSize: "1.5rem", margin: 0 }}>This section couldn&apos;t load</h1>
      <p style={{ color: "#555", maxWidth: "28rem", margin: 0 }}>
        Something went wrong fetching data for the dashboard — most likely a database
        connectivity issue, not something you did. Try reloading; if it keeps happening, let the
        site owner know.
      </p>
      {error.digest ? (
        <code style={{ fontSize: "0.75rem", color: "#999" }}>Error ref: {error.digest}</code>
      ) : null}
      <button
        type="button"
        onClick={reset}
        style={{
          padding: "0.6rem 1.2rem",
          border: "1px solid #222",
          background: "#222",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
