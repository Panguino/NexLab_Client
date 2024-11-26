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
	const Template: StoryFn<typeof Animator> = ({ frames }) => {
		return <Animator frames={frames} />
	}
	return Template
}

export const simpleAutoPlay: StoryFn<typeof Animator> = TemplateFactory()
simpleAutoPlay.args = {
	interval: 0.25,
	frames: testFrames,
}
