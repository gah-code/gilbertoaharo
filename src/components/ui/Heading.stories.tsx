import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "UI/Heading",
  component: Heading,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Heading defines structural hierarchy and visual weight. Prefer semantic levels first, then use size/tone overrides only when needed.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Hierarchy: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      <Heading level={1} size="display">
        Display heading
      </Heading>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </Stack>
  ),
};

export const ToneAndWeightOverrides: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      <Heading level={2} tone="default" weight="bold">
        Bold default tone
      </Heading>
      <Heading level={3} tone="muted" weight="semibold">
        Semibold muted tone
      </Heading>
      <Heading level={4} size="xl" weight="regular" tracking="normal">
        Custom size and weight override
      </Heading>
    </Stack>
  ),
};

export const SectionHeaderPattern: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Typical section-header pairing of eyebrow label, heading, and muted intro copy.",
      },
    },
  },
  render: () => (
    <Stack gap="var(--space-3)" style={{ maxWidth: "62ch" }}>
      <Text kind="eyebrow">Projects</Text>
      <Heading level={2}>Selected work and architecture decisions</Heading>
      <Text kind="body" tone="muted">
        Keep heading hierarchy structural and let supporting copy carry context.
      </Text>
    </Stack>
  ),
};
