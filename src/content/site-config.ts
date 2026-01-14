import { SiteConfigSchema, type SiteConfigEntry } from "./types";

/**
 * Ready24 — Site Config (Day-0)
 * المصدر: Sheet "SiteConfig" في قالب Day-0.
 *
 * ملاحظة: نبدأ بمصفوفة فاضية عشان المشروع يشتغل بدون ما يفرض افتراضات،
 * وبعدين نملأها من القالب مباشرة.
 */

const RAW_SITE_CONFIG: SiteConfigEntry[] = [
  // مثال (انسخه وعدّل عليه لاحقًا):
  // { key: "site_name_ar", value: "Ready24", notes_ar: "اسم الموقع بالعربية" },
  // { key: "whatsapp_main", value: "249115646893", notes_ar: "رقم واتساب الرئيسي بدون +" },
];

export const SITE_CONFIG = SiteConfigSchema.parse(RAW_SITE_CONFIG);

export function getSiteConfigValue(key: string, fallback?: string): string | undefined {
  const found = SITE_CONFIG.find((x) => x.key === key)?.value;
  return found ?? fallback;
}

export function siteConfigToMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const item of SITE_CONFIG) {
    if (item.value) map[item.key] = item.value;
  }
  return map;
}
