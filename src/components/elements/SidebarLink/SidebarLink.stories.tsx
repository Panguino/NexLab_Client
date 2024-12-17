import { Meta, StoryFn } from '@storybook/react'
import { SidebarLink } from './SidebarLink'

export default {
	title: 'Elements/SidebarLink',
	component: SidebarLink,
} as Meta<typeof SidebarLink>

const contentStyles = {
	marginTop: '20px',
	padding: '10px',
	border: '1px solid #ccc',
	whiteSpace: 'pre-wrap',
	fontFamily: 'monospace',
	color: '#666',
}

const Template: StoryFn<typeof SidebarLink> = (args) => <SidebarLink {...args} />

export const Default = Template.bind({})
Default.args = {
	name: 'Google',
	linkUrl: 'https://www.google.com',
	target: '_blank',
}

const WithContentLoadingTemplate: StoryFn<typeof SidebarLink> = (args) => (
	<>
		<SidebarLink {...args} />
		<div id="content" style={contentStyles}>
			Content will be loaded here.
		</div>
	</>
)

export const WithContentLoading = WithContentLoadingTemplate.bind({})
WithContentLoading.args = {
	name: 'KORD METAR',
	linkUrl: 'https://api.weather.gov/stations/KORD/observations?limit=1',
	target: 'content',
	onClick: (_event, contentElementId) => {
		console.log('Custom onClick handler triggered for:', contentElementId)
	},
}
