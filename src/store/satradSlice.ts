import { ZustandStateSlice } from './useRootStore'

export interface ISatradSlice {
	satradNumberOfFrames: number
	setSatradNumberOfFrames: (frames: number) => void
	satradFrameStep: number
	setSatradFrameStep: (frameStep: number) => void
	satradFrameRate: number
	setSatradFrameRate: (frameRate: number) => void
}

export const createSatradSlice: ZustandStateSlice<ISatradSlice> = (set) => ({
	satradNumberOfFrames: 48,
	setSatradNumberOfFrames: (frames: number) => set(() => ({ satradNumberOfFrames: frames })),
	satradFrameStep: 1,
	setSatradFrameStep: (frameStep: number) => set(() => ({ satradFrameStep: frameStep })),
	satradFrameRate: 0.1,
	setSatradFrameRate: (frameRate: number) => set(() => ({ satradFrameRate: frameRate })),
})
