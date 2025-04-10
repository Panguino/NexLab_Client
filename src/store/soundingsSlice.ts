import { ZustandStateSlice } from './useRootStore'

export interface ISoundingSlice {
	soundingNumberOfFrames: number
	setSoundingNumberOfFrames: (frames: number) => void
}

export const createSoundingSlice: ZustandStateSlice<ISoundingSlice> = (set) => ({
	soundingNumberOfFrames: 14,
	setSoundingNumberOfFrames: (frames: number) => set(() => ({ soundingNumberOfFrames: frames })),
})
