/**
 * Animator Config Builder for AI Agent
 *
 * Converts AI function call arguments into Animator component props
 * and handles data fetching for different product types.
 */

import { LAYER_CONFIG_PRESETS } from '@/components/elements/Animator/AnimatorMapMachine/config/layerConfigTypes'
import type { MapFrame } from '@/components/elements/Animator/AnimatorMapMachine/types'
import type { ProcessedStormData } from '@/components/elements/Animator/AnimatorMapMachine/types/tropicalStormTypes'
import { fetchTropicalStormData } from '@/components/elements/Animator/AnimatorMapMachine/utils/tropicalStormUtils'
import { createCountyAlertFrame } from '@/util/dataCalls/alerts/createCountyAlertFrames'
import { fetchRealTimeHazards, parseHazardsToCountyMap } from '@/util/dataCalls/alerts/parseCountyAlerts'
import { getSurfaceData } from '@/util/dataCalls/analysis/query-surface'
import { getUpperAirData } from '@/util/dataCalls/analysis/query-upper-air'
import { getNexradData } from '@/util/dataCalls/nexrad/query-nexrad'
import { getSatradData } from '@/util/dataCalls/satrad/query-satrad'

export interface AnimatorDisplayConfig {
	mode: 'image' | 'map'
	frames: string[] | MapFrame[]
	imageInfo: { width: number; height: number }
	autoPlay?: boolean
	interval?: number
	mapRegion?: 'conus' | 'alaska' | 'hawaii' | 'namer'
	mapDataType?: 'hurricane' | 'alerts'
	layerConfig?: Record<string, { active: boolean; initialValue: boolean }>
	tropicalStorms?: ProcessedStormData[]
	isLoading?: boolean
	error?: string
}

export interface ProductLoadArgs {
	productId: string
	region?: string
	site?: string
}

// Default number of frames for different products
const DEFAULT_FRAMES = {
	radar: 20,
	satellite: 24,
}

// Map product IDs to their data fetching logic
export async function buildAnimatorConfig(args: ProductLoadArgs): Promise<AnimatorDisplayConfig> {
	const { productId, region, site } = args

	try {
		switch (productId) {
			case 'nexrad-reflectivity':
				return await buildNexradConfig(site || 'LOT', 'N0B')

			case 'nexrad-velocity':
				return await buildNexradConfig(site || 'LOT', 'N0G')

			case 'nexrad-composite':
				return await buildNexradCompositeConfig()

			case 'satellite-visible':
				return await buildSatelliteConfig('regional', region || 'central', 'truecolor')

			case 'satellite-infrared':
				return await buildSatelliteConfig('regional', region || 'central', 'abi13')

			case 'satellite-water-vapor':
				return await buildSatelliteConfig('regional', region || 'central', 'simplewv')

			case 'tropical-overview':
				return await buildTropicalConfig()

			case 'alerts-national':
				return await buildAlertsConfig()

			case 'upperair-500mb':
				return await buildUpperAirConfig('US', '500', 'raw')

			case 'upperair-850mb':
				return await buildUpperAirConfig('US', '850', 'raw')

			case 'surface-analysis':
				return await buildSurfaceConfig('US', 'all', 'sfcanalysis', 6)

			case 'surface-station-plots':
				return await buildSurfaceConfig('US', 'all', 'station', 6)

			default:
				return {
					mode: 'image',
					frames: [],
					imageInfo: { width: 800, height: 600 },
					error: `Unknown product: ${productId}`,
				}
		}
	} catch (error) {
		console.error('Error building animator config:', error)
		return {
			mode: 'image',
			frames: [],
			imageInfo: { width: 800, height: 600 },
			error: error instanceof Error ? error.message : 'Failed to load data',
		}
	}
}

async function buildNexradConfig(site: string, product: string): Promise<AnimatorDisplayConfig> {
	const data = await getNexradData(site, product, DEFAULT_FRAMES.radar)

	return {
		mode: 'image',
		frames: data.frames || [],
		imageInfo: data.imageInfo || { width: 600, height: 550 },
		autoPlay: true,
		interval: 150,
	}
}

async function buildNexradCompositeConfig(): Promise<AnimatorDisplayConfig> {
	// National composite uses a different endpoint
	const data = await getNexradData('NAT', 'N0B', DEFAULT_FRAMES.radar)

	return {
		mode: 'image',
		frames: data.frames || [],
		imageInfo: data.imageInfo || { width: 1200, height: 800 },
		autoPlay: true,
		interval: 200,
	}
}

async function buildSatelliteConfig(scale: string, sector: string, product: string): Promise<AnimatorDisplayConfig> {
	const data = await getSatradData(scale, sector, product, DEFAULT_FRAMES.satellite, 1)

	return {
		mode: 'image',
		frames: data.frames || [],
		imageInfo: data.imageInfo || { width: 1600, height: 900 },
		autoPlay: true,
		interval: 100,
	}
}

async function buildTropicalConfig(): Promise<AnimatorDisplayConfig> {
	const storms = await fetchTropicalStormData('https://climate.cod.edu/data/tropical/gis/CurrentStorms.json')

	// Create a single frame for the map
	const frames: MapFrame[] = [
		{
			id: 'tropical-overview',
			timestamp: new Date(),
			data: null,
		},
	]

	return {
		mode: 'map',
		frames,
		imageInfo: { width: 1200, height: 800 },
		mapRegion: 'namer',
		mapDataType: 'hurricane',
		layerConfig: LAYER_CONFIG_PRESETS.TROPICAL,
		tropicalStorms: storms,
		autoPlay: false,
	}
}

async function buildAlertsConfig(): Promise<AnimatorDisplayConfig> {
	const hazards = await fetchRealTimeHazards()
	const countyMap = parseHazardsToCountyMap(hazards)
	const frame = createCountyAlertFrame(countyMap, new Date(), 'alerts-current', { source: 'realtime' })

	return {
		mode: 'map',
		frames: [frame],
		imageInfo: { width: 1200, height: 800 },
		mapRegion: 'conus',
		mapDataType: 'alerts',
		layerConfig: LAYER_CONFIG_PRESETS.COUNTY_ALERTS,
		autoPlay: false,
	}
}

async function buildUpperAirConfig(sector: string, level: string, product: string): Promise<AnimatorDisplayConfig> {
	const data = await getUpperAirData(sector, level, product)

	return {
		mode: 'image',
		frames: data.frames || [],
		imageInfo: data.imageInfo || { width: 800, height: 600 },
		autoPlay: true,
		interval: 500,
	}
}

async function buildSurfaceConfig(scale: string, site: string, product: string, frames: number): Promise<AnimatorDisplayConfig> {
	const data = await getSurfaceData(scale, site, product, frames)

	return {
		mode: 'image',
		frames: data.frames || [],
		imageInfo: data.imageInfo || { width: 800, height: 600 },
		autoPlay: true,
		interval: 500,
	}
}
