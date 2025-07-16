import { useEffect, useRef, useState } from 'react'

/**
 * Hook to detect when a user has been idle for a specified period of time
 * @param idleTime Time in milliseconds before user is considered idle (default: 15000ms)
 * @returns Boolean indicating whether the user is currently idle
 */
export function useIsUserIdle(idleTime: number = 15000): boolean {
	const [isIdle, setIsIdle] = useState(false)
	const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
	const isIdleRef = useRef(false) // Use a ref to track idle state internally

	useEffect(() => {
		// Update the ref when the state changes
		isIdleRef.current = isIdle
	}, [isIdle])

	useEffect(() => {
		const resetIdleTimer = () => {
			// Clear existing timeout
			if (idleTimerRef.current) {
				clearTimeout(idleTimerRef.current)
			}

			// If we were in idle state, switch to active
			if (isIdleRef.current) {
				setIsIdle(false)
			}

			// Set new timeout
			idleTimerRef.current = setTimeout(() => {
				setIsIdle(true)
			}, idleTime)
		}

		// List of events that indicate user activity
		const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'touchmove', 'wheel', 'click', 'keypress']

		// Initialize timer
		resetIdleTimer()

		// Register event listeners
		activityEvents.forEach((event) => {
			window.addEventListener(event, resetIdleTimer)
		})

		// Cleanup event listeners and timer
		return () => {
			if (idleTimerRef.current) {
				clearTimeout(idleTimerRef.current)
			}

			activityEvents.forEach((event) => {
				window.removeEventListener(event, resetIdleTimer)
			})
		}
	}, [idleTime]) // Remove isIdle from dependencies to prevent the feedback loop

	return isIdle
}
