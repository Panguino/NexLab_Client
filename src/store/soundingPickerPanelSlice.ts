import { ZustandStateSlice } from './useRootStore'

export interface ISoundingPickerPanelSlice {
	soundingPickerIsOpen: boolean
	openSoundingPicker: () => void
	closeSoundingPicker: () => void
	// Data to render in the simplified animator later
	soundingPickerFrames: string[]
	setSoundingPickerFrames: (frames: string[]) => void
	soundingPickerImageInfo: { width: number; height: number } | null
	setSoundingPickerImageInfo: (info: { width: number; height: number } | null) => void
}

export const createSoundingPickerPanelSlice: ZustandStateSlice<ISoundingPickerPanelSlice> = (set) => ({
	soundingPickerIsOpen: false,
	openSoundingPicker: () => set((state) => ({ ...state, soundingPickerIsOpen: true })),
	closeSoundingPicker: () => set((state) => ({ ...state, soundingPickerIsOpen: false })),
	soundingPickerFrames: [],
	setSoundingPickerFrames: (frames) => set((state) => ({ ...state, soundingPickerFrames: frames })),
	soundingPickerImageInfo: null,
	setSoundingPickerImageInfo: (info) => set((state) => ({ ...state, soundingPickerImageInfo: info })),
})
