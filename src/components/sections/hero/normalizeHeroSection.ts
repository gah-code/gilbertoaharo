import type { LinkAction, SectionHero } from "@/content/contentful/types";

export type NormalizedHeroAction = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "text";
  openInNewTab: boolean;
  ariaLabel?: string;
};

export type NormalizedHeroSection = {
  anchorId: string;
  eyebrow?: string;
  name?: string;
  title: string;
  lead?: string;
  body?: string;
  proofPoints: string[];
  heroStyle: "typographic" | "avatar" | "image";
  avatarImageUrl?: string;
  avatarImageAlt?: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  actions: NormalizedHeroAction[];
};

function resolveAssetUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function mapLinkAction(action: LinkAction): NormalizedHeroAction | null {
  const label = action.fields.label;
  const href = action.fields.href;
  if (!label || !href) return null;

  return {
    label,
    href,
    variant: action.fields.variant ?? "primary",
    openInNewTab: action.fields.openInNewTab ?? false,
    ariaLabel: action.fields.ariaLabel,
  };
}

export function normalizeHeroSection(section: SectionHero): NormalizedHeroSection {
  const hero = section.fields;

  const avatarImageUrl = resolveAssetUrl(hero.avatarImage?.fields.file?.url);
  const heroImageUrl = resolveAssetUrl(hero.heroImage?.fields.file?.url);

  const heroStyle =
    hero.heroStyle === "avatar" && avatarImageUrl
      ? "avatar"
      : hero.heroStyle === "image" && heroImageUrl
        ? "image"
        : "typographic";

  const lead = hero.lead ?? undefined;
  const body = hero.body ?? undefined;
  const proofPoints = hero.proofPoints ?? [];

  const referencedActions =
    hero.actions
      ?.map(mapLinkAction)
      .filter(Boolean) as NormalizedHeroAction[] | undefined;

  const actions = referencedActions ?? [];

  const avatarImageAlt =
    hero.avatarImageAlt ??
    hero.avatarImage?.fields.title ??
    (hero.name ? `Portrait of ${hero.name}` : hero.title ? `Portrait of ${hero.title}` : undefined);

  const heroImageAlt = hero.heroImageAlt ?? "";

  return {
    anchorId: hero.anchorId,
    eyebrow: hero.eyebrow,
    name: hero.name,
    title: hero.title,
    lead,
    body,
    proofPoints,
    heroStyle,
    avatarImageUrl,
    avatarImageAlt,
    heroImageUrl,
    heroImageAlt,
    actions,
  };
}
