import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import SatradSidebarPanel from '@/components/layout/SidebarPanels/SatRadSidebarPanel/SatradSidebarPanel'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default function Layout({ children }) {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<SatradSidebarPanel />
			</SidebarNavigation>
			{children}
			<MobileIconNav tab />
		</SidebarWrapper>
	)
}
