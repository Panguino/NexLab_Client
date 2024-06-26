import { create } from 'zustand'
import createSelectors from './createSelectors'
import { createHazardsSlice } from './hazardsSlice'
import { createSlideoutPanelSlice } from './slideoutPanelSlice'

const useRootStoreBase = create((set, get) => ({
	...createHazardsSlice(set, get),
	...createSlideoutPanelSlice(set, get)
}))

export const useRootStore = createSelectors(useRootStoreBase as any)
