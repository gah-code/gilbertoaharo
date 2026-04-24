import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "@/components/ui/Grid";
import { Text } from "@/components/ui/Text";
import { Stack } from "@/components/ui/Stack";

const meta: Meta = {
  title: "Foundations/Tokens",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const colorSwatches = [
  ["--color-bg", "Background"],
  ["--color-surface", "Surface"],
  ["--color-surface-2", "Surface 2"],
  ["--color-accent", "Accent"],
  ["--color-text", "Text"],
  ["--color-text-muted", "Muted Text"],
];

export const ColorTokens: Story = {
  render: () => (
    <Grid columns="auto-fit" minItemWidth="220" gap="4">
      {colorSwatches.map(([token, label]) => (
        <div key={token}>
          <div
            style={{
              height: "88px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border-subtle)",
              background: `var(${token})`,
              marginBottom: "var(--space-2)",
            }}
          />
          <Text size="sm" weight="semibold">
            {label}
          </Text>
          <Text size="sm" tone="muted">
            {token}
          </Text>
        </div>
      ))}
    </Grid>
  ),
};

const typeTokens = [
  ["--font-size-display", "Display"],
  ["--font-size-heading-1", "Heading 1"],
  ["--font-size-heading-2", "Heading 2"],
  ["--font-size-heading-3", "Heading 3"],
  ["--font-size-body-lg", "Body Large"],
  ["--font-size-body-md", "Body"],
  ["--font-size-body-sm", "Body Small"],
  ["--font-size-caption", "Caption"],
];

export const TypographyTokens: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      {typeTokens.map(([token, label]) => (
        <div key={token}>
          <div
            style={{
              fontSize: `var(${token})`,
              lineHeight: "var(--line-height-body)",
            }}
          >
            {label} sample
          </div>
          <Text kind="meta">{token}</Text>
        </div>
      ))}
    </Stack>
  ),
};

const spacingTokens = [
  "--space-1",
  "--space-2",
  "--space-3",
  "--space-4",
  "--space-6",
  "--space-8",
  "--space-10",
  "--space-12",
  "--space-16",
];

export const SpacingAndShapeTokens: Story = {
  render: () => (
    <Stack gap="var(--space-4)">
      <Text kind="meta">Spacing scale</Text>
      {spacingTokens.map((token) => (
        <div key={token}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <div
              style={{
                width: `var(${token})`,
                height: "12px",
                background: "var(--color-accent-soft)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-sm)",
              }}
            />
            <Text size="sm">{token}</Text>
          </div>
        </div>
      ))}
      <Text kind="meta">Radius and shadow tokens</Text>
      <div style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
        <div
          style={{
            width: "120px",
            height: "64px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-border-subtle)",
            background: "var(--color-surface)",
          }}
        />
        <div
          style={{
            width: "120px",
            height: "64px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border-subtle)",
            background: "var(--color-surface)",
          }}
        />
        <div
          style={{
            width: "120px",
            height: "64px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border-subtle)",
            background: "var(--color-surface)",
            boxShadow: "var(--shadow-soft)",
          }}
        />
      </div>
    </Stack>
  ),
};
