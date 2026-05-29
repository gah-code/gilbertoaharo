import { env } from "@/env";

export type RouteSeo = {
  title: string;
  description: string;
  canonicalUrl?: string;
};

export type RobotsMeta = {
  index: boolean;
  follow: boolean;
};

export const DEFAULT_SITE_URL = "https://gilbertaharo.com";

export const DEFAULT_SEO_KEYWORDS = [
  "Gilberto Haro",
  "Gilbert Alejandro Haro",
  "web developer",
  "frontend developer",
  "frontend engineer",
  "Content Systems Specialist",
  "content systems",
  "CMS",
  "design systems",
  "AI-enabled workflows",
  "React",
  "TypeScript",
  "Contentful",
  "AEM",
  "portfolio",
  "web performance",
  "SEO",
  "accessibility",
];

export const DEFAULT_ROBOTS_META: RobotsMeta = {
  index: true,
  follow: true,
};

function trimNonEmpty(value?: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : undefined;
}

function uniqueNonEmptyValues(values: string[]): string[] {
  const seen = new Set<string>();
  return values.reduce<string[]>((result, value) => {
    const normalized = trimNonEmpty(value);
    if (!normalized || seen.has(normalized)) return result;
    seen.add(normalized);
    result.push(normalized);
    return result;
  }, []);
}

export function formatKeywords(keywords = DEFAULT_SEO_KEYWORDS): string {
  return uniqueNonEmptyValues(keywords).join(", ");
}

export function formatRobotsMeta(
  robots: RobotsMeta = DEFAULT_ROBOTS_META,
): string {
  return `${robots.index ? "index" : "noindex"}, ${
    robots.follow ? "follow" : "nofollow"
  }`;
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

function normalizeSiteUrl(siteUrl?: string | null): string {
  const fallback = DEFAULT_SITE_URL;
  const candidate = trimNonEmpty(siteUrl) ?? fallback;

  try {
    const parsed = new URL(candidate);
    return parsed.origin;
  } catch {
    return fallback;
  }
}

export function buildCanonicalUrl(pathname: string): string {
  const normalizedPath = normalizePath(pathname);
  const siteUrl = normalizeSiteUrl(env.siteUrl);

  try {
    const baseUrl = siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
    return new URL(normalizedPath, baseUrl).toString();
  } catch {
    return new URL(normalizedPath, `${DEFAULT_SITE_URL}/`).toString();
  }
}

export function resolveCanonicalUrl(
  canonicalUrl?: string | null,
  fallbackPath = "/",
): string {
  const candidate = trimNonEmpty(canonicalUrl);
  if (!candidate) return buildCanonicalUrl(fallbackPath);

  const absoluteCandidate = candidate.startsWith("//")
    ? `https:${candidate}`
    : candidate;

  try {
    return new URL(absoluteCandidate).toString();
  } catch {
    return buildCanonicalUrl(candidate);
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
