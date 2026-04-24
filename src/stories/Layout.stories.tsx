import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Inline } from "@/components/ui/Inline";
import { Cluster } from "@/components/ui/Cluster";
import { Grid } from "@/components/ui/Grid";
import { Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";

const meta: Meta = {
  title: "Foundations/Layout",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const ContainerAndStack: Story = {
  render: () => (
    <Container>
      <Stack gap="var(--space-4)">
        <Text kind="bodyLarge" weight="semibold">
          Layout primitives in context
        </Text>
        <Inline gap="3" wrap>
          <Card density="sm">Card A</Card>
          <Card density="sm">Card B</Card>
          <Card density="sm">Card C</Card>
        </Inline>
      </Stack>
    </Container>
  ),
};

export const GridAndCluster: Story = {
  render: () => (
    <Container>
      <Stack gap="var(--space-4)">
        <Text kind="meta">Responsive grid with cluster actions</Text>
        <Grid columns="auto-fit" minItemWidth="260" gap="4">
          <Card>
            <Stack gap="var(--space-3)">
              <Text kind="bodyLarge" weight="semibold">
                Card One
              </Text>
              <Text kind="bodySmall" tone="muted">
                Shared layout primitives keep spacing and grouping predictable.
              </Text>
              <Cluster gap="2" align="center">
                <Card density="sm">Tag A</Card>
                <Card density="sm">Tag B</Card>
              </Cluster>
            </Stack>
          </Card>
          <Card>
            <Stack gap="var(--space-3)">
              <Text kind="bodyLarge" weight="semibold">
                Card Two
              </Text>
              <Text kind="bodySmall" tone="muted">
                Use container, stack, inline, cluster, and grid as baseline
                composition tools.
              </Text>
              <Cluster gap="2" align="center">
                <Card density="sm">Tag C</Card>
                <Card density="sm">Tag D</Card>
              </Cluster>
            </Stack>
          </Card>
        </Grid>
      </Stack>
    </Container>
  ),
};
