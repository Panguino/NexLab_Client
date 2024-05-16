'use client'
import { motion } from 'framer-motion'

import useHazardsStore from '@/store/useHazardsStore'
import styles from './HazardsTooltip.module.scss'
import useMousePosition from '@/hooks/useMousePosition'
import hazardColors from '@/data/hazardColors.json'
import getAlertIdByEvent from '@/data/getAlertIdByEvent'

const HazardsTooltip = () => {
	const { tooltipContent, tooltipActive } = useHazardsStore((state) => state)
	const { x, y } = useMousePosition()
	const getTitle = () => {
		if (tooltipContent.feature) {
			if (tooltipContent.feature.properties.COUNTYNAME) {
				return `${tooltipContent.feature.properties.COUNTYNAME} county, ${tooltipContent.feature.properties.STATE}`
			}
			if (tooltipContent.feature.properties.NAME) {
				return tooltipContent.feature.properties.NAME
			}
		}
		return ''
	}

	return (
		<motion.div className={styles.HazardsTooltip} animate={{ opacity: tooltipActive ? 1 : 0, x: x + 20, y: y }}>
			<h4>{getTitle()}</h4>
			{tooltipContent.alerts &&
				tooltipContent.alerts.map((alert: any, index) => {
					//console.log(alert)
					return (
						<div key={index} className={styles.alert}>
							<div
								className={styles.color}
								style={{ backgroundColor: `rgb(${hazardColors[getAlertIdByEvent(alert.properties.event)]})` }}
							/>
							<div>{alert.properties.event}</div>
						</div>
					)
				})}
		</motion.div>
	)
}

export default HazardsTooltip
