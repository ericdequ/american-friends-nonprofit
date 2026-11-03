"use client";

/**
 * Photo gallery. Photos, captions and filter names come from content/gallery.ts.
 *
 *  - Filter buttons: All / Relief & rebuilding / The damage
 *  - Tap a photo to open the full-screen viewer: arrows, swipe or arrow keys
 *    to move, Esc to close, plus Share and Donate buttons.
 *  - A link ending in #photo-name opens that photo; #damage or #relief
 *    picks a filter (e.g. /gallery#damage).
 */
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { site } from "@/content/site";
import { gallery, galleryId, isVideo, type GalleryCategory, type GalleryItem } from "@/content/gallery";
import FieldVideo from "./FieldVideo";

type Filter = "all" | GalleryCategory;

const filters: { key: Filter; label: string }[] = [{ key: "all", label: "All" }, ...gallery.categories];
const categoryLabel = (item: GalleryItem) => gallery.categories.find((c) => c.key === item.category)?.label ?? "";

type Tile = { kind: "item"; item: GalleryItem; index: number } | { kind: "donate" };

export default function Gallery({
  limit,
  donateAfter,
  moreHref,
}: {
  /** Show only the first N photos (the viewer still lets people browse all of them). */
  limit?: number;
  /** Put the yellow donate tile after this many photos. Leave out for none. */
  donateAfter?: number;
  /** Adds a "See all photos" link, e.g. "/gallery". */
  moreHref?: string;
}) {
  const items = gallery.items;
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null); // position in `filtered`

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [filter, items],
  );
  const countFor = (key: Filter) => (key === "all" ? items.length : items.filter((i) => i.category === key).length);

  const tiles: Tile[] = (limit ? filtered.slice(0, limit) : filtered).map((item, index) => ({
    kind: "item",
    item,
    index,
  }));
  if (donateAfter !== undefined && tiles.length > donateAfter) tiles.splice(donateAfter, 0, { kind: "donate" });

  // Links like /gallery#damage-burned-cars or /gallery#damage
  useEffect(() => {
    const fromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;
      if (gallery.categories.some((c) => c.key === hash)) {
        setFilter(hash as GalleryCategory);
        return;
      }
      const i = items.findIndex((item) => galleryId(item) === hash);
      if (i >= 0) {
        setFilter("all");
        setOpenIndex(i);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  return (
    <div>
      <div role="group" aria-label="Show photos" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition active:scale-[0.97] ${
                active ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-line hover:ring-ink/30"
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs tabular-nums ${active ? "text-white/60" : "text-muted"}`}>
                {countFor(f.key)}
              </span>
            </button>
          );
        })}
      </div>

      <ul
        key={filter}
        className="gallery-fade mt-6 grid grid-flow-dense grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
      >
        {tiles.map((tile, n) =>
          tile.kind === "donate" ? (
            <li key="donate" style={{ "--i": Math.min(n, 12) } as CSSProperties}>
              <a
                href="/donate"
                data-donate=""
                className="group flex aspect-square h-full flex-col justify-between rounded-2xl bg-ua-yellow p-4 text-ink shadow-[0_14px_30px_-18px_rgb(255_213_0/0.9)] transition hover:bg-[#ffe14d] active:scale-[0.98] sm:p-5"
              >
                <svg viewBox="0 0 24 24" className="h-8 w-8 text-us-red" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.2 0 3.6 1.2 4.4 2.4.8-1.2 2.2-2.4 4.4-2.4 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z"
                  />
                </svg>
                <span>
                  <span className="block font-display text-xl font-semibold leading-tight sm:text-2xl">
                    {gallery.donateTile.title}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold">
                    {gallery.donateTile.cta}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </span>
              </a>
            </li>
          ) : (
            <GalleryTile
              key={tile.item.src}
              item={tile.item}
              featured={tile.index === 0}
              style={{ "--i": Math.min(n, 12) } as CSSProperties}
              onOpen={() => setOpenIndex(tile.index)}
            />
          ),
        )}
      </ul>

      {moreHref && (
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={filter === "all" ? moreHref : `${moreHref}#${filter}`}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy active:scale-[0.97]"
          >
            See all {filtered.length} photos <span aria-hidden>→</span>
          </a>
          <p className="text-sm text-muted">Share a photo to help spread the word.</p>
        </div>
      )}

      <Lightbox items={filtered} index={openIndex} onIndexChange={setOpenIndex} />
    </div>
  );
}

/* ---------- One square photo (or video) in the grid ---------- */

function GalleryTile({
  item,
  featured,
  style,
  onOpen,
}: {
  item: GalleryItem;
  featured: boolean;
  style: CSSProperties;
  onOpen: () => void;
}) {
  const video = isVideo(item);
  return (
    <li id={galleryId(item)} className={`scroll-mt-24 ${featured ? "col-span-2 row-span-2" : ""}`} style={style}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${video ? "Play video" : "View photo"}: ${item.caption}`}
        className="group relative block aspect-square w-full overflow-hidden rounded-2xl bg-line text-left"
      >
        {video && featured ? (
          <FieldVideo src={item.src} poster={item.poster ?? ""} label={item.alt} showControls={false} />
        ) : (
          <Image
            src={video ? (item.poster ?? "") : item.src}
            alt={item.alt}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 560px, (min-width: 640px) 66vw, 100vw"
                : "(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
            }
            className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
          />
        )}
        {video && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
            <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden>
              <path fill="currentColor" d="M7 4.5v15l13-7.5z" />
            </svg>
            Video
          </span>
        )}
        <span
          className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/35 to-transparent font-medium leading-snug text-white ${
            featured ? "p-4 pt-16 text-base sm:p-6 sm:pt-20 sm:text-lg" : "p-3 pt-10 text-xs sm:p-4 sm:pt-12 sm:text-sm"
          }`}
        >
          {item.caption}
        </span>
      </button>
    </li>
  );
}

/* ---------- Full-screen viewer ---------- */

function Lightbox({
  items,
  index,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [copied, setCopied] = useState(false);
  const count = items.length;
  const item = index === null ? null : items[index];

  // Open / close the <dialog> to match the chosen photo.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (index !== null && !el.open) el.showModal();
    if (index === null && el.open) el.close();
  }, [index]);

  // Esc, the close button and the Donate button all end up here.
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => onIndexChange(null);
    el.addEventListener("close", onClose);
    return () => el.removeEventListener("close", onClose);
  }, [onIndexChange]);

  const go = useCallback(
    (step: number) => {
      if (index === null || count < 2) return;
      onIndexChange((index + step + count) % count);
    },
    [index, count, onIndexChange],
  );

  const close = () => dialog.current?.close();

  const share = async () => {
    if (!item) return;
    const url = `${window.location.origin}/gallery#${galleryId(item)}`;
    const text = `${item.caption}. A photo from Ukraine, shared by ${site.name}.`;
    if (typeof navigator.share === "function") {
      await navigator.share({ title: `Photos from Ukraine | ${site.name}`, text, url }).catch(() => {});
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  const arrow = (dir: -1 | 1, className: string) => (
    <button
      type="button"
      onClick={() => go(dir)}
      aria-label={dir < 0 ? "Previous photo" : "Next photo"}
      className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 active:scale-95 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d={dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <dialog
      ref={dialog}
      aria-label="Photo viewer"
      className="lightbox"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      {item && index !== null && (
        <div className="flex h-full flex-col">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3 sm:px-6">
            <p className="text-sm tabular-nums text-white/60" aria-live="polite">
              {index + 1} / {count}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={share}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold transition hover:bg-white/20 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path
                    d="M12 3v12m0-12l-4 4m4-4l4 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {copied ? "Link copied" : "Share"}
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Photo: swipe left/right on phones */}
          <div
            className="relative min-h-0 flex-1 [touch-action:pan-y_pinch-zoom]"
            onPointerDown={(e) => {
              if (e.pointerType !== "mouse") swipeStart.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeStart.current === null) return;
              const dx = e.clientX - swipeStart.current;
              swipeStart.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
            onPointerCancel={() => (swipeStart.current = null)}
          >
            {isVideo(item) ? (
              <video
                key={item.src}
                src={item.src}
                poster={item.poster}
                aria-label={item.alt}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <Image key={item.src} src={item.src} alt={item.alt} fill sizes="100vw" className="object-contain" />
            )}

            {/* Load the photos on either side so arrows feel instant */}
            {count > 2 &&
              [-1, 1].map((step) => {
                const next = items[(index + step + count) % count];
                return isVideo(next) ? null : (
                  <Image
                    key={`preload-${step}-${next.src}`}
                    src={next.src}
                    alt=""
                    aria-hidden
                    fill
                    sizes="100vw"
                    loading="eager"
                    className="invisible"
                  />
                );
              })}

            {count > 1 && (
              <>
                {arrow(-1, "absolute left-4 top-1/2 hidden -translate-y-1/2 sm:flex")}
                {arrow(1, "absolute right-4 top-1/2 hidden -translate-y-1/2 sm:flex")}
              </>
            )}
          </div>

          {/* Caption + actions */}
          <div className="flex flex-col gap-4 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:pb-6">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ua-yellow">{categoryLabel(item)}</p>
              <p className="mt-1.5 font-display text-xl leading-snug sm:text-2xl">{item.caption}</p>
            </div>
            <div className="flex flex-none items-center gap-2">
              {count > 1 && (
                <>
                  {arrow(-1, "sm:hidden")}
                  {arrow(1, "sm:hidden")}
                </>
              )}
              <a
                href="/donate"
                data-donate=""
                onClick={close}
                className="ml-auto inline-flex h-12 items-center gap-2 rounded-full bg-ua-yellow px-6 text-sm font-semibold text-ink shadow-[0_8px_24px_-10px_rgb(255_213_0/0.8)] transition hover:bg-[#ffe14d] active:scale-[0.97]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-us-red" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.2 0 3.6 1.2 4.4 2.4.8-1.2 2.2-2.4 4.4-2.4 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z"
                  />
                </svg>
                Donate
              </a>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
