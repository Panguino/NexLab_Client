import { ZustandStateSlice } from './useRootStore'

export interface NavigationOrigin {
	route: string
	label: string
	timestamp: number
	state?: {
		// Essential UI state to restore
		validTime?: string | number
		zoomState?: {
			positionX: number
			positionY: number
			scale: number
		}
		selectedModels?: string[]
		selectedRuns?: string[]
		frameValidTime?: number
		runFlag?: string
	}
}

export interface INavigationSlice {
	// Navigation origin tracking
	soundingOrigin: NavigationOrigin | null
	setSoundingOrigin: (origin: NavigationOrigin | null) => void
	clearSoundingOrigin: () => void
	
	// Telemetry tracking
	trackBackNavigation: (origin: string, destination: string, success: boolean, latency: number) => void
}

export const createNavigationSlice: ZustandStateSlice<INavigationSlice> = (set) => ({
	soundingOrigin: null,
	
	setSoundingOrigin: (origin: NavigationOrigin | null) => {
		set({ soundingOrigin: origin })
	},
	
	clearSoundingOrigin: () => {
		set({ soundingOrigin: null })
	},
	
	trackBackNavigation: (origin: string, destination: string, success: boolean, latency: number) => {
		// Track telemetry for back button usage
		if (typeof window !== 'undefined') {
			console.log('🔙 Back Navigation Telemetry:', {
				origin,
				destination,
				success,
				latency,
				timestamp: Date.now()
			})

			// If analytics/telemetry service is available, send data
			// This can be extended to integrate with actual analytics services
			if ((window as any).gtag) {
				(window as any).gtag('event', 'sounding_back_navigation', {
					origin_type: origin,
					destination_route: destination,
					success: success,
					latency_ms: latency,
					custom_parameter_1: 'forecast_sounding'
				})
			}
		}
	}
})
