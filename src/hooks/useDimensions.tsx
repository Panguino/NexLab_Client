import { useCallback, useLayoutEffect, useRef, useState } from 'react'

const useDimensions = (aspectRatio?: number, contain: boolean = false) => {
	const ref = useRef(null)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0, x: 0, y: 0, adjustedWidth: 0, adjustedHeight: 0 })

	const updateDimensions = useCallback(() => {
		if (!ref.current) return
		const rect = ref.current.getBoundingClientRect()
		const { width, height } = rect.toJSON()
		let adjustedWidth = width
		let adjustedHeight = height

		if (aspectRatio) {
			const containerAspectRatio = width / height
			if (containerAspectRatio > aspectRatio) {
				// Container is wider than the desired aspect ratio
				if (contain) {
					// Adjust width to fit inside the container
					adjustedWidth = height * aspectRatio
				} else {
					// Bleed outside: Adjust height to fill the space
					adjustedHeight = width / aspectRatio
				}
			} else if (containerAspectRatio < aspectRatio) {
				// Container is taller than the desired aspect ratio
				if (contain) {
					// Adjust height to fit inside the container
					adjustedHeight = width / aspectRatio
				} else {
					// Bleed outside: Adjust width to fill the space
					adjustedWidth = height * aspectRatio
				}
			}
			// If containerAspectRatio equals aspectRatio, no adjustment needed
		}
		setDimensions({ width, height, adjustedWidth, adjustedHeight, x: rect.x, y: rect.y })
	}, [aspectRatio, contain])

	useLayoutEffect(() => {
		if (!ref.current) return () => {}

		// Initialize ResizeObserver
		const resizeObserver = new ResizeObserver(updateDimensions)
		resizeObserver.observe(ref.current)

		// Update dimensions initially
		updateDimensions()

		return () => {
			resizeObserver.disconnect()
		}
	}, [aspectRatio, contain, updateDimensions]) // Added contain to the dependency array

	return [ref, dimensions, updateDimensions] as const
}

export default useDimensions
