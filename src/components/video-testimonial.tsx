"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

/**
 * Muted-autoplay video testimonial. Stays unmounted-from-network until the
 * section scrolls into view, then autoplays muted (relying on burned-in
 * captions) with a tap-to-unmute control. A poster image covers the gap
 * before the video has enough data to paint a frame, and a play button
 * doubles as a manual fallback if the browser blocks autoplay.
 */
export function VideoTestimonial({
  src,
  poster,
  ariaLabel,
  className,
}: {
  src: string;
  poster: string;
  ariaLabel: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

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
            poster={poster}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            aria-label={ariaLabel}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          {!isPlaying ? (
            <button
              type="button"
              className="video-testimonial__play"
              onClick={() => videoRef.current?.play()}
              aria-label="Play testimonial video"
            >
              <Play size={22} aria-hidden="true" fill="currentColor" />
            </button>
          ) : null}
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
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- plain poster swatch before the section is observed; next/image is unnecessary for a tiny below-the-fold placeholder
        <img src={poster} alt="" aria-hidden="true" />
      )}
    </div>
  );
}
