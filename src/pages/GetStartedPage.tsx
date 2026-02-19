import StorybookLayout from "@/components/StorybookLayout";
import PageHeader from "@/components/PageHeader";
import ComponentSection from "@/components/ComponentSection";
import CodeBlock from "@/components/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Package, Paintbrush, Code, Layers, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const techStack = [
  { name: "React 18", desc: "Component framework" },
  { name: "TypeScript", desc: "Type-safe development" },
  { name: "Tailwind CSS", desc: "Utility-first styling" },
  { name: "shadcn/ui", desc: "Copy-paste component system" },
  { name: "Radix Primitives", desc: "Accessible headless UI" },
  { name: "Vite", desc: "Build tooling" },
  { name: "Lucide", desc: "Icon library" },
];

const manifestFiles = [
  { file: "manifest.json", desc: "Central index — version, tech stack, file map" },
  { file: "design-tokens.json", desc: "Colors, typography, spacing, shadows, radii, motion, z-index, breakpoints" },
  { file: "components.json", desc: "40+ component definitions with props, variants, imports, and install commands" },
  { file: "patterns.json", desc: "Form, layout, content state, and data patterns" },
  { file: "guidelines.json", desc: "Accessibility rules, design principles, content guidelines, contribution workflow" },
];

export default function GetStartedPage() {
  return (
    <StorybookLayout>
      <PageHeader
        title="Get Started"
        subtitle="Install, configure, and start building with the Atelier Design System."
      />

      {/* Overview */}
      <ComponentSection title="What is Atelier?" description="A machine-readable design system built for React and TypeScript.">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          Atelier is a comprehensive design system that serves as both a living component library
          and a structured knowledge base. Every token, component, pattern, and guideline is
          documented visually in this Storybook and exported as static JSON files that can be
          consumed programmatically.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {techStack.map((t) => (
            <Badge key={t.name} variant="secondary" className="text-xs">
              {t.name}
            </Badge>
          ))}
        </div>
      </ComponentSection>

      {/* Installation */}
      <ComponentSection title="Installation" description="Clone the repo and install dependencies.">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-1.5">1. Clone & install</p>
            <CodeBlock>{`git clone https://github.com/mirabelledoiron/atelierdesignsystem.com.git atelier-design-system
cd atelier-design-system
npm install`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-1.5">2. Start dev server</p>
            <CodeBlock>{`npm run dev`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-1.5">3. Build for production</p>
            <CodeBlock>{`npm run build`}</CodeBlock>
          </div>
        </div>
      </ComponentSection>

      {/* Project Structure */}
      <ComponentSection title="Project Structure" description="Key directories and their purpose.">
        <CodeBlock>{`atelier-design-system/
├── public/
│   └── tokens/              # Machine-readable JSON manifest
│       ├── manifest.json     # Central index
│       ├── design-tokens.json
│       ├── components.json
│       ├── patterns.json
│       └── guidelines.json
├── src/
│   ├── components/
│   │   └── ui/              # shadcn/ui components (your code)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Documentation pages
│   ├── lib/                 # Utilities
│   └── index.css            # Design tokens as CSS variables
├── tailwind.config.ts       # Tailwind + token integration
└── components.json          # shadcn/ui configuration`}</CodeBlock>
      </ComponentSection>

      {/* How Components Work */}
      <ComponentSection title="How Components Work" description="shadcn/ui uses a copy-paste model — not npm packages.">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
          Unlike traditional component libraries, shadcn/ui copies component source code directly
          into your project. You own and customize every line. No version lock-in, no waiting
          for upstream updates.
        </p>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-1.5">Add a component</p>
            <CodeBlock>{`npx shadcn-ui@latest add button`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-1.5">This creates a file you own</p>
            <CodeBlock>{`src/components/ui/button.tsx`}</CodeBlock>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-1.5">Import and use it</p>
            <CodeBlock>{`import { Button } from "@/components/ui/button"

<Button variant="destructive" size="sm">
  Delete
</Button>`}</CodeBlock>
          </div>
        </div>
      </ComponentSection>

      {/* Quick Tutorial */}
      <ComponentSection title="Quick Tutorial" description="Add your first component in 3 steps.">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                Step 1
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">Add the Button component:</p>
              <code className="text-xs font-mono text-foreground bg-muted px-2 py-1 rounded block">
                npx shadcn-ui@latest add button
              </code>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Code className="w-4 h-4 text-primary" />
                Step 2
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">Import into your page:</p>
              <code className="text-xs font-mono text-foreground bg-muted px-2 py-1 rounded block">
                {`import { Button } from "@/components/ui/button"`}
              </code>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Paintbrush className="w-4 h-4 text-primary" />
                Step 3
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">Customize variants & styles:</p>
              <code className="text-xs font-mono text-foreground bg-muted px-2 py-1 rounded block">
                {`<Button variant="outline">Go</Button>`}
              </code>
            </CardContent>
          </Card>
        </div>
      </ComponentSection>

      {/* JSON Manifest */}
      <ComponentSection title="JSON Manifest" description="Machine-readable files for programmatic access.">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
          Every design decision is exported as structured JSON in <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">/public/tokens/</code>.
          These files are served statically and can be fetched by any tool or service.
        </p>
        <div className="space-y-2">
          {manifestFiles.map((f) => (
            <div key={f.file} className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-muted/50">
              <FolderOpen className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <code className="text-xs font-mono text-foreground">/tokens/{f.file}</code>
                <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className="text-xs font-mono text-muted-foreground mb-1.5">Fetch the manifest</p>
          <CodeBlock>{`const res = await fetch("/tokens/manifest.json");
const manifest = await res.json();
// { name: "atelier-design-system", version: "2.0.0", files: { ... } }`}</CodeBlock>
        </div>
      </ComponentSection>

      {/* Design Tokens */}
      <ComponentSection title="Using Design Tokens" description="CSS variables power the entire theme.">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mb-4">
          All colors, spacing, and effects are defined as CSS custom properties in <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">index.css</code> and
          mapped through Tailwind. Use semantic tokens — never hardcode colors.
        </p>
        <CodeBlock>{`/* index.css defines tokens */
:root {
  --primary: 346 84% 58%;
  --background: 240 20% 10%;
  --foreground: 0 0% 95%;
}

/* Use in Tailwind classes */
<div className="bg-primary text-primary-foreground" />

/* Or in custom CSS */
.custom { color: hsl(var(--foreground)); }`}</CodeBlock>
      </ComponentSection>

      {/* Next Steps */}
      <ComponentSection title="Next Steps" description="Explore the system.">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { icon: Layers, label: "Browse Components", path: "/buttons", desc: "See every component with live examples" },
            { icon: Paintbrush, label: "Foundations", path: "/colors", desc: "Colors, typography, spacing, and more" },
            { icon: BookOpen, label: "Patterns", path: "/patterns/forms", desc: "Reusable UI patterns and best practices" },
            { icon: FolderOpen, label: "Tokens & Downloads", path: "/tokens", desc: "Download JSON, CSS, and JS tokens" },
          ].map((item) => (
            <Link key={item.path} to={item.path}>
              <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="flex items-start gap-3 pt-4">
                  <item.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ComponentSection>
    </StorybookLayout>
  );
}
