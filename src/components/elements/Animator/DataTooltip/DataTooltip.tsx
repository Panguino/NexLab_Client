import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAnimator } from '../Animator'
import styles from './DataTooltip.module.scss' // Import tooltip-specific styles

interface DataTooltipProps {
	hoverRef: React.RefObject<HTMLDivElement>
}

const DataTooltip: React.FC<DataTooltipProps> = ({ hoverRef }) => {
	const { loadedFrames, currentFrame, requestReadoutData, enableReadouts, isPlaying, isLoadingReadoutData, frameReadoutData } = useAnimator()
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isHovering, setIsHovering] = useState(false)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, position: 'bottom-right' })
	const [tooltipContent, setTooltipContent] = useState({})

	useEffect(() => {
		// Check conditions for requesting data
		if (enableReadouts && !isPlaying && requestReadoutData && currentFrame >= 0) {
			// Request readout data for the current frame
			requestReadoutData(currentFrame)
		}
	}, [currentFrame, enableReadouts, isPlaying, requestReadoutData])

	const calculateTooltipPosition = useCallback(() => {
		if (!hoverRef.current || !tooltipRef.current) return

		const containerRect = hoverRef.current.getBoundingClientRect()
		const tooltipRect = tooltipRef.current.getBoundingClientRect()
		const tooltipWidth = tooltipRect.width
		const tooltipHeight = tooltipRect.height

		// Calculate available space
		const spaceRight = containerRect.width - mousePosition.x
		const spaceBottom = containerRect.height - mousePosition.y

		// Determine position based on available space
		let position = 'bottom-right' // default

		if (spaceRight < tooltipWidth + 20) {
			position = spaceBottom < tooltipHeight + 20 ? 'top-left' : 'bottom-left'
		} else if (spaceBottom < tooltipHeight + 20) {
			position = 'top-right'
		}

		setTooltipPosition({
			x: mousePosition.x,
			y: mousePosition.y,
			position,
		})
	}, [mousePosition.x, mousePosition.y, hoverRef, tooltipRef])

	useEffect(() => {
		if (!hoverRef.current || !isHovering || isPlaying || !frameReadoutData?.dataTypes?.length) return
		const containerRect = hoverRef.current.getBoundingClientRect()
		const percentageX = mousePosition.x / containerRect.width
		const percentageY = mousePosition.y / containerRect.height
		try {
			const dataAtMousePosition = frameReadoutData.dataTypes.reduce((acc, dataType) => {
				const type2DArray = frameReadoutData.readoutData[dataType]
				const typeYIndex = Math.floor(percentageY * type2DArray.length)
				const typeXIndex = Math.floor(percentageX * type2DArray[typeYIndex].length)
				acc[dataType] = type2DArray[typeYIndex][typeXIndex]

				return acc
			}, {})

			setTooltipContent(dataAtMousePosition)
			// console.log('Tooltip content updated:', dataAtMousePosition, 'Has entries:', Object.keys(dataAtMousePosition).length > 0)
		} catch (error) {
			console.error('Error processing readout data:', error)
		}
	}, [frameReadoutData, mousePosition, isHovering, isPlaying, hoverRef])

	useEffect(() => {
		const handleMouseMove = (e) => {
			const rect = hoverRef.current.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			setMousePosition({ x, y })
			calculateTooltipPosition()
		}

		const handleMouseEnter = () => {
			setIsHovering(true)
		}

		const handleMouseLeave = () => {
			setIsHovering(false)
		}

		const element = hoverRef.current

		if (element) {
			element.addEventListener('mousemove', handleMouseMove)
			element.addEventListener('mouseenter', handleMouseEnter)
			element.addEventListener('mouseleave', handleMouseLeave)
		}

		return () => {
			if (element) {
				element.removeEventListener('mousemove', handleMouseMove)
				element.removeEventListener('mouseenter', handleMouseEnter)
				element.removeEventListener('mouseleave', handleMouseLeave)
			}
		}
	}, [hoverRef, calculateTooltipPosition])

	if (!enableReadouts || !isHovering || isPlaying) return null

	return (
		<div
			ref={tooltipRef}
			className={`${styles.dataTooltip} ${styles[tooltipPosition.position]}`}
			style={{
				left: `${tooltipPosition.x}px`,
				top: `${tooltipPosition.y}px`,
			}}
		>
			<div className={styles.tooltipContent}>
				<p>
					Frame: {currentFrame + 1}/{loadedFrames.length}
				</p>
				<p>
					Position: {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}
				</p>

				{/* Show loading indicator */}
				{isLoadingReadoutData && <p className={styles.loadingIndicator}>Loading data...</p>}

				{/* Show readout data if available */}
				{frameReadoutData && Object.keys(tooltipContent).length > 0 ? (
					<div className={styles.readoutData}>
						{Object.entries(tooltipContent).map(([key, value]) => (
							<p key={key}>
								<strong>{key}:</strong> {String(value)}
							</p>
						))}
					</div>
				) : (
					frameReadoutData && <p>No data available at this position</p>
				)}
			</div>
		</div>
	)
}

export default DataTooltip
