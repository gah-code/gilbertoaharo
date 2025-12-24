import React from "react";

type SeoProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
};

function upsertMeta(name: string, content: string) {
  const existing = document.querySelector(`meta[name="${name}"]`) as
    | HTMLMetaElement
    | null;
  const tag = existing ?? document.createElement("meta");
  tag.name = name;
  tag.content = content;
  if (!existing) document.head.appendChild(tag);
}

function upsertLink(rel: string, href: string) {
  const existing = document.querySelector(`link[rel="${rel}"]`) as
    | HTMLLinkElement
    | null;
  const link = existing ?? document.createElement("link");
  link.rel = rel;
  link.href = href;
  if (!existing) document.head.appendChild(link);
}

export function SeoHead({ title, description, canonicalUrl }: SeoProps) {
  React.useEffect(() => {
    const fallback = (import.meta.env.VITE_SITE_NAME as string) || undefined;
    if (title) {
      document.title = title;
    } else if (fallback) {
      document.title = fallback;
    }
  }, [title]);

  React.useEffect(() => {
    if (description) {
      upsertMeta("description", description);
    }
  }, [description]);

  React.useEffect(() => {
    if (canonicalUrl) {
      upsertLink("canonical", canonicalUrl);
    }
  }, [canonicalUrl]);

  return null;
}
