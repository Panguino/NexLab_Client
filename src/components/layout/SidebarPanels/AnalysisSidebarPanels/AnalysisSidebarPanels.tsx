'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import SidebarSubPanel from '../../SidebarSubPanel/SidebarSubPanel'

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
				<SidebarSectionHeader name="Upper Air Maps" linkUrl={basepath} />
				panel created and commented out
				{/* <UpperAirPanel basepath={basepath} /> */}
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/soundings`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Soundings" linkUrl={basepath} />
				panel created and commented out
				{/* <SoundingsPanel basepath={basepath} /> */}
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/RAP-mesoanalysis`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="RAP Mesoanalysis" linkUrl={basepath} />
				panel created and commented out
				{/* <RAPMesoPanel basepath={basepath} /> */}
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/isentropic-maps`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Isentropic Maps" linkUrl={basepath} />
				<SidebarPanelPad>
					<SidebarGroup title="Select an Isentropic Map">
						<SidebarLink name="280K" linkUrl={`${basepath}/isentropic-maps/280K`} />
						<SidebarLink name="285K" linkUrl={`${basepath}/isentropic-maps/285K`} />
						<SidebarLink name="290K" linkUrl={`${basepath}/isentropic-maps/290K`} />
						<SidebarLink name="295K" linkUrl={`${basepath}/isentropic-maps/295K`} />
						<SidebarLink name="300K" linkUrl={`${basepath}/isentropic-maps/300K`} />
						<SidebarLink name="305K" linkUrl={`${basepath}/isentropic-maps/305K`} />
						<SidebarLink name="310K" linkUrl={`${basepath}/isentropic-maps/310K`} />
					</SidebarGroup>
				</SidebarPanelPad>
			</SidebarSubPanel>
		</div>
	)
}

export default AnalysisSidebarPanels
