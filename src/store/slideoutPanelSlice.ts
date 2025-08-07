import { ZustandStateSlice } from './useRootStore'

export interface ISlideoutPanelSlice {
	productInfoId: string
	setProductInfoId: (id: string) => void
	slideoutPanelIsOpen: boolean
	currentSlideoutPanel: string
	openSlideoutPanel: (panel: string) => void
	closeSlideoutPanel: () => void
}

export const createSlideoutPanelSlice: ZustandStateSlice<ISlideoutPanelSlice> = (set, get) => ({
	productInfoId: '',
	setProductInfoId: (id: string) => set(() => ({ productInfoId: id })),
	slideoutPanelIsOpen: false,
	currentSlideoutPanel: '',
	openSlideoutPanel: (panel: string) => set(() => ({ slideoutPanelIsOpen: true, currentSlideoutPanel: panel })),
	closeSlideoutPanel: () => {
		get().setSelectedCounty({})
		set(() => ({ slideoutPanelIsOpen: false }))
	},
})
