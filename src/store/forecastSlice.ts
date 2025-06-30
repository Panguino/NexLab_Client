import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultForecastZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface IForecastSlice {
	frameValidTime: number
	setFrameValidTime: (validTime: number) => void
	forecastFrameRate: number
	setForecastFrameRate: (frameRate: number) => void
	forecastZoomState: zoomState
	setForecastZoomState: (zoomState: zoomState) => void
	resetForecastZoomState: () => void
	forecastZoomFill: boolean
	setForecastZoomFill: (zoomFill: boolean) => void
	forecastDataRefreshInterval: number
	forecastDataRefreshActive: boolean
	setForecastDataRefreshInterval: (interval: number) => void
	setForecastDataRefreshActive: (active: boolean) => void
	forecastMapFullScreen: boolean
	setForecastMapFullScreen: (fullScreen: boolean) => void
	forecastLastFrameDwell: boolean
	setForecastLastFrameDwell: (dwell: boolean) => void
	forecastLastFrameDwellTime?: number
	setForecastLastFrameDwellTime?: (dwellTime: number) => void
}

export const createForecastSlice: ZustandStateSlice<IForecastSlice> = (set) => ({
	frameValidTime: 0,
	setFrameValidTime: (validTime: number) => set(() => ({ frameValidTime: validTime })),
	forecastFrameRate: 10,
	setForecastFrameRate: (frameRate: number) => set(() => ({ forecastFrameRate: frameRate })),
	forecastZoomState: { ...defaultForecastZoomState },
	setForecastZoomState: (forecastZoomState) => set(() => ({ forecastZoomState })),
	resetForecastZoomState: () => set(() => ({ forecastZoomState: { ...defaultForecastZoomState } })),
	forecastZoomFill: false,
	setForecastZoomFill: (zoomFill: boolean) => set(() => ({ forecastZoomFill: zoomFill })),
	forecastDataRefreshInterval: 5,
	setForecastDataRefreshInterval: (interval: number) => set(() => ({ forecastDataRefreshInterval: interval })),
	forecastDataRefreshActive: true,
	setForecastDataRefreshActive: (active: boolean) => set(() => ({ forecastDataRefreshActive: active })),
	forecastMapFullScreen: false,
	setForecastMapFullScreen: (fullScreen) => set({ forecastMapFullScreen: fullScreen }),
	forecastLastFrameDwell: true,
	setForecastLastFrameDwell: (dwell: boolean) => set(() => ({ forecastLastFrameDwell: dwell })),
	forecastLastFrameDwellTime: 1,
	setForecastLastFrameDwellTime: (dwellTime: number) => set(() => ({ forecastLastFrameDwellTime: dwellTime })),
})
