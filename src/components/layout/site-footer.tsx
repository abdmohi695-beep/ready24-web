import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, MessageCircle } from "lucide-react";

const LINKS = [
  { href: "https://wa.me/249115646893", label: "واتساب", icon: MessageCircle },
  { href: "https://web.facebook.com/ready24platform", label: "فيسبوك", icon: Facebook },
  {
    href: "https://www.linkedin.com/company/ready24platform/",
    label: "لينكدإن",
    icon: Linkedin,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo-horizontal.png"
                alt="Ready24"
                width={132}
                height={30}
              />
            </div>
            <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              خدمات احترافية سريعة، منظمة وبسيطة وواضحة.
            </p>
            <p className="text-sm font-semibold text-[hsl(var(--primary))]">
              Opportunity | Organized | Fast
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[hsl(var(--primary))]">
              ساعات العمل
            </h3>
            <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              الأحد إلى الخميس: 1:00 ظهرًا إلى 11:00 مساءً (بتوقيت السودان)
            </p>
            <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              إجازة: الجمعة والسبت والإجازات الرسمية في السودان
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[hsl(var(--primary))]">
              روابط مباشرة
            </h3>
            <ul className="space-y-2">
              {LINKS.map((l) => {
                const Icon = l.icon;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))] opacity-80 hover:opacity-100 hover:underline hover:underline-offset-4"
                    >
                      <Icon className="h-4 w-4" />
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[hsl(var(--border))] pt-6 text-xs text-[hsl(var(--muted-foreground))]">
          {new Date().getFullYear()} Ready24
        </div>
      </div>
    </footer>
  );
}
