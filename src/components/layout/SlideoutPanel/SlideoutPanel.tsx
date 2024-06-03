'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

import { DATA_TEXT_HAZARDS_MAP_DETAILS } from '@/config/vars'
import styles from './SlideoutPanel.module.scss'
import { useRootStore } from '@/store/useRootStore'
import HazardsDetailPanel from '@/components/blocks/HazardsMap/HazardsDetailPanel/HazardsDetailPanel'

const SlideoutPanel = () => {
	const slideoutPanelIsOpen = useRootStore.use.slideoutPanelIsOpen()
	const currentSlideoutPanel = useRootStore.use.currentSlideoutPanel()
	const closeSlideoutPanel = useRootStore.use.closeSlideoutPanel()

	const [hovering, setHovering] = useState(false)
	//router
	/*const router = useRouter()

    //indicates if the registration von successful

    useEffect(() => {
        closeSlideoutPanel()
    }, [router])
*/
	const getPanelType = (type) => {
		switch (type) {
			case DATA_TEXT_HAZARDS_MAP_DETAILS:
				return <HazardsDetailPanel />
			default:
				return <></>
		}
	}

	return (
		<div className={styles.SlideoutPanel}>
			<div className={styles.PanelWrapper}>
				<motion.div className={styles.OverflowPanel} animate={{ opacity: hovering ? 1 : 0 }} />
				<motion.div
					className={styles.Panel}
					animate={{ x: slideoutPanelIsOpen ? '0%' : '100%' }}
					onMouseOver={() => {
						setHovering(true)
					}}
					onMouseOut={() => {
						setHovering(false)
					}}
				>
					<div className={styles.Close} onClick={closeSlideoutPanel}>
						X
					</div>
					{getPanelType(currentSlideoutPanel)}
				</motion.div>
			</div>
		</div>
	)
}

export default SlideoutPanel
