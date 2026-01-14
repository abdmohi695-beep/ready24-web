import { ResourcesSchema, type Resource } from "./types";

/**
 * Ready24 — Resources (Day-0)
 * المصدر: Sheet "Resources" في قالب Day-0.
 *
 * الهدف:
 * - صفحة الموارد تعرض روابط مفيدة مصنفة حسب category (من ResourceCategories).
 * - كل مورد ممكن يرتبط بخدمة عبر related_service_slug (اختياري).
 * - tags: من 0 إلى 3 (مفصولة بفواصل داخل الشيت).
 */

const RAW_RESOURCES: Resource[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   id: "scholarships-portals",
  //   category: "فرص ومنح",
  //   ar_name: "بوابات المنح الدراسية (مختارات)",
  //   en_name: "Scholarship portals (curated)",
  //   url: "https://example.com",
  //   ar_summary: "مجموعة روابط لبوابات منح موثوقة مع نصائح بسيطة للتقديم.",
  //   tags: "منح,طلاب",
  //   risk_note_ar: "تحقق دائمًا من شروط الأهلية ومواعيد الإغلاق قبل التقديم.",
  //   related_service_slug: "scholarship-essay",
  //   published: "yes"
  // },
];

export const RESOURCES = ResourcesSchema.parse(RAW_RESOURCES);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function listPublishedResources(): Resource[] {
  return RESOURCES.filter((r) => r.published === "yes");
}

export function listResourcesByCategory(category: string): Resource[] {
  return listPublishedResources().filter((r) => r.category === category);
}

export function getResourceById(id: string): Resource | undefined {
  return RESOURCES.find((r) => r.id === id);
}
