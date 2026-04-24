import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Heading";
import { Link } from "./Link";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { Grid } from "./Grid";
import { Card } from "./Card";

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
  parameters: {
    docs: {
      description: {
        component:
          "Card is the default surface container for grouped content. Use variants and density deliberately instead of ad hoc card styling.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {};

export const SurfaceVariants: Story = {
  render: () => (
    <Grid columns="auto-fit" minItemWidth="260" gap="4">
      <Card variant="default">
        <Stack gap="var(--space-2)">
          <Heading level={4}>Default surface</Heading>
          <Text kind="bodySmall" tone="muted">
            Standard card treatment for most content blocks.
          </Text>
        </Stack>
      </Card>
      <Card variant="subtle">
        <Stack gap="var(--space-2)">
          <Heading level={4}>Subtle surface</Heading>
          <Text kind="bodySmall" tone="muted">
            Lower-emphasis nested containers.
          </Text>
        </Stack>
      </Card>
      <Card variant="elevated">
        <Stack gap="var(--space-2)">
          <Heading level={4}>Elevated surface</Heading>
          <Text kind="bodySmall" tone="muted">
            Highlighted or high-priority content.
          </Text>
        </Stack>
      </Card>
    </Grid>
  ),
};

export const DensityReference: Story = {
  render: () => (
    <Grid columns="auto-fit" minItemWidth="260" gap="4">
      <Card density="sm">
        <Text kind="bodySmall">Small density (`sm`) for compact metadata cards.</Text>
      </Card>
      <Card density="md">
        <Text kind="bodySmall">Medium density (`md`) for default content cards.</Text>
      </Card>
      <Card density="lg">
        <Text kind="bodySmall">Large density (`lg`) for spacious feature cards.</Text>
      </Card>
    </Grid>
  ),
};

export const InteractivePattern: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Interactive cards should contain a focusable child (for example a Link) so keyboard users receive the focus-within treatment.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: "34rem" }}>
      <Card interactive>
        <Stack gap="var(--space-3)">
          <Heading level={3}>Interactive card with link</Heading>
          <Text kind="bodySmall" tone="muted">
            Hover to preview motion. Tab to the link to verify focus-visible and focus-within states.
          </Text>
          <Link href="/articles/storybook-productization">Open design-system article</Link>
        </Stack>
      </Card>
    </div>
  ),
};
