import { enableMapSet } from 'immer'
import { StateCreator, create } from 'zustand'
import { IAnalysisSlice, createAnalysisSlice } from './analysisSlice'
import createSelectors from './createSelectors'
import { IForecastSlice, createForecastSlice } from './forecastSlice'
import { IGlobalSettingsSlice, createGlobalSettingsSlice } from './globalSettingsSlice'
import { IHazardsSlice, createHazardsSlice } from './hazardsSlice'
import { IMobileMenuSlice, createMobileMenuSlice } from './mobileMenuSlice'
import { INexradSlice, createNexradSlice } from './nexradSlice'
import { ISatradSlice, createSatradSlice } from './satradSlice'
import { ISectorSelectorPanelSlice, createSectorSelectorPanelSlice } from './sectorSelectorPanelSlice'
import { ISlideoutPanelSlice, createSlideoutPanelSlice } from './slideoutPanelSlice'
import { ISoundingPickerPanelSlice, createSoundingPickerPanelSlice } from './soundingPickerPanelSlice'
import { IWinterSlice, createWinterSlice } from './winterSlice'

enableMapSet()

export interface IGlobalStore
	extends IHazardsSlice,
		ISlideoutPanelSlice,
		ISectorSelectorPanelSlice,
		IMobileMenuSlice,
		IGlobalSettingsSlice,
		INexradSlice,
		ISatradSlice,
		IForecastSlice,
		IAnalysisSlice,
		ISoundingPickerPanelSlice,
		IWinterSlice {}

export type ZustandStateSlice<T> = StateCreator<IGlobalStore, [], [], T>

const useRootStoreBase = create<IGlobalStore>((...args) => ({
	...createHazardsSlice(...args),
	...createSlideoutPanelSlice(...args),
	...createSectorSelectorPanelSlice(...args),
	...createSoundingPickerPanelSlice(...args),
	...createMobileMenuSlice(...args),
	...createGlobalSettingsSlice(...args),
	...createNexradSlice(...args),
	...createSatradSlice(...args),
	...createForecastSlice(...args),
	...createAnalysisSlice(...args),
	...createWinterSlice(...args),
}))

export const useRootStore = createSelectors(useRootStoreBase as any)
