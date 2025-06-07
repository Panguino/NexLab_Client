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
	nexradZoomFill: boolean
	setNexradZoomFill: (zoomFill: boolean) => void
	nexradDataRefreshInterval: number
	nexradDataRefreshActive: boolean
	setNexradDataRefreshInterval: (interval: number) => void
	setNexradDataRefreshActive: (active: boolean) => void
	nexradMapFullScreen: boolean
	setNexradMapFullScreen: (fullScreen: boolean) => void
}

export const createNexradSlice: ZustandStateSlice<INexradSlice> = (set) => ({
	nexradNumberOfFrames: 24,
	setNexradNumberOfFrames: (frames: number) => set(() => ({ nexradNumberOfFrames: frames })),
	nexradFrameRate: 15,
	setNexradFrameRate: (frameRate: number) => set(() => ({ nexradFrameRate: frameRate })),
	nexradZoomState: { ...defaultNexradZoomState },
	setNexradZoomState: (nexradZoomState) => set(() => ({ nexradZoomState })),
	resetNexradZoomState: () => set(() => ({ nexradZoomState: { ...defaultNexradZoomState } })),
	nexradZoomFill: false,
	setNexradZoomFill: (zoomFill: boolean) => set(() => ({ nexradZoomFill: zoomFill })),
	nexradDataRefreshInterval: 5,
	setNexradDataRefreshInterval: (interval: number) => set(() => ({ nexradDataRefreshInterval: interval })),
	nexradDataRefreshActive: true,
	setNexradDataRefreshActive: (active: boolean) => set(() => ({ nexradDataRefreshActive: active })),
	nexradMapFullScreen: false,
	setNexradMapFullScreen: (fullScreen) => set({ nexradMapFullScreen: fullScreen }),
})
