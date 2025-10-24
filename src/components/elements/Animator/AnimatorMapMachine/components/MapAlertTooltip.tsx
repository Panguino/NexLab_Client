'use client'
import useMousePosition from '@/hooks/useMousePosition'
import { motion } from 'framer-motion'
import styles from './MapAlertTooltip.module.scss'

interface Alert {
	color: [number, number, number, number] | string
	name: string
	event: string
	headline?: string
}

interface MapAlertTooltipProps {
	visible: boolean
	title: string
	alerts: Alert[]
}

/**
 * MapAlertTooltip Component
 * Displays county/region name and associated alerts with color swatches
 * Follows the mouse cursor similar to HazardsTooltip
 */
export function MapAlertTooltip({ visible, title, alerts }: MapAlertTooltipProps) {
	const mousePosition = useMousePosition()
	const x = mousePosition?.x || 0
	const y = mousePosition?.y || 0

	// Convert RGBA array to hex string for display
	const rgbaToHex = (rgba: [number, number, number, number] | string): string => {
		if (typeof rgba === 'string') return rgba
		if (!Array.isArray(rgba)) return '#808080'
		const [r, g, b] = rgba
		return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
	}

	// Convert RGBA array to CSS color string
	const rgbaToCss = (rgba: [number, number, number, number] | string): string => {
		if (typeof rgba === 'string') return rgba
		if (!Array.isArray(rgba)) return 'rgba(128, 128, 128, 1)'
		const [r, g, b, a] = rgba
		return `rgba(${r}, ${g}, ${b}, ${a / 255})`
	}

	return (
		<motion.div
			className={styles.MapAlertTooltip}
			animate={{
				opacity: visible ? 1 : 0,
				x: x + 20,
				y: y,
			}}
			transition={{ duration: 0.2 }}
			pointerEvents={visible ? 'auto' : 'none'}
		>
			<h4>{title}</h4>
			{alerts && alerts.length > 0 ? (
				alerts.map(({ color, name, event }, index) => {
					return (
						<div key={index} className={styles.alert}>
							<div
								className={styles.color}
								style={{ backgroundColor: rgbaToCss(color) }}
								title={typeof color === 'string' ? color : rgbaToHex(color)}
							/>
							<div className={styles.infoText}>
								{event} <span>({name})</span>
							</div>
						</div>
					)
				})
			) : (
				<div className={styles.noAlerts}>No active alerts</div>
			)}
		</motion.div>
	)
}

export default MapAlertTooltip
