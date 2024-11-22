import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import Scrubber from './Scrubber'

export default {
	title: 'Components/Scrubber',
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
