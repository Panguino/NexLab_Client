import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import AnalysisSidebarPanels from '@/components/layout/SidebarPanels/AnalysisSidebarPanels/AnalysisSidebarPanels'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'

export default function Layout({ children }) {
	return (
		<SidebarWrapper>
			<SidebarNavigation>
				<AnalysisSidebarPanels />
			</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
