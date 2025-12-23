import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultWinterZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface IWinterSlice {
	winterFrameRate: number
	setWinterFrameRate: (frameRate: number) => void
	winterZoomState: zoomState
	setWinterZoomState: (zoomState: zoomState) => void
	resetWinterZoomState: () => void
	winterMapFullScreen: boolean
	setWinterMapFullScreen: (fullScreen: boolean) => void
	winterLastFrameDwell: boolean
	setWinterLastFrameDwell: (dwell: boolean) => void
	winterLastFrameDwellTime: number
	setWinterLastFrameDwellTime: (dwellTime: number) => void
}

export const createWinterSlice: ZustandStateSlice<IWinterSlice> = (set) => ({
	winterFrameRate: 5,
	setWinterFrameRate: (frameRate: number) => set(() => ({ winterFrameRate: frameRate })),
	winterZoomState: { ...defaultWinterZoomState },
	setWinterZoomState: (winterZoomState) => set(() => ({ winterZoomState })),
	resetWinterZoomState: () => set(() => ({ winterZoomState: { ...defaultWinterZoomState } })),
	winterMapFullScreen: false,
	setWinterMapFullScreen: (fullScreen) => set({ winterMapFullScreen: fullScreen }),
	winterLastFrameDwell: true,
	setWinterLastFrameDwell: (dwell: boolean) => set(() => ({ winterLastFrameDwell: dwell })),
	winterLastFrameDwellTime: 1,
	setWinterLastFrameDwellTime: (dwellTime: number) => set(() => ({ winterLastFrameDwellTime: dwellTime })),
})
