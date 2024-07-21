'use client'
import { motion } from 'framer-motion'

import { useRootStore } from '@/store/useRootStore'
import styles from './HazardsTooltip.module.scss'
import useMousePosition from '@/hooks/useMousePosition'
import { flattenAlerts, getTitleFromFeature } from '@/util/hazardMapUtils'

const HazardsTooltip = () => {
	const tooltipContent = useRootStore.use.tooltipContent()
	const tooltipActive = useRootStore.use.tooltipActive()
	const { x, y } = useMousePosition()

	return (
		<motion.div className={styles.HazardsTooltip} animate={{ opacity: tooltipActive ? 1 : 0, x: x + 20, y: y }}>
			<h4>{getTitleFromFeature(tooltipContent.properties)}</h4>
			{tooltipContent.alerts &&
				flattenAlerts(tooltipContent.alerts).map(({ color, name, event }, index) => {
					//console.log(alert)
					return (
						<div key={index} className={styles.alert}>
							<div className={styles.color} style={{ backgroundColor: color }} />
							<div className={styles.infoText}>
								{event} <span>({name})</span>
							</div>
						</div>
					)
				})}
		</motion.div>
	)
}

export default HazardsTooltip
