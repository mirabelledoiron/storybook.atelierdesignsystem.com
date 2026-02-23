import type { Meta, StoryObj } from "@storybook/react-vite"
import DeveloperPlaygroundPage from "./DeveloperPlaygroundPage"

const meta: Meta<typeof DeveloperPlaygroundPage> = {
  title: "Guidelines/Developer Playground",
  component: DeveloperPlaygroundPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Interactive sandbox for testing semantic token usage, theme behavior, and implementation snippets.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof DeveloperPlaygroundPage>

export const Default: Story = {
  render: () => <DeveloperPlaygroundPage />,
}

