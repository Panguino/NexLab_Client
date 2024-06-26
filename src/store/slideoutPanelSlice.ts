export const createSlideoutPanelSlice = (set, get) => ({
	slideoutPanelIsOpen: false,
	currentSlideoutPanel: '',
	openSlideoutPanel: (panel) => set(() => ({ slideoutPanelIsOpen: true, currentSlideoutPanel: panel })),
	closeSlideoutPanel: () => {
		get().setSelectedCounty({})
		set(() => ({ slideoutPanelIsOpen: false }))
	}
})
