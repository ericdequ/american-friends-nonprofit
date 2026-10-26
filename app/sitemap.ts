import type { MetadataRoute } from "next";
import { baseUrl } from "@/content/seo";

/** The list of pages Google should know about. Add new pages here. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${baseUrl}/images/logo.jpg`, `${baseUrl}/images/hero.jpg`],
    },
  ];
}
