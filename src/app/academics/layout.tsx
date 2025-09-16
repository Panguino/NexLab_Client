import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Classes & Notes" link="/academics/courses/" />
				<SubNavigationItem name="Degrees" link="/academics/degrees-certificates/" />
				<SubNavigationItem name="Staff" link="/academics/staff/" />
			</SubNavigation>
			{children}
		</>
	)
}
