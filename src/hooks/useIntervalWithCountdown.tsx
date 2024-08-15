import { useEffect, useRef, useState } from 'react'

export function useIntervalWithCountdown(callback: () => void, delay: number | null) {
	const savedCallback = useRef(callback)
	const [timeRemaining, setTimeRemaining] = useState<number | null>(delay)

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		// Don't schedule if no delay is specified.
		if (delay === null) {
			setTimeRemaining(null)
			return
		}

		setTimeRemaining(delay) // Initialize timeRemaining with the full delay
		const end = Date.now() + delay

		const tick = () => {
			savedCallback.current()
			setTimeRemaining(delay) // Reset timeRemaining after each callback
		}

		const countdown = () => {
			const now = Date.now()
			const newTimeRemaining = Math.max(end - now, 0)
			setTimeRemaining(newTimeRemaining)
		}

		const id = setInterval(tick, delay)
		const countdownId = setInterval(countdown, 200) // Update timeRemaining every second

		countdown() // Initialize countdown immediately without waiting for the first interval

		return () => {
			clearInterval(id)
			clearInterval(countdownId)
		}
	}, [delay])

	return { timeRemaining }
}
