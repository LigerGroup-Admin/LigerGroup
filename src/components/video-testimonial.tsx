"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Muted-autoplay video testimonial. Stays unmounted-from-network until the
 * section scrolls into view, then autoplays muted (relying on burned-in
 * captions) with a tap-to-unmute control.
 */
export function VideoTestimonial({
  src,
  ariaLabel,
  className,
}: {
  src: string;
  ariaLabel: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        <>
          <video
            ref={videoRef}
            src={src}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            aria-label={ariaLabel}
          />
          <button
            type="button"
            className="video-testimonial__mute"
            onClick={() => setIsMuted((muted) => !muted)}
            aria-pressed={!isMuted}
            aria-label={isMuted ? "Unmute testimonial video" : "Mute testimonial video"}
          >
            {isMuted ? (
              <VolumeX size={16} aria-hidden="true" />
            ) : (
              <Volume2 size={16} aria-hidden="true" />
            )}
          </button>
        </>
      ) : null}
    </div>
  );
}
