# Atelier Design System Storybook

A machine-readable design system built with React, TypeScript, Tailwind CSS, and shadcn/ui. Atelier serves as both a living component library and a structured knowledge base — every token, component, pattern, and guideline is documented visually and exported as static JSON for programmatic consumption.

## Tech Stack

- **React 18** — Component framework
- **TypeScript** — Type-safe development
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Component system
- **Radix Primitives** — Accessible headless UI
- **Vite** — Build tooling
- **Lucide** — Icon library

## Getting Started

### Clone the repository

```bash
git clone .....
cd storybook.atelierdesignsystem.com
```

### Install dependencies

```bash
npm install
```

### Start the dev server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

## Commands

### Install dependencies

Local development:

```bash
npm install
```

GitHub Actions / CI (preferred in workflows):

```bash
npm ci
```

`npm ci` is designed for CI and installs exactly what is in `package-lock.json`.

### Development

Start the app:

```bash
npm run dev
```

Start Storybook:

```bash
npm run storybook
```

### Build

Build the app:

```bash
npm run build
```

Build design tokens only:

```bash
npm run build:tokens
```

Build static Storybook (includes token build):

```bash
npm run build-storybook
```

### Test Commands

Run tests once (CI-safe):

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Lint:

```bash
npm run lint
```
Fix Lint

```bash
npm run lint -- --fix
```

Type-check:

```bash
npx tsc -p tsconfig.json --noEmit
```

### Playwright (CI)

Install Playwright browsers and OS dependencies (GitHub Actions Linux runners):

```bash
npx playwright install --with-deps
```

### Chromatic

Run Chromatic manually (uses the script in `package.json`):

```bash
npm run chromatic
```

## Update

```bash
npx storybook@latest upgrade
```

## Fonts

This repo uses **self-hosted** fonts (no Google Fonts / no external requests).

- Font files live in `public/fonts/` and are served at `/fonts/...`.
- Font loading is defined via `@font-face` in `src/index.css`.

Expected paths used by the app:

- `public/fonts/Inter/web/Inter-Regular.woff2`
- `public/fonts/Inter/web/Inter-Italic.woff2`
- `public/fonts/Inter/web/Inter-Medium.woff2`
- `public/fonts/Inter/web/Inter-MediumItalic.woff2`
- `public/fonts/Inter/web/Inter-SemiBold.woff2`
- `public/fonts/Inter/web/Inter-SemiBoldItalic.woff2`
- `public/fonts/Inter/web/Inter-Bold.woff2`
- `public/fonts/Inter/web/Inter-BoldItalic.woff2`
- `public/fonts/JetBrainsMono/fonts/webfonts/JetBrainsMono-Regular.woff2`
- `public/fonts/JetBrainsMono/fonts/webfonts/JetBrainsMono-Italic.woff2`
- `public/fonts/JetBrainsMono/fonts/webfonts/JetBrainsMono-Medium.woff2`
- `public/fonts/JetBrainsMono/fonts/webfonts/JetBrainsMono-MediumItalic.woff2`

## Project Structure

```text
storybook.atelierdesignsystem.com/
├── public/
│   └── tokens/              # Machine-readable JSON manifest
│       ├── manifest.json
│       ├── design-tokens.json
│       ├── components.json
│       ├── patterns.json
│       └── guidelines.json
├── src/
│   ├── components/ui/       # shadcn/ui components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Documentation pages
│   ├── lib/                 # Utilities
│   └── index.css            # Design tokens + @font-face declarations
├── tailwind.config.ts       # Tailwind + token integration
└── components.json          # shadcn/ui configuration
```

## JSON Manifest

All design decisions are exported as structured JSON in `/public/tokens/`. These files are served statically and can be fetched by any tool or service:

| File | Description |
|------|-------------|
| `manifest.json` | Central index — version, tech stack, file map |
| `design-tokens.json` | Colors, typography, spacing, shadows, radii, motion, z-index, breakpoints |
| `components.json` | 40+ component definitions with props, variants, imports, and install commands |
| `patterns.json` | Form, layout, content state, and data patterns |
| `guidelines.json` | Accessibility rules, design principles, content guidelines, contribution workflow |

## License

Private — all rights reserved @mirabelledoiron.com
