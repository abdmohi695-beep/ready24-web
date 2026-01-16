// src/app/(site)/layout.tsx
import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh">{children}</div>;
}
