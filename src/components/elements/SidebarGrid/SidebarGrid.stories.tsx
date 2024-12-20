import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarPanelPad from '@/components/layout/SidebarPanelPad/SidebarPanelPad'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { Meta, StoryFn } from '@storybook/react'
import { SidebarGroup } from '../SidebarGroup/SidebarGroup'
import { SidebarLink } from '../SidebarLink/SidebarLink'
import SidebarGrid from './SidebarGrid'

export default {
	title: 'Components/Sidebar/SidebarGrid',
	component: SidebarGrid,
	argTypes: {
		children: { control: { disable: true } },
	},
} as Meta<typeof SidebarGrid>

const createLinksData = (numLinks: number) => {
	return Array.from({ length: numLinks }, (_, index) => ({
		name: `${String(index + 1).padStart(3, '0')}`,
		linkUrl: '/',
	}))
}

const linksData = createLinksData(12)

const content = (
	<>
		{linksData.map((link, index) => (
			<SidebarLink key={index} name={link.name} linkUrl={link.linkUrl} />
		))}
	</>
)

const Template: StoryFn<typeof SidebarGrid> = (args) => {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<SidebarPanelPad>
					<SidebarGroup title="Grid Example">
						<SidebarGrid {...args} />
					</SidebarGroup>
				</SidebarPanelPad>
			</SidebarNavigation>
		</SidebarWrapper>
	)
}

export const Default = Template.bind({})
Default.args = {
	columns: 4,
	children: content,
}
