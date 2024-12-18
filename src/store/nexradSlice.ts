import { NEXRAD_PRODUCT_BASEREF_0_5 } from '@/data/nexrad/products'
import { NEXRAD_REGION_CONUS_ID } from '@/data/nexrad/regions'
import { SITE_LOT } from '@/data/nexrad/sites'
import { ZustandStateSlice } from './useRootStore'

export interface INexradSlice {
	nexradSite: string
	nexradRegion: string
	nexradProduct: string
	nexradNumberOfFrames: number
	setNexradSite: (siteId: string) => void
	setNexradRegion: (regionId: string) => void
	setNexradProduct: (productId: string) => void
	setNexradNumberOfFrames: (frames: number) => void
}

export const createNexradSlice: ZustandStateSlice<INexradSlice> = (set) => ({
	nexradSite: SITE_LOT,
	setNexradSite: (siteId: string) => set(() => ({ nexradSite: siteId })),
	nexradRegion: NEXRAD_REGION_CONUS_ID,
	setNexradRegion: (regionId: string) => set(() => ({ nexradRegion: regionId })),
	nexradProduct: NEXRAD_PRODUCT_BASEREF_0_5,
	setNexradProduct: (productId: string) => set(() => ({ nexradProduct: productId })),
	nexradNumberOfFrames: 24,
	setNexradNumberOfFrames: (frames: number) => set(() => ({ nexradNumberOfFrames: frames })),
})
