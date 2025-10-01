import { Meta, StoryFn } from '@storybook/react'
import PillSelector, { PillSelectorProps } from './PillSelector'

export default {
	title: 'Components/Form/PillSelector',
	component: PillSelector,
} as Meta

const Template: StoryFn<PillSelectorProps> = (args) => <PillSelector {...args} />

export const SingleSelect = Template.bind({})
SingleSelect.args = {
	items: [
		{ name: 'Option 1', value: ['opt1'] },
		{ name: 'Option 2', value: ['opt2'] },
		{ name: 'Option 3', value: ['opt3'] },
		{ name: 'Option 4', value: ['opt4'] },
		{ name: 'Option 5', value: ['opt5'] },
		{ name: 'Option 6', value: ['opt6'] },
	],
	maxSelect: 1,
}

export const MultiSelect = Template.bind({})
MultiSelect.args = {
	items: [
		{ name: 'Option 1', value: ['opt1'] },
		{ name: 'Option 2', value: ['opt2'] },
		{ name: 'Option 3', value: ['opt3'] },
		{ name: 'Option 4', value: ['opt4'] },
		{ name: 'Option 5', value: ['opt5'] },
		{ name: 'Option 6', value: ['opt6'] },
	],
	maxSelect: -1,
}

export const ColumnLayout = Template.bind({})
ColumnLayout.args = {
	items: [
		{ name: 'Option 1', value: ['opt1'] },
		{ name: 'Option 2', value: ['opt2'] },
		{ name: 'Option 3', value: ['opt3'] },
		{ name: 'Option 4', value: ['opt4'] },
		{ name: 'Option 5', value: ['opt5'] },
		{ name: 'Option 6', value: ['opt6'] },
		{ name: 'Option 7', value: ['opt7'] },
		{ name: 'Option 8', value: ['opt8'] },
		{ name: 'Option 9', value: ['opt9'] },
		{ name: 'Option 10', value: ['opt10'] },
		{ name: 'Option 11', value: ['opt11'] },
		{ name: 'Option 12', value: ['opt12'] },
		{ name: 'Option 13', value: ['opt13'] },
		{ name: 'Option 14', value: ['opt14'] },
		{ name: 'Option 15', value: ['opt15'] },
		{ name: 'Option 16', value: ['opt16'] },
	],
	columns: 4,
}

export const LimitedMultiSelect = Template.bind({})
LimitedMultiSelect.args = {
	items: [
		{ name: 'Option 1', value: ['opt1'] },
		{ name: 'Option 2', value: ['opt2'] },
		{ name: 'Option 3', value: ['opt3'] },
		{ name: 'Option 4', value: ['opt4'] },
		{ name: 'Option 5', value: ['opt5'] },
		{ name: 'Option 6', value: ['opt6'] },
	],
	maxSelect: 3,
}
