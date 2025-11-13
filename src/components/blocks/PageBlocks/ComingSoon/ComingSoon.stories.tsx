import type { Meta, StoryFn } from '@storybook/react'
import { ComingSoon } from './ComingSoon'

export default {
	title: 'Page Blocks/ComingSoon',
	component: ComingSoon,
} as Meta<typeof ComingSoon>

const Template: StoryFn<typeof ComingSoon> = (args) => <ComingSoon {...args} />

export const Basic = Template.bind({})
Basic.args = {
	pageName: 'Text Products',
	purpose: 'Curated NWS text products with filtering and quick access.',
}

export const FullWidth = Template.bind({})
FullWidth.args = {
	pageName: 'Forecast Models',
	purpose: 'Select and compare model guidance at a glance.',
	fullWidth: true,
	etaText: 'ETA: Fall 2025',
}
