"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Disables itself once its form actually starts submitting, so a slow
 * connection or an impatient double/triple-click can't fire off several
 * duplicate submissions before the page redirects.
 *
 * Must hook the form's native "submit" event (fired only once the browser
 * has committed to submitting), not this button's own onClick — setting
 * `disabled` synchronously inside onClick can make the browser see a
 * disabled button by the time it processes the click's default action,
 * silently cancelling that very submission instead of just blocking repeats.
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const form = buttonRef.current?.form;
    if (!form) return;
    const handleSubmit = () => setPending(true);
    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <button ref={buttonRef} type="submit" className={className} disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
