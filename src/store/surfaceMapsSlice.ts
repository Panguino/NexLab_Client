import { ZustandStateSlice } from './useRootStore'

export interface ISurfaceMapsSlice {
	surfaceMapsNumberOfFrames: number
	setSurfaceMapsNumberOfFrames: (frames: number) => void
}

export const createSurfaceMapsSlice: ZustandStateSlice<ISurfaceMapsSlice> = (set) => ({
	surfaceMapsNumberOfFrames: 24,
	setSurfaceMapsNumberOfFrames: (frames: number) => set(() => ({ surfaceMapsNumberOfFrames: frames })),
})
