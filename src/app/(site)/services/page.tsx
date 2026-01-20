// src/app/(site)/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { listActiveServices } from "@/content/services";
import { getPricingByServiceSlug } from "@/content/pricing";
import type { Pricing, Service } from "@/content/types";

export const metadata: Metadata = {
  title: "الخدمات | Ready24",
};

const TRACK_LABELS: Record<string, string> = {
  jobs: "الوظائف والسير الذاتية",
  students: "الطلاب والملخصات",
  business: "الأعمال والمحتوى",
  web: "المواقع والخدمات الرقمية",
};

const SLA_LABELS: Record<string, string> = {
  Express: "تسليم فائق السرعة",
  Short: "تسليم سريع",
  Medium: "تسليم متوسط",
  Large: "تسليم ممتد",
};

function splitLines(text?: string): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatSdg(n?: number): string {
  if (typeof n !== "number") return "";
  const nf = new Intl.NumberFormat("ar", { maximumFractionDigits: 0 });
  return `${nf.format(n)} ج.س`;
}

function resolveTrackLabel(track: string): string {
  return TRACK_LABELS[track] || track || "خدمات متنوعة";
}

function resolveSlaLabel(tier: Service["sla_tier"]): string {
  return SLA_LABELS[tier] || tier;
}

function resolveDepositLabel(rule?: Pricing["deposit_rule"]): string {
  if (!rule) return "";
  if (rule === "100%") return "الدفع مقدمًا";
  if (rule === "50/50") return "دفعة مقدمة ثم المتبقي";
  return rule;
}

function ServiceCard({ service }: { service: Service }) {
  const pricing = getPricingByServiceSlug(service.slug);

  const deliverables = splitLines(service.deliverables_ar);
  const inputs = splitLines(service.inputs_ar);

  const priceLine =
    pricing && (pricing.price_min_sdg || pricing.price_max_sdg)
      ? `${formatSdg(pricing.price_min_sdg)} إلى ${formatSdg(pricing.price_max_sdg)}`
      : "";

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-snug">{service.name_ar}</h3>
          {service.short_desc_ar ? (
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              {service.short_desc_ar}
            </p>
          ) : null}
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
            {resolveSlaLabel(service.sla_tier)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-700">
        <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1">
          عدد المراجعات: {service.revisions_included}
        </span>

        {service.express_eligible === "yes" ? (
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1">
            متاح بنظام السرعة حسب الشروط
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1">
            بدون خيار السرعة
          </span>
        )}

        <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1">
          الحالة: {service.service_status === "active" ? "متاحة" : "غير متاحة"}
        </span>
      </div>

      {service.express_eligible === "yes" && service.express_conditions_ar ? (
        <p className="mt-3 text-xs leading-relaxed text-neutral-600">
          شروط السرعة: {service.express_conditions_ar}
        </p>
      ) : null}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="text-sm font-semibold">المخرجات التي ستحصل عليها</p>
          {deliverables.length ? (
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-neutral-700">
              {deliverables.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-neutral-600">
              ستظهر هنا المخرجات بمجرد إدراج تفاصيل الخدمة في بيانات Day-0.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <p className="text-sm font-semibold">المدخلات المطلوبة للبدء</p>
          {inputs.length ? (
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-neutral-700">
              {inputs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-neutral-600">
              ستظهر هنا المدخلات بمجرد إدراج تفاصيل الخدمة في بيانات Day-0.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <p className="text-sm font-semibold">الأسعار والدفع</p>

        {priceLine ? (
          <p className="mt-2 text-sm text-neutral-700">
            نطاق السعر: <span className="font-semibold">{priceLine}</span>
          </p>
        ) : (
          <p className="mt-2 text-sm text-neutral-700">
            السعر يُحدَّد كنطاق بعد مراجعة الطلب وتفاصيله.
          </p>
        )}

        {pricing?.deposit_rule ? (
          <p className="mt-1 text-sm text-neutral-700">
            سياسة الدفع:{" "}
            <span className="font-semibold">
              {resolveDepositLabel(pricing.deposit_rule)}
            </span>
          </p>
        ) : (
          <p className="mt-1 text-sm text-neutral-600">
            سياسة الدفع تُعرض هنا تلقائيًا عند إدخال جدول الأسعار.
          </p>
        )}

        <p className="mt-3 text-xs leading-relaxed text-neutral-600">
          ملاحظة: الأسعار تُعرض كنطاقات تقريبية، ويُثبَّت السعر النهائي بعد التأكيد.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonLink href="/order" variant="solid" size="md">
          ابدأ طلبك
        </ButtonLink>
        <ButtonLink href="/pricing" variant="outline" size="md">
          عرض الأسعار
        </ButtonLink>
        <ButtonLink href="/how-we-work" variant="ghost" size="md">
          كيف نعمل
        </ButtonLink>
      </div>
    </Card>
  );
}

export default function ServicesPage() {
  const servicesAll = listActiveServices();

  // نجمع حسب track
  const grouped = servicesAll.reduce<Record<string, Service[]>>((acc, s) => {
    const key = (s.track || "other").trim();
    acc[key] = acc[key] || [];
    acc[key].push(s);
    return acc;
  }, {});

  const tracks = Object.keys(grouped).sort((a, b) => a.localeCompare(b, "ar"));

  return (
    <main className="space-y-10">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <p className="text-sm text-neutral-600">Opportunity | Organized | Fast</p>
        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
          خدمات Ready24
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
          هنا ستجد كتالوج خدماتنا كما هو مُعرَّف في بيانات Day-0: وصف واضح، مخرجات محددة،
          ومدخلات مطلوبة منذ البداية، حتى لا يحدث أي التباس أثناء التنفيذ.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/order" variant="solid" size="lg">
            اطلب خدمة الآن
          </ButtonLink>
          <ButtonLink href="/pricing" variant="outline" size="lg">
            اطّلع على الأسعار
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" size="lg">
            تواصل معنا
          </ButtonLink>
        </div>

        <div className="mt-5 text-sm text-neutral-600">
          هل تبحث عن خدمة محددة ولم تجدها؟ اكتب لنا من{" "}
          <Link href="/contact" className="underline underline-offset-4">
            صفحة التواصل
          </Link>{" "}
          وسنرشدك لأقرب خيار مناسب.
        </div>
      </section>

      {servicesAll.length === 0 ? (
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
          <h2 className="text-xl font-semibold">قائمة الخدمات قيد الإعداد</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            صفحة الخدمات جاهزة من ناحية الهيكل، وبمجرد تعبئة بيانات الخدمات والأسعار من
            Day-0 ستظهر الخدمات هنا تلقائيًا بشكل كامل.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href="/order" variant="solid" size="md">
              اطلب خدمة
            </ButtonLink>
            <ButtonLink href="/how-we-work" variant="outline" size="md">
              تعرّف على طريقة العمل
            </ButtonLink>
          </div>
        </section>
      ) : (
        <section className="space-y-10">
          {tracks.map((track) => (
            <div key={track} className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{resolveTrackLabel(track)}</h2>
                  <p className="mt-1 text-sm text-neutral-600">
                    اختر الخدمة المناسبة، ثم انتقل لطلب الخدمة لإكمال الخطوة الأولى.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {grouped[track].map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <h2 className="text-xl font-semibold">جاهز للبدء؟</h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          ابدأ بطلب الخدمة، وسنراجع المدخلات ثم نؤكد لك نطاق السعر وزمن التسليم وفق نظام
          التنفيذ.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/order" variant="solid" size="md">
            افتح طلبًا جديدًا
          </ButtonLink>
          <ButtonLink href="/pricing" variant="outline" size="md">
            سياسة الأسعار والدفع
          </ButtonLink>
          <ButtonLink href="/policies" variant="ghost" size="md">
            السياسات الرسمية
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
