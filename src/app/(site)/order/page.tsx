import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "طلب خدمة | Ready24",
};

const WHATSAPP_NUMBER = "249115646893";

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function Page() {
  const msg =
    "مرحبا Ready24 أريد طلب خدمة. " +
    "الخدمة المطلوبة: (اكتب اسم الخدمة) | " +
    "اللغة: (عربي/إنجليزي) | " +
    "الموعد المطلوب: (Express/Short/Medium/Large) | " +
    "ملاحظات مختصرة: (اكتب هنا)";

  return (
    <main className="space-y-8">
      <section className="r24-surface p-6 md:p-10">
        <p className="text-sm text-neutral-600">Opportunity | Organized | Fast</p>

        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
          اطلب خدمتك الآن بخطوات واضحة وتسليم منظم
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
          عشان نبدأ بسرعة ومن غير لخبطة كل شيء عندنا يمشي على خطوات ثابتة: تحدد الخدمة
          ترسل الملفات نؤكد السعر والعربون ثم نبدأ التنفيذ ونسلمك نسخة جاهزة للإرسال أو
          النشر.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={waLink(msg)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-base font-medium text-white hover:bg-neutral-800"
          >
            ابدأ الطلب عبر واتساب
          </a>

          <ButtonLink href="/services" variant="outline" size="lg">
            اختر الخدمة أولا
          </ButtonLink>

          <ButtonLink href="/pricing" variant="ghost" size="lg">
            شوف الأسعار
          </ButtonLink>
        </div>

        <p className="mt-4 text-sm text-neutral-600">
          ملاحظة: قد نطلب عربونا قبل البدء حسب نوع الخدمة. سنوضح لك كل التفاصيل قبل
          التنفيذ.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm font-semibold">) اختر الخدمة</p>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            من صفحة الخدمات حتلقى كل خدمة موضحة: الهدف طريقة العمل وزمن التسليم.
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">) أرسل المحتوى</p>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            أرسل الملفات أو النصوص (Word/PDF/روابط) عبر واتساب. لو في معلومات ناقصة بنسألك
            مباشرة.
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">) تأكيد ثم تنفيذ</p>
          <p className="mt-2 text-sm leading-6 text-neutral-700">
            نؤكد السعر والعربون وزمن التسليم ثم نبدأ التنفيذ ونرسل لك نسخة أولى للمراجعة.
          </p>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">شنو نحتاج منك</h2>
          <ul className="mt-4 space-y-2 text-sm text-neutral-700">
            <li>
              <span className="font-semibold">السير الذاتية:</span> السيرة الحالية +
              الوظيفة المستهدفة + أي معلومات ناقصة.
            </li>
            <li>
              <span className="font-semibold">خطابات التغطية:</span> رابط الإعلان + اسم
              الجهة + نقاط قوتك الأساسية.
            </li>
            <li>
              <span className="font-semibold">البروفايل/بورتفوليو:</span> المحتوى الحالي +
              أمثلة/روابط + الجمهور المستهدف.
            </li>
            <li>
              <span className="font-semibold">المواقع:</span> الهدف + الصفحات المطلوبة +
              المحتوى/الشعار + أمثلة تعجبك.
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">روابط سريعة تساعدك</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <Link
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50"
              href="/services"
            >
              الذهاب إلى الخدمات
            </Link>
            <Link
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50"
              href="/pricing"
            >
              الاطلاع على الأسعار
            </Link>
            <Link
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50"
              href="/how-we-work"
            >
              كيف نعمل وزمن التسليم
            </Link>
            <a
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 hover:bg-neutral-50"
              href={waLink(msg)}
              target="_blank"
              rel="noreferrer"
            >
              فتح واتساب برسالة جاهزة
            </a>
          </div>

          <p className="mt-4 text-xs text-neutral-500">
            ساعات العمل: الأحد إلى الخميس (: مساء : مساء بتوقيت السودان). مغلق الجمعة
            والسبت والإجازات الرسمية.
          </p>
        </Card>
      </section>
    </main>
  );
}
