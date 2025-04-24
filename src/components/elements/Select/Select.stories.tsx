import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import Select from './Select'

const meta: Meta<typeof Select> = {
	title: 'Components/Form/Select',
	component: Select,
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

const TemplateFactory = () => {
	const Template: StoryFn<typeof Select> = (args) => {
		const [value, setValue] = useState(args.options[0].value)

		return (
			<Select
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

export const Simple = TemplateFactory()
Simple.args = {
	options: [
		{
			label: 'Option 1',
			value: 1,
		},
		{
			label: 'Option 2',
			value: 2,
		},
		{
			label: 'Option 3',
			value: 3,
		},
	],
	onChange: () => alert('Clicked!'),
}
