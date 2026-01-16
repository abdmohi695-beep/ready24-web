import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Ready24",
    template: "%s | Ready24",
  },
  description:
    "Ready24 منصة خدمات احترافية سريعة  تجهيز مستندات، أعمال، وموارد بطريقة منظمة وسهلة.",
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
      <body
        className={`${ibm.className} min-h-dvh bg-white text-neutral-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
