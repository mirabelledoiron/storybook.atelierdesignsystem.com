import { TokenReference } from "./TokenReference"
import { BulletList, DocsPageFrame, DocsSection } from "../shared/DocsPageFrame"

const SHADOWS = [
  { name: "shadow-sm", description: "Subtle elevation for compact surfaces" },
  { name: "shadow-md", description: "Default raised surface" },
  { name: "shadow-lg", description: "Prominent cards and overlays" },
  { name: "shadow-2xl", description: "Hero or spotlight treatment" },
]

const SHADOW_CODE = `<div className="shadow-sm">Subtle</div>
<div className="shadow-md">Default</div>
<div className="shadow-lg">Elevated</div>
<div className="shadow-2xl">Hero</div>`

const FOCUS_CODE = `<button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Accessible focus
</button>`

export function ShadowsFoundationPage() {
  return (
    <DocsPageFrame
      title="Shadows"
      description="Shadows and focus rings provide depth cues and interaction affordances. Use them sparingly and consistently."
    >
      <DocsSection title="Usage Guidelines">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Use elevation to signal hierarchy:</span> Higher shadows should indicate floating or prioritized surfaces.
            </>,
            <>
              <span className="font-semibold text-foreground">Keep contrast in mind:</span> Shadows read differently in dark and light themes.
            </>,
            <>
              <span className="font-semibold text-foreground">Don’t replace focus styles:</span> Use focus rings for accessibility, not just shadows.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Shadow Scale">
        <div className="grid gap-4 md:grid-cols-2">
          {SHADOWS.map((shadow) => (
            <div key={shadow.name} className="rounded-xl border border-border bg-card p-5">
              <div className={`rounded-lg border border-border bg-background p-5 ${shadow.name}`}>
                <p className="m-0 font-mono text-xs text-foreground">{shadow.name}</p>
              </div>
              <p className="m-0 mt-3 text-sm text-muted-foreground">{shadow.description}</p>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Token Reference">
        <div className="space-y-5">
          <TokenReference title="Shadow Utilities" description="Common elevation classes for component surfaces." code={SHADOW_CODE}>
            <div className="grid gap-3 sm:grid-cols-2">
              {SHADOWS.map((shadow) => (
                <div key={`preview-${shadow.name}`} className={`rounded-md border border-border bg-background p-4 text-xs text-foreground ${shadow.name}`}>
                  {shadow.name}
                </div>
              ))}
            </div>
          </TokenReference>

          <TokenReference title="Focus Ring (Accessibility)" description="Focus rings should remain visible in both themes." code={FOCUS_CODE}>
            <div className="flex gap-3">
              <button className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground ring-2 ring-ring ring-offset-2 ring-offset-background">
                Focus ring
              </button>
              <button className="rounded-md bg-card px-3 py-2 text-xs font-semibold text-foreground ring-2 ring-primary/40 ring-offset-2 ring-offset-background">
                Subtle ring
              </button>
            </div>
          </TokenReference>
        </div>
      </DocsSection>
    </DocsPageFrame>
  )
}

export default ShadowsFoundationPage

