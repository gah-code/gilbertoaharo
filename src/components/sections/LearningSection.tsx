import React from "react";
import type { SectionLearning } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { normalizeLearningSection } from "./learning/normalizeLearningSection";
import { LearningRoadmapTimeline } from "./learning/LearningRoadmapTimeline";
import "./LearningSection.css";

export function LearningSection({ section }: { section: SectionLearning }) {
  const learning = normalizeLearningSection(section);
  const hasItems = learning.items.length > 0;

  return (
    <SectionShell anchorId={learning.anchorId} className="section-learning">
      <Stack className="learning-layout" gap="var(--space-6)">
        <Stack className="learning-header" gap="var(--space-3)">
          {learning.eyebrow ? (
            <Text
              as="div"
              className="learning-eyebrow"
              tone="muted"
              size="sm"
              weight="medium"
            >
              {learning.eyebrow}
            </Text>
          ) : null}
          <Heading level={2}>{learning.title}</Heading>
          {learning.intro ? (
            <Text className="learning-intro" tone="muted">
              {learning.intro}
            </Text>
          ) : null}
        </Stack>

        {hasItems ? (
          <LearningRoadmapTimeline items={learning.items} />
        ) : (
          <p className="learning-empty" role="status" aria-live="polite">
            Learning roadmap updates are in progress. Check back soon.
          </p>
        )}
      </Stack>
    </SectionShell>
  );
}
