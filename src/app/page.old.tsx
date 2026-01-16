import Link from "next/link";
import { SITE } from "../lib/site";

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <section className="r24-surface p-6 sm:p-10">
          <p className="text-sm text-neutral-600">
            {SITE.brandNameAr} {SITE.brandTaglineAr ? `— ${SITE.brandTaglineAr}` : ""}
          </p>

          <h1 className="mt-3 text-3xl font-semibold leading-snug sm:text-4xl">
            خدمات عربية دقيقة، تسليم سريع، وتجربة واضحة من أول خطوة
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700">
            هنا بنشتغل بنظام واضح: تختار الخدمة، نراجع المدخلات، نثبت السعر كنطاق بالجنيه
            السوداني، وما بنبدأ التنفيذ إلا بعد الدفع حسب سياسة الدفعات. كل شيء مكتوب
            ومتوثّق عشان ما يحصل لبس.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/order"
              className="inline-flex items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white"
            >
              ابدأ طلبك الآن
            </Link>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 px-4 py-2 text-sm"
              >
                الخدمات
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 px-4 py-2 text-sm"
              >
                الأسعار
              </Link>
              <Link
                href="/how-we-work"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 px-4 py-2 text-sm"
              >
                كيف نعمل
              </Link>
              <Link
                href="/ambassadors"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 px-4 py-2 text-sm"
              >
                السفراء
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-200 px-4 py-2 text-sm"
              >
                الموارد والفرص
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="r24-surface p-5">
            <h2 className="text-base font-semibold">نظام واضح</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              SLA رسمي (Express/Short/Medium/Large) + سياسة دفعات ثابتة، واستثناءات
              الميكرو ١٠٠٪ مقدمًا.
            </p>
          </div>

          <div className="r24-surface p-5">
            <h2 className="text-base font-semibold">جودة قبل السرعة</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              مراجعة وتنقيح قبل التسليم، ومعايير أداء وSEO وAccessibility من البداية.
            </p>
          </div>

          <div className="r24-surface p-5">
            <h2 className="text-base font-semibold">إحالات وعمولات موثّقة</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-700">
              نظام سفراء بعمولات v1 وقواعد فض نزاعات واضحة، مع توثيق الأدلة عند الحاجة.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
