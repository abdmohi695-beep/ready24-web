import type { Metadata } from "next";
import Link from "next/link";
import { buildWhatsappLink, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "طلب خدمة | Ready24",
  description:
    "ابدأ طلبك بسرعة وبمعلومات مرتبة. سنراجع طلبك ونؤكد السعر وخطة التنفيذ قبل أن نبدأ.",
};

const MESSAGE_TEMPLATE =
  "مرحباً Ready24، أرغب في طلب خدمة.\n\n" +
  "١) الاسم:\n" +
  "٢) الخدمة المطلوبة:\n" +
  "٣) الهدف من الخدمة:\n" +
  "٤) الموعد النهائي للتسليم:\n" +
  "٥) الروابط/الملفات المتاحة الآن:\n" +
  "٦) ملاحظات إضافية (إن وجدت):\n\n" +
  "شكراً.";

export default function Page() {
  const waLink = buildWhatsappLink(MESSAGE_TEMPLATE);

  return (
    <main className="space-y-8">
      <section className="r24-surface p-6 md:p-10">
        <p className="text-sm text-neutral-600">{SITE.brandNameAr}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">طلب خدمة</h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">
          عشان نختصر الزمن ونرد عليك بسرعة، أرسل طلبك بصيغة واضحة ومكتملة. نحن ما بنبدأ
          التنفيذ قبل ما نؤكد معك <span className="font-semibold">السعر النهائي</span>{" "}
          وخطة التسليم.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={waLink || "https://wa.me/"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            إرسال الطلب عبر واتساب
          </a>

          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            تصفح الخدمات أولاً
          </Link>

          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            الاطلاع على الأسعار
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">كيف نرد عليك؟</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              نراجع التفاصيل، نطلب أي نواقص، ثم نؤكد السعر وخطة التنفيذ والتسليم.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">سرعة الاستجابة</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              الأسرع: رسالة واحدة مرتبة بدل رسائل متفرقة. كلما كان الطلب واضحاً، كان ردنا
              أسرع.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">الخصوصية</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              ما بننشر أي تفاصيل أو نماذج من شغلك بدون إذن واضح منك.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="r24-surface p-6 md:p-8">
          <h2 className="text-xl font-semibold">نموذج طلب جاهز للنسخ</h2>
          <p className="mt-2 text-sm leading-7 text-neutral-700">
            انسخ النص التالي، عبّئ الفراغات، ثم أرسله لنا في واتساب. هذا النموذج يساعدنا
            نعطيك ردّاً دقيقاً بدون لف ودوران.
          </p>

          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-7 text-neutral-800">
            {MESSAGE_TEMPLATE}
          </pre>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={waLink || "https://wa.me/"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-800"
            >
              فتح واتساب مع النموذج
            </a>

            <Link
              href="/policies"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
            >
              الاطلاع على السياسات
            </Link>
          </div>
        </div>

        <div className="r24-surface p-6 md:p-8">
          <h2 className="text-xl font-semibold">قبل الإرسال: ٥ نقاط تختصر الزمن</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-neutral-700">
            <li className="rounded-2xl border border-neutral-200 bg-white p-4">
              <span className="font-semibold text-neutral-900">الخدمة بدقة:</span> اختر
              الاسم الأقرب من صفحة الخدمات.
            </li>
            <li className="rounded-2xl border border-neutral-200 bg-white p-4">
              <span className="font-semibold text-neutral-900">الهدف:</span> ماذا تريد أن
              تحقق من الخدمة؟ (وظيفة، منحة، بروفايل، موقع…)
            </li>
            <li className="rounded-2xl border border-neutral-200 bg-white p-4">
              <span className="font-semibold text-neutral-900">الموعد النهائي:</span>{" "}
              تاريخ/وقت التسليم المطلوب.
            </li>
            <li className="rounded-2xl border border-neutral-200 bg-white p-4">
              <span className="font-semibold text-neutral-900">الملفات أو الروابط:</span>{" "}
              أرسل رابط Google Drive/Dropbox أو أي ملف متاح الآن.
            </li>
            <li className="rounded-2xl border border-neutral-200 bg-white p-4">
              <span className="font-semibold text-neutral-900">تفضيل الأسلوب:</span> عربية
              فصحى، أو عربية بسيطة، أو مزيج عربي/إنجليزي حسب الحاجة.
            </li>
          </ul>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/how-we-work"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
            >
              كيف نعمل؟
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
            >
              طرق التواصل
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
