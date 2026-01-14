import { AmbassadorsSchema, type Ambassador } from "./types";

/**
 * Ready24 — Ambassadors (Day-0)
 * المصدر: Sheet "Ambassadors" في قالب Day-0.
 *
 * قرار الإطلاق: لا يوجد إطلاق بقائمة سفراء فارغة.
 * Day-0 المستهدف: ٨–١٢ سفيرًا مع صور وموافقات (consent_confirmed = "yes").
 *
 * ملاحظة: نبدأ بالمصفوفة فاضية (بدون افتراضات)، لكن وفرنا Helpers
 * تساعدنا نتحقق من جاهزية الإطلاق لاحقًا بدون كسر build.
 */

const RAW_AMBASSADORS: Ambassador[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   code: "R24-XXXX-0001",
  //   display_name_ar: "اسم السفير",
  //   name_variants_ar: "اختصارات/أسماء أخرى إن وجدت",
  //   city: "الخرطوم",
  //   country: "السودان",
  //   profile_image_path: "/media/ambassadors/example.webp",
  //   whatsapp: "249XXXXXXXXX",
  //   facebook: "https://facebook.com/...",
  //   linkedin: "https://linkedin.com/in/...",
  //   status: "active",
  //   consent_confirmed: "yes",
  //   notes_ar: ""
  // },
];

export const AMBASSADORS = AmbassadorsSchema.parse(RAW_AMBASSADORS);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function listActiveAmbassadors(): Ambassador[] {
  return AMBASSADORS.filter((a) => a.status === "active");
}

export function getAmbassadorByCode(code: string): Ambassador | undefined {
  return AMBASSADORS.find((a) => a.code === code);
}

/**
 * جاهزية صفحة السفراء للإطلاق (Day-0)
 * لا ترمي خطأ — مجرد تحقق منطقي نستخدمه في الصفحة/اللوحة لاحقًا.
 */
export function isAmbassadorsLaunchReady(minCount = 8): boolean {
  return listActiveAmbassadors().length >= minCount;
}

export function ambassadorsCount(): number {
  return AMBASSADORS.length;
}
