/**
 * StormTooltip Component
 * Displays storm information when hovering over hurricane icons
 * Includes edge detection to keep tooltip visible within viewport and container bounds
 */

import { RefObject, useEffect, useRef, useState } from 'react'
import { StormHoverInfo } from '../types/tropicalStormTypes'
import styles from './StormTooltip.module.scss'

interface StormTooltipProps {
	info: StormHoverInfo | null
	visible: boolean
	containerRef?: RefObject<HTMLDivElement>
}

export function StormTooltip({ info, visible, containerRef }: StormTooltipProps) {
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

	const categoryLabel = typeof info.category === 'number' ? `Cat ${info.category}` : info.category

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
					<span className={styles.value}>
						{info.movementDir}° @ {info.movementSpeed} kt
					</span>
				</div>

				<div className={styles.row}>
					<span className={styles.label}>Last Update:</span>
					<span className={styles.value}>{info.lastUpdate.toLocaleString()}</span>
				</div>
			</div>
		</div>
	)
}
