"use client";

import { useEffect, useRef } from "react";

/**
 * A short silent clip that loops while it's on screen and pauses when it
 * scrolls away. People who turn on "reduce motion" don't get autoplay: they
 * see normal play controls, or just the still picture when `showControls`
 * is false (e.g. inside a clickable gallery tile).
 */
export default function FieldVideo({
  src,
  poster,
  label,
  showControls = true,
}: {
  src: string;
  poster: string;
  label: string;
  showControls?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true; // browsers only allow autoplay for muted video

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = showControls;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [showControls]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
