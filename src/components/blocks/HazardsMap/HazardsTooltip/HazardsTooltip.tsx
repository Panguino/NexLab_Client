'use client'
import { motion } from 'framer-motion'

import { useRootStore } from '@/store/useRootStore'
import styles from './HazardsTooltip.module.scss'
import useMousePosition from '@/hooks/useMousePosition'
import { getTitleFromFeature } from '@/util/hazardMapUtils'

const HazardsTooltip = () => {
	const tooltipContent = useRootStore.use.tooltipContent()
	const tooltipActive = useRootStore.use.tooltipActive()
	const { x, y } = useMousePosition()

	const flattenAlerts = (alerts: any) => {
		const flatAlerts = new Set()
		const alertInfo = []
		alerts.map((alert: any) => {
			const alertId = `${alert.hazardInfo.type.name} ${alert.hazardInfo.level.name}`
			if (!flatAlerts.has(alertId)) {
				flatAlerts.add(`${alert.hazardInfo.type.name} ${alert.hazardInfo.level.name}`)
				alertInfo.push({
					color: alert.hazardInfo.color.HEX,
					name: `${alert.hazardInfo.type.name} ${alert.hazardInfo.level.name}`
				})
			}
		})
		return alertInfo
	}

	return (
		<motion.div className={styles.HazardsTooltip} animate={{ opacity: tooltipActive ? 1 : 0, x: x + 20, y: y }}>
			<h4>{getTitleFromFeature(tooltipContent.properties)}</h4>
			{tooltipContent.info &&
				flattenAlerts(tooltipContent.info).map(({ color, name }, index) => {
					//console.log(alert)
					return (
						<div key={index} className={styles.alert}>
							<div className={styles.color} style={{ backgroundColor: color }} />
							<div>{name}</div>
						</div>
					)
				})}
		</motion.div>
	)
}

export default HazardsTooltip
