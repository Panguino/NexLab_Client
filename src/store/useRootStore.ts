import { enableMapSet } from 'immer'
import { StateCreator, create } from 'zustand'
import createSelectors from './createSelectors'
import { IHazardsSlice, createHazardsSlice } from './hazardsSlice'
import { IMobileMenuSlice, createMobileMenuSlice } from './mobileMenuSlice'
import { ISlideoutPanelSlice, createSlideoutPanelSlice } from './slideoutPanelSlice'

enableMapSet()

export interface IGlobalStore extends IHazardsSlice, ISlideoutPanelSlice, IMobileMenuSlice {}

export type ZustandStateSlice<T> = StateCreator<IGlobalStore, [], [], T>

const useRootStoreBase = create<IGlobalStore>((...args) => ({
	...createHazardsSlice(...args),
	...createSlideoutPanelSlice(...args),
	...createMobileMenuSlice(...args),
}))

export const useRootStore = createSelectors(useRootStoreBase as any)
