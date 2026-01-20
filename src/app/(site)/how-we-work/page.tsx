import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { resolveSeo } from "@/lib/seo";
import { buildWhatsappLink } from "@/lib/site";
import {
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const s = resolveSeo("/how-we-work");

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

function Step({
  n,
  title,
  desc,
  Icon,
}: {
  n: string;
  title: string;
  desc: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-200 bg-white">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-neutral-600">الخطوة {n}</p>
          <p className="mt-1 text-base font-semibold">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">{desc}</p>
        </div>
      </div>
    </Card>
  );
}

export default function HowWeWorkPage() {
  const whatsapp = buildWhatsappLink(
    "مرحبًا Ready24، أود تنفيذ خدمة. هذه تفاصيل طلبي باختصار:",
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-10">
      {/* Hero */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <p className="text-sm text-neutral-600">Ready24 — كيف نعمل</p>

        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
          تجربة واضحة من أول رسالة حتى التسليم
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-700">
          نحن لا نبدأ “تنفيذًا” قبل أن يكون كل شيء محددًا: المطلوب، المدخلات، النطاق
          السعري، وقت التسليم، وسياسة الدفع. بهذه البساطة نضمن جودة مخرجات قابلة للاستخدام
          فعلًا، بدون التباس أو مفاجآت.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/order" variant="solid" size="lg">
            ابدأ الطلب
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
              <ClipboardList className="mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">خطوات محددة</p>
                <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                  طلب، مراجعة، تثبيت خطة، تنفيذ، ثم تسليم واعتماد.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <Timer className="mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">وقت تسليم واقعي</p>
                <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                  نحدد SLA واضحًا حسب نوع الخدمة وحجم المدخلات.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">وضوح قبل الدفع</p>
                <p className="mt-1 text-sm text-neutral-700 leading-relaxed">
                  لا توجد رسوم مخفية، ولا نتحرك دون تثبيت السعر وخطة العمل.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Steps */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">الخطوات العملية</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Step
            n="1"
            title="اختيار الخدمة المناسبة"
            desc="تدخل صفحة الخدمات وتحدد الخدمة الأقرب لاحتياجك. إن لم تكن متأكدًا، اكتب لنا هدفك وسنقترح الخيار الأدق."
            Icon={FileText}
          />

          <Step
            n="2"
            title="إرسال المدخلات بشكل منظم"
            desc="ترسل الملفات أو النصوص أو الروابط المطلوبة حسب الخدمة. كلما كانت المدخلات مكتملة، كان التنفيذ أسرع والنتيجة أدق."
            Icon={ClipboardList}
          />

          <Step
            n="3"
            title="مراجعة الطلب وتثبيت السعر ووقت التسليم"
            desc="نراجع المطلوب سريعًا، ثم نؤكد لك السعر النهائي (ضمن نطاقاتنا) ووقت التسليم ونوع SLA المناسب."
            Icon={Timer}
          />

          <Step
            n="4"
            title="تأكيد الطلب والدفع وفق السياسة"
            desc="بعد موافقتك، يتم الدفع حسب سياسة الخدمة (غالبًا عربون ثم إكمال عند التسليم)."
            Icon={CreditCard}
          />

          <Step
            n="5"
            title="التنفيذ بجودة قابلة للاستخدام"
            desc="ننفذ وفق الهدف: تقديم وظيفي، نشر، تسويق، أو استخدام رسمي. نركز على الوضوح، الدقة، والنتيجة."
            Icon={Sparkles}
          />

          <Step
            n="6"
            title="مراجعة وتسليم واعتماد"
            desc="نرسل النسخة النهائية، ونطبق المراجعة المتفق عليها ضمن الخدمة، ثم يتم اعتماد النسخة وتسليمها."
            Icon={CheckCircle2}
          />
        </div>
      </section>

      {/* SLA + Notes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">الوقت (SLA) وكيف نفهمه</h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm font-semibold">Express</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              تنفيذ عاجل حسب التوفر ونوع الخدمة. قد يتطلب دفعًا مقدمًا كاملًا للخدمات
              الصغيرة.
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold">Short / Medium</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              مناسب لمعظم الطلبات. نثبت وقت التسليم بعد مراجعة المدخلات وتحديد حجم العمل.
            </p>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold">Large</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              للطلبات الكبيرة أو متعددة المخرجات. تُقسم عادة إلى مراحل واضحة مع تسليمات
              جزئية.
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <p className="text-sm font-semibold">ملاحظة مهمة</p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-700">
            إذا تغيّر نطاق العمل بعد بدء التنفيذ (إضافة أجزاء كبيرة أو تغيير الهدف
            الأساسي)، سنعيد تثبيت الوقت والسعر بشكل واضح قبل الاستمرار.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href="/pricing" variant="outline" size="md">
              الاطلاع على الأسعار
            </ButtonLink>
            <ButtonLink href="/order" variant="solid" size="md">
              تقديم طلب
            </ButtonLink>
            <Link
              href="/faq"
              className="text-sm font-medium underline underline-offset-4"
            >
              الأسئلة الشائعة
            </Link>
          </div>
        </Card>
      </section>

      {/* CTA */}
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <h2 className="text-xl font-semibold">جاهز نبدأ؟</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-700">
          ابدأ طلبك الآن، أو تواصل معنا برسالة مختصرة. سنرد عليك بتأكيد واضح للسعر وخطة
          التنفيذ قبل البدء.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/order" variant="solid" size="lg">
            ابدأ الطلب
          </ButtonLink>

          <a
            href={whatsapp || "#"}
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium hover:bg-neutral-50"
          >
            واتساب
          </a>

          <ButtonLink href="/services" variant="outline" size="lg">
            الخدمات
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
