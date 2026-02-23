import { TokenReference } from "../Foundations/TokenReference"
import { BulletList, DocsPageFrame, DocsSection } from "../shared/DocsPageFrame"

const INSTALL_CODE = `npm install
npm run build:tokens
npm run storybook`

const APP_SETUP_CODE = `// src/main.tsx
import "./styles/variables.css";
import "./index.css";`

const COMPONENT_USAGE_CODE = `export function ExampleCard() {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-foreground font-semibold">Title</h2>
      <p className="text-muted-foreground">Uses semantic tokens and utilities.</p>
      <button className="mt-4 rounded-md bg-primary px-3 py-2 text-primary-foreground">
        Primary action
      </button>
    </section>
  );
}`

export function InstallationPage() {
  return (
    <DocsPageFrame
      title="Installation"
      description="Set up the Atelier Design System Storybook locally, generate tokens with Style Dictionary, and start building against semantic CSS variables."
    >
      <DocsSection title="Usage Guidelines">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Generate tokens first:</span> Run the token build before Storybook or app development so CSS variables are current.
            </>,
            <>
              <span className="font-semibold text-foreground">Use semantic utilities:</span> Prefer token-backed classes like `bg-card`, `text-foreground`, and `border-border`.
            </>,
            <>
              <span className="font-semibold text-foreground">Validate both themes:</span> Check light and dark modes after setup to confirm token imports and theme switching.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Best Practices">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Keep tokens generated in source control if needed:</span> Generated CSS can make onboarding easier for contributors.
            </>,
            <>
              <span className="font-semibold text-foreground">Avoid hardcoded colors/spacings in examples:</span> Use semantic token classes to keep docs aligned with production.
            </>,
            <>
              <span className="font-semibold text-foreground">Use Storybook as the verification layer:</span> Confirm visual behavior in the docs before shipping components.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Quick Start">
        <TokenReference
          title="Install + Run"
          description="Minimal local setup for developers working on the Atelier Storybook."
          code={INSTALL_CODE}
        >
          <div className="space-y-2 font-mono text-sm">
            <div className="rounded-md border border-border bg-background px-3 py-2 text-foreground">npm install</div>
            <div className="rounded-md border border-border bg-background px-3 py-2 text-foreground">npm run build:tokens</div>
            <div className="rounded-md border border-border bg-background px-3 py-2 text-foreground">npm run storybook</div>
          </div>
        </TokenReference>
      </DocsSection>

      <DocsSection title="Developer Reference">
        <div className="space-y-5">
          <TokenReference
            title="Token CSS Import"
            description="Import generated Style Dictionary variables before your main styles."
            code={APP_SETUP_CODE}
          >
            <div className="rounded-md border border-border bg-background p-4">
              <p className="m-0 text-sm text-foreground">Generated token variables are available globally via:</p>
              <code className="mt-2 block font-mono text-xs text-muted-foreground">src/styles/variables.css</code>
            </div>
          </TokenReference>

          <TokenReference
            title="Semantic Token Usage"
            description="Example component using semantic utilities instead of hardcoded values."
            code={COMPONENT_USAGE_CODE}
          >
            <section className="rounded-lg border border-border bg-card p-6">
              <h3 className="m-0 text-base font-semibold text-foreground">Title</h3>
              <p className="m-0 mt-2 text-sm text-muted-foreground">Uses semantic tokens and utilities.</p>
              <button className="mt-4 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
                Primary action
              </button>
            </section>
          </TokenReference>
        </div>
      </DocsSection>
    </DocsPageFrame>
  )
}

export default InstallationPage

