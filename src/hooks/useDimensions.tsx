import { useLayoutEffect, useRef, useState } from 'react'

const useDimensions = (aspectRatio?: number) => {
	const ref = useRef(null)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0, x: 0, y: 0, adjustedWidth: 0, adjustedHeight: 0 })

	useLayoutEffect(() => {
		if (!ref.current) return

		const updateDimensions = () => {
			const rect = ref.current.getBoundingClientRect()
			const { width, height } = rect.toJSON()
			let adjustedWidth = width
			let adjustedHeight = height

			if (aspectRatio) {
				const containerAspectRatio = width / height
				if (containerAspectRatio > aspectRatio) {
					// Container is wider than the desired aspect ratio
					// Increase height to fill the space, adjust width based on the aspect ratio
					adjustedHeight = width / aspectRatio
				} else if (containerAspectRatio < aspectRatio) {
					// Container is taller than the desired aspect ratio
					// Increase width to fill the space, adjust height based on the aspect ratio
					adjustedWidth = height * aspectRatio
				}
				// If containerAspectRatio equals aspectRatio, no adjustment needed
			}

			setDimensions({ width, height, adjustedWidth, adjustedHeight, x: rect.x, y: rect.y })
		}

		// Initialize ResizeObserver
		const resizeObserver = new ResizeObserver(updateDimensions)
		resizeObserver.observe(ref.current)

		// Update dimensions initially
		updateDimensions()

		return () => {
			resizeObserver.disconnect()
		}
	}, [aspectRatio]) // Removed ref from the dependency array as it's a ref object and won't change

	return [ref, dimensions] as const
}

export default useDimensions
