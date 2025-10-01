import { faDownload, faInfoCircle, faLayerGroup, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Tab, Tabs } from './Tabs'

export default {
	title: 'Components/Tabs',
	component: Tabs,
} as Meta

const Template: StoryFn = (args) => {
	const [activeTab, setActiveTab] = useState(0)
	return (
		<Tabs {...args} activeTab={activeTab} setActiveTab={setActiveTab}>
			{args.children}
		</Tabs>
	)
}

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
					<FontAwesomeIcon icon={faInfoCircle} /> Info
				</>
			}
		>
			Information Panel
		</Tab>,
		<Tab
			label={
				<>
					<FontAwesomeIcon icon={faWarning} /> Alerts
				</>
			}
		>
			Alerts Panel
		</Tab>,
		<Tab
			label={
				<>
					<FontAwesomeIcon icon={faLayerGroup} /> Overlays
				</>
			}
		>
			Overlays Panel
		</Tab>,

		<Tab
			label={
				<>
					<FontAwesomeIcon icon={faDownload} /> Download
				</>
			}
		>
			Download Panel
		</Tab>,
	],
}
