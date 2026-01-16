import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الخدمات | Ready24",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-semibold">الخدمات</h1>
      <p className="mt-3 text-sm text-neutral-600">
        هذه الصفحة قيد التجهيز. سننشرها قريبًا بنسخة كاملة ومتقنة.
      </p>
    </main>
  );
}
