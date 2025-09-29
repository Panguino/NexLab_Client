import { ZustandStateSlice } from './useRootStore'

const ZOOM_FILL_STORAGE_KEY = 'nexlab-global-zoom-fill'

// Helper function to detect if device is mobile
const getIsMobile = (): boolean => {
	if (typeof window === 'undefined') return false // SSR safety
	return window.innerWidth <= 900 // Same breakpoint as useIsMobile hook
}



// Helper function to save zoom fill value to localStorage
const saveZoomFillToStorage = (zoomFill: boolean) => {
	if (typeof window === 'undefined') return // SSR safety
	localStorage.setItem(ZOOM_FILL_STORAGE_KEY, JSON.stringify(zoomFill))
}

export interface IGlobalSettingsSlice {
	temperatureUnit: '°F' | '°C'
	setTemperatureUnit: (unit: '°F' | '°C') => void
	globalZoomFill: boolean
	setGlobalZoomFill: (zoomFill: boolean) => void
	initializeZoomFillFromStorage: () => void
}

export const createGlobalSettingsSlice: ZustandStateSlice<IGlobalSettingsSlice> = (set) => ({
	temperatureUnit: '°F',
	setTemperatureUnit: (unit: '°F' | '°C') => set(() => ({ temperatureUnit: unit })),
	globalZoomFill: false, // Start with false to avoid hydration mismatch
	setGlobalZoomFill: (zoomFill: boolean) => {
		saveZoomFillToStorage(zoomFill)
		set(() => ({ globalZoomFill: zoomFill }))
	},
	initializeZoomFillFromStorage: () => {
		if (typeof window === 'undefined') return

		const stored = localStorage.getItem(ZOOM_FILL_STORAGE_KEY)
		if (stored !== null) {
			const storedValue = JSON.parse(stored)
			set(() => ({ globalZoomFill: storedValue }))
		} else {
			// First time - use mobile detection
			const isMobile = getIsMobile()
			const initialValue = isMobile
			saveZoomFillToStorage(initialValue)
			set(() => ({ globalZoomFill: initialValue }))
		}
	},
})
