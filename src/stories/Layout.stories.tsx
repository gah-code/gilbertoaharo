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
      <Stack gap="var(--section-content-gap)">
        <Card density="lg">
          <Stack gap="var(--card-flow-gap)">
            <Stack gap="var(--section-header-gap)" style={{ maxWidth: "var(--lede-max)" }}>
              <Text kind="eyebrow">Foundation pattern</Text>
              <Heading level={2}>Section rhythm and reading flow</Heading>
              <Text kind="bodyLarge" tone="muted">
                Use stack spacing as the primary rhythm mechanism. Keep lead copy readable, then group actions and metadata with inline and cluster primitives.
              </Text>
            </Stack>
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
          <Stack gap="var(--card-flow-gap-tight)">
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
      <Stack gap="var(--section-header-gap)">
        <Text kind="meta">Responsive grid composition</Text>
        <Grid columns="auto-fit" minItemWidth="260" gap="4">
          {["Contract clarity", "Migration safety", "Delivery quality"].map((title) => (
            <Card key={title}>
              <Stack gap="var(--card-flow-gap)">
                <Heading level={3}>{title}</Heading>
                <Text kind="bodySmall" tone="muted">
                  Align reusable primitives and spacing rules so section-level implementation stays predictable.
                </Text>
                <Cluster gap="2" align="center">
                  <Text kind="caption">TypeScript</Text>
                  <Text kind="caption">Storybook</Text>
                  <Text kind="caption">Accessibility</Text>
                </Cluster>
                <Inline gap="2" wrap>
                  <Button size="sm">Primary</Button>
                  <Button size="sm" variant="secondary">
                    Secondary
                  </Button>
                </Inline>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Container>
  ),
};

export const MaxWidthAndActionRhythm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Readable measure guidance: keep intro text near `--lede-max`, allow body text up to `--measure-body`, and keep wrapped CTA rows evenly spaced.",
      },
    },
  },
  render: () => (
    <Container>
      <Stack gap="var(--section-content-gap)">
        <Stack gap="var(--section-header-gap)" style={{ maxWidth: "var(--lede-max)" }}>
          <Text kind="eyebrow">Measure and actions</Text>
          <Heading level={2}>Max-width and CTA rhythm</Heading>
          <Text kind="bodyLarge" tone="muted">
            Intro copy should remain concise and readable. This block uses the lede measure to keep section headers scannable.
          </Text>
        </Stack>
        <div style={{ maxWidth: "var(--measure-body)" }}>
          <Text kind="body">
            Supporting body copy may run slightly wider, but should still stay inside a predictable readable measure. Treat call-to-action groups as one rhythm unit with consistent wrap spacing.
          </Text>
        </div>
        <Cluster gap="3" align="center">
          <Button>Primary CTA</Button>
          <Button variant="secondary">Secondary CTA</Button>
          <Button variant="text">Tertiary action</Button>
        </Cluster>
      </Stack>
    </Container>
  ),
};
