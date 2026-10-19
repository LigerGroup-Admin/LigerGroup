"use client";

import posthog from "posthog-js";

export const CONSENT_KEY = "liger-analytics-consent";

// Initialises once per page load, but opted OUT by default — no events are
// actually sent to PostHog until the visitor explicitly accepts the cookie
// banner (or we find they already did, from a prior visit).
if (typeof window !== "undefined") {
  const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (key && host) {
    posthog.init(key, {
      api_host: host,
      capture_pageview: false, // captured manually — see posthog-pageview.tsx
      opt_out_capturing_by_default: true,
      persistence: "localStorage+cookie",
    });

    if (window.localStorage.getItem(CONSENT_KEY) === "granted") {
      posthog.opt_in_capturing();
    }
  }
}

export { posthog };
