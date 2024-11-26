import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { Animator } from './Animator'
import { testFrames } from './AnimatorTestData'

const meta: Meta<typeof Animator> = {
	title: 'Components/Animator',
	component: Animator,
	argTypes: {
		frames: { control: false },
		interval: { control: { type: 'number' } },
	},
	decorators: [(Story) => <Providers>{Story()}</Providers>],
}

export default meta

const TemplateFactory = () => {
	const Template: StoryFn<typeof Animator> = (args) => {
		return <Animator {...args} />
	}
	return Template
}

export const simpleAutoPlayNoControls: StoryFn<typeof Animator> = TemplateFactory()
simpleAutoPlayNoControls.args = {
	interval: 0.25,
	frames: testFrames,
	autoPlay: true,
	hideControls: true,
}
export const simpleAutoPlayControls: StoryFn<typeof Animator> = TemplateFactory()
simpleAutoPlayControls.args = {
	interval: 0.25,
	frames: testFrames,
	autoPlay: true,
}
export const simpleAutoPlayControlsNoZoom: StoryFn<typeof Animator> = TemplateFactory()
simpleAutoPlayControlsNoZoom.args = {
	interval: 0.25,
	frames: testFrames,
	autoPlay: true,
	hideZoomControls: true,
}
