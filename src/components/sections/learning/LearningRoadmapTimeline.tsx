import React from "react";
import type { BadgeTone } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import { Heading } from "@/components/ui/Heading";
import { Link } from "@/components/ui/Link";
import type { NormalizedLearningItem } from "./normalizeLearningSection";
import "./LearningRoadmapTimeline.css";

type LearningRoadmapTimelineProps = {
  items: NormalizedLearningItem[];
};

function statusToBadgeTone(status: NormalizedLearningItem["status"]): BadgeTone {
  if (status === "shipping") return "success";
  if (status === "practicing") return "warning";
  return "muted";
}

export function LearningRoadmapTimeline({ items }: LearningRoadmapTimelineProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="learning-roadmap" role="list" aria-label="Learning roadmap timeline">
      {items.map((item) => (
        <article
          key={item.key}
          role="listitem"
          className={[
            "learning-roadmap__step",
            `learning-roadmap__step--${item.status}`,
            item.isNextUp ? "learning-roadmap__step--next-up" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="learning-roadmap__rail">
            <Text
              as="span"
              className="learning-roadmap__label"
              size="sm"
              tone="muted"
              weight="medium"
            >
              {item.roadmapLabel}
            </Text>
            <span className="learning-roadmap__marker">{item.roadmapIndex + 1}</span>
            {item.isLast ? null : <span className="learning-roadmap__line" />}
          </div>

          <Card className="learning-roadmap__card" variant="subtle">
            <div className="learning-roadmap__card-content">
              <div className="learning-roadmap__header">
                <Heading level={4}>{item.topic}</Heading>
                <div className="learning-roadmap__header-badges">
                  {item.isNextUp ? (
                    <Badge tone="warning" size="sm">
                      Next Up
                    </Badge>
                  ) : null}
                  <Badge tone={statusToBadgeTone(item.status)} size="sm">
                    {item.statusLabel}
                  </Badge>
                </div>
              </div>

              {item.description ? (
                <Text className="learning-roadmap__description" tone="muted">
                  {item.description}
                </Text>
              ) : null}

              {item.focusAreas.length ? (
                <div className="learning-roadmap__focus-areas">
                  {item.focusAreas.map((focusArea) => (
                    <Badge key={focusArea} tone="muted" size="sm">
                      {focusArea}
                    </Badge>
                  ))}
                </div>
              ) : null}

              {item.action ? (
                <Link className="learning-roadmap__action" href={item.action.href}>
                  {item.action.label}
                </Link>
              ) : null}
            </div>
          </Card>
        </article>
      ))}
    </div>
  );
}
