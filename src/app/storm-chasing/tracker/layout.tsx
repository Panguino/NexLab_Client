import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import TrackerSidebarPanel from '@/components/layout/SidebarPanels/TrackerSidebarPanel/TrackerSidebarPanel'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<TrackerSidebarPanel />
			</SidebarNavigation>
			{children}
			<MobileIconNav tab />
		</SidebarWrapper>
	)
}
