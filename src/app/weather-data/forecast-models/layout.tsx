'use client'

import MobileIconNav from '@/components/layout/MobileIconNav/MobileIconNav'
import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import ForecastCompareHeightSidebarPanel from '@/components/layout/SidebarPanels/ForecastCompareHeightSidebarPanel/ForecastCompareHeightSidebarPanel'
import ForecastCompareModelsSidebarPanel from '@/components/layout/SidebarPanels/ForecastCompareModelsSidebarPanel/ForecastCompareModelsSidebarPanel'
import ForecastCompareRunsSidebarPanel from '@/components/layout/SidebarPanels/ForecastCompareRunsSidebarPanel/ForecastCompareRunsSidebarPanel'
import ForecastSidebarPanel from '@/components/layout/SidebarPanels/ForecastSidebarPanel/ForecastSidebarPanel'
import ForecastSoundingsSidebarPanel from '@/components/layout/SidebarPanels/ForecastSoundingSidebarPanel/ForecastSoundingsSidebarPanel'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { usePathname } from 'next/navigation'

export default function Layout({ children }) {
	const pathname = usePathname()
	function getSidebarPanel() {
		switch (true) {
			case pathname.includes('sounding'):
				return <ForecastSoundingsSidebarPanel />
			case pathname.includes('compare-height'):
				return <ForecastCompareHeightSidebarPanel />
			case pathname.includes('compare-runs'):
				return <ForecastCompareRunsSidebarPanel />
			case pathname.includes('compare-models'):
				return <ForecastCompareModelsSidebarPanel />
			default:
				return <ForecastSidebarPanel />
		}
	}

	return (
		<SidebarWrapper>
			<SidebarNavigation>{getSidebarPanel()}</SidebarNavigation>
			{children}
			<MobileIconNav tab />
		</SidebarWrapper>
	)
}
