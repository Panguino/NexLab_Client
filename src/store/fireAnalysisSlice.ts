import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultFireAnalysisZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface IFireAnalysisSlice {
	fireAnalysisFrameValidTime: number
	setFireAnalysisFrameValidTime: (validTime: number) => void
	fireAnalysisNumberOfFrames: number
	setFireAnalysisNumberOfFrames: (frames: number) => void
	fireAnalysisFrameRate: number
	setFireAnalysisFrameRate: (frameRate: number) => void
	fireAnalysisZoomState: zoomState
	setFireAnalysisZoomState: (zoomState: zoomState) => void
	resetFireAnalysisZoomState: () => void
	fireAnalysisMapFullScreen: boolean
	setFireAnalysisMapFullScreen: (fullScreen: boolean) => void
	fireAnalysisLastFrameDwell: boolean
	setFireAnalysisLastFrameDwell: (dwell: boolean) => void
	fireAnalysisLastFrameDwellTime: number
	setFireAnalysisLastFrameDwellTime: (dwellTime: number) => void
}

export const createFireAnalysisSlice: ZustandStateSlice<IFireAnalysisSlice> = (set) => ({
	fireAnalysisFrameValidTime: 0,
	setFireAnalysisFrameValidTime: (validTime: number) => set(() => ({ fireAnalysisFrameValidTime: validTime })),
	fireAnalysisNumberOfFrames: 30,
	setFireAnalysisNumberOfFrames: (frames: number) => set(() => ({ fireAnalysisNumberOfFrames: frames })),
	fireAnalysisFrameRate: 5,
	setFireAnalysisFrameRate: (frameRate: number) => set(() => ({ fireAnalysisFrameRate: frameRate })),
	fireAnalysisZoomState: { ...defaultFireAnalysisZoomState },
	setFireAnalysisZoomState: (fireAnalysisZoomState) => set(() => ({ fireAnalysisZoomState })),
	resetFireAnalysisZoomState: () => set(() => ({ fireAnalysisZoomState: { ...defaultFireAnalysisZoomState } })),
	fireAnalysisMapFullScreen: false,
	setFireAnalysisMapFullScreen: (fullScreen) => set({ fireAnalysisMapFullScreen: fullScreen }),
	fireAnalysisLastFrameDwell: true,
	setFireAnalysisLastFrameDwell: (dwell: boolean) => set(() => ({ fireAnalysisLastFrameDwell: dwell })),
	fireAnalysisLastFrameDwellTime: 1,
	setFireAnalysisLastFrameDwellTime: (dwellTime: number) => set(() => ({ fireAnalysisLastFrameDwellTime: dwellTime })),
})
