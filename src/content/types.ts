import { z } from "zod";

/**
 * Ready24 — Content Types & Schemas (Day-0 Source of Truth)
 *
 * هذا الملف هو الأساس: كل ملفات src/content/*.ts ستعتمد عليه.
 * صُمم ليطابق أعمدة قالب Day-0 Data Template v3 (Sheets).
 */

/* ---------------------------------- */
/* Shared enums & helpers             */
/* ---------------------------------- */

export const TRACKS = ["jobs", "students", "business", "web"] as const;
export type Track = (typeof TRACKS)[number];

export const SLA_TIERS = ["Express", "Short", "Medium", "Large"] as const;
export type SlaTier = (typeof SLA_TIERS)[number];

export const DEPOSIT_RULES = ["50/50", "100%"] as const;
export type DepositRule = (typeof DEPOSIT_RULES)[number];

export const YES_NO = ["yes", "no"] as const;
export type YesNo = (typeof YES_NO)[number];

export const ACTIVE_INACTIVE = ["active", "inactive"] as const;
export type ActiveStatus = (typeof ACTIVE_INACTIVE)[number];

export const PUBLISHED = ["yes", "no"] as const;
export type Published = (typeof PUBLISHED)[number];

export const COMMISSION_TYPES = ["percent", "fixed"] as const;
export type CommissionType = (typeof COMMISSION_TYPES)[number];

export const WEB_PACKAGE_CODES = ["A", "B", "C"] as const;
export type WebPackageCode = (typeof WEB_PACKAGE_CODES)[number];

export const MEDIA_TYPES = ["webp", "pdf", "youtube"] as const;
export type MediaType = (typeof MEDIA_TYPES)[number];

const nonEmpty = z.string().trim().min(1, "هذا الحقل مطلوب (غير فارغ).");

const slug = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug يجب أن يكون lowercase وبـ - فقط.");

const pathLike = z
  .string()
  .trim()
  .min(1)
  .refine(
    (v) => v.startsWith("/") && !v.startsWith("//") && !v.includes(" "),
    "Path يجب أن يبدأ بـ / ولا يحتوي مسافات.",
  );

const urlOrPath = z
  .string()
  .trim()
  .min(1)
  .refine(
    (v) => v.startsWith("/") || /^https?:\/\//i.test(v),
    "يجب أن يكون رابطًا (http/https) أو مسارًا يبدأ بـ /",
  );

const optionalTrimmed = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => (typeof v === "string" ? v.trim() : undefined))
  .refine((v) => v === undefined || v.length > 0, "لا تترك نصًا مكوّنًا من مسافات فقط.");

const yesNoSchema = z.enum(YES_NO);
const publishedSchema = z.enum(PUBLISHED);
const activeInactiveSchema = z.enum(ACTIVE_INACTIVE);
const trackSchema = z.enum(TRACKS);
const slaTierSchema = z.enum(SLA_TIERS);
const depositRuleSchema = z.enum(DEPOSIT_RULES);
const mediaTypeSchema = z.enum(MEDIA_TYPES);
const webPackageCodeSchema = z.enum(WEB_PACKAGE_CODES);

const commaTagsSchema = z.union([z.string(), z.array(z.string())]).transform((v) => {
  const raw = Array.isArray(v) ? v.join(",") : v;
  const tags = raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  // 0-3 tags حسب القالب
  return tags.slice(0, 3);
});

/* ---------------------------------- */
/* Sheet: SiteConfig                   */
/* key, value, notes_ar                */
/* ---------------------------------- */

export const SiteConfigEntrySchema = z.object({
  key: nonEmpty,
  value: optionalTrimmed,
  notes_ar: optionalTrimmed,
});
export type SiteConfigEntry = z.infer<typeof SiteConfigEntrySchema>;

/* ---------------------------------- */
/* Sheet: Services                     */
/* ---------------------------------- */

export const ServiceSchema = z.object({
  id: nonEmpty,
  slug,
  track: trackSchema,
  name_ar: nonEmpty,
  short_desc_ar: nonEmpty,
  deliverables_ar: nonEmpty, // نص (3-5 نقاط) — نخليه نص الآن ونفصله لاحقًا عند العرض
  inputs_ar: nonEmpty, // نص (مدخلات العميل)
  revisions_included: z.coerce.number().int().min(0),
  sla_tier: slaTierSchema,
  express_eligible: yesNoSchema,
  express_conditions_ar: optionalTrimmed,
  service_status: activeInactiveSchema,
  notes_ar: optionalTrimmed,
});
export type Service = z.infer<typeof ServiceSchema>;

/* ---------------------------------- */
/* Sheet: Pricing                      */
/* ---------------------------------- */

export const PricingSchema = z.object({
  service_slug: slug,
  price_min_sdg: z.coerce.number().int().min(0),
  price_max_sdg: z.coerce.number().int().min(0),
  pricing_note_ar: nonEmpty,
  deposit_rule: depositRuleSchema, // 50/50 or 100%
  what_included_ar: nonEmpty,
  what_not_included_ar: optionalTrimmed,
});
export type Pricing = z.infer<typeof PricingSchema>;

/* ---------------------------------- */
/* Sheet: WebPackages                  */
/* ---------------------------------- */

export const WebPackageSchema = z.object({
  package_code: webPackageCodeSchema,
  title_ar: nonEmpty,
  short_desc_ar: nonEmpty,
  price_min_sdg: z.coerce.number().int().min(0),
  price_max_sdg: z.coerce.number().int().min(0),
  sla_tier: slaTierSchema,
  deliverables_ar: nonEmpty,
  inputs_ar: nonEmpty,
  revisions_included: z.coerce.number().int().min(0),
  deposit_rule: depositRuleSchema,
  notes_ar: optionalTrimmed,
});
export type WebPackage = z.infer<typeof WebPackageSchema>;

/* ---------------------------------- */
/* Sheet: Work                         */
/* (row per media item)                */
/* ---------------------------------- */

export const WorkRowSchema = z
  .object({
    case_slug: slug,
    track: trackSchema,
    title_ar: nonEmpty,
    summary_ar: nonEmpty, // 3-5 أسطر
    service_slug: optionalTrimmed, // CTA
    media_type: mediaTypeSchema,
    media_order: z.coerce.number().int().min(0),
    media_path_or_url: urlOrPath,
    media_alt_ar: optionalTrimmed, // required for images, optional for pdf/youtube
    privacy_status: z.literal("confirmed"),
    privacy_note_ar: optionalTrimmed,
    published: publishedSchema,
    notes_ar: optionalTrimmed,
  })
  .superRefine((row, ctx) => {
    if (
      row.media_type === "webp" &&
      (!row.media_alt_ar || row.media_alt_ar.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["media_alt_ar"],
        message: "للصور (webp) يجب توفير alt بالعربي.",
      });
    }
    if (row.published === "yes" && row.privacy_status !== "confirmed") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["privacy_status"],
        message: "أي عنصر منشور يجب أن يكون privacy_status = confirmed.",
      });
    }
  });

export type WorkRow = z.infer<typeof WorkRowSchema>;

/* ---------------------------------- */
/* Sheet: ResourceCategories           */
/* ---------------------------------- */

export const ResourceCategorySchema = z.object({
  category: nonEmpty, // ثابت
  order: z.coerce.number().int().min(0),
  notes_ar: optionalTrimmed,
});
export type ResourceCategory = z.infer<typeof ResourceCategorySchema>;

/* ---------------------------------- */
/* Sheet: Resources                    */
/* ---------------------------------- */

export const ResourceSchema = z.object({
  id: slug, // slug ثابت
  category: nonEmpty, // ثابت (يرتبط بـ ResourceCategories)
  ar_name: nonEmpty,
  en_name: optionalTrimmed,
  url: z.string().trim().min(1), // بعض الروابط قد لا تمر url() بسبب أحرف خاصة — نتحقق لاحقًا
  ar_summary: nonEmpty,
  tags: commaTagsSchema, // 0-3
  risk_note_ar: optionalTrimmed,
  related_service_slug: optionalTrimmed,
  published: publishedSchema,
});
export type Resource = z.infer<typeof ResourceSchema>;

/* ---------------------------------- */
/* Sheet: Ambassadors                  */
/* ---------------------------------- */

export const AmbassadorSchema = z.object({
  code: nonEmpty, // referral code
  display_name_ar: nonEmpty,
  name_variants_ar: optionalTrimmed,
  city: nonEmpty,
  country: nonEmpty,
  profile_image_path: urlOrPath, // غالبًا /media/ambassadors/xxx.webp
  whatsapp: optionalTrimmed,
  facebook: optionalTrimmed,
  linkedin: optionalTrimmed,
  status: activeInactiveSchema,
  consent_confirmed: z.literal("yes"),
  notes_ar: optionalTrimmed,
});
export type Ambassador = z.infer<typeof AmbassadorSchema>;

/* ---------------------------------- */
/* Sheet: Commissions_v1               */
/* ---------------------------------- */

export const CommissionRuleSchema = z.object({
  track: trackSchema,
  commission_type: z.enum(COMMISSION_TYPES),
  commission_value: z.coerce.number().min(0),
  web_package_code: z
    .union([webPackageCodeSchema, z.literal(""), z.null(), z.undefined()])
    .transform((v) => (v ? v : undefined)),
  notes_ar: optionalTrimmed,
  active: z.enum(YES_NO),
});
export type CommissionRule = z.infer<typeof CommissionRuleSchema>;

/* ---------------------------------- */
/* Sheet: FAQ                          */
/* ---------------------------------- */

export const FaqSchema = z.object({
  id: slug, // slug ثابت
  category: nonEmpty,
  q_ar: nonEmpty,
  a_ar: nonEmpty,
  published: publishedSchema,
});
export type Faq = z.infer<typeof FaqSchema>;

/* ---------------------------------- */
/* Sheet: PolicySnippets               */
/* ---------------------------------- */

export const PolicySnippetSchema = z.object({
  key: nonEmpty,
  text_ar: nonEmpty,
  where_used: optionalTrimmed,
});
export type PolicySnippet = z.infer<typeof PolicySnippetSchema>;

/* ---------------------------------- */
/* Sheet: SEO                          */
/* ---------------------------------- */

export const SeoEntrySchema = z.object({
  path: pathLike,
  title_ar: nonEmpty,
  description_ar: nonEmpty,
  og_title_ar: optionalTrimmed,
  og_description_ar: optionalTrimmed,
  og_image_path: optionalTrimmed, // مسار داخل public أو رابط
});
export type SeoEntry = z.infer<typeof SeoEntrySchema>;

/* ---------------------------------- */
/* Sheet: Redirects                    */
/* ---------------------------------- */

export const RedirectSchema = z.object({
  from_path: pathLike,
  to_path: pathLike,
  status_code: z.coerce
    .number()
    .int()
    .refine((n) => n === 301 || n === 308, {
      message: "status_code يجب أن يكون 301 أو 308 فقط.",
    }),
  notes_ar: optionalTrimmed,
});
export type Redirect = z.infer<typeof RedirectSchema>;

/* ---------------------------------- */
/* Collections Schemas (arrays)        */
/* ---------------------------------- */

export const SiteConfigSchema = z.array(SiteConfigEntrySchema);
export const ServicesSchema = z.array(ServiceSchema);
export const PricingListSchema = z.array(PricingSchema);
export const WebPackagesSchema = z.array(WebPackageSchema);
export const WorkSchema = z.array(WorkRowSchema);
export const ResourceCategoriesSchema = z.array(ResourceCategorySchema);
export const ResourcesSchema = z.array(ResourceSchema);
export const AmbassadorsSchema = z.array(AmbassadorSchema);
export const CommissionsSchema = z.array(CommissionRuleSchema);
export const FaqsSchema = z.array(FaqSchema);
export const PolicySnippetsSchema = z.array(PolicySnippetSchema);
export const SeoSchema = z.array(SeoEntrySchema);
export const RedirectsSchema = z.array(RedirectSchema);

/* ---------------------------------- */
/* Day-0 bundle type (optional use)    */
/* ---------------------------------- */

export const Day0BundleSchema = z.object({
  siteConfig: SiteConfigSchema,
  services: ServicesSchema,
  pricing: PricingListSchema,
  webPackages: WebPackagesSchema,
  work: WorkSchema,
  resourceCategories: ResourceCategoriesSchema,
  resources: ResourcesSchema,
  ambassadors: AmbassadorsSchema,
  commissionsV1: CommissionsSchema,
  faq: FaqsSchema,
  policySnippets: PolicySnippetsSchema,
  seo: SeoSchema,
  redirects: RedirectsSchema,
});
export type Day0Bundle = z.infer<typeof Day0BundleSchema>;
