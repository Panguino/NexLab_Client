import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultNexradZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface INexradSlice {
	nexradNumberOfFrames: number
	setNexradNumberOfFrames: (frames: number) => void
	nexradFrameRate: number
	setNexradFrameRate: (frameRate: number) => void
	nexradZoomState: zoomState
	setNexradZoomState: (zoomState: zoomState) => void
	resetNexradZoomState: () => void
}

export const createNexradSlice: ZustandStateSlice<INexradSlice> = (set) => ({
	nexradNumberOfFrames: 24,
	setNexradNumberOfFrames: (frames: number) => set(() => ({ nexradNumberOfFrames: frames })),
	nexradFrameRate: 0.25,
	setNexradFrameRate: (frameRate: number) => set(() => ({ nexradFrameRate: frameRate })),
	nexradZoomState: { ...defaultNexradZoomState },
	setNexradZoomState: (nexradZoomState) => set(() => ({ nexradZoomState })),
	resetNexradZoomState: () => set(() => ({ nexradZoomState: { ...defaultNexradZoomState } })),
})
