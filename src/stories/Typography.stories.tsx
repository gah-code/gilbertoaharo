import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Stack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

const meta: Meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Typography role guidance for heading hierarchy, readable body text, and metadata roles used across sections and pages.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const RoleReference: Story = {
  render: () => (
    <Container>
      <Stack gap="var(--space-4)">
        <Text kind="eyebrow">Eyebrow</Text>
        <Heading level={1} size="display">
          Display heading
        </Heading>
        <Heading level={2}>Section heading</Heading>
        <Heading level={3}>Subsection heading</Heading>
        <Text kind="bodyLarge">
          Body large text for lead paragraphs and short introductions.
        </Text>
        <Text kind="body">Body text for primary content blocks.</Text>
        <Text kind="bodySmall" tone="muted">
          Body small text for compact supporting context.
        </Text>
        <Text kind="meta">Meta text for bylines and secondary labels.</Text>
        <Text kind="caption">Caption text for asset notes and helper copy.</Text>
      </Stack>
    </Container>
  ),
};

export const ArticleLeadPattern: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Canonical long-form pattern: eyebrow, heading, lead paragraph, supporting body, and metadata row.",
      },
    },
  },
  render: () => (
    <Container>
      <Stack gap="var(--space-3)" style={{ maxWidth: "68ch" }}>
        <Text kind="eyebrow">Frontend Systems</Text>
        <Heading level={2}>Making design-system stories operational, not decorative</Heading>
        <Text kind="bodyLarge">
          Storybook should encode usage contracts and expected behavior, not only visual snapshots.
        </Text>
        <Text kind="body">
          Strong stories reduce ambiguity in implementation reviews by showing intended composition patterns, interaction states, and fallback handling.
        </Text>
        <Text kind="meta">Updated April 2026 · 6 min read</Text>
      </Stack>
    </Container>
  ),
};

export const SectionHeaderPattern: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Section-shell header pattern pairing eyebrow, heading, and muted intro body copy.",
      },
    },
  },
  render: () => (
    <Container>
      <Stack gap="var(--space-3)" style={{ maxWidth: "62ch" }}>
        <Text kind="eyebrow">Capabilities</Text>
        <Heading level={2}>Component contracts and implementation guardrails</Heading>
        <Text kind="body" tone="muted">
          Keep section copy readable and concise. Reserve heavier typography for intent shifts, not decorative contrast.
        </Text>
      </Stack>
    </Container>
  ),
};
