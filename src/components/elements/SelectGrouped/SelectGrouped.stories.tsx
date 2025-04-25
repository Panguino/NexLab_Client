import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import SelectGrouped from './SelectGrouped'

const meta: Meta<typeof SelectGrouped> = {
	title: 'Components/Form/SelectGrouped',
	component: SelectGrouped,
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
	const Template: StoryFn<typeof SelectGrouped> = (args) => {
		const [value, setValue] = useState(args.options[0].options[0].value)

		return (
			<SelectGrouped
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

export const Simple: any = TemplateFactory()
Simple.args = {
	options: [
		{
			label: 'Eastern Hemisphere',
			options: [
				{
					label: 'Global',
					value: 'EH-global',
				},
				{
					label: 'Regional',
					value: 'EH-regional',
				},
			],
		},
		{
			label: 'Western Hemisphere',
			options: [
				{
					label: 'Global',
					value: 'WH-global',
				},
				{
					label: 'Regional',
					value: 'WH-regional',
				},
			],
		},
		{
			label: 'North America',
			options: [
				{
					label: 'Regional',
					value: 'NA-regional',
				},
				{
					label: 'Subregional',
					value: 'NA-subregional',
				},
				{
					label: 'Local',
					value: 'NA-local',
				},
			],
		},
		{
			label: 'Alaska',
			options: [
				{
					label: 'Regional',
					value: 'AL-regional',
				},
				{
					label: 'Subregional',
					value: 'AL-subregional',
				},
				{
					label: 'Local',
					value: 'AL-local',
				},
			],
		},
		{
			label: 'Hawaii',
			options: [
				{
					label: 'Regional',
					value: 'HA-regional',
				},
				{
					label: 'Subregional',
					value: 'HA-subregional',
				},
				{
					label: 'Local',
					value: 'HA-local',
				},
			],
		},
	],
	onChange: () => alert('Clicked!'),
}
