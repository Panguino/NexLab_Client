/**
 * CwaTooltip Component
 * Displays CWA region information when hovering over CWA zones
 * Shows region name, WFO office, and summary of alerts by type
 * Includes edge detection to keep tooltip visible within viewport and container bounds
 */

import { RefObject, useEffect, useRef, useState } from 'react'
import styles from './CwaTooltip.module.scss'

interface AlertSummary {
	event: string
	count: number
	color: [number, number, number, number]
}

export interface CwaTooltipInfo {
	cwaId: string
	wfoId: string
	name: string
	alertSummary: AlertSummary[]
	x: number
	y: number
}

interface CwaTooltipProps {
	info: CwaTooltipInfo | null
	visible: boolean
	containerRef?: RefObject<HTMLDivElement>
}

export function CwaTooltip({ info, visible, containerRef }: CwaTooltipProps) {
	const tooltipRef = useRef<HTMLDivElement>(null)
	const [position, setPosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		if (!info || !visible || !tooltipRef.current) return

		const tooltip = tooltipRef.current
		const tooltipRect = tooltip.getBoundingClientRect()

		// Get container bounds if available, otherwise use viewport
		let containerBounds = {
			left: 0,
			top: 0,
			right: window.innerWidth,
			bottom: window.innerHeight,
		}

		if (containerRef?.current) {
			const containerRect = containerRef.current.getBoundingClientRect()
			containerBounds = {
				left: containerRect.left,
				top: containerRect.top,
				right: containerRect.right,
				bottom: containerRect.bottom,
			}
		}

		// Default offset from cursor
		const offset = 15
		const padding = 10 // Extra padding from edges
		let x = info.x + offset
		let y = info.y + offset

		// Check if tooltip would go off the right edge of container
		if (x + tooltipRect.width + padding > containerBounds.right) {
			// Position to the left of cursor instead
			x = info.x - tooltipRect.width - offset
		}

		// Check if tooltip would go off the bottom edge of container
		if (y + tooltipRect.height + padding > containerBounds.bottom) {
			// Position above cursor instead
			y = info.y - tooltipRect.height - offset
		}

		// Ensure tooltip doesn't go off the left edge of container
		if (x < containerBounds.left + padding) {
			x = containerBounds.left + padding
		}

		// Ensure tooltip doesn't go off the top edge of container
		if (y < containerBounds.top + padding) {
			y = containerBounds.top + padding
		}

		setPosition({ x, y })
	}, [info, visible, containerRef])

	if (!info || !visible) return null

	// Convert RGBA array to CSS color string
	const rgbaToCss = (rgba: [number, number, number, number]): string => {
		const [r, g, b, a] = rgba
		return `rgba(${r}, ${g}, ${b}, ${a / 255})`
	}

	const totalAlerts = info.alertSummary.reduce((sum, alert) => sum + alert.count, 0)

	return (
		<div
			ref={tooltipRef}
			className={styles.tooltip}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				display: visible ? 'block' : 'none',
			}}
		>
			<div className={styles.header}>
				<div className={styles.name}>{info.name}</div>
				<div className={styles.wfoId}>{info.wfoId}</div>
			</div>

			<div className={styles.content}>
				{totalAlerts > 0 ? (
					<>
						<div className={styles.summary}>
							{totalAlerts} {totalAlerts === 1 ? 'Alert' : 'Alerts'} in Region
						</div>
						<div className={styles.alerts}>
							{info.alertSummary.map((alert, index) => (
								<div key={index} className={styles.alert}>
									<div className={styles.color} style={{ backgroundColor: rgbaToCss(alert.color) }} />
									<div className={styles.infoText}>
										{alert.event} <span className={styles.count}>({alert.count})</span>
									</div>
								</div>
							))}
						</div>
					</>
				) : (
					<div className={styles.noAlerts}>No active alerts in region</div>
				)}
			</div>
		</div>
	)
}
