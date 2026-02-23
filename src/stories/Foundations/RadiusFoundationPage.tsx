import { TokenReference } from "./TokenReference"
import { BulletList, DocsPageFrame, DocsSection } from "../shared/DocsPageFrame"

const RADIUS_ROWS = [
  { token: "--radius", value: "0.75rem", utility: "rounded-lg", preview: "rounded-lg" },
  { token: "calc(var(--radius) - 2px)", value: "0.625rem", utility: "rounded-md", preview: "rounded-md" },
  { token: "calc(var(--radius) - 4px)", value: "0.5rem", utility: "rounded-sm", preview: "rounded-sm" },
]

const MAPPING_CODE = `<div className="rounded-lg border bg-card p-4">Card surface</div>
<input className="rounded-md border px-3 py-2" />
<span className="rounded-sm border px-2 py-1">Badge</span>`

export function RadiusFoundationPage() {
  return (
    <DocsPageFrame
      title="Border Radius"
      description="Radius tokens help maintain a consistent shape language across surfaces, controls, and compact UI elements."
    >
      <DocsSection title="Usage Guidelines">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Hierarchy first:</span> Parent surfaces should usually have equal or larger radii than nested controls.
            </>,
            <>
              <span className="font-semibold text-foreground">Use token math:</span> Prefer `rounded-lg`, `rounded-md`, and `rounded-sm` over arbitrary values.
            </>,
            <>
              <span className="font-semibold text-foreground">Keep consistency in flows:</span> Forms and card stacks should use a small set of repeating radii.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Radius Scale">
        <div className="grid gap-4 md:grid-cols-3">
          {RADIUS_ROWS.map((row) => (
            <div key={row.utility} className="rounded-xl border border-border bg-card p-4">
              <div className="grid h-24 place-items-center rounded-lg border border-border bg-background">
                <div className={`h-14 w-20 border border-primary/40 bg-primary/10 ${row.preview}`} />
              </div>
              <p className="m-0 mt-3 font-mono text-xs text-foreground">{row.utility}</p>
              <p className="m-0 mt-1 text-xs text-muted-foreground">{row.token}</p>
              <p className="m-0 mt-1 text-xs text-muted-foreground">{row.value}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Token Reference">
        <TokenReference title="Radius Utility Mapping" description="Recommended utilities by component role." code={MAPPING_CODE}>
          <div className="grid gap-3">
            <div className="rounded-lg border border-border bg-background p-4 text-sm text-foreground">Card / Panel → `rounded-lg`</div>
            <div className="rounded-md border border-border bg-background p-4 text-sm text-foreground">Input / Field → `rounded-md`</div>
            <div className="rounded-sm border border-border bg-background p-4 text-sm text-foreground">Badge / Tag → `rounded-sm`</div>
          </div>
        </TokenReference>
      </DocsSection>
    </DocsPageFrame>
  )
}

export default RadiusFoundationPage

