import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Stack } from "@/components/ui/Stack";
import { Text } from "@/components/ui/Text";

const meta: Meta = {
  title: "Foundations/Typography",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const RoleScale: Story = {
  render: () => (
    <Container>
      <Stack gap="var(--space-4)">
        <Text kind="eyebrow">Eyebrow</Text>
        <Heading level={1} size="display">
          Display heading
        </Heading>
        <Heading level={2}>Section heading</Heading>
        <Text kind="bodyLarge">
          Body large text for lead paragraphs and short intros.
        </Text>
        <Text kind="body">
          Body text for primary content and supporting explanations.
        </Text>
        <Text kind="meta">
          Meta text for bylines, secondary labels, and UI support copy.
        </Text>
        <Text kind="caption">
          Caption text for asset notes and compact helper messaging.
        </Text>
      </Stack>
    </Container>
  ),
};

export const HeadingAndTextInContext: Story = {
  render: () => (
    <Container>
      <Stack gap="var(--space-3)">
        <Heading level={2}>Design System Contract Guidance</Heading>
        <Text kind="body">
          Route-level pages own content and composition. Primitives own reusable
          text and heading rhythm through stable contracts and tokenized roles.
        </Text>
        <Text kind="meta">
          Recommended line length: 62ch to 68ch for long-form reading surfaces.
        </Text>
      </Stack>
    </Container>
  ),
};
