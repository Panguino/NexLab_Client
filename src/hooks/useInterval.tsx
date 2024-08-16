import { useEffect, useRef } from 'react'

import { useIsomorphicLayoutEffect } from 'usehooks-ts'

export function useInterval(callback: () => void, delay: number | null) {
	const savedCallback = useRef(callback)

	// Remember the latest callback if it changes.
	useIsomorphicLayoutEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// Set up the interval.
	useEffect(() => {
		// Don't schedule if no delay is specified.
		// Note: 0 is a valid value for delay.
		if (delay === null) {
			return null
		}

		const id = setInterval(() => {
			savedCallback.current()
		}, delay)

		return () => {
			clearInterval(id)
		}
	}, [delay])

	// Add a return statement at the end of the function.
	return
}
