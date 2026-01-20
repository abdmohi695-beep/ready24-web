import type { Metadata } from "next";
import Link from "next/link";
import { buildWhatsappLink, getSiteConfig, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "تواصل معنا | Ready24",
  description:
    "تواصل مع Ready24 عبر واتساب أو منصاتنا الرسمية. أخبرنا بما تحتاجه وسنرد عليك بتأكيد السعر وخطة تنفيذ واضحة.",
};

function ContactCard({
  title,
  desc,
  href,
  cta,
  hint,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  hint?: string;
}) {
  return (
    <div className="r24-surface p-6 md:p-7">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-neutral-700">{desc}</p>

      {hint ? (
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-7 text-neutral-700">
          {hint}
        </div>
      ) : null}

      <div className="mt-5">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-800"
        >
          {cta}
        </a>
      </div>
    </div>
  );
}

export default function Page() {
  const facebookUrl = getSiteConfig("facebook_url", "");
  const linkedinUrl = getSiteConfig("linkedin_url", "");
  const supportEmail = SITE.supportEmail;

  const waMessage =
    "مرحباً Ready24، أريد طلب خدمة. هذه تفاصيل طلبي باختصار: (اكتب التفاصيل هنا).";
  const waLink = buildWhatsappLink(waMessage);

  return (
    <main className="space-y-8">
      <section className="r24-surface p-6 md:p-10">
        <p className="text-sm text-neutral-600">{SITE.brandNameAr}</p>
        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
          تواصل معنا
        </h1>

        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">
          إذا كنت مستعجلاً أو تريد ردّاً سريعاً، واتساب هو أسرع طريق. وإذا تحب ترسل تفاصيل
          أكبر أو ملفات، ابدأ بالطلب وسنرتّب معك كل شيء خطوة بخطوة.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/order"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            ابدأ الطلب الآن
          </Link>

          <Link
            href="/services"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            تصفح الخدمات
          </Link>

          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            اطلع على الأسعار
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">ساعات العمل</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              الأحد إلى الخميس: ١:٠٠ ظهراً إلى ١١:٠٠ مساءً (بتوقيت السودان)
              <br />
              الجمعة والسبت: مغلق
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">معلومة مهمة</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              السعر النهائي يتحدد بعد مراجعة الطلب. سنؤكد لك السعر والخطوات قبل بدء
              التنفيذ.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <p className="text-sm font-semibold text-neutral-900">لأسرع رد</p>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              اكتب الهدف، الموعد النهائي، والملفات المتوفرة حالياً. ثم أرسلها في رسالة
              واحدة قدر الإمكان.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <ContactCard
          title="واتساب"
          desc="أرسل تفاصيل طلبك وسنرد عليك بتأكيد السعر وخطة تنفيذ واضحة."
          href={waLink || "https://wa.me/"}
          cta="فتح واتساب الآن"
          hint="نصيحة: اكتب الخدمة المطلوبة، الموعد النهائي، وما الذي تريد استلامه بالضبط."
        />

        {supportEmail ? (
          <div className="r24-surface p-6 md:p-7">
            <h2 className="text-lg font-semibold">البريد الإلكتروني</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              مناسب إذا كان لديك ملفات كثيرة أو تريد توثيق التواصل بشكل رسمي.
            </p>
            <div className="mt-5">
              <a
                href={`mailto:${supportEmail}?subject=${encodeURIComponent(
                  "طلب خدمة من Ready24",
                )}`}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                إرسال بريد إلكتروني
              </a>
            </div>
          </div>
        ) : (
          <div className="r24-surface p-6 md:p-7">
            <h2 className="text-lg font-semibold">للتواصل الرسمي</h2>
            <p className="mt-2 text-sm leading-7 text-neutral-700">
              حالياً أسرع قناة رسمية هي واتساب. إذا أردت اعتماد بريد إلكتروني للدعم لاحقاً
              سنضيفه هنا فوراً.
            </p>
            <div className="mt-5">
              <a
                href={waLink || "https://wa.me/"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
              >
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        )}

        <ContactCard
          title="فيسبوك"
          desc="تابع آخر التحديثات والعروض والمواد التعريفية عبر صفحتنا الرسمية."
          href={facebookUrl || "#"}
          cta="زيارة صفحة فيسبوك"
          hint={!facebookUrl ? "لم يتم ضبط رابط فيسبوك داخل الإعدادات بعد." : undefined}
        />

        <ContactCard
          title="لينكدإن"
          desc="للتواصل المهني، والشراكات، والطلبات المؤسسية."
          href={linkedinUrl || "#"}
          cta="زيارة صفحة لينكدإن"
          hint={!linkedinUrl ? "لم يتم ضبط رابط لينكدإن داخل الإعدادات بعد." : undefined}
        />
      </section>

      <section className="r24-surface p-6 md:p-10">
        <h2 className="text-xl font-semibold">قبل أن ترسل الرسالة</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700">
          لكي نختصر الوقت ونقدّم لك رداً دقيقاً، أرسل هذه النقاط: نوع الخدمة، الهدف،
          الموعد النهائي، الملفات المتوفرة، وأي تفضيلات في اللغة أو الأسلوب.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/faq"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            راجع الأسئلة الشائعة
          </Link>
          <Link
            href="/policies"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            اقرأ السياسات
          </Link>
        </div>
      </section>
    </main>
  );
}
