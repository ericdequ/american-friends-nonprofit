import type { MetadataRoute } from "next";
import { baseUrl } from "@/content/seo";

/** Tells Google and other search engines they're welcome to index the site. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
