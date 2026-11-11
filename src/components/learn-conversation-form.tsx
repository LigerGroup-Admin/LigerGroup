"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { LIGERLEARN_CALENDLY_URL } from "@/lib/calendly";
import { SubmitButton } from "@/components/submit-button";

// Not persisted anywhere except the browser's own sessionStorage — used only
// to carry name/email across the full-page redirect so the Calendly widget
// can be prefilled via its JS API, never via a URL query string.
const STORAGE_KEY = "learn_conversation_prefill";
const CALENDLY_WIDGET_ID = "learn-conversation-calendly";

type CalendlyPrefill = { name: string; email: string };

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Partial<CalendlyPrefill>;
      }) => void;
    };
  }
}

export function LearnConversationForm() {
  const searchParams = useSearchParams();
  const formState = searchParams.get("form") ?? undefined;
  // Lazy initializer (not an effect) so reading sessionStorage doesn't count
  // as a setState-in-effect — it only ever matters on this first render,
  // right after the redirect back from /api/submissions.
  const [prefill] = useState<CalendlyPrefill | null>(() => {
    if (typeof window === "undefined" || formState !== "submitted") return null;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CalendlyPrefill) : null;
    } catch {
      return null;
    }
  });
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (formState !== "submitted") return;
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage may be unavailable (private browsing); nothing to clean up.
    }
  }, [formState]);

  useEffect(() => {
    if (!scriptReady || !LIGERLEARN_CALENDLY_URL) return;
    const container = document.getElementById(CALENDLY_WIDGET_ID);
    if (!container || !window.Calendly) return;
    window.Calendly.initInlineWidget({
      url: LIGERLEARN_CALENDLY_URL,
      parentElement: container,
      prefill: prefill ?? undefined,
    });
  }, [scriptReady, prefill]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement | null)?.value ?? "";
    const email = (form.elements.namedItem("email") as HTMLInputElement | null)?.value ?? "";
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email }));
    } catch {
      // Ignore storage failures; the widget just opens unprefilled.
    }
    // No preventDefault — the native POST to /api/submissions proceeds as usual.
  }

  const fallbackLine = (
    <p className="learn-conversation__fallback">
      Prefer email? <a href="mailto:support@ligerlearn.org">support@ligerlearn.org</a>
    </p>
  );

  if (formState === "submitted") {
    return (
      <div className="learn-conversation__result">
        <div className="form-status form-status--success" role="status">
          <CheckCircle2 size={22} aria-hidden="true" />
          <div>
            <strong>Thanks — that{"'"}s with us.</strong>
            <p>
              {LIGERLEARN_CALENDLY_URL
                ? "Check your inbox for a confirmation email, and pick a time below if you'd like to talk sooner."
                : "We'll respond within one business day."}
            </p>
          </div>
        </div>
        {LIGERLEARN_CALENDLY_URL ? (
          <>
            <div
              id={CALENDLY_WIDGET_ID}
              className="learn-conversation__calendly"
              role="group"
              aria-label="Book a 30-minute conversation"
            />
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
              onLoad={() => setScriptReady(true)}
            />
          </>
        ) : null}
        {fallbackLine}
      </div>
    );
  }

  return (
    <>
      {formState === "error" ? (
        <div className="form-status form-status--error" role="status">
          <AlertCircle size={22} aria-hidden="true" />
          <div>
            <strong>That did not go through.</strong>
            <p>
              Please check the required fields and try again. If the problem
              continues, contact us by email.
            </p>
          </div>
        </div>
      ) : null}
      <form
        className="lead-form learn-conversation-form"
        action="/api/submissions"
        method="post"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="site" value="learn" />
        <input type="hidden" name="type" value="learn-conversation" />
        <label className="lead-form__hp" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label>
          Full name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Organisation
          <input name="company" autoComplete="organization" required />
        </label>
        <label>
          What is the business problem you want solved?
          <textarea
            name="problem"
            required
            maxLength={600}
            rows={4}
            placeholder="A sentence or two is enough."
          />
          <span className="learn-conversation-form__hint">Up to 600 characters.</span>
        </label>
        <label className="lead-form__consent">
          <input type="checkbox" name="consent" required />
          <span>I agree that LigerLearn may contact me about this conversation.</span>
        </label>
        <SubmitButton className="poster-button">
          Start a conversation
          <ArrowRight size={17} aria-hidden="true" />
        </SubmitButton>
      </form>
      {fallbackLine}
    </>
  );
}
