import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Analysis" link="/weather-data/analysis/" />
				<SubNavigationItem name="Satellite & Radar" link="/weather-data/satrad/" />
				<SubNavigationItem name="Nexrad Radar" link="/weather-data/nexrad/" />
				<SubNavigationItem name="Numberical Models" link="/weather-data/forecast/" />
				<SubNavigationItem name="Text Products" link="/weather-data/text/" />
				<SubNavigationItem name="Resources" link="/weather-data/resources/" />
			</SubNavigation>
			{children}
		</>
	)
}
