import React from "react";
import type { SectionHero } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Stack } from "../ui/Stack";
import { Grid } from "../ui/Grid";
import { normalizeHeroSection } from "./hero/normalizeHeroSection";
import { SectionHeader } from "./primitives/SectionHeader";
import { ProofList } from "./primitives/ProofList";
import { MediaFrame } from "./primitives/MediaFrame";
import "./HeroSection.css";

export function HeroSection({ section }: { section: SectionHero }) {
  const hero = normalizeHeroSection(section);
  const actions = hero.actions.filter(
    (action) => Boolean(action.label) && Boolean(action.href),
  );

  return (
    <SectionShell anchorId={hero.anchorId} className="section-hero">
      <Grid
        className={`hero-layout hero-layout--${hero.heroStyle}`}
        columns={hero.heroStyle === "typographic" ? 1 : "auto-fit"}
        minItemWidth="260"
        gap="6"
        align="center"
      >
        <Stack gap="var(--space-4)">
          <SectionHeader
            eyebrow={hero.eyebrow}
            name={hero.name}
            title={hero.title}
            lead={hero.lead}
            body={hero.body}
            actions={actions}
          />
          <ProofList items={hero.proofPoints} />
        </Stack>
        {hero.heroStyle === "avatar" && hero.avatarImageUrl ? (
          <MediaFrame
            kind="avatar"
            src={hero.avatarImageUrl}
            alt={hero.avatarImageAlt}
          />
        ) : null}
        {hero.heroStyle === "image" && hero.heroImageUrl ? (
          <MediaFrame
            kind="image"
            src={hero.heroImageUrl}
            alt={hero.heroImageAlt}
          />
        ) : null}
      </Grid>
    </SectionShell>
  );
}
