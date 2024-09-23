import { useEffect, useState } from 'react'

export const useIsMobile = () => {
	// Define the breakpoint
	const mobileBreakpoint = 900

	// State to hold the check
	const [isMobile, setIsMobile] = useState(window.innerWidth < mobileBreakpoint)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < mobileBreakpoint)
		}

		// Add event listener
		window.addEventListener('resize', handleResize)

		// Call the handler right away so state gets updated with initial window size
		handleResize()

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize)
	}, []) // Empty array ensures effect is only run on mount and unmount

	return { isMobile }
}
