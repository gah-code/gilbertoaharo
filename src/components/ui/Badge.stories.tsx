import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cluster } from "./Cluster";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge communicates compact status or taxonomy labels. Keep labels short and avoid using badges for long-form content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const ToneReference: Story = {
  render: () => (
    <Cluster gap="2" align="center">
      <Badge tone="default">Default</Badge>
      <Badge tone="muted">Muted</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
    </Cluster>
  ),
};

export const SizeReference: Story = {
  render: () => (
    <Cluster gap="2" align="center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </Cluster>
  ),
};

export const MetadataContext: Story = {
  render: () => (
    <Stack gap="var(--space-2)">
      <Text kind="meta">Release status</Text>
      <Cluster gap="2" align="center">
        <Badge tone="success" size="sm">
          Stable
        </Badge>
        <Badge tone="muted" size="sm">
          UI Contract
        </Badge>
        <Badge tone="default" size="sm">
          Storybook
        </Badge>
      </Cluster>
    </Stack>
  ),
};
