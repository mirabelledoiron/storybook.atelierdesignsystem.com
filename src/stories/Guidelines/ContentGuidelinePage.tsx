import { TokenReference } from "../Foundations/TokenReference"
import { BulletList, DocsPageFrame, DocsSection } from "../shared/DocsPageFrame"

const CONTENT_STRUCTURE_CODE = `<header>
  <h1>Clear title</h1>
  <p className="text-muted-foreground">Context and intent</p>
</header>

<section>
  <h2>Section heading</h2>
  <p>Body content...</p>
</section>`

const TONE_CODE = `<p className="text-foreground">Primary guidance and required information.</p>
<p className="text-muted-foreground">Secondary explanation or supporting context.</p>`

export function ContentGuidelinePage() {
  return (
    <DocsPageFrame
      title="Content"
      description="Content guidelines help teams write UI copy that is clear, consistent, and aligned with product intent."
    >
      <DocsSection title="Usage Guidelines">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Be clear first:</span> Prioritize clarity and actionability over brand voice flourishes.
            </>,
            <>
              <span className="font-semibold text-foreground">Keep hierarchy explicit:</span> Titles, labels, and helper text should each have one role.
            </>,
            <>
              <span className="font-semibold text-foreground">Write for scanning:</span> Use short sentences, bullets, and descriptive headings.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Best Practices">
        <BulletList
          items={[
            <>
              <span className="font-semibold text-foreground">Use plain language:</span> Avoid internal jargon in user-facing copy.
            </>,
            <>
              <span className="font-semibold text-foreground">Use muted text intentionally:</span> Reserve secondary styling for supporting information, not primary instructions.
            </>,
            <>
              <span className="font-semibold text-foreground">Match component state:</span> Success, warning, and destructive messages should align with semantic UI states.
            </>,
          ]}
        />
      </DocsSection>

      <DocsSection title="Developer Reference">
        <div className="space-y-5">
          <TokenReference title="Content Structure" description="Use semantic HTML structure before applying utility classes." code={CONTENT_STRUCTURE_CODE}>
            <div className="space-y-4">
              <header>
                <h3 className="m-0 text-lg font-semibold text-foreground">Clear title</h3>
                <p className="m-0 mt-1 text-sm text-muted-foreground">Context and intent</p>
              </header>
              <section>
                <h4 className="m-0 text-base font-semibold text-foreground">Section heading</h4>
                <p className="m-0 mt-2 text-sm text-foreground">Body content written for quick scanning and clear action.</p>
              </section>
            </div>
          </TokenReference>

          <TokenReference title="Tone + Visual Hierarchy" description="Map writing priority to typography and color tokens." code={TONE_CODE}>
            <div className="space-y-2">
              <p className="m-0 text-sm text-foreground">Primary guidance and required information.</p>
              <p className="m-0 text-sm text-muted-foreground">Secondary explanation or supporting context.</p>
            </div>
          </TokenReference>
        </div>
      </DocsSection>
    </DocsPageFrame>
  )
}

export default ContentGuidelinePage

