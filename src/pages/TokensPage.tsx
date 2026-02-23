import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import CodeBlock from "@/components/CodeBlock";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileCode, FileText, ExternalLink } from "lucide-react";
import { readThemeTokenValues } from "@/lib/theme-tokens";

const jsonFiles = [
  {
    name: "manifest.json",
    url: "/tokens/manifest.json",
    desc: "System index — links to all token files, tech stack, and version",
  },
  {
    name: "design-tokens.json",
    url: "/tokens/design-tokens.json",
    desc: "Colors, typography, spacing, shadows, radii, motion, z-index, breakpoints",
  },
  {
    name: "components.json",
    url: "/tokens/components.json",
    desc: "All component metadata — names, props, variants, imports, install commands",
  },
  {
    name: "patterns.json",
    url: "/tokens/patterns.json",
    desc: "Pattern guidelines — form, layout, content states, data patterns",
  },
  {
    name: "guidelines.json",
    url: "/tokens/guidelines.json",
    desc: "Accessibility, design principles, content guidelines, contributing rules",
  },
];

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function downloadJsonFile(url: string, filename: string) {
  const res = await fetch(url);
  const text = await res.text();
  downloadFile(text, filename, "application/json");
}

const colorTokenKeys = [
  "background",
  "foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "border",
] as const;

function buildTokensCss(light: Record<string, string>, dark: Record<string, string>) {
  const fontSans = "var(--font-sans)";
  const fontMono = "var(--font-mono)";

  return `:root {
  --background: ${light.background || "var(--background)"};
  --foreground: ${light.foreground || "var(--foreground)"};
  --primary: ${light.primary || "var(--primary)"};
  --primary-foreground: ${light["primary-foreground"] || "var(--primary-foreground)"};
  --secondary: ${light.secondary || "var(--secondary)"};
  --secondary-foreground: ${light["secondary-foreground"] || "var(--secondary-foreground)"};
  --muted: ${light.muted || "var(--muted)"};
  --muted-foreground: ${light["muted-foreground"] || "var(--muted-foreground)"};
  --border: ${light.border || "var(--border)"};
  --radius: var(--radius);
  --font-sans: ${fontSans};
  --font-mono: ${fontMono};
}

.dark {
  --background: ${dark.background || "var(--background)"};
  --foreground: ${dark.foreground || "var(--foreground)"};
  --primary: ${dark.primary || "var(--primary)"};
  --primary-foreground: ${dark["primary-foreground"] || "var(--primary-foreground)"};
  --secondary: ${dark.secondary || "var(--secondary)"};
  --secondary-foreground: ${dark["secondary-foreground"] || "var(--secondary-foreground)"};
  --muted: ${dark.muted || "var(--muted)"};
  --muted-foreground: ${dark["muted-foreground"] || "var(--muted-foreground)"};
  --border: ${dark.border || "var(--border)"};
}`;
}

function buildTokensJs(light: Record<string, string>, dark: Record<string, string>) {
  return `export const tokens = {
  colors: {
    primary: { light: "hsl(${light.primary || "var(--primary)"})", dark: "hsl(${dark.primary || "var(--primary)"})" },
    secondary: { light: "hsl(${light.secondary || "var(--secondary)"})", dark: "hsl(${dark.secondary || "var(--secondary)"})" },
    background: { light: "hsl(${light.background || "var(--background)"})", dark: "hsl(${dark.background || "var(--background)"})" },
    foreground: { light: "hsl(${light.foreground || "var(--foreground)"})", dark: "hsl(${dark.foreground || "var(--foreground)"})" },
  },
  typography: {
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },
  spacing: { sm: "var(--spacing-sm)", md: "var(--spacing-md)", lg: "var(--spacing-lg)", xl: "var(--spacing-xl)", "2xl": "var(--spacing-2xl)" },
  radius: "var(--radius)",
};`;
}

export default function TokensPage() {
  const lightTokens = readThemeTokenValues(colorTokenKeys, "light");
  const darkTokens = readThemeTokenValues(colorTokenKeys, "dark");
  const tokensCSS = buildTokensCss(lightTokens, darkTokens);
  const tokensJS = buildTokensJs(lightTokens, darkTokens);
  const legacyFiles = [
    {
      name: "tokens.css",
      icon: FileText,
      desc: "CSS custom properties — generated from the current token source",
      action: () => downloadFile(tokensCSS, "tokens.css", "text/css"),
    },
    {
      name: "tokens.js",
      icon: FileCode,
      desc: "ES module — generated from live CSS token values",
      action: () => downloadFile(tokensJS, "tokens.js", "application/javascript"),
    },
  ];

  return (
    <StorybookLayout>
      <PageHeader
        title="Tokens & Manifest"
        subtitle="Machine-readable design system files. Serve as the single source of truth for AI assistants, tooling, and automation."
      />

      <ComponentSection title="System Manifest (JSON)" description="Static JSON files served at /tokens/ — accessible via URL for AI assistants and tooling.">
        <div className="space-y-3">
          {jsonFiles.map((f) => (
            <div key={f.name} className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileJson className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-sm text-foreground font-medium">{f.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                <p className="text-[11px] font-mono text-muted-foreground mt-1">{f.url}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="ghost" size="sm" asChild>
                  <a href={f.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3.5 h-3.5 mr-1" /> View
                  </a>
                </Button>
                <Button variant="outline" size="sm" onClick={() => downloadJsonFile(f.url, f.name)}>
                  <Download className="w-3.5 h-3.5 mr-1" /> Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Quick Export (CSS / JS)" description="Simplified token exports for direct use in projects.">
        <div className="grid sm:grid-cols-2 gap-4">
          {legacyFiles.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.name}
                onClick={f.action}
                className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-card p-5 text-left hover:border-primary/40 hover:scale-[1.02] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-sm text-foreground font-medium">{f.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-primary font-medium mt-auto">
                  <Download className="w-3.5 h-3.5" /> Download
                </span>
              </button>
            );
          })}
        </div>
      </ComponentSection>

      <ComponentSection title="tokens.css" description="CSS custom properties preview.">
        <CodeBlock className="max-h-80">{tokensCSS}</CodeBlock>
      </ComponentSection>

      <ComponentSection title="tokens.js" description="ES module export preview.">
        <CodeBlock className="max-h-80">{tokensJS}</CodeBlock>
      </ComponentSection>
    </StorybookLayout>
  );
}
