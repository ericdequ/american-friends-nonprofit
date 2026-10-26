/**
 * /donate: a standalone donation page.
 * Good for sharing on social media, "link in bio", QR codes and emails.
 * The pop-up's "open in its own window" button also opens this page.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import DonateWidget from "./DonateWidget";
import ShareButtons from "./ShareButtons";

const title = `Donate to ${site.name}`;
const description = `Give to humanitarian projects in Ukraine through ${site.name}, a U.S. nonprofit. ${site.tagline}`;

export const metadata: Metadata = {
  title: "Donate",
  description,
  alternates: { canonical: "/donate" },
  openGraph: { title, description, url: "/donate" },
  twitter: { title, description },
};

export default function DonatePage() {
  return (
    <main className="relative flex min-h-svh flex-col bg-navy">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-ua-blue/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-ua-yellow/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-6 sm:py-10">
        <Link href="/" className="rise flex items-center gap-3 self-center text-white">
          <Image src="/brand/mark.svg" alt="" width={52} height={52} unoptimized className="h-13 w-13" />
          <span className="font-display text-lg font-semibold leading-tight">
            {site.shortName}
            <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
              for Ukraine
            </span>
          </span>
        </Link>

        <div
          className="rise mt-6 overflow-hidden rounded-3xl bg-white shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]"
          style={{ "--delay": "120ms" } as React.CSSProperties}
        >
          <div className="px-6 pt-6">
            <h1 className="font-display text-3xl font-semibold leading-tight text-ink">Make a gift</h1>
            <p className="mt-1.5 text-sm text-muted">{site.tagline}</p>
          </div>
          <div className="flex h-1.5 mt-5" aria-hidden>
            <div className="flex-1 bg-ua-blue" />
            <div className="flex-1 bg-ua-yellow" />
          </div>
          <div className="p-6">
            <DonateWidget />
          </div>
          <div className="border-t border-line bg-paper px-6 py-4">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">Spread the word</p>
            <ShareButtons />
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-white/50">
          {site.legal.taxStatus === "approved"
            ? `${site.name} is a 501(c)(3) nonprofit (EIN ${site.legal.ein}). Gifts are tax-deductible to the extent allowed by law.`
            : `${site.name} has applied for 501(c)(3) status (EIN ${site.legal.ein}).`}
        </p>
        <Link href="/" className="mt-3 text-center text-sm font-semibold text-white/80 hover:text-white">
          ← Learn more about our work
        </Link>
      </div>
    </main>
  );
}
