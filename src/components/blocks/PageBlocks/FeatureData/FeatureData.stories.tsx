import type { Meta, StoryFn } from '@storybook/react'
import { FeatureData } from './FeatureData'

export default {
	title: 'Page Blocks/FeatureData',
	component: FeatureData,
} as Meta<typeof FeatureData>

const Template: StoryFn<typeof FeatureData> = (args) => <FeatureData {...args} />

export const Default = Template.bind({})
Default.args = {
	introText: 'Explore data features:',
	panels: [
		{
			id: '1',
			title: 'Panel One',
			description: 'Panel one description.',
			background: { url: 'https://picsum.photos/600/400' },
			mainButton: { label: 'Open', link: '/' },
			buttonsTitle: 'More',
			buttons: [
				{ label: 'Docs', link: '/' },
				{ label: 'API', link: '/' },
			],
		},
		{
			id: '2',
			title: 'Panel Two',
			description: 'Panel two description.',
			background: { url: 'https://picsum.photos/601/401' },
			mainButton: { label: 'Open', link: '/' },
		},
	],
}
