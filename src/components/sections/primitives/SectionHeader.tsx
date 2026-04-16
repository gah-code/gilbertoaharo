import React from "react";
import { Badge } from "../../ui/Badge";
import { Heading } from "../../ui/Heading";
import { Text } from "../../ui/Text";
import { Stack } from "../../ui/Stack";
import { ActionGroup, type ActionItem } from "./ActionGroup";
import "./SectionHeader.css";

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
    <Stack className="section-header" gap="var(--space-4)">
      {eyebrow ? <Badge className="section-header__eyebrow">{eyebrow}</Badge> : null}
      {name ? (
        <Text tone="muted" tracking="tight" className="section-header__name">
          {name}
        </Text>
      ) : null}
      <Heading level={1} className="section-header__title">
        {title}
      </Heading>
      {lead ? (
        <Heading level={3} weight="semibold" tone="muted" className="section-header__lead">
          {lead}
        </Heading>
      ) : null}
      {body ? <Text className="section-header__body">{body}</Text> : null}
      {actions && actions.length ? <ActionGroup actions={actions} /> : null}
    </Stack>
  );
}
