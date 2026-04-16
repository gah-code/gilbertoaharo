import React from "react";
import type { SectionTimeline } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Inline } from "../ui/Inline";
import { normalizeTimelineSection } from "./timeline/normalizeTimelineSection";
import "./TimelineSection.css";

export function TimelineSection({ section }: { section: SectionTimeline }) {
  const timeline = normalizeTimelineSection(section);

  return (
    <SectionShell anchorId={timeline.anchorId} className="section-timeline">
      <div className="timeline">
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
        <ol className="timeline-list">
          {timeline.items.map((item) => (
            <li
              key={item.id}
              className={`timeline-item${item.flip ? " timeline-item--flip" : ""}`}
            >
              <div className="timeline-item__content">
                <Card className="timeline-card" density="lg" variant="elevated">
                  <div className="timeline-card__content">
                    <Stack gap="var(--space-3)">
                      <Inline className="timeline-card__header" align="center" gap="2">
                        <Heading level={4}>{item.title}</Heading>
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
                            aria-label={item.action.ariaLabel}
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
              {item.mediaSrc ? (
                <div className="timeline-item__media">
                  <div className="timeline-card__media-frame">
                    <img src={item.mediaSrc} alt={item.mediaAlt} loading="lazy" />
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
