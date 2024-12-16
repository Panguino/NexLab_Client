import { NEXRAD_PRODUCT_DSP, NEXRAD_REGION_CONUS_ID, SITE_ORD } from '@/data/nexradVars'
import { ZustandStateSlice } from './useRootStore'

export interface INexradSlice {
	nexradSite: string
	nexradRegion: string
	nexradProduct: string
	setNexradSite: (sector: string) => void
	setNexradRegion: (selectedRegion: string) => void
	setNexradProduct: (selectedProduct: string) => void
}

export const createNexradSlice: ZustandStateSlice<INexradSlice> = (set) => ({
	nexradSite: SITE_ORD,
	setNexradSite: (nexradSite: string) => set(() => ({ nexradSite })),
	nexradRegion: NEXRAD_REGION_CONUS_ID,
	setNexradRegion: (nexradRegion: string) => set(() => ({ nexradRegion })),
	nexradProduct: NEXRAD_PRODUCT_DSP,
	setNexradProduct: (nexradProduct: string) => set(() => ({ nexradProduct })),
})
