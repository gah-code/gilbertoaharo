import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "@/components/ui/Grid";
import { Text } from "@/components/ui/Text";

const meta: Meta = {
  title: "Foundations/Tokens",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

const swatches = [
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
      {swatches.map(([token, label]) => (
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
