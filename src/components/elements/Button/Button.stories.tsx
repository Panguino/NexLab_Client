// Button.stories.tsx
import { Meta, StoryFn } from '@storybook/react'
import { Button } from './Button'

export default {
	title: 'Components/Button',
	component: Button,
	argTypes: {
		style: { control: false },
		onClick: { control: false },
	},
} as Meta

const Template: StoryFn = (args) => <Button {...args} />

export const AsLink = Template.bind({})
AsLink.args = {
	label: 'Go to Google',
	link: 'https://www.google.com',
	target: '_blank',
	style: '',
	disabled: false,
}

export const AsCustomTrigger = Template.bind({})
AsCustomTrigger.args = {
	label: 'Click Me',
	onClick: () => alert('Button clicked!'),
	style: '',
	disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
	label: 'Disabled Button',
	onClick: () => alert('This should not be clickable'),
	style: '',
	disabled: true,
}

export const OpenNewTab = Template.bind({})
OpenNewTab.args = {
	label: 'Open New Tab',
	link: 'https://www.google.com',
	target: '_blank',
	style: '',
	disabled: false,
}
