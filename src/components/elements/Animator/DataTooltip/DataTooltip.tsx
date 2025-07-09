import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAnimator } from '../Animator'
import styles from './DataTooltip.module.scss' // Import tooltip-specific styles

interface DataTooltipProps {
	hoverRef: React.RefObject<HTMLDivElement>
	frameRef: React.RefObject<HTMLDivElement>
}

const DataTooltip: React.FC<DataTooltipProps> = ({ hoverRef, frameRef }) => {
	const { loadedFrames, currentFrame, requestReadoutData, enableReadouts, isPlaying, isLoadingReadoutData, frameReadoutData, imageInfo } =
		useAnimator()
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 })
	const [percentagePosition, setPercentagePosition] = useState({ xPercent: 0, yPercent: 0 })
	const [isHovering, setIsHovering] = useState(false)
	const tooltipRef = useRef<HTMLDivElement>(null)
	const [tooltipPosition, setTooltipPosition] = useState('bottom-right')
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

		const imageRect = hoverRef.current.getBoundingClientRect()
		const frameRect = frameRef.current.getBoundingClientRect()
		const tooltipRect = tooltipRef.current.getBoundingClientRect()
		const tooltipWidth = tooltipRect.width
		const tooltipHeight = tooltipRect.height

		// Calculate available space
		const spaceRight = Math.min(imageRect.width, frameRect.width) - relativePosition.x
		const spaceBottom = Math.min(imageRect.height, frameRect.height) - relativePosition.y

		// Determine position based on available space
		let position = 'bottom-right' // default

		if (spaceRight < tooltipWidth + 20) {
			position = spaceBottom < tooltipHeight + 20 ? 'top-left' : 'bottom-left'
		} else if (spaceBottom < tooltipHeight + 20) {
			position = 'top-right'
		}

		setTooltipPosition(position)
	}, [relativePosition.x, relativePosition.y, hoverRef, tooltipRef, frameRef])

	useEffect(() => {
		if (!hoverRef.current || !isHovering || isPlaying || !frameReadoutData?.dataTypes?.length) return

		// Retrieve native image size and current size
		const { width: nativeWidth, height: nativeHeight } = imageInfo
		const containerRect = hoverRef.current.getBoundingClientRect()

		// Calculate scale factors
		const scaleFactorX = containerRect.width / nativeWidth
		const scaleFactorY = containerRect.height / nativeHeight

		// Scale padding based on the scale factor
		const basePadding = {
			top: 26,
			left: 0,
			right: 0,
			bottom: 26,
		}
		const scaledPadding = {
			top: basePadding.top * scaleFactorY,
			left: basePadding.left * scaleFactorX,
			right: basePadding.right * scaleFactorX,
			bottom: basePadding.bottom * scaleFactorY,
		}

		// Adjust dimensions based on scaled padding
		const adjustedWidth = containerRect.width - scaledPadding.left - scaledPadding.right
		const adjustedHeight = containerRect.height - scaledPadding.top - scaledPadding.bottom

		// Adjust position based on scaled padding
		const adjustedX = relativePosition.x - scaledPadding.left
		const adjustedY = relativePosition.y - scaledPadding.top

		// Calculate percentages based on adjusted dimensions and positions
		const percentageX = Math.max(0, Math.min(1, adjustedX / adjustedWidth))
		const percentageY = Math.max(0, Math.min(1, adjustedY / adjustedHeight))
		setPercentagePosition({ xPercent: percentageX, yPercent: percentageY })

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
	}, [frameReadoutData, relativePosition, isHovering, isPlaying, hoverRef, imageInfo])

	useEffect(() => {
		const handleMouseMove = (e) => {
			const rect = hoverRef.current.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			setRelativePosition({ x, y })
			setMousePosition({ x: e.clientX, y: e.clientY })
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
			className={`${styles.dataTooltip} ${styles[tooltipPosition]}`}
			style={{
				left: `${mousePosition.x}px`,
				top: `${mousePosition.y}px`,
			}}
		>
			<div className={styles.tooltipContent}>
				<p>
					Frame: {currentFrame + 1}/{loadedFrames.length}
				</p>
				<p>
					Position: {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}
				</p>
				<p>Percentage Position X: {Math.floor(100 * percentagePosition.xPercent)}%</p>
				<p>Percentage Position Y: {Math.floor(100 * percentagePosition.yPercent)}%</p>

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
