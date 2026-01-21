import Image from "next/image";
import Link from "next/link";

const NAV = [
  { href: "/services", label: "الخدمات" },
  { href: "/pricing", label: "الأسعار" },
  { href: "/how-we-work", label: "كيف نشتغل" },
  { href: "/work", label: "أعمالنا" },
  { href: "/resources", label: "الموارد" },
  { href: "/ambassadors", label: "السفراء" },
  { href: "/faq", label: "الأسئلة" },
  { href: "/contact", label: "تواصل" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background)/0.85)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo-horizontal.png"
            alt="Ready24"
            width={132}
            height={30}
            priority
          />
          <span className="sr-only">Ready24</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-[hsl(var(--foreground))] opacity-80 hover:opacity-100 hover:underline hover:underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/order"
          className="inline-flex h-10 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] px-4 text-sm font-bold text-[hsl(var(--primary-foreground))] hover:opacity-95"
        >
          اطلب الآن
        </Link>
      </div>
    </header>
  );
}
