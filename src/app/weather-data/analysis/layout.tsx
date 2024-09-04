import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default function Layout({ children }) {
	return (
		<SidebarWrapper>
			<SidebarNavigation>Sidebar Navigation Analysis</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
