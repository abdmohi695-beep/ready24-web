import { PolicySnippetsSchema, type PolicySnippet } from "./types";

/**
 * Ready24 — Policy Snippets (Day-0)
 * المصدر: Sheet "PolicySnippets" في قالب Day-0.
 *
 * الفكرة:
 * - نحتفظ بنصوص السياسات كمقاطع صغيرة قابلة لإعادة الاستخدام داخل الصفحات والنماذج.
 * - where_used اختياري لتوثيق أين يظهر النص (للفريق).
 */

const RAW_POLICY_SNIPPETS: PolicySnippet[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   key: "payment_required",
  //   text_ar: "الطلب لا يُعتبر مؤكدًا ولا يبدأ التنفيذ قبل الدفع.",
  //   where_used: "صفحة الأسعار + صفحة الطلب",
  // },
];

export const POLICY_SNIPPETS = PolicySnippetsSchema.parse(RAW_POLICY_SNIPPETS);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function getPolicySnippet(key: string): PolicySnippet | undefined {
  return POLICY_SNIPPETS.find((p) => p.key === key);
}

export function getPolicyText(key: string, fallback?: string): string | undefined {
  return getPolicySnippet(key)?.text_ar ?? fallback;
}
