import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { Meta, StoryFn } from '@storybook/react'
import { SidebarLink } from '../SidebarLink/SidebarLink'
import { SidebarGroup } from './SidebarGroup'

export default {
	title: 'Components/Sidebar/SidebarGroup',
	component: SidebarGroup,
	argTypes: {
		children: { control: { disable: true } },
	},
} as Meta<typeof SidebarGroup>

const createLinksData = (numLinks: number) => {
	return Array.from({ length: numLinks }, (_, index) => ({
		name: `Link ${index + 1}`,
		linkUrl: '/',
	}))
}

const linksData = createLinksData(4)

const content = (
	<>
		{linksData.map((link, index) => (
			<SidebarLink key={index} name={link.name} linkUrl={link.linkUrl} />
		))}
	</>
)

const Template: StoryFn<typeof SidebarGroup> = (args) => {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<SidebarPanelPad>
					<SidebarGroup {...args} />
				</SidebarPanelPad>
			</SidebarNavigation>
		</SidebarWrapper>
	)
}

export const Default = Template.bind({})
Default.args = {
	title: 'Sidebar Group',
	styleType: 'default',
	children: content,
}

export const WithDot = Template.bind({})
WithDot.args = {
	title: 'Sidebar Group',
	extraInfo: 'with Dot',
	styleType: 'dot',
	children: content,
}

export const WithExtraInfo = Template.bind({})
WithExtraInfo.args = {
	title: 'Sidebar Group',
	extraInfo: 'Info',
	styleType: 'default',
	children: content,
}
