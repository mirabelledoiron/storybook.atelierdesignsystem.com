import type { Meta, StoryObj } from "@storybook/react-vite"
import SpacingFoundationPage from "./SpacingFoundationPage"

const meta: Meta<typeof SpacingFoundationPage> = {
  title: "Foundations/Spacing",
  component: SpacingFoundationPage,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof SpacingFoundationPage>
export const Default: Story = { render: () => <SpacingFoundationPage /> }

