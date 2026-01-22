'use client'

import { TEXT_SIDEBAR_LINKS } from '@/app/weather-data/text-hazards-outlooks/textSidebarLinks'
import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import SidebarSubPanel from '../../SidebarSubPanel/SidebarSubPanel'
import AdminPanel from '../AdminPanel/AdminPanel'
import AnalysisPanel from '../AnalysisPanel/AnalysisPanel'
import ClimatePanel from '../ClimatePanel/ClimatePanel'
import ConvectivePanel from '../ConvectivePanel/ConvectivePanel'
import FirePanel from '../FirePanel/FirePanel'
import ForecastPanel from '../ForecastPanel/ForecastPanel'
import HazardsPanel from '../HazardsPanel/HazardsPanel'
import HydrologicalPanel from '../HydrologicalPanel/HydrologicalPanel'
import MarinePanel from '../MarinePanel/MarinePanel'
import SpacePanel from '../SpacePanel/SpacePanel'
import TropicalPanel from '../TropicalPanel/TropicalPanel'
import WFOPanel from '../WFOPanel/WFOPanel'
import WinterPanel from '../WinterPanel/WinterPanel'
import styles from './TextSidebarPanels.module.scss'

const TextSidebarPanels = () => {
	const basepath = '/weather-data/text-hazards-outlooks'

	return (
		<div className={styles.TextSidebarPanels}>
			<SidebarSubPanel matchesPath={basepath} activeX="0%" inactiveX="-100%">
				<SidebarPanelPad>
					{TEXT_SIDEBAR_LINKS.map((l) => (
						<SidebarSectionLink key={l.id} name={l.title} linkUrl={`${basepath}/${l.url}`} />
					))}
				</SidebarPanelPad>
			</SidebarSubPanel>
			{/* NWS WFO */}
			<SidebarSubPanel includesPath={`${basepath}/nws-wfo-national-weather-service-forecast-offices`} activeX="0%" inactiveX="100%">
				<WFOPanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Hazards */}
			<SidebarSubPanel matchesPath={`${basepath}/active-weather-hazards`} activeX="0%" inactiveX="100%">
				<HazardsPanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Forecast */}
			<SidebarSubPanel includesPath={`${basepath}/forecast`} activeX="0%" inactiveX="100%">
				<ForecastPanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Analysis */}
			<SidebarSubPanel includesPath={`${basepath}/analysis`} activeX="0%" inactiveX="100%">
				<AnalysisPanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Climatology */}
			<SidebarSubPanel includesPath={`${basepath}/cpc-climate`} activeX="0%" inactiveX="100%">
				<ClimatePanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Convective */}
			<SidebarSubPanel includesPath={`${basepath}/spc-convective-weather`} activeX="0%" inactiveX="100%">
				<ConvectivePanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Tropical */}
			<SidebarSubPanel includesPath={`${basepath}/nhc-tropical-hurricane-weather`} activeX="0%" inactiveX="100%">
				<TropicalPanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Winter */}
			<SidebarSubPanel includesPath={`${basepath}/wpc-winter-weather`} activeX="0%" inactiveX="100%">
				<WinterPanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Hydrological */}
			<SidebarSubPanel includesPath={`${basepath}/nws-rfc-hydrological`} activeX="0%" inactiveX="100%">
				<HydrologicalPanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Fire & Drought */}
			<SidebarSubPanel includesPath={`${basepath}/fire-drought`} activeX="0%" inactiveX="100%">
				<FirePanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Marine */}
			<SidebarSubPanel includesPath={`${basepath}/marine-opc-nhc`} activeX="0%" inactiveX="100%">
				<MarinePanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Space */}
			<SidebarSubPanel includesPath={`${basepath}/swpc-space-weather`} activeX="0%" inactiveX="100%">
				<SpacePanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Administrative */}
			<SidebarSubPanel includesPath={`${basepath}/admin-products`} activeX="0%" inactiveX="100%">
				<AdminPanel basepath={basepath} />
			</SidebarSubPanel>
		</div>
	)
}

export default TextSidebarPanels
