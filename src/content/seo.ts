import { SeoEntriesSchema, type SeoEntry } from "./types";

/**
 * Ready24  SEO Map (Day-0)
 * المصدر: Sheet "SEO" في قالب Day-0
 */
const RAW_SEO_ENTRIES: SeoEntry[] = [
  {
    path: "/",
    title_ar: "Ready24  خدمات احترافية سريعة بدون لخبطة",
    description_ar:
      "بنجهّز ليك مستندات، محتوى، وترتيب شغل بطريقة منظمة وواضحة  وتسليم سريع حسب الخدمة.",
    canonical: "/",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },

  {
    path: "/services",
    title_ar: "الخدمات | Ready24",
    description_ar:
      "كتالوج خدمات Ready24: وظائف، طلاب، أعمال، ومواقع  كل خدمة واضحة بمدخلاتها وتسليمها.",
    canonical: "/services",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },
  {
    path: "/pricing",
    title_ar: "الأسعار | Ready24",
    description_ar:
      "نطاقات أسعار واضحة حسب نوع الخدمة والوقت (SLA)  والسعر النهائي يتثبت بعد مراجعة الطلب.",
    canonical: "/pricing",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },

  {
    path: "/how-we-work",
    title_ar: "كيف نعمل | Ready24",
    description_ar: "خطوات واضحة من استلام الطلب للمراجعة للتنفيذ للتسليم  بدون لخبطة.",
    canonical: "/how-we-work",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },
  {
    path: "/work",
    title_ar: "أعمالنا | Ready24",
    description_ar: "نماذج من شغل Ready24: قبل وبعد، مع توضيح الفكرة والنتيجة.",
    canonical: "/work",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },

  {
    path: "/resources",
    title_ar: "الموارد والفرص | Ready24",
    description_ar: "روابط ومنح وفرص وأدوات مرتبة  عشان توصل للمعلومة بسرعة.",
    canonical: "/resources",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },

  {
    path: "/ambassadors",
    title_ar: "السفراء | Ready24",
    description_ar:
      "برنامج السفراء: شارك بكودك وخلي الناس تطلب  وعمولتك محفوظة بالقواعد.",
    canonical: "/ambassadors",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },
  {
    path: "/faq",
    title_ar: "الأسئلة الشائعة | Ready24",
    description_ar: "إجابات مباشرة لأكثر الأسئلة تكرارًا عن الطلب، الدفع، والتسليم.",
    canonical: "/faq",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },

  {
    path: "/policies",
    title_ar: "السياسات | Ready24",
    description_ar: "سياسات الاستخدام، الخصوصية، والدفع والتسليم  بصيغة واضحة ومختصرة.",
    canonical: "/policies",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },
  {
    path: "/contact",
    title_ar: "تواصل معنا | Ready24",
    description_ar: "طرق التواصل الرسمية وروابط Ready24.",
    canonical: "/contact",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },
  {
    path: "/order",
    title_ar: "طلب خدمة | Ready24",
    description_ar:
      "ابدأ طلبك بسرعة وبمعلومات مرتبة  ونرد عليك بتأكيد السعر وخطة التنفيذ.",
    canonical: "/order",
    og_title_ar: "",
    og_description_ar: "",
    og_image_path: "/brand/og-default.webp",
    robots: "index,follow",
  },
];

export const SEO_ENTRIES = SeoEntriesSchema.parse(RAW_SEO_ENTRIES);
