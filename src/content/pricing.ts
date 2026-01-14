import { PricingListSchema, type Pricing } from "./types";

/**
 * Ready24 — Pricing (Day-0)
 * المصدر: Sheet "Pricing" في قالب Day-0.
 *
 * ملاحظات تشغيل:
 * - الأسعار تُعرض كنطاقات بالجنيه السوداني (SDG).
 * - السعر النهائي يثبته الفريق قبل التنفيذ.
 * - deposit_rule يحدد قاعدة الدفع (50/50 أو 100%).
 */

const RAW_PRICING: Pricing[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   service_slug: "cv-review-pro",
  //   price_min_sdg: 15000,
  //   price_max_sdg: 25000,
  //   pricing_note_ar: "النطاق تقديري ويتغير حسب طول السيرة وتعقيدها.",
  //   deposit_rule: "50/50",
  //   what_included_ar: "مراجعة + إعادة صياغة + تحسين ATS + نسخة نهائية",
  //   what_not_included_ar: "كتابة خطاب تغطية (يُطلب كخدمة منفصلة)"
  // },
];

export const PRICING = PricingListSchema.parse(RAW_PRICING);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function getPricingByServiceSlug(serviceSlug: string): Pricing | undefined {
  return PRICING.find((p) => p.service_slug === serviceSlug);
}

export function listPricing(): Pricing[] {
  return PRICING.slice();
}
