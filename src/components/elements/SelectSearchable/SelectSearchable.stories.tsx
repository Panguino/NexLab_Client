import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import SelectSearchable from './SelectSearchable'

const meta: Meta<typeof SelectSearchable> = {
	title: 'Components/Form/SelectSearchable',
	component: SelectSearchable,
	argTypes: {
		onChange: { control: false },
		value: { control: false },
		options: { control: false },
		placeholder: { control: 'text' },
		optionsEmptyText: { control: 'text' },
	},
	decorators: [
		(Story) => (
			<Providers>
				<div style={{ maxWidth: 300 }}>{Story()}</div>
			</Providers>
		),
	],
}

export default meta

const TemplateFactory = (initialValue: any) => {
	const Template: StoryFn<typeof SelectSearchable> = (args) => {
		const [value, setValue] = useState(initialValue)

		return (
			<SelectSearchable
				value={value}
				onChange={setValue}
				options={args.options}
				placeholder={args.placeholder}
				optionsEmptyText={args.optionsEmptyText}
			/>
		)
	}
	return Template
}

// Story with null/invalid value and placeholder
export const WithPlaceholder: any = TemplateFactory(null)
WithPlaceholder.args = {
	options: [
		{
			label: 'Apple',
			value: 'apple',
		},
		{
			label: 'Banana',
			value: 'banana',
		},
		{
			label: 'Cherry',
			value: 'cherry',
		},
		{
			label: 'Date',
			value: 'date',
		},
		{
			label: 'Elderberry',
			value: 'elderberry',
		},
		{
			label: 'Fig',
			value: 'fig',
		},
		{
			label: 'Grape',
			value: 'grape',
		},
		{
			label: 'Honeydew',
			value: 'honeydew',
		},
	],
	placeholder: 'Search or Select an option',
	optionsEmptyText: 'No options',
}

// Story with pre-selected value
export const WithPreselectedValue: any = TemplateFactory('cherry')
WithPreselectedValue.args = {
	options: [
		{
			label: 'Apple',
			value: 'apple',
		},
		{
			label: 'Banana',
			value: 'banana',
		},
		{
			label: 'Cherry',
			value: 'cherry',
		},
		{
			label: 'Date',
			value: 'date',
		},
		{
			label: 'Elderberry',
			value: 'elderberry',
		},
		{
			label: 'Fig',
			value: 'fig',
		},
		{
			label: 'Grape',
			value: 'grape',
		},
		{
			label: 'Honeydew',
			value: 'honeydew',
		},
	],
	placeholder: 'Search or Select an option',
	optionsEmptyText: 'No options',
}

// Story with numeric values to demonstrate value matching
export const WithNumericValues: any = TemplateFactory(42)
WithNumericValues.args = {
	options: [
		{
			label: 'The Answer to Everything',
			value: 42,
		},
		{
			label: 'Lucky Number',
			value: 7,
		},
		{
			label: 'Century',
			value: 100,
		},
		{
			label: 'Dozen',
			value: 12,
		},
		{
			label: "Baker's Dozen",
			value: 13,
		},
	],
	placeholder: 'Search or Select an option',
	optionsEmptyText: 'No options',
}
