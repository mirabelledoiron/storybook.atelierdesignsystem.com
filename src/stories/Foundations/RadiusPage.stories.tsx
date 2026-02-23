import type { Meta, StoryObj } from "@storybook/react-vite"
import RadiusFoundationPage from "./RadiusFoundationPage"

const meta: Meta<typeof RadiusFoundationPage> = {
  title: "Foundations/Border Radius",
  component: RadiusFoundationPage,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof RadiusFoundationPage>
export const Default: Story = { render: () => <RadiusFoundationPage /> }

