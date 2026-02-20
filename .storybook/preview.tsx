import type { Preview } from "@storybook/react";
import React from "react";

import "../src/index.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      defaultValue: "dark",
      toolbar: {
        title: "Theme",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      const theme = context.globals.theme as string;

      root.classList.toggle("dark", theme === "dark");
      root.style.colorScheme = theme === "dark" ? "dark" : "light";

      return (
        <div className="min-h-screen bg-background text-foreground antialiased">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
