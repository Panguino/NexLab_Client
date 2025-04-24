import { Meta, StoryFn } from '@storybook/react'
import TimeDisplay from './TimeDisplay'

export default {
	title: 'Components/Animator/TimeDisplay',
	component: TimeDisplay,
} as Meta

const Template: StoryFn<typeof TimeDisplay> = (args) => <TimeDisplay {...args} />

export const Default = Template.bind({})
Default.args = {
	value: '01',
}

export const WithUnits = Template.bind({})
WithUnits.args = {
	value: '08',
	unit: 'z',
}

export const WithMaxValue = Template.bind({})
WithMaxValue.args = {
	value: '06',
	maxValue: '36',
}

export const WithMaxValueAndUnits = Template.bind({})
WithMaxValueAndUnits.args = {
	value: '06',
	maxValue: '36',
	unit: 'z',
}
