import type { Preview } from "@storybook/react";
import "../src/styles/tokens.css";
import "../src/styles/base.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { expanded: true, sort: "requiredFirst" },
    layout: "padded",
    backgrounds: {
      default: "Canvas",
      values: [
        { name: "Canvas", value: "#f7f3ea" },
        { name: "Surface", value: "#fffdf8" },
        { name: "Surface 2", value: "#f2ede2" },
      ],
    },
    options: {
      storySort: {
        order: ["Foundations", "UI", "Sections", "Articles"],
      },
    },
  },
};

export default preview;
