import { StoryFn } from '@storybook/react'
import { useState } from 'react'
import SidebarGrid from './SidebarGrid'

export default {
	title: 'Components/SidebarGrid',
	component: SidebarGrid,
	argTypes: {
		selection: { control: { disable: true } },
		selected: { control: { disable: true } },
		onChange: { control: { disable: true } },
	},
}

const generateOptions = (numOptions: number) => {
	return Array.from({ length: numOptions }, (_, index) => ({
		name: `00${index + 1}`,
		value: index + 1,
	}))
}

const options = generateOptions(8)

const commonArgs = {
	selection: options,
	selected: [options[0]],
	columns: 4,
}

const Template: StoryFn<typeof SidebarGrid> = (args) => <SidebarGrid {...args} />

export const NoInitialSelection = Template.bind({})
NoInitialSelection.args = {
	...commonArgs,
	selected: [],
}

export const WithInitialSelection = Template.bind({})
WithInitialSelection.args = {
	...commonArgs,
	selected: [options[1]],
}

export const CustomColumnCount = Template.bind({})
CustomColumnCount.args = {
	...commonArgs,
	columns: 2,
}

const outputStyles = {
	color: '#888',
}
export const OnChangeHandlerDemo: StoryFn<typeof SidebarGrid> = (args) => {
	const [selectedOption, setSelectedOption] = useState<string>(`Selected: ${commonArgs.selected[0].name}`)
	const handleChange = (selected: { name: string }) => {
		setSelectedOption(`Selected: ${selected.name}`)
	}

	return (
		<div>
			<SidebarGrid {...args} onChange={handleChange} />
			<div style={outputStyles}>{selectedOption}</div>
		</div>
	)
}
OnChangeHandlerDemo.args = {
	...commonArgs,
}

export const ConstrainedWidth = Template.bind({})
ConstrainedWidth.args = {
	...commonArgs,
}

ConstrainedWidth.decorators = [
	(Story) => (
		<div style={{ width: '250px', overflow: 'hidden' }}>
			<Story />
		</div>
	),
]
