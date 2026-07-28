"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps a layered SVG scene and drives gentle plane parallax on scroll.
 * Planes opt in with data-depth (0 = fixed, 1 = fastest). Disabled when
 * the visitor prefers reduced motion.
 */
export function PosterScene({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const planes = Array.from(
      el.querySelectorAll<SVGGElement>("[data-depth]"),
    ).map((plane) => ({
      plane,
      depth: parseFloat(plane.dataset.depth ?? "0"),
    }));
    if (planes.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewport = Math.max(window.innerHeight, 1);
      const progress = Math.min(Math.max(-rect.top / viewport, -1), 1);
      for (const { plane, depth } of planes) {
        plane.style.transform = `translateY(${progress * depth * 46}px)`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
