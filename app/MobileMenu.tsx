"use client";

import { useEffect, useState } from "react";

/** Slide-down menu for phones and tablets. Hidden on computer screens. */
export default function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white"
      >
        <span
          className={`absolute h-0.5 w-4 rounded bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
        />
        <span
          className={`absolute h-0.5 w-4 rounded bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
        />
      </button>

      <div
        className={`absolute inset-x-0 top-full grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav className="overflow-hidden border-b border-line bg-paper shadow-[0_20px_40px_-20px_rgb(14_26_43/0.3)]">
          <ul className="px-4 py-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-ink active:bg-sand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
