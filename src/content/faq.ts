import { FaqsSchema, type Faq } from "./types";

/**
 * Ready24 — FAQ (Day-0)
 * المصدر: Sheet "FAQ" في قالب Day-0.
 *
 * ملاحظة:
 * - category لتجميع الأسئلة داخل الصفحة
 * - published للتحكم في النشر بدون حذف البيانات
 */

const RAW_FAQ: Faq[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   id: "payment-before-start",
  //   category: "الدفع والتنفيذ",
  //   q_ar: "هل يبدأ التنفيذ قبل الدفع؟",
  //   a_ar: "لا. أي طلب لا يُعتبر مؤكدًا ولا يبدأ التنفيذ قبل استلام الدفع حسب سياسة المنصة.",
  //   published: "yes",
  // },
];

export const FAQ = FaqsSchema.parse(RAW_FAQ);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function listPublishedFaq(): Faq[] {
  return FAQ.filter((f) => f.published === "yes");
}

export function listFaqCategories(): string[] {
  const set = new Set<string>();
  for (const f of listPublishedFaq()) set.add(f.category);
  return Array.from(set);
}

export function listFaqByCategory(category: string): Faq[] {
  return listPublishedFaq().filter((f) => f.category === category);
}
