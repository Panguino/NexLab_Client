'use client'
import { motion } from 'framer-motion'

import { useRootStore } from '@/store/useRootStore'
import styles from './HazardsTooltip.module.scss'
import useMousePosition from '@/hooks/useMousePosition'
import hazardColors from '@/data/hazardColors.json'
import getAlertIdByEvent from '@/util/getAlertIdByEvent'
import { getTitleFromFeature } from '@/util/hazardMapUtils'
import { HAZARD_COLORS } from '@/data/hazardMapVars'

const HazardsTooltip = () => {
	const tooltipContent = useRootStore.use.tooltipContent()
	const tooltipActive = useRootStore.use.tooltipActive()
	const { x, y } = useMousePosition()

	const flattenAlerts = (alerts: any) => {
		const flatAlerts = []
		const alertTypes = []
		alerts.forEach((alert: any) => {
			const alertInfo = getAlertIdByEvent(alert.properties.event)
			if (alertTypes.includes(`${alertInfo.type} ${alertInfo.level}`)) {
				return
			} else {
				flatAlerts.push(alert)
			}
			alertTypes.push(`${alertInfo.type} ${alertInfo.level}`)
		})
		return flatAlerts
	}

	return (
		<motion.div className={styles.HazardsTooltip} animate={{ opacity: tooltipActive ? 1 : 0, x: x + 20, y: y }}>
			<h4>{getTitleFromFeature(tooltipContent.feature)}</h4>
			{tooltipContent.alerts &&
				flattenAlerts(tooltipContent.alerts).map((alert: any, index) => {
					const alertInfo = getAlertIdByEvent(alert.properties.event)
					//console.log(alert)
					return (
						<div key={index} className={styles.alert}>
							<div className={styles.color} style={{ backgroundColor: `rgb(${HAZARD_COLORS[alertInfo.type][alertInfo.level]})` }} />
							<div>{alert.properties.event}</div>
						</div>
					)
				})}
		</motion.div>
	)
}

export default HazardsTooltip
