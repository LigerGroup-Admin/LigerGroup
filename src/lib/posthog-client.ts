"use client";

import posthog from "posthog-js";

export const CONSENT_KEY = "liger-analytics-consent";

let initialized = false;

// Deliberately NOT using opt_out_capturing_by_default + opt_in_capturing():
// that combination silently no-ops capture() calls in this posthog-js
// version (confirmed — a raw fetch() to the same endpoint from the same
// page works fine, so it's an SDK-internal issue, not network/CSP/app
// code). Instead we simply never call init() at all until consent is
// granted — the SDK has no tracking capability to suppress in the
// meantime, which sidesteps the bug entirely and is arguably more
// privacy-respecting besides.
export function initPostHog() {
  if (initialized) return;
  // Never track the admin dashboard — that's internal team usage, not
  // visitor behaviour, and would otherwise pollute real analytics with
  // our own clicks around the leads/settings/websites pages.
  if (window.location.pathname.startsWith("/admin")) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return;

  posthog.init(key, {
    api_host: host,
    capture_pageview: false, // captured manually — see posthog-pageview.tsx
    persistence: "localStorage+cookie",
  });
  initialized = true;
}

export function isPostHogInitialized() {
  return initialized;
}

if (typeof window !== "undefined" && window.localStorage.getItem(CONSENT_KEY) === "granted") {
  initPostHog();
}

export { posthog };
