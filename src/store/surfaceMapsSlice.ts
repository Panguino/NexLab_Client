import { SURFACE_PRODUCT_RAW } from '@/data/analysis/surface/products'
import { REGION_SCALE_LARGE } from '@/data/analysis/surface/regions'
import { SECTOR_MIDWEST_US } from '@/data/analysis/surface/sectors'
import { ZustandStateSlice } from './useRootStore'

export interface ISurfaceMapsSlice {
	surfaceMapsSite: string
	surfaceMapsRegion: string
	surfaceMapsProduct: string
	surfaceMapsNumberOfFrames: number
	setSurfaceMapsSite: (siteId: string) => void
	setSurfaceMapsRegion: (regionId: string) => void
	setSurfaceMapsProduct: (productId: string) => void
	setSurfaceMapsNumberOfFrames: (frames: number) => void
}

export const createSurfaceMapsSlice: ZustandStateSlice<ISurfaceMapsSlice> = (set) => ({
	surfaceMapsSite: SECTOR_MIDWEST_US,
	setSurfaceMapsSite: (siteId: string) => set(() => ({ surfaceMapsSite: siteId })),
	surfaceMapsRegion: REGION_SCALE_LARGE,
	setSurfaceMapsRegion: (regionId: string) => set(() => ({ surfaceMapsRegion: regionId })),
	surfaceMapsProduct: SURFACE_PRODUCT_RAW,
	setSurfaceMapsProduct: (productId: string) => set(() => ({ surfaceMapsProduct: productId })),
	surfaceMapsNumberOfFrames: 24,
	setSurfaceMapsNumberOfFrames: (frames: number) => set(() => ({ surfaceMapsNumberOfFrames: frames })),
})
