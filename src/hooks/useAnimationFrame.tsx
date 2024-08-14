import { useRef, useEffect, useCallback } from 'react'

const useAnimationFrame = (callback: (deltaTime: number) => void) => {
	const requestRef = useRef<number>()
	const previousTimeRef = useRef<number>()

	const animate = useCallback(
		(time: number) => {
			if (previousTimeRef.current !== undefined) {
				const deltaTime = time - previousTimeRef.current
				callback(deltaTime)
			}
			previousTimeRef.current = time
			requestRef.current = requestAnimationFrame(animate)
		},
		[callback]
	)

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate)
		return () => {
			if (requestRef.current) {
				cancelAnimationFrame(requestRef.current)
			}
		}
	}, [animate]) // Make sure the effect runs only once
}

export default useAnimationFrame
