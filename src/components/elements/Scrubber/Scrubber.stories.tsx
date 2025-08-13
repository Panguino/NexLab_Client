import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import Scrubber from './Scrubber'

export default {
	title: 'Components/Animator/Scrubber',
	component: Scrubber,
} as Meta

const Template: StoryFn<typeof Scrubber> = (args) => {
	const [value, setValue] = useState(args.value)

	const handleChange = (newValue: number) => {
		setValue(newValue)
	}

	return <Scrubber {...args} value={value} onChange={handleChange} />
}

export const Default = Template.bind({})
Default.args = {
	minValue: 0,
	maxValue: 100,
	value: 50,
	unitStep: 1,
}

export const DifferentMinMax = Template.bind({})
DifferentMinMax.args = {
	minValue: 0,
	maxValue: 200,
	value: 100,
	unitStep: 1,
}

export const DifferentUnitSteps = Template.bind({})
DifferentUnitSteps.args = {
	minValue: 0,
	maxValue: 1000,
	value: 500,
	unitStep: 10,
}

export const WithFrameIndicatorsProvided = Template.bind({})
WithFrameIndicatorsProvided.args = {
	minValue: 0,
	maxValue: 23,
	value: 0,
	unitStep: 1,
	frameLoadStates: [
		true,
		false,
		true,
		true,
		false,
		true,
		true,
		true,
		false,
		true,
		false,
		true,
		true,
		true,
		false,
		true,
		true,
		false,
		false,
		true,
		true,
		true,
		false,
		true,
	],
}

export const WithFramesAndPlaceholder = Template.bind({})
WithFramesAndPlaceholder.args = {
	minValue: 0,
	maxValue: 15,
	value: 2,
	unitStep: 1,
	placeholderImageUrl: '/placeholder.png',
	frames: [
		'/real-0.png',
		'/real-1.png',
		'/placeholder.png',
		'/real-3.png',
		'/placeholder.png',
		'/real-5.png',
		'/real-6.png',
		'/placeholder.png',
		'/real-8.png',
		'/real-9.png',
		'/placeholder.png',
		'/real-11.png',
		'/real-12.png',
		'/placeholder.png',
		'/real-14.png',
		'/real-15.png',
	],
}
