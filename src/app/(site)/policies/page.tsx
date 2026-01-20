import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "السياسات | Ready24",
  description:
    "سياسات Ready24 بوضوح: الخصوصية، الدفع، التسليم، المراجعات، والاستخدام المقبول. نكتبها بلغة بسيطة حتى تعرف حقوقك وواجباتنا من البداية.",
};

type PolicySection = {
  id: string;
  title: string;
  desc?: string;
  bullets?: string[];
  note?: string;
};

const SECTIONS: PolicySection[] = [
  {
    id: "privacy",
    title: "الخصوصية وحماية الملفات",
    desc: "نحن نتعامل مع ملفاتك ومعلوماتك باعتبارها بيانات خاصة. هدفنا أن تشعر بالاطمئنان عند إرسال أي محتوى، حتى لو كان حساساً.",
    bullets: [
      "لا ننشر أي ملف أو مثال أو صورة قبل وبعد إلا بموافقة صريحة منك.",
      "إذا احتاج العمل عرضاً عاماً (مثل نموذج ضمن أعمالنا)، نقوم بإزالة الأسماء والبيانات التعريفية بالكامل ما لم تطلب غير ذلك.",
      "نستخدم ملفاتك فقط لتنفيذ الخدمة المطلوبة، ولا نشاركها مع أي طرف ثالث دون إذن.",
    ],
    note: "إذا كان لديك متطلبات خصوصية أعلى (جهة عمل، عقد، بيانات حساسة)، أخبرنا قبل البدء حتى نلتزم بما يناسب حالتك.",
  },
  {
    id: "payments",
    title: "الدفع وتأكيد السعر",
    desc: "الأسعار المعروضة على الموقع نطاقات إرشادية. السعر النهائي يُثبت بعد مراجعة الطلب وتفاصيله، ثم نبدأ التنفيذ بعد موافقتك.",
    bullets: [
      "قد نطلب دفعاً كاملاً مقدماً لبعض الخدمات، أو دفعاً مقدماً ثم دفعاً عند التسليم لبعض الخدمات الأخرى.",
      "قاعدة الدفع الخاصة بخدمتك ستصل لك بوضوح عند تأكيد الطلب.",
      "لن نفاجئك بتكاليف إضافية دون اتفاق مسبق وواضح.",
    ],
    note: "إذا تغير نطاق العمل بعد بدء التنفيذ بسبب إضافة متطلبات جديدة، سنوضح أثر ذلك على السعر والزمن قبل المتابعة.",
  },
  {
    id: "delivery",
    title: "التسليم وزمن التنفيذ",
    desc: "نلتزم بزمن التسليم المتفق عليه عند تأكيد الطلب. مستويات زمن التنفيذ تساعدك تختار المناسب حسب حاجتك.",
    bullets: [
      "زمن التسليم يختلف بحسب نوع الخدمة وحجم الطلب والضغط الحالي.",
      "قد تتوفر بعض الخدمات للتسليم العاجل وفق شروط واضحة.",
      "تأخر إرسال المدخلات أو الملاحظات قد يؤثر على زمن التسليم، وسنخبرك بذلك فوراً.",
    ],
  },
  {
    id: "revisions",
    title: "المراجعات والتعديلات",
    desc: "نقدّم عدد المراجعات المذكور ضمن وصف الخدمة. المراجعات المقصودة هي تحسينات ضمن نفس نطاق العمل المتفق عليه.",
    bullets: [
      "أي تعديل ضمن نطاق الخدمة يُنفّذ بحسب عدد المراجعات المتفق عليه.",
      "إضافة متطلبات جديدة خارج النطاق تُعامل كطلب إضافي ويُنسّق بشأنه مسبقاً.",
      "نفضّل أن تجمع ملاحظاتك في رسالة واحدة قدر الإمكان لتسريع الإنجاز.",
    ],
  },
  {
    id: "acceptable-use",
    title: "الاستخدام المقبول وحدود الخدمة",
    desc: "نلتزم بخدمات مهنية تساعدك بشكل قانوني وأخلاقي. لذلك لدينا حدود واضحة لما يمكن تنفيذه.",
    bullets: [
      "لا ننفّذ أعمالاً تتضمن انتحال هوية أو تزوير بيانات أو شهادات أو أي محتوى مضلل.",
      "لا نكتب محتوى يهدف لخداع جهات رسمية أو مؤسسات توظيف أو جهات مانحة.",
      "قد نرفض أي طلب يعرّض العميل أو الفريق لمخاطر قانونية أو سمعة سيئة.",
    ],
    note: "إذا كان لديك قلق حول صياغة معينة، شاركنا الغرض وسنقترح بديلاً مهنيّاً آمناً.",
  },
  {
    id: "work-samples",
    title: "أعمالنا والنماذج المعروضة",
    desc: "نحن نعرض نماذج أعمال فقط عندما يسمح العميل بذلك. الجودة أهم من الاستعراض، والخصوصية جزء من الجودة.",
    bullets: [
      "أي عرض لنماذج قبل وبعد يتم بعد موافقة صريحة.",
      "نزيل البيانات الشخصية والتعريفية ما لم توافق على ظهورها.",
      "يمكنك طلب عدم استخدام عملك كنموذج بشكل نهائي دون أي نقاش.",
    ],
  },
  {
    id: "support",
    title: "التواصل وخدمة العملاء",
    desc: "التواصل الأساسي يكون عبر القنوات الرسمية الموجودة في صفحة التواصل. نحرص أن تكون المراسلات واضحة ومكتوبة قدر الإمكان لتجنب سوء الفهم.",
    bullets: [
      "نستقبل التفاصيل والملفات ونؤكد لك المتطلبات قبل البدء.",
      "نوضح لك ما الذي ستستلمه بالضبط، وكيف ستكون صيغة التسليم.",
      "نجيب على أسئلتك قبل الدفع حتى تكون الصورة كاملة.",
    ],
  },
  {
    id: "refunds",
    title: "الاسترجاع والإلغاء",
    desc: "نحاول دائماً حل أي إشكال بشكل عادل وواضح. ومع ذلك، طبيعة الخدمات الرقمية تتطلب قواعد محددة.",
    bullets: [
      "إذا بدأ التنفيذ وتم تسليم جزء من العمل، قد لا يكون الاسترجاع الكامل ممكناً لأن الوقت والجهد قد استُهلكا.",
      "إذا كان هناك خطأ من طرفنا يخالف المتفق عليه بوضوح، نُصلح ذلك دون تكلفة إضافية ضمن نطاق الخدمة.",
      "إذا رغبت بالإلغاء قبل بدء التنفيذ، ننسق معك بحسب حالة الطلب.",
    ],
    note: "أفضل طريقة لتجنب أي إشكال هي توضيح المتطلبات منذ البداية وإرسال المدخلات المطلوبة كاملة.",
  },
];

function TopLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50"
    >
      {label}
    </Link>
  );
}

function SectionCard({ s }: { s: PolicySection }) {
  return (
    <section id={s.id} className="r24-surface p-6 md:p-8">
      <h2 className="text-xl font-semibold leading-8">{s.title}</h2>
      {s.desc ? (
        <p className="mt-3 text-sm leading-7 text-neutral-700">{s.desc}</p>
      ) : null}

      {s.bullets && s.bullets.length ? (
        <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-700">
          {s.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {s.note ? (
        <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm leading-7 text-neutral-700">
          <span className="font-semibold text-neutral-900">ملاحظة:</span> {s.note}
        </div>
      ) : null}
    </section>
  );
}

export default function Page() {
  return (
    <main className="space-y-8">
      <section className="r24-surface p-6 md:p-10">
        <p className="text-sm text-neutral-600">Ready24</p>
        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">السياسات</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-neutral-700">
          نكتب سياساتنا بلغة واضحة حتى تعرف من البداية كيف نعمل، وما الذي نلتزم به، وما
          الذي نتوقعه منك. إذا كان لديك شرط خاص أو حالة حساسة، أخبرنا قبل البدء وسنرتّب
          الأمر بشكل مهني.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <TopLink href="#privacy" label="الخصوصية" />
          <TopLink href="#payments" label="الدفع" />
          <TopLink href="#delivery" label="التسليم" />
          <TopLink href="#revisions" label="المراجعات" />
          <TopLink href="#acceptable-use" label="الاستخدام المقبول" />
          <TopLink href="#refunds" label="الاسترجاع" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/order"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            ابدأ الطلب الآن
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            تواصل معنا
          </Link>
        </div>
      </section>

      <section className="grid gap-4">
        {SECTIONS.map((s) => (
          <SectionCard key={s.id} s={s} />
        ))}
      </section>

      <section className="r24-surface p-6 md:p-10">
        <h2 className="text-xl font-semibold">مهم قبل أن ترسل طلبك</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700">
          كلما كانت معلومات الطلب واضحة ومدخلاته كاملة، كانت النتيجة أفضل وأسرع. إن لم تكن
          متأكداً مما تحتاجه، أرسل لنا الهدف وسنقترح عليك الخدمة المناسبة وخطة مختصرة
          للتنفيذ.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
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
          <Link
            href="/faq"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 text-sm font-medium hover:bg-neutral-50"
          >
            الأسئلة الشائعة
          </Link>
        </div>
      </section>
    </main>
  );
}
