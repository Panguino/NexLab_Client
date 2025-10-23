import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultSatradZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface ISatradSlice {
	satradFrameValidTime: number
	setSatradFrameValidTime: (validTime: number) => void
	satradNumberOfFrames: number
	setSatradNumberOfFrames: (frames: number) => void
	satradFrameStep: number
	setSatradFrameStep: (frameStep: number) => void
	satradFrameRate: number
	setSatradFrameRate: (frameRate: number) => void
	satradZoomState: zoomState
	setSatradZoomState: (zoomState: zoomState) => void
	resetSatradZoomState: () => void
	activeOverlays: string[]
	setActiveOverlays: (overlays: string[]) => void
	satradZoomFill: boolean
	setSatradZoomFill: (zoomFill: boolean) => void
	satradDataRefreshInterval: number
	satradDataRefreshActive: boolean
	setSatradDataRefreshInterval: (interval: number) => void
	setSatradDataRefreshActive: (active: boolean) => void
	satradMapFullScreen: boolean
	setSatradMapFullScreen: (fullScreen: boolean) => void
	satradLastFrameDwell: boolean
	setSatradLastFrameDwell: (dwell: boolean) => void
	satradLastFrameDwellTime?: number
	setSatradLastFrameDwellTime?: (dwellTime: number) => void
}

export const createSatradSlice: ZustandStateSlice<ISatradSlice> = (set) => ({
	satradFrameValidTime: 0,
	setSatradFrameValidTime: (validTime: number) => set(() => ({ satradFrameValidTime: validTime })),
	satradNumberOfFrames: 12,
	setSatradNumberOfFrames: (frames: number) => set(() => ({ satradNumberOfFrames: frames })),
	satradFrameStep: 1,
	setSatradFrameStep: (frameStep: number) => set(() => ({ satradFrameStep: frameStep })),
	satradFrameRate: 8,
	setSatradFrameRate: (frameRate: number) => set(() => ({ satradFrameRate: frameRate })),
	satradZoomState: { ...defaultSatradZoomState },
	setSatradZoomState: (satradZoomState) => set(() => ({ satradZoomState })),
	resetSatradZoomState: () => set(() => ({ satradZoomState: { ...defaultSatradZoomState } })),
	activeOverlays: ['data', 'map', 'meso-map', 'meso-latlon'],
	setActiveOverlays: (overlays: string[]) =>
		set(() => {
			console.log('Setting active overlays:', overlays)
			return { activeOverlays: overlays }
		}),
	satradZoomFill: false,
	setSatradZoomFill: (zoomFill: boolean) => set(() => ({ satradZoomFill: zoomFill })),
	satradDataRefreshInterval: 5,
	setSatradDataRefreshInterval: (interval: number) => set(() => ({ satradDataRefreshInterval: interval })),
	satradDataRefreshActive: true,
	setSatradDataRefreshActive: (active: boolean) => set(() => ({ satradDataRefreshActive: active })),
	satradMapFullScreen: false,
	setSatradMapFullScreen: (fullScreen) => set({ satradMapFullScreen: fullScreen }),
	satradLastFrameDwell: true,
	setSatradLastFrameDwell: (dwell: boolean) => set(() => ({ satradLastFrameDwell: dwell })),
	satradLastFrameDwellTime: 1,
	setSatradLastFrameDwellTime: (dwellTime: number) => set(() => ({ satradLastFrameDwellTime: dwellTime })),
})
