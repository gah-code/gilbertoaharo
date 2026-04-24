import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Card } from "./Card";
import { Cluster } from "./Cluster";
import { Container } from "./Container";
import { Grid } from "./Grid";
import { Heading } from "./Heading";
import { Inline } from "./Inline";
import { Stack } from "./Stack";
import { Text } from "./Text";

const meta: Meta = {
  title: "UI/Layout Primitives",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical usage of Container, Stack, Inline, Cluster, and Grid primitives. Keep layout behavior reusable here and avoid one-off section-specific layout utilities.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ContainerAndStackFlow: Story = {
  render: () => (
    <Container>
      <Stack gap="var(--space-6)">
        <Stack gap="var(--space-3)">
          <Text kind="eyebrow">Layout primitives</Text>
          <Heading level={2}>Page scaffold</Heading>
          <Text kind="body" tone="muted">
            Container sets readable width while Stack defines vertical rhythm.
          </Text>
        </Stack>

        <Card>
          <Stack gap="var(--space-3)">
            <Heading level={3}>Action group</Heading>
            <Inline gap="3" wrap>
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
              <Button variant="text">Tertiary action</Button>
            </Inline>
          </Stack>
        </Card>
      </Stack>
    </Container>
  ),
};

export const InlineAndClusterReference: Story = {
  render: () => (
    <Stack gap="var(--space-4)">
      <div>
        <div style={{ marginBottom: "var(--space-2)" }}>
          <Text kind="meta">Inline: short horizontal action rows</Text>
        </div>
        <Inline gap="3" align="center" wrap>
          <Button size="sm">One</Button>
          <Button size="sm" variant="secondary">
            Two
          </Button>
          <Button size="sm" variant="text">
            Three
          </Button>
        </Inline>
      </div>

      <div>
        <div style={{ marginBottom: "var(--space-2)" }}>
          <Text kind="meta">Cluster: wrapping chip/tag groups</Text>
        </div>
        <Cluster gap="2" align="center">
          <Card density="sm">TypeScript</Card>
          <Card density="sm">Storybook</Card>
          <Card density="sm">Accessibility</Card>
          <Card density="sm">Governance</Card>
        </Cluster>
      </div>
    </Stack>
  ),
};

export const GridComposition: Story = {
  render: () => (
    <Grid columns="auto-fit" minItemWidth="260" gap="4">
      {["Contracts", "States", "Docs"].map((item) => (
        <Card key={item}>
          <Stack gap="var(--space-2)">
            <Heading level={4}>{item}</Heading>
            <Text kind="bodySmall" tone="muted">
              Reusable layout primitives help sections remain consistent and easier to maintain.
            </Text>
          </Stack>
        </Card>
      ))}
    </Grid>
  ),
};
