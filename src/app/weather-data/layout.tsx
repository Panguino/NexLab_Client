import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				<SubNavigationItem name="Analysis" link="/weather-data/analysis/" />
				<SubNavigationItem name="Satellite & Radar" link="/weather-data/satellite-mosaic-radar/" />
				<SubNavigationItem name="NEXRAD Dual-Pol" link="/weather-data/nexrad-dual-pol-radar/" />
				<SubNavigationItem name="Numerical Models" link="/weather-data/forecast-models/" />
				<SubNavigationItem name="Text Products" link="/weather-data/text-hazards-outlooks/" />
			</SubNavigation>
			{children}
		</>
	)
}
