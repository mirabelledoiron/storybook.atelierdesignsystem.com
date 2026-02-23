import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import DocBlock from "@/components/DocBlock";
import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cssColorToHex, formatHslToken, readThemeTokenValues } from "@/lib/theme-tokens";

const presetColorTokens = [
  "primary",
  "secondary",
  "background",
  "foreground",
  "muted",
  "accent",
  "card",
  "popover",
  "ring",
  "border",
] as const;

export default function ColorPickerPage() {
  const { theme } = useTheme();
  const tokenValues = readThemeTokenValues(presetColorTokens, theme);
  const presetColors = presetColorTokens
    .map((token) => tokenValues[token])
    .filter(Boolean)
    .map((raw) => cssColorToHex(formatHslToken(raw)))
    .filter(Boolean);

  const initialPrimary = presetColors[0] || "";
  const initialSecondary = presetColors[1] || initialPrimary;

  const [color, setColor] = useState(initialPrimary);
  const [customColor, setCustomColor] = useState(initialSecondary);

  useEffect(() => {
    if (!presetColors.length) return;
    setColor((prev) => prev || presetColors[0]);
    setCustomColor((prev) => prev || presetColors[1] || presetColors[0]);
  }, [presetColors]);

  return (
    <StorybookLayout>
      <PageHeader title="Color Picker" subtitle="Color selection with presets, custom hex input, and native picker." />

      <DocBlock
        usage="Use ColorPicker for selecting colors in theme builders, design tools, or branding settings. Offer preset swatches for quick selection and hex input for precision."
        doItems={["Provide branded preset swatches", "Show a live preview of the selected color", "Support both hex input and native picker"]}
        dontItems={["Don't use for binary choices — use a toggle instead", "Avoid too many swatches (10-12 max)"]}
        apiRows={[
          { prop: "value", type: "string", desc: "Current hex color value (token-derived or user-entered)" },
          { prop: "onChange", type: "(color: string) => void", desc: "Callback when color is selected" },
          { prop: "presets", type: "string[]", desc: "Array of hex color presets to display as swatches" },
        ]}
      />

      <ComponentSection title="Preset Swatches" description="Click a swatch to select a color.">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {presetColors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn("w-8 h-8 rounded-lg border-2 transition-all", color === c ? "border-primary scale-110" : "border-border hover:scale-105")}
                style={{ backgroundColor: c }}
                aria-label={`Select ${c}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-border" style={{ backgroundColor: color }} />
            <span className="font-mono text-sm text-foreground">{color}</span>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Custom Hex Input" description="Type a hex value or use the native color picker.">
        <div className="flex items-end gap-3 max-w-xs">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="hex">Hex Color</Label>
            <Input id="hex" value={customColor} onChange={(e) => setCustomColor(e.target.value)} placeholder="RRGGBB" className="font-mono" />
          </div>
          <div className="relative">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="absolute inset-0 opacity-0 w-10 h-10 cursor-pointer"
            />
            <div className="w-10 h-10 rounded-lg border border-border cursor-pointer" style={{ backgroundColor: customColor }} />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Popover Picker" description="Color picker in a popover.">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <div className="w-4 h-4 rounded border border-border" style={{ backgroundColor: customColor }} />
              {customColor}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3 space-y-3">
            <div className="flex flex-wrap gap-2">
              {presetColors.map((c) => (
                <button
                  key={c}
                  onClick={() => setCustomColor(c)}
                  className="w-7 h-7 rounded-md border border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <Input value={customColor} onChange={(e) => setCustomColor(e.target.value)} className="font-mono text-sm" />
          </PopoverContent>
        </Popover>
      </ComponentSection>
    </StorybookLayout>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
