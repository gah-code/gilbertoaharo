import React from "react";
import type { SectionLearning } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Link } from "../ui/Link";

export function LearningSection({ section }: { section: SectionLearning }) {
  const learning = section.fields;

  return (
    <SectionShell anchorId={learning.anchorId}>
      <Heading level={2}>{learning.title}</Heading>
      <Stack gap="var(--space-4)">
        {learning.items.map((item) => (
          <Card key={item.sys.id}>
            <Stack gap="var(--space-2)">
              <Heading level={4}>{item.fields.topic}</Heading>
              {item.fields.description ? (
                <Text>{item.fields.description}</Text>
              ) : null}
              {item.fields.status ? <Badge>{item.fields.status}</Badge> : null}
              {item.fields.linkUrl ? (
                <Link href={item.fields.linkUrl}>
                  {item.fields.linkLabel ?? item.fields.linkUrl}
                </Link>
              ) : null}
            </Stack>
          </Card>
        ))}
      </Stack>
    </SectionShell>
  );
}
