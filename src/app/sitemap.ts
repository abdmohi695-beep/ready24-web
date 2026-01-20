import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { SEO_ENTRIES } from "@/content/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (SEO_ENTRIES?.length ? SEO_ENTRIES.map((e) => e.path) : ["/"]).map((p) =>
    p === "" ? "/" : p,
  );

  const uniq = Array.from(new Set(pages));

  return uniq.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
