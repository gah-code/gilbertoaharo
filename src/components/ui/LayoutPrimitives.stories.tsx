import type { Meta, StoryObj } from "@storybook/react-vite";
import { Inline } from "./Inline";
import { Cluster } from "./Cluster";
import { Grid } from "./Grid";
import { Stack } from "./Stack";
import { Card } from "./Card";

const meta: Meta = {
  title: "UI/Layout Primitives",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const InlineExample: Story = {
  render: () => (
    <Inline gap="3" align="center">
      <Card density="sm">One</Card>
      <Card density="sm">Two</Card>
      <Card density="sm">Three</Card>
    </Inline>
  ),
};

export const ClusterExample: Story = {
  render: () => (
    <Cluster gap="2" align="center">
      <Card density="sm">Alpha</Card>
      <Card density="sm">Beta</Card>
      <Card density="sm">Gamma</Card>
      <Card density="sm">Delta</Card>
    </Cluster>
  ),
};

export const GridExample: Story = {
  render: () => (
    <Grid columns="auto-fit" minItemWidth="220" gap="4">
      <Card>One</Card>
      <Card>Two</Card>
      <Card>Three</Card>
      <Card>Four</Card>
    </Grid>
  ),
};

export const StackExample: Story = {
  render: () => (
    <Stack gap="6">
      <Card density="sm">First block</Card>
      <Card density="sm">Second block</Card>
      <Card density="sm">Third block</Card>
    </Stack>
  ),
};
