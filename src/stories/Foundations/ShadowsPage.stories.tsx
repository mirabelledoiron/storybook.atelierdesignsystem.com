import type { Meta, StoryObj } from "@storybook/react-vite"
import ShadowsFoundationPage from "./ShadowsFoundationPage"

const meta: Meta<typeof ShadowsFoundationPage> = {
  title: "Foundations/Shadows",
  component: ShadowsFoundationPage,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ShadowsFoundationPage>
export const Default: Story = { render: () => <ShadowsFoundationPage /> }

