// src/lib/site.ts
import { SITE_CONFIG } from "../content/site-config";

/**
 * Ready24 — Site helpers
 * الهدف:
 * - نقرأ site-config.ts كمصدر واحد للحقيقة
 * - نطلع Helpers جاهزة للاستخدام في Layout/SEO/Forms/WhatsApp
 */

type SiteConfigMap = Record<string, string>;

function normalizeStr(v: unknown): string {
  if (v == null) return "";
  return String(v).trim();
}

function toMap(): SiteConfigMap {
  const map: SiteConfigMap = {};
  for (const row of SITE_CONFIG) {
    const key = normalizeStr(row.key);
    if (!key) continue;
    map[key] = normalizeStr(row.value);
  }
  return map;
}

const MAP = toMap();

/**
 * اقرأ قيمة من site-config
 * - لو المفتاح غير موجود يرجع fallback
 */
export function getSiteConfig(key: string, fallback = ""): string {
  return MAP[key] ?? fallback;
}

/**
 * توحيد path (دائمًا يبدأ بـ /)
 */
export function normalizePath(path: string): string {
  const p = normalizeStr(path);
  if (!p) return "/";
  return p.startsWith("/") ? p : `/${p}`;
}

/**
 * رابط الموقع الأساسي (canonical)
 * - يفضل تعريفه داخل site-config بمفتاح: site_url
 * - fallback: https://ready24.org
 */
export function getSiteUrl(): string {
  const v = getSiteConfig("site_url", "https://ready24.org");
  return v.replace(/\/+$/, "");
}

/**
 * يبني رابط كامل من path
 */
export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${normalizePath(path)}`;
}

/**
 * رقم واتساب (digits only)
 * - يفضل داخل site-config بمفتاح: whatsapp_number
 * مثال: 249115646893
 */
export function getWhatsappNumber(): string {
  return getSiteConfig("whatsapp_number", "");
}

/**
 * يبني رابط wa.me
 * - لو الرقم فاضي، يرجع string فاضي عشان ما نكسر أي زر
 */
export function buildWhatsappLink(message?: string): string {
  const phone = getWhatsappNumber();
  if (!phone) return "";
  const text = normalizeStr(message);
  if (!text) return `https://wa.me/${phone}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * معلومات أساسية شائعة الاستخدام
 * - يفضل تعريفها داخل site-config:
 *   brand_name_ar, brand_tagline_ar, support_email
 */
export const SITE = {
  brandNameAr: getSiteConfig("brand_name_ar", "Ready24"),
  brandTaglineAr: getSiteConfig("brand_tagline_ar", ""),
  supportEmail: getSiteConfig("support_email", ""),
  siteUrl: getSiteUrl(),
};
