import type { MetadataRoute } from "next";

/**
 * robots.ts (App Router)
 * لازم يكون فيه default export يرجّع MetadataRoute.Robots
 * عشان /robots.txt يتولد بدون كسر الـbuild.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
