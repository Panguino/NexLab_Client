import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import ForecastSidebarPanel from '@/components/layout/SidebarPanels/ForecastSidebarPanel/ForecastSidebarPanel'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default function Layout({ children }) {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<ForecastSidebarPanel />
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
