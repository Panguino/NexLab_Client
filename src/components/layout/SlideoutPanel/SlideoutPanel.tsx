'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import HazardsDetailPanel from '@/components/blocks/Hazards/HazardsMap/HazardsDetailPanel/HazardsDetailPanel'
import { Meilisearch } from '@/components/blocks/Meilisearch/Meilisearch'
import CloseX from '@/components/elements/icons/CloseX/CloseX'
import { DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT, SEARCH_RESULTS_SLIDEOUT } from '@/data/vars'
import { useRootStore } from '@/store/useRootStore'
import { usePathname } from 'next/navigation'
import styles from './SlideoutPanel.module.scss'

const SlideoutPanel = () => {
	const slideoutPanelIsOpen = useRootStore.use.slideoutPanelIsOpen()
	const currentSlideoutPanel = useRootStore.use.currentSlideoutPanel()
	const closeSlideoutPanel = useRootStore.use.closeSlideoutPanel()

	const [hovering, setHovering] = useState(false)
	//router
	const pathname = usePathname()

	//indicates if the registration von successful

	useEffect(() => {
		closeSlideoutPanel()
	}, [pathname, closeSlideoutPanel])

	const getPanelType = (type: string) => {
		switch (type) {
			case DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT:
				return <HazardsDetailPanel />
			case SEARCH_RESULTS_SLIDEOUT:
				return <Meilisearch />
			default:
				return <></>
		}
	}

	return (
		<div className={styles.SlideoutPanel}>
			<div className={styles.PanelWrapper} style={{ paddingTop: pathname !== '/' ? '106px' : '69px' }}>
				<motion.div className={styles.OverflowPanel} animate={{ opacity: slideoutPanelIsOpen && hovering ? 1 : 0 }} />
				<motion.div
					className={styles.Panel}
					animate={{ x: slideoutPanelIsOpen ? '0%' : '100%', transition: { ease: 'backOut', duration: 0.35 } }}
					onMouseOver={() => {
						setHovering(true)
					}}
					onMouseOut={() => {
						setHovering(false)
					}}
				>
					<div className={styles.Close} onClick={closeSlideoutPanel}>
						<CloseX />
					</div>
					<div className={styles.PanelContent}>{getPanelType(currentSlideoutPanel)}</div>
				</motion.div>
			</div>
		</div>
	)
}

export default SlideoutPanel
