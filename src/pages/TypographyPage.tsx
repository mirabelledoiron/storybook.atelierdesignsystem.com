import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import DocBlock from "@/components/DocBlock";
import InstallBlock from "@/components/InstallBlock";

const typeScale = [
  { name: "Display XL", size: "64px", weight: "700", leading: "1.1", className: "text-6xl font-bold" },
  { name: "Display Large", size: "48px", weight: "700", leading: "1.2", className: "text-5xl font-bold" },
  { name: "Display Medium", size: "36px", weight: "700", leading: "1.3", className: "text-4xl font-bold" },
  { name: "Display Small", size: "24px", weight: "600", leading: "1.4", className: "text-2xl font-semibold" },
];

const bodyScale = [
  { name: "Body Large", size: "18px", weight: "400", leading: "1.75", desc: "Lead paragraphs and important text" },
  { name: "Body Medium", size: "16px", weight: "400", leading: "1.75", desc: "Standard body text for content" },
  { name: "Body Small", size: "14px", weight: "400", leading: "1.5", desc: "Captions and metadata" },
];

export default function TypographyPage() {
  return (
    <StorybookLayout>
      <PageHeader title="Typography" subtitle="Inter font family with a carefully designed type scale for clear hierarchy." />

      <InstallBlock
        install={`# Put your font files in public/fonts (served at /fonts/...)\n# This repo expects:\n# - public/fonts/Inter/web/*.woff2\n# - public/fonts/JetBrainsMono/fonts/webfonts/*.woff2`}
        importCode={`/* src/index.css */\n@font-face {\n  font-family: 'Inter';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url('/fonts/Inter/web/Inter-Regular.woff2') format('woff2');\n}\n\n@font-face {\n  font-family: 'JetBrains Mono';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url('/fonts/JetBrainsMono/fonts/webfonts/JetBrainsMono-Regular.woff2') format('woff2');\n}`}
        usage={`<h1 className="text-4xl font-bold tracking-tight text-foreground">Heading</h1>\n<p className="text-sm text-muted-foreground">Body text</p>\n<code className="font-mono text-xs text-primary">code</code>`}
      />

      <DocBlock
        usage="Typography establishes visual hierarchy and readability. Use the display scale for page-level headings and the body scale for content. Stick to the defined sizes to maintain consistency — avoid arbitrary font sizes."
        doItems={[
          "Use Display XL sparingly — only for hero sections or landing pages",
          "Apply tracking-tight to display headings for a polished look",
          "Use text-muted-foreground for body text and text-foreground for headings",
          "Use the monospace font for code, technical content, and data labels",
        ]}
        dontItems={[
          "Don't skip heading levels (e.g., h1 → h3 without h2)",
          "Avoid using more than 2 font weights on a single page",
          "Don't set line-height below 1.4 for body text — it hurts readability",
          "Never use custom font sizes outside the defined scale",
        ]}
      />

      <ComponentSection title="Display Scale" description="Heading hierarchy for page titles and section headers.">
        <div className="space-y-6">
          {typeScale.map((t) => (
            <div key={t.name} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
              <span className={`${t.className} text-foreground tracking-tight`}>{t.name}</span>
              <span className="text-xs font-mono text-muted-foreground">
                {t.size} / {t.leading} / {t.weight}
              </span>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Body Scale" description="Text styles for paragraphs and supporting content.">
        <div className="space-y-4 max-w-lg">
          {bodyScale.map((t) => (
            <div key={t.name}>
              <p className="text-foreground" style={{ fontSize: t.size, lineHeight: t.leading }}>
                {t.name} — {t.desc}
              </p>
              <span className="text-xs font-mono text-muted-foreground">
                {t.size} / {t.leading} / {t.weight}
              </span>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection title="Text Colors" description="Hierarchical color application for readability.">
        <div className="space-y-3 max-w-lg">
          <p className="text-foreground font-medium">Primary text — headings and emphasis</p>
          <p className="text-muted-foreground">Muted text — body copy and descriptions</p>
          <p className="text-subtle">Subtle text — captions and metadata</p>
        </div>
      </ComponentSection>

      <ComponentSection title="Monospace" description="JetBrains Mono for code and technical content.">
        <div className="space-y-3">
          <p className="font-mono text-sm text-foreground">const theme = "atelier-dark";</p>
          <code className="inline-block rounded-md bg-muted px-3 py-1.5 font-mono text-sm text-primary">
            npm install @atelier/design-tokens
          </code>
        </div>
      </ComponentSection>

      <ComponentSection title="Responsive Typography" description="How type sizes scale across breakpoints.">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 font-medium text-muted-foreground">Breakpoint</th>
                <th className="pb-3 font-medium text-muted-foreground">Hero Size</th>
                <th className="pb-3 font-medium text-muted-foreground">Section Size</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Mobile (< 768px)", "text-4xl", "text-3xl"],
                ["Tablet (768px–1024px)", "text-5xl", "text-4xl"],
                ["Desktop (> 1024px)", "text-6xl", "text-4xl"],
              ].map(([bp, hero, section]) => (
                <tr key={bp} className="border-b border-border/50">
                  <td className="py-3 text-foreground">{bp}</td>
                  <td className="py-3 font-mono text-primary text-xs">{hero}</td>
                  <td className="py-3 font-mono text-secondary text-xs">{section}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentSection>
    </StorybookLayout>
  );
}
