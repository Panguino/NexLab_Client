import { useLayoutEffect, useRef, useState } from 'react'

const useDimensions = () => {
	const ref = useRef(null)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 })

	useLayoutEffect(() => {
		if (!ref.current) return

		const updateDimensions = () => {
			setDimensions(ref.current.getBoundingClientRect().toJSON())
		}

		// Initialize ResizeObserver
		const resizeObserver = new ResizeObserver(updateDimensions)
		resizeObserver.observe(ref.current)

		// Update dimensions initially
		updateDimensions()

		return () => {
			resizeObserver.disconnect()
			window.removeEventListener('resize', updateDimensions)
		}
	}, [ref])

	return [ref, dimensions] as const
}

export default useDimensions
