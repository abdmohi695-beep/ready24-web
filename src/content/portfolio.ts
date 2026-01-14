import { PortfolioItemsSchema, type WorkItem } from "./types";

/**
 * Ready24 — Work / Portfolio (Day-0)
 * المصدر: Sheet "Work" في قالب Day-0.
 *
 * الهدف:
 * - صفحة "أعمالنا" تعرض حالات/نماذج عمل.
 * - كل Case ممكن يكون عنده أكثر من Media (صور/فيديو) بترتيب ثابت عبر media_order.
 * - privacy_status يتحكم: public / blurred / hidden (حسب سياسة الثقة والخصوصية).
 */

const RAW_WORK: WorkItem[] = [
  // مثال (انسخه وعدّل عليه لاحقًا من القالب):
  // {
  //   case_slug: "cv-before-after-001",
  //   title_ar: "تحسين سيرة ذاتية — قبل/بعد",
  //   summary_ar: "مثال سريع يوضح فرق ترتيب المحتوى وتحسين الصياغة لملاءمة ATS.",
  //   service_slug: "cv-review-pro",
  //   privacy_status: "public",
  //   media: [
  //     {
  //       media_type: "image",
  //       media_path_or_url: "/media/work/cv-001-before.webp",
  //       alt_ar: "سيرة ذاتية قبل التحسين",
  //       media_order: 1,
  //     },
  //     {
  //       media_type: "image",
  //       media_path_or_url: "/media/work/cv-001-after.webp",
  //       alt_ar: "سيرة ذاتية بعد التحسين",
  //       media_order: 2,
  //     },
  //   ],
  //   published: "yes",
  // },
];

export const WORK = PortfolioItemsSchema.parse(RAW_WORK);

/* ------------------------------ */
/* Helpers                         */
/* ------------------------------ */

export function listPublishedWork(): WorkItem[] {
  return WORK.filter((w) => w.published === "yes");
}

export function getWorkBySlug(caseSlug: string): WorkItem | undefined {
  return WORK.find((w) => w.case_slug === caseSlug);
}
