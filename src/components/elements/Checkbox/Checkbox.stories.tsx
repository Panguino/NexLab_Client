import Providers from '@/components/providers/Providers/Providers'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import Checkbox from './Checkbox'

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Form/Checkbox',
	component: Checkbox,
	argTypes: {
		onChange: { control: false },
		value: { control: false },
		label: { control: 'text' },
	},
	decorators: [(Story) => <Providers>{Story()}</Providers>],
}

export default meta

const TemplateFactory = () => {
	const Template: StoryFn<typeof Checkbox> = (args) => {
		const [value, setValue] = useState(false)

		return <Checkbox value={value} onChange={setValue} label={args.label} />
	}
	return Template
}

export const Simple = TemplateFactory()
Simple.args = {
	label: 'I agree to clicking on this checkbox',
	onChange: () => alert('Clicked!'),
}
