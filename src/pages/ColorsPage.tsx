import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import InstallBlock from "@/components/InstallBlock";
import { useTheme } from "@/hooks/use-theme";
import { formatHslToken, readThemeTokenValues, resolveCssColor } from "@/lib/theme-tokens";

interface ColorDef {
  name: string;
  token: string;
  desc: string;
}

interface ResolvedColorDef extends ColorDef {
  value: string;
  hsl: string;
}

/* ── Token-backed palette metadata ── */
const primaryColors: ColorDef[] = [
  { name: "brand-bg", token: "background", desc: "Main page background" },
  { name: "brand-surface", token: "card", desc: "Card backgrounds, sections" },
  { name: "brand-surface-elevated", token: "brand-surface-elevated", desc: "Elevated elements, hover states" },
];

const accentColors: ColorDef[] = [
  { name: "brand-primary", token: "primary", desc: "Primary buttons, headings, CTAs" },
  { name: "brand-primary-hover", token: "brand-primary-hover", desc: "Button hover states" },
  { name: "brand-primary-light", token: "brand-primary-light", desc: "Icons, subtle accents" },
  { name: "brand-secondary", token: "secondary", desc: "Success states, highlights, metrics" },
  { name: "brand-secondary-light", token: "brand-secondary-light", desc: "Secondary hover states" },
];

const textColors: ColorDef[] = [
  { name: "brand-text", token: "foreground", desc: "Primary text, headings" },
  { name: "brand-text-muted", token: "muted-foreground", desc: "Body text, descriptions" },
  { name: "brand-text-subtle", token: "brand-text-subtle", desc: "Captions, metadata" },
];

const utilityColors: ColorDef[] = [
  { name: "brand-border", token: "border", desc: "Card borders, dividers" },
  { name: "brand-border-light", token: "brand-border-light", desc: "Subtle borders, nav border" },
  { name: "brand-warning", token: "brand-warning", desc: "Warning states" },
];

const ALL_COLOR_TOKENS = Array.from(
  new Set([...primaryColors, ...accentColors, ...textColors, ...utilityColors].map((color) => color.token)),
);

function resolveColorSet(colors: ColorDef[], tokenValues: Record<string, string>): ResolvedColorDef[] {
  return colors.map((color) => {
    const hsl = tokenValues[color.token] || "";
    const value = hsl ? resolveCssColor(formatHslToken(hsl)) : "";
    return { ...color, hsl, value };
  });
}

function ColorSwatch({ name, value, hsl, desc }: ResolvedColorDef) {
  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="h-20" style={{ backgroundColor: hsl ? formatHslToken(hsl) : undefined }} />
      <div className="p-4 space-y-1">
        <p className="text-xs font-mono text-primary">{name}</p>
        <p className="text-sm font-mono text-foreground">{value || "unresolved"}</p>
        <p className="text-xs font-mono text-muted-foreground">{hsl || "token missing"}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function ComparisonRow({ label, dark, light }: { label: string; dark: ResolvedColorDef[]; light: ResolvedColorDef[] }) {
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
                        <span className="font-mono text-foreground">{d.value || "unresolved"}</span>
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
                        <span className="font-mono text-foreground">{l.value || "unresolved"}</span>
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

  const lightTokenValues = readThemeTokenValues(ALL_COLOR_TOKENS, "light");
  const darkTokenValues = readThemeTokenValues(ALL_COLOR_TOKENS, "dark");

  const currentPrimaryColors = resolveColorSet(primaryColors, isDark ? darkTokenValues : lightTokenValues);
  const currentAccentColors = resolveColorSet(accentColors, isDark ? darkTokenValues : lightTokenValues);
  const currentTextColors = resolveColorSet(textColors, isDark ? darkTokenValues : lightTokenValues);
  const currentUtilityColors = resolveColorSet(utilityColors, isDark ? darkTokenValues : lightTokenValues);

  const darkPrimaryColors = resolveColorSet(primaryColors, darkTokenValues);
  const lightPrimaryColors = resolveColorSet(primaryColors, lightTokenValues);
  const darkAccentColors = resolveColorSet(accentColors, darkTokenValues);
  const lightAccentColors = resolveColorSet(accentColors, lightTokenValues);
  const darkTextColors = resolveColorSet(textColors, darkTokenValues);
  const lightTextColors = resolveColorSet(textColors, lightTokenValues);
  const darkUtilityColors = resolveColorSet(utilityColors, darkTokenValues);
  const lightUtilityColors = resolveColorSet(utilityColors, lightTokenValues);

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
          {currentPrimaryColors.map((c) => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </ComponentSection>

      <ComponentSection title="Accent Colors" description="Brand colors for interactive elements and highlights.">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentAccentColors.map((c) => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </ComponentSection>

      <ComponentSection title="Text Colors" description="Hierarchical text colors for readability.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentTextColors.map((c) => <ColorSwatch key={c.name} {...c} />)}
        </div>
      </ComponentSection>

      <ComponentSection title="Border & Utility Colors">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentUtilityColors.map((c) => <ColorSwatch key={c.name} {...c} />)}
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
