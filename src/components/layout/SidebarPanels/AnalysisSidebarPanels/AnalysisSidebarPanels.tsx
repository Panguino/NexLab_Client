'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import SidebarSubPanel from '../../SidebarSubPanel/SidebarSubPanel'
import SoundingsPanel from '../SoundingsPanel/SoundingsPanel'
import styles from './AnalysisSidebarPanels.module.scss'

const AnalysisSidebarPanels = () => {
	const basepath = '/weather-data/analysis'

	return (
		<div className={styles.AnalysisSidebarPanels}>
			<SidebarSubPanel path={basepath} activeX="0%" inactiveX="-100%">
				<SidebarPanelPad>
					<SidebarSectionLink name="Surface Maps" linkUrl={`${basepath}/surface-maps`} />
					<SidebarSectionLink name="Upper Air maps" linkUrl={`${basepath}/upper-air`} />
					<SidebarSectionLink name="Soundings" linkUrl={`${basepath}/soundings`} />
					<SidebarSectionLink name="Cross-Sectional Analysis" linkUrl={`${basepath}/cross-sectional-analysis`} />
					<SidebarSectionLink name="Isentropic Analysis" linkUrl={`${basepath}/isentropic-maps`} />
				</SidebarPanelPad>
			</SidebarSubPanel>
			<SidebarSubPanel path={`${basepath}/surface-maps`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Surface Maps" linkUrl={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel path={`${basepath}/upper-air`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Upper Air Maps" linkUrl={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel path={`${basepath}/soundings`} activeX="0%" inactiveX="100%">
				<SoundingsPanel basepath={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel path={`${basepath}/rap-mesoanalysis`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="RAP Mesoanalysis" linkUrl={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel path={`${basepath}/isentropic-maps`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Isentropic Maps" linkUrl={basepath} />
			</SidebarSubPanel>
			<SidebarSubPanel path={`${basepath}/cross-sectional-analysis`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Cross-Sectional Analysis" linkUrl={basepath} />
				<SidebarPanelPad>
					<SidebarGroup title="Cross-Sectional Analysis">
						<SidebarLink name="Albequerque, NM to Nashville, TN" linkUrl={'abq-bna'} />
						<SidebarLink name="Corpus Christi, TX to Riverton, WY" linkUrl={'crp-riw'} />
						<SidebarLink name="Del Rio, TX to Green Bay, WI" linkUrl={'drt-grb'} />
						<SidebarLink name="Del Rio, TX to Tallahassee, FL" linkUrl={'drt-tlh'} />
						<SidebarLink name="Del Rio, TX to Bismark, ND" linkUrl={'drt-bis'} />
						<SidebarLink name="Denver, CO to Willmington, OH" linkUrl={'den-iln'} />
						<SidebarLink name="Green Bay, WI to Slidell, LA" linkUrl={'sil-grb'} />
						<SidebarLink name="Riverton, WY to White Lake, MI" linkUrl={'riw-dtx'} />
					</SidebarGroup>
				</SidebarPanelPad>
			</SidebarSubPanel>
		</div>
	)
}

export default AnalysisSidebarPanels
