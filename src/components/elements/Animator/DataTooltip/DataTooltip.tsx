import { calculateAnimatorPosition } from '@/util/animatorPositionCalculator'
import { createReadout } from '@/util/createForecastReadout'
import { getLatLonFromXYandSector } from '@/util/forecast/common-functions'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAnimator } from '../Animator'
import styles from './DataTooltip.module.scss' // Import tooltip-specific styles

interface DataTooltipProps {
	hoverRef: React.RefObject<HTMLDivElement>
	frameRef: React.RefObject<HTMLDivElement>
	onUpdatePosition: (position: { xPercent: number; yPercent: number }) => void
	debug?: boolean
	sectorId?: string // Add sectorId to show lat/lon
}

const DataTooltip: React.FC<DataTooltipProps> = ({ hoverRef, frameRef, onUpdatePosition, debug = false, sectorId }) => {
	const { loadedFrames, currentFrame, requestReadoutData, enableReadouts, isPlaying, isLoadingReadoutData, frameReadoutData, imageInfo } =
		useAnimator()
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 })
	const [percentagePosition, setPercentagePosition] = useState({ xPercent: 0, yPercent: 0, rawPercentageX: 0, rawPercentageY: 0 })
	const [isHovering, setIsHovering] = useState(false)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const [tooltipPosition, setTooltipPosition] = useState('bottom-right')
	const [tooltipContent, setTooltipContent] = useState<Record<string, any>>({})
	// Keep a stable reference to onUpdatePosition to avoid effect loops due to identity changes
	const onUpdateRef = useRef(onUpdatePosition)
	useEffect(() => {
		onUpdateRef.current = onUpdatePosition
	}, [onUpdatePosition])

	useEffect(() => {
		// Check conditions for requesting data
		if (enableReadouts && !isPlaying && requestReadoutData && currentFrame >= 0) {
			// Request readout data for the current frame
			requestReadoutData(currentFrame)
		}
	}, [currentFrame, enableReadouts, isPlaying, requestReadoutData])

	const calculateTooltipPosition = useCallback(() => {
		if (!hoverRef.current || !tooltipRef.current || !frameRef.current) return

		const imageRect = hoverRef.current.getBoundingClientRect()
		const frameRect = frameRef.current.getBoundingClientRect()
		const tooltipRect = tooltipRef.current.getBoundingClientRect()
		const tooltipWidth = tooltipRect.width + 20 // to account for padding
		const tooltipHeight = tooltipRect.height + 20 // to account for padding

		// determine if tooltip is approaching edge of frame
		const isNearRightEdge = relativePosition.x + tooltipWidth > frameRect.width
		const isNearBottomEdge = relativePosition.y + tooltipHeight > frameRect.height

		// determine if tooltip is approaching edge of hover area
		const isNearHoverRightEdge = relativePosition.x + tooltipWidth > imageRect.width
		const isNearHoverBottomEdge = relativePosition.y + tooltipHeight > imageRect.height

		// set position to bottom-right or bottom-left based on proximity to edges
		let position = 'bottom-right'
		if (isNearRightEdge || isNearHoverRightEdge) {
			position = 'bottom-left'
			if (isNearBottomEdge || isNearHoverBottomEdge) {
				position = 'top-left'
			}
		} else {
			if (isNearBottomEdge || isNearHoverBottomEdge) {
				position = 'top-right'
			}
		}

		setTooltipPosition(position)
	}, [relativePosition.x, relativePosition.y, hoverRef, tooltipRef, frameRef])

	useEffect(() => {
		if (!hoverRef.current || !isHovering || isPlaying) return

		const containerRect = hoverRef.current.getBoundingClientRect()

		// Use utility function to calculate position
		const { xPercent: rawPercentageX, yPercent: rawPercentageY } = calculateAnimatorPosition(
			relativePosition.x + containerRect.left,
			relativePosition.y + containerRect.top,
			containerRect,
			imageInfo,
		)

		const percentageX = Math.max(0, Math.min(0.999, rawPercentageX))
		const percentageY = Math.max(0, Math.min(0.999, rawPercentageY))
		setPercentagePosition({ xPercent: percentageX, yPercent: percentageY, rawPercentageX, rawPercentageY })
		onUpdateRef.current?.({ xPercent: rawPercentageX, yPercent: rawPercentageY })

		// Log lat/lon conversion if sectorId is provided
		console.log('🔍 [DataTooltip] sectorId:', sectorId)
		if (sectorId) {
			const latLon = getLatLonFromXYandSector(rawPercentageX, rawPercentageY, sectorId)
			console.log('🗺️  [DataTooltip] Hover position → Lat/Lon:', latLon)
		} else {
			console.log('⚠️  [DataTooltip] No sectorId provided, cannot calculate lat/lon')
		}

		if (frameReadoutData?.dataTypes?.length) {
			try {
				const dataAtMousePosition = frameReadoutData.dataTypes.reduce((acc: Record<string, any>, dataType: string) => {
					const type2DArray = frameReadoutData.readoutData[dataType]
					const typeYIndex = Math.floor(percentageY * type2DArray.length)
					const typeXIndex = Math.floor(percentageX * type2DArray[typeYIndex].length)
					acc[dataType] = type2DArray[typeYIndex][typeXIndex]

					return acc
				}, {})

				setTooltipContent(dataAtMousePosition)
			} catch (error) {
				console.log(rawPercentageX, rawPercentageY, percentageX, percentageY)
				console.error('Error processing readout data:', error)
			}
		}
	}, [frameReadoutData, relativePosition, isHovering, isPlaying, hoverRef, imageInfo, onUpdatePosition, sectorId])

	useEffect(() => {
		const handleMove = (e: MouseEvent | TouchEvent) => {
			// Extract coordinates from mouse or touch event
			let clientX: number, clientY: number
			if ('touches' in e && e.touches.length > 0) {
				// Touch event
				clientX = e.touches[0].clientX
				clientY = e.touches[0].clientY
			} else if ('clientX' in e) {
				// Mouse event
				clientX = e.clientX
				clientY = e.clientY
			} else {
				return
			}

			if (!hoverRef.current) return

			const rect = hoverRef.current.getBoundingClientRect()
			const x = clientX - rect.left
			const y = clientY - rect.top
			setRelativePosition({ x, y })
			setMousePosition({ x: clientX, y: clientY })
			calculateTooltipPosition()
		}

		const handleEnter = () => {
			setIsHovering(true)
		}

		const handleLeave = () => {
			setIsHovering(false)
		}

		const element = hoverRef.current

		if (element) {
			// Mouse events
			element.addEventListener('mousemove', handleMove)
			element.addEventListener('mouseenter', handleEnter)
			element.addEventListener('mouseleave', handleLeave)

			// Touch events
			element.addEventListener('touchstart', handleEnter)
			element.addEventListener('touchmove', handleMove)
			element.addEventListener('touchend', handleLeave)
			element.addEventListener('touchcancel', handleLeave)
		}

		return () => {
			if (element) {
				// Mouse events
				element.removeEventListener('mousemove', handleMove)
				element.removeEventListener('mouseenter', handleEnter)
				element.removeEventListener('mouseleave', handleLeave)

				// Touch events
				element.removeEventListener('touchstart', handleEnter)
				element.removeEventListener('touchmove', handleMove)
				element.removeEventListener('touchend', handleLeave)
				element.removeEventListener('touchcancel', handleLeave)
			}
		}
	}, [hoverRef, calculateTooltipPosition])

	const hideTooltip =
		!enableReadouts ||
		!isHovering ||
		isPlaying ||
		percentagePosition.rawPercentageX < 0 ||
		percentagePosition.rawPercentageX > 1 ||
		percentagePosition.rawPercentageY < 0 ||
		percentagePosition.rawPercentageY > 1

	return (
		<div
			ref={tooltipRef}
			className={`${styles.dataTooltip} ${styles[tooltipPosition]}`}
			style={{
				left: `${mousePosition.x}px`,
				top: `${mousePosition.y}px`,
			}}
		>
			{!hideTooltip && (
				<div className={styles.tooltipContent}>
					{debug && (
						<div className={styles.debugInfo}>
							<p>
								Frame: {currentFrame + 1}/{loadedFrames.length}
							</p>
							<p>
								Position: {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}
							</p>
							<p>Percentage Position X: {Math.floor(100 * percentagePosition.xPercent)}%</p>
							<p>Percentage Position Y: {Math.floor(100 * percentagePosition.yPercent)}%</p>
							{sectorId && (
								<p style={{ color: '#0ec5ff', fontWeight: 'bold' }}>
									Lat/Lon: {getLatLonFromXYandSector(percentagePosition.xPercent, percentagePosition.yPercent, sectorId) || 'N/A'}
								</p>
							)}
						</div>
					)}

					{/* Show loading indicator if data is being fetched */}
					{/* Show loading indicator */}
					{isLoadingReadoutData && <p className={styles.loadingIndicator}>Loading data...</p>}

					{/* Show readout data if available */}
					{frameReadoutData && Object.keys(tooltipContent).length > 0 ? (
						<div className={styles.readoutData}>
							{Object.entries(tooltipContent).map(([key, value]) => {
								const formattedData = createReadout(key)
								return (
									<p key={key}>
										<strong>{formattedData.label}:</strong> {String(value)}
										<span dangerouslySetInnerHTML={{ __html: formattedData.unit }} />
									</p>
								)
							})}
						</div>
					) : (
						frameReadoutData && <p>No data available at this position</p>
					)}
				</div>
			)}
		</div>
	)
}

export default DataTooltip
