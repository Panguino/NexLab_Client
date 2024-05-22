import { useRef, useEffect } from 'react'

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
	const requestRef = useRef<number>()
	const previousTimeRef = useRef<number>()

	const animate = (time: number) => {
		if (previousTimeRef.current !== undefined) {
			const deltaTime = time - previousTimeRef.current
			callback(deltaTime)
		}
		previousTimeRef.current = time
		requestRef.current = requestAnimationFrame(animate)
	}

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate)
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current)
			}
		}
	}, []) // Make sure the effect runs only once
}

export default useAnimationFrame
