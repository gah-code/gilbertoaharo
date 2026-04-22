import type { Asset, LinkAction, SectionHero } from "@/content/contentful/types";

export type NormalizedHeroAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "text";
  openInNewTab: boolean;
  ariaLabel?: string;
};

export type NormalizedHeroMedia = {
  src: string;
  alt: string;
  kind: "heroImage" | "avatarImage";
};

export type NormalizedHeroSection = {
  id: string;
  anchorId: string;
  eyebrow?: string;
  name?: string;
  title: string;
  lead?: string;
  body?: string;
  proofPoints: string[];
  actions: NormalizedHeroAction[];
  media?: NormalizedHeroMedia;
  heroStyle: "typographic" | "avatar" | "image";
};

function compactText(value?: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function normalizeHeroStyle(
  value: SectionHero["fields"]["heroStyle"],
): "typographic" | "avatar" | "image" {
  if (value === "avatar" || value === "image") {
    return value;
  }
  return "typographic";
}

function resolveAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function resolveHeroMedia(asset?: Asset, explicitAlt?: string): NormalizedHeroMedia | undefined {
  const src = resolveAssetUrl(asset?.fields.file?.url);
  if (!src) return undefined;

  return {
    src,
    alt: compactText(explicitAlt) ?? compactText(asset?.fields.description) ?? "",
    kind: "heroImage",
  };
}

function resolveAvatarMedia(
  asset?: Asset,
  explicitAlt?: string,
  name?: string,
  title?: string,
): NormalizedHeroMedia | undefined {
  const src = resolveAssetUrl(asset?.fields.file?.url);
  if (!src) return undefined;

  return {
    src,
    alt:
      compactText(explicitAlt) ??
      compactText(asset?.fields.description) ??
      compactText(asset?.fields.title) ??
      (name ? `Portrait of ${name}` : title ? `Portrait of ${title}` : ""),
    kind: "avatarImage",
  };
}

function normalizeProofPoints(
  values?: string[] | null,
  fallbackValues?: string[] | null,
): string[] {
  const preferred = Array.isArray(values) ? values : [];
  const fallback = Array.isArray(fallbackValues) ? fallbackValues : [];
  const source = preferred.length ? preferred : fallback;

  return source
    .map((value) => compactText(value))
    .filter((value): value is string => Boolean(value))
    .slice(0, 3);
}

function mapLinkAction(action: LinkAction, index: number): NormalizedHeroAction | null {
  const label = compactText(action.fields.label);
  const href = compactText(action.fields.href);
  if (!label || !href) return null;

  const fallbackVariant: NormalizedHeroAction["variant"] =
    index === 0 ? "primary" : "secondary";

  return {
    label,
    href,
    variant: action.fields.variant ?? fallbackVariant,
    openInNewTab: Boolean(action.fields.openInNewTab),
    ariaLabel: compactText(action.fields.ariaLabel),
  };
}

function mapLegacyCtaAction(
  label?: string,
  href?: string,
  variant?: "primary" | "secondary" | "text",
  openInNewTab?: boolean,
  ariaLabel?: string,
): NormalizedHeroAction | null {
  const normalizedLabel = compactText(label);
  const normalizedHref = compactText(href);
  if (!normalizedLabel || !normalizedHref) return null;

  return {
    label: normalizedLabel,
    href: normalizedHref,
    variant: variant ?? "primary",
    openInNewTab: Boolean(openInNewTab),
    ariaLabel: compactText(ariaLabel),
  };
}

function normalizeActions(section: SectionHero): NormalizedHeroAction[] {
  const fields = section.fields;
  const mappedActions = (fields.actions ?? [])
    .map((action, index) => mapLinkAction(action, index))
    .filter((action): action is NormalizedHeroAction => Boolean(action))
    .slice(0, 2);

  if (mappedActions.length > 0) {
    return mappedActions;
  }

  const primaryLegacyAction = mapLegacyCtaAction(
    fields.primaryCtaLabel ?? fields.ctaLabel,
    fields.primaryCtaHref ?? fields.ctaHref,
    fields.primaryCtaVariant ?? "primary",
    fields.primaryCtaOpenInNewTab,
    fields.primaryCtaAriaLabel,
  );
  const secondaryLegacyAction = mapLegacyCtaAction(
    fields.secondaryCtaLabel,
    fields.secondaryCtaHref,
    fields.secondaryCtaVariant ?? "secondary",
    fields.secondaryCtaOpenInNewTab,
    fields.secondaryCtaAriaLabel,
  );

  return [primaryLegacyAction, secondaryLegacyAction]
    .filter((action): action is NormalizedHeroAction => Boolean(action))
    .slice(0, 2);
}

function normalizeMedia(section: SectionHero): {
  media?: NormalizedHeroMedia;
  heroStyle: "typographic" | "avatar" | "image";
} {
  const fields = section.fields;
  const requestedStyle = normalizeHeroStyle(fields.heroStyle);

  const heroMedia = resolveHeroMedia(fields.heroImage, fields.heroImageAlt);
  const avatarMedia = resolveAvatarMedia(
    fields.avatarImage,
    fields.avatarImageAlt,
    fields.name,
    fields.title,
  );

  if (requestedStyle === "typographic") {
    return {
      heroStyle: "typographic",
      media: undefined,
    };
  }

  const preferred =
    requestedStyle === "image"
      ? heroMedia
      : avatarMedia;
  const fallback = heroMedia ?? avatarMedia;
  const media = preferred ?? fallback;

  if (!media) {
    return {
      heroStyle: "typographic",
      media: undefined,
    };
  }

  return {
    media,
    heroStyle: media.kind === "heroImage" ? "image" : "avatar",
  };
}

export function normalizeHeroSection(section: SectionHero): NormalizedHeroSection {
  const fields = section.fields;
  const id = compactText(section.sys.id) ?? "hero-section";
  const title = compactText(fields.title) ?? "Hero";
  const name = compactText(fields.name);

  const lead = compactText(fields.lead) ?? compactText(fields.tagline);
  const body = compactText(fields.body) ?? compactText(fields.intro);
  const proofPoints = normalizeProofPoints(fields.proofPoints, fields.highlights);
  const actions = normalizeActions(section);
  const { media, heroStyle } = normalizeMedia(section);

  return {
    id,
    anchorId: compactText(fields.anchorId) ?? id,
    eyebrow: compactText(fields.eyebrow),
    name,
    title,
    lead,
    body,
    proofPoints,
    actions,
    media,
    heroStyle,
  };
}
