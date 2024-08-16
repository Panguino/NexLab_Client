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
	const basepath = '/weather-data/text'

	return (
		<div className={styles.TextSidebarPanels}>
			<SidebarSubPanel path={basepath} activeX="0%" inactiveX="-100%">
				<SidebarPanelPad>
					<SidebarSectionLink name="NWS WFO" linkUrl={`${basepath}/NWF-WFO`} />
					<SidebarSectionLink name="Hazards" linkUrl={`${basepath}/hazards`} />
					<SidebarSectionLink name="Analysis & Forecast" linkUrl={`${basepath}/analysis-and-forecast`} />
					<SidebarSectionLink name="Climatology" linkUrl={`${basepath}/climatology`} />
					<SidebarSectionLink name="Convective" linkUrl={`${basepath}/convective`} />
					<SidebarSectionLink name="Tropical" linkUrl={`${basepath}/tropical`} />
					<SidebarSectionLink name="Winter" linkUrl={`${basepath}/winter`} />
					<SidebarSectionLink name="Hydrological" linkUrl={`${basepath}/hydrological`} />
					<SidebarSectionLink name="Fire & Drought" linkUrl={`${basepath}/fire-and-drought`} />
					<SidebarSectionLink name="Marine" linkUrl={`${basepath}/marine`} />
					<SidebarSectionLink name="Aviation" linkUrl={`${basepath}/aviation`} />
					<SidebarSectionLink name="Space" linkUrl={`${basepath}/space`} />
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
