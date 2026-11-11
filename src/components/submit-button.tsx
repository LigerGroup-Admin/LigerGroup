"use client";

import { useState } from "react";
import type { ReactNode } from "react";

/**
 * Disables itself the instant it's clicked, so a slow connection or an
 * impatient double/triple-click can't fire off several duplicate
 * submissions of the same form before the page redirects.
 */
export function SubmitButton({
  children,
  pendingLabel = "Submitting…",
  className,
}: {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const [pending, setPending] = useState(false);

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={() => setPending(true)}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
