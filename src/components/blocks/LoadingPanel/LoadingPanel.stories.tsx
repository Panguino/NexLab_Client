import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryObj } from '@storybook/react'
import LoadingPanel from './LoadingPanel'

/**
 * The CloseButton component is used to have a consistent Close button throughout the app.
 */
const meta: Meta<typeof LoadingPanel> = {
	title: 'Components/LoadingPanel',
	component: LoadingPanel,
	decorators: [(Story) => <Providers>{Story()}</Providers>],
}

export default meta

type Story = StoryObj<typeof LoadingPanel>

export const Default: Story = {
	args: {},
}
