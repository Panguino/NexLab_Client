import { create } from 'zustand'
import { enableMapSet } from 'immer'
import createSelectors from './createSelectors'
import { createHazardsSlice } from './hazardsSlice'
import { createSlideoutPanelSlice } from './slideoutPanelSlice'

enableMapSet()

const useRootStoreBase = create((set, get) => ({
	...createHazardsSlice(set, get),
	...createSlideoutPanelSlice(set, get)
}))

export const useRootStore = createSelectors(useRootStoreBase as any)
