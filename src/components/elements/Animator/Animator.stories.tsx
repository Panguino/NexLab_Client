import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { Animator } from './Animator'
import { testFrames, testFrames16x9, testFrames8x6 } from './AnimatorTestData'

const meta: Meta<typeof Animator> = {
	title: 'Components/Animator/Animator',
	component: Animator,
	argTypes: {
		frames: { control: false },
		interval: { control: { type: 'number' } },
	},
	decorators: [
		(Story) => (
			<Providers>
				<div style={{ height: '100vh' }}>{Story()}</div>
			</Providers>
		),
	],
}

export default meta

const TemplateFactory = () => {
	const Template: StoryFn<typeof Animator> = (args) => {
		return <Animator {...args} />
	}
	return Template
}

export const autoPlayNoControls: StoryFn<typeof Animator> = TemplateFactory()
autoPlayNoControls.args = {
	interval: 0.25,
	frames: testFrames,
	autoPlay: true,
	hideControls: true,
}
export const autoPlayControls: StoryFn<typeof Animator> = TemplateFactory()
autoPlayControls.args = {
	interval: 0.01,
	frames: testFrames,
	autoPlay: true,
}
export const autoPlayControlsNoZoom: StoryFn<typeof Animator> = TemplateFactory()
autoPlayControlsNoZoom.args = {
	interval: 0.25,
	frames: testFrames,
	autoPlay: true,
	hideZoomControls: true,
}
export const responsiveSize: StoryFn<typeof Animator> = TemplateFactory()
responsiveSize.args = {
	interval: 0.25,
	frames: testFrames,
}
export const specificRatio8x6: StoryFn<typeof Animator> = TemplateFactory()
specificRatio8x6.args = {
	interval: 0.25,
	frames: testFrames8x6,
	ratio: 8 / 6,
}
export const specificRatio16x9: StoryFn<typeof Animator> = TemplateFactory()
specificRatio16x9.args = {
	interval: 0.25,
	frames: testFrames16x9,
	ratio: 16 / 9,
}
export const maxWidthAndHeight: StoryFn<typeof Animator> = TemplateFactory()
maxWidthAndHeight.args = {
	interval: 0.25,
	frames: testFrames,
	width: 500,
	height: 500,
}
