const fs = require("fs");
const path = require("path");

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function backupIfExists(filePath) {
  if (!fs.existsSync(filePath)) return;
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  const bak = `${filePath}.bak.${ts}`;
  fs.copyFileSync(filePath, bak);
  console.log("Backup:", bak);
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  backupIfExists(filePath);
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

function writeIfMissing(filePath, content) {
  if (fs.existsSync(filePath)) return;
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, { encoding: "utf8" });
}

const rootLayoutPath = path.join(process.cwd(), "src", "app", "layout.tsx");
const siteLayoutPath = path.join(process.cwd(), "src", "app", "(site)", "layout.tsx");

const headerPath = path.join(
  process.cwd(),
  "src",
  "components",
  "layout",
  "site-header.tsx",
);
const footerPath = path.join(
  process.cwd(),
  "src",
  "components",
  "layout",
  "site-footer.tsx",
);

const rootLayout = `import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Ready24",
    template: "%s | Ready24",
  },
  description: "Ready24 منصة خدمات احترافية سريعة  تجهيز مستندات، أعمال، وموارد بطريقة منظمة وسهلة.",
  metadataBase: new URL("https://ready24.org"),
};

const ibm = IBM_Plex_Sans_Arabic({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["arabic"],
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={\`\${ibm.className} min-h-dvh bg-white text-neutral-900 antialiased\`}>
        {children}
      </body>
    </html>
  );
}
`;

const siteLayout = `import type { ReactNode } from "react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl px-4 py-10">{children}</div>
      <SiteFooter />
    </div>
  );
}
`;

const siteHeader = `import Link from "next/link";

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
`;

const siteFooter = `export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="text-sm text-neutral-700">
          ساعات العمل: الأحد إلى الخميس من : ظهرًا إلى : مساءً (بتوقيت السودان).
        </p>
        <p className="mt-2 text-xs text-neutral-500">
          Ready24  Organized  Fast  Professional
        </p>
      </div>
    </footer>
  );
}
`;

writeFile(rootLayoutPath, rootLayout);
writeFile(siteLayoutPath, siteLayout);

writeIfMissing(headerPath, siteHeader);
writeIfMissing(footerPath, siteFooter);

console.log("OK: layouts normalized + header/footer created.");
