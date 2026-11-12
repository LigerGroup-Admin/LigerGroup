"use client";

import { useEffect } from "react";

/**
 * Mount once per page, alongside ScrollReveal.
 *
 * A link to "#section" is a browser no-op once the URL is already at that
 * hash — the fragment hasn't changed, so nothing fires and the page just
 * sits there. That made every nav/CTA link to a form section (book a call,
 * apply, start a conversation…) work exactly once: click it again later
 * and it goes dead instead of scrolling back.
 *
 * This intercepts clicks on same-page hash links and always scrolls to the
 * target, whether or not the hash already matches the current URL.
 */
export function HashNav() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Not checking event.defaultPrevented: Next.js's <Link> already calls
      // preventDefault() for its own client-side routing before this
      // (bubbled, document-level) listener runs. For a same-page hash whose
      // route doesn't actually change, that routing is a no-op that never
      // scrolls — which is the exact bug this component exists to fix.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a[href]");
      if (!anchor || anchor.getAttribute("target") === "_blank") return;

      const href = anchor.getAttribute("href") ?? "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const path = href.slice(0, hashIndex);
      const hash = href.slice(hashIndex + 1);
      // Only same-page anchors: a bare "#id" or "{current pathname}#id".
      if (!hash || (path !== "" && path !== window.location.pathname)) return;

      const target = document.getElementById(hash);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.location.hash !== `#${hash}`) {
        history.pushState(null, "", `${window.location.pathname}${window.location.search}#${hash}`);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
