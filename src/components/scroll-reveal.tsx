"use client";

import { useEffect } from "react";

const SELECTORS = [
  "h2.poster-display",
  ".series-label",
  ".caption-bar__imperative",
  ".remote-story blockquote",
  ".learn-position blockquote",
].join(", ");

/**
 * Mount once per page. Fades/lifts headings and key text into view on
 * scroll, instead of everything just sitting static on the page.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    if (els.length === 0) return;

    els.forEach((el) => el.classList.add("scroll-reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-reveal--visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
