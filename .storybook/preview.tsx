import type { Preview } from "@storybook/react-vite";
import React from "react";
import { addons } from "storybook/preview-api";
import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events";

import "../src/styles/variables.css";
import "../src/index.css";

type ThemeMode = "light" | "dark";

const DEFAULT_THEME: ThemeMode = "dark";

function isDarkTheme(theme: unknown): boolean {
  if (theme === "light") return false;
  if (theme === "dark") return true;
  return DEFAULT_THEME === "dark";
}

function applyPreviewTheme(theme: unknown) {
  if (typeof document === "undefined") return;

  const dark = isDarkTheme(theme);
  const root = document.documentElement;
  const body = document.body;

  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
  root.style.backgroundColor = "hsl(var(--background))";

  if (body) {
    body.style.backgroundColor = "hsl(var(--background))";
  }
}

if (typeof window !== "undefined") {
  applyPreviewTheme(DEFAULT_THEME);
  const channel = addons.getChannel();
  channel.on(GLOBALS_UPDATED, ({ globals }) => applyPreviewTheme(globals?.theme));
  channel.on(SET_GLOBALS, ({ globals }) => applyPreviewTheme(globals?.theme));
}

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
      const theme = context.globals.theme as string;
      applyPreviewTheme(theme);

      return (
        <div
          className={`${theme} bg-background text-foreground antialiased p-8 flex items-center justify-center`}
          style={{ backgroundColor: "hsl(var(--background))" }}
        >
          <div className="w-full max-w-[800px]">
            <Story />
          </div>
        </div>
      );
    },
  ],

  parameters: {
    options: {
      storySort: {
        order: [
          "Getting Started",
          ["Welcome", "Installation"],
          "Foundations",
          ["Colors", "Typography", "Border Radius", "Shadows", "Spacing"],
          "Components",
          "Patterns",
          "Guidelines",
        ],
      },
    },

    viewport: {
      options: {
        mobile: { name: "Mobile", styles: { width: "375px", height: "667px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1440px", height: "900px" } },
      }
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },

  initialGlobals: {
    viewport: {
      value: "desktop",
      isRotated: false
    }
  }
};

export default preview;
