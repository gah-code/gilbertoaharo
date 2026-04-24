import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Heading";
import { Stack } from "./Stack";

const meta: Meta<typeof Heading> = {
  title: "UI/Heading",
  component: Heading,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Levels: Story = {
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

export const Variants: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      <Heading level={2} tone="default" weight="bold">
        Bold default
      </Heading>
      <Heading level={3} tone="muted" weight="semibold">
        Semibold muted
      </Heading>
      <Heading level={4} size="xl" weight="regular">
        Custom size override
      </Heading>
    </Stack>
  ),
};
