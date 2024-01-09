import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Classes & Notes" link="/academics/classes/" />
				<SubNavigationItem name="AS Degree" link="/academics/asdegree/" />
				<SubNavigationItem name="Four Year Programs" link="/academics/transfer/" />
				<SubNavigationItem name="AMS" link="/academics/ams/" />
			</SubNavigation>
			{children}
		</>
	)
}
