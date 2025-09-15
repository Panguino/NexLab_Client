import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Overview" link="/storm-chasing/" />
				<SubNavigationItem name="Trips & Registration" link="/storm-chasing/trips-and-registration/" />
				<SubNavigationItem name="FAQs" link="/storm-chasing/faqs/" />
				<SubNavigationItem name="Gallery" link="/storm-chasing/gallery/" />
				<SubNavigationItem name="Tracker" link="/storm-chasing/tracker/" />
			</SubNavigation>
			{children}
		</>
	)
}
