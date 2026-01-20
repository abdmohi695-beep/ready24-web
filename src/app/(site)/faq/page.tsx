// src/app/(site)/faq/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | Ready24",
  description:
    "إجابات واضحة عن طريقة الطلب، تحديد السعر، الدفع، زمن التسليم، التعديلات، والخصوصية في Ready24.",
};

type FaqItem = {
  q: string;
  a: string;
};

const FAQ: FaqItem[] = [
  {
    q: "كيف أقدّم طلباً في Ready24؟",
    a: "اذهب إلى صفحة «طلب خدمة»، اختر الخدمة المناسبة، واكتب تفاصيل طلبك بوضوح. بعد ذلك نراجع المدخلات ونؤكد لك نطاق السعر وخطة التنفيذ قبل البدء.",
  },
  {
    q: "كيف يتم تحديد السعر؟ ولماذا يظهر كنطاق؟",
    a: "السعر يُعرض كنطاق لأن التفاصيل تختلف من عميل لآخر. بعد مراجعة الطلب (الحجم، التعقيد، عدد المخرجات، ودرجة الاستعجال) نثبت لك السعر النهائي كتابياً قبل التنفيذ.",
  },
  {
    q: "هل يوجد عربون قبل البدء؟",
    a: "نعم في أغلب الخدمات يبدأ التنفيذ بعد دفع العربون حسب سياسة الخدمة. بعض الطلبات السريعة جداً أو الصغيرة قد تتطلب الدفع كاملاً مقدماً.",
  },
  {
    q: "ما سياسة التعديلات؟",
    a: "لكل خدمة عدد تعديلات مشمول يوضح داخل وصف الخدمة. التعديلات المقصودة هي تحسينات على نفس الاتجاه المتفق عليه، لا تغيير كامل للفكرة بعد التنفيذ.",
  },
  {
    q: "ما المقصود بزمن التسليم (SLA)؟",
    a: "هو معيار يحدد سرعة التنفيذ حسب فئة الخدمة. بعض الخدمات لها تسليم سريع، بينما خدمات أخرى تحتاج وقتاً أطول لضمان الجودة والمراجعة.",
  },
  {
    q: "ما الذي أحتاج لتسليمه لكم قبل بدء التنفيذ؟",
    a: "المدخلات تختلف حسب الخدمة، لكن القاعدة العامة: ملفك الحالي أو محتواك الخام، الهدف أو الاستخدام النهائي، وأي ملاحظات أو أمثلة تحب أن نلتزم بها. كلما كانت المدخلات أدق كانت النتيجة أفضل.",
  },
  {
    q: "هل تضمنون السرية والخصوصية؟",
    a: "نعم. لا ننشر أي مثال من أعمال العملاء إلا بموافقة صريحة. وإذا كان الطلب حساساً يمكن تنفيذ العمل دون حفظ أي نسخ خارج إطار التنفيذ.",
  },
  {
    q: "كيف أتواصل معكم بسرعة؟",
    a: "أفضل قناة هي واتساب، ويمكنك أيضاً التواصل عبر فيسبوك أو لينكدإن. ستجد كل الروابط الرسمية داخل صفحة «تواصل معنا».",
  },
];

function SectionTitle({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-semibold leading-snug">{title}</h1>
      {desc ? <p className="text-sm text-neutral-700">{desc}</p> : null}
    </div>
  );
}

export default function Page() {
  return (
    <main className="space-y-10">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <SectionTitle
          title="الأسئلة الشائعة"
          desc="إجابات مباشرة ومختصرة تساعدك على فهم طريقة العمل قبل تقديم طلبك."
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/order" variant="solid" size="lg">
            قدّم طلباً الآن
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            استعرض الخدمات
          </ButtonLink>
          <ButtonLink href="/pricing" variant="ghost" size="lg">
            الأسعار
          </ButtonLink>
        </div>

        <div className="mt-4 text-sm text-neutral-600">
          إذا لم تجد إجابة لسؤالك هنا، اكتب لنا وسنرد عليك بسرعة وبوضوح.
        </div>
      </section>

      <section className="grid gap-4">
        {FAQ.map((item, idx) => (
          <Card key={idx} className="p-0">
            <details className="group rounded-3xl p-5">
              <summary className="cursor-pointer list-none select-none">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-base font-semibold leading-snug">{item.q}</div>
                  <div className="mt-0.5 shrink-0 text-neutral-500 transition-transform group-open:rotate-180">
                    ▼
                  </div>
                </div>
              </summary>
              <div className="mt-3 text-sm leading-relaxed text-neutral-700">
                {item.a}
              </div>
            </details>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm font-semibold">قبل أن تطلب</p>
          <p className="mt-2 text-sm text-neutral-700">
            جهّز المدخلات الأساسية: الهدف، الملف الحالي إن وجد، وأي ملاحظات خاصة.
          </p>
          <div className="mt-3 text-sm">
            <Link href="/order" className="underline underline-offset-4">
              الذهاب إلى صفحة الطلب
            </Link>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">السياسات</p>
          <p className="mt-2 text-sm text-neutral-700">
            الاطلاع على سياسات الدفع والتسليم والخصوصية يساعد على وضوح التوقعات من
            البداية.
          </p>
          <div className="mt-3 text-sm">
            <Link href="/policies" className="underline underline-offset-4">
              قراءة السياسات
            </Link>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">تواصل سريع</p>
          <p className="mt-2 text-sm text-neutral-700">
            إذا كان لديك سؤال محدد أو طلب عاجل، تواصل معنا مباشرة وسنرتب الخطوات معك.
          </p>
          <div className="mt-3 text-sm">
            <Link href="/contact" className="underline underline-offset-4">
              فتح صفحة التواصل
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}
