import * as seoContent from "../content/seo";
import type { SeoEntry } from "../content/types";
import { absoluteUrl, normalizePath, getSiteConfig } from "./site";

/**
 * Ready24 — SEO Helpers
 * Source of Truth: src/content/seo.ts
 *
 * ملاحظة:
 * - نستخدم namespace import عشان ما نتكسر لو ملف المحتوى لسه فاضي أو الاسم مختلف.
 * - بدون any (عشان eslint).
 */

type SeoContentExports = Partial<{
  SEO_ENTRIES: SeoEntry[];
  SEO: SeoEntry[];
}>;

function isSeoArray(v: unknown): v is SeoEntry[] {
  return Array.isArray(v);
}

const content = seoContent as unknown as SeoContentExports;

const SEO_ENTRIES: SeoEntry[] = isSeoArray(content.SEO_ENTRIES)
  ? content.SEO_ENTRIES
  : isSeoArray(content.SEO)
    ? content.SEO
    : [];

function normalizeKey(path: string): string {
  const p = normalizePath(path).replace(/\/+$/, "") || "/";
  return p === "" ? "/" : p;
}

export function getSeoEntry(path: string): SeoEntry | undefined {
  const key = normalizeKey(path);
  return SEO_ENTRIES.find((e) => normalizeKey(e.path) === key);
}

export function getCanonicalPath(path: string): string {
  const entry = getSeoEntry(path);
  if (!entry?.canonical) return normalizePath(path);
  return normalizePath(entry.canonical);
}

export function getCanonicalUrl(path: string): string {
  return absoluteUrl(getCanonicalPath(path));
}

export type SeoResolved = {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
};

export function resolveSeo(path: string): SeoResolved {
  const entry = getSeoEntry(path);

  const defaultTitle = getSiteConfig(
    "default_seo_title_ar",
    getSiteConfig("brand_name_ar", "Ready24"),
  );
  const defaultDescription = getSiteConfig("default_seo_description_ar", "");

  const title = entry?.title_ar?.trim() || defaultTitle;
  const description = entry?.description_ar?.trim() || defaultDescription;

  const canonicalUrl = getCanonicalUrl(path);
  const robots = entry?.robots?.trim() || "index,follow";

  const ogTitle = (entry?.og_title_ar || title).trim();
  const ogDescription = (entry?.og_description_ar || description).trim();

  const ogPath =
    (entry?.og_image_path || "").trim() ||
    getSiteConfig("default_og_image_path", "").trim();

  const ogImageUrl = ogPath ? absoluteUrl(ogPath) : "";

  return {
    title,
    description,
    canonicalUrl,
    robots,
    ogTitle,
    ogDescription,
    ogImageUrl,
  };
}
