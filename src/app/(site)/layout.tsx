import type { ReactNode } from "react";
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
