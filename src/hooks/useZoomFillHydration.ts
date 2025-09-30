import { useRootStore } from '@/store/useRootStore'
import { useEffect } from 'react'

/**
 * Hook to handle proper hydration of zoom fill setting from localStorage
 * This ensures the button state matches the stored preference on page load
 */
export const useZoomFillHydration = () => {
	const initializeZoomFillFromStorage = useRootStore.use.initializeZoomFillFromStorage()

	useEffect(() => {
		// Initialize zoom fill from localStorage on client side
		initializeZoomFillFromStorage()
	}, [initializeZoomFillFromStorage])
}
