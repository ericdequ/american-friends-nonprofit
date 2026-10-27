/**
 * The home page layout. To change words, links or photos, edit
 * content/site.ts (and content/gallery.ts for the photo gallery),
 * not this file.
 */
import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/content/seo";
import { gallery } from "@/content/gallery";
import Gallery from "./Gallery";
import MobileMenu from "./MobileMenu";
import ScrollFx from "./ScrollFx";
import DonateModal from "./donate/DonateModal";
import ShareButtons from "./donate/ShareButtons";

const nav = [
  { href: "#mission", label: "Mission" },
  { href: "#how", label: "How it works" },
  { href: "#projects", label: "Projects" },
  { href: "#gallery", label: "Photos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const taxLine =
  site.legal.taxStatus === "approved"
    ? `${site.name} is a 501(c)(3) tax-exempt organization (EIN ${site.legal.ein}). Donations are tax-deductible to the extent allowed by law.`
    : `${site.name} has applied for 501(c)(3) tax-exempt status with the IRS (EIN ${site.legal.ein}).`;

/** Stagger helpers for the animations. */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;
const stagger = (i: number) => ({ "--i": i }) as CSSProperties;

/** Props that make any link open the donation pop-up (or /donate without JavaScript). */
const donateLink = (designation = "", amount?: number) => ({
  href: "/donate",
  "data-donate": designation,
  ...(amount ? { "data-amount": String(amount) } : {}),
});

/* ---------- Small building blocks ---------- */

/** A button that links out, or shows "Coming soon" when the link is still empty. */
function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition active:scale-[0.97]";
  const styles = {
    primary: "bg-ua-yellow text-ink hover:bg-[#ffe14d] shadow-sm",
    outline: "border border-ink/20 text-ink hover:border-ink/50 bg-white",
    light: "border border-white/30 text-white hover:bg-white/10",
  }[variant];

  if (!href) {
    return (
      <span
        title="Link not set yet. Add it in content/site.ts"
        className={`${base} max-w-full flex-wrap cursor-not-allowed border border-dashed border-current/40 opacity-60 ${variant === "outline" ? "text-muted" : "text-white"} ${className}`}
      >
        {children}
        <span className="rounded-full bg-current/10 px-2 py-0.5 text-[11px] font-medium">Coming soon</span>
      </span>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`${base} whitespace-nowrap ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <div className="reveal max-w-2xl">
      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-ua-yellow" : "text-ua-blue"}`}
      >
        <span className="grow-x h-px w-8 bg-current" aria-hidden />
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/70" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

function FlagStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`grow-x flex h-1.5 w-full ${className}`} aria-hidden>
      <div className="flex-1 bg-ua-blue" />
      <div className="flex-1 bg-ua-yellow" />
    </div>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none text-ua-blue" aria-hidden>
      <path
        d="M4 10.5l3.5 3.5L16 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden>
        <div className="flex-1 bg-ua-blue" />
        <div className="flex-1 bg-ua-yellow" />
      </div>
      <ScrollFx />
      <DonateModal />
      <a
        {...donateLink()}
        className="fab fixed bottom-5 right-5 z-40 items-center gap-2 rounded-full bg-ua-yellow px-5 py-3.5 text-sm font-semibold text-ink shadow-[0_14px_30px_-10px_rgb(3_8_18/0.45)] transition-[translate] hover:-translate-y-0.5 active:scale-[0.97]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-us-red" aria-hidden>
          <path
            fill="currentColor"
            d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.2 0 3.6 1.2 4.4 2.4.8-1.2 2.2-2.4 4.4-2.4 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z"
          />
        </svg>
        Donate
      </a>

      {site.showPreviewBanner && (
        <div className="bg-ink px-4 py-2 text-center text-xs text-white/80">
          Preview site · Text in [brackets] is placeholder content
        </div>
      )}

      {/* Header */}
      <header className="site-header sticky top-0 z-30 border-b border-transparent bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <Image src="/brand/mark.svg" alt="" width={44} height={44} unoptimized className="h-11 w-11" />
            <span className="font-display text-base font-semibold leading-tight sm:text-lg">
              {site.shortName}
              <span className="block font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                for Ukraine
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              {...donateLink()}
              className="rounded-full bg-ua-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy active:scale-[0.97]"
            >
              Donate
            </a>
            <MobileMenu links={nav} />
          </div>
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()).replace(/</g, "\\u003c") }}
      />

      <main id="top" className="flex-1 overflow-x-clip">
        {/* Hero */}
        <section className="relative bg-paper">
          <div className="mx-auto grid max-w-6xl items-center px-4 sm:px-6 lg:min-h-[min(720px,calc(100svh-6rem))] lg:grid-cols-[1fr_1.1fr]">
            <div className="hero-out relative z-10 pt-12 pb-6 sm:pt-16 lg:py-24">
              <p className="rise text-xs font-semibold uppercase tracking-[0.18em] text-ua-blue" style={delay(0)}>
                {site.hero.eyebrow}
              </p>
              <h1
                className="mt-4 text-balance font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl"
                aria-label={site.hero.headline}
              >
                {site.hero.headline.split(" ").map((w, i) => (
                  <span key={i} aria-hidden>
                    <span className="word" style={{ "--w": i } as CSSProperties}>
                      {w}
                    </span>{" "}
                  </span>
                ))}
              </h1>
              <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted" style={delay(450)}>
                {site.hero.body}
              </p>
              <div className="rise mt-8 flex flex-wrap gap-3" style={delay(560)}>
                <a
                  {...donateLink()}
                  className="rounded-full bg-ua-yellow px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_24px_-10px_rgb(255_213_0/0.9)] transition hover:bg-[#ffe14d] active:scale-[0.97]"
                >
                  Donate now
                </a>
                <a
                  href="#how"
                  className="rounded-full border border-ink/15 bg-white px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/40 active:scale-[0.97]"
                >
                  How it works
                </a>
              </div>
              <ul className="rise mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" style={delay(660)}>
                {site.hero.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <Check />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo: under the text on phones, bleeding off the right edge on desktop */}
            <div className="-mx-4 sm:-mx-6 lg:static lg:mx-0">
              <div className="float-in relative aspect-[4/3] overflow-hidden bg-sand md:aspect-[16/9] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[52%]">
                {/* Taller than its frame so the slow scroll drift never shows an edge */}
                <div className="drift absolute inset-x-0 top-0 -bottom-[18%]">
                  <Image
                    src={site.hero.image}
                    alt={site.hero.imageAlt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: site.hero.imageFocus }}
                  />
                </div>
                {/* Soft edges that blend the photo into the page */}
                <div
                  className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-paper to-transparent"
                  aria-hidden
                />
                <div
                  className="absolute inset-y-0 left-0 hidden w-1/4 bg-linear-to-r from-paper via-paper/60 to-transparent lg:block"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </section>
        <FlagStripe />

        {/* Mission + photo */}
        <section id="mission" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl bg-night shadow-[0_30px_60px_-30px_rgb(10_35_72/0.6)] ring-1 ring-black/5">
              <Image
                src={site.mission.image}
                alt={site.mission.imageAlt}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="reveal-image object-cover"
                style={{ objectPosition: site.mission.imageFocus }}
              />
            </div>
            <div>
              <SectionHeading eyebrow="Who we are" title={site.mission.title} />
              <p className="reveal mt-6 font-display text-2xl leading-snug text-ink/90 sm:text-[1.7rem]">
                {site.mission.statement}
              </p>
            </div>
          </div>
        </section>

        {/* Why it matters: real photos of war damage */}
        <section id="why" className="relative overflow-hidden bg-night text-white">
          <div
            className="glow pointer-events-none absolute -left-40 top-1/3 h-[26rem] w-[26rem] rounded-full bg-ua-blue/30 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <SectionHeading dark eyebrow={site.impact.eyebrow} title={site.impact.title} intro={site.impact.body} />
              <div className="reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  {...donateLink()}
                  className="inline-flex rounded-full bg-ua-yellow px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_8px_24px_-10px_rgb(255_213_0/0.7)] transition hover:bg-[#ffe14d] active:scale-[0.97]"
                >
                  {site.impact.cta}
                </a>
                <a
                  href={site.impact.moreHref}
                  className="text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-ua-yellow"
                >
                  {site.impact.moreLabel} →
                </a>
              </div>
            </div>
            {/* Two staggered columns: tall + wide on the left, wide + tall on the right */}
            <div className="grid grid-cols-2 items-start gap-3 sm:gap-4">
              {[0, 1].map((col) => (
                <div key={col} className={`grid gap-3 sm:gap-4 ${col === 1 ? "mt-10" : ""}`}>
                  {site.impact.photos
                    .filter((_, i) => i % 2 === col)
                    .map((photo, row) => (
                      <div
                        key={photo.src}
                        className={`reveal relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 ${
                          (col + row) % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                        }`}
                        style={stagger(row * 2 + col)}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 300px, 50vw"
                          className="reveal-image object-cover"
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="border-y border-line bg-sand">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <SectionHeading
              eyebrow="How it works"
              title="Your gift, from here to there"
              intro="We’re the U.S. home for donations to humanitarian work in Ukraine."
            />
            <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
              <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl bg-line shadow-[0_30px_60px_-30px_rgb(10_35_72/0.45)]">
                <Image
                  src={site.stepsImage}
                  alt={site.stepsImageAlt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="reveal-image object-cover"
                  style={{ objectPosition: site.stepsImageFocus }}
                />
              </div>
              <ol className="grid gap-4">
                {site.steps.map((step, i) => (
                  <li
                    key={step.title}
                    className="reveal lift flex gap-5 rounded-2xl border border-line bg-white p-6"
                    style={stagger(i)}
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ua-blue font-display text-lg font-semibold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <SectionHeading
            eyebrow="Projects"
            title="What your donation funds"
            intro="Each project is run by a partner in Ukraine and approved by our board."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {site.projects.map((project, i) => (
              <article
                key={project.title}
                className="reveal lift flex flex-col overflow-hidden rounded-3xl border border-line bg-white"
                style={stagger(i)}
              >
                {project.image ? (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/9] items-end overflow-hidden bg-linear-to-br from-ua-blue to-navy p-5">
                    <div
                      className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky-300/25 blur-2xl"
                      aria-hidden
                    />
                    <Image
                      src="/brand/aid-box.svg"
                      alt=""
                      width={160}
                      height={140}
                      unoptimized
                      className="absolute left-1/2 top-1/2 w-28 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_12px_20px_rgb(0_0_0/0.35)] sm:w-32"
                    />
                    <span className="relative rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/85 backdrop-blur">
                      Photo coming soon
                    </span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span
                      className={`rounded-full px-2.5 py-1 ${
                        project.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : project.status === "Completed"
                            ? "bg-zinc-100 text-zinc-700"
                            : "bg-ua-yellow/30 text-ink"
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="text-muted">with {project.partner}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted">{project.body}</p>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-4">
                    <span className="text-sm font-semibold">{project.goal}</span>
                    <a
                      {...donateLink(project.title.startsWith("[") ? "" : project.title)}
                      className="rounded-full bg-ua-blue/10 px-4 py-2 text-sm font-semibold text-ua-blue transition hover:bg-ua-blue hover:text-white"
                    >
                      Support this →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Partner */}
          <div className="reveal mt-16 grid gap-6 rounded-3xl border border-line bg-sand p-8 md:grid-cols-[1fr_2fr] md:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ua-blue">{site.partner.title}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold">{site.partner.name}</h3>
              {site.partner.image && (
                <div className="relative mt-6 aspect-[565/240] max-w-xs overflow-hidden rounded-2xl">
                  <Image src={site.partner.image} alt="" fill sizes="320px" className="object-cover" />
                </div>
              )}
            </div>
            <div>
              <p className="leading-relaxed text-muted">{site.partner.body}</p>
              {site.partner.url && (
                <a
                  href={site.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-ua-blue hover:underline"
                >
                  Visit their website →
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Photo gallery: damage and relief (photos in content/gallery.ts) */}
        <section id="gallery" className="border-y border-line bg-sand">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <SectionHeading eyebrow={gallery.eyebrow} title={gallery.title} intro={gallery.intro} />
            <div className="mt-10">
              <Gallery limit={8} donateAfter={6} moreHref="/gallery" />
            </div>
          </div>
        </section>

        {/* Donate */}
        <section id="donate" className="relative overflow-hidden bg-navy text-white">
          <Image
            src="/stock/us-and-ukraine-flags-blended.jpg"
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none object-cover opacity-[0.14] mix-blend-luminosity blur-[3px]"
          />
          <FlagStripe className="relative" />
          <div
            className="glow pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-ua-blue/40 blur-3xl"
            aria-hidden
          />
          <Image
            src="/brand/flag-wave.svg"
            alt=""
            width={1200}
            height={240}
            unoptimized
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-20 sm:h-32"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <SectionHeading
              dark
              eyebrow="Donate"
              title="Every gift reaches someone who needs it."
              intro="Choose an amount, or pick another way to give below."
            />

            <div className="reveal mt-8 flex flex-wrap gap-3">
              {site.donate.suggestedAmounts.map((amount) => (
                <a
                  key={amount}
                  {...donateLink("", amount)}
                  className="rounded-full border border-white/25 px-6 py-3 text-base font-semibold transition hover:border-ua-yellow hover:bg-ua-yellow hover:text-ink active:scale-[0.97]"
                >
                  ${amount}
                </a>
              ))}
              <a
                {...donateLink()}
                className="rounded-full bg-ua-yellow px-6 py-3 text-base font-semibold text-ink shadow-sm transition hover:bg-[#ffe14d] active:scale-[0.97]"
              >
                Other amount
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {site.donate.options.map((option, i) => (
                <div
                  key={option.title}
                  className="reveal flex flex-col rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 transition-colors hover:bg-white/10"
                  style={stagger(i)}
                >
                  <h3 className="text-lg font-semibold">{option.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{option.description}</p>
                  {option.cta &&
                    (option.url ? (
                      <ActionLink href={option.url} variant="light" className="mt-5 self-start">
                        {option.cta}
                      </ActionLink>
                    ) : (
                      <a
                        {...donateLink()}
                        className="mt-5 inline-flex self-start whitespace-nowrap rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 active:scale-[0.97]"
                      >
                        {option.cta}
                      </a>
                    ))}
                </div>
              ))}
            </div>

            <div className="reveal mt-10 grid gap-2 text-sm text-white/60">
              <p>{taxLine}</p>
              <p>
                Checks: {site.name}, {site.mailingAddress}
              </p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <SectionHeading eyebrow="Leadership" title="Our board" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.team.map((person, i) => (
              <li
                key={`${person.name}-${i}`}
                className="reveal lift rounded-2xl border border-line bg-white p-6"
                style={stagger(i)}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand font-display text-lg font-semibold text-ua-blue">
                  {person.name.startsWith("[")
                    ? "?"
                    : person.name
                        .split(" ")
                        .map((part) => part.charAt(0))
                        .join("")
                        .slice(0, 2)}
                </div>
                <p className="mt-4 font-semibold">{person.name}</p>
                <p className="text-sm text-muted">{person.role}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-line bg-sand">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_2fr] md:py-24">
            <div>
              <SectionHeading eyebrow="FAQ" title="Questions donors ask" />
              {site.faqImage && (
                <div className="reveal relative mt-8 hidden aspect-[3/2] max-w-[18rem] overflow-hidden rounded-2xl shadow-[0_24px_50px_-28px_rgb(10_35_72/0.5)] md:block">
                  <Image src={site.faqImage} alt="" fill sizes="288px" className="object-cover" />
                </div>
              )}
              <p className="reveal mt-6 text-sm text-muted">
                Still have a question?{" "}
                <a href={`mailto:${site.email}`} className="font-semibold text-ua-blue hover:underline">
                  Email us
                </a>
              </p>
            </div>
            <div className="divide-y divide-line self-start rounded-2xl border border-line bg-white">
              {site.faq.map((item, i) => (
                <details key={item.q} className="reveal group p-6" style={stagger(i)}>
                  <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold">
                    {item.q}
                    <span className="faq-icon mt-0.5 text-xl leading-none text-ua-blue transition-transform duration-300">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Spread the word: sharing for people who can't give right now */}
        <section id="share" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <div className="reveal relative grid items-center gap-8 overflow-hidden rounded-3xl bg-[#141b2e] p-7 text-white shadow-[0_30px_60px_-30px_rgb(10_35_72/0.6)] sm:p-10 md:grid-cols-[1.15fr_1fr] md:gap-10 md:p-12">
            <div className="relative">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-ua-yellow">
                <span className="h-px w-8 bg-current" aria-hidden />
                {site.share.eyebrow}
              </p>
              <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {site.share.title}
              </h2>
              <p className="mt-4 leading-relaxed text-white/70">{site.share.body}</p>
              <div className="mt-7">
                <ShareButtons path="/gallery" dark />
              </div>
              <a
                href="/gallery"
                className="mt-6 inline-flex text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-ua-yellow"
              >
                {site.share.galleryLabel} →
              </a>
            </div>
            {site.share.image && (
              <div className="relative -mx-7 -mb-7 aspect-[541/240] sm:-mx-10 sm:-mb-10 md:m-0">
                <Image src={site.share.image} alt="Stand with Ukraine" fill sizes="(min-width: 768px) 460px, 100vw" className="object-contain" />
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer / contact */}
      <footer id="contact" className="bg-night text-white/70">
        <FlagStripe />
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          <div>
            <Image
              src="/brand/logo-horizontal-white.svg"
              alt={site.name}
              width={480}
              height={120}
              unoptimized
              className="h-14 w-auto"
            />
            <p className="mt-3 text-sm">{site.tagline}</p>
            <a
              {...donateLink()}
              className="mt-5 inline-flex rounded-full bg-ua-yellow px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-[#ffe14d] active:scale-[0.97]"
            >
              Donate
            </a>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-white">Contact</p>
            <a href={`mailto:${site.email}`} className="mt-2 block hover:text-white">
              {site.email}
            </a>
            <p className="mt-1">{site.mailingAddress}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-white">Follow</p>
            <div className="mt-2 flex flex-wrap gap-4">
              {Object.entries(site.social)
                .filter(([, url]) => url)
                .map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize hover:text-white"
                  >
                    {name}
                  </a>
                ))}
              {!Object.values(site.social).some(Boolean) && <span>Social links coming soon</span>}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/50 sm:px-6">{taxLine}</p>
        </div>
      </footer>
    </>
  );
}
