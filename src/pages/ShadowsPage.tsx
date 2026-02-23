import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import CodeBlock from "@/components/CodeBlock";

const shadows = [
  { name: "shadow-sm", class: "shadow-sm", css: "0 1px 2px 0 hsl(var(--foreground) / 0.05)" },
  { name: "shadow", class: "shadow", css: "0 1px 3px 0 hsl(var(--foreground) / 0.1), 0 1px 2px -1px hsl(var(--foreground) / 0.1)" },
  { name: "shadow-md", class: "shadow-md", css: "0 4px 6px -1px hsl(var(--foreground) / 0.1), 0 2px 4px -2px hsl(var(--foreground) / 0.1)" },
  { name: "shadow-lg", class: "shadow-lg", css: "0 10px 15px -3px hsl(var(--foreground) / 0.1), 0 4px 6px -4px hsl(var(--foreground) / 0.1)" },
  { name: "shadow-xl", class: "shadow-xl", css: "0 20px 25px -5px hsl(var(--foreground) / 0.1), 0 8px 10px -6px hsl(var(--foreground) / 0.1)" },
  { name: "shadow-2xl", class: "shadow-2xl", css: "0 25px 50px -12px hsl(var(--foreground) / 0.25)" },
];

const brandGlows = [
  { name: "glow-brand", class: "glow-brand", desc: "Primary color glow — buttons, CTAs" },
  { name: "glow-brand-lg", class: "glow-brand-lg", desc: "Large primary glow — hero sections" },
  { name: "glow-secondary", class: "glow-secondary", desc: "Secondary color glow — accents" },
];

export default function ShadowsPage() {
  return (
    <StorybookLayout>
      <PageHeader title="Shadows & Elevation" subtitle="Elevation scale for establishing visual hierarchy and depth." />

      <ComponentSection title="Shadow Scale" description="Tailwind shadow utilities from subtle to dramatic.">
        <div className="grid sm:grid-cols-3 gap-6">
          {shadows.map((s) => (
            <div key={s.name} className={`bg-card rounded-xl p-6 border border-border ${s.class}`}>
              <p className="text-sm font-mono font-medium text-foreground">{s.name}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono break-all">{s.css}</p>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Inner Shadow" description="Inset shadows for pressed or recessed elements.">
        <div className="flex gap-6">
          <div className="bg-card rounded-xl p-6 border border-border shadow-inner w-48">
            <p className="text-sm font-mono font-medium text-foreground">shadow-inner</p>
          </div>
          <div className="bg-card rounded-xl p-6 border border-border shadow-none w-48">
            <p className="text-sm font-mono font-medium text-foreground">shadow-none</p>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection title="Brand Glows" description="Custom glow effects using brand colors.">
        <div className="grid sm:grid-cols-3 gap-6">
          {brandGlows.map((g) => (
            <div key={g.name} className={`bg-card rounded-xl p-6 border border-border ${g.class}`}>
              <p className="text-sm font-mono font-medium text-foreground">{g.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{g.desc}</p>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Focus Ring" description="Accessible focus indicator using ring utilities.">
        <div className="flex gap-4">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground ring-2 ring-ring ring-offset-2 ring-offset-background text-sm">
            Focus ring
          </button>
          <button className="px-4 py-2 rounded-lg bg-muted text-foreground ring-2 ring-primary/50 ring-offset-2 ring-offset-background text-sm">
            Subtle ring
          </button>
        </div>
      </ComponentSection>

      <ComponentSection title="Usage" description="">
        <CodeBlock>{`<!-- Elevation -->
<div className="shadow-sm">Subtle</div>
<div className="shadow-lg">Elevated</div>
<div className="shadow-2xl">Dramatic</div>

<!-- Brand glows -->
<button className="glow-brand">CTA Button</button>
<div className="glow-brand-lg">Hero element</div>

<!-- Focus ring -->
<button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Accessible focus
</button>`}</CodeBlock>
      </ComponentSection>
    </StorybookLayout>
  );
}
