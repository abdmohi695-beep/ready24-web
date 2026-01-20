import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { resolveSeo } from "@/lib/seo";
import { SERVICES } from "@/content/services";
import { PRICING } from "@/content/pricing";
import { buildWhatsappLink } from "@/lib/site";
import { Check, Info, Sparkles, Shield, Timer } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const s = resolveSeo("/pricing");

  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: s.canonicalUrl },
    robots: s.robots,
    openGraph: {
      title: s.ogTitle,
      description: s.ogDescription,
      url: s.canonicalUrl,
      images: s.ogImageUrl ? [{ url: s.ogImageUrl }] : [],
    },
    twitter: {
      card: s.ogImageUrl ? "summary_large_image" : "summary",
      title: s.ogTitle,
      description: s.ogDescription,
      images: s.ogImageUrl ? [s.ogImageUrl] : [],
    },
  };
}

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string {
  return Array.isArray(v) ? (v[0] ?? "") : (v ?? "");
}

function formatSdg(n: number): string {
  try {
    return new Intl.NumberFormat("ar", { maximumFractionDigits: 0 }).format(n);
  } catch {
    return String(n);
  }
}

function labelDeposit(rule: string): { title: string; desc: string } {
  if (rule === "100%") {
    return {
      title: "دفع مُسبق كامل",
      desc: "يُستخدم عادةً للخدمات الصغيرة أو التنفيذ العاجل، لتثبيت أولوية التنفيذ.",
    };
  }
  return {
    title: "دفع على مرحلتين",
    desc: "عادةً 50% مُسبقًا لتأكيد الطلب و50% عند التسليم بعد اعتماد النسخة النهائية.",
  };
}

function labelSla(tier: string): { title: string; hint: string } {
  if (tier === "Express") return { title: "Express", hint: "تنفيذ عاجل حسب التوفّر" };
  if (tier === "Short") return { title: "Short", hint: "مدة قصيرة" };
  if (tier === "Medium") return { title: "Medium", hint: "مدة متوسطة" };
  return { title: "Large", hint: "مدة أطول للطلبات الكبيرة" };
}

function normalizeKey(v: string): string {
  return (v || "").trim().toLowerCase();
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export default function PricingPage({ searchParams }: { searchParams?: SearchParams }) {
  const activeTrack = normalizeKey(first(searchParams?.track));

  const tracks = uniq(
    SERVICES.map((s) => s.track)
      .filter(Boolean)
      .map((t) => normalizeKey(t)),
  );

  const filteredServices =
    activeTrack && activeTrack !== "all"
      ? SERVICES.filter((s) => normalizeKey(s.track) === activeTrack)
      : SERVICES;

  const pricingBySlug = new Map(PRICING.map((p) => [p.service_slug, p]));
  const whatsapp = buildWhatsappLink(
    "مرحبًا Ready24، أريد معرفة السعر النهائي بعد مراجعة طلبي. هذه الخدمة/الخدمات التي أبحث عنها:",
  );

  const hasAnyPricing = PRICING.length > 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* Hero */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <p className="text-sm text-neutral-600">Ready24 — الأسعار</p>

        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
          أسعار واضحة كنطاقات… وتثبيت نهائي بعد مراجعة الطلب
        </h1>

        <p className="mt-4 max-w-3xl text-base text-neutral-700 leading-relaxed">
          نعرض الأسعار كنطاقات استرشادية بالجنيه السوداني لأن التفاصيل تُحدث فرقًا: طول
          المحتوى، مستوى التدقيق، حجم الملفات، ومدى الاستعجال. بعد استلام مدخلاتك نؤكد
          السعر النهائي وخطة التسليم بشكل مكتوب وواضح.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/order" variant="solid" size="lg">
            ابدأ الطلب الآن
          </ButtonLink>

          <ButtonLink href="/services" variant="outline" size="lg">
            استعرض الخدمات
          </ButtonLink>

          <a
            href={whatsapp || "#"}
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium hover:bg-neutral-50"
          >
            تواصل عبر واتساب
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">سياسة دفع منضبطة</p>
                <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                  عربون لتأكيد الطلب وحجز الوقت، ثم إكمال الدفع عند التسليم حسب نوع
                  الخدمة.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Timer className="mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">الوقت جزء من السعر</p>
                <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                  كلما ضاق الوقت زادت الأولوية والجهد المخصص، لذلك ينعكس ذلك على النطاق
                  السعري.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">جودة قابلة للاستخدام</p>
                <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                  هدفنا ليس “نص جميل” فقط، بل مخرجات جاهزة للتقديم، النشر، أو التنفيذ
                  مباشرة.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Track filter */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-neutral-600">تصفية حسب المسار:</span>

          <Link
            href="/pricing"
            className={`rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50 ${
              !activeTrack || activeTrack === "all"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200"
            }`}
          >
            الكل
          </Link>

          {tracks.map((t) => (
            <Link
              key={t}
              href={`/pricing?track=${encodeURIComponent(t)}`}
              className={`rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50 ${
                activeTrack === t
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed">
          ملاحظة: قد تُعرض بعض الخدمات بدون نطاق سعري مؤقتًا إذا لم تُملأ بيانات الأسعار
          بعد في ملف Day-0.
        </p>
      </section>

      {/* Pricing list */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">نطاقات الأسعار حسب الخدمة</h2>

        {!hasAnyPricing ? (
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5" />
              <div className="space-y-2">
                <p className="text-sm font-semibold">لم تُدرج نطاقات الأسعار بعد</p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  هذا القسم جاهز للاستخدام فور تعبئة ملف Day-0 (Pricing). إلى ذلك الحين،
                  يمكنك إرسال الخدمة المطلوبة ومدخلاتك وسنثبت السعر النهائي كتابيًا قبل
                  البدء.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <ButtonLink href="/order" variant="solid" size="md">
                    إرسال طلب
                  </ButtonLink>
                  <a
                    href={whatsapp || "#"}
                    className="inline-flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                  >
                    سؤال سريع عبر واتساب
                  </a>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredServices.map((s) => {
              const p = pricingBySlug.get(s.slug);
              const sla = labelSla(s.sla_tier);
              const dep = labelDeposit(p?.deposit_rule || "50/50");

              const priceText = p
                ? `${formatSdg(p.price_min_sdg)} – ${formatSdg(p.price_max_sdg)} ج.س`
                : "يُثبت بعد المراجعة";

              return (
                <Card key={s.slug} className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-neutral-600">{s.track}</p>
                      <h3 className="mt-1 text-base font-semibold leading-snug">
                        {s.name_ar}
                      </h3>
                      {s.short_desc_ar ? (
                        <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
                          {s.short_desc_ar}
                        </p>
                      ) : null}
                    </div>

                    <div className="shrink-0 text-left">
                      <p className="text-xs text-neutral-600">النطاق</p>
                      <p className="mt-1 text-base font-semibold">{priceText}</p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl border border-neutral-200 p-4">
                      <p className="text-sm font-semibold">الوقت (SLA)</p>
                      <p className="mt-1 text-sm text-neutral-700">
                        {sla.title} — {sla.hint}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-200 p-4">
                      <p className="text-sm font-semibold">الدفع</p>
                      <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                        {dep.title}. {dep.desc}
                      </p>
                    </div>

                    {p?.pricing_note_ar ? (
                      <div className="rounded-2xl bg-neutral-50 p-4">
                        <p className="text-sm font-semibold">ملاحظة</p>
                        <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                          {p.pricing_note_ar}
                        </p>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <ButtonLink href="/order" variant="solid" size="md">
                      طلب هذه الخدمة
                    </ButtonLink>

                    <a
                      href={
                        buildWhatsappLink(
                          `مرحبًا Ready24، أريد تثبيت السعر النهائي لخدمة: ${s.name_ar} (المعرّف: ${s.slug}).`,
                        ) || "#"
                      }
                      className="inline-flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
                    >
                      استفسار عبر واتساب
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* Rules */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">كيف نضمن لك وضوح السعر؟</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <p className="text-sm font-semibold">قبل البدء</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700 leading-relaxed">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4" />
                نستلم المدخلات ونحدد المطلوب بدقة.
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4" />
                نثبت السعر النهائي وخطة التسليم كتابيًا.
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4" />
                نبدأ التنفيذ بعد تأكيد الطلب وفق سياسة الدفع.
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold">متى يتغير النطاق؟</p>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700 leading-relaxed">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4" />
                إذا تغيّر نطاق العمل بعد بدء التنفيذ.
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4" />
                إذا تطلبت الملفات تدقيقًا إضافيًا أو مصادر جديدة.
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4" />
                إذا طُلب تسليم أسرع من SLA المحدد للخدمة.
              </li>
            </ul>
          </Card>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
          <h3 className="text-base font-semibold">جاهز؟</h3>
          <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
            ابدأ طلبك من صفحة الطلب، أو أرسل لنا رسالة مختصرة عبر واتساب، وسنرد عليك
            بتأكيد واضح للسعر وخطة التنفيذ.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/order" variant="solid" size="lg">
              صفحة الطلب
            </ButtonLink>
            <ButtonLink href="/services" variant="outline" size="lg">
              العودة للخدمات
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
