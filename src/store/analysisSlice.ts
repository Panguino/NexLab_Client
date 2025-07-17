import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

const defaultAnalysisZoomState = {
	positionX: 0,
	positionY: 0,
	scale: 1,
}

export interface IAnalysisSlice {
	surfaceMapsNumberOfFrames: number
	upperAirNumberOfFrames: number
	soundingNumberOfFrames: number
	setSurfaceMapsNumberOfFrames: (frames: number) => void
	setUpperAirNumberOfFrames: (frames: number) => void
	setSoundingNumberOfFrames: (frames: number) => void
	analysisZoomState: zoomState
	setAnalysisZoomState: (zoomState: zoomState) => void
	resetAnalysisZoomState: () => void
	analysisZoomFill: boolean
	setAnalysisZoomFill: (zoomFill: boolean) => void
	analysisMapFullScreen: boolean
	setAnalysisMapFullScreen: (fullScreen: boolean) => void
}

export const createAnalysisSlice: ZustandStateSlice<IAnalysisSlice> = (set) => ({
	surfaceMapsNumberOfFrames: 24,
	setSurfaceMapsNumberOfFrames: (frames: number) => set(() => ({ surfaceMapsNumberOfFrames: frames })),
	upperAirNumberOfFrames: 28,
	setUpperAirNumberOfFrames: (frames: number) => set(() => ({ upperAirNumberOfFrames: frames })),
	soundingNumberOfFrames: 14,
	setSoundingNumberOfFrames: (frames: number) => set(() => ({ soundingNumberOfFrames: frames })),
	analysisZoomState: { ...defaultAnalysisZoomState },
	setAnalysisZoomState: (analysisZoomState) => set(() => ({ analysisZoomState })),
	resetAnalysisZoomState: () => set(() => ({ analysisZoomState: { ...defaultAnalysisZoomState } })),
	analysisZoomFill: false,
	setAnalysisZoomFill: (zoomFill: boolean) => set(() => ({ analysisZoomFill: zoomFill })),
	analysisMapFullScreen: false,
	setAnalysisMapFullScreen: (fullScreen) => set({ analysisMapFullScreen: fullScreen }),
})
