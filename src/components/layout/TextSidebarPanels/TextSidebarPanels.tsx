'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import SidebarPanelPad from '../SidebarPanelPad/SidebarPanelPad'
import HazardsPanel from '../SidebarPanels/HazardsPanel/HazardsPanel'
import SidebarSubPanel from '../SidebarSubPanel/SidebarSubPanel'
import styles from './TextSidebarPanels.module.scss'

const TextSidebarPanels = () => {
	const basepath = '/weather-data/text-hazards-outlooks'

	return (
		<div className={styles.TextSidebarPanels}>
			<SidebarSubPanel path={basepath} activeX="0%" inactiveX="-100%">
				<SidebarPanelPad>
					<SidebarSectionLink name="NWS WFO" linkUrl={`${basepath}/nws-wfo-national-weather-service-forecast-offices`} />
					<SidebarSectionLink name="Hazards" linkUrl={`${basepath}/active-weather-hazards`} />
					<SidebarSectionLink name="Analysis & Forecast" linkUrl={`${basepath}/analysis-forecast`} />
					<SidebarSectionLink name="Climatology" linkUrl={`${basepath}/cpc-climate`} />
					<SidebarSectionLink name="Convective" linkUrl={`${basepath}/spc-convective-weather`} />
					<SidebarSectionLink name="Tropical" linkUrl={`${basepath}/nhc-tropical-hurricane-weather`} />
					<SidebarSectionLink name="Winter" linkUrl={`${basepath}/wpc-winter-weather`} />
					<SidebarSectionLink name="Hydrological" linkUrl={`${basepath}/nws-rfc-hydrological`} />
					<SidebarSectionLink name="Fire & Drought" linkUrl={`${basepath}/spc-usdm-fire-weather-drought`} />
					<SidebarSectionLink name="Marine" linkUrl={`${basepath}/nws-opc-nhc-marine-weather`} />
					<SidebarSectionLink name="Space" linkUrl={`${basepath}/swpc-space-weather`} />
				</SidebarPanelPad>
			</SidebarSubPanel>
			<SidebarSubPanel path={`${basepath}/NWF-WFO`} activeX="0%" inactiveX="100%">
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
			<SidebarSubPanel path={`${basepath}/hazards`} activeX="0%" inactiveX="100%">
				<HazardsPanel basepath={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel path={`${basepath}/analysis-and-forecast`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Analysis & Forecast" linkUrl={basepath} />
				<SidebarPanelPad>
					<SidebarGroup title="Select Highlights">
						<SidebarLink name="MCD/MPB" linkUrl={''} />
						<SidebarLink name="MRMS" linkUrl={''} />
					</SidebarGroup>
				</SidebarPanelPad>
			</SidebarSubPanel>
		</div>
	)
}

export default TextSidebarPanels
