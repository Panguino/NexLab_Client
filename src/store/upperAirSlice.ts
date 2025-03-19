import { UPPERAIR_PRODUCT_RAW } from '@/data/analysis/upper-air/products'
import { UPPERAIR_REGION_CONUS } from '@/data/analysis/upper-air/regions'
import { UPPERAIR_SECTOR_CONUS } from '@/data/analysis/upper-air/sectors'
import { ZustandStateSlice } from './useRootStore'

export interface IUpperAirSlice {
	upperAirSite: string
	upperAirRegion: string
	upperAirProduct: string
	upperAirNumberOfFrames: number
	setUpperAirSite: (siteId: string) => void
	setUpperAirRegion: (regionId: string) => void
	setUpperAirProduct: (productId: string) => void
	setUpperAirNumberOfFrames: (frames: number) => void
}

export const createUpperAirSlice: ZustandStateSlice<IUpperAirSlice> = (set) => ({
	upperAirSite: UPPERAIR_SECTOR_CONUS,
	setUpperAirSite: (siteId: string) => set(() => ({ upperAirSite: siteId })),
	upperAirRegion: UPPERAIR_REGION_CONUS,
	setUpperAirRegion: (regionId: string) => set(() => ({ upperAirRegion: regionId })),
	upperAirProduct: UPPERAIR_PRODUCT_RAW,
	setUpperAirProduct: (productId: string) => set(() => ({ upperAirProduct: productId })),
	upperAirNumberOfFrames: 28,
	setUpperAirNumberOfFrames: (frames: number) => set(() => ({ upperAirNumberOfFrames: frames })),
})
