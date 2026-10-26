"use client";

import { useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";

const noop = () => () => {};

const icons: Record<string, React.ReactNode> = {
  link: (
    <path
      d="M10 14a4 4 0 005.66 0l3-3a4 4 0 00-5.66-5.66l-1.5 1.5M14 10a4 4 0 00-5.66 0l-3 3a4 4 0 005.66 5.66l1.5-1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  share: (
    <path
      d="M12 3v12m0-12l-4 4m4-4l4 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  whatsapp: (
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35zM12.05 21.8a9.9 9.9 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.88 9.88 0 019.88 9.9c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 00-3.48-8.4z"
    />
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.23 2.69.23v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"
    />
  ),
  x: (
    <path
      fill="currentColor"
      d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"
    />
  ),
  email: (
    <path d="M3 6h18v12H3zm0 0l9 7 9-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  ),
  text: <path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />,
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
      {icons[name]}
    </svg>
  );
}

/** Share the donate page by link, text, email or social media. */
export default function ShareButtons({ path = "/donate", dark = false }: { path?: string; dark?: boolean }) {
  const origin = useSyncExternalStore(
    noop,
    () => window.location.origin,
    () => "",
  );
  const canShare = useSyncExternalStore(
    noop,
    () => typeof navigator.share === "function",
    () => false,
  );
  const url = origin ? `${origin}${path}` : "";
  const [copied, setCopied] = useState(false);

  const text = `Join me in supporting ${site.name}: ${site.tagline}`;
  const e = encodeURIComponent;
  const links = [
    { name: "whatsapp", label: "WhatsApp", href: `https://wa.me/?text=${e(`${text} ${url}`)}` },
    { name: "facebook", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}` },
    { name: "x", label: "X", href: `https://x.com/intent/post?text=${e(text)}&url=${e(url)}` },
    { name: "text", label: "Text message", href: `sms:?&body=${e(`${text} ${url}`)}` },
    {
      name: "email",
      label: "Email",
      href: `mailto:?subject=${e(`Support ${site.name}`)}&body=${e(`${text}\n\n${url}`)}`,
    },
  ];

  const btn = `flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95 ${
    dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-sand text-ink hover:bg-line"
  }`;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className={`${btn} gap-2 text-sm font-semibold sm:w-auto sm:px-4 ${copied ? "w-auto px-4" : ""}`}
        aria-label="Copy link"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            window.prompt("Copy this link:", url);
          }
        }}
      >
        <Icon name="link" />
        {copied ? "Copied!" : <span className="hidden sm:inline">Copy link</span>}
      </button>
      {canShare && (
        <button
          type="button"
          aria-label="Share"
          className={btn}
          onClick={() => navigator.share({ title: site.name, text, url }).catch(() => {})}
        >
          <Icon name="share" />
        </button>
      )}
      {links.map((l) => (
        <a
          key={l.name}
          href={url ? l.href : undefined}
          target={l.name === "email" || l.name === "text" ? undefined : "_blank"}
          rel="noopener noreferrer"
          aria-label={`Share on ${l.label}`}
          title={l.label}
          className={btn}
        >
          <Icon name={l.name} />
        </a>
      ))}
    </div>
  );
}
