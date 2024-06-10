'use client'
import { motion } from 'framer-motion'

import { useRootStore } from '@/store/useRootStore'
import styles from './HazardsTooltip.module.scss'
import useMousePosition from '@/hooks/useMousePosition'
import hazardColors from '@/data/hazardColors.json'
import getAlertIdByEvent from '@/util/getAlertIdByEvent'
import { getTitleFromFeature } from '@/util/hazardMapUtils'

const HazardsTooltip = () => {
	const tooltipContent = useRootStore.use.tooltipContent()
	const tooltipActive = useRootStore.use.tooltipActive()
	const { x, y } = useMousePosition()

	const flattenAlerts = (alerts: any) => {
		const flatAlerts = []
		const alertTypes = []
		alerts.forEach((alert: any) => {
			const alertType = getAlertIdByEvent(alert.properties.event)
			if (alertTypes.includes(alertType)) {
				return
			} else {
				flatAlerts.push(alert)
			}
			alertTypes.push(alertType)
		})
		return flatAlerts
	}

	return (
		<motion.div className={styles.HazardsTooltip} animate={{ opacity: tooltipActive ? 1 : 0, x: x + 20, y: y }}>
			<h4>{getTitleFromFeature(tooltipContent.feature)}</h4>
			{tooltipContent.alerts &&
				flattenAlerts(tooltipContent.alerts).map((alert: any, index) => {
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
