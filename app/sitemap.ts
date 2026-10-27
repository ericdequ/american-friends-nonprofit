import type { MetadataRoute } from "next";
import { baseUrl } from "@/content/seo";
import { gallery, isVideo } from "@/content/gallery";

/** The list of pages Google should know about. Add new pages here. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${baseUrl}/images/logo.webp`, `${baseUrl}/images/hero.webp`],
    },
    {
      url: `${baseUrl}/gallery`,
      changeFrequency: "weekly",
      priority: 0.8,
      // Lets the photos show up in Google Images.
      images: gallery.items.filter((item) => !isVideo(item)).map((item) => `${baseUrl}${item.src}`),
    },
  ];
}
