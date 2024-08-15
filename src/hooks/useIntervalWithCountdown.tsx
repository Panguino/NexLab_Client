import { useEffect, useRef, useState } from 'react'

export function useIntervalWithCountdown(callback: () => void, delay: number | null) {
	const savedCallback = useRef(callback)
	// Initialize timeRemaining with the full delay in milliseconds.
	const [timeRemaining, setTimeRemaining] = useState<number | null>(delay)

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		if (delay === null) {
			setTimeRemaining(null)
			return
		}

		// Set the end time for the current interval.
		let end = Date.now() + delay
		setTimeRemaining(delay)

		const tick = () => {
			savedCallback.current()
			// Reset the end time after each main interval tick.
			end = Date.now() + delay
			setTimeRemaining(delay)
		}

		const countdown = () => {
			// Calculate the new time remaining.
			const now = Date.now()
			const newTimeRemaining = Math.max(end - now, 0)
			setTimeRemaining(newTimeRemaining)
		}

		// Main interval for the callback.
		const id = setInterval(tick, delay)
		// Countdown interval to update `timeRemaining` every second.
		const countdownId = setInterval(countdown, 300)

		// Initial countdown to start immediately.
		countdown()

		return () => {
			clearInterval(id)
			clearInterval(countdownId)
		}
	}, [delay])

	return { timeRemaining }
}
