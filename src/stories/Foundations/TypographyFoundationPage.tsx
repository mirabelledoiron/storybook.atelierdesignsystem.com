import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { readThemeTokenValues } from "@/lib/theme-tokens"
import { TokenReference } from "./TokenReference"

const TOKEN_NAMES = ["font-sans-family", "font-mono-family"] as const

const WEIGHTS = {
  regular: { label: "Regular", className: "font-normal", cssWeight: 400 },
  semibold: { label: "Semibold", className: "font-semibold", cssWeight: 600 },
  bold: { label: "Bold", className: "font-bold", cssWeight: 700 },
} as const

type WeightKey = keyof typeof WEIGHTS
type TypeScaleRow = {
  token: string
  rem: string
  px: number
  className: string
  cssVar: string
}

const TYPE_SCALE_ROWS: TypeScaleRow[] = [
  { token: "xs", rem: "0.75rem", px: 12, className: "text-xs", cssVar: "--typography-size-xs" },
  { token: "sm", rem: "0.875rem", px: 14, className: "text-sm", cssVar: "--typography-size-sm" },
  { token: "base", rem: "1rem", px: 16, className: "text-base", cssVar: "--typography-size-base" },
  { token: "lg", rem: "1.125rem", px: 18, className: "text-lg", cssVar: "--typography-size-lg" },
  { token: "xl", rem: "1.25rem", px: 20, className: "text-xl", cssVar: "--typography-size-xl" },
]

const HEADINGS_MAPPING = `<h1 className="text-4xl font-bold">Heading 1</h1>
<h2 className="text-3xl font-semibold">Heading 2</h2>
<h3 className="text-2xl font-semibold">Heading 3</h3>
<h4 className="text-xl font-medium">Heading 4</h4>
<h5 className="text-lg font-medium">Heading 5</h5>
<h6 className="text-base font-medium">Heading 6</h6>`

const BODY_TEXT_MAPPING = `<p className="text-base">Regular paragraph text</p>
<p className="text-sm">Small text</p>
<p className="text-xs">Extra small text</p>`

function Divider() {
  return <div className="h-px w-full bg-border/70" />
}

function SectionTitle(props: { title: string }) {
  return <h2 className="m-0 text-2xl font-semibold text-foreground">{props.title}</h2>
}

async function copyText(text: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }

  if (typeof document !== "undefined") {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.setAttribute("readonly", "")
    textarea.style.position = "absolute"
    textarea.style.left = "-9999px"
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }
}

function TypeScalePreview() {
  const [weight, setWeight] = useState<WeightKey>("regular")
  const [copied, setCopied] = useState<string | null>(null)

  const option = WEIGHTS[weight]

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(null), 1200)
    return () => window.clearTimeout(id)
  }, [copied])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-2.5">
        <span className="text-sm text-muted-foreground">Preview weight</span>
        <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1">
          {(Object.entries(WEIGHTS) as [WeightKey, (typeof WEIGHTS)[WeightKey]][]).map(([key, value]) => {
            const active = key === weight
            return (
              <button
                key={key}
                type="button"
                onClick={() => setWeight(key)}
                className={
                  "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium transition-colors " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground")
                }
                aria-pressed={active}
              >
                {value.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-0">
        {TYPE_SCALE_ROWS.map((row, index) => {
          const utilityClass = `${row.className} ${option.className}`
          const isCopied = copied === utilityClass
          return (
            <div key={row.token} className={index > 0 ? "border-t border-border" : undefined}>
              <div className="flex items-start justify-between gap-4 py-5">
                <div className="min-w-0">
                  <p className="m-0 text-sm text-muted-foreground">
                    {row.token}—{row.rem} ({row.px}px)
                  </p>
                  <p
                    className={`mt-1 m-0 leading-tight text-foreground ${row.className} ${option.className}`}
                    style={{ fontFamily: "var(--font-sans-family)", fontSize: `var(${row.cssVar})` }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <p className="mt-1 m-0 font-mono text-[11px] text-muted-foreground">
                    {utilityClass} ({option.cssWeight})
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0 h-7 rounded-md px-2.5 text-xs"
                  onClick={async () => {
                    await copyText(utilityClass)
                    setCopied(utilityClass)
                  }}
                >
                  {isCopied ? "Copied" : "Copy class"}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function TypographyFoundationPage() {
  const [tokenValues, setTokenValues] = useState<Record<string, string>>({})

  useEffect(() => {
    const load = () => {
      setTokenValues(readThemeTokenValues(TOKEN_NAMES, document.documentElement.classList.contains("dark") ? "dark" : "light"))
    }

    load()

    const observer = new MutationObserver(load)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full bg-sidebar-background p-6 md:p-10">
      <div className="mx-auto w-full max-w-[980px] bg-background">
        <div className="space-y-8 px-6 py-6 md:space-y-10 md:px-10 md:py-10">
        <section className="space-y-4">
          <h1 className="m-0 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">Typography</h1>
          <p className="m-0 max-w-4xl text-base leading-8 text-muted-foreground">
            Typography is a key element of the Atelier Design System, using Inter as the primary font family.
          </p>
        </section>

        <section className="space-y-4">
          <SectionTitle title="Usage Guidelines" />
          <Divider />
          <ul className="m-0 pl-6 space-y-3 text-sm leading-6 text-muted-foreground md:text-base">
            <li>
              <span className="font-semibold text-foreground">Hierarchy First:</span> Use your type scale tokens to lead the user through content logically.
            </li>
            <li>
              <span className="font-semibold text-foreground">Line Height:</span> Rely on the system’s proportional line-height for readability. Avoid overriding{" "}
              <code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-xs text-foreground">line-height</code> manually.
            </li>
            <li>
              <span className="font-semibold text-foreground">Weight Usage:</span> Use Bold (700/800) for emphasis and headers, and Regular (400) for body copy to reduce visual noise.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <SectionTitle title="Best Practices" />
          <Divider />
          <ul className="m-0 pl-6 space-y-3 text-sm leading-6 text-muted-foreground md:text-base">
            <li>
              <span className="font-semibold text-foreground">Limit Typefaces:</span> Stick to the primary system font for most of the UI. Reserve Monospace for technical data and code.
            </li>
            <li>
              <span className="font-semibold text-foreground">Readable Widths:</span> For long-form body text, keep line lengths comfortable (avoid overly wide paragraphs).
            </li>
            <li>
              <span className="font-semibold text-foreground">Contrast:</span> Use text color tokens (e.g. default vs muted) to reflect importance and hierarchy.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <SectionTitle title="Font Family" />
          <Divider />
          <ul className="m-0 pl-6 space-y-3 text-sm leading-6 text-muted-foreground md:text-base">
            <li>
              <span className="font-semibold text-foreground">Primary:</span> Inter (system-ui fallback)
              <div className="mt-1 font-mono text-xs text-muted-foreground">--font-sans-family: {tokenValues["font-sans-family"] || "Resolving..."}</div>
            </li>
            <li>
              <span className="font-semibold text-foreground">Monospace:</span> Fira Code, monospace
              <div className="mt-1 font-mono text-xs text-muted-foreground">--font-mono-family: {tokenValues["font-mono-family"] || "Resolving..."}</div>
            </li>
          </ul>
        </section>

        <section className="space-y-4 pb-1">
          <SectionTitle title="Type Scale" />
          <Divider />
          <TypeScalePreview />
        </section>

        <section className="space-y-4 pb-1">
          <SectionTitle title="Token Reference" />
          <Divider />
          <div className="space-y-5">
            <TokenReference title="Headings" code={HEADINGS_MAPPING}>
              <div className="space-y-2" style={{ fontFamily: "var(--font-sans-family)" }}>
                <h1 className="m-0 text-4xl font-bold text-foreground">Heading 1</h1>
                <h2 className="m-0 text-3xl font-semibold text-foreground">Heading 2</h2>
                <h3 className="m-0 text-2xl font-semibold text-foreground">Heading 3</h3>
                <h4 className="m-0 text-xl font-medium text-foreground">Heading 4</h4>
                <h5 className="m-0 text-lg font-medium text-foreground">Heading 5</h5>
                <h6 className="m-0 text-base font-medium text-foreground">Heading 6</h6>
              </div>
            </TokenReference>

            <TokenReference title="Body Text" description="Standard scales for long-form reading." code={BODY_TEXT_MAPPING}>
              <div className="space-y-2" style={{ fontFamily: "var(--font-sans-family)" }}>
                <p className="m-0 text-base text-foreground">Regular paragraph text</p>
                <p className="m-0 text-sm text-muted-foreground">Small text</p>
                <p className="m-0 text-xs text-muted-foreground">Extra small text</p>
              </div>
            </TokenReference>
          </div>
        </section>
        </div>
      </div>
    </div>
  )
}
