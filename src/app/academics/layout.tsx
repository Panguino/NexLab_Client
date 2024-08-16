import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Classes & Notes" link="/academics/classes/" />
				<SubNavigationItem name="Degrees" link="/academics/degrees/" />
				<SubNavigationItem name="AMS Club" link="/academics/ams-club/" />
				<SubNavigationItem name="Student Resources" link="/academics/student-resources/" />
			</SubNavigation>
			{children}
		</>
	)
}
