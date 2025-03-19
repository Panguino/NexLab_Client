'use client'

import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import SidebarPanelPad from '../../SidebarPanelPad/SidebarPanelPad'
import SidebarSubPanel from '../../SidebarSubPanel/SidebarSubPanel'

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
				<SidebarSectionHeader name="Soundings" linkUrl={basepath} />
				panel created and commented out
				{/* <SoundingsPanel basepath={basepath} /> */}
			</SidebarSubPanel>
			<SidebarSubPanel includesPath={`${basepath}/RAP-mesoanalysis`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="RAP Mesoanalysis" linkUrl={basepath} />
				<SidebarPanelPad>
					<SidebarGroup title="Select a Product">
						<SidebarLink name="300mb Divergence" linkUrl={`${basepath}/RAP-mesoanalysis/300div`} />
						<SidebarLink name="300mb Jet Analysis" linkUrl={`${basepath}/RAP-mesoanalysis/300mb`} />
						<SidebarLink name="500mb Jet Analysis" linkUrl={`${basepath}/RAP-mesoanalysis/500mb`} />
						<SidebarLink name="500mb Vorticity & Water Vapor" linkUrl={`${basepath}/RAP-mesoanalysis/wvvor`} />
						<SidebarLink name="500mb Vorticity Advection" linkUrl={`${basepath}/RAP-mesoanalysis/500vora`} />
						<SidebarLink name="500-850mb Crossover" linkUrl={`${basepath}/RAP-mesoanalysis/cross`} />
						<SidebarLink name="700mb Relative Humidity" linkUrl={`${basepath}/RAP-mesoanalysis/700mb`} />
						<SidebarLink name="700mb Vorticity Advection" linkUrl={`${basepath}/RAP-mesoanalysis/700vora`} />
						<SidebarLink name="700mb Frontogenesis" linkUrl={`${basepath}/RAP-mesoanalysis/700fronto`} />
						<SidebarLink name="850mb Jet Analysis" linkUrl={`${basepath}/RAP-mesoanalysis/850mb`} />
						<SidebarLink name="850mb Moisture Advection" linkUrl={`${basepath}/RAP-mesoanalysis/850Madv`} />
						<SidebarLink name="850mb Temperature Advection" linkUrl={`${basepath}/RAP-mesoanalysis/850Tadv`} />
						<SidebarLink name="Trenberth Forcing" linkUrl={`${basepath}/RAP-mesoanalysis/trenberth`} />
					</SidebarGroup>
				</SidebarPanelPad>
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
			<SidebarSubPanel includesPath={`${basepath}/cross-sectional-analysis`} activeX="0%" inactiveX="100%">
				<SidebarSectionHeader name="Cross-Sectional Analysis" linkUrl={basepath} />
				<SidebarPanelPad>
					<SidebarGroup title="Select a Cross-Section">
						<SidebarLink name="Albequerque, NM to Nashville, TN" linkUrl={`${basepath}/cross-sectional-analysis/abq-bna`} />
						<SidebarLink name="Corpus Christi, TX to Riverton, WY" linkUrl={`${basepath}/cross-sectional-analysis/crp-riw`} />
						<SidebarLink name="Del Rio, TX to Green Bay, WI" linkUrl={`${basepath}/cross-sectional-analysis/drt-grb`} />
						<SidebarLink name="Del Rio, TX to Tallahassee, FL" linkUrl={`${basepath}/cross-sectional-analysis/drt-tlh`} />
						<SidebarLink name="Del Rio, TX to Bismark, ND" linkUrl={`${basepath}/cross-sectional-analysis/drt-bis`} />
						<SidebarLink name="Denver, CO to Willmington, OH" linkUrl={`${basepath}/cross-sectional-analysis/den-iln`} />
						<SidebarLink name="Green Bay, WI to Slidell, LA" linkUrl={`${basepath}/cross-sectional-analysis/sil-grb`} />
						<SidebarLink name="Riverton, WY to White Lake, MI" linkUrl={`${basepath}/cross-sectional-analysis/riw-dtx`} />
					</SidebarGroup>
				</SidebarPanelPad>
			</SidebarSubPanel>
		</div>
	)
}

export default AnalysisSidebarPanels
