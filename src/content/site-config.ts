import { SiteConfigSchema, type SiteConfigEntry } from "./types";

/**
 * Ready24  Site Config (Day-0)
 * المصدر: Sheet "SiteConfig" في قالب Day-0
 */
const RAW_SITE_CONFIG: SiteConfigEntry[] = [
  { key: "site_url", value: "https://ready24.org", notes_ar: "الرابط الرسمي" },

  { key: "brand_name_ar", value: "Ready24", notes_ar: "اسم العلامة" },
  {
    key: "brand_tagline_ar",
    value: "Opportunity | Organized | Fast",
    notes_ar: "شعار مختصر",
  },

  { key: "whatsapp_number", value: "249115646893", notes_ar: "رقم واتساب بدون +" },

  {
    key: "facebook_url",
    value: "https://web.facebook.com/ready24platform",
    notes_ar: "رابط فيسبوك",
  },
  {
    key: "linkedin_url",
    value: "https://www.linkedin.com/company/ready24platform/",
    notes_ar: "رابط لينكدإن",
  },

  {
    key: "default_seo_title_ar",
    value: "Ready24  خدمات احترافية سريعة بدون لخبطة",
    notes_ar: "عنوان SEO افتراضي",
  },
  {
    key: "default_seo_description_ar",
    value:
      "بنجهّز ليك مستندات، محتوى، وترتيب شغل بطريقة منظمة وواضحة  وتسليم سريع حسب الخدمة.",
    notes_ar: "وصف SEO افتراضي",
  },

  {
    key: "default_og_image_path",
    value: "/brand/og-default.png",
    notes_ar: "صورة OG افتراضية",
  },
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
