import { ZustandStateSlice } from './useRootStore'

const ZOOM_FILL_STORAGE_KEY = 'nexlab-global-zoom-fill'

// Helper function to detect if device is mobile
const getIsMobile = (): boolean => {
	if (typeof window === 'undefined') return false // SSR safety
	return window.innerWidth <= 900 // Same breakpoint as useIsMobile hook
}

// Helper function to get initial zoom fill value from localStorage
const getInitialZoomFill = (): boolean => {
	if (typeof window === 'undefined') return false // SSR safety

	const stored = localStorage.getItem(ZOOM_FILL_STORAGE_KEY)
	if (stored !== null) {
		return JSON.parse(stored)
	}

	// If no stored value exists, use mobile detection to set appropriate default
	const isMobile = getIsMobile()
	const initialValue = isMobile

	// Save the initial value to localStorage immediately
	localStorage.setItem(ZOOM_FILL_STORAGE_KEY, JSON.stringify(initialValue))

	return initialValue
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
}

export const createGlobalSettingsSlice: ZustandStateSlice<IGlobalSettingsSlice> = (set) => ({
	temperatureUnit: '°F',
	setTemperatureUnit: (unit: '°F' | '°C') => set(() => ({ temperatureUnit: unit })),
	globalZoomFill: getInitialZoomFill(),
	setGlobalZoomFill: (zoomFill: boolean) => {
		saveZoomFillToStorage(zoomFill)
		set(() => ({ globalZoomFill: zoomFill }))
	},
})
