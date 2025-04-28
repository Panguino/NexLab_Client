import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import Toggle from './Toggle'

export default {
	title: 'Components/Form/Toggle',
	component: Toggle,
} as Meta

const Template: StoryFn<typeof Toggle> = (args) => {
	const [value, setValue] = useState(args.value)

	return <Toggle {...args} value={value} onClick={setValue} />
}

export const Default = Template.bind({})
Default.args = {
	value: false,
}

export const Checked = Template.bind({})
Checked.args = {
	value: true,
}
