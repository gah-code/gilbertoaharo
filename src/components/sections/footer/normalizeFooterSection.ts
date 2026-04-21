import type { FooterLink, FooterLinkGroup, SectionFooter } from "@/content/contentful/types";

export type FooterLinkViewModel = {
  key: string;
  label: string;
  href: string;
  kind: "nav" | "social" | "email" | "legal" | "cta" | "other";
  iconKey?: "github" | "linkedin" | "email" | "external" | "arrow" | "none";
  openInNewTab: boolean;
  ariaLabel?: string;
};

export type FooterLinkGroupViewModel = {
  key: string;
  label: string;
  links: FooterLinkViewModel[];
};

export type FooterSectionViewModel = {
  brandTitle: string;
  brandSubtitle?: string;
  summary?: string;
  navigationGroups: FooterLinkGroupViewModel[];
  socialLinks: FooterLinkViewModel[];
  legalText?: string;
  builtWithText?: string;
};

type FooterLinkKind = FooterLinkViewModel["kind"];
type FooterIconKey = NonNullable<FooterLinkViewModel["iconKey"]>;

const FOOTER_LINK_KINDS: FooterLinkKind[] = [
  "nav",
  "social",
  "email",
  "legal",
  "cta",
  "other",
];

const FOOTER_ICON_KEYS: FooterIconKey[] = [
  "github",
  "linkedin",
  "email",
  "external",
  "arrow",
  "none",
];

function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function compactText(value?: string | null): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function isFooterLinkKind(value?: string): value is FooterLinkKind {
  return Boolean(value && FOOTER_LINK_KINDS.includes(value as FooterLinkKind));
}

function isFooterIconKey(value?: string): value is FooterIconKey {
  return Boolean(value && FOOTER_ICON_KEYS.includes(value as FooterIconKey));
}

function defaultOpenInNewTab(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function resolveLinkKind(
  explicitKind: string | undefined,
  href: string,
  fallbackKind: FooterLinkKind,
): FooterLinkKind {
  const normalizedKind = compactText(explicitKind)?.toLowerCase();
  if (isFooterLinkKind(normalizedKind)) return normalizedKind;
  if (/^mailto:/i.test(href)) return "email";
  return fallbackKind;
}

function normalizeFooterLink(
  link: FooterLink,
  fallbackKind: FooterLinkKind,
  fallbackKey: string,
): FooterLinkViewModel | null {
  const href = compactText(link.fields.href);
  if (!href) return null;

  const label = compactText(link.fields.label) ?? "Link";
  const key = compactText(link.fields.internalName) ?? label ?? fallbackKey;
  const iconKey = compactText(link.fields.iconKey)?.toLowerCase();

  return {
    key,
    label,
    href,
    kind: resolveLinkKind(link.fields.kind, href, fallbackKind),
    iconKey: isFooterIconKey(iconKey) ? iconKey : undefined,
    openInNewTab: link.fields.openInNewTab ?? defaultOpenInNewTab(href),
    ariaLabel: compactText(link.fields.ariaLabel),
  };
}

function normalizeFooterLinkGroup(
  group: FooterLinkGroup,
  groupIndex: number,
): FooterLinkGroupViewModel {
  const label = compactText(group.fields.label) ?? "Links";
  const fallbackGroupKey = `footer-group-${groupIndex + 1}`;
  const key = compactText(group.fields.internalName) ?? label ?? fallbackGroupKey;

  const links = safeArray(group.fields.links)
    .map((link, linkIndex) =>
      normalizeFooterLink(link, "nav", `${key}-link-${linkIndex + 1}`),
    )
    .filter((link): link is FooterLinkViewModel => Boolean(link));

  return {
    key,
    label,
    links,
  };
}

export function normalizeFooterSection(section: SectionFooter): FooterSectionViewModel {
  const fields = section.fields;
  const brandTitle = compactText(fields.brandTitle) ?? "Footer";

  return {
    brandTitle,
    brandSubtitle: compactText(fields.brandSubtitle),
    summary: compactText(fields.summary),
    navigationGroups: safeArray(fields.navigationGroups).map((group, groupIndex) =>
      normalizeFooterLinkGroup(group, groupIndex),
    ),
    socialLinks: safeArray(fields.socialLinks)
      .map((link, linkIndex) =>
        normalizeFooterLink(link, "social", `footer-social-link-${linkIndex + 1}`),
      )
      .filter((link): link is FooterLinkViewModel => Boolean(link)),
    legalText: compactText(fields.legalText),
    builtWithText: compactText(fields.builtWithText),
  };
}
