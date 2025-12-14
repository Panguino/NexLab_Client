'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import SidebarSubPanel from '../../SidebarSubPanel/SidebarSubPanel'
import ConvectivePanel from '../ConvectivePanel/ConvectivePanel'
import FirePanel from '../FirePanel/FirePanel'
import HazardsPanel from '../HazardsPanel/HazardsPanel'
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
					<SidebarSectionLink name="NWS WFO" linkUrl={`${basepath}/nws-wfo-national-weather-service-forecast-offices`} />
					<SidebarSectionLink name="Hazards" linkUrl={`${basepath}/active-weather-hazards`} />
					<SidebarSectionLink name="Analysis & Forecast" linkUrl={`${basepath}/analysis-forecast`} />
					<SidebarSectionLink name="Climatology" linkUrl={`${basepath}/cpc-climate`} />
					<SidebarSectionLink name="Convective" linkUrl={`${basepath}/spc-convective-weather`} />
					<SidebarSectionLink name="Tropical" linkUrl={`${basepath}/nhc-tropical-hurricane-weather/overview/latest`} />
					<SidebarSectionLink name="Winter" linkUrl={`${basepath}/wpc-winter-weather`} />
					<SidebarSectionLink name="Hydrological" linkUrl={`${basepath}/nws-rfc-hydrological`} />
					<SidebarSectionLink name="Fire & Drought" linkUrl={`${basepath}/spc-usdm-fire-weather-drought`} />
					<SidebarSectionLink name="Marine" linkUrl={`${basepath}/nws-opc-nhc-marine-weather`} />
					<SidebarSectionLink name="Space" linkUrl={`${basepath}/swpc-space-weather`} />
				</SidebarPanelPad>
			</SidebarSubPanel>
			<SidebarSubPanel matchesPath={`${basepath}/NWF-WFO`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="NWS WFO" linkUrl={basepath} />
				<SidebarPanelPad>
					<SidebarGroup title="Sector Selection">
						<SidebarLink name="Conus" linkUrl={''} />
						<SidebarLink name="Alaska" linkUrl={''} />
						<SidebarLink name="Hawaii" linkUrl={''} />
						<SidebarLink name="Puerto Rico" linkUrl={''} />
						<SidebarLink name="Guam" linkUrl={''} />
						<SidebarLink name="Amer. Samoa" linkUrl={''} />
					</SidebarGroup>
				</SidebarPanelPad>
			</SidebarSubPanel>
			<SidebarSubPanel matchesPath={`${basepath}/active-weather-hazards`} activeX="0%" inactiveX="100%">
				<HazardsPanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Analysis & Forecast */}
			<SidebarSubPanel matchesPath={`${basepath}/analysis-forecast`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Analysis & Forecast" linkUrl={basepath} />
			</SidebarSubPanel>

			{/* Climatology */}
			<SidebarSubPanel matchesPath={`${basepath}/cpc-climate`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Climatology" linkUrl={basepath} />
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
			<SidebarSubPanel matchesPath={`${basepath}/nws-rfc-hydrological`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Hydrological" linkUrl={basepath} />
			</SidebarSubPanel>

			{/* Fire & Drought */}
			<SidebarSubPanel includesPath={`${basepath}/fire-drought`} activeX="0%" inactiveX="100%">
				<FirePanel basepath={basepath} />
			</SidebarSubPanel>

			{/* Marine */}
			<SidebarSubPanel matchesPath={`${basepath}/nws-opc-nhc-marine-weather`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Marine" linkUrl={basepath} />
			</SidebarSubPanel>

			{/* Space */}
			<SidebarSubPanel matchesPath={`${basepath}/swpc-space-weather`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Space" linkUrl={basepath} />
			</SidebarSubPanel>

			{/* NWS WFO */}
			<SidebarSubPanel includesPath={`${basepath}/nws-wfo-national-weather-service-forecast-offices`} activeX="0%" inactiveX="100%">
				<WFOPanel basepath={basepath} />
			</SidebarSubPanel>
		</div>
	)
}

export default TextSidebarPanels
