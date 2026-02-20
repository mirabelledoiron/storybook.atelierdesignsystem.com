import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";
import { mergeConfig, type UserConfig } from "vite";

const storybookDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  async viteFinal(config: UserConfig) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(storybookDir, "../src"),
        },
      },
    });
  },
};

export default config;
