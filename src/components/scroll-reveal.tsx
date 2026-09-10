"use client";

import { useEffect } from "react";

const SELECTORS = [
  // Section headings and key text
  "h2.poster-display",
  ".series-label",
  ".caption-bar__imperative",
  ".force-managed__statement h2",
  ".force-trust-security__header h2",
  ".learn-position blockquote",
  // Section content blocks
  ".remote-fit__list",
  ".remote-programme__steps",
  ".force-facts",
  ".force-how__steps",
  ".force-managed__answers",
  ".force-included__list",
  ".force-trust-security__grid",
  ".force-price-note",
  ".force-ready",
  ".learn-approach__steps",
  ".client-trust__row",
  // Individual cards and images
  ".duotone",
  ".local-insights-note",
  ".learn-testimonial__eyebrow",
  ".learn-testimonial__card",
  ".remote-story",
  ".force-roles__grid article",
  ".learn-practices__grid article",
].join(", ");

/**
 * Mount once per page. Fades/lifts major sections, cards, and images into
 * view on scroll (once per element), instead of everything just sitting
 * static on the page.
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
