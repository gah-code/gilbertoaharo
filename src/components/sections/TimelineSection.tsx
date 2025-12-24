import React from "react";
import type { SectionTimeline, TimelineItem } from "@/content/contentful/types";
import { SectionShell } from "./SectionShell";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Stack } from "../ui/Stack";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

function formatDateRange(item: TimelineItem) {
  const start = item.fields.startDate;
  const end = item.fields.endDate ?? "Present";
  return `${start} – ${end}`;
}

export function TimelineSection({ section }: { section: SectionTimeline }) {
  const timeline = section.fields;

  return (
    <SectionShell anchorId={timeline.anchorId}>
      <Heading level={2}>{timeline.title}</Heading>
      <Stack as="ul" gap="var(--space-4)" style={{ listStyle: "none", padding: 0 }}>
        {timeline.items.map((item) => (
          <li key={item.sys.id}>
            <Card>
              <Stack gap="var(--space-2)">
                <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                  <Heading level={4}>{item.fields.title}</Heading>
                  <Badge>{item.fields.kind}</Badge>
                </div>
                <Text muted>
                  {[item.fields.organization, item.fields.location]
                    .filter(Boolean)
                    .join(" · ")}
                </Text>
                <Text muted>{formatDateRange(item)}</Text>
                {item.fields.summary ? <Text>{item.fields.summary}</Text> : null}
                {item.fields.highlights?.length ? (
                  <ul style={{ margin: 0, paddingLeft: "18px" }}>
                    {item.fields.highlights.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                ) : null}
                {item.fields.tags?.length ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
                    {item.fields.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                ) : null}
              </Stack>
            </Card>
          </li>
        ))}
      </Stack>
    </SectionShell>
  );
}
