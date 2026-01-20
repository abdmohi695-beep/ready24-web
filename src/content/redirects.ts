import { z } from "zod";

/**
 * Ready24  Redirects (Day-0)
 * المصدر: Sheet "Redirects" في قالب Day-0 Data Pack
 *
 * ملاحظة:
 * - نخليها بسيطة ومباشرة، ونقدر نولّد منها public/_redirects لاحقًا.
 */
const RedirectSchema = z.object({
  from: z.string().trim().min(1),
  to: z.string().trim().min(1),
  status: z.union([z.literal(301), z.literal(302)]).default(301),
  active: z.enum(["yes", "no"]).default("yes"),
  notes_ar: z.string().trim().optional().default(""),
});

export type RedirectRule = z.infer<typeof RedirectSchema>;
const RedirectsSchema = z.array(RedirectSchema);

const RAW_REDIRECTS: RedirectRule[] = [
  // مثال:
  // { from: "/home", to: "/", status: 301, active: "yes", notes_ar: "توحيد المسار القديم" },
];

export const REDIRECTS = RedirectsSchema.parse(RAW_REDIRECTS);

export function listActiveRedirects(): RedirectRule[] {
  return REDIRECTS.filter((r) => r.active === "yes");
}
