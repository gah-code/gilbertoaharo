import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text provides role-oriented copy styles. Prefer `kind` presets first, then apply explicit overrides only when needed.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const KindReference: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      <Text kind="bodyLarge">Body large text for intro and lead copy.</Text>
      <Text kind="body">Body text for primary readable content.</Text>
      <Text kind="bodySmall">Body small text for compact support copy.</Text>
      <Text kind="meta">Meta text for bylines and secondary labels.</Text>
      <Text kind="eyebrow">Eyebrow label</Text>
      <Text kind="caption">Caption text for helper context.</Text>
    </Stack>
  ),
};

export const ReadingRhythm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Canonical long-form text rhythm: lead paragraph, body copy, and metadata supporting row.",
      },
    },
  },
  render: () => (
    <Stack gap="var(--space-3)" style={{ maxWidth: "68ch" }}>
      <Text kind="bodyLarge">
        Storybook should make text hierarchy predictable, especially when sections blend short marketing copy with long-form editorial notes.
      </Text>
      <Text kind="body">
        Use body roles consistently before introducing one-off size overrides. This keeps visual rhythm stable across sections and route surfaces.
      </Text>
      <Text kind="meta">Updated April 2026 · Design system reference</Text>
    </Stack>
  ),
};

export const ExplicitOverrides: Story = {
  render: () => (
    <Stack gap="var(--space-2)">
      <Text kind="body" weight="semibold">
        Semibold body override
      </Text>
      <Text kind="meta" tone="default">
        Meta kind with default tone override
      </Text>
      <Text kind="caption" tracking="tight">
        Caption with tighter tracking
      </Text>
    </Stack>
  ),
};
