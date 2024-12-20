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
		</SidebarWrapper>
	)
}
