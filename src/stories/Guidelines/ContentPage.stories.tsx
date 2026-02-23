import type { Meta, StoryObj } from "@storybook/react-vite"
import ContentGuidelinePage from "./ContentGuidelinePage"

const meta: Meta<typeof ContentGuidelinePage> = {
  title: "Guidelines/Content",
  component: ContentGuidelinePage,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ContentGuidelinePage>
export const Default: Story = { render: () => <ContentGuidelinePage /> }

