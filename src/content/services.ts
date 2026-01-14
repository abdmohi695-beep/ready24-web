import { ServicesSchema, type Service } from "./types";

/**
 * Ready24 — Services (Day-0)
 * المصدر: Sheet "Services" في قالب Day-0.
 *
 * قاعدة: ما بنفترض خدمات من عندنا. نبدأ فاضي، وبعدها نملأها من القالب.
 */

const RAW_SERVICES: Service[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   id: "svc-001",
  //   slug: "cv-review-pro",
  //   track: "jobs",
  //   name_ar: "مراجعة سيرة ذاتية احترافية",
  //   short_desc_ar: "مراجعة دقيقة وتحسينات واضحة لتكون سيرتك أقوى وملائمة للـATS.",
  //   deliverables_ar: "تحسين صياغة السيرة\nترتيب الأقسام\nتصحيح لغوي\nنسخة نهائية جاهزة",
  //   inputs_ar: "السيرة الحالية\nالوظيفة المستهدفة (إن وجدت)\nأي ملاحظات خاصة",
  //   revisions_included: 1,
  //   sla_tier: "Short",
  //   express_eligible: "yes",
  //   express_conditions_ar: "متاح حسب ضغط الطلبات ونوع السيرة.",
  //   service_status: "active",
  //   notes_ar: ""
  // },
];

export const SERVICES = ServicesSchema.parse(RAW_SERVICES);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function getServiceBySlug(serviceSlug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === serviceSlug);
}

export function listActiveServices(): Service[] {
  return SERVICES.filter((s) => s.service_status === "active");
}
