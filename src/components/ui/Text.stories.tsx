import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";
import { Stack } from "./Stack";

const meta: Meta<typeof Text> = {
  title: "UI/Text",
  component: Text,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Scales: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      <Text size="lg">Large text content</Text>
      <Text size="md">Body text content</Text>
      <Text size="sm" tone="muted">
        Supporting caption text
      </Text>
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <Stack gap="var(--space-2)">
      <Text weight="regular">Regular</Text>
      <Text weight="medium">Medium</Text>
      <Text weight="semibold">Semibold</Text>
    </Stack>
  ),
};
