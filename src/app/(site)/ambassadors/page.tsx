// src/app/(site)/resources/page.tsx
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { buildWhatsappLink } from "@/lib/site";
import { listPublishedResources, listResourcesByCategory } from "@/content/resources";
import { listResourceCategoriesSorted } from "@/content/resource-categories";

export const metadata: Metadata = {
  title: "الموارد | Ready24",
};

function parseTags(tags: string) {
  return (tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 3);
}

export default function Page() {
  const waFallback = "https://wa.me/249115646893";
  const askLink =
    buildWhatsappLink(
      "مرحباً Ready24، أريد مساعدة في اختيار الخدمة المناسبة، وهذه تفاصيل طلبي: ____",
    ) || waFallback;

  const resources = listPublishedResources();
  const categoriesRows = listResourceCategoriesSorted();
  const categories =
    categoriesRows.length > 0
      ? categoriesRows.map((c) => c.category)
      : Array.from(new Set(resources.map((r) => r.category))).sort((a, b) =>
          a.localeCompare(b, "ar"),
        );

  return (
    <main className="space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold">الموارد</h1>
        <p className="max-w-3xl text-sm leading-7 text-neutral-700">
          روابط مختارة تساعدك في التقديم، التعلم، وبناء ملف مهني قوي. نحن نضيفها تدريجياً،
          ونفضّل دائماً المصادر الواضحة والموثوقة.
        </p>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/services">استعرض الخدمات</ButtonLink>
          <ButtonLink href={askLink} variant="outline" target="_blank" rel="noreferrer">
            اسألنا عبر واتساب
          </ButtonLink>
        </div>
      </section>

      {resources.length === 0 ? (
        <Card className="p-6">
          <div className="text-base font-semibold">الموارد قيد التحديث</div>
          <p className="mt-2 text-sm leading-7 text-neutral-700">
            لم نضف موارد منشورة بعد. يمكنك الآن طلب الخدمة المناسبة وسنرشدك لما تحتاجه من
            روابط وخطوات حسب حالتك.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/order">ابدأ طلباً الآن</ButtonLink>
            <ButtonLink href={askLink} variant="outline" target="_blank" rel="noreferrer">
              واتساب Ready24
            </ButtonLink>
          </div>
        </Card>
      ) : (
        <section className="space-y-8">
          {categories.map((cat) => {
            const items =
              categoriesRows.length > 0
                ? listResourcesByCategory(cat)
                : resources.filter((r) => r.category === cat);

            if (items.length === 0) return null;

            const catNotes =
              categoriesRows.find((c) => c.category === cat)?.notes_ar?.trim() || "";

            return (
              <div key={cat} className="space-y-3">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{cat}</h2>
                    {catNotes ? (
                      <p className="mt-1 text-sm text-neutral-600">{catNotes}</p>
                    ) : null}
                  </div>
                  <div className="text-sm text-neutral-600">{items.length} مورد</div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {items.map((r) => {
                    const tags = parseTags(r.tags);
                    const related = (r.related_service_slug || "").trim();
                    const relatedHref = related ? `/services#${related}` : "";

                    return (
                      <Card key={r.id} className="p-6">
                        <div className="space-y-2">
                          <div className="text-lg font-semibold">{r.ar_name}</div>
                          {r.ar_summary ? (
                            <p className="text-sm leading-7 text-neutral-700">
                              {r.ar_summary}
                            </p>
                          ) : null}

                          {tags.length > 0 ? (
                            <div className="flex flex-wrap gap-2 pt-1">
                              {tags.map((t) => (
                                <span
                                  key={`${r.id}-${t}`}
                                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          {r.risk_note_ar ? (
                            <p className="pt-2 text-xs leading-6 text-neutral-600">
                              تنبيه: {r.risk_note_ar}
                            </p>
                          ) : null}

                          <div className="pt-4 flex flex-wrap gap-3">
                            <ButtonLink href={r.url} target="_blank" rel="noreferrer">
                              فتح الرابط
                            </ButtonLink>

                            {relatedHref ? (
                              <ButtonLink href={relatedHref} variant="outline">
                                خدمة مرتبطة
                              </ButtonLink>
                            ) : null}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}
