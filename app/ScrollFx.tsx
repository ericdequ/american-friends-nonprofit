"use client";

import { useEffect } from "react";

/**
 * Backup for browsers without CSS scroll animations (e.g. Firefox):
 * toggles an "in" class as elements enter and leave the screen, so every
 * section still animates in and out. Does nothing in Chrome, Edge and Safari,
 * where the CSS in globals.css handles it.
 */
export default function ScrollFx() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    root.classList.add("io-fx");
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-image, .grow-x");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle("in", entry.isIntersecting);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("io-fx");
    };
  }, []);
  return null;
}
