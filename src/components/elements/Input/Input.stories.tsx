import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import Input, { InputProps } from './Input'

export default {
	title: 'Components/Input',
	component: Input,
} as Meta

export const WithLabel: StoryFn<InputProps> = (args) => {
	const [value, setValue] = useState('')
	return <Input {...args} label="With Label" value={value} onChange={(e) => setValue(e.target.value)} />
}

export const WithoutLabel: StoryFn<InputProps> = (args) => {
	const [value, setValue] = useState('')
	return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}
