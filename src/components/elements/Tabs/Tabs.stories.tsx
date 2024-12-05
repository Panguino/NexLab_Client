import { faCog, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { Tab, Tabs } from './Tabs'

export default {
	title: 'Components/Tabs',
	component: Tabs,
} as Meta

const Template: StoryFn = (args) => <Tabs {...args}>{args.children}</Tabs>

export const BasicTabs = Template.bind({})
BasicTabs.args = {
	children: [<Tab label="Tab 1">Content 1</Tab>, <Tab label="Tab 2">Content 2</Tab>, <Tab label="Tab 3">Content 3</Tab>],
}

export const TabsWithIcons = Template.bind({})
TabsWithIcons.args = {
	children: [
		<Tab
			label={
				<>
					<FontAwesomeIcon icon={faHome} /> Home
				</>
			}
		>
			Home Content
		</Tab>,
		<Tab
			label={
				<>
					<FontAwesomeIcon icon={faUser} /> Profile
				</>
			}
		>
			Profile Content
		</Tab>,
		<Tab
			label={
				<>
					<FontAwesomeIcon icon={faCog} /> Settings
				</>
			}
		>
			Settings Content
		</Tab>,
	],
}

export const DynamicTabs = () => {
	const [tabs, setTabs] = React.useState([
		{ label: 'Tab 1', content: 'Content 1' },
		{ label: 'Tab 2', content: 'Content 2' },
	])

	const addTab = () => {
		setTabs([...tabs, { label: `Tab ${tabs.length + 1}`, content: `Content ${tabs.length + 1}` }])
	}

	return (
		<>
			<button onClick={addTab}>Add Tab</button>
			<Tabs>
				{tabs.map((tab, index) => (
					<Tab key={index} label={tab.label}>
						{tab.content}
					</Tab>
				))}
			</Tabs>
		</>
	)
}
