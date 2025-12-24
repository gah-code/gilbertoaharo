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

  return (
    <SectionShell anchorId={hero.anchorId}>
      <Stack gap="var(--space-4)">
        {hero.eyebrow ? <Badge>{hero.eyebrow}</Badge> : null}
        <Heading level={1}>{hero.title}</Heading>
        <Heading level={3} style={{ color: "var(--muted)", fontWeight: 500 }}>
          {hero.tagline}
        </Heading>
        <Text>{hero.intro}</Text>
        <div style={{ display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
          {hero.primaryActionHref && hero.primaryActionLabel ? (
            <Button href={hero.primaryActionHref}>{hero.primaryActionLabel}</Button>
          ) : null}
          {hero.secondaryActionHref && hero.secondaryActionLabel ? (
            <Button
              href={hero.secondaryActionHref}
              style={{ background: "transparent", color: "#111" }}
            >
              {hero.secondaryActionLabel}
            </Button>
          ) : null}
        </div>
        {hero.highlights?.length ? (
          <ul style={{ paddingLeft: "20px", margin: 0, color: "var(--muted)" }}>
            {hero.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : null}
      </Stack>
    </SectionShell>
  );
}
