import type { MetadataRoute } from "next";
import { baseUrl } from "@/content/seo";
import { site } from "@/content/site";
import { gallery, isVideo } from "@/content/gallery";

/** The list of pages Google should know about. Add new pages here. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
      images: [site.hero.image, site.mission.image, site.stepsImage].map((src) => `${baseUrl}${src}`),
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
