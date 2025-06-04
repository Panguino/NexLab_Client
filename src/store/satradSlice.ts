import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultSatradZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface ISatradSlice {
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
}

export const createSatradSlice: ZustandStateSlice<ISatradSlice> = (set) => ({
	satradNumberOfFrames: 48,
	setSatradNumberOfFrames: (frames: number) => set(() => ({ satradNumberOfFrames: frames })),
	satradFrameStep: 1,
	setSatradFrameStep: (frameStep: number) => set(() => ({ satradFrameStep: frameStep })),
	satradFrameRate: 15,
	setSatradFrameRate: (frameRate: number) => set(() => ({ satradFrameRate: frameRate })),
	satradZoomState: { ...defaultSatradZoomState },
	setSatradZoomState: (satradZoomState) => set(() => ({ satradZoomState })),
	resetSatradZoomState: () => set(() => ({ satradZoomState: { ...defaultSatradZoomState } })),
	activeOverlays: ['data', 'map'],
	setActiveOverlays: (overlays: string[]) =>
		set(() => {
			console.log('Setting active overlays:', overlays)
			return { activeOverlays: overlays }
		}),
	satradZoomFill: false,
	setSatradZoomFill: (zoomFill: boolean) => set(() => ({ satradZoomFill: zoomFill })),
})
