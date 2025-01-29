import { SOUNDING_PRODUCT_SKEWT } from '@/data/analysis/soundings/products'
import { SOUNDING_REGION_CONUS } from '@/data/analysis/soundings/regions'
import { SOUNDING_SITE_KDVN } from '@/data/analysis/soundings/sites'
import { ZustandStateSlice } from './useRootStore'

export interface ISoundingSlice {
	soundingSite: string
	soundingRegion: string
	soundingProduct: string
	soundingNumberOfFrames: number
	setSoundingSite: (siteId: string) => void
	setSoundingRegion: (regionId: string) => void
	setSoundingProduct: (productId: string) => void
	setSoundingNumberOfFrames: (frames: number) => void
}

export const createSoundingSlice: ZustandStateSlice<ISoundingSlice> = (set) => ({
	soundingSite: SOUNDING_SITE_KDVN,
	setSoundingSite: (siteId: string) => set(() => ({ soundingSite: siteId })),
	soundingRegion: SOUNDING_REGION_CONUS,
	setSoundingRegion: (regionId: string) => set(() => ({ soundingRegion: regionId })),
	soundingProduct: SOUNDING_PRODUCT_SKEWT,
	setSoundingProduct: (productId: string) => set(() => ({ soundingProduct: productId })),
	soundingNumberOfFrames: 14,
	setSoundingNumberOfFrames: (frames: number) => set(() => ({ soundingNumberOfFrames: frames })),
})
