import React from "react";
import type { SectionHero } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function HeroSection({ section }: { section: SectionHero }) {
  const hero = section.fields;
  const avatarUrl = hero.avatarImage?.fields.file?.url
    ? hero.avatarImage.fields.file.url.startsWith("//")
      ? `https:${hero.avatarImage.fields.file.url}`
      : hero.avatarImage.fields.file.url
    : undefined;
  const heroImageUrl = hero.heroImage?.fields.file?.url
    ? hero.heroImage.fields.file.url.startsWith("//")
      ? `https:${hero.heroImage.fields.file.url}`
      : hero.heroImage.fields.file.url
    : undefined;
  const heroStyle = hero.heroStyle ?? "typographic";
  const effectiveStyle =
    heroStyle === "avatar" && avatarUrl
      ? "avatar"
      : heroStyle === "image" && heroImageUrl
        ? "image"
        : "typographic";

  return (
    <SectionShell anchorId={hero.anchorId}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            effectiveStyle === "typographic"
              ? "1fr"
              : "repeat(auto-fit, minmax(260px, 1fr))",
          alignItems: "center",
          gap: "var(--space-6)",
        }}
      >
        <Stack gap="var(--space-4)">
          {hero.eyebrow ? <Badge>{hero.eyebrow}</Badge> : null}
          <Heading level={1}>{hero.title}</Heading>
          {hero.tagline ? (
            <Heading
              level={3}
              weight="semibold"
              style={{ color: "var(--color-text-muted)" }}
            >
              {hero.tagline}
            </Heading>
          ) : null}
          {hero.intro ? <Text>{hero.intro}</Text> : null}
          <div
            style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}
          >
            {hero.primaryActionHref && hero.primaryActionLabel ? (
              <Button href={hero.primaryActionHref}>
                {hero.primaryActionLabel}
              </Button>
            ) : null}
            {hero.secondaryActionHref && hero.secondaryActionLabel ? (
              <Button
                href={hero.secondaryActionHref}
                style={{
                  background: "transparent",
                  color: "var(--color-accent)",
                }}
              >
                {hero.secondaryActionLabel}
              </Button>
            ) : null}
          </div>
          {hero.highlights?.length ? (
            <ul
              style={{
                paddingLeft: "20px",
                margin: 0,
                color: "var(--color-text-muted)",
              }}
            >
              {hero.highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : null}
        </Stack>
        {effectiveStyle === "avatar" && avatarUrl ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={avatarUrl}
              alt={`Portrait of ${hero.title}`}
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "var(--radius-pill)",
                objectFit: "cover",
                border: "1px solid var(--color-border-subtle)",
                background: "var(--color-surface)",
              }}
            />
          </div>
        ) : null}
        {effectiveStyle === "image" && heroImageUrl ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={heroImageUrl}
              alt=""
              style={{
                width: "100%",
                maxWidth: "520px",
                borderRadius: "var(--radius-lg)",
                objectFit: "cover",
                border: "1px solid var(--color-border-subtle)",
                background: "var(--color-surface)",
              }}
            />
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
