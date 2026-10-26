"use client";

/**
 * The donation pop-up.
 *
 * Opens from:
 *  - any link or button with a `data-donate` attribute
 *    (data-donate="Project name" shows what the gift supports,
 *     data-amount="50" pre-selects an amount)
 *  - any shared link ending in #give (e.g. https://yoursite.org/#give)
 *
 * Without JavaScript, those links go to the /donate page instead.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { site } from "@/content/site";
import DonateWidget, { donateMode } from "./DonateWidget";
import ShareButtons from "./ShareButtons";

export const DONATE_HASH = "#give";

export default function DonateModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [mounted, setMounted] = useState(false); // load the form only once someone opens it
  const [designation, setDesignation] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  const open = useCallback((opts?: { designation?: string; amount?: number | null }) => {
    setDesignation(opts?.designation ?? "");
    setAmount(opts?.amount ?? null);
    setMounted(true);
    const el = dialog.current;
    if (el && !el.open) el.showModal();
    if (window.location.hash !== DONATE_HASH) {
      history.replaceState(null, "", DONATE_HASH);
    }
  }, []);

  const close = useCallback(() => dialog.current?.close(), []);

  useEffect(() => {
    // Click on any [data-donate] element opens the pop-up.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const trigger = (e.target as HTMLElement).closest<HTMLElement>("[data-donate]");
      if (!trigger) return;
      e.preventDefault();
      const amt = Number(trigger.dataset.amount);
      open({ designation: trigger.dataset.donate || "", amount: Number.isFinite(amt) && amt > 0 ? amt : null });
    };
    const onHash = () => window.location.hash === DONATE_HASH && open();
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHash);
    onHash(); // opened from a shared #give link
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHash);
    };
  }, [open]);

  // Clear #give from the address bar when the pop-up closes.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => {
      if (window.location.hash === DONATE_HASH) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, []);

  const popOut = () => {
    const w = 480;
    const h = Math.min(820, window.screen.availHeight - 40);
    const left = window.screenX + (window.outerWidth - w) / 2;
    const top = window.screenY + 40;
    const win = window.open("/donate", "af-donate", `popup=yes,width=${w},height=${h},left=${left},top=${top}`);
    if (win) {
      win.focus();
      close();
    } else {
      router.push("/donate"); // pop-ups blocked: go to the donate page instead
    }
  };

  return (
    <dialog
      ref={dialog}
      aria-labelledby="donate-title"
      className="donate-modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // click on the dimmed background
      }}
    >
      <div className="flex max-h-[inherit] flex-col">
        {/* Header */}
        <div className="relative overflow-hidden bg-navy px-6 pt-6 pb-5 text-white">
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-ua-blue/50 blur-3xl"
            aria-hidden
          />
          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/25 sm:hidden" aria-hidden />
          <div className="relative flex items-start gap-4">
            <Image src="/brand/mark.svg" alt="" width={48} height={48} unoptimized className="h-12 w-12 flex-none" />
            <div className="min-w-0 flex-1">
              <h2 id="donate-title" className="font-display text-2xl font-semibold leading-tight">
                Make a gift
              </h2>
              <p className="mt-1 text-sm text-white/70">
                {designation ? (
                  <>
                    Supporting <span className="font-semibold text-ua-yellow">{designation}</span>
                  </>
                ) : (
                  site.tagline
                )}
              </p>
            </div>
            <div className="flex flex-none gap-1.5">
              <button
                type="button"
                onClick={popOut}
                title="Open in its own window"
                aria-label="Open in its own window"
                className="hidden h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 sm:flex"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path
                    d="M14 4h6v6m0-6L11 13M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex h-1.5 flex-none" aria-hidden>
          <div className="flex-1 bg-ua-blue" />
          <div className="flex-1 bg-ua-yellow" />
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {mounted && (
            <DonateWidget
              // a fresh form each time for amount buttons; embedded forms stay loaded
              key={donateMode === "code" || donateMode === "embed" ? "embed" : `${designation}-${amount}`}
              initialAmount={amount}
              designation={designation}
            />
          )}
        </div>

        {/* Share */}
        <div className="border-t border-line bg-paper px-6 py-4">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Spread the word</p>
          <ShareButtons />
        </div>
      </div>
    </dialog>
  );
}
