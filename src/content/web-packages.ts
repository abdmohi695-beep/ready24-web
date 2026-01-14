import { WebPackagesSchema, type WebPackage } from "./types";

/**
 * Ready24 — Web Packages (Day-0)
 * المصدر: Sheet "WebPackages" في قالب Day-0.
 *
 * هذه البيانات اختيارية حسب قرار الإطلاق:
 * - لو استخدمنا باقات الويب A/B/C، نملأها هنا.
 * - لو ما استخدمناها، نخليها فاضية بدون ما تكسر أي صفحة.
 */

const RAW_WEB_PACKAGES: WebPackage[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   package_code: "A",
  //   title_ar: "باقة الويب A",
  //   short_desc_ar: "موقع تعريفي بسيط وسريع ومهيأ للموبايل.",
  //   price_min_sdg: 0,
  //   price_max_sdg: 0,
  //   sla_tier: "Medium",
  //   deliverables_ar: "صفحة رئيسية\nصفحات أساسية\nتهيئة SEO\nنشر على Cloudflare Pages",
  //   inputs_ar: "شعار/هوية\nنصوص الخدمات\nروابط التواصل\nصور/أعمال إن وجدت",
  //   revisions_included: 1,
  //   deposit_rule: "50/50",
  //   notes_ar: ""
  // },
];

export const WEB_PACKAGES = WebPackagesSchema.parse(RAW_WEB_PACKAGES);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function getWebPackageByCode(code: string): WebPackage | undefined {
  return WEB_PACKAGES.find((p) => p.package_code === code);
}

export function listWebPackages(): WebPackage[] {
  return WEB_PACKAGES.slice();
}
