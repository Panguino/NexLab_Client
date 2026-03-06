import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import NexradSidebarPanel from '@/components/layout/SidebarPanels/NexradSidebarPanel/NexradSidebarPanel'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default function Layout({ children }) {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<NexradSidebarPanel />
			</SidebarNavigation>
			{children}
			<MobileIconNav tab />
		</SidebarWrapper>
	)
}
