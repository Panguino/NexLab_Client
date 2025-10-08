/**
 * Utility functions for calculating position coordinates within animator images
 */

interface ImageInfo {
	width: number
	height: number
}

interface PositionResult {
	xPercent: number
	yPercent: number
}

interface TransformState {
	scale: number
	positionX: number
	positionY: number
}

/**
 * Extracts client coordinates from mouse or touch events
 * @param e - Mouse or Touch event
 * @returns Object with clientX and clientY, or null if coordinates cannot be extracted
 */
export const getClientCoordinates = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
	if ('touches' in e && e.touches.length > 0) {
		// Active touch event
		return {
			clientX: e.touches[0].clientX,
			clientY: e.touches[0].clientY,
		}
	} else if ('changedTouches' in e && e.changedTouches.length > 0) {
		// Touch end event
		return {
			clientX: e.changedTouches[0].clientX,
			clientY: e.changedTouches[0].clientY,
		}
	} else if ('clientX' in e) {
		// Mouse event
		return {
			clientX: e.clientX,
			clientY: e.clientY,
		}
	}
	return null
}

/**
 * Calculates the percentage position within an animator image, accounting for padding, scaling, and transforms
 * @param clientX - Client X coordinate from event
 * @param clientY - Client Y coordinate from event
 * @param containerRect - DOMRect of the container element
 * @param imageInfo - Native image dimensions (width and height)
 * @param transformState - Optional transform state (scale, positionX, positionY) from react-zoom-pan-pinch
 * @returns Object with xPercent and yPercent (0-1 range, can be outside for clicks outside image bounds)
 */
export const calculateAnimatorPosition = (
	clientX: number,
	clientY: number,
	containerRect: DOMRect,
	imageInfo: ImageInfo,
	transformState?: TransformState | null,
): PositionResult => {
	// console.log('🧮 [calculateAnimatorPosition] Starting calculation')
	// console.log('  📥 Inputs:', { clientX, clientY })
	// console.log('  📦 Container:', {
	// 	left: containerRect.left,
	// 	top: containerRect.top,
	// 	width: containerRect.width,
	// 	height: containerRect.height,
	// })
	// console.log('  🖼️  Image info:', imageInfo)
	// console.log('  🔄 Transform state:', transformState)

	// Calculate position relative to container
	let relativeX = clientX - containerRect.left
	let relativeY = clientY - containerRect.top
	// console.log('  📍 Initial relative position:', { relativeX, relativeY })

	// If there's a transform (zoom/pan), reverse it to get position on the original image
	if (transformState && transformState.scale !== 1) {
		const { scale, positionX, positionY } = transformState
		// console.log('  🔄 Reversing transform:', { scale, positionX, positionY })

		// Reverse the transform: (displayPos - translation) / scale
		relativeX = (relativeX - positionX) / scale
		relativeY = (relativeY - positionY) / scale
		// console.log('  📐 Unscaled relative position:', { relativeX, relativeY })
	}

	// Calculate scale factors (for padding calculation)
	const { width: nativeWidth, height: nativeHeight } = imageInfo
	const scaleFactorX = containerRect.width / nativeWidth
	const scaleFactorY = containerRect.height / nativeHeight
	// console.log('  📏 Scale factors:', { scaleFactorX, scaleFactorY })

	// Scale padding based on the scale factor (26px top/bottom padding from AnimatorImageMachine)
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
	// console.log('  📐 Padding:', { basePadding, scaledPadding })

	// Adjust dimensions based on scaled padding
	const adjustedWidth = containerRect.width - scaledPadding.left - scaledPadding.right
	const adjustedHeight = containerRect.height - scaledPadding.top - scaledPadding.bottom
	// console.log('  📊 Adjusted dimensions:', { adjustedWidth, adjustedHeight })

	// Adjust position based on scaled padding
	const adjustedX = relativeX - scaledPadding.left
	const adjustedY = relativeY - scaledPadding.top
	// console.log('  🎯 Adjusted position:', { adjustedX, adjustedY })

	// Calculate percentages (can be outside 0-1 range if click is outside image bounds)
	const xPercent = adjustedX / adjustedWidth
	const yPercent = adjustedY / adjustedHeight
	// console.log('  ✅ Final percentages:', { xPercent, yPercent }) // Disabled logging for production

	return { xPercent, yPercent }
}

/**
 * Calculates the percentage position from a mouse or touch event
 * Convenience function that combines coordinate extraction and position calculation
 * @param e - Mouse or Touch event
 * @param containerRect - DOMRect of the container element
 * @param imageInfo - Native image dimensions (width and height)
 * @param transformState - Optional transform state (scale, positionX, positionY) from react-zoom-pan-pinch
 * @returns Object with xPercent and yPercent, or null if coordinates cannot be extracted
 */
export const calculatePositionFromEvent = (
	e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
	containerRect: DOMRect,
	imageInfo: ImageInfo,
	transformState?: TransformState | null,
): PositionResult | null => {
	const coords = getClientCoordinates(e)
	if (!coords) return null

	return calculateAnimatorPosition(coords.clientX, coords.clientY, containerRect, imageInfo, transformState)
}
