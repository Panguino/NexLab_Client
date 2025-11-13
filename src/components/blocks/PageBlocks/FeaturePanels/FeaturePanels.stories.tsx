import buttonStyles from '@/styles/buttonStyles.module.scss'
import type { Meta, StoryFn } from '@storybook/react'
import { FeaturePanels } from './FeaturePanels'

export default {
	title: 'Page Blocks/FeaturePanels',
	component: FeaturePanels,
} as Meta<typeof FeaturePanels>

const Template: StoryFn<typeof FeaturePanels> = (args) => <FeaturePanels {...args} />

export const Default = Template.bind({})
Default.args = {
	title: 'Explore Weather Data',
	description: 'Pick a category to dive into detailed tools and analysis.',
	buttons: [{ label: 'See All', link: '/', variantClassName: buttonStyles.blue }],
	featurePanels: [
		{
			title: 'Analysis',
			description: 'Mesoscale diagnosis',
			href: '/weather-data/analysis',
			image: 'https://picsum.photos/600/400',
			linkText: 'View',
		},
		{
			title: 'Radar',
			description: 'Situational awareness',
			href: '/weather-data/radar',
			image: 'https://picsum.photos/600/401',
			linkText: 'Explore',
		},
		{ title: 'No Link (Static)', description: 'Hover disabled', href: '', image: 'https://picsum.photos/600/402', linkText: '' },
	],
}
