import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "@/components/ui/Grid";
import { Stack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

type ColorToken = {
  token: string;
  label: string;
  note: string;
};

type ColorGroup = {
  title: string;
  description: string;
  tokens: ColorToken[];
};

const meta: Meta = {
  title: "Foundations/Tokens",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Foundation token reference for semantic color, typography, spacing, shape, and motion tokens. Use this as the first stop before adjusting component-level styles.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const colorGroups: ColorGroup[] = [
  {
    title: "Surfaces",
    description: "Canvas and surface layers used for page and card hierarchy.",
    tokens: [
      { token: "--color-bg", label: "Canvas", note: "Page-level background" },
      {
        token: "--color-surface",
        label: "Primary surface",
        note: "Default card and section surface",
      },
      {
        token: "--color-surface-2",
        label: "Secondary surface",
        note: "Nested or low-emphasis container",
      },
    ],
  },
  {
    title: "Text and border",
    description: "Readable text and boundary tokens.",
    tokens: [
      { token: "--color-text", label: "Primary text", note: "Main reading color" },
      {
        token: "--color-text-muted",
        label: "Muted text",
        note: "Supporting and metadata copy",
      },
      {
        token: "--color-border-subtle",
        label: "Subtle border",
        note: "Hairline dividers and soft boundaries",
      },
    ],
  },
  {
    title: "Interaction accent",
    description: "Primary interaction and focus tokens.",
    tokens: [
      { token: "--color-accent", label: "Accent", note: "Primary interactive color" },
      {
        token: "--color-accent-hover",
        label: "Accent hover",
        note: "Hover state for accent interactions",
      },
      {
        token: "--color-focus-ring",
        label: "Focus ring",
        note: "Keyboard focus-visible indicator",
      },
    ],
  },
];

const stateTokens: Array<{ label: string; bg: string; border: string; text: string }> = [
  {
    label: "Success",
    bg: "--color-success-bg",
    border: "--color-success-border",
    text: "--color-success-text",
  },
  {
    label: "Warning",
    bg: "--color-warn-bg",
    border: "--color-warn-border",
    text: "--color-warn-text",
  },
  {
    label: "Error",
    bg: "--color-error-bg",
    border: "--color-error-border",
    text: "--color-error-text",
  },
];

function renderColorGroup(group: ColorGroup) {
  return (
    <div key={group.title}>
      <Text kind="bodyLarge" weight="semibold">
        {group.title}
      </Text>
      <div style={{ marginTop: "var(--space-1)", marginBottom: "var(--space-3)" }}>
        <Text kind="meta">{group.description}</Text>
      </div>
      <Grid columns="auto-fit" minItemWidth="220" gap="3">
        {group.tokens.map((token) => (
          <div
            key={token.token}
            style={{
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-md)",
              background: "var(--color-surface)",
              padding: "var(--space-3)",
            }}
          >
            <div
              style={{
                height: "72px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border-subtle)",
                background: `var(${token.token})`,
                marginBottom: "var(--space-2)",
              }}
            />
            <Text size="sm" weight="semibold">
              {token.label}
            </Text>
            <Text size="sm" tone="muted">
              {token.token}
            </Text>
            <div style={{ marginTop: "var(--space-1)" }}>
              <Text kind="caption">{token.note}</Text>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export const SemanticColorSystem: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Grouped semantic colors used by the design system. Treat this as a usage map rather than a full palette dump.",
      },
    },
  },
  render: () => <Stack gap="var(--space-8)">{colorGroups.map(renderColorGroup)}</Stack>,
};

export const SurfaceUsage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Reference for canvas, primary surface, and secondary surface layering with readable text contrast.",
      },
    },
  },
  render: () => (
    <div
      style={{
        background: "var(--color-bg)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-6)",
      }}
    >
      <Stack gap="var(--space-4)">
        <Text kind="eyebrow">Canvas</Text>
        <Text kind="body" tone="muted">
          `--color-bg` should frame the page while content lives on surface tokens.
        </Text>
        <div
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border-subtle)",
            borderRadius: "var(--radius-md)",
            padding: "var(--space-4)",
          }}
        >
          <Stack gap="var(--space-2)">
            <Text kind="meta">Primary surface (`--color-surface`)</Text>
            <Text kind="body">
              Use this for cards, contained content blocks, and base section panels.
            </Text>
            <div
              style={{
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "var(--space-3)",
              }}
            >
              <Text kind="caption">
                Secondary surface (`--color-surface-2`) is reserved for nested, lower-emphasis containers.
              </Text>
            </div>
          </Stack>
        </div>
      </Stack>
    </div>
  ),
};

const typographyTokens = [
  ["--font-size-display", "Display"],
  ["--font-size-heading-1", "Heading 1"],
  ["--font-size-heading-2", "Heading 2"],
  ["--font-size-heading-3", "Heading 3"],
  ["--font-size-body-lg", "Body Large"],
  ["--font-size-body-md", "Body"],
  ["--font-size-body-sm", "Body Small"],
  ["--font-size-caption", "Caption"],
] as const;

export const TypographyScaleTokens: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      {typographyTokens.map(([token, label]) => (
        <div key={token}>
          <div style={{ fontSize: `var(${token})`, lineHeight: "var(--line-height-body)" }}>
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
  "--space-5",
  "--space-6",
  "--space-8",
  "--space-10",
  "--space-12",
  "--space-16",
] as const;

export const SpacingShapeAndMotion: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Spacing, radius, shadow, and motion tokens used by primitive interaction states and layout rhythm.",
      },
    },
  },
  render: () => (
    <Stack gap="var(--space-6)">
      <div>
        <div style={{ marginBottom: "var(--space-2)" }}>
          <Text kind="meta">Spacing scale</Text>
        </div>
        <Stack gap="var(--space-2)">
          {spacingTokens.map((token) => (
            <div key={token} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <div
                style={{
                  width: `var(${token})`,
                  height: "12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border-subtle)",
                  background: "var(--color-accent-soft)",
                }}
              />
              <Text size="sm">{token}</Text>
            </div>
          ))}
        </Stack>
      </div>

      <div>
        <div style={{ marginBottom: "var(--space-2)" }}>
          <Text kind="meta">Shape and elevation</Text>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)" }}>
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
      </div>

      <div>
        <div style={{ marginBottom: "var(--space-2)" }}>
          <Text kind="meta">Interaction and motion</Text>
        </div>
        <Stack gap="var(--space-1)">
          <Text size="sm">`--motion-duration-fast`: hover/focus micro-transitions.</Text>
          <Text size="sm">`--motion-duration-base`: standard component transitions.</Text>
          <Text size="sm">
            `--motion-ease-standard`: default easing curve for button, link, and card interactions.
          </Text>
        </Stack>
      </div>

      <div>
        <div style={{ marginBottom: "var(--space-2)" }}>
          <Text kind="meta">Semantic state set</Text>
        </div>
        <Grid columns="auto-fit" minItemWidth="220" gap="3">
          {stateTokens.map((state) => (
            <div
              key={state.label}
              style={{
                borderRadius: "var(--radius-md)",
                border: `1px solid var(${state.border})`,
                background: `var(${state.bg})`,
                color: `var(${state.text})`,
                padding: "var(--space-3)",
              }}
            >
              <Text weight="semibold">{state.label}</Text>
              <div style={{ color: `var(${state.text})`, marginTop: "var(--space-1)" }}>
                <Text kind="caption">
                  Text/background/border tokens are intended to travel together for alerts and status surfaces.
                </Text>
              </div>
            </div>
          ))}
        </Grid>
      </div>
    </Stack>
  ),
};
