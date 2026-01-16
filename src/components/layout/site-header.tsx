import Link from "next/link";

const NAV = [
  { href: "/", label: "الرئيسية" },
  { href: "/services", label: "الخدمات" },
  { href: "/pricing", label: "الأسعار" },
  { href: "/how-we-work", label: "كيف نعمل" },
  { href: "/work", label: "أعمالنا" },
  { href: "/resources", label: "الموارد" },
  { href: "/ambassadors", label: "السفراء" },
  { href: "/faq", label: "الأسئلة" },
  { href: "/contact", label: "تواصل" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight">
          Ready24
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-neutral-700 hover:text-neutral-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/order"
          className="rounded-xl bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          اطلب خدمة
        </Link>
      </div>
    </header>
  );
}
