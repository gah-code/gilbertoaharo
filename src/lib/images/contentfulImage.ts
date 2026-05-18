export type ContentfulImageFormat = "webp" | "avif" | "jpg" | "png";

export type ContentfulImageFit = "fill" | "scale" | "crop" | "thumb" | "pad";

export type ContentfulImageOptions = {
  width?: number;
  quality?: number;
  format?: ContentfulImageFormat;
  fit?: ContentfulImageFit;
};

const CONTENTFUL_IMAGE_HOST = "images.ctfassets.net";
const CONTENTFUL_IMAGE_FORMATS: ReadonlySet<string> = new Set([
  "webp",
  "avif",
  "jpg",
  "png",
]);
const CONTENTFUL_IMAGE_FITS: ReadonlySet<string> = new Set([
  "fill",
  "scale",
  "crop",
  "thumb",
  "pad",
]);

function parseUrl(url: string): URL | undefined {
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
}

function normalizePositiveInteger(value: number | undefined): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
  const rounded = Math.round(value);
  return rounded > 0 ? rounded : undefined;
}

function normalizeQuality(value: number | undefined): number | undefined {
  const quality = normalizePositiveInteger(value);
  return quality && quality <= 100 ? quality : undefined;
}

function normalizeFormat(value: ContentfulImageFormat | undefined): string | undefined {
  return value && CONTENTFUL_IMAGE_FORMATS.has(value) ? value : undefined;
}

function normalizeFit(value: ContentfulImageFit | undefined): string | undefined {
  return value && CONTENTFUL_IMAGE_FITS.has(value) ? value : undefined;
}

export function normalizeImageUrl(url?: string | null): string | undefined {
  const trimmed = url?.trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
}

export function isContentfulImageUrl(url?: string | null): boolean {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return false;

  const parsed = parseUrl(normalized);
  return parsed?.protocol === "https:" && parsed.hostname === CONTENTFUL_IMAGE_HOST;
}

export function buildContentfulImageUrl(
  url: string,
  options: ContentfulImageOptions,
): string {
  const normalized = normalizeImageUrl(url);
  if (!normalized) return url;

  const parsed = parseUrl(normalized);
  if (!parsed || !isContentfulImageUrl(normalized)) return normalized;

  const width = normalizePositiveInteger(options.width);
  const quality = normalizeQuality(options.quality);
  const format = normalizeFormat(options.format);
  const fit = normalizeFit(options.fit);

  if (width) parsed.searchParams.set("w", String(width));
  if (quality) parsed.searchParams.set("q", String(quality));
  if (format) parsed.searchParams.set("fm", format);
  if (fit) parsed.searchParams.set("fit", fit);

  return parsed.toString();
}

export function buildContentfulSrcSet(
  url: string,
  widths: number[],
  options: Omit<ContentfulImageOptions, "width"> = {},
): string | undefined {
  if (!isContentfulImageUrl(url)) return undefined;

  const validWidths = Array.from(
    new Set(
      widths
        .map((width) => normalizePositiveInteger(width))
        .filter((width): width is number => Boolean(width)),
    ),
  ).sort((a, b) => a - b);

  if (!validWidths.length) return undefined;

  return validWidths
    .map((width) => {
      const src = buildContentfulImageUrl(url, { ...options, width });
      return `${src} ${width}w`;
    })
    .join(", ");
}
