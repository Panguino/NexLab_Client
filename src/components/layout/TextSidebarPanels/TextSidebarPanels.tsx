'use client'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

import { SidebarSectionLink } from '@/components/elements/SidebarSectionLink/SidebarSectionLink'
import styles from './TextSidebarPanels.module.scss'
import { SidebarSectionHeader } from '@/components/elements/SidebarSectionHeader/SidebarSectionHeader'
import { SidebarGroup } from '@/components/elements/SidebarGroup/SidebarGroup'
import { SidebarLink } from '@/components/elements/SidebarLink/SidebarLink'

const defaultTransition = {
	default: {
		duration: 0.4,
		ease: 'easeInOut'
	}
}

const TextSidebarPanels = () => {
	const basepath = '/data/text'
	const pathname = usePathname()

	return (
		<div className={styles.TextSidebarPanels}>
			<motion.div
				className={styles.MainPanel}
				animate={{ x: pathname === `${basepath}` ? '0%' : '-100%' }}
				transition={{ ...defaultTransition }}
				initial={{ x: pathname === `${basepath}` ? '0%' : '-100%' }}
			>
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
			</motion.div>
			<motion.div
				className={styles.SubPanel}
				animate={{ x: pathname === `${basepath}/NWF-WFO` ? '0%' : '100%' }}
				initial={{ x: pathname === `${basepath}/NWF-WFO` ? '0%' : '100%' }}
				transition={{ ...defaultTransition }}
			>
				<SidebarSectionHeader name="NWS WFO" linkUrl={basepath} />
				<div style={{ padding: '10px 20px 30px 20px' }}>
					<SidebarGroup title="Sector Selection">
						<SidebarLink name="Conus" linkUrl={''} />
						<SidebarLink name="Alaska" linkUrl={''} />
						<SidebarLink name="Hawaii" linkUrl={''} />
						<SidebarLink name="Puerto Rico" linkUrl={''} />
						<SidebarLink name="Guam" linkUrl={''} />
						<SidebarLink name="Amer. Samoa" linkUrl={''} />
					</SidebarGroup>
				</div>
			</motion.div>
			<motion.div
				className={styles.SubPanel}
				animate={{ x: pathname === `${basepath}/hazards` ? '0%' : '100%' }}
				initial={{ x: pathname === `${basepath}/hazards` ? '0%' : '100%' }}
				transition={{ ...defaultTransition }}
			>
				<SidebarSectionHeader name="Hazards" linkUrl={basepath} />
				<div style={{ padding: '10px 20px 30px 20px' }}>
					<SidebarLink name="View Table" linkUrl={''} />
					<SidebarGroup title="Sector Selection">
						<SidebarLink name="Conus" linkUrl={''} />
						<SidebarLink name="Alaska" linkUrl={''} />
						<SidebarLink name="Hawaii" linkUrl={''} />
						<SidebarLink name="Puerto Rico" linkUrl={''} />
						<SidebarLink name="Guam" linkUrl={''} />
						<SidebarLink name="Amer. Samoa" linkUrl={''} />
					</SidebarGroup>
				</div>
			</motion.div>
		</div>
	)
}

export default TextSidebarPanels
