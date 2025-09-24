import { ZustandStateSlice } from './useRootStore'

export interface IGlobalSettingsSlice {
	temperatureUnit: '°F' | '°C'
	setTemperatureUnit: (unit: '°F' | '°C') => void
	globalZoomFill: boolean
	setGlobalZoomFill: (zoomFill: boolean) => void
}

export const createGlobalSettingsSlice: ZustandStateSlice<IGlobalSettingsSlice> = (set) => ({
	temperatureUnit: '°F',
	setTemperatureUnit: (unit: '°F' | '°C') => set(() => ({ temperatureUnit: unit })),
	globalZoomFill: false,
	setGlobalZoomFill: (zoomFill: boolean) => set(() => ({ globalZoomFill: zoomFill })),
})
