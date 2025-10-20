/**
 * Map projections and region configurations
 * Defines different regions and their map settings
 */

import { RegionConfig, RegionType, MapViewState } from '../types'

/**
 * Region configurations for different map areas
 */
export const REGION_CONFIGS: Record<RegionType, RegionConfig> = {
	conus: {
		id: 'conus',
		label: 'Continental US',
		center: [-95, 37],
		zoom: 3,
		bounds: [
			[-125, 24],
			[-66, 50],
		],
		projection: 'web-mercator',
	},
	alaska: {
		id: 'alaska',
		label: 'Alaska',
		center: [-152, 64],
		zoom: 3,
		bounds: [
			[-180, 51],
			[-130, 72],
		],
		projection: 'web-mercator',
	},
	hawaii: {
		id: 'hawaii',
		label: 'Hawaii',
		center: [-157, 21],
		zoom: 6,
		bounds: [
			[-161, 18],
			[-154, 23],
		],
		projection: 'web-mercator',
	},
	namer: {
		id: 'namer',
		label: 'North America & Mexico',
		center: [-100, 35],
		zoom: 2,
		bounds: [
			[-140, 15],
			[-50, 60],
		],
		projection: 'web-mercator',
	},
	custom: {
		id: 'custom',
		label: 'Custom',
		center: [-95, 37],
		zoom: 3,
		bounds: [
			[-180, -90],
			[180, 90],
		],
		projection: 'web-mercator',
	},
}

/**
 * Get region configuration by ID
 */
export function getRegionConfig(regionId: RegionType): RegionConfig {
	return REGION_CONFIGS[regionId] || REGION_CONFIGS.conus
}

/**
 * Get initial view state for a region
 */
export function getInitialViewState(regionId: RegionType): MapViewState {
	const config = getRegionConfig(regionId)
	return {
		longitude: config.center[0],
		latitude: config.center[1],
		zoom: config.zoom,
		pitch: 0,
		bearing: 0,
	}
}

/**
 * Get bounds for a region
 */
export function getRegionBounds(regionId: RegionType): [[number, number], [number, number]] {
	const config = getRegionConfig(regionId)
	return config.bounds
}

/**
 * Check if coordinates are within region bounds
 */
export function isWithinBounds(
	longitude: number,
	latitude: number,
	regionId: RegionType,
): boolean {
	const bounds = getRegionBounds(regionId)
	const [minLon, minLat] = bounds[0]
	const [maxLon, maxLat] = bounds[1]

	return longitude >= minLon && longitude <= maxLon && latitude >= minLat && latitude <= maxLat
}

/**
 * Constrain view state to region bounds
 */
export function constrainViewStateToBounds(
	viewState: MapViewState,
	regionId: RegionType,
): MapViewState {
	const bounds = getRegionBounds(regionId)
	const [minLon, minLat] = bounds[0]
	const [maxLon, maxLat] = bounds[1]

	return {
		...viewState,
		longitude: Math.max(minLon, Math.min(maxLon, viewState.longitude)),
		latitude: Math.max(minLat, Math.min(maxLat, viewState.latitude)),
	}
}

/**
 * Get all available regions
 */
export function getAvailableRegions(): RegionConfig[] {
	return Object.values(REGION_CONFIGS).filter((config) => config.id !== 'custom')
}

/**
 * Get region label by ID
 */
export function getRegionLabel(regionId: RegionType): string {
	return getRegionConfig(regionId).label
}

