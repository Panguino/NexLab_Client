import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { FloatingInfoPanel } from './FloatingInfoPanel'

export default {
	title: 'Components/FloatingInfoPanel',
	component: FloatingInfoPanel,
	argTypes: {
		onClose: { control: false },
		children: { control: false },
		title: { control: 'text' },
	},
} as Meta

const Template: StoryFn<typeof FloatingInfoPanel> = (args) => {
	const [isOpen, setIsOpen] = useState(true)

	return isOpen ? <FloatingInfoPanel {...args} onClose={() => setIsOpen(false)} /> : null
}

export const WithTextInformation = Template.bind({})
WithTextInformation.args = {
	title: 'Information Panel',
	children: <p>This is some text information inside the panel.</p>,
}

export const WithFormElements = Template.bind({})
WithFormElements.args = {
	title: 'Settings Panel',
	children: (
		<>
			<div>
				<label htmlFor="setting1">Setting 1</label>
				<input type="text" id="setting1" name="setting1" />
			</div>
			<div>
				<label htmlFor="setting2">Setting 2</label>
				<input type="checkbox" id="setting2" name="setting2" />
			</div>
			<div>
				<label htmlFor="setting1">Setting 4</label>
				<input type="text" id="setting1" name="setting1" />
			</div>
			<div>
				<label htmlFor="setting2">Setting 5</label>
				<input type="checkbox" id="setting2" name="setting2" />
			</div>
		</>
	),
}
