import type { Meta, StoryObj } from "@storybook/react-vite"
import ColorsFoundationPage from "./ColorsFoundationPage"

const meta: Meta<typeof ColorsFoundationPage> = {
  title: "Foundations/Colors",
  component: ColorsFoundationPage,
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof ColorsFoundationPage>

export const Default: Story = { render: () => <ColorsFoundationPage /> }

