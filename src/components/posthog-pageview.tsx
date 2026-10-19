"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posthog } from "@/lib/posthog-client";

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    let url = `${window.origin}${pathname}`;
    const query = searchParams.toString();
    if (query) url += `?${query}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

// Wrapped in Suspense: useSearchParams() requires it for the surrounding
// page not to be forced into fully client-side rendering.
export function PostHogPageview() {
  return (
    <Suspense fallback={null}>
      <PageviewTracker />
    </Suspense>
  );
}
