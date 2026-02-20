import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import InstallBlock from "@/components/InstallBlock";
import { useTheme } from "@/hooks/use-theme";

interface ColorDef {
  name: string;
  value: string;
  hsl: string;
  desc: string;
}

/* ── Canonical Atelier dark palette ── */
const darkPrimaryColors: ColorDef[] = [
  { name: "brand-bg", value: "#1a1a2e", hsl: "240 28% 14%", desc: "Main page background" },
  { name: "brand-surface", value: "#16213e", hsl: "220 47% 16%", desc: "Card backgrounds, sections" },
  { name: "brand-surface-elevated", value: "#1f2b47", hsl: "218 39% 20%", desc: "Elevated elements, hover states" },
];

const darkAccentColors: ColorDef[] = [
  { name: "brand-primary", value: "#e94560", hsl: "351 80% 59%", desc: "Primary buttons, headings, CTAs" },
  { name: "brand-primary-hover", value: "#d63d56", hsl: "350 66% 54%", desc: "Button hover states" },
  { name: "brand-primary-light", value: "#f8b4c4", hsl: "345 83% 84%", desc: "Icons, subtle accents" },
  { name: "brand-secondary", value: "#4ecdc4", hsl: "176 56% 55%", desc: "Success states, highlights, metrics" },
  { name: "brand-secondary-light", value: "#7eddd6", hsl: "176 55% 68%", desc: "Secondary hover states" },
];

const darkTextColors: ColorDef[] = [
  { name: "brand-text", value: "#ffffff", hsl: "0 0% 100%", desc: "Primary text, headings" },
  { name: "brand-text-muted", value: "#9ca3af", hsl: "218 11% 65%", desc: "Body text, descriptions" },
  { name: "brand-text-subtle", value: "#6b7280", hsl: "220 9% 46%", desc: "Captions, metadata" },
];

const darkUtilityColors: ColorDef[] = [
  { name: "brand-border", value: "#4a3f6b", hsl: "255 26% 33%", desc: "Card borders, dividers" },
  { name: "brand-border-light", value: "rgba(255,255,255,0.1)", hsl: "0 0% 100% / 0.1", desc: "Subtle borders, nav border" },
  { name: "brand-warning", value: "#ffd93d", hsl: "47 100% 62%", desc: "Warning states" },
];

/* ── Light palette (adapted for readability) ── */
const lightPrimaryColors: ColorDef[] = [
  { name: "brand-bg", value: "#e3e5ea", hsl: "220 14% 92%", desc: "Main page background" },
  { name: "brand-surface", value: "#eff0f4", hsl: "220 14% 96%", desc: "Card backgrounds, sections" },
  { name: "brand-surface-elevated", value: "#d6d9e0", hsl: "220 12% 86%", desc: "Elevated elements, hover states" },
];

const lightAccentColors: ColorDef[] = [
  { name: "brand-primary", value: "#e94560", hsl: "351 80% 59%", desc: "Primary buttons, headings, CTAs" },
  { name: "brand-primary-hover", value: "#d63d56", hsl: "350 66% 54%", desc: "Button hover states" },
  { name: "brand-primary-light", value: "#a13349", hsl: "345 60% 43%", desc: "Icons, subtle accents" },
  { name: "brand-secondary", value: "#2E8A80", hsl: "176 50% 38%", desc: "Success states, highlights, metrics" },
  { name: "brand-secondary-light", value: "#256E66", hsl: "176 45% 32%", desc: "Secondary hover states" },
];

const lightTextColors: ColorDef[] = [
  { name: "brand-text", value: "#262D3A", hsl: "220 20% 18%", desc: "Primary text, headings" },
  { name: "brand-text-muted", value: "#575E6B", hsl: "220 10% 40%", desc: "Body text, descriptions" },
  { name: "brand-text-subtle", value: "#727A87", hsl: "220 9% 50%", desc: "Captions, metadata" },
];

const lightUtilityColors: ColorDef[] = [
  { name: "brand-border", value: "#c4c9d1", hsl: "220 12% 80%", desc: "Card borders, dividers" },
  { name: "brand-border-light", value: "rgba(0,0,0,0.06)", hsl: "0 0% 0% / 0.06", desc: "Subtle borders, nav border" },
  { name: "brand-warning", value: "#9E8115", hsl: "47 80% 42%", desc: "Warning states" },
];

function ColorSwatch({ name, value, hsl, desc }: ColorDef) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="h-20" style={{ backgroundColor: value }} />
      <div className="p-4 space-y-1">
        <p className="text-xs font-mono text-primary">{name}</p>
        <p className="text-sm font-mono text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function ComparisonRow({ label, dark, light }: { label: string; dark: ColorDef[]; light: ColorDef[] }) {
  const maxLen = Math.max(dark.length, light.length);
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground">{label}</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-4 font-medium text-muted-foreground w-[140px]">Token</th>
              <th className="pb-2 pr-2 font-medium text-muted-foreground">Dark</th>
              <th className="pb-2 pr-4 font-medium text-muted-foreground w-[80px]"></th>
              <th className="pb-2 pr-2 font-medium text-muted-foreground">Light</th>
              <th className="pb-2 font-medium text-muted-foreground w-[80px]"></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxLen }).map((_, i) => {
              const d = dark[i];
              const l = light[i];
              if (!d && !l) return null;
              return (
                <tr key={i} className="border-b border-border/50">
                  <td className="py-2 pr-4 font-mono text-primary">{d?.name || l?.name}</td>
                  <td className="py-2 pr-2">
                    {d && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md border border-border/50 flex-shrink-0" style={{ backgroundColor: d.value }} />
                        <span className="font-mono text-foreground">{d.value}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-2 pr-4">
                    {d && <span className="text-muted-foreground font-mono">{d.hsl}</span>}
                  </td>
                  <td className="py-2 pr-2">
                    {l && (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md border border-border/50 flex-shrink-0" style={{ backgroundColor: l.value }} />
                        <span className="font-mono text-foreground">{l.value}</span>
                      </div>
                    )}
                  </td>
                  <td className="py-2">
                    {l && <span className="text-muted-foreground font-mono">{l.hsl}</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const primaryColors = isDark ? darkPrimaryColors : lightPrimaryColors;
  const accentColors = isDark ? darkAccentColors : lightAccentColors;
  const textColors = isDark ? darkTextColors : lightTextColors;
  const utilityColors = isDark ? darkUtilityColors : lightUtilityColors;

  return (
    <StorybookLayout>
      <PageHeader title="Color Palette" subtitle={`A carefully crafted ${isDark ? "dark" : "light"} theme palette optimized for readability and visual hierarchy.`} />

      <InstallBlock
        install="npm install tailwindcss-animate class-variance-authority clsx tailwind-merge"
        importCode={`/* Copy the CSS variables from Tokens page into your index.css */\n/* Fonts are loaded locally via @font-face (see main.tsx) */`}
        usage={`/* Use semantic tokens in your components */\n<div className="bg-background text-foreground">\n  <p className="text-primary">Coral accent</p>\n  <p className="text-secondary">Teal accent</p>\n  <p className="text-muted-foreground">Muted text</p>\n</div>`}
      />

      <ComponentSection title="Primary Colors" description="Background and surface colors that form the foundation.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {primaryColors.map((c) => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </ComponentSection>

      <ComponentSection title="Accent Colors" description="Brand colors for interactive elements and highlights.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {accentColors.map((c) => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </ComponentSection>

      <ComponentSection title="Text Colors" description="Hierarchical text colors for readability.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {textColors.map((c) => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </ComponentSection>

      <ComponentSection title="Border & Utility Colors">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {utilityColors.map((c) => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </ComponentSection>

      <ComponentSection title="Dark vs Light — Side by Side" description="Full comparison of every token across both themes.">
        <div className="space-y-8">
          <ComparisonRow label="Surfaces" dark={darkPrimaryColors} light={lightPrimaryColors} />
          <ComparisonRow label="Accents" dark={darkAccentColors} light={lightAccentColors} />
          <ComparisonRow label="Text" dark={darkTextColors} light={lightTextColors} />
          <ComparisonRow label="Utility" dark={darkUtilityColors} light={lightUtilityColors} />
        </div>
      </ComponentSection>
    </StorybookLayout>
  );
}
