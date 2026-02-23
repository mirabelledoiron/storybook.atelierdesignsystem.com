import type { Meta, StoryObj } from "@storybook/react-vite"
import Welcome from "./WelcomePage"

const meta: Meta<typeof Welcome> = {
  title: "Getting Started/Welcome",
  component: Welcome,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Welcome page for the Atelier Design System Storybook.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Welcome>

export const Default: Story = {
  render: () => <Welcome />,
}
