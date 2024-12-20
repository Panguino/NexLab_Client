import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { Meta, StoryFn } from '@storybook/react'
import { SidebarLink } from '../SidebarLink/SidebarLink'
import { SidebarSectionHeader } from './SidebarSectionHeader'

export default {
	title: 'Components/Sidebar/SidebarSectionHeader',
	component: SidebarSectionHeader,
} as Meta<typeof SidebarSectionHeader>

const TemplateContext: StoryFn<typeof SidebarSectionHeader> = (args) => {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<SidebarSectionHeader {...args} />
				<SidebarPanelPad>
					<SidebarLink name="Link 1" linkUrl="#" />
					<SidebarLink name="Link 2" linkUrl="#" />
					<SidebarLink name="Link 3" linkUrl="#" />
				</SidebarPanelPad>
			</SidebarNavigation>
		</SidebarWrapper>
	)
}
const Template: StoryFn<typeof SidebarSectionHeader> = (args) => {
	return <SidebarSectionHeader {...args} />
}

export const Default = Template.bind({})
Default.args = {
	name: 'Section Header',
	linkUrl: '#',
}

export const ExampleInContext = TemplateContext.bind({})
ExampleInContext.args = {
	name: 'Section Header',
	linkUrl: '#',
}
