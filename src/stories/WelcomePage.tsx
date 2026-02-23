import { TokenReference } from "./Foundations/TokenReference"
import { BulletList, DocsPageFrame, DocsSection } from "./shared/DocsPageFrame"

const QUICK_START_CODE = `npm install
npm run build:tokens
npm run storybook`

const TOKEN_WORKFLOW_CODE = `# Edit tokens
tokens/*.json

# Generate CSS variables
npm run build:tokens

# Consume in app/storybook
import "./styles/variables.css";`

const ROADMAP_CODE = `type Status = "READY" | "IN PROGRESS"

// Use Storybook pages to document rollout status
// and implementation patterns consistently.`

function StatusPill(props: { status: "READY" | "IN PROGRESS" }) {
  const ready = props.status === "READY"
  return (
    <span
      className={
        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide " +
        (ready ? "bg-secondary/15 text-secondary" : "bg-warning/15 text-warning")
      }
    >
      {props.status}
    </span>
  )
}

export default function WelcomePage() {
  return (
    <DocsPageFrame
      title="Atelier Design System"
      description="A unified collection of foundations, components, and guidelines to build consistent, accessible interfaces using semantic tokens and shared implementation patterns."
    >
      <DocsSection title="Getting Started">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Install dependencies:</span> Run `npm install` once before working locally.
            </>,
            <>
              <span className="font-semibold text-foreground">Generate tokens:</span> Run `npm run build:tokens` (also runs automatically before Storybook and app dev).
            </>,
            <>
              <span className="font-semibold text-foreground">Launch Storybook:</span> Use `npm run storybook` and validate both light and dark themes.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="What You’ll Find">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="m-0 text-base font-semibold text-foreground">Foundations</h3>
            <p className="m-0 mt-2 text-sm text-muted-foreground">Colors, typography, spacing, radius, and shadows with token-backed references.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="m-0 text-base font-semibold text-foreground">Components</h3>
            <p className="m-0 mt-2 text-sm text-muted-foreground">Reusable UI building blocks and interaction patterns.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="m-0 text-base font-semibold text-foreground">Guidelines</h3>
            <p className="m-0 mt-2 text-sm text-muted-foreground">Content and implementation guidance that keeps teams aligned.</p>
          </div>
        </div>
      </DocsSection>

      <DocsSection title="Component Roadmap">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-background/70">
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Component</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Version</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 text-foreground">Button</td>
                <td className="px-4 py-3"><StatusPill status="READY" /></td>
                <td className="px-4 py-3 text-muted-foreground">v1.2.0</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 text-foreground">Input</td>
                <td className="px-4 py-3"><StatusPill status="READY" /></td>
                <td className="px-4 py-3 text-muted-foreground">v1.0.0</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-foreground">Modal</td>
                <td className="px-4 py-3"><StatusPill status="IN PROGRESS" /></td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocsSection>

      <DocsSection title="Developer Reference">
        <div className="space-y-5">
          <TokenReference title="Quick Start Commands" description="Minimal setup for local development." code={QUICK_START_CODE}>
            <div className="space-y-2 font-mono text-sm">
              <div className="rounded-md border border-border bg-background px-3 py-2 text-foreground">npm install</div>
              <div className="rounded-md border border-border bg-background px-3 py-2 text-foreground">npm run build:tokens</div>
              <div className="rounded-md border border-border bg-background px-3 py-2 text-foreground">npm run storybook</div>
            </div>
          </TokenReference>

          <TokenReference title="Token Workflow" description="Style Dictionary token editing and generated CSS variable usage." code={TOKEN_WORKFLOW_CODE}>
            <div className="space-y-2 text-sm text-foreground">
              <p className="m-0">Edit token JSON in <code className="font-mono text-xs">tokens/</code>.</p>
              <p className="m-0">Generate CSS variables into <code className="font-mono text-xs">src/styles/variables.css</code>.</p>
              <p className="m-0 text-muted-foreground">Storybook and Vite dev scripts build tokens automatically before startup.</p>
            </div>
          </TokenReference>

          <TokenReference title="Roadmap Convention" description="Use consistent status labels and version notes in documentation." code={ROADMAP_CODE}>
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status="READY" />
              <StatusPill status="IN PROGRESS" />
              <span className="text-sm text-muted-foreground">Document status and version together for scanning.</span>
            </div>
          </TokenReference>
        </div>
      </DocsSection>
    </DocsPageFrame>
  )
}

