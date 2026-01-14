import type { MetadataRoute } from "next";

/**
 * sitemap.ts (App Router)
 * لازم يكون فيه default export يرجّع MetadataRoute.Sitemap
 * عشان /sitemap.xml يتولد بدون كسر الـbuild.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

  // مبدئيًا: نخليها صفحة واحدة (الصفحات الفعلية سنضيفها لاحقًا من SEO Map)
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
