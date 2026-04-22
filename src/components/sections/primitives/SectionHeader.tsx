import React from "react";
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
      {eyebrow ? (
        <Text
          as="div"
          className="section-header__eyebrow"
          size="sm"
          weight="semibold"
          tracking="tight"
        >
          {eyebrow}
        </Text>
      ) : null}
      {name ? (
        <Text as="div" tone="muted" tracking="tight" className="section-header__name">
          {name}
        </Text>
      ) : null}
      <Heading level={1} className="section-header__title">
        {title}
      </Heading>
      {lead ? (
        <Text
          as="p"
          size="lg"
          weight="medium"
          className="section-header__lead"
        >
          {lead}
        </Text>
      ) : null}
      {body ? <Text tone="muted" className="section-header__body">{body}</Text> : null}
      {actions && actions.length ? <ActionGroup actions={actions} /> : null}
    </Stack>
  );
}
