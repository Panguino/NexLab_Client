import { ZustandStateSlice } from './useRootStore'

export interface ISlideoutPanelSlice {
	productInfoId: string
	setProductInfoId: (id: string) => void
	soundingTextURL: string
	setSoundingTextURL: (url: string) => void
	metarContent: string | null
	setMetarContent: (content: string | null) => void
	metarLoading: boolean
	setMetarLoading: (loading: boolean) => void
	slideoutPanelIsOpen: boolean
	currentSlideoutPanel: string
	openSlideoutPanel: (panel: string) => void
	closeSlideoutPanel: () => void
}

export const createSlideoutPanelSlice: ZustandStateSlice<ISlideoutPanelSlice> = (set, get) => ({
	productInfoId: '',
	setProductInfoId: (id: string) => set(() => ({ productInfoId: id })),
	soundingTextURL: '',
	setSoundingTextURL: (url: string) => set(() => ({ soundingTextURL: url })),
	metarContent: null,
	setMetarContent: (content: string | null) => set(() => ({ metarContent: content })),
	metarLoading: false,
	setMetarLoading: (loading: boolean) => set(() => ({ metarLoading: loading })),
	slideoutPanelIsOpen: false,
	currentSlideoutPanel: '',
	openSlideoutPanel: (panel: string) => set(() => ({ slideoutPanelIsOpen: true, currentSlideoutPanel: panel })),
	closeSlideoutPanel: () => {
		get().setSelectedCounty({})
		set(() => ({
			slideoutPanelIsOpen: false,
			metarLoading: false,
			metarContent: null,
		}))
	},
})
