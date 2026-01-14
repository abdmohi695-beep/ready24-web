import { ResourceCategoriesSchema, type ResourceCategory } from "./types";

/**
 * Ready24 — Resource Categories (Day-0)
 * المصدر: Sheet "ResourceCategories" في قالب Day-0.
 *
 * القاعدة:
 * - category نص ثابت (لازم يطابق الموجود في Resources.category)
 * - order رقم لترتيب ظهور الأقسام في صفحة الموارد
 */

const RAW_RESOURCE_CATEGORIES: ResourceCategory[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // { category: "فرص ومنح", order: 10, notes_ar: "" },
  // { category: "وظائف وسير ذاتية", order: 20, notes_ar: "" },
];

export const RESOURCE_CATEGORIES = ResourceCategoriesSchema.parse(
  RAW_RESOURCE_CATEGORIES,
);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function listResourceCategoriesSorted(): ResourceCategory[] {
  return RESOURCE_CATEGORIES.slice().sort((a, b) => a.order - b.order);
}

export function hasCategory(category: string): boolean {
  return RESOURCE_CATEGORIES.some((c) => c.category === category);
}
