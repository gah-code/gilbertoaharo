import type { SectionContact } from "@/content/contentful/types";

export type NormalizedContactLink = {
  id: string;
  label: string;
  href: string;
};

export type NormalizedContactSection = {
  anchorId: string;
  title: string;
  intro?: string;
  email: string;
  emailHref: string;
  links: NormalizedContactLink[];
};

export function normalizeContactSection(
  section: SectionContact,
): NormalizedContactSection {
  const fields = section.fields;

  return {
    anchorId: fields.anchorId || section.sys.id,
    title: fields.title,
    intro: fields.intro ?? undefined,
    email: fields.email,
    emailHref: `mailto:${fields.email}`,
    links: (fields.links ?? []).map((link) => ({
      id: link.sys.id,
      label: link.fields.label,
      href: link.fields.url,
    })),
  };
}
