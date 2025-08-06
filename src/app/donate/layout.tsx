import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Donate Now" link="/donate" />
				<SubNavigationItem name="Donor Wall" link="/donate/donorwall" />
				<SubNavigationItem name="Sponsors" link="/donate/sponsors" />
			</SubNavigation>
			{children}
		</>
	)
}
