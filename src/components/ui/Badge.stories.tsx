import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import { Cluster } from "./Cluster";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Tones: Story = {
  render: () => (
    <Cluster gap="2" align="center">
      <Badge tone="default">Default</Badge>
      <Badge tone="muted">Muted</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
    </Cluster>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Cluster gap="2" align="center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </Cluster>
  ),
};
