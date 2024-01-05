'use client'

import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Analysis" link="/data/analysis/" />
				<SubNavigationItem name="Satellite & Radar" link="/data/satrad/" />
				<SubNavigationItem name="Nexrad Radar" link="/data/nexrad/" />
				<SubNavigationItem name="Numberical Models" link="/data/forecast/" />
				<SubNavigationItem name="Text Products" link="/data/text/" />
				<SubNavigationItem name="Resources" link="/data/resources/" />
			</SubNavigation>
			{children}
		</>
	)
}
