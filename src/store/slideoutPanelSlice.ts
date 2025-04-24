import { ZustandStateSlice } from './useRootStore'

export interface ISlideoutPanelSlice {
	slideoutPanelIsOpen: boolean
	currentSlideoutPanel: string
	openSlideoutPanel: (panel: string) => void
	closeSlideoutPanel: () => void
}

export const createSlideoutPanelSlice: ZustandStateSlice<ISlideoutPanelSlice> = (set, get) => ({
	slideoutPanelIsOpen: false,
	currentSlideoutPanel: '',
	openSlideoutPanel: (panel: string) => set(() => ({ slideoutPanelIsOpen: true, currentSlideoutPanel: panel })),
	closeSlideoutPanel: () => {
		get().setSelectedCounty({})
		set(() => ({ slideoutPanelIsOpen: false }))
	},
})
