'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import HazardsDetailPanel from '@/components/blocks/Hazards/HazardsMap/HazardsDetailPanel/HazardsDetailPanel'
import { Meilisearch } from '@/components/blocks/Meilisearch/Meilisearch'
import MetarTextPanel from '@/components/blocks/MetarTextPanel/MetarTextPanel'
import ProductInfoPanel from '@/components/blocks/ProductInfoPanel/ProductInfoPanel'
import SoundingTextPanel from '@/components/blocks/SoundingTextPanel/SoundingTextPanel'
import TropicalTextPanel from '@/components/blocks/TropicalTextPanel/TropicalTextPanel'
import WFOTextPanel from '@/components/blocks/WFOTextPanel/WFOTextPanel'
import CloseX from '@/components/elements/icons/CloseX/CloseX'
import {
	DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT,
	METAR_TEXT_SLIDEOUT,
	PRODUCT_INFO_SLIDEOUT,
	SEARCH_RESULTS_SLIDEOUT,
	SOUNDING_TEXT_SLIDEOUT,
	TROPICAL_TEXT_SLIDEOUT,
	WFO_TEXT_SLIDEOUT,
} from '@/data/vars'
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
		// Don't close the tropical panel when navigating between tropical products
		if (currentSlideoutPanel === TROPICAL_TEXT_SLIDEOUT && pathname.includes('/nhc-tropical-hurricane-weather/')) {
			// Stay open when moving between tropical products
			return
		}
		// Don't close the WFO panel when navigating between WFO products
		if (currentSlideoutPanel === WFO_TEXT_SLIDEOUT && pathname.includes('/nws-wfo-national-weather-service-forecast-offices/')) {
			// Stay open when moving between WFO products
			return
		}
		closeSlideoutPanel()
	}, [pathname, closeSlideoutPanel, currentSlideoutPanel])

	const getPanelType = (type: string) => {
		switch (type) {
			case DATA_TEXT_HAZARDS_MAP_DETAILS_SLIDEOUT:
				return <HazardsDetailPanel />
			case SEARCH_RESULTS_SLIDEOUT:
				return <Meilisearch />
			case PRODUCT_INFO_SLIDEOUT:
				return <ProductInfoPanel />
			case METAR_TEXT_SLIDEOUT:
				return <MetarTextPanel />
			case SOUNDING_TEXT_SLIDEOUT:
				return <SoundingTextPanel />
			case TROPICAL_TEXT_SLIDEOUT:
				return <TropicalTextPanel />
			case WFO_TEXT_SLIDEOUT:
				return <WFOTextPanel />
			default:
				return <></>
		}
	}

	// Determine padding based on page layout
	// Homepage: 69px (special nav height)
	// Pages with SubNav (weather-data, academics, storm-chasing): 106px (70px nav + 36px subnav)
	// Pages without SubNav (not-found, feedback, donate, etc): 70px
	const getPaddingTop = () => {
		if (pathname === '/') return '69px'
		if (pathname.startsWith('/weather-data') || pathname.startsWith('/academics') || pathname.startsWith('/storm-chasing')) {
			return '106px'
		}
		return '70px'
	}

	return (
		<div className={styles.SlideoutPanel}>
			<div className={styles.PanelWrapper} style={{ paddingTop: getPaddingTop() }}>
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
