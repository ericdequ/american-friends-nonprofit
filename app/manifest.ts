import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Lets people "Add to Home Screen" with the right name, colors and icon. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fefaf4",
    theme_color: "#0057b7",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/mark-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/mark.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/mark-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
