import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import TextSidebarPanels from '@/components/layout/TextSidebarPanels/TextSidebarPanels'

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
