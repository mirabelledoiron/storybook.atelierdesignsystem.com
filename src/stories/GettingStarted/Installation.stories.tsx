import type { Meta, StoryObj } from "@storybook/react-vite"
import InstallationPage from "./InstallationPage"

const meta: Meta<typeof InstallationPage> = {
  title: "Getting Started/Installation",
  component: InstallationPage,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

type Story = StoryObj<typeof InstallationPage>

export const Default: Story = {
  render: () => <InstallationPage />,
}

