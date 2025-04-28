import { ZustandStateSlice } from './useRootStore'

export interface INexradSlice {
	nexradNumberOfFrames: number
	setNexradNumberOfFrames: (frames: number) => void
}

export const createNexradSlice: ZustandStateSlice<INexradSlice> = (set) => ({
	nexradNumberOfFrames: 24,
	setNexradNumberOfFrames: (frames: number) => set(() => ({ nexradNumberOfFrames: frames })),
	nexradFrameRate: 0.25,
	setNexradFrameRate: (frameRate: number) => set(() => ({ nexradFrameRate: frameRate })),
})
