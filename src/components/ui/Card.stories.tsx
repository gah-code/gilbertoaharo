import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Stack } from "./Stack";
import { Heading } from "./Heading";
import { Text } from "./Text";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    children: (
      <Stack gap="var(--space-2)">
        <Heading level={4}>Card title</Heading>
        <Text tone="muted">Card content and summary text.</Text>
      </Stack>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    density: "lg",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
  },
};
