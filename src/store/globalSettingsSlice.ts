import { ZustandStateSlice } from './useRootStore'

const ZOOM_FILL_STORAGE_KEY = 'nexlab-global-zoom-fill'

// Helper function to get initial zoom fill value from localStorage
const getInitialZoomFill = (): boolean => {
	if (typeof window === 'undefined') return false // SSR safety

	const stored = localStorage.getItem(ZOOM_FILL_STORAGE_KEY)
	if (stored !== null) {
		return JSON.parse(stored)
	}

	// If no stored value exists, return false (will be set to mobile value on first load)
	return false
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
	initializeGlobalZoomFill: (isMobile: boolean) => void
}

export const createGlobalSettingsSlice: ZustandStateSlice<IGlobalSettingsSlice> = (set) => ({
	temperatureUnit: '°F',
	setTemperatureUnit: (unit: '°F' | '°C') => set(() => ({ temperatureUnit: unit })),
	globalZoomFill: getInitialZoomFill(),
	setGlobalZoomFill: (zoomFill: boolean) => {
		saveZoomFillToStorage(zoomFill)
		set(() => ({ globalZoomFill: zoomFill }))
	},
	initializeGlobalZoomFill: (isMobile: boolean) => {
		if (typeof window === 'undefined') return // SSR safety

		const stored = localStorage.getItem(ZOOM_FILL_STORAGE_KEY)
		if (stored === null) {
			// First time - no stored value, use mobile setting
			const initialValue = isMobile
			saveZoomFillToStorage(initialValue)
			set(() => ({ globalZoomFill: initialValue }))
		}
		// If stored value exists, we already loaded it in getInitialZoomFill()
	},
})
