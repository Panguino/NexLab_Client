import SectorSelectorPanel from '@/components/layout/SectorSelectorPanel/SectorSelectorPanel'
import SoundingPickerPanel from '@/components/layout/SoundingPickerPanel/SoundingPickerPanel'

import SubNavigation from '@/components/layout/SubNavigation/SubNavigation'
import SubNavigationItem from '@/components/layout/SubNavigation/SubNavigationItem/SubNavigationItem'
import { weatherDataSubnav } from './subnav.config'

export default function Layout({ children }) {
	return (
		<>
			<SubNavigation>
				{weatherDataSubnav.map((item) => (
					<SubNavigationItem key={item.href} name={item.title} link={item.href} />
				))}
			</SubNavigation>
			<SoundingPickerPanel />

			<SectorSelectorPanel />
			{children}
		</>
	)
}
