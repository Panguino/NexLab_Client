import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { Meta, StoryFn } from '@storybook/react'
import { SidebarSectionHeader } from './SidebarSectionHeader'

export default {
	title: 'Elements/SidebarSectionHeader',
	component: SidebarSectionHeader,
} as Meta<typeof SidebarSectionHeader>

const Template: StoryFn<typeof SidebarSectionHeader> = (args) => {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<SidebarPanelPad>
					<SidebarSectionHeader {...args} />
				</SidebarPanelPad>
			</SidebarNavigation>
		</SidebarWrapper>
	)
}

export const Default = Template.bind({})
Default.args = {
	title: 'Sidebar Section Header - No Link',
	name: 'Section Header',
	linkUrl: '/',
}

export const DefinedLink = Template.bind({})
DefinedLink.args = {
	title: 'Sidebar Section Header - Defined Link',
	name: 'Section Header',
	linkUrl: 'https://www.google.com',
}
