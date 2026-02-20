# Migrating Atelier to True Storybook

> **This file is gitignored and for internal reference only.**

> **Status: READY FOR MIGRATION** — All 47 stories and 10 MDX docs have been written. Only Steps 1, 2, 6, and 7 remain (Storybook init, config, addons, and run).

This project currently uses a custom-built documentation site that mimics Storybook's layout (sidebar navigation + component preview area). Below is a step-by-step guide to migrate to actual [Storybook](https://storybook.js.org/).

---

## Migration Progress

| Task | Status |
|------|--------|
| Write stories for all UI components (47 files) | Done |
| Write MDX docs for Foundations (Colors, Typography, Spacing) | Done |
| Write MDX docs for Guidelines (Design Principles, Content Guidelines, Contributing) | Done |
| Write MDX docs for Patterns (Form, Layout, Data, Content States) | Done |
| Storybook init + config | Pending (local) |
| Install recommended addons | Pending (local) |
| QA & polish | Pending |

---

## Files Created

### Stories — `src/components/ui/*.stories.tsx` (47 files)

accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toggle, toggle-group, tooltip

### MDX Docs — `src/docs/*.mdx` (10 files)

| File | Storybook Path |
|------|---------------|
| `Colors.mdx` | Foundations/Colors |
| `Typography.mdx` | Foundations/Typography |
| `Spacing.mdx` | Foundations/Spacing |
| `DesignPrinciples.mdx` | Guidelines/Design Principles |
| `ContentGuidelines.mdx` | Guidelines/Content Guidelines |
| `Contribution.mdx` | Guidelines/Contributing |
| `FormPatterns.mdx` | Patterns/Form Patterns |
| `LayoutPatterns.mdx` | Patterns/Layout Patterns |
| `DataPatterns.mdx` | Patterns/Data Patterns |
| `ContentStates.mdx` | Patterns/Content States |

### Components without stories (intentional)

- `toaster.tsx` — wrapper that renders Toast component
- `use-toast.ts` — hook, not a visual component

---

## Current Architecture vs Storybook

| Aspect | Current (Custom) | Storybook |
|--------|------------------|-----------|
| Runtime | Vite React app (`npm run dev`) | Dedicated dev server (`npm run storybook`) |
| Stories | Hand-written page components in `src/pages/` | `.stories.tsx` files co-located with components |
| Props docs | Manual `DocBlock` with `apiRows` | Auto-generated from TypeScript types via `autodocs` |
| Controls | Static examples | Interactive knobs/controls panel |
| Addons | None | A11y, viewport, actions, backgrounds, etc. |
| Build output | Standard SPA | Static docs site (`storybook build`) |

---

## Remaining Steps

### Step 1 — Install Storybook

From the project root:

```sh
npx storybook@latest init --type react_vite
```

This will:
- Add `@storybook/*` dev dependencies
- Create `.storybook/` config directory
- Add `storybook` and `build-storybook` scripts to `package.json`
- Generate example stories (can be deleted — we already have ours)

---

### Step 2 — Configure for Tailwind & Path Aliases

#### `.storybook/preview.ts`

```ts
import type { Preview } from "@storybook/react";
import "../src/index.css"; // Import your Tailwind + design tokens

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "hsl(240 20% 10%)" },
        { name: "light", value: "hsl(0 0% 100%)" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

#### `.storybook/main.ts`

```ts
import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.stories.@(ts|tsx)",
    "../src/docs/*.mdx",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };
    return config;
  },
};

export default config;
```

> **Note:** The `stories` array now includes `../src/docs/*.mdx` to pick up all foundation, guideline, and pattern MDX docs.

---

### Step 3 — Stories Are Done

All 47 `.stories.tsx` files are already created and co-located in `src/components/ui/`. No additional work needed.

---

### Step 4 — Custom Components

For custom components (Rating, Timeline, TreeView, Kbd, ColorPicker, FileUpload), the same pattern applies. Since these aren't from shadcn/ui, document their props with JSDoc comments so `autodocs` picks them up:

```tsx
interface RatingProps {
  /** Current rating value (0–5) */
  value: number;
  /** Callback when rating changes */
  onChange?: (value: number) => void;
  /** Number of stars to display */
  max?: number;
  /** Render as read-only */
  readOnly?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}
```

---

### Step 5 — MDX Docs Are Done

All 10 MDX files are created in `src/docs/`. They will appear in the Storybook sidebar under:

```
Foundations/
  Colors
  Typography
  Spacing
Guidelines/
  Design Principles
  Content Guidelines
  Contributing
Patterns/
  Form Patterns
  Layout Patterns
  Data Patterns
  Content States
```

---

### Step 6 — Install Recommended Addons

```sh
npm install -D @storybook/addon-a11y @storybook/addon-viewport
```

- **a11y** — Runs axe accessibility checks on every story
- **viewport** — Test responsive breakpoints interactively

---

### Step 7 — Run & Build

```sh
# Development
npm run storybook        # Opens at http://localhost:6006

# Production build
npm run build-storybook  # Outputs to storybook-static/
```

---

## What Happens to the Current Custom Site?

You have two options:

1. **Keep both** — Run the Vite app as a public-facing docs site and Storybook as an internal dev tool.
2. **Replace** — Remove `src/pages/`, `StorybookLayout`, and the custom routing. Storybook becomes the single source of truth.

---

## Remaining Effort

| Task | Time |
|------|------|
| Storybook init + config | 30 min |
| Install addons | 5 min |
| QA & polish | 1–2 hours |
| **Total** | **~1.5–2.5 hours** |
