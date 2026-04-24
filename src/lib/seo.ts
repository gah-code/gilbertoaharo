import { env } from "@/env";

export type RouteSeo = {
  title: string;
  description: string;
  canonicalUrl?: string;
};

function trimNonEmpty(value?: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : undefined;
}

function normalizePath(pathname: string): string {
  const trimmed = pathname.trim();
  if (!trimmed) return "/";
  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (withLeadingSlash.length > 1 && withLeadingSlash.endsWith("/")) {
    return withLeadingSlash.slice(0, -1);
  }
  return withLeadingSlash;
}

export function buildCanonicalUrl(pathname: string): string {
  const normalizedPath = normalizePath(pathname);
  const siteUrl = trimNonEmpty(env.siteUrl);

  if (!siteUrl) return normalizedPath;

  try {
    const baseUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
    return new URL(normalizedPath, baseUrl).toString();
  } catch {
    return normalizedPath;
  }
}

export function resolveRouteSeo(
  seo: Partial<RouteSeo>,
  fallback: RouteSeo,
): RouteSeo {
  return {
    title: trimNonEmpty(seo.title) ?? fallback.title,
    description: trimNonEmpty(seo.description) ?? fallback.description,
    canonicalUrl: trimNonEmpty(seo.canonicalUrl) ?? fallback.canonicalUrl,
  };
}
