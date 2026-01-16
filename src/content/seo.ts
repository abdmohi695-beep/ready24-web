import { SeoEntriesSchema, type SeoEntry } from "./types";

/**
 * Ready24 — SEO Map (Day-0)
 * المصدر: Sheet "SEO" في قالب Day-0.
 *
 * ملاحظة:
 * - ممكن يبدأ فاضي بدون ما يكسر أي صفحة.
 * - أول ما تعبي البيانات، Zod حيوقف أي خطأ بدري (أفضل من أخطاء الإنتاج).
 */

const RAW_SEO_ENTRIES: SeoEntry[] = [
  // مثال (اتركه للتعبئة لاحقًا من Day-0):
  // {
  //   path: "/",
  //   title_ar: "Ready24 — منصة خدمات سريعة وموثوقة",
  //   description_ar: "خدمات كتابة وتنسيق ومراجعة وموارد وفرص…",
  //   canonical: "/",
  //   og_title_ar: "",
  //   og_description_ar: "",
  //   og_image_path: "/brand/og-default.webp",
  //   robots: "index,follow",
  // },
];

export const SEO_ENTRIES = SeoEntriesSchema.parse(RAW_SEO_ENTRIES);
