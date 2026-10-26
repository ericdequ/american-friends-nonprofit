import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { site } from "@/content/site";
import { baseUrl, isReal } from "@/content/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

// Share images come from app/opengraph-image.jpg and app/twitter-image.jpg,
// and icons from app/icon.svg, app/icon.png and app/apple-icon.png.
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  applicationName: site.name,
  keywords: site.seo.keywords,
  authors: [{ name: site.name, url: baseUrl }],
  creator: site.name,
  publisher: site.name,
  category: "nonprofit",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    ...(isReal(site.seo.twitterHandle) ? { site: site.seo.twitterHandle, creator: site.seo.twitterHandle } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  appleWebApp: { title: site.shortName, statusBarStyle: "default" },
  formatDetection: { telephone: false, address: false, email: false },
  ...(isReal(site.seo.googleVerification) ? { verification: { google: site.seo.googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#fefaf4",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
