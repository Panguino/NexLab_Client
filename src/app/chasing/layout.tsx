'use client'

import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Trip Information" link="/chasing/trip-info/" />
				<SubNavigationItem name="Materials" link="/chasing/materials/" />
				<SubNavigationItem name="Gallery" link="/chasing/gallery/" />
				<SubNavigationItem name="tracker" link="/chasing/tracker/" />
				<SubNavigationItem name="Resources" link="/chasing/reources/" />
			</SubNavigation>
			{children}
		</>
	)
}
