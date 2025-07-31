'use client'

import SidebarNavigation from '@/components/layout/SidebarNavigation/SidebarNavigation'
import ForecastSidebarPanel from '@/components/layout/SidebarPanels/ForecastSidebarPanel/ForecastSidebarPanel'
import ForecastSoundingsSidebarPanel from '@/components/layout/SidebarPanels/ForecastSoundingSidebarPanel/ForecastSoundingsSidebarPanel'
import SidebarWrapper from '@/components/layout/SidebarWrapper/SidebarWrapper'
import { usePathname } from 'next/navigation'

export default function Layout({ children }) {
	const pathname = usePathname()
	const isSoundingsRoute = pathname.includes('sounding')

	return (
		<SidebarWrapper>
			<SidebarNavigation>{isSoundingsRoute ? <ForecastSoundingsSidebarPanel /> : <ForecastSidebarPanel />}</SidebarNavigation>
			{children}
		</SidebarWrapper>
	)
}
