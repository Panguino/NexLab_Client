'use client'

import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import SidebarSubPanel from '../../SidebarSubPanel/SidebarSubPanel'

import IsentropicPanel from '../IsentropicPanel/IsentropicPanel'
import RAPMesoPanel from '../RAPMesoPanel/RAPMesoPanel'
import SoundingsPanel from '../SoundingsPanel/SoundingsPanel'
import UpperAirPanel from '../UpperAirPanel/UpperAirPanel'
import styles from './AnalysisSidebarPanels.module.scss'

const AnalysisSidebarPanels = () => {
	const basepath = '/weather-data/analysis'

	return (
		<div className={styles.AnalysisSidebarPanels}>
			<SidebarSubPanel matchesPath={basepath} activeX="0%" inactiveX="-100%">
				<SidebarPanelPad>
					<SidebarSectionLink name="Surface Maps" linkUrl={`${basepath}/surface-maps`} />
					<SidebarSectionLink name="Upper Air maps" linkUrl={`${basepath}/upper-air`} />
					<SidebarSectionLink name="Soundings" linkUrl={`${basepath}/soundings`} />
					<SidebarSectionLink name="RAP Mesoanalysis" linkUrl={`${basepath}/RAP-mesoanalysis`} />
					<SidebarSectionLink name="Isentropic Analysis" linkUrl={`${basepath}/isentropic-maps`} />
					<SidebarSectionLink name="Cross-Sectional Analysis" linkUrl={`${basepath}/cross-sectional-analysis`} />
				</SidebarPanelPad>
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/surface-maps`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Surface Maps" linkUrl={basepath} />
				panel created and commented out
				{/* <SurfaceMapsPanel basepath={basepath} /> */}
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/upper-air`} activeX="0%" inactiveX="100%">
				<UpperAirPanel basepath={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/soundings`} activeX="0%" inactiveX="100%">
				<SoundingsPanel basepath={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/RAP-mesoanalysis`} activeX="0%" inactiveX="100%">
				<RAPMesoPanel basepath={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/isentropic-maps`} activeX="0%" inactiveX="100%">
				<IsentropicPanel basepath={basepath} />
			</SidebarSubPanel>
		</div>
	)
}

export default AnalysisSidebarPanels
