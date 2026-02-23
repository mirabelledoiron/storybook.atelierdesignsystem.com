import { TokenReference } from "./TokenReference"
import { BulletList, DocsPageFrame, DocsSection } from "../shared/DocsPageFrame"

const SPACING_ROWS = [
  { token: "--size-spacing-md", rem: "1rem", px: 16, utility: "gap-4 / p-4" },
  { token: "--size-spacing-lg", rem: "1.5rem", px: 24, utility: "gap-6 / p-6" },
  { token: "Tailwind scale", rem: "0.5rem", px: 8, utility: "gap-2 / space-y-2" },
  { token: "Tailwind scale", rem: "2rem", px: 32, utility: "gap-8 / p-8" },
]

const STACK_CODE = `<div className="space-y-4">
  <h3>Heading</h3>
  <p>Body copy</p>
  <div className="flex gap-4">...</div>
</div>`

const SEMANTIC_CODE = `/* CSS variables */
padding: var(--size-spacing-md);
gap: var(--size-spacing-lg);

/* Tailwind utilities */
className="p-4 gap-6 space-y-4"`

export function SpacingFoundationPage() {
  return (
    <DocsPageFrame
      title="Spacing"
      description="Atelier spacing is based on a predictable scale. Use spacing tokens and utilities consistently to preserve rhythm across components and page layouts."
    >
      <DocsSection title="Usage Guidelines">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Use consistent scales:</span> Prefer repeated spacing values over one-off pixel numbers.
            </>,
            <>
              <span className="font-semibold text-foreground">Choose the right relationship utility:</span> Use `gap-*` for peers, `space-y-*` for vertical stacks, and padding for internal insets.
            </>,
            <>
              <span className="font-semibold text-foreground">Scale by hierarchy:</span> Internal component spacing should be tighter than page section spacing.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Best Practices">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Avoid mixing patterns:</span> Don’t combine `gap` and child margins for the same layout relationship.
            </>,
            <>
              <span className="font-semibold text-foreground">Favor semantic tokens for reusable layouts:</span> Use CSS custom props where the spacing has design meaning.
            </>,
            <>
              <span className="font-semibold text-foreground">Preview in multiple breakpoints:</span> Spacing that works on desktop can feel too loose on mobile.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Spacing Scale">
        <div className="space-y-3">
          {SPACING_ROWS.map((row, index) => (
            <div key={`${row.token}-${index}`} className="grid grid-cols-[180px_1fr_auto] items-center gap-4 rounded-lg border border-border bg-card p-4">
              <code className="font-mono text-xs text-foreground">{row.token}</code>
              <div>
                <div className="h-3 rounded-full bg-border/60">
                  <div className="h-3 rounded-full bg-primary" style={{ width: row.rem }} />
                </div>
                <p className="m-0 mt-2 text-xs text-muted-foreground">{row.utility}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{`${row.rem} (${row.px}px)`}</span>
            </div>
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Token Reference">
        <div className="space-y-5">
          <TokenReference title="Stack Spacing" description="Use `space-y-*` for vertical flows with equal spacing between siblings." code={STACK_CODE}>
            <div className="space-y-4 rounded-lg border border-border bg-background p-4">
              <div className="rounded-md bg-card p-3 text-sm text-foreground">Heading block</div>
              <div className="rounded-md bg-card p-3 text-sm text-muted-foreground">Body copy block</div>
              <div className="flex gap-4">
                <div className="rounded-md bg-card px-3 py-2 text-xs text-foreground">Action</div>
                <div className="rounded-md bg-card px-3 py-2 text-xs text-foreground">Secondary</div>
              </div>
            </div>
          </TokenReference>

          <TokenReference title="Developer Reference" description="CSS variables and Tailwind utility mapping for common spacing patterns." code={SEMANTIC_CODE}>
            <div className="space-y-2 font-mono text-xs text-foreground">
              <div>Inset padding: <span className="text-muted-foreground">var(--size-spacing-md)</span></div>
              <div>Section gap: <span className="text-muted-foreground">var(--size-spacing-lg)</span></div>
              <div>Tailwind utilities: <span className="text-muted-foreground">p-4 gap-6 space-y-4</span></div>
            </div>
          </TokenReference>
        </div>
      </DocsSection>
    </DocsPageFrame>
  )
}

export default SpacingFoundationPage

