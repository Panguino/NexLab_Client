import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { Meta, StoryFn } from '@storybook/react'
import { SidebarSectionLink } from './SidebarSectionLink'

export default {
	title: 'Elements/SidebarSectionLink',
	component: SidebarSectionLink,
} as Meta<typeof SidebarSectionLink>

const Template: StoryFn<typeof SidebarSectionLink> = (args) => {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<SidebarPanelPad>
					<SidebarSectionLink {...args} />
				</SidebarPanelPad>
			</SidebarNavigation>
		</SidebarWrapper>
	)
}

export const Default = Template.bind({})
Default.args = {
	title: 'Sidebar Section Link',
	name: 'Section Section Link',
	linkUrl: '/',
}
