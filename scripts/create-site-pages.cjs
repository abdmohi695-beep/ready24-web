const fs = require("fs");
const path = require("path");

function writeIfMissing(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, { encoding: "utf8" });
  }
}

const appRoot = path.join(process.cwd(), "src", "app");
const siteRoot = path.join(appRoot, "(site)");

// 1) تجنّب تعارض "/" : لو عندنا src/app/page.tsx وما عندنا (site)/page.tsx
//    بنعيد تسمية القديم إلى page.old.tsx (ما بقى Route)
const rootHome = path.join(appRoot, "page.tsx");
const rootHomeOld = path.join(appRoot, "page.old.tsx");
const siteHome = path.join(siteRoot, "page.tsx");

if (fs.existsSync(rootHome) && !fs.existsSync(siteHome) && !fs.existsSync(rootHomeOld)) {
  fs.renameSync(rootHome, rootHomeOld);
  console.log("Moved src/app/page.tsx -> src/app/page.old.tsx (avoid / conflict)");
}

// 2) layout خاص بـ (site) لو ما موجود
writeIfMissing(
  path.join(siteRoot, "layout.tsx"),
  [
    'import type { ReactNode } from "react";',
    "",
    "export default function SiteLayout({ children }: { children: ReactNode }) {",
    '  return <div className="min-h-dvh">{children}</div>;',
    "}",
    "",
  ].join("\n"),
);

// 3) صفحات placeholder (بالعربي)
const pages = [
  ["page.tsx", "الرئيسية"],
  ["services/page.tsx", "الخدمات"],
  ["pricing/page.tsx", "الأسعار"],
  ["how-we-work/page.tsx", "كيف نعمل"],
  ["order/page.tsx", "طلب خدمة"],
  ["work/page.tsx", "أعمالنا"],
  ["resources/page.tsx", "الموارد والفرص"],
  ["ambassadors/page.tsx", "السفراء"],
  ["policies/page.tsx", "السياسات"],
  ["faq/page.tsx", "الأسئلة الشائعة"],
  ["contact/page.tsx", "تواصل معنا"],
];

function pageFile(title) {
  return [
    'import type { Metadata } from "next";',
    "",
    "export const metadata: Metadata = {",
    `  title: "${title} | Ready24",`,
    "};",
    "",
    "export default function Page() {",
    "  return (",
    '    <main className="mx-auto max-w-4xl px-4 py-10">',
    `      <h1 className="text-2xl font-semibold">${title}</h1>`,
    '      <p className="mt-3 text-sm text-neutral-600">هذه الصفحة قيد التجهيز. سننشرها قريبًا بنسخة كاملة ومتقنة.</p>',
    "    </main>",
    "  );",
    "}",
    "",
  ].join("\n");
}

for (const [rel, title] of pages) {
  writeIfMissing(path.join(siteRoot, ...rel.split("/")), pageFile(title));
}

console.log("OK: created (site) page placeholders (no overwrite).");
