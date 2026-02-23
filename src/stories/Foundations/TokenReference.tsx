import { useEffect, useState, type ReactNode } from "react"

type TokenReferenceProps = {
  title: string
  description?: string
  code: string
  children: ReactNode
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

export function TokenReference({ title, description, code, children }: TokenReferenceProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1200)
    return () => window.clearTimeout(id)
  }, [copied])

  return (
    <section className="space-y-3">
      <div>
        <h3 className="m-0 text-lg font-medium text-foreground">{title}</h3>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="border-b border-border bg-card/70 p-5">{children}</div>

        <div className="relative group bg-[hsl(var(--sidebar-background))]/55 p-4">
          <pre
            tabIndex={0}
            aria-label={`${title} token reference`}
            className="overflow-x-auto font-mono text-xs leading-6 text-foreground focus-visible:outline-none"
          >
            <code>{code}</code>
          </pre>
          <button
            type="button"
            onClick={async () => {
              await copyText(code)
              setCopied(true)
            }}
            className="absolute right-3 top-3 rounded-md border border-border bg-background/90 px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 group-focus-within:opacity-100"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </section>
  )
}

