import type { Metadata } from "next";
import Image from "next/image";

import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { resolveSeo } from "@/lib/seo";
import { getSiteConfig } from "@/lib/site";

import { listActiveAmbassadors } from "@/content/ambassadors";
import {
  listActiveCommissionRules,
  listCommissionRulesByTrack,
} from "@/content/commissions-v1";
import type { CommissionRule } from "@/content/types";

const seo = resolveSeo("/ambassadors");

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: seo.canonicalUrl },
  robots: seo.robots,
  openGraph: {
    title: seo.ogTitle,
    description: seo.ogDescription,
    url: seo.canonicalUrl,
    images: seo.ogImageUrl ? [{ url: seo.ogImageUrl }] : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.ogDescription,
    images: seo.ogImageUrl ? [seo.ogImageUrl] : undefined,
  },
};

function trackLabel(track: string): string {
  switch (track) {
    case "jobs":
      return "خدمات الوظائف والسير الذاتية";
    case "students":
      return "خدمات الطلاب والمذكرات";
    case "business":
      return "خدمات الأعمال والمحتوى";
    case "web":
      return "خدمات المواقع والحزم";
    default:
      return "خدمات أخرى";
  }
}

function formatCommission(rule: CommissionRule): string {
  if (rule.commission_type === "percent") return `${rule.commission_value}%`;
  return `مبلغ ثابت: ${rule.commission_value}`;
}

function buildWhatsappLink(message?: string): string {
  const number = getSiteConfig("whatsapp_number", "249115646893")
    .replace(/[^\d]/g, "")
    .trim();
  const base = number ? `https://wa.me/${number}` : "https://wa.me/249115646893";
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export default function AmbassadorsPage() {
  const ambassadors = listActiveAmbassadors();

  const rulesAll = listActiveCommissionRules();
  const tracks = Array.from(new Set(rulesAll.map((r) => r.track)));

  const joinMessage =
    "مرحباً Ready24، أريد الانضمام لبرنامج السفراء. الرجاء تزويدي بالشروط والخطوات.";

  return (
    <main id="main" className="space-y-10">
      {/* Hero */}
      <section className="r24-surface overflow-hidden p-6 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/brand/logo-horizontal.png"
                alt="Ready24"
                width={260}
                height={72}
                priority
              />
            </div>

            <h1 className="text-2xl font-semibold leading-snug md:text-3xl">
              برنامج سفراء Ready24
            </h1>

            <p className="mt-3 text-base leading-relaxed text-neutral-700">
              إذا كان لديك شبكة أصدقاء أو طلاب أو زملاء يحتاجون خدمات مرتّبة وسريعة، يمكنك
              مشاركة كودك. عندما يطلبون عبره، تُسجّل عمولتك وفق القواعد الموضّحة أدناه.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/order">ابدأ طلباً الآن</ButtonLink>
              <ButtonLink
                href={buildWhatsappLink(joinMessage)}
                target="_blank"
                rel="noreferrer"
                variant="outline"
              >
                تواصل للانضمام كسفير
              </ButtonLink>
            </div>
          </div>

          <Card className="w-full max-w-md p-5">
            <h2 className="text-lg font-semibold">مختصر سريع</h2>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>• كود واحد لكل سفير.</li>
              <li>• العمولة تُحسب من قيمة الخدمة المؤكدة بعد اعتماد الطلب.</li>
              <li>• في خدمات المواقع: قد ترتبط العمولة بحزمة محددة حسب الاتفاق.</li>
              <li>• أي استثناءات تُوضّح قبل التنفيذ.</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <h3 className="text-base font-semibold">١) شارك كودك</h3>
          <p className="mt-2 text-sm text-neutral-700">
            أرسل كودك لعملائك أو أصدقائك مع رابط الطلب.
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold">٢) نؤكد الطلب</h3>
          <p className="mt-2 text-sm text-neutral-700">
            الفريق يراجع المدخلات، ويثبت السعر وخطة التنفيذ، ثم يبدأ العمل.
          </p>
        </Card>

        <Card className="p-5">
          <h3 className="text-base font-semibold">٣) تُسجّل عمولتك</h3>
          <p className="mt-2 text-sm text-neutral-700">
            بعد اعتماد الطلب، تُثبت العمولة حسب المسار (وظائف/طلاب/أعمال/مواقع).
          </p>
        </Card>
      </section>

      {/* Commission rules */}
      <section className="space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">قواعد العمولة</h2>
          <p className="text-sm text-neutral-700">
            هذه القواعد تُقرأ من ملف المحتوى (Day-0). إذا كان الملف فارغاً الآن، ستظهر
            الرسالة أدناه.
          </p>
        </div>

        {rulesAll.length === 0 ? (
          <Card className="p-5">
            <p className="text-sm text-neutral-700">
              لا توجد قواعد عمولة منشورة حالياً. أضفها من ملف{" "}
              <span className="font-medium">src/content/commissions-v1.ts</span> ثم أعد
              البناء.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {tracks.map((track) => {
              const rules = listCommissionRulesByTrack(track);
              return (
                <Card key={track} className="p-5">
                  <h3 className="text-base font-semibold">{trackLabel(track)}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                    {rules.map((r, idx) => (
                      <li key={`${track}-${idx}`}>
                        • العمولة:{" "}
                        <span className="font-medium">{formatCommission(r)}</span>
                        {r.web_package_code ? (
                          <span className="mr-2 text-neutral-500">
                            (مرتبطة بحزمة: {r.web_package_code})
                          </span>
                        ) : null}
                        {r.notes_ar ? (
                          <div className="mt-1 text-neutral-600">{r.notes_ar}</div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Ambassadors list */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">السفراء الحاليون</h2>
          <p className="mt-1 text-sm text-neutral-700">
            قائمة السفراء تُدار من ملف المحتوى. يمكنك إضافتهم لاحقاً وستظهر هنا تلقائياً.
          </p>
        </div>

        {ambassadors.length === 0 ? (
          <Card className="p-5">
            <p className="text-sm text-neutral-700">
              لا توجد بيانات سفراء منشورة حالياً. أضفهم داخل{" "}
              <span className="font-medium">src/content/ambassadors.ts</span>.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {ambassadors.map((a) => {
              const wa = a.whatsapp
                ? `https://wa.me/${String(a.whatsapp).replace(/[^\d]/g, "")}`
                : "";
              return (
                <Card key={a.code} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-base font-semibold">{a.name_ar}</div>
                      <div className="mt-1 text-sm text-neutral-700">
                        كود السفير:{" "}
                        <span className="font-mono font-semibold">{a.code}</span>
                      </div>
                      {a.tags_ar ? (
                        <div className="mt-2 text-sm text-neutral-600">{a.tags_ar}</div>
                      ) : null}
                    </div>

                    {wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-xl border border-neutral-200 px-3 py-2 text-sm font-medium hover:bg-neutral-50"
                      >
                        واتساب
                      </a>
                    ) : null}
                  </div>

                  {a.notes_ar ? (
                    <div className="mt-3 text-sm text-neutral-700">{a.notes_ar}</div>
                  ) : null}
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="r24-surface p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">جاهز تبدأ؟</h2>
            <p className="mt-1 text-sm text-neutral-700">
              ابدأ بطلب بسيط الآن، أو تواصل معنا لتفعيل كود سفير لك ومشاركة القواعد كاملة.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/order">طلب خدمة</ButtonLink>
            <ButtonLink
              href={buildWhatsappLink(joinMessage)}
              target="_blank"
              rel="noreferrer"
              variant="outline"
            >
              تواصل واتساب
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
