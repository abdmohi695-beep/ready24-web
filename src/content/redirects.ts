import { CommissionsSchema, type CommissionRule } from "./types";

/**
 * Ready24 — Commissions v1 (Day-0)
 * المصدر: Sheet "Commissions_v1" في قالب Day-0.
 *
 * ملاحظة مهمة:
 * - هذه البيانات "v1" نهائية للإطلاق حسب قراركم.
 * - أي تعديل بعد الإطلاق يتم بإصدار نسخة جديدة (v2...) وفق آلية ضبط التغيير.
 *
 * commission_type:
 * - percent = نسبة مئوية من قيمة الطلب
 * - fixed   = مبلغ ثابت
 *
 * web_package_code:
 * - يستخدم فقط لو track = web (اختياري حسب تصميم القالب).
 */

const RAW_COMMISSIONS_V1: CommissionRule[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   track: "jobs",
  //   commission_type: "percent",
  //   commission_value: 25,
  //   web_package_code: "",
  //   notes_ar: "عمولة لأول طلب فقط (حسب سياسة v1).",
  //   active: "yes",
  // },
];

export const COMMISSIONS_V1 = CommissionsSchema.parse(RAW_COMMISSIONS_V1);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function listActiveCommissionRules(): CommissionRule[] {
  return COMMISSIONS_V1.filter((r) => r.active === "yes");
}

export function listCommissionRulesByTrack(track: string): CommissionRule[] {
  return listActiveCommissionRules().filter((r) => r.track === track);
}
