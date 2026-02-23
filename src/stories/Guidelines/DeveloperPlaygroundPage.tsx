import { useEffect, useMemo, useState } from "react"
import { BulletList, DocsPageFrame, DocsSection } from "../shared/DocsPageFrame"
import { TokenReference } from "../Foundations/TokenReference"
import { cssColorToHex, formatHslToken, readThemeTokenValues } from "@/lib/theme-tokens"

type WeightKey = "regular" | "semibold" | "bold"
type SizeKey = "sm" | "base" | "lg" | "xl"

const WEIGHT_CLASS: Record<WeightKey, string> = {
  regular: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
}

const SIZE_CLASS: Record<SizeKey, string> = {
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

const COLOR_TOKENS = ["background", "card", "primary", "secondary", "foreground", "muted-foreground", "border"] as const

const DTCG_EXAMPLE = `{
  "color": {
    "brand": {
      "primary": {
        "$value": "#f43f5e",
        "$type": "color",
        "$description": "Primary action and CTA color"
      }
    }
  }
}`

const BUILD_FLOW_EXAMPLE = `# Edit DTCG tokens
tokens/*.json

# Generate CSS variables
npm run build:tokens

# Consume in app / Storybook
import "./styles/variables.css";`

const SEMANTIC_EXAMPLE = `<section className="rounded-lg border border-border bg-card p-6">
  <h2 className="text-foreground font-semibold">Card title</h2>
  <p className="text-muted-foreground">Secondary supporting copy</p>
  <button className="bg-primary text-primary-foreground rounded-md px-3 py-2">
    Primary action
  </button>
</section>`

const DTCG_CONVERTER_SCRIPT = `function convertToDTCG(obj) {
  const newObj = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (key === 'value') newObj['$value'] = value;
      else if (key === 'type') newObj['$type'] = value;
      else if (key === 'description') newObj['$description'] = value;
      else if (key === 'comment') newObj['$description'] = value;
      else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        newObj[key] = convertToDTCG(value);
      } else {
        newObj[key] = value;
      }
    }
  }
  return newObj;
}`

const LEGACY_SAMPLE_JSON = `{
  "color": {
    "brand": {
      "primary": {
        "value": "#007bff",
        "type": "color",
        "comment": "Main brand identity color"
      }
    }
  }
}`

function TokenSwatch(props: { token: string; raw: string }) {
  const hslColor = props.raw ? formatHslToken(props.raw) : ""
  const hex = hslColor ? cssColorToHex(hslColor) : ""
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="h-10 rounded-md border border-border" style={{ backgroundColor: hslColor || undefined }} />
      <p className="m-0 mt-2 font-mono text-xs text-foreground">{`--${props.token}`}</p>
      <p className="m-0 mt-1 font-mono text-[11px] text-muted-foreground">{props.raw ? `hsl(${props.raw})` : "Resolving..."}</p>
      <p className="m-0 mt-1 font-mono text-[11px] text-muted-foreground">{hex || ""}</p>
    </div>
  )
}

function remToPx(value: string) {
  const match = value.trim().match(/^([0-9]*\\.?[0-9]+)rem$/)
  if (!match) return null
  return Math.round(Number(match[1]) * 16)
}

function cssVarNumber(name: string, fallback: number) {
  if (typeof document === "undefined") return fallback
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!value) return fallback
  const remPx = remToPx(value)
  if (remPx != null) return remPx
  const pxMatch = value.match(/^([0-9]*\\.?[0-9]+)px$/)
  if (pxMatch) return Number(pxMatch[1])
  const numeric = Number(value)
  return Number.isFinite(numeric) ? numeric : fallback
}

function convertToDTCG(obj: unknown): unknown {
  if (Array.isArray(obj) || obj === null || typeof obj !== "object") return obj

  const input = obj as Record<string, unknown>
  const next: Record<string, unknown> = {}

  for (const key in input) {
    if (!Object.prototype.hasOwnProperty.call(input, key)) continue
    const value = input[key]

    if (key === "value") next.$value = value
    else if (key === "type") next.$type = value
    else if (key === "description" || key === "comment") next.$description = value
    else if (typeof value === "object" && value !== null && !Array.isArray(value)) next[key] = convertToDTCG(value)
    else next[key] = value
  }

  return next
}

function ThemeModeComparisonPanel(props: { currentTokens: Record<string, string> }) {
  const light = readThemeTokenValues(COLOR_TOKENS, "light")
  const dark = readThemeTokenValues(COLOR_TOKENS, "dark")

  const modes = [
    { key: "light", label: "Light", wrapperClass: "", tokens: light },
    { key: "dark", label: "Dark", wrapperClass: "dark", tokens: dark },
  ] as const

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {modes.map((mode) => (
        <div key={mode.key} className={`${mode.wrapperClass} rounded-xl border border-border bg-background p-4`}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="m-0 text-sm font-semibold text-foreground">{mode.label} Mode</h3>
            <span className="font-mono text-xs text-muted-foreground">{mode.key}</span>
          </div>
          <div className="space-y-3">
            <section className="rounded-lg border border-border bg-card p-4">
              <h4 className="m-0 text-sm font-semibold text-foreground">Preview Card</h4>
              <p className="m-0 mt-1 text-xs text-muted-foreground">Theme token preview (`background`, `card`, `foreground`, `primary`).</p>
              <button className="mt-3 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Primary action</button>
            </section>
            <div className="grid grid-cols-2 gap-2">
              {(["background", "card", "foreground", "primary"] as const).map((token) => (
                <div key={`${mode.key}-${token}`} className="rounded-md border border-border bg-card p-2">
                  <div className="h-6 rounded border border-border" style={{ backgroundColor: formatHslToken(mode.tokens[token] || "") || undefined }} />
                  <p className="m-0 mt-1 font-mono text-[10px] text-foreground">{`--${token}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="lg:col-span-2 rounded-lg border border-border bg-card p-3">
        <p className="m-0 text-xs text-muted-foreground">
          Current Storybook theme token values are shown in the token inspector below. This panel renders both modes side-by-side for comparison without changing the toolbar theme.
        </p>
      </div>
    </div>
  )
}

function DTCGConverterSandbox() {
  const [input, setInput] = useState(LEGACY_SAMPLE_JSON)
  const [output, setOutput] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const parsed = JSON.parse(input)
      const converted = convertToDTCG(parsed)
      setOutput(JSON.stringify(converted, null, 2))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON")
      setOutput("")
    }
  }, [input])

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="block text-sm font-medium text-foreground">Legacy token JSON (input)</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[240px] w-full rounded-xl border border-border bg-card p-4 font-mono text-xs leading-6 text-foreground"
            spellCheck={false}
          />
        </label>
        <div className="space-y-2">
          <span className="block text-sm font-medium text-foreground">DTCG output (converted)</span>
          <div className="min-h-[240px] rounded-xl border border-border bg-card p-4">
            {error ? (
              <p className="m-0 text-sm text-warning">{error}</p>
            ) : (
              <pre className="overflow-x-auto font-mono text-xs leading-6 text-foreground">
                <code>{output}</code>
              </pre>
            )}
          </div>
        </div>
      </div>

      <TokenReference
        title="Converter Script (Legacy → DTCG)"
        description="Use this script in AI bridges before sending tokens to LLMs or Style Dictionary v4 when migrating legacy objects."
        code={DTCG_CONVERTER_SCRIPT}
      >
        <div className="space-y-2 text-sm">
          <p className="m-0 text-foreground">Maps legacy keys to DTCG core fields:</p>
          <ul className="m-0 list-disc pl-5 text-muted-foreground">
            <li><code className="font-mono text-xs">value</code> → <code className="font-mono text-xs">$value</code></li>
            <li><code className="font-mono text-xs">type</code> → <code className="font-mono text-xs">$type</code></li>
            <li><code className="font-mono text-xs">description/comment</code> → <code className="font-mono text-xs">$description</code></li>
          </ul>
        </div>
      </TokenReference>
    </div>
  )
}

function PlaygroundSurface() {
  const [weight, setWeight] = useState<WeightKey>("semibold")
  const [size, setSize] = useState<SizeKey>("base")
  const [padding, setPadding] = useState(16)
  const [radius, setRadius] = useState(12)
  const [gap, setGap] = useState(12)

  useEffect(() => {
    setPadding(cssVarNumber("--spacing-size-md", 16))
    setGap(cssVarNumber("--spacing-size-sm", 12))
    setRadius(cssVarNumber("--radius-lg", 12))
  }, [])

  const codeSnippet = useMemo(
    () => `<section className="rounded-lg border border-border bg-card" style={{ padding: "${padding}px", borderRadius: "${radius}px" }}>
  <h3 className="${SIZE_CLASS[size]} ${WEIGHT_CLASS[weight]} text-foreground"}>Preview title</h3>
  <p className="text-muted-foreground" style={{ marginTop: "${gap}px" }}>Secondary text</p>
  <button className="mt-4 rounded-md bg-primary px-3 py-2 text-primary-foreground">Primary action</button>
</section>`,
    [gap, padding, radius, size, weight],
  )

  return (
    <div className="space-y-5">
      <div className="grid gap-4 rounded-xl border border-border bg-card p-4 md:grid-cols-2">
        <label className="space-y-2 text-sm">
          <span className="block text-muted-foreground">Font Size</span>
          <select
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
            value={size}
            onChange={(e) => setSize(e.target.value as SizeKey)}
          >
            <option value="sm">sm</option>
            <option value="base">base</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
          </select>
        </label>

        <label className="space-y-2 text-sm">
          <span className="block text-muted-foreground">Weight</span>
          <div className="inline-flex w-full rounded-md border border-border bg-background p-1">
            {(["regular", "semibold", "bold"] as WeightKey[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setWeight(option)}
                className={
                  "flex-1 rounded px-2 py-1 text-xs capitalize " +
                  (weight === option ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")
                }
              >
                {option}
              </button>
            ))}
          </div>
        </label>

        <label className="space-y-2 text-sm">
          <span className="block text-muted-foreground">Padding ({padding}px) <span className="font-mono text-xs">--spacing-size-md</span></span>
          <input type="range" min={8} max={32} step={4} value={padding} onChange={(e) => setPadding(Number(e.target.value))} className="w-full" />
        </label>

        <label className="space-y-2 text-sm">
          <span className="block text-muted-foreground">Radius ({radius}px) <span className="font-mono text-xs">--radius-lg</span></span>
          <input type="range" min={4} max={24} step={2} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full" />
        </label>

        <label className="space-y-2 text-sm md:col-span-2">
          <span className="block text-muted-foreground">Text Gap ({gap}px) <span className="font-mono text-xs">--spacing-size-sm</span></span>
          <input type="range" min={4} max={24} step={2} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full" />
        </label>
      </div>

      <TokenReference title="Live Sandbox" description="Adjust controls and copy the implementation snippet." code={codeSnippet}>
        <section className="border border-border bg-background" style={{ padding, borderRadius: radius }}>
          <h3 className={`m-0 text-foreground ${SIZE_CLASS[size]} ${WEIGHT_CLASS[weight]}`}>Preview title</h3>
          <p className="m-0 text-sm text-muted-foreground" style={{ marginTop: gap }}>
            Secondary text using semantic foreground token.
          </p>
          <div className="mt-4 flex gap-3">
            <button className="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Primary action</button>
            <button className="rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground">Secondary</button>
          </div>
        </section>
      </TokenReference>
    </div>
  )
}

export function DeveloperPlaygroundPage() {
  const [tokenValues, setTokenValues] = useState<Record<string, string>>({})

  useEffect(() => {
    const load = () =>
      setTokenValues(readThemeTokenValues(COLOR_TOKENS, document.documentElement.classList.contains("dark") ? "dark" : "light"))

    load()
    const observer = new MutationObserver(load)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <DocsPageFrame
      title="Developer Playground"
      description="Interactive token sandbox for testing semantic classes, layout decisions, and implementation snippets before adding or updating foundations/components."
    >
      <DocsSection title="Usage Guidelines">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Test with semantics first:</span> Prefer token-backed classes (`bg-card`, `text-foreground`, `border-border`) over raw values.
            </>,
            <>
              <span className="font-semibold text-foreground">Validate both themes:</span> Use the Storybook theme toggle while testing previews and code snippets.
            </>,
            <>
              <span className="font-semibold text-foreground">Promote patterns from here:</span> Once stable, move snippets into Foundations pages with `TokenReference`.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Interactive Sandbox">
        <PlaygroundSurface />
      </DocsSection>

      <DocsSection title="Theme Mode Comparison">
        <ThemeModeComparisonPanel currentTokens={tokenValues} />
      </DocsSection>

      <DocsSection title="Current Theme Token Inspector">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COLOR_TOKENS.map((token) => (
            <TokenSwatch key={token} token={token} raw={tokenValues[token] || ""} />
          ))}
        </div>
      </DocsSection>

      <DocsSection title="Developer Reference">
        <div className="space-y-5">
          <TokenReference
            title="HTML Semantics vs Tokens"
            description="Use semantic HTML structure and apply semantic token utilities for styling."
            code={SEMANTIC_EXAMPLE}
          >
            <section className="rounded-lg border border-border bg-card p-5">
              <h3 className="m-0 text-base font-semibold text-foreground">Card title</h3>
              <p className="m-0 mt-2 text-sm text-muted-foreground">Secondary supporting copy</p>
              <button className="mt-4 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">Primary action</button>
            </section>
          </TokenReference>

          <TokenReference
            title="DTCG Token Format (Style Dictionary v4)"
            description="Preferred token authoring format for interoperability, AI tooling, and future Figma-to-code bridges."
            code={DTCG_EXAMPLE}
          >
            <div className="space-y-2 text-sm">
              <p className="m-0 text-foreground">Author tokens using DTCG keys: <code className="font-mono text-xs">$value</code>, <code className="font-mono text-xs">$type</code>, <code className="font-mono text-xs">$description</code>.</p>
              <p className="m-0 text-muted-foreground">This improves AI parsing reliability because token type metadata is explicit.</p>
            </div>
          </TokenReference>

          <TokenReference
            title="DTCG Why It Helps AI Bridges"
            description="Explicit token typing and metadata reduce ambiguity for LLM-assisted token generation and Figma-to-web mapping."
            code={`{
  "$value": "#007bff",
  "$type": "color",
  "$description": "Main brand identity color"
}`}
          >
            <div className="space-y-2 text-sm text-foreground">
              <p className="m-0">LLMs parse DTCG more reliably because token type metadata is explicit (`$type`).</p>
              <p className="m-0 text-muted-foreground">This improves conversion safety (e.g. spacing vs fontWeight vs color) and supports future Figma variable bridge automation.</p>
            </div>
          </TokenReference>

          <TokenReference
            title="Style Dictionary Build Flow"
            description="How tokens move from DTCG JSON into generated CSS variables used by Storybook and the app."
            code={BUILD_FLOW_EXAMPLE}
          >
            <div className="space-y-2 text-sm text-foreground">
              <p className="m-0">Source tokens live in <code className="font-mono text-xs">tokens/</code>.</p>
              <p className="m-0">Style Dictionary config is <code className="font-mono text-xs">config.json</code>.</p>
              <p className="m-0">Generated CSS variables are written to <code className="font-mono text-xs">src/styles/variables.css</code>.</p>
            </div>
          </TokenReference>
        </div>
      </DocsSection>

      <DocsSection title="Paste Token JSON Sandbox">
        <DTCGConverterSandbox />
      </DocsSection>
    </DocsPageFrame>
  )
}

export default DeveloperPlaygroundPage
