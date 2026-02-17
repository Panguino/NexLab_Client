import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import TextSidebarPanels from '@/components/layout/SidebarPanels/TextSidebarPanels/TextSidebarPanels'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default function Layout({ children }) {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<TextSidebarPanels />
			</SidebarNavigation>
			{children}
			{/* MobileIconNav is now absolutely positioned relative to SidebarWrapper */}
			<MobileIconNav tab />
		</SidebarWrapper>
	)
}
