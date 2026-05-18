import React from "react";
import type { SectionHero } from "@/content/contentful/types";
import {
  buildContentfulImageUrl,
  buildContentfulSrcSet,
} from "@/lib/images/contentfulImage";
import { SectionShell } from "./SectionShell";
import { Stack } from "../ui/Stack";
import { normalizeHeroSection } from "./hero/normalizeHeroSection";
import { SectionHeader } from "./primitives/SectionHeader";
import { ProofList } from "./primitives/ProofList";
import { MediaFrame } from "./primitives/MediaFrame";
import "./HeroSection.css";

const HERO_IMAGE_WIDTHS = [480, 720, 960, 1200];
const HERO_IMAGE_SIZES = "(min-width: 1024px) 40vw, 90vw";

export function HeroSection({ section }: { section: SectionHero }) {
  const hero = normalizeHeroSection(section);
  const mediaFrameKind = hero.media?.kind === "avatarImage" ? "avatar" : "image";
  const heroLayoutClass = hero.media ? "hero-layout" : "hero-layout hero-layout--text-only";
  const heroImageSrc =
    hero.media?.kind === "heroImage"
      ? buildContentfulImageUrl(hero.media.src, {
          width: 1200,
          quality: 75,
          format: "webp",
        })
      : hero.media?.src;
  const heroImageSrcSet =
    hero.media?.kind === "heroImage"
      ? buildContentfulSrcSet(hero.media.src, HERO_IMAGE_WIDTHS, {
          quality: 75,
          format: "webp",
        })
      : undefined;
  const heroImageSizes = heroImageSrcSet ? HERO_IMAGE_SIZES : undefined;

  return (
    <SectionShell
      anchorId={hero.anchorId}
      className={`section-hero section-hero--${hero.heroStyle}`}
    >
      <div className={heroLayoutClass}>
        <Stack className="hero-content" gap="var(--section-content-gap)">
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
              src={heroImageSrc ?? hero.media.src}
              srcSet={heroImageSrcSet}
              sizes={heroImageSizes}
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
