import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cluster } from "./Cluster";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Primary action",
    variant: "primary",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Use Button for action-oriented controls. Prefer Link for inline navigation text and reserve `text` variant for low-emphasis secondary actions.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const CanonicalVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Primary, secondary, and text variants in a canonical action group.",
      },
    },
  },
  render: () => (
    <Cluster gap="3" align="center">
      <Button variant="primary">Save changes</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="text">Cancel</Button>
    </Cluster>
  ),
};

export const SizeReference: Story = {
  render: () => (
    <Cluster gap="3" align="center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </Cluster>
  ),
};

export const LinkAndDisabledStates: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      <Text kind="meta">Button can render as a link while preserving button variants.</Text>
      <Cluster gap="3" align="center">
        <Button href="/articles/storybook-productization">Read article</Button>
        <Button href="https://example.com" variant="secondary">
          External docs
        </Button>
      </Cluster>
      <Cluster gap="3" align="center">
        <Button disabled>Disabled button</Button>
        <Button href="/articles/disabled" disabled>
          Disabled button link
        </Button>
      </Cluster>
    </Stack>
  ),
};
