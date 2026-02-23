import type { Meta, StoryObj } from "@storybook/react-vite"
import { TypographyFoundationPage } from "./TypographyFoundationPage"

const meta: Meta<typeof TypographyFoundationPage> = {
  title: "Foundations/Typography",
  component: TypographyFoundationPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "TSX-based Foundations page using real Atelier CSS variables generated via Style Dictionary.",
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof TypographyFoundationPage>

export const Preview: Story = {
  render: () => <TypographyFoundationPage />,
}
