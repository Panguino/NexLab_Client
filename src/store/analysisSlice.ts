import { ZustandStateSlice } from './useRootStore'

export interface IAnalysisSlice {
	surfaceMapsNumberOfFrames: number
	upperAirNumberOfFrames: number
	soundingNumberOfFrames: number
	setSurfaceMapsNumberOfFrames: (frames: number) => void
	setUpperAirNumberOfFrames: (frames: number) => void
	setSoundingNumberOfFrames: (frames: number) => void
}

export const createAnalysisSlice: ZustandStateSlice<IAnalysisSlice> = (set) => ({
	surfaceMapsNumberOfFrames: 24,
	setSurfaceMapsNumberOfFrames: (frames: number) => set(() => ({ surfaceMapsNumberOfFrames: frames })),
	upperAirNumberOfFrames: 28,
	setUpperAirNumberOfFrames: (frames: number) => set(() => ({ upperAirNumberOfFrames: frames })),
	soundingNumberOfFrames: 14,
	setSoundingNumberOfFrames: (frames: number) => set(() => ({ soundingNumberOfFrames: frames })),
})
