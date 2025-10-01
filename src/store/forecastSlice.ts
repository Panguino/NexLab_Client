import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultForecastZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface IForecastSlice {
	forecastSoundingsPickMode: boolean
	setForecastSoundingsPickMode: (mode: boolean) => void
	forecastFrameValidTime: number
	setForecastFrameValidTime: (validTime: number) => void
	forecastSoundingRunId?: number
	setForecastSoundingRunId?: (runId: number) => void
	forecastZoomState: zoomState
	setForecastZoomState: (zoomState: zoomState) => void
	resetForecastZoomState: () => void
	forecastZoomFill: boolean
	setForecastZoomFill: (zoomFill: boolean) => void
	forecastMapFullScreen: boolean
	setForecastMapFullScreen: (fullScreen: boolean) => void
	forecastFrameRate: number
	setForecastFrameRate: (frameRate: number) => void
	forecastLastFrameDwell: boolean
	setForecastLastFrameDwell: (dwell: boolean) => void
	forecastLastFrameDwellTime?: number
	setForecastLastFrameDwellTime?: (dwellTime: number) => void
	forecastDataRefreshInterval: number
	setForecastDataRefreshInterval: (interval: number) => void
	forecastDataRefreshActive: boolean
	setForecastDataRefreshActive: (active: boolean) => void
	// forecast sounding state
	forecastSoundingZoomState: zoomState
	setForecastSoundingZoomState: (zoomState: zoomState) => void
	resetForecastSoundingZoomState: () => void
	forecastSoundingZoomFill: boolean
	setForecastSoundingZoomFill: (zoomFill: boolean) => void
	forecastSoundingMapFullScreen: boolean
	setForecastSoundingMapFullScreen: (fullScreen: boolean) => void
	forecastSoundingFrameRate: number
	setForecastSoundingFrameRate: (frameRate: number) => void
	forecastSoundingLastFrameDwell: boolean
	setForecastSoundingLastFrameDwell: (dwell: boolean) => void
	forecastSoundingLastFrameDwellTime?: number
	setForecastSoundingLastFrameDwellTime?: (dwellTime: number) => void
	// forecast comparison state
	runFlag: string
	setRunFlag: (flag: string) => void
}

export const createForecastSlice: ZustandStateSlice<IForecastSlice> = (set) => ({
	forecastSoundingsPickMode: false,
	setForecastSoundingsPickMode: (mode: boolean) => set(() => ({ forecastSoundingsPickMode: mode })),
	forecastFrameValidTime: 0,
	setForecastFrameValidTime: (validTime: number) => set(() => ({ forecastFrameValidTime: validTime })),
	forecastSoundingRunId: null,
	setForecastSoundingRunId: (runId: number) => set(() => ({ forecastSoundingRunId: runId })),
	forecastZoomState: { ...defaultForecastZoomState },
	setForecastZoomState: (forecastZoomState) => set(() => ({ forecastZoomState })),
	resetForecastZoomState: () => set(() => ({ forecastZoomState: { ...defaultForecastZoomState } })),
	forecastZoomFill: false,
	setForecastZoomFill: (zoomFill: boolean) => set(() => ({ forecastZoomFill: zoomFill })),
	forecastMapFullScreen: false,
	setForecastMapFullScreen: (fullScreen) => set({ forecastMapFullScreen: fullScreen }),
	forecastFrameRate: 10,
	setForecastFrameRate: (frameRate: number) => set(() => ({ forecastFrameRate: frameRate })),
	forecastLastFrameDwell: true,
	setForecastLastFrameDwell: (dwell: boolean) => set(() => ({ forecastLastFrameDwell: dwell })),
	forecastLastFrameDwellTime: 1,
	setForecastLastFrameDwellTime: (dwellTime: number) => set(() => ({ forecastLastFrameDwellTime: dwellTime })),
	forecastDataRefreshInterval: 5,
	setForecastDataRefreshInterval: (interval: number) => set(() => ({ forecastDataRefreshInterval: interval })),
	forecastDataRefreshActive: true,
	setForecastDataRefreshActive: (active: boolean) => set(() => ({ forecastDataRefreshActive: active })),
	// forecast sounding state
	forecastSoundingZoomState: { ...defaultForecastZoomState },
	setForecastSoundingZoomState: (forecastSoundingZoomState) => set(() => ({ forecastSoundingZoomState })),
	resetForecastSoundingZoomState: () => set(() => ({ forecastSoundingZoomState: { ...defaultForecastZoomState } })),
	forecastSoundingZoomFill: false,
	setForecastSoundingZoomFill: (zoomFill: boolean) => set(() => ({ forecastSoundingZoomFill: zoomFill })),
	forecastSoundingMapFullScreen: false,
	setForecastSoundingMapFullScreen: (fullScreen) => set({ forecastSoundingMapFullScreen: fullScreen }),
	forecastSoundingFrameRate: 10,
	setForecastSoundingFrameRate: (frameRate: number) => set(() => ({ forecastSoundingFrameRate: frameRate })),
	forecastSoundingLastFrameDwell: true,
	setForecastSoundingLastFrameDwell: (dwell: boolean) => set(() => ({ forecastSoundingLastFrameDwell: dwell })),
	forecastSoundingLastFrameDwellTime: 1,
	setForecastSoundingLastFrameDwellTime: (dwellTime: number) => set(() => ({ forecastSoundingLastFrameDwellTime: dwellTime })),
	// forecast comparison state
	runFlag: 'similar',
	setRunFlag: (flag: string) => set(() => ({ runFlag: flag })),
})
