# Atelier Design System

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
git clone https://github.com/mirabelledoiron/atelierdesignsystem.com.git atelier-design-system
cd atelier-design-system
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

```
atelier-design-system/
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
