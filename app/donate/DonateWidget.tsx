"use client";

/**
 * The giving form shown in the donation pop-up and on /donate.
 * Settings live in content/site.ts under `donate`.
 */
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const d = site.donate;
export const donateMode: "code" | "embed" | "link" | "none" = d.embedCode.trim()
  ? "code"
  : d.embedUrl
    ? "embed"
    : d.primaryUrl
      ? "link"
      : "none";

const withAmount = (url: string, amount: number | null) => {
  if (!url || !amount || !d.amountParam) return url;
  try {
    const u = new URL(url);
    u.searchParams.set(d.amountParam, String(amount));
    return u.toString();
  } catch {
    return url;
  }
};

/** Inserts a platform's embed code and runs its scripts in order. */
function EmbedCode({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = ref.current;
    if (!host || host.dataset.loaded) return;
    host.dataset.loaded = "1";
    const tpl = document.createElement("template");
    tpl.innerHTML = code;
    const scripts = Array.from(tpl.content.querySelectorAll("script"));
    scripts.forEach((s) => s.remove());
    host.append(tpl.content);
    // Run scripts one after another so inline setup code waits for its library.
    (async () => {
      for (const old of scripts) {
        const s = document.createElement("script");
        for (const attr of Array.from(old.attributes)) s.setAttribute(attr.name, attr.value);
        s.textContent = old.textContent;
        if (old.src) {
          await new Promise<void>((resolve) => {
            s.onload = s.onerror = () => resolve();
            host.append(s);
          });
        } else {
          host.append(s);
        }
      }
    })();
  }, [code]);
  return <div ref={ref} className="donate-embed min-h-[420px]" />;
}

/** An iframe donation form with a soft loading state. */
function EmbedFrame({ url, amount }: { url: string; amount: number | null }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-2xl bg-sand">
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center text-sm text-muted">
          <span className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-ua-blue border-t-transparent" />
            Loading secure donation form…
          </span>
        </div>
      )}
      <iframe
        src={withAmount(url, amount)}
        title={`Donate to ${site.name}`}
        onLoad={() => setLoaded(true)}
        allow="payment"
        allowFullScreen
        className={`h-[640px] w-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default function DonateWidget({
  initialAmount,
  designation,
}: {
  initialAmount?: number | null;
  designation?: string;
}) {
  const [amount, setAmount] = useState<number | null>(initialAmount ?? d.defaultAmount);
  const [custom, setCustom] = useState("");
  const [monthly, setMonthly] = useState(false);

  if (donateMode === "code") return <EmbedCode code={d.embedCode} />;
  if (donateMode === "embed") return <EmbedFrame url={d.embedUrl} amount={amount} />;

  const chosen = custom ? Number(custom) : amount;
  const checkoutUrl = withAmount(monthly && d.monthlyUrl ? d.monthlyUrl : d.primaryUrl, chosen || null);
  const ready = donateMode === "link";
  const impact = chosen ? d.impact[chosen] : undefined;

  return (
    <div>
      {d.monthlyUrl && (
        <div className="mb-5 grid grid-cols-2 rounded-full bg-sand p-1 text-sm font-semibold" role="tablist">
          {[
            ["One-time", false],
            ["Monthly", true],
          ].map(([label, value]) => (
            <button
              key={String(label)}
              type="button"
              role="tab"
              aria-selected={monthly === value}
              onClick={() => setMonthly(value as boolean)}
              className={`rounded-full py-2.5 transition ${monthly === value ? "bg-white text-ink shadow-sm" : "text-muted"}`}
            >
              {label as string}
            </button>
          ))}
        </div>
      )}

      <fieldset>
        <legend className="text-sm font-semibold text-ink">Choose an amount</legend>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {d.suggestedAmounts.map((value) => {
            const active = !custom && amount === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setAmount(value);
                  setCustom("");
                }}
                className={`rounded-2xl border py-3.5 text-lg font-semibold transition active:scale-[0.97] ${
                  active
                    ? "border-ua-blue bg-ua-blue text-white shadow-[0_10px_24px_-12px_rgb(0_87_183/0.8)]"
                    : "border-line bg-white text-ink hover:border-ua-blue/50"
                }`}
              >
                ${value}
              </button>
            );
          })}
          <label
            className={`flex items-center rounded-2xl border bg-white px-3 transition focus-within:border-ua-blue ${custom ? "border-ua-blue" : "border-line"}`}
          >
            <span className="text-lg font-semibold text-muted">$</span>
            <input
              inputMode="numeric"
              placeholder="Other"
              value={custom}
              onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
              className="w-full bg-transparent py-3.5 pl-1 text-lg font-semibold text-ink outline-none placeholder:font-medium placeholder:text-muted/70"
              aria-label="Other amount in dollars"
            />
          </label>
        </div>
      </fieldset>

      <p className="mt-4 min-h-[1.5rem] text-sm text-muted" aria-live="polite">
        {impact ? (
          <>
            <span className="font-semibold text-ink">${chosen}</span> · {impact}
          </>
        ) : designation ? (
          <>Your gift supports {designation}.</>
        ) : null}
      </p>

      {ready ? (
        <a
          href={checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ua-yellow px-6 py-4 text-base font-semibold text-ink shadow-[0_12px_28px_-14px_rgb(200_160_0/0.9)] transition hover:bg-[#ffe14d] active:scale-[0.98]"
        >
          Donate {chosen ? `$${chosen}` : ""} {monthly ? "monthly" : ""} →
        </a>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-ua-blue/30 bg-ua-blue/5 p-4 text-sm leading-relaxed text-ink">
          <p className="font-semibold">Online giving opens soon.</p>
          <p className="mt-1 text-muted">
            In the meantime you can mail a check to {site.mailingAddress}, or{" "}
            <a className="font-semibold text-ua-blue underline" href={`mailto:${site.email}`}>
              email us
            </a>{" "}
            and we’ll help you give.
          </p>
          {site.showPreviewBanner && (
            <p className="mt-2 text-xs text-muted/80">Site editors: add a donation link in content/site.ts → donate.</p>
          )}
        </div>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
          <path
            d="M5 9V7a5 5 0 0110 0v2m-11 0h12v9H4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        Secure checkout through our donation partner
      </p>
    </div>
  );
}
