import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { resolveSeo } from "@/lib/seo";

/* ---------------------------------------------
   Metadata
---------------------------------------------- */
export function generateMetadata(): Metadata {
  const seo = resolveSeo("/resources");
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonicalUrl },
    robots: seo.robots,
    openGraph: seo.ogImageUrl
      ? {
          title: seo.ogTitle,
          description: seo.ogDescription,
          url: seo.canonicalUrl,
          images: [{ url: seo.ogImageUrl }],
          type: "website",
        }
      : undefined,
  };
}

/* ---------------------------------------------
   Content (tolerant imports)
---------------------------------------------- */
import * as resourcesContent from "@/content/resources";
import * as categoriesContent from "@/content/resource-categories";

type ResourceLike = {
  title_ar?: string;
  description_ar?: string;
  url?: string;
  link_url?: string;
  category_slug?: string;
  category?: string;
  tags_ar?: string;
  tags?: string;
  source_ar?: string;
  source?: string;
  note_ar?: string;
  notes_ar?: string;
  active?: string;
};

type CategoryLike = {
  slug?: string;
  name_ar?: string;
  title_ar?: string;
  active?: string;
};

type ResourcesContentExports = Partial<{
  RESOURCES: ResourceLike[];
  RESOURCES_LIST: ResourceLike[];
  RESOURCES_ENTRIES: ResourceLike[];
  listActiveResources: () => ResourceLike[];
}>;

type CategoriesContentExports = Partial<{
  RESOURCE_CATEGORIES: CategoryLike[];
  CATEGORIES: CategoryLike[];
  listActiveResourceCategories: () => CategoryLike[];
}>;

function isArray<T>(v: unknown): v is T[] {
  return Array.isArray(v);
}

function normalizeStr(v: unknown): string {
  return v == null ? "" : String(v).trim();
}

function pickFirstUrl(r: ResourceLike): string {
  const a = normalizeStr(r.url);
  const b = normalizeStr(r.link_url);
  return a || b;
}

function pickCategorySlug(r: ResourceLike): string {
  return normalizeStr(r.category_slug) || normalizeStr(r.category);
}

function pickResourceTitle(r: ResourceLike): string {
  return normalizeStr(r.title_ar) || "رابط";
}

function pickResourceDesc(r: ResourceLike): string {
  return (
    normalizeStr(r.description_ar) ||
    normalizeStr(r.note_ar) ||
    normalizeStr(r.notes_ar) ||
    ""
  );
}

function pickTags(r: ResourceLike): string[] {
  const raw = normalizeStr(r.tags_ar) || normalizeStr(r.tags);
  if (!raw) return [];
  return raw
    .split(/[,،|]/g)
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function pickSource(r: ResourceLike): string {
  return normalizeStr(r.source_ar) || normalizeStr(r.source);
}

function activeYes(v: unknown): boolean {
  const s = normalizeStr(v).toLowerCase();
  if (!s) return true;
  return s === "yes" || s === "true" || s === "1" || s === "active";
}

function getAllResources(): ResourceLike[] {
  const rc = resourcesContent as unknown as ResourcesContentExports;
  if (typeof rc.listActiveResources === "function") return rc.listActiveResources();
  if (isArray<ResourceLike>(rc.RESOURCES)) return rc.RESOURCES;
  if (isArray<ResourceLike>(rc.RESOURCES_LIST)) return rc.RESOURCES_LIST;
  if (isArray<ResourceLike>(rc.RESOURCES_ENTRIES)) return rc.RESOURCES_ENTRIES;
  return [];
}

function getAllCategories(): CategoryLike[] {
  const cc = categoriesContent as unknown as CategoriesContentExports;
  if (typeof cc.listActiveResourceCategories === "function")
    return cc.listActiveResourceCategories();
  if (isArray<CategoryLike>(cc.RESOURCE_CATEGORIES)) return cc.RESOURCE_CATEGORIES;
  if (isArray<CategoryLike>(cc.CATEGORIES)) return cc.CATEGORIES;
  return [];
}

function getCategoryLabel(c: CategoryLike): string {
  return (
    normalizeStr(c.name_ar) || normalizeStr(c.title_ar) || normalizeStr(c.slug) || "تصنيف"
  );
}

function getCategorySlug(c: CategoryLike): string {
  return normalizeStr(c.slug);
}

/* ---------------------------------------------
   Page
---------------------------------------------- */
export default function ResourcesPage({
  searchParams,
}: {
  searchParams?: { q?: string; cat?: string };
}) {
  const q = normalizeStr(searchParams?.q);
  const cat = normalizeStr(searchParams?.cat);

  const rawResources = getAllResources().filter((r) => activeYes(r.active));
  const rawCategories = getAllCategories().filter((c) => activeYes(c.active));

  const resources = rawResources
    .map((r) => ({
      title: pickResourceTitle(r),
      desc: pickResourceDesc(r),
      url: pickFirstUrl(r),
      category: pickCategorySlug(r),
      tags: pickTags(r),
      source: pickSource(r),
    }))
    .filter((r) => r.url);

  const byCatCount = new Map<string, number>();
  for (const r of resources) {
    const k = r.category || "_uncat";
    byCatCount.set(k, (byCatCount.get(k) || 0) + 1);
  }

  const categories = rawCategories
    .map((c) => ({ slug: getCategorySlug(c), label: getCategoryLabel(c) }))
    .filter((c) => c.slug);

  const filtered = resources.filter((r) => {
    const okCat = !cat || r.category === cat;
    if (!okCat) return false;

    if (!q) return true;
    const hay = `${r.title}\n${r.desc}\n${r.source}\n${r.tags.join(" ")}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <p className="text-sm text-neutral-600">Ready24</p>
        <h1 className="mt-3 text-3xl font-semibold leading-snug md:text-4xl">
          الموارد والفرص
        </h1>
        <p className="mt-4 max-w-3xl text-base text-neutral-700">
          هنا نجمع لك روابط وفرصًا وأدواتٍ عملية بصورة مرتبة وسهلة الوصول. نحدّث هذه
          الصفحة بشكل مستمر، ونضيف المصادر المفيدة فور التحقق منها.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="/services" variant="solid" size="lg">
            استعرض الخدمات
          </ButtonLink>
          <ButtonLink href="/order" variant="outline" size="lg">
            اطلب مساعدة في التقديم
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" size="lg">
            اقترح موردًا لإضافته
          </ButtonLink>
        </div>

        <div className="mt-6 text-sm text-neutral-600">
          تنبيه: الروابط الخارجية تتبع لجهاتها، وقد تتغير دون إشعار. إذا وجدت رابطًا لا
          يعمل، أبلغنا وسنقوم بتحديثه.
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <p className="text-sm font-semibold">انتقاء وترتيب</p>
          <p className="mt-2 text-sm text-neutral-700">
            نركز على ما يفيد فعليًا: منح، فرص، أدوات، ومصادر تعليمية موثوقة قدر الإمكان.
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">تحديث مستمر</p>
          <p className="mt-2 text-sm text-neutral-700">
            نضيف مصادر جديدة باستمرار، ونراجع الروابط القديمة لضمان صلاحيتها.
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold">خدمة عند الحاجة</p>
          <p className="mt-2 text-sm text-neutral-700">
            إذا احتجت تجهيز سيرة، خطاب تغطية، أو مراجعة طلب منحة — ننجز ذلك بطريقة
            احترافية.
          </p>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">تصفية سريعة</h2>
            <p className="mt-1 text-sm text-neutral-600">
              ابحث بالكلمات أو اختر تصنيفًا لتقليل النتائج.
            </p>
          </div>

          <form
            method="get"
            className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center"
          >
            <input
              name="q"
              defaultValue={q}
              placeholder="ابحث… (منح، وظائف، أدوات، كتابة…)"
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 md:w-[340px]"
            />
            <select
              name="cat"
              defaultValue={cat}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 md:w-[260px]"
            >
              <option value="">كل التصنيفات</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label} ({byCatCount.get(c.slug) || 0})
                </option>
              ))}
              <option value="_uncat">غير مصنّف ({byCatCount.get("_uncat") || 0})</option>
            </select>
            <button
              type="submit"
              className="rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800"
            >
              عرض
            </button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filtered.length === 0 ? (
            <Card className="p-6 md:col-span-2">
              <p className="text-sm font-semibold">لا توجد نتائج مطابقة</p>
              <p className="mt-2 text-sm text-neutral-700">
                جرّب كلمة مختلفة، أو أزل التصفية. إذا كانت الصفحة فارغة حاليًا، فهذا يعني
                أننا لم نملأ بيانات Day-0 بعد.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/resources"
                  className="rounded-2xl border border-neutral-200 px-4 py-2 text-sm"
                >
                  تصفير البحث
                </Link>
                <Link
                  href="/contact"
                  className="rounded-2xl border border-neutral-200 px-4 py-2 text-sm"
                >
                  تواصل معنا
                </Link>
              </div>
            </Card>
          ) : (
            filtered.map((r, idx) => (
              <Card key={`${r.url}-${idx}`} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{r.title}</p>
                    {r.desc ? (
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">
                        {r.desc}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-neutral-600">
                        وصف مختصر غير متوفر حاليًا.
                      </p>
                    )}
                  </div>

                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-2xl border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
                  >
                    فتح
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {r.source ? (
                    <span className="rounded-2xl bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                      المصدر: {r.source}
                    </span>
                  ) : null}

                  {r.category ? (
                    <span className="rounded-2xl bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                      التصنيف: {r.category}
                    </span>
                  ) : (
                    <span className="rounded-2xl bg-neutral-100 px-3 py-1 text-xs text-neutral-700">
                      التصنيف: غير مصنّف
                    </span>
                  )}

                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-2xl border border-neutral-200 px-3 py-1 text-xs text-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 md:p-10">
        <h2 className="text-xl font-semibold">تريد تجهيز ملفك للتقديم؟</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-700">
          إذا وجدت فرصة مناسبة وتحتاج سيرة قوية، خطاب تغطية، أو مراجعة طلب منحة — نساعدك
          بخطوات واضحة ونتيجة جاهزة للاستخدام.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/order" variant="solid" size="lg">
            ابدأ طلبك الآن
          </ButtonLink>
          <ButtonLink href="/pricing" variant="outline" size="lg">
            راجع الأسعار
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
