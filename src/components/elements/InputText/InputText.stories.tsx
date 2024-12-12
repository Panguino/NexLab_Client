// InputText.stories.tsx
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import InputText, { InputTextProps } from './InputText'

export default {
	title: 'Components/InputText',
	component: InputText,
} as Meta

export const WithLabel: StoryFn<InputTextProps> = (args) => {
	const [value, setValue] = useState('')
	return <InputText {...args} label="With Label" value={value} onChange={(e) => setValue(e.target.value)} />
}

export const WithoutLabel: StoryFn<InputTextProps> = (args) => {
	const [value, setValue] = useState('')
	return <InputText {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}
