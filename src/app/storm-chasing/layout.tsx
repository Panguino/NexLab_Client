import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Materials" link="/storm-chasing/materials/" />
				<SubNavigationItem name="Media" link="/storm-chasing/media/" />
				<SubNavigationItem name="Tracker" link="/storm-chasing/tracker/" />
			</SubNavigation>
			{children}
		</>
	)
}
