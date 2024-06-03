export const createSlideoutPanelSlice = (set) => ({
	slideoutPanelIsOpen: false,
	currentSlideoutPanel: '',
	openSlideoutPanel: (panel) => set(() => ({ slideoutPanelIsOpen: true, currentSlideoutPanel: panel })),
	closeSlideoutPanel: () => set(() => ({ slideoutPanelIsOpen: false }))
})
