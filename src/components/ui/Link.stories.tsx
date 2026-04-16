import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "/example",
    children: "Read more",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Muted: Story = {
  args: {
    variant: "muted",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    children: "External link",
  },
};
