import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

export interface IFireAnalysisSlice {
	fireAnalysisFrameValidTime: number
	setFireAnalysisFrameValidTime: (validTime: number) => void
	fireAnalysisNumberOfFrames: number
	setFireAnalysisNumberOfFrames: (frames: number) => void
	fireAnalysisFrameRate: number
	setFireAnalysisFrameRate: (frameRate: number) => void
	fireAnalysisZoomState: zoomState | null
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
	fireAnalysisZoomState: null,
	setFireAnalysisZoomState: (fireAnalysisZoomState) => set(() => ({ fireAnalysisZoomState })),
	resetFireAnalysisZoomState: () => set(() => ({ fireAnalysisZoomState: null })),
	fireAnalysisMapFullScreen: false,
	setFireAnalysisMapFullScreen: (fullScreen) => set({ fireAnalysisMapFullScreen: fullScreen }),
	fireAnalysisLastFrameDwell: true,
	setFireAnalysisLastFrameDwell: (dwell: boolean) => set(() => ({ fireAnalysisLastFrameDwell: dwell })),
	fireAnalysisLastFrameDwellTime: 1,
	setFireAnalysisLastFrameDwellTime: (dwellTime: number) => set(() => ({ fireAnalysisLastFrameDwellTime: dwellTime })),
})
