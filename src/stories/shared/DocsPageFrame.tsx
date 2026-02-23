import type { PropsWithChildren, ReactNode } from "react"

export function DocsPageFrame({ title, description, children }: PropsWithChildren<{ title: string; description: string }>) {
  return (
    <div className="w-full bg-sidebar-background p-6 md:p-10">
      <div className="mx-auto w-full max-w-[980px] bg-background">
        <div className="space-y-8 px-6 py-6 md:space-y-10 md:px-10 md:py-10">
          <section className="space-y-4">
            <h1 className="m-0 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">{title}</h1>
            <p className="m-0 max-w-4xl text-base leading-8 text-muted-foreground">{description}</p>
          </section>
          {children}
        </div>
      </div>
    </div>
  )
}

export function DocsSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="space-y-4">
      <h2 className="m-0 text-2xl font-semibold text-foreground">{title}</h2>
      <Divider />
      {children}
    </section>
  )
}

export function Divider() {
  return <div className="h-px w-full bg-border/70" />
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="m-0 pl-6 space-y-3 text-sm leading-6 text-muted-foreground md:text-base">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

