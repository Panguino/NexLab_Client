import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { Meta, StoryFn } from '@storybook/react'
import { SidebarGroup } from '../SidebarGroup/SidebarGroup'
import { SidebarLink } from './SidebarLink'

export default {
	title: 'Components/Sidebar/SidebarLink',
	component: SidebarLink,
	argTypes: {
		onClick: { control: { disable: true } },
	},
} as Meta<typeof SidebarLink>

const Template: StoryFn<typeof SidebarLink> = (args) => {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<SidebarPanelPad>
					<SidebarGroup title="Link Example">
						<SidebarLink {...args} />
					</SidebarGroup>
				</SidebarPanelPad>
			</SidebarNavigation>
		</SidebarWrapper>
	)
}

export const Default = Template.bind({})
Default.args = {
	name: 'Default Link',
	linkUrl: 'https://www.google.com',
	target: '_blank',
}

export const WithOnClick = Template.bind({})
WithOnClick.args = {
	name: 'Custom Link w/ onClick',
	onClick: () => alert('Link clicked!'),
}

export const Active = Template.bind({})
Active.args = {
	name: 'Active Link',
	linkUrl: '/',
	active: true,
}

export const Limited = Template.bind({})
Limited.args = {
	name: 'Limited Link',
	linkUrl: '/',
	limited: true,
}
