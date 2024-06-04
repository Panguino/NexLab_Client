import { create } from 'zustand'
import createSelectors from './createSelectors'
import { createHazardsSlice } from './hazardsSlice'
import { createSlideoutPanelSlice } from './slideoutPanelSlice'

const useRootStoreBase = create((set) => ({
	...createHazardsSlice(set),
	...createSlideoutPanelSlice(set)
}))

export const useRootStore = createSelectors(useRootStoreBase as any)
