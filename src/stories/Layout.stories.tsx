import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Cluster } from "@/components/ui/Cluster";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Inline } from "@/components/ui/Inline";
import { Stack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";
import { Heading } from "@/components/ui/Heading";

const meta: Meta = {
  title: "Foundations/Layout",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Layout-system examples using Container, Stack, Inline, Cluster, and Grid in realistic composition patterns.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const SectionRhythm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Section-level rhythm example: heading hierarchy, readable intro width, and action grouping with consistent stack spacing.",
      },
    },
  },
  render: () => (
    <Container>
      <Stack gap="var(--space-8)">
        <Card>
          <Stack gap="var(--space-4)">
            <Text kind="eyebrow">Foundation pattern</Text>
            <Heading level={2}>Section rhythm and reading flow</Heading>
            <Text kind="bodyLarge" tone="muted">
              Use stack spacing as the primary rhythm mechanism. Keep lead copy readable, then group actions and metadata with inline and cluster primitives.
            </Text>
            <Inline gap="3" wrap>
              <Button>Primary action</Button>
              <Button variant="secondary">Secondary action</Button>
              <Button variant="text">Learn more</Button>
            </Inline>
            <Cluster gap="2" align="center">
              <Text kind="meta">Role: Design system</Text>
              <Text kind="meta">Owner: Frontend</Text>
              <Text kind="meta">State: Stable</Text>
            </Cluster>
          </Stack>
        </Card>

        <Card variant="subtle">
          <Stack gap="var(--space-3)">
            <Heading level={3}>Supporting block</Heading>
            <Text kind="bodySmall" tone="muted">
              Secondary containers should reduce visual emphasis while preserving spacing consistency.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  ),
};

export const ResponsiveGridComposition: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Responsive card-grid composition with consistent internal spacing and tag/action grouping.",
      },
    },
  },
  render: () => (
    <Container>
      <Stack gap="var(--space-4)">
        <Text kind="meta">Responsive grid composition</Text>
        <Grid columns="auto-fit" minItemWidth="260" gap="4">
          {["Contract clarity", "Migration safety", "Delivery quality"].map((title) => (
            <Card key={title}>
              <Stack gap="var(--space-3)">
                <Heading level={3}>{title}</Heading>
                <Text kind="bodySmall" tone="muted">
                  Align reusable primitives and spacing rules so section-level implementation stays predictable.
                </Text>
                <Cluster gap="2" align="center">
                  <Text kind="caption">TypeScript</Text>
                  <Text kind="caption">Storybook</Text>
                  <Text kind="caption">Accessibility</Text>
                </Cluster>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Container>
  ),
};
