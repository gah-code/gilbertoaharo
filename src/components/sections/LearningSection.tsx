import React from "react";
import type { SectionLearning } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Link } from "../ui/Link";
import { normalizeLearningSection } from "./learning/normalizeLearningSection";
import "./LearningSection.css";

export function LearningSection({ section }: { section: SectionLearning }) {
  const learning = normalizeLearningSection(section);

  return (
    <SectionShell anchorId={learning.anchorId} className="section-learning">
      <Heading level={2}>{learning.title}</Heading>
      <Stack gap="var(--space-4)">
        {learning.items.map((item) => (
          <Card key={item.id} className="learning-card">
            <Stack gap="var(--space-2)">
              <Heading level={4}>{item.topic}</Heading>
              {item.description ? <Text>{item.description}</Text> : null}
              {item.status ? (
                <Badge tone={item.statusTone}>{item.status}</Badge>
              ) : null}
              {item.linkUrl ? (
                <Link href={item.linkUrl}>
                  {item.linkLabel ?? item.linkUrl}
                </Link>
              ) : null}
            </Stack>
          </Card>
        ))}
      </Stack>
    </SectionShell>
  );
}
