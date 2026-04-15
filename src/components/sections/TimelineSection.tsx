import React from "react";
import type {
  SectionTimeline,
  TimelineItem,
  TimelineMedia,
  TimelineAction,
} from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Link } from "../ui/Link";
import timelineSearch from "@/assets/timeline/timeline-search.svg";
import timelineJourney from "@/assets/timeline/timeline-journey.svg";
import timelineCreative from "@/assets/timeline/timeline-creative.svg";
import "./TimelineSection.css";

function parseDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

function formatDate(value?: string | null) {
  const parsed = parseDate(value);
  if (!parsed) return value ?? "";
  return parsed.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function getTimelineDateRange(item: TimelineItem) {
  const startRaw = item.fields.startDateValue ?? item.fields.startDate;
  const endRaw =
    item.fields.isCurrent === true
      ? "Present"
      : item.fields.endDateValue ?? item.fields.endDate;

  const start = formatDate(startRaw);
  const end = formatDate(endRaw);

  if (start && end) return `${start} — ${end}`;
  if (start) return start;
  if (end) return end;
  return "";
}

function resolveAssetUrl(url?: string | null) {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function resolveMedia(media?: TimelineMedia, fallbackUrl?: string) {
  if (!media) {
    return fallbackUrl ? { src: fallbackUrl } : undefined;
  }

  // Asset shape
  if ("fields" in media) {
    const assetUrl = resolveAssetUrl(media.fields.file?.url);
    return assetUrl ? { src: assetUrl, alt: media.fields.title } : undefined;
  }

  // Direct object shape
  return media.src ? { src: media.src, alt: media.alt } : undefined;
}

function resolveAction(action?: TimelineAction, legacy?: { label?: string; href?: string }) {
  if (action && "fields" in action) {
    const fields = action.fields;
    return {
      label: fields.label,
      href: fields.href,
      variant: fields.variant ?? "text",
      openInNewTab: fields.openInNewTab,
      ariaLabel: fields.ariaLabel,
    };
  }

  if (action && "label" in action && "href" in action) {
    return {
      label: action.label,
      href: action.href,
      variant: action.variant ?? "text",
      openInNewTab: action.openInNewTab,
      ariaLabel: action.ariaLabel,
    };
  }

  if (legacy?.label && legacy.href) {
    return { label: legacy.label, href: legacy.href, variant: "text" as const };
  }

  return undefined;
}

export function TimelineSection({ section }: { section: SectionTimeline }) {
  const timeline = section.fields;
  const fallbackMedia = [
    { src: timelineSearch, alt: "Search and discovery illustration" },
    { src: timelineJourney, alt: "Journey path illustration" },
    { src: timelineCreative, alt: "Creative technology illustration" },
  ];

  return (
    <SectionShell anchorId={timeline.anchorId} className="section-timeline">
      <div className="timeline">
        {timeline.eyebrow ? (
          <Text className="timeline-eyebrow" muted>
            {timeline.eyebrow}
          </Text>
        ) : null}
        <Heading level={2}>{timeline.title}</Heading>
        {timeline.intro ? (
          <Text
            className="timeline-intro"
            muted
            style={{ marginBottom: "var(--space-6)" }}
          >
            {timeline.intro}
          </Text>
        ) : null}
        <ol className="timeline-list">
          {timeline.items.map((item, index) => {
            const resolvedMedia =
              resolveMedia(
                item.fields.media ?? item.fields.mediaImage,
                fallbackMedia[index % fallbackMedia.length]?.src,
              ) ?? fallbackMedia[index % fallbackMedia.length];

            const mediaAlt =
              item.fields.mediaAlt ??
              resolvedMedia?.alt ??
              item.fields.mediaImage?.fields.title ??
              fallbackMedia[index % fallbackMedia.length]?.alt ??
              item.fields.title;

            const hasMedia = Boolean(resolvedMedia?.src);
            const flip = hasMedia && index % 2 === 1;
            const dateRange = getTimelineDateRange(item);
            const action = resolveAction(item.fields.action, {
              label: item.fields.ctaLabel,
              href: item.fields.ctaHref,
            });

            return (
              <li
                key={item.sys.id || `${item.fields.title}-${index}`}
                className={`timeline-item${flip ? " timeline-item--flip" : ""}`}
              >
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
                        {item.fields.context ? (
                          <Text className="timeline-context">{item.fields.context}</Text>
                        ) : null}
                        {dateRange ? (
                          <Text muted style={{ letterSpacing: "-0.01em" }}>
                            {dateRange}
                          </Text>
                        ) : null}
                        {item.fields.summary ? (
                          <Text className="timeline-summary" style={{ maxWidth: "65ch" }}>
                            {item.fields.summary}
                          </Text>
                        ) : null}
                        {item.fields.highlights?.length ? (
                          <ul className="timeline-card__highlights">
                            {item.fields.highlights.map((line, idx) => (
                              <li key={idx}>{line}</li>
                            ))}
                          </ul>
                        ) : null}
                        {item.fields.tags?.length ? (
                          <div className="timeline-tags">
                            {item.fields.tags.map((tag) => (
                              <span className="timeline-tag" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        {action ? (
                          <div className="timeline-action">
                            <Link
                              href={action.href}
                              aria-label={action.ariaLabel}
                              target={action.openInNewTab ? "_blank" : undefined}
                              rel={
                                action.openInNewTab
                                  ? "noreferrer noopener"
                                  : undefined
                              }
                              className={`timeline-action__link timeline-action__link--${action.variant ?? "text"}`}
                            >
                              {action.label}
                            </Link>
                          </div>
                        ) : null}
                      </Stack>
                    </div>
                  </Card>
                </div>
                {hasMedia ? (
                  <div className="timeline-item__media">
                    <div className="timeline-card__media-frame">
                      <img src={resolvedMedia?.src} alt={mediaAlt} loading="lazy" />
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
