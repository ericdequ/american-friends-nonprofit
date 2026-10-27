/**
 * /gallery: every photo from Ukraine, with filters and a full-screen viewer.
 * Made to be shared: each photo has its own link (/gallery#photo-name).
 * Photos and captions live in content/gallery.ts.
 */
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { gallery } from "@/content/gallery";
import Gallery from "../Gallery";
import DonateModal from "../donate/DonateModal";
import ShareButtons from "../donate/ShareButtons";

const title = `${gallery.page.title} | ${site.name}`;
const description =
  "Photos of war damage in Ukraine, and of the volunteers delivering aid and helping families rebuild. Shared by American Friends for Ukraine.";

export const metadata: Metadata = {
  title: gallery.page.title,
  description,
  alternates: { canonical: "/gallery" },
  openGraph: { title, description, url: "/gallery" },
  twitter: { title, description },
};

export default function GalleryPage() {
  return (
    <>
      <DonateModal />

      {site.showPreviewBanner && (
        <div className="bg-ink px-4 py-2 text-center text-xs text-white/80">
          Preview site · Text in [brackets] is placeholder content
        </div>
      )}

      <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/brand/mark.svg" alt="" width={44} height={44} unoptimized className="h-11 w-11" />
            <span className="font-display text-base font-semibold leading-tight sm:text-lg">
              {site.shortName}
              <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                for Ukraine
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-5">
            <Link href="/" className="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:block">
              ← Home
            </Link>
            <a
              href="/donate"
              data-donate=""
              className="rounded-full bg-ua-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy active:scale-[0.97]"
            >
              Donate
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 md:pt-16 md:pb-24">
          <p className="rise flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ua-blue">
            <span className="h-px w-8 bg-current" aria-hidden />
            {site.name}
          </p>
          <h1
            className="rise mt-3 text-balance font-display text-4xl font-semibold tracking-tight sm:text-5xl"
            style={{ "--delay": "80ms" } as React.CSSProperties}
          >
            {gallery.page.title}
          </h1>
          <p
            className="rise mt-4 max-w-2xl text-lg leading-relaxed text-muted"
            style={{ "--delay": "160ms" } as React.CSSProperties}
          >
            {gallery.page.intro}
          </p>
          <div className="mt-10">
            <Gallery donateAfter={9} />
          </div>
        </section>

        {/* Give or share */}
        <section className="relative overflow-hidden bg-navy text-white">
          <div className="flex h-1.5" aria-hidden>
            <div className="flex-1 bg-ua-blue" />
            <div className="flex-1 bg-ua-yellow" />
          </div>
          <div
            className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-ua-blue/40 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
            <div>
              <h2 className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {gallery.donateTile.title}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/70">{site.hero.body}</p>
              <a
                href="/donate"
                data-donate=""
                className="mt-7 inline-flex rounded-full bg-ua-yellow px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_24px_-10px_rgb(255_213_0/0.9)] transition hover:bg-[#ffe14d] active:scale-[0.97]"
              >
                Donate now
              </a>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">{site.share.title}</h2>
              <p className="mt-3 max-w-md leading-relaxed text-white/70">{site.share.body}</p>
              <div className="mt-6">
                <ShareButtons path="/gallery" dark />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-night text-white/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm sm:px-6">
          <Link href="/" className="font-semibold text-white/80 hover:text-white">
            ← Back to {site.name}
          </Link>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
        </div>
      </footer>
    </>
  );
}
