import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'
import { stormChasingSubnav } from './subnav.config'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				{stormChasingSubnav.map((item) => (
					<SubNavigationItem key={item.href} name={item.title} link={item.href} />
				))}
			</SubNavigation>
			{children}
		</>
	)
}
