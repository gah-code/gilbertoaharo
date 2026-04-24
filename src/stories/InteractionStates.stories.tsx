import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Cluster } from "@/components/ui/Cluster";
import { Heading } from "@/components/ui/Heading";
import { Link } from "@/components/ui/Link";
import { Stack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

const meta: Meta = {
  title: "Foundations/Interaction States",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Interaction-state expectations for primitives: hover, focus-visible, disabled, and reduced-motion-safe behavior.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ButtonAndLinkStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Use keyboard Tab to inspect focus-visible rings. Hover and active behavior should follow motion tokens and respect reduced-motion preferences.",
      },
    },
  },
  render: () => (
    <Stack gap="var(--space-4)">
      <Text kind="meta">
        Keyboard check: press Tab through each element and verify focus rings are visible and stable.
      </Text>
      <Cluster gap="3" align="center">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="text">Text CTA</Button>
      </Cluster>
      <Cluster gap="3" align="center">
        <Button disabled>Disabled button</Button>
        <Button href="/articles/interaction-state-notes">Button link</Button>
        <Button href="/articles/disabled" disabled>
          Disabled button link
        </Button>
      </Cluster>
      <Cluster gap="3" align="center">
        <Link href="/articles/interaction-state-notes">Default link</Link>
        <Link href="/articles/interaction-state-notes" variant="muted">
          Muted link
        </Link>
        <Link href="https://example.com">External link</Link>
        <Link href="/articles/disabled" disabled>
          Disabled link
        </Link>
      </Cluster>
    </Stack>
  ),
};

export const InteractiveCardFocusWithin: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Interactive cards should communicate hover intent and show a focus-visible ring when inner links receive keyboard focus.",
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: "32rem" }}>
      <Card interactive>
        <Stack gap="var(--space-3)">
          <Heading level={3}>Interactive card pattern</Heading>
          <Text kind="bodySmall" tone="muted">
            Hover the card to review motion feedback, then tab to the link to verify focus-within treatment.
          </Text>
          <Link href="/articles/storybook-productization">Open supporting article</Link>
        </Stack>
      </Card>
    </div>
  ),
};
