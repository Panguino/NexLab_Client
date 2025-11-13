import { ButtonType } from '@/components/elements/Button/Button'
import type { Meta, StoryFn } from '@storybook/react'
import { SimpleCta } from './SimpleCta'

export default {
	title: 'Page Blocks/SimpleCta',
	component: SimpleCta,
} as Meta<typeof SimpleCta>

const sampleButtons: ButtonType[] = [
	{ label: 'Primary CTA', link: '/signup' },
	{ label: 'Secondary', link: '/learn-more' },
]

const intro = '<h1>Join <strong>NEXLAB</strong> today</h1><p>Get access to premium weather data and tools.</p>'

const Template: StoryFn<typeof SimpleCta> = (args) => <SimpleCta {...args} />

export const NoButtonsNoBg = Template.bind({})
NoButtonsNoBg.args = {
	introText: intro,
}

export const WithButtons = Template.bind({})
WithButtons.args = {
	introText: intro,
	buttons: sampleButtons,
}

export const WithBackground = Template.bind({})
WithBackground.args = {
	introText: intro,
	buttons: sampleButtons,
	background: { url: 'https://picsum.photos/1200/800', size: 'cover' },
}

export const WithBackgroundFull = Template.bind({})
WithBackgroundFull.args = {
	introText: intro,
	buttons: sampleButtons,
	background: { url: 'https://picsum.photos/1400/900', size: 'cover' },
	backgroundFull: true,
}
