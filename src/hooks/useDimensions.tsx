import { useLayoutEffect, useRef, useState } from 'react'

const useDimensions = () => {
	const ref = useRef(null)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 })
	useLayoutEffect(() => {
		const updateDimensions = () => {
			setDimensions(ref.current.getBoundingClientRect().toJSON())
		}

		window.addEventListener('resize', updateDimensions)
		updateDimensions() // Update dimensions initially

		return () => {
			window.removeEventListener('resize', updateDimensions)
		}
	}, [ref])
	return [ref, dimensions] as const
}
export default useDimensions
