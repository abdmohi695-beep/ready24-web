import { z } from "zod";

/**
 * Ready24 — Content Types + Zod Schemas
 * Source of Truth: Day-0 Data Pack (Excel)
 *
 * ملاحظة:
 * - نخلي التحقق مفيد بدون ما يكون خانق.
 * - القيم المقفولة (SLA + deposit_rule) نخليها strict.
 */

/* ------------------------------ */
/* Shared helpers                  */
/* ------------------------------ */

const NonEmptyString = z.string().trim().min(1);
const OptionalString = z.string().trim().optional().default("");

const YesNoSchema = z.enum(["yes", "no"]);
export type YesNo = z.infer<typeof YesNoSchema>;

const SlaTierSchema = z.enum(["Express", "Short", "Medium", "Large"]);
export type SlaTier = z.infer<typeof SlaTierSchema>;

const DepositRuleSchema = z.enum(["50/50", "100%"]);
export type DepositRule = z.infer<typeof DepositRuleSchema>;

const SlugSchema = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case (a-z0-9-)");

/* ------------------------------ */
/* Site Config                     */
/* ------------------------------ */

export const SiteConfigEntrySchema = z.object({
  key: NonEmptyString,
  value: z.string().trim().default(""),
  notes_ar: OptionalString,
});
export type SiteConfigEntry = z.infer<typeof SiteConfigEntrySchema>;

export const SiteConfigSchema = z.array(SiteConfigEntrySchema);

/* ------------------------------ */
/* Services                        */
/* ------------------------------ */

export const ServiceSchema = z.object({
  id: NonEmptyString,
  slug: SlugSchema,

  track: NonEmptyString,

  name_ar: NonEmptyString,
  short_desc_ar: OptionalString,

  deliverables_ar: OptionalString,
  inputs_ar: OptionalString,

  revisions_included: z.number().int().min(0).default(0),

  sla_tier: SlaTierSchema,

  express_eligible: YesNoSchema.default("no"),
  express_conditions_ar: OptionalString,

  service_status: z.enum(["active", "inactive", "draft"]).default("active"),
  notes_ar: OptionalString,
});
export type Service = z.infer<typeof ServiceSchema>;

export const ServicesSchema = z.array(ServiceSchema);

/* ------------------------------ */
/* Pricing                         */
/* ------------------------------ */

export const PricingSchema = z.object({
  service_slug: SlugSchema,

  price_min_sdg: z.number().int().min(0),
  price_max_sdg: z.number().int().min(0),

  pricing_note_ar: OptionalString,

  deposit_rule: DepositRuleSchema,
  what_included_ar: OptionalString,
  what_not_included_ar: OptionalString,
});
export type Pricing = z.infer<typeof PricingSchema>;

export const PricingListSchema = z.array(PricingSchema);

/* ------------------------------ */
/* Web Packages                    */
/* ------------------------------ */

export const WebPackageSchema = z.object({
  package_code: z.string().trim().min(1).max(10),
  title_ar: NonEmptyString,
  short_desc_ar: OptionalString,

  price_min_sdg: z.number().int().min(0),
  price_max_sdg: z.number().int().min(0),

  sla_tier: SlaTierSchema,
  deliverables_ar: OptionalString,
  inputs_ar: OptionalString,

  revisions_included: z.number().int().min(0).default(0),
  deposit_rule: DepositRuleSchema,

  notes_ar: OptionalString,
});
export type WebPackage = z.infer<typeof WebPackageSchema>;

export const WebPackagesSchema = z.array(WebPackageSchema);

/* ------------------------------ */
/* Work / Portfolio                */
/* ------------------------------ */

export const WorkMediaSchema = z.object({
  media_type: z.enum(["image", "video", "youtube"]).default("image"),
  media_path_or_url: NonEmptyString,
  alt_ar: OptionalString,
  media_order: z.number().int().min(0).default(0),
});
export type WorkMedia = z.infer<typeof WorkMediaSchema>;

export const WorkItemSchema = z.object({
  case_slug: SlugSchema,
  title_ar: NonEmptyString,
  summary_ar: OptionalString,

  service_slug: SlugSchema.optional().or(z.literal("")).default(""),

  privacy_status: z.enum(["public", "blurred", "hidden"]).default("public"),

  media: z.array(WorkMediaSchema).default([]),

  published: YesNoSchema.default("no"),
});
export type WorkItem = z.infer<typeof WorkItemSchema>;

// ✅ هذا هو الـexport الذي كان ناقصًا ويسبب الخطأ
export const PortfolioItemsSchema = z.array(WorkItemSchema);

/* ------------------------------ */
/* Resources                       */
/* ------------------------------ */

export const ResourceSchema = z.object({
  id: NonEmptyString,
  category: NonEmptyString,

  ar_name: NonEmptyString,
  en_name: OptionalString,

  url: z.string().trim().url(),
  ar_summary: OptionalString,

  tags: OptionalString,
  risk_note_ar: OptionalString,

  related_service_slug: SlugSchema.optional().or(z.literal("")).default(""),

  published: YesNoSchema.default("yes"),
});
export type Resource = z.infer<typeof ResourceSchema>;

export const ResourcesSchema = z.array(ResourceSchema);

/* ------------------------------ */
/* Resource Categories             */
/* ------------------------------ */

export const ResourceCategorySchema = z.object({
  category: NonEmptyString,
  order: z.number().int().min(0).default(0),
  notes_ar: OptionalString,
});
export type ResourceCategory = z.infer<typeof ResourceCategorySchema>;

export const ResourceCategoriesSchema = z.array(ResourceCategorySchema);

/* ------------------------------ */
/* Ambassadors                     */
/* ------------------------------ */

export const AmbassadorSchema = z.object({
  code: NonEmptyString,

  display_name_ar: NonEmptyString,
  name_variants_ar: OptionalString,

  city: OptionalString,
  country: OptionalString,

  profile_image_path: OptionalString,

  whatsapp: z
    .string()
    .trim()
    .regex(/^\d{6,20}$/, "whatsapp must be digits only (no +, no spaces)")
    .optional()
    .default(""),

  facebook: z.string().trim().url().or(z.literal("")).optional().default(""),
  linkedin: z.string().trim().url().or(z.literal("")).optional().default(""),

  status: z.enum(["active", "inactive"]).default("active"),
  consent_confirmed: YesNoSchema.default("no"),

  notes_ar: OptionalString,
});
export type Ambassador = z.infer<typeof AmbassadorSchema>;

export const AmbassadorsSchema = z.array(AmbassadorSchema);

/* ------------------------------ */
/* Commissions v1                  */
/* ------------------------------ */

export const CommissionRuleSchema = z.object({
  track: NonEmptyString,

  commission_type: z.enum(["percent", "fixed"]),
  commission_value: z.number().min(0),

  web_package_code: OptionalString,
  notes_ar: OptionalString,

  active: YesNoSchema.default("yes"),
});
export type CommissionRule = z.infer<typeof CommissionRuleSchema>;

export const CommissionsSchema = z.array(CommissionRuleSchema);

/* ------------------------------ */
/* FAQ                             */
/* ------------------------------ */

export const FaqSchema = z.object({
  id: NonEmptyString,
  category: NonEmptyString,
  q_ar: NonEmptyString,
  a_ar: NonEmptyString,
  published: YesNoSchema.default("yes"),
});
export type Faq = z.infer<typeof FaqSchema>;

export const FaqsSchema = z.array(FaqSchema);

/* ------------------------------ */
/* Policy Snippets                 */
/* ------------------------------ */

export const PolicySnippetSchema = z.object({
  key: NonEmptyString,
  text_ar: NonEmptyString,
  where_used: OptionalString,
});
export type PolicySnippet = z.infer<typeof PolicySnippetSchema>;

export const PolicySnippetsSchema = z.array(PolicySnippetSchema);

/* ------------------------------ */
/* Redirects                       */
/* ------------------------------ */

export const RedirectSchema = z.object({
  from_path: z.string().trim().min(1),
  to_path: z.string().trim().min(1),
  status_code: z.union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)]),
  notes_ar: OptionalString,
});
export type Redirect = z.infer<typeof RedirectSchema>;

export const RedirectsSchema = z.array(RedirectSchema);

/* ------------------------------ */
/* SEO Map + OpenGraph             */
/* ------------------------------ */

export const SeoEntrySchema = z.object({
  path: z.string().trim().min(1),
  title_ar: NonEmptyString,
  description_ar: OptionalString,

  canonical: z.string().trim().min(1).default("/"),

  og_title_ar: OptionalString,
  og_description_ar: OptionalString,
  og_image_path: OptionalString,

  robots: z.string().trim().optional().default("index,follow"),
});
export type SeoEntry = z.infer<typeof SeoEntrySchema>;

export const SeoEntriesSchema = z.array(SeoEntrySchema);
