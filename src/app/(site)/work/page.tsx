import type { Metadata } from "next";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { resolveSeo } from "@/lib/seo";
import { listPublishedWork } from "@/content/portfolio";
import type { WorkItem } from "@/content/types";

export function generateMetadata(): Metadata {
  const s = resolveSeo("/work");

  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: s.canonicalUrl },
    robots: s.robots,
    openGraph: {
      title: s.ogTitle,
      description: s.ogDescription,
      url: s.canonicalUrl,
      type: "website",
      images: s.ogImageUrl ? [{ url: s.ogImageUrl }] : undefined,
    },
  };
}

function sortMedia(item: WorkItem) {
  return item.media.slice().sort((a, b) => (a.media_order ?? 0) - (b.media_order ?? 0));
}

function primaryMedia(item: WorkItem) {
  const sorted = sortMedia(item);
  return sorted[0];
}

function privacyBadge(status: WorkItem["privacy_status"]) {
  if (status === "hidden") return "مخفية";
  if (status === "blurred") return "مموهة";
  return "متاحة";
}

function privacyText(status: WorkItem["privacy_status"]) {
  if (status === "hidden")
    return "هذه العينة غير معروضة حفاظًا على الخصوصية. يمكننا إرسال أمثلة مشابهة عند الطلب.";
  if (status === "blurred")
    return "تم تمويه العينة حفاظًا على الخصوصية. الفكرة والأسلوب واضحان دون كشف بيانات.";
  return "عينة منشورة بصيغة آمنة دون بيانات حساسة.";
}

function MediaPreview({ item }: { item: WorkItem }) {
  const m = primaryMedia(item);

  if (!m || item.privacy_status === "hidden") {
    return (
      <div className="flex h-44 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 px-4 text-center text-sm text-neutral-700">
        لا توجد وسائط معروضة لهذه العينة.
      </div>
    );
  }

  const isBlurred = item.privacy_status === "blurred";
  const baseClass =
    "relative h-44 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100";

  if (m.media_type === "image") {
    return (
      <div className={baseClass}>
        <Image
          src={m.media_path_or_url}
          alt={m.alt_ar?.trim() || item.title_ar}
          fill
          className={isBlurred ? "object-cover blur-sm scale-105" : "object-cover"}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        {isBlurred ? (
          <div className="absolute inset-0 flex items-end">
            <div className="w-full bg-black/45 px-3 py-2 text-xs text-white">
              تمويه خصوصية
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  // video / youtube: نعرض بطاقة بسيطة بدل تضمين (آمن + ثابت)
  return (
    <div className={baseClass}>
      <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
        <div className="text-2xl">🎬</div>
        <div className="text-sm font-medium text-neutral-900">محتوى مرئي</div>
        <div className="text-xs text-neutral-700">
          {m.media_type === "youtube" ? "رابط يوتيوب" : "ملف فيديو"}
        </div>

        <a
          href={m.media_path_or_url}
          className="mt-1 inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-3 py-2 text-xs font-medium text-neutral-900 hover:bg-neutral-50"
          target="_blank"
          rel="noreferrer"
        >
          فتح الرابط
        </a>
      </div>

      {isBlurred ? (
        <div className="absolute bottom-0 left-0 right-0 bg-black/45 px-3 py-2 text-xs text-white">
          تمويه خصوصية
        </div>
      ) : null}
    </div>
  );
}

export default function WorkPage() {
  const items = listPublishedWork();

  return (
    <main className="space-y-10">
      <section className="r24-surface p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-semibold md:text-3xl">أعمالنا</h1>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              هنا نعرض نماذج مختارة من شغلنا بصيغة آمنة. الهدف بسيط: تشوف الجودة قبل ما
              تطلب، وتفهم شكل التسليم المتوقع بدون وعود مبالغ فيها.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <ButtonLink href="/services" variant="outline" size="md">
              تصفح الخدمات
            </ButtonLink>
            <ButtonLink href="/order" variant="solid" size="md">
              ابدأ طلبك الآن
            </ButtonLink>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="text-sm font-semibold">خصوصية أولًا</div>
            <div className="mt-1 text-sm text-neutral-700">
              لا ننشر بيانات شخصية أو حساسة. عند الحاجة نستخدم تمويه أو نخفي العينة.
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="text-sm font-semibold">توقعات واقعية</div>
            <div className="mt-1 text-sm text-neutral-700">
              كل طلب يُقيَّم حسب حجمه وتعقيده قبل تثبيت السعر وخطة التنفيذ.
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="text-sm font-semibold">تسليم مرتب</div>
            <div className="mt-1 text-sm text-neutral-700">
              نشتغل على وضوح المحتوى والشكل النهائي، مع مراجعات حسب الخدمة.
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">نماذج مختارة</h2>
          <div className="text-sm text-neutral-600">
            المعروض الآن:{" "}
            <span className="font-semibold text-neutral-900">{items.length}</span>
          </div>
        </div>

        {items.length === 0 ? (
          <Card className="p-6">
            <div className="max-w-2xl">
              <h3 className="text-base font-semibold">لا توجد نماذج منشورة بعد</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-700">
                نحن جاهزون، لكننا نبدأ بدون افتراضات. أول ما يتم إدخال بيانات “أعمالنا” من
                حزمة اليوم صفر، ستظهر النماذج هنا تلقائيًا.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ButtonLink href="/order" variant="solid" size="md">
                  اطلب خدمة الآن
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="md">
                  تواصل معنا
                </ButtonLink>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const badge = privacyBadge(item.privacy_status);
              const note = privacyText(item.privacy_status);

              return (
                <Card key={item.case_slug} className="p-4">
                  <MediaPreview item={item} />

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-neutral-900">
                        {item.title_ar}
                      </div>
                      {item.summary_ar?.trim() ? (
                        <p className="mt-1 line-clamp-3 text-sm leading-7 text-neutral-700">
                          {item.summary_ar}
                        </p>
                      ) : (
                        <p className="mt-1 text-sm leading-7 text-neutral-700">
                          وصف مختصر غير متوفر بعد.
                        </p>
                      )}
                    </div>

                    <span className="shrink-0 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-800">
                      {badge}
                    </span>
                  </div>

                  <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs leading-6 text-neutral-700">
                    {note}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.service_slug?.trim() ? (
                      <ButtonLink
                        href={`/order?service=${encodeURIComponent(item.service_slug)}`}
                        variant="solid"
                        size="sm"
                      >
                        اطلب هذه الخدمة
                      </ButtonLink>
                    ) : (
                      <ButtonLink href="/order" variant="solid" size="sm">
                        اطلب خدمة الآن
                      </ButtonLink>
                    )}

                    <ButtonLink href="/services" variant="outline" size="sm">
                      رجوع للخدمات
                    </ButtonLink>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section className="r24-surface p-6 md:p-8">
        <h2 className="text-lg font-semibold">ملاحظة مهمة</h2>
        <p className="mt-2 text-sm leading-7 text-neutral-700">
          النماذج هنا ليست “قوالب جاهزة”؛ هي أمثلة لفهم الجودة. كل عميل له سياق مختلف،
          لذلك نتيجتك النهائية تُبنى على مدخلاتك، وضوح الهدف، والوقت المتاح للتسليم.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <ButtonLink href="/pricing" variant="outline" size="md">
            شاهد الأسعار
          </ButtonLink>
          <ButtonLink href="/how-we-work" variant="outline" size="md">
            كيف نعمل
          </ButtonLink>
          <ButtonLink href="/order" variant="solid" size="md">
            ابدأ الطلب
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
