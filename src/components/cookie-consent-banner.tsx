"use client";

import { useEffect, useState } from "react";
import { posthog, CONSENT_KEY } from "@/lib/posthog-client";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(CONSENT_KEY)) return;
    setVisible(true);
  }, []);

  function respond(choice: "granted" | "denied") {
    window.localStorage.setItem(CONSENT_KEY, choice);
    if (choice === "granted") {
      posthog.opt_in_capturing();
      // The pageview tracker only fires on route *changes* — without this,
      // a visitor who accepts and never navigates again would be counted
      // as having consented but never actually captured.
      posthog.capture("$pageview", { $current_url: window.location.href });
    } else {
      posthog.opt_out_capturing();
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <p>
        We use analytics cookies to understand how visitors use this site. Nothing is tracked
        unless you agree.
      </p>
      <div className="cookie-consent__actions">
        <button type="button" onClick={() => respond("denied")}>
          Decline
        </button>
        <button type="button" className="cookie-consent__accept" onClick={() => respond("granted")}>
          Accept
        </button>
      </div>
    </div>
  );
}
