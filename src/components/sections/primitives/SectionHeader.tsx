import React from "react";
import { Badge } from "../../ui/Badge";
import { Heading } from "../../ui/Heading";
import { Text } from "../../ui/Text";
import { Stack } from "../../ui/Stack";
import { ActionGroup, type ActionItem } from "./ActionGroup";

type SectionHeaderProps = {
  eyebrow?: string;
  name?: string;
  title: string;
  lead?: string;
  body?: string;
  actions?: ActionItem[];
};

export function SectionHeader({
  eyebrow,
  name,
  title,
  lead,
  body,
  actions,
}: SectionHeaderProps) {
  return (
    <Stack gap="var(--space-4)">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      {name ? (
        <Text muted style={{ letterSpacing: "-0.01em" }}>
          {name}
        </Text>
      ) : null}
      <Heading level={1}>{title}</Heading>
      {lead ? (
        <Heading
          level={3}
          weight="semibold"
          style={{ color: "var(--color-text-muted)" }}
        >
          {lead}
        </Heading>
      ) : null}
      {body ? <Text>{body}</Text> : null}
      {actions && actions.length ? <ActionGroup actions={actions} /> : null}
    </Stack>
  );
}
