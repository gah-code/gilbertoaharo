import React from "react";
import type { SectionTimeline, TimelineItem } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import timelineSearch from "@/assets/timeline/timeline-search.svg";
import timelineJourney from "@/assets/timeline/timeline-journey.svg";
import timelineCreative from "@/assets/timeline/timeline-creative.svg";
import "@/styles/components/timeline.css";

function formatDateRange(item: TimelineItem) {
  const start = item.fields.startDate;
  const end = item.fields.endDate ?? "Present";
  return `${start} – ${end}`;
}

function resolveAssetUrl(url?: string | null) {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

export function TimelineSection({ section }: { section: SectionTimeline }) {
  const timeline = section.fields;
  const fallbackMedia = [
    { src: timelineSearch, alt: "Search and discovery illustration" },
    { src: timelineJourney, alt: "Journey path illustration" },
    { src: timelineCreative, alt: "Creative technology illustration" },
  ];

  return (
    <SectionShell anchorId={timeline.anchorId}>
      <div className="timeline">
        <Heading level={2}>{timeline.title}</Heading>
        <ol className="timeline-list">
        {timeline.items.map((item, index) => {
          const mediaSrc =
            resolveAssetUrl(item.fields.mediaImage?.fields.file?.url) ??
            fallbackMedia[index % fallbackMedia.length]?.src;
          const mediaAlt =
            item.fields.mediaAlt ??
            item.fields.mediaImage?.fields.title ??
            fallbackMedia[index % fallbackMedia.length]?.alt ??
            item.fields.title;

          const hasMedia = Boolean(mediaSrc);
          const flip = hasMedia && index % 2 === 1;

          return (
            <li key={item.sys.id} className={`timeline-item${flip ? " timeline-item--flip" : ""}`}>
              <div className="timeline-item__content">
                <Card
                  className="timeline-card"
                  style={{
                    padding: "var(--space-6)",
                    boxShadow: "0 20px 60px rgba(17, 24, 39, 0.08)",
                  }}
                >
                  <div className="timeline-card__content">
                    <Stack gap="var(--space-3)">
                      <div className="timeline-card__header">
                        <Heading level={4}>{item.fields.title}</Heading>
                        <Badge>{item.fields.kind}</Badge>
                      </div>
                      <Text muted>
                        {[item.fields.organization, item.fields.location]
                          .filter(Boolean)
                          .join(" · ")}
                      </Text>
                      <Text muted style={{ letterSpacing: "-0.01em" }}>
                        {formatDateRange(item)}
                      </Text>
                      {item.fields.summary ? (
                        <Text style={{ maxWidth: "65ch" }}>{item.fields.summary}</Text>
                      ) : null}
                      {item.fields.highlights?.length ? (
                        <ul className="timeline-card__highlights">
                          {item.fields.highlights.map((line, idx) => (
                            <li key={idx}>{line}</li>
                          ))}
                        </ul>
                      ) : null}
                      {item.fields.ctaLabel && item.fields.ctaHref ? (
                        <div>
                          <Button href={item.fields.ctaHref}>{item.fields.ctaLabel}</Button>
                        </div>
                      ) : null}
                      {item.fields.tags?.length ? (
                        <div className="timeline-card__tags">
                          {item.fields.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>
                      ) : null}
                    </Stack>
                  </div>
                </Card>
              </div>
              {hasMedia ? (
                <div className="timeline-item__media">
                  <div className="timeline-card__media-frame">
                    <img src={mediaSrc} alt={mediaAlt} loading="lazy" />
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
        </ol>
      </div>
    </SectionShell>
  );
}
