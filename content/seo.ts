/**
 * Helpers for Google and link previews. You shouldn't need to edit this file:
 * change the text in content/site.ts instead.
 */
import { site } from "./site";

/**
 * The public web address of the site, used for share previews, the sitemap
 * and Google. Order of preference:
 *   1. siteUrl in content/site.ts (your real domain)
 *   2. NEXT_PUBLIC_SITE_URL environment variable
 *   3. The address Vercel gives the project automatically
 *   4. localhost while developing
 */
export const baseUrl = (
  site.siteUrl ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/$/, "");

/** True when a value is filled in (not empty and not a [placeholder]). */
export const isReal = (value: string) => Boolean(value) && !value.trim().startsWith("[");

/** Structured data that helps Google show the organization correctly. */
export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(isReal);
  const donateUrl = site.donate.primaryUrl;

  const org: Record<string, unknown> = {
    "@type": "NGO",
    "@id": `${baseUrl}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/brand/mark.webp`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/images/logo.webp`,
    description: site.seo.description,
    slogan: site.tagline,
    areaServed: { "@type": "Country", name: "Ukraine" },
    knowsAbout: ["Humanitarian aid", "Medical supplies", "Ukraine relief"],
  };
  if (isReal(site.email)) org.email = site.email;
  if (isReal(site.mailingAddress)) org.address = site.mailingAddress;
  if (isReal(site.legal.ein)) org.taxID = site.legal.ein;
  if (site.legal.taxStatus === "approved") org.nonprofitStatus = "Nonprofit501c3";
  if (sameAs.length) org.sameAs = sameAs;
  if (isReal(donateUrl)) {
    org.potentialAction = { "@type": "DonateAction", target: donateUrl, recipient: { "@id": `${baseUrl}/#organization` } };
  }

  const website = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: site.name,
    description: site.seo.description,
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: "en-US",
  };

  const faq = {
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    mainEntity: site.faq
      .filter((item) => !item.a.startsWith("["))
      .map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [org, website, ...(faq.mainEntity.length ? [faq] : [])],
  };
}
