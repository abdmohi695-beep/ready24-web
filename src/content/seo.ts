import { SeoEntriesSchema, type SeoEntry } from "./types";

/**
 * Ready24 — SEO Map + OpenGraph (Day-0)
 * المصدر: Sheet "SEO" في قالب Day-0.
 *
 * الهدف:
 * - نخزن title/description/canonical/og لكل مسار.
 * - نخليها جاهزة للاستخدام في generateMetadata داخل الصفحات لاحقًا.
 *
 * ملاحظة:
 * - canonical لصفحة "كيف نعمل" مقفول: /how-we-work
 */

const RAW_SEO: SeoEntry[] = [
  // الصفحة الرئيسية (مثال)
  // {
  //   path: "/",
  //   title_ar: "Ready24 — خدمات سريعة بجودة محترمة",
  //   description_ar: "منصة سودانية لتقديم خدمات كتابة ومراجعة وتطوير محتوى بجودة عالية خلال زمن واضح.",
  //   canonical: "/",
  //   og_title_ar: "Ready24",
  //   og_description_ar: "خدمات سريعة بجودة محترمة — اطلب الآن عبر واتساب.",
  //   og_image_path: "/brand/og-default.webp",
  //   robots: "index,follow",
  // },

  // قرار مقفول لصفحة "كيف نعمل"
  {
    path: "/how-we-work",
    title_ar: "كيف نعمل — Ready24",
    description_ar:
      "طريقة العمل خطوة بخطوة: كيف ترسل طلبك، كيف نثبت السعر، سياسة الدفع، وزمن التسليم حسب حجم الخدمة.",
    canonical: "/how-we-work",
    og_title_ar: "كيف نعمل — Ready24",
    og_description_ar: "افهم العملية من البداية للنهاية قبل ما تطلب — بوضوح وبدون تعقيد.",
    og_image_path: "",
    robots: "index,follow",
  },

  // باقي الصفحات تُملأ من الشيت
];

export const SEO = SeoEntriesSchema.parse(RAW_SEO);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function getSeoByPath(path: string): SeoEntry | undefined {
  return SEO.find((e) => e.path === path);
}

export function listSeoEntries(): SeoEntry[] {
  return SEO.slice();
}
