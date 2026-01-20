import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة | Ready24",
  description:
    "إجابات واضحة ومباشرة عن الطلب، الأسعار، زمن التسليم، المراجعات، والخصوصية في Ready24.",
};

type FaqItem = {
  q: string;
  a: React.ReactNode;
};

const FAQ: FaqItem[] = [
  {
    q: "كيف أطلب خدمة من Ready24؟",
    a: (
      <>
        <p className="text-sm leading-7 text-neutral-700">
          ببساطة: اختر الخدمة، أرسل الملفات أو التفاصيل، ثم نؤكد لك السعر وخطة التنفيذ
          وزمن التسليم قبل أن نبدأ. بعد ذلك ننفذ العمل ونرسل لك نسخة أولى للمراجعة حسب ما
          هو موضح في الخدمة.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/services"
            className="inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            اذهب إلى الخدمات
          </Link>
          <Link
            href="/order"
            className="inline-flex items-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            ابدأ الطلب الآن
          </Link>
        </div>
      </>
    ),
  },
  {
    q: "كيف تحددون الأسعار؟ ولماذا أحياناً يتغير السعر داخل النطاق؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        الأسعار المعروضة هي نطاقات إرشادية، لأن السعر النهائي يعتمد على حجم العمل، جودة
        الملفات، مستوى التعقيد، والوقت المطلوب للتسليم. قبل التنفيذ نثبت لك السعر بوضوح،
        ولا نبدأ إلا بعد موافقتك.
      </p>
    ),
  },
  {
    q: "ما المقصود بزمن التسليم (Express / Short / Medium / Large)؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        هذه مستويات زمنية لتنظيم التسليم حسب نوع الخدمة والضغط الحالي. بعض الخدمات قد تكون
        متاحة للتسليم العاجل (Express) بشروط، وسنوضح لك ذلك أثناء تأكيد الطلب.
      </p>
    ),
  },
  {
    q: "هل يوجد عربون أو دفع كامل قبل البدء؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        نعم، بحسب نوع الخدمة تكون القاعدة إما دفع كامل مقدماً أو تقسيم الدفع (مثل 50/50).
        ستصل لك القاعدة بشكل واضح عند تأكيد الطلب، مع توضيح ما الذي ستستلمه ومتى.
      </p>
    ),
  },
  {
    q: "كم عدد المراجعات المتاحة بعد التسليم؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        يختلف ذلك حسب الخدمة. ستجد عدد المراجعات ضمن وصف الخدمة، ونلتزم به كما هو. وإذا
        احتجت تعديلات إضافية خارج نطاق المراجعات المتفق عليها، ننسق معك بشكل واضح قبل أي
        عمل إضافي.
      </p>
    ),
  },
  {
    q: "هل تعدّلون الملفات الحالية أم تكتبون من الصفر؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        حسب الخدمة وحسب ما ترسله لنا. أحياناً يكون المطلوب تحسين نسخة موجودة (مثل CV أو
        بروفايل)، وأحياناً نكتب من الصفر إذا كانت هذه هي الخدمة المطلوبة. المهم أن تكون
        النتيجة نهائية ومنظمة وقابلة للاستخدام فوراً.
      </p>
    ),
  },
  {
    q: "هل تضمنون القبول في وظيفة أو منحة؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        لا توجد جهة محترفة تضمن قبولاً لأن القرار النهائي عند جهة التوظيف أو الجهة
        المانحة. لكننا نضمن لك عملاً قوياً وواضحاً ومحسناً من حيث الصياغة والبناء والمنطق،
        بحيث يقدمك بأفضل صورة ممكنة.
      </p>
    ),
  },
  {
    q: "كيف تتعاملون مع خصوصية الملفات والمعلومات؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        نتعامل مع ملفاتك كبيانات خاصة. لا ننشر أي محتوى أو أمثلة “قبل وبعد” إلا بموافقة
        صريحة منك. وإذا كان العمل حساساً، نلتزم بإخفاء الأسماء والبيانات التعريفية تماماً
        عند الحاجة.
      </p>
    ),
  },
  {
    q: "هل لديكم خدمات للمواقع الإلكترونية؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        نعم، لدينا باقات وخيارات للمواقع حسب الهدف (موقع تعريفي، صفحة هبوط، موقع خدمات…).
        ستجد التفاصيل ضمن صفحات الخدمات والأسعار، ويمكننا توجيهك لأفضل خيار حسب احتياجك.
      </p>
    ),
  },
  {
    q: "ما هو برنامج السفراء؟ وكيف تعمل العمولة؟",
    a: (
      <p className="text-sm leading-7 text-neutral-700">
        برنامج السفراء يسمح لك بمشاركة كود خاص بك. عندما يستخدمه شخص آخر في طلب خدمة،
        تُسجل لك عمولة وفق القواعد المعلنة. كل التفاصيل موجودة في صفحة السفراء.
      </p>
    ),
  },
  {
    q: "ما طرق التواصل الرسمية؟",
    a: (
      <>
        <p className="text-sm leading-7 text-neutral-700">
          التواصل الأساسي يكون عبر واتساب، ويمكنك كذلك استخدام الروابط الرسمية لفيسبوك
          ولينكدإن. ستجد كل الروابط في صفحة “تواصل معنا”.
        </p>
        <div className="mt-3">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            اذهب إلى تواصل معنا
          </Link>
        </div>
      </>
    ),
  },
];

function FaqItemCard({
  item,
  defaultOpen = false,
}: {
  item: FaqItem;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
      open={defaultOpen}
    >
      <summary className="cursor-pointer list-none select-none">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold leading-7 text-neutral-900">{item.q}</h3>
          <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-transform group-open:rotate-45">
            +
          </span>
        </div>
        <p className="mt-2 text-sm text-neutral-500">اضغط لعرض الإجابة</p>
      </summary>

      <div className="mt-4 border-t border-neutral-100 pt-4">{item.a}</div>
    </details>
  );
}

export default function Page() {
  return (
    <main className="space-y-8">
      <section className="r24-surface p-6 md:p-10">
        <p className="text-sm text-neutral-600">Ready24</p>
        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
          الأسئلة الشائعة
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-700">
          جمعنا هنا أكثر الأسئلة تكراراً بطريقة واضحة ومباشرة. إذا لم تجد إجابتك، راسلنا
          وسنساعدك سريعاً.
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
      </section>

      <section className="grid gap-4">
        {FAQ.map((item, idx) => (
          <FaqItemCard key={item.q} item={item} defaultOpen={idx === 0} />
        ))}
      </section>

      <section className="r24-surface p-6 md:p-10">
        <h2 className="text-xl font-semibold">هل لديك سؤال مختلف؟</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-700">
          إذا كان سؤالك مرتبطاً بحالة خاصة أو ملف حساس، الأفضل ترسل لنا التفاصيل مباشرة
          عبر صفحة التواصل، وسنرد عليك بما يناسب وضعك بدون تعقيد.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            تواصل معنا
          </Link>
          <Link
            href="/policies"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            اقرأ السياسات
          </Link>
          <Link
            href="/ambassadors"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            برنامج السفراء
          </Link>
        </div>
      </section>
    </main>
  );
}
