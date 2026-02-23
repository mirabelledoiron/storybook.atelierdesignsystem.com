import { useEffect, useState } from "react"
import { formatHslToken, readThemeTokenValues, resolveCssColor } from "@/lib/theme-tokens"
import { TokenReference } from "./TokenReference"
import { BulletList, DocsPageFrame, DocsSection } from "../shared/DocsPageFrame"

type ColorToken = {
  label: string
  token: string
  utility: string
  semanticUse: string
}

const TOKENS: ColorToken[] = [
  { label: "Primary Action", token: "primary", utility: "bg-primary text-primary-foreground", semanticUse: "Primary buttons / CTAs" },
  { label: "Body Text", token: "foreground", utility: "text-foreground", semanticUse: "Default copy and headings" },
  { label: "Muted Text", token: "muted-foreground", utility: "text-muted-foreground", semanticUse: "Secondary/supporting text" },
  { label: "Surface", token: "card", utility: "bg-card", semanticUse: "Cards and contained sections" },
  { label: "Border", token: "border", utility: "border-border", semanticUse: "Dividers and strokes" },
  { label: "Accent", token: "secondary", utility: "bg-secondary text-secondary-foreground", semanticUse: "Highlights / success-adjacent accents" },
]

const TOKEN_REFERENCE_CODE = `<button className="bg-primary text-primary-foreground">Primary CTA</button>
<p className="text-foreground">Default body text</p>
<p className="text-muted-foreground">Supporting copy</p>
<section className="bg-card border border-border">Contained surface</section>`

const HTML_SEMANTICS_CODE = `<header>
  <h1 className="text-foreground">Page title</h1>
  <p className="text-muted-foreground">Supporting description</p>
</header>

<main>
  <section className="bg-card border border-border">
    <button className="bg-primary text-primary-foreground">Save changes</button>
  </section>
</main>`

function ColorRow(props: { item: ColorToken; raw?: string }) {
  const cssColor = props.raw ? formatHslToken(props.raw) : ""
  const hex = cssColor ? resolveCssColor(cssColor) : ""
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 rounded-lg border border-border bg-card p-4">
      <div className="h-10 w-10 rounded-md border border-border" style={{ backgroundColor: hex || undefined }} />
      <div className="min-w-0">
        <p className="m-0 text-sm font-semibold text-foreground">{props.item.label}</p>
        <p className="m-0 mt-1 text-xs text-muted-foreground">{props.item.semanticUse}</p>
        <p className="m-0 mt-2 font-mono text-xs text-foreground">{`--${props.item.token}`}</p>
        <p className="m-0 mt-1 font-mono text-xs text-muted-foreground">{props.raw ? `hsl(${props.raw})` : "Resolving..."}</p>
        <p className="m-0 mt-1 font-mono text-xs text-muted-foreground">{hex || ""}</p>
      </div>
    </div>
  )
}

export function ColorsFoundationPage() {
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    const tokenNames = TOKENS.map((t) => t.token)
    const load = () => setValues(readThemeTokenValues(tokenNames, document.documentElement.classList.contains("dark") ? "dark" : "light"))
    load()
    const observer = new MutationObserver(load)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <DocsPageFrame
      title="Colors"
      description="The Atelier color system is semantic-first. Developers should apply tokens by meaning (surface, text, action, border) rather than by hue."
    >
      <DocsSection title="Usage Guidelines">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Use semantic roles first:</span> Reach for tokens like `foreground`, `card`, and `primary` instead of hardcoded hex values.
            </>,
            <>
              <span className="font-semibold text-foreground">Respect hierarchy:</span> Use `text-foreground` for core content and `text-muted-foreground` for secondary details.
            </>,
            <>
              <span className="font-semibold text-foreground">Theme parity:</span> Always validate token pairings in both light and dark themes.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Best Practices">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Buttons and actions:</span> Prefer `bg-primary text-primary-foreground` for primary actions.
            </>,
            <>
              <span className="font-semibold text-foreground">Surfaces:</span> Use `bg-card` for contained surfaces and `bg-background` for page canvas.
            </>,
            <>
              <span className="font-semibold text-foreground">Semantics over style names:</span> Avoid naming implementation by color words like “blue text” in code.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Token Palette">
        <div className="grid gap-4 md:grid-cols-2">
          {TOKENS.map((item) => (
            <ColorRow key={item.token} item={item} raw={values[item.token]} />
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Token Reference">
        <div className="space-y-5">
          <TokenReference title="HTML Semantics vs Tokens" description="Apply semantic HTML first, then layer semantic color utilities." code={HTML_SEMANTICS_CODE}>
            <div className="space-y-3">
              <div>
                <h3 className="m-0 text-lg font-semibold text-foreground">Page title</h3>
                <p className="m-0 mt-1 text-sm text-muted-foreground">Supporting description</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="m-0 text-sm text-foreground">Contained surface with semantic border token.</p>
                <button className="mt-3 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Save changes</button>
              </div>
            </div>
          </TokenReference>

          <TokenReference title="Color Utility Mapping" description="Direct mapping from common UI roles to Atelier utility classes." code={TOKEN_REFERENCE_CODE}>
            <div className="grid gap-3">
              {TOKENS.slice(0, 4).map((item) => (
                <div key={item.token} className="flex items-center justify-between gap-3 rounded-md border border-border bg-background p-3">
                  <div>
                    <p className="m-0 text-sm font-medium text-foreground">{item.label}</p>
                    <p className="m-0 mt-1 text-xs text-muted-foreground">{item.semanticUse}</p>
                  </div>
                  <code className="font-mono text-xs text-foreground">{item.utility}</code>
                </div>
              ))}
            </div>
          </TokenReference>
        </div>
      </DocsSection>
    </DocsPageFrame>
  )
}

export default ColorsFoundationPage

