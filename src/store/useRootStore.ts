import { enableMapSet } from 'immer'
import { StateCreator, create } from 'zustand'
import createSelectors from './createSelectors'
import { IGlobalSettingsSlice, createGlobalSettingsSlice } from './globalSettingsSlice'
import { IHazardsSlice, createHazardsSlice } from './hazardsSlice'
import { IMobileMenuSlice, createMobileMenuSlice } from './mobileMenuSlice'
import { INexradSlice, createNexradSlice } from './nexradSlice'
import { ISlideoutPanelSlice, createSlideoutPanelSlice } from './slideoutPanelSlice'
import { ISoundingSlice, createSoundingSlice } from './soundingsSlice'

enableMapSet()

export interface IGlobalStore extends IHazardsSlice, ISlideoutPanelSlice, IMobileMenuSlice, IGlobalSettingsSlice, INexradSlice, ISoundingSlice {}

export type ZustandStateSlice<T> = StateCreator<IGlobalStore, [], [], T>

const useRootStoreBase = create<IGlobalStore>((...args) => ({
	...createHazardsSlice(...args),
	...createSlideoutPanelSlice(...args),
	...createMobileMenuSlice(...args),
	...createGlobalSettingsSlice(...args),
	...createNexradSlice(...args),
	...createSoundingSlice(...args),
}))

export const useRootStore = createSelectors(useRootStoreBase as any)
