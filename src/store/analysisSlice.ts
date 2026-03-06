import { zoomState } from '@/types/general'
import { ZustandStateSlice } from './useRootStore'

export interface IAnalysisSlice {
	surfaceFrameValidTime: number
	setSurfaceFrameValidTime: (validTime: number) => void
	upperAirFrameValidTime: number
	setUpperAirFrameValidTime: (validTime: number) => void
	soundingFrameValidTime: number
	setSoundingFrameValidTime: (validTime: number) => void
	rapMesoFrameValidTime: number
	setRapMesoFrameValidTime: (validTime: number) => void
	isentropicFrameValidTime: number
	setIsentropicFrameValidTime: (validTime: number) => void
	surfaceMapsNumberOfFrames: number
	upperAirNumberOfFrames: number
	soundingNumberOfFrames: number
	mrmsNumberOfFrames: number
	setSurfaceMapsNumberOfFrames: (frames: number) => void
	setUpperAirNumberOfFrames: (frames: number) => void
	setSoundingNumberOfFrames: (frames: number) => void
	setMrmsNumberOfFrames: (frames: number) => void
	analysisZoomState: zoomState | null
	setAnalysisZoomState: (zoomState: zoomState) => void
	resetAnalysisZoomState: () => void
	analysisZoomFill: boolean
	setAnalysisZoomFill: (zoomFill: boolean) => void
	analysisMapFullScreen: boolean
	setAnalysisMapFullScreen: (fullScreen: boolean) => void
	analysisDataRefreshInterval: number
	setAnalysisDataRefreshInterval: (interval: number) => void
	analysisFrameRate: number
	setAnalysisFrameRate: (frameRate: number) => void
	analysisLastFrameDwell: boolean
	setAnalysisLastFrameDwell: (dwell: boolean) => void
	analysisLastFrameDwellTime: number
	setAnalysisLastFrameDwellTime: (dwellTime: number) => void
	analysisDataRefreshActive: boolean
	setAnalysisDataRefreshActive: (active: boolean) => void
}

export const createAnalysisSlice: ZustandStateSlice<IAnalysisSlice> = (set) => ({
	surfaceFrameValidTime: 0,
	setSurfaceFrameValidTime: (validTime: number) => set(() => ({ surfaceFrameValidTime: validTime })),
	upperAirFrameValidTime: 0,
	setUpperAirFrameValidTime: (validTime: number) => set(() => ({ upperAirFrameValidTime: validTime })),
	soundingFrameValidTime: 0,
	setSoundingFrameValidTime: (validTime: number) => set(() => ({ soundingFrameValidTime: validTime })),
	rapMesoFrameValidTime: 0,
	setRapMesoFrameValidTime: (validTime: number) => set(() => ({ rapMesoFrameValidTime: validTime })),
	isentropicFrameValidTime: 0,
	setIsentropicFrameValidTime: (validTime: number) => set(() => ({ isentropicFrameValidTime: validTime })),
	surfaceMapsNumberOfFrames: 24,
	setSurfaceMapsNumberOfFrames: (frames: number) => set(() => ({ surfaceMapsNumberOfFrames: frames })),
	upperAirNumberOfFrames: 28,
	setUpperAirNumberOfFrames: (frames: number) => set(() => ({ upperAirNumberOfFrames: frames })),
	soundingNumberOfFrames: 14,
	setSoundingNumberOfFrames: (frames: number) => set(() => ({ soundingNumberOfFrames: frames })),
	mrmsNumberOfFrames: 24,
	setMrmsNumberOfFrames: (frames: number) => set(() => ({ mrmsNumberOfFrames: frames })),
	analysisZoomState: null,
	setAnalysisZoomState: (analysisZoomState) => set(() => ({ analysisZoomState })),
	resetAnalysisZoomState: () => set(() => ({ analysisZoomState: null })),
	analysisZoomFill: false,
	setAnalysisZoomFill: (zoomFill: boolean) => set(() => ({ analysisZoomFill: zoomFill })),
	analysisMapFullScreen: false,
	setAnalysisMapFullScreen: (fullScreen) => set({ analysisMapFullScreen: fullScreen }),
	analysisDataRefreshInterval: 5,
	setAnalysisDataRefreshInterval: (interval: number) => set(() => ({ analysisDataRefreshInterval: interval })),
	analysisFrameRate: 8,
	setAnalysisFrameRate: (frameRate: number) => set(() => ({ analysisFrameRate: frameRate })),
	analysisLastFrameDwell: true,
	setAnalysisLastFrameDwell: (dwell: boolean) => set(() => ({ analysisLastFrameDwell: dwell })),
	analysisLastFrameDwellTime: 1,
	setAnalysisLastFrameDwellTime: (dwellTime: number) => set(() => ({ analysisLastFrameDwellTime: dwellTime })),
	analysisDataRefreshActive: true,
	setAnalysisDataRefreshActive: (active: boolean) => set(() => ({ analysisDataRefreshActive: active })),
})
