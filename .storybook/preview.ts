import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "../src/styles/base.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true },
    layout: "padded",
  },
};

export default preview;
