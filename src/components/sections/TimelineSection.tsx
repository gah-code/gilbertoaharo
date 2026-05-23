import React from "react";
import type { SectionTimeline } from "@/content/contentful/types";
import {
  buildContentfulImageUrl,
  buildContentfulSrcSet,
} from "@/lib/images/contentfulImage";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Inline } from "../ui/Inline";
import { getAriaLabelWithVisibleText } from "../ui/accessibleName";
import { normalizeTimelineSection } from "./timeline/normalizeTimelineSection";
import "./TimelineSection.css";

const TIMELINE_IMAGE_WIDTHS = [320, 480, 640, 800];
const TIMELINE_IMAGE_SIZES = "(min-width: 768px) 316px, 90vw";

export function TimelineSection({ section }: { section: SectionTimeline }) {
  const timeline = normalizeTimelineSection(section);
  const hasItems = timeline.items.length > 0;

  return (
    <SectionShell anchorId={timeline.anchorId} className="section-timeline">
      <Stack className="timeline" gap="var(--section-content-gap)">
        <Stack className="timeline-header" gap="var(--section-header-gap)">
          {timeline.eyebrow ? (
            <Text className="timeline-eyebrow" tone="muted" size="sm" weight="medium">
              {timeline.eyebrow}
            </Text>
          ) : null}
          <Heading level={2}>{timeline.title}</Heading>
          {timeline.intro ? (
            <Text className="timeline-intro" tone="muted">
              {timeline.intro}
            </Text>
          ) : null}
        </Stack>
        {hasItems ? (
          <ol className="timeline-list">
            {timeline.items.map((item) => {
              const mediaSrc = item.mediaSrc
                ? buildContentfulImageUrl(item.mediaSrc, {
                    width: 800,
                    quality: 75,
                    format: "webp",
                  })
                : undefined;
              const mediaSrcSet = item.mediaSrc
                ? buildContentfulSrcSet(item.mediaSrc, TIMELINE_IMAGE_WIDTHS, {
                    quality: 75,
                    format: "webp",
                  })
                : undefined;
              const mediaSizes = mediaSrcSet ? TIMELINE_IMAGE_SIZES : undefined;

              return (
                <li
                  key={item.id}
                  className={`timeline-item${item.flip ? " timeline-item--flip" : ""}`}
                >
                  <div className="timeline-item__content">
                    <Card className="timeline-card" density="lg" variant="elevated">
                      <div className="timeline-card__content">
                        <Stack gap="var(--space-3)">
                          <Inline className="timeline-card__header" align="start" gap="2">
                            <Heading level={4} className="timeline-card__title">
                              {item.title}
                            </Heading>
                            <Badge>{item.kind}</Badge>
                          </Inline>
                          {item.organizationLine ? (
                            <Text tone="muted">{item.organizationLine}</Text>
                          ) : null}
                          {item.context ? (
                            <Text className="timeline-context">{item.context}</Text>
                          ) : null}
                          {item.dateRange ? (
                            <Text className="timeline-date" tone="muted" tracking="tight">
                              {item.dateRange}
                            </Text>
                          ) : null}
                          {item.summary ? (
                            <Text className="timeline-summary">{item.summary}</Text>
                          ) : null}
                          {item.highlights.length ? (
                            <ul className="timeline-card__highlights">
                              {item.highlights.map((line, idx) => (
                                <li key={idx}>{line}</li>
                              ))}
                            </ul>
                          ) : null}
                          {item.tags.length ? (
                            <div className="timeline-tags">
                              {item.tags.map((tag) => (
                                <span className="timeline-tag" key={tag}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}
                          {item.action ? (
                            <div className="timeline-action">
                              <Button
                                href={item.action.href}
                                variant={item.action.variant}
                                size="sm"
                                aria-label={getAriaLabelWithVisibleText(
                                  item.action.label,
                                  item.action.ariaLabel,
                                )}
                                target={item.action.openInNewTab ? "_blank" : undefined}
                                rel={item.action.openInNewTab ? "noreferrer noopener" : undefined}
                              >
                                {item.action.label}
                              </Button>
                            </div>
                          ) : null}
                        </Stack>
                      </div>
                    </Card>
                  </div>
                  {mediaSrc ? (
                    <div className="timeline-item__media">
                      <div className="timeline-card__media-frame">
                        <img
                          src={mediaSrc}
                          srcSet={mediaSrcSet}
                          sizes={mediaSizes}
                          alt={item.mediaAlt}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="timeline-empty" role="status" aria-live="polite">
            Timeline details are being refreshed. Check back soon.
          </p>
        )}
      </Stack>
    </SectionShell>
  );
}
