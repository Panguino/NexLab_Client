import { Meta, StoryFn } from '@storybook/react'
import PillSelector, { PillSelectorProps } from './PillSelector'

export default {
	title: 'Components/PillSelector',
	component: PillSelector,
} as Meta

const Template: StoryFn<PillSelectorProps> = (args) => <PillSelector {...args} />

export const SingleSelect = Template.bind({})
SingleSelect.args = {
	items: [
		{ name: 'Option 1', value: 'opt1' },
		{ name: 'Option 2', value: 'opt2' },
		{ name: 'Option 3', value: 'opt3' },
	],
	mode: 'single',
}

export const MultiSelect = Template.bind({})
MultiSelect.args = {
	items: [
		{ name: 'Option 1', value: 'opt1' },
		{ name: 'Option 2', value: 'opt2' },
		{ name: 'Option 3', value: 'opt3' },
	],
	mode: 'multi',
}

export const DefaultStyling = Template.bind({})
DefaultStyling.args = {
	items: [
		{ name: 'Option 1', value: 'opt1' },
		{ name: 'Option 2', value: 'opt2' },
		{ name: 'Option 3', value: 'opt3' },
	],
	variant: 'default',
}

export const ColumnLayout = Template.bind({})
ColumnLayout.args = {
	items: [
		{ name: 'Option 1', value: 'opt1' },
		{ name: 'Option 2', value: 'opt2' },
		{ name: 'Option 3', value: 'opt3' },
		{ name: 'Option 4', value: 'opt4' },
	],
	columns: 2,
}
