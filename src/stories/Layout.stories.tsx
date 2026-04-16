import type { Meta, StoryObj } from "@storybook/react-vite";
import { Container } from "@/components/ui/Container";
import { Stack } from "@/components/ui/Stack";
import { Inline } from "@/components/ui/Inline";
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
        <Text size="lg" weight="semibold">
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
