/**
 * StormTooltip Component
 * Displays storm information when hovering over hurricane icons
 */

import { StormHoverInfo } from '../types/tropicalStormTypes'
import styles from './StormTooltip.module.scss'

interface StormTooltipProps {
	info: StormHoverInfo | null
	visible: boolean
}

export function StormTooltip({ info, visible }: StormTooltipProps) {
	if (!info || !visible) return null

	// Calculate tooltip position with offset from cursor
	const tooltipX = info.x + 10
	const tooltipY = info.y + 10

	const categoryLabel = typeof info.category === 'number' ? `Cat ${info.category}` : info.category

	return (
		<div
			className={styles.tooltip}
			style={{
				left: `${tooltipX}px`,
				top: `${tooltipY}px`,
				display: visible ? 'block' : 'none',
			}}
		>
			<div className={styles.header}>
				<div className={styles.name}>{info.name}</div>
				<div className={styles.category}>{categoryLabel}</div>
			</div>

			<div className={styles.content}>
				<div className={styles.row}>
					<span className={styles.label}>Classification:</span>
					<span className={styles.value}>{info.classification}</span>
				</div>

				<div className={styles.row}>
					<span className={styles.label}>Intensity:</span>
					<span className={styles.value}>{info.intensity} kt</span>
				</div>

				<div className={styles.row}>
					<span className={styles.label}>Pressure:</span>
					<span className={styles.value}>{info.pressure} mb</span>
				</div>

				<div className={styles.row}>
					<span className={styles.label}>Movement:</span>
					<span className={styles.value}>{info.movementDir}° @ {info.movementSpeed} kt</span>
				</div>

				<div className={styles.row}>
					<span className={styles.label}>Last Update:</span>
					<span className={styles.value}>{info.lastUpdate.toLocaleString()}</span>
				</div>
			</div>
		</div>
	)
}

