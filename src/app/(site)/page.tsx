import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "الرئيسية",
};

export default function HomePage() {
  return (
    <main className="space-y-10">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <p className="text-sm text-neutral-600">Opportunity | Organized | Fast</p>
        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
          Ready24 خدمات احترافية سريعة من دون تعقيد
        </h1>
        <p className="mt-4 max-w-2xl text-base text-neutral-700">
          بنجهّز ليك مستندات، محتوى، وترتيب شغل بطريقة منظمة وواضحة وتسليم سريع حسب
          الخدمة.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/order" variant="solid" size="lg">
            اطلب خدمة
          </ButtonLink>
          <ButtonLink href="/services" variant="outline" size="lg">
            شوف الخدمات
          </ButtonLink>
          <ButtonLink href="/pricing" variant="ghost" size="lg">
            الأسعار
          </ButtonLink>
        </div>

        <div className="mt-6 text-sm text-neutral-600">
          قاعدة بسيطة: غالبًا بنبدأ بعد تأكيد الطلب ودفع العربون حسب سياسة الخدمة.
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm font-semibold">منظمين</p>
          <p className="mt-2 text-sm text-neutral-700">
            كل شيء عنده خطوات واضحة: استلام، مراجعة، تنفيذ، تسليم.
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">سريعين</p>
          <p className="mt-2 text-sm text-neutral-700">
            في خدمات عندها تسليم خلال ساعة حسب نوع الطلب.
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">احترافيين</p>
          <p className="mt-2 text-sm text-neutral-700">
            لغة قوية، تنسيق نظيف، وتجهيز يناسب الاستخدام الحقيقي.
          </p>
        </Card>
      </section>
    </main>
  );
}
