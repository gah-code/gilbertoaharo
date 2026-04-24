import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { Cluster } from "./Cluster";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "/articles/storybook-productization",
    children: "Read more",
    variant: "default",
  },
  parameters: {
    docs: {
      description: {
        component:
          "Use Link for navigation and inline text links. External link safety (`target`/`rel`) is applied automatically when needed.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {};

export const InlineContentPattern: Story = {
  parameters: {
    docs: {
      description: {
        story: "Canonical inline usage for editorial body copy and supporting links.",
      },
    },
  },
  render: () => (
    <Stack gap="var(--space-3)" style={{ maxWidth: "62ch" }}>
      <Text kind="body">
        Storybook documentation should communicate how components are intended to be used. Start with the
        <Link href="/articles/storybook-productization"> productization guidance </Link>
        and keep examples grounded in real workflow context.
      </Text>
      <Text kind="meta">
        Supporting reference: <Link href="/articles/foundation-contracts" variant="muted">foundation contracts</Link>
      </Text>
    </Stack>
  ),
};

export const VariantAndSizeReference: Story = {
  render: () => (
    <Stack gap="var(--space-3)">
      <Cluster gap="3" align="center">
        <Link href="/articles/default-link" variant="default">
          Default
        </Link>
        <Link href="/articles/muted-link" variant="muted">
          Muted
        </Link>
        <Link href="/articles/unstyled-link" variant="unstyled">
          Unstyled
        </Link>
      </Cluster>
      <Cluster gap="3" align="center">
        <Link href="/articles/sm-link" size="sm">
          Small
        </Link>
        <Link href="/articles/md-link" size="md">
          Medium
        </Link>
        <Link href="/articles/lg-link" size="lg">
          Large
        </Link>
      </Cluster>
    </Stack>
  ),
};

export const ExternalAndDisabled: Story = {
  render: () => (
    <Cluster gap="3" align="center">
      <Link href="https://example.com/docs">External docs</Link>
      <Link href="/articles/disabled" disabled>
        Disabled link
      </Link>
    </Cluster>
  ),
};
