import React from "react";
import type { SectionHero } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Stack } from "../ui/Stack";
import { normalizeHeroSection } from "./hero/normalizeHeroSection";
import { SectionHeader } from "./primitives/SectionHeader";
import { ProofList } from "./primitives/ProofList";
import { MediaFrame } from "./primitives/MediaFrame";
import "./HeroSection.css";

export function HeroSection({ section }: { section: SectionHero }) {
  const hero = normalizeHeroSection(section);
  const mediaFrameKind = hero.media?.kind === "avatarImage" ? "avatar" : "image";
  const heroLayoutClass = hero.media ? "hero-layout" : "hero-layout hero-layout--text-only";

  return (
    <SectionShell
      anchorId={hero.anchorId}
      className={`section-hero section-hero--${hero.heroStyle}`}
    >
      <div className={heroLayoutClass}>
        <Stack className="hero-content" gap="var(--space-6)">
          <SectionHeader
            eyebrow={hero.eyebrow}
            name={hero.name}
            title={hero.title}
            lead={hero.lead}
            body={hero.body}
            actions={hero.actions}
          />
          <ProofList items={hero.proofPoints} />
        </Stack>
        {hero.media ? (
          <div className={`hero-media hero-media--${hero.media.kind}`}>
            <MediaFrame
              kind={mediaFrameKind}
              src={hero.media.src}
              alt={hero.media.alt}
              loading="eager"
              decoding="async"
            />
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}
