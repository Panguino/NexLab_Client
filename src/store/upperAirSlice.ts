import { ZustandStateSlice } from './useRootStore'

export interface IUpperAirSlice {
	upperAirNumberOfFrames: number
	setUpperAirNumberOfFrames: (frames: number) => void
}

export const createUpperAirSlice: ZustandStateSlice<IUpperAirSlice> = (set) => ({
	upperAirNumberOfFrames: 28,
	setUpperAirNumberOfFrames: (frames: number) => set(() => ({ upperAirNumberOfFrames: frames })),
})
