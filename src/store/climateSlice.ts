import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultClimateZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface IClimateSlice {
	// Seasonal animator settings
	climateSeasonalFrameRate: number
	setClimateSeasonalFrameRate: (frameRate: number) => void
	climateSeasonalLastFrameDwell: boolean
	setClimateSeasonalLastFrameDwell: (dwell: boolean) => void
	climateSeasonalLastFrameDwellTime: number
	setClimateSeasonalLastFrameDwellTime: (dwellTime: number) => void
	climateSeasonalZoomState: zoomState
	setClimateSeasonalZoomState: (zoomState: zoomState) => void
	resetClimateSeasonalZoomState: () => void
	climateSeasonalZoomFill: boolean
	setClimateSeasonalZoomFill: (zoomFill: boolean) => void
	// Outlooks animator settings
	climateOutlooksFrameRate: number
	setClimateOutlooksFrameRate: (frameRate: number) => void
	climateOutlooksLastFrameDwell: boolean
	setClimateOutlooksLastFrameDwell: (dwell: boolean) => void
	climateOutlooksLastFrameDwellTime: number
	setClimateOutlooksLastFrameDwellTime: (dwellTime: number) => void
	climateOutlooksZoomState: zoomState
	setClimateOutlooksZoomState: (zoomState: zoomState) => void
	resetClimateOutlooksZoomState: () => void
	climateOutlooksZoomFill: boolean
	setClimateOutlooksZoomFill: (zoomFill: boolean) => void
	// SST-OLR animator settings
	climateSSTOLRNumberOfFrames: number
	setClimateSSTOLRNumberOfFrames: (frames: number) => void
	climateSSTOLRFrameRate: number
	setClimateSSTOLRFrameRate: (frameRate: number) => void
	climateSSTOLRLastFrameDwell: boolean
	setClimateSSTOLRLastFrameDwell: (dwell: boolean) => void
	climateSSTOLRLastFrameDwellTime: number
	setClimateSSTOLRLastFrameDwellTime: (dwellTime: number) => void
	climateSSTOLRZoomState: zoomState
	setClimateSSTOLRZoomState: (zoomState: zoomState) => void
	resetClimateSSTOLRZoomState: () => void
	climateSSTOLRZoomFill: boolean
	setClimateSSTOLRZoomFill: (zoomFill: boolean) => void
	climateSSTOLRMapFullScreen: boolean
	setClimateSSTOLRMapFullScreen: (fullScreen: boolean) => void
}

export const createClimateSlice: ZustandStateSlice<IClimateSlice> = (set) => ({
	// Seasonal animator settings
	climateSeasonalFrameRate: 5,
	setClimateSeasonalFrameRate: (frameRate: number) => set(() => ({ climateSeasonalFrameRate: frameRate })),
	climateSeasonalLastFrameDwell: true,
	setClimateSeasonalLastFrameDwell: (dwell: boolean) => set(() => ({ climateSeasonalLastFrameDwell: dwell })),
	climateSeasonalLastFrameDwellTime: 2,
	setClimateSeasonalLastFrameDwellTime: (dwellTime: number) => set(() => ({ climateSeasonalLastFrameDwellTime: dwellTime })),
	climateSeasonalZoomState: { ...defaultClimateZoomState },
	setClimateSeasonalZoomState: (climateSeasonalZoomState) => set(() => ({ climateSeasonalZoomState })),
	resetClimateSeasonalZoomState: () => set(() => ({ climateSeasonalZoomState: { ...defaultClimateZoomState } })),
	climateSeasonalZoomFill: false,
	setClimateSeasonalZoomFill: (zoomFill: boolean) => set(() => ({ climateSeasonalZoomFill: zoomFill })),
	// Outlooks animator settings
	climateOutlooksFrameRate: 2,
	setClimateOutlooksFrameRate: (frameRate: number) => set(() => ({ climateOutlooksFrameRate: frameRate })),
	climateOutlooksLastFrameDwell: true,
	setClimateOutlooksLastFrameDwell: (dwell: boolean) => set(() => ({ climateOutlooksLastFrameDwell: dwell })),
	climateOutlooksLastFrameDwellTime: 2,
	setClimateOutlooksLastFrameDwellTime: (dwellTime: number) => set(() => ({ climateOutlooksLastFrameDwellTime: dwellTime })),
	climateOutlooksZoomState: { ...defaultClimateZoomState },
	setClimateOutlooksZoomState: (climateOutlooksZoomState) => set(() => ({ climateOutlooksZoomState })),
	resetClimateOutlooksZoomState: () => set(() => ({ climateOutlooksZoomState: { ...defaultClimateZoomState } })),
	climateOutlooksZoomFill: false,
	setClimateOutlooksZoomFill: (zoomFill: boolean) => set(() => ({ climateOutlooksZoomFill: zoomFill })),
	// SST-OLR animator settings
	climateSSTOLRNumberOfFrames: 24,
	setClimateSSTOLRNumberOfFrames: (frames: number) => set(() => ({ climateSSTOLRNumberOfFrames: frames })),
	climateSSTOLRFrameRate: 8,
	setClimateSSTOLRFrameRate: (frameRate: number) => set(() => ({ climateSSTOLRFrameRate: frameRate })),
	climateSSTOLRLastFrameDwell: true,
	setClimateSSTOLRLastFrameDwell: (dwell: boolean) => set(() => ({ climateSSTOLRLastFrameDwell: dwell })),
	climateSSTOLRLastFrameDwellTime: 1,
	setClimateSSTOLRLastFrameDwellTime: (dwellTime: number) => set(() => ({ climateSSTOLRLastFrameDwellTime: dwellTime })),
	climateSSTOLRZoomState: { ...defaultClimateZoomState },
	setClimateSSTOLRZoomState: (climateSSTOLRZoomState) => set(() => ({ climateSSTOLRZoomState })),
	resetClimateSSTOLRZoomState: () => set(() => ({ climateSSTOLRZoomState: { ...defaultClimateZoomState } })),
	climateSSTOLRZoomFill: false,
	setClimateSSTOLRZoomFill: (zoomFill: boolean) => set(() => ({ climateSSTOLRZoomFill: zoomFill })),
	climateSSTOLRMapFullScreen: false,
	setClimateSSTOLRMapFullScreen: (fullScreen) => set({ climateSSTOLRMapFullScreen: fullScreen }),
})
