/**
 * Type definitions for NHC Tropical Products JSON data
 * Based on https://climate.cod.edu/data/tropical/web/al132025/products.json
 */

/**
 * Saffir-Simpson category (0-5)
 */
export type SafirSimpsonCategory = 0 | 1 | 2 | 3 | 4 | 5

/**
 * Storm type classification
 */
export type StormType = 'DB' | 'TS' | 'HU' | 'MH' | 'STS'

/**
 * Watch/Warning type
 */
export type WatchWarningType = 'HWA' | 'TWA' | 'HWR' | 'TWR'

/**
 * Coordinate pair [longitude, latitude]
 */
export type Coordinate = [number, number]

/**
 * Forecast track point data
 */
export interface ForecastPoint {
	datetime: string
	stormtype: StormType
	ss: SafirSimpsonCategory
	position: Coordinate
	maxwind: number // knots
	gust: number // knots
}

/**
 * Forecast track data (pts)
 */
export interface ForecastTrack {
	stormname: string
	advisnum: string
	init_mslp: number // millibars
	init_speed: number // knots
	init_dir: number // degrees
	datetime_str: string[]
	stormtype: StormType[]
	ss: SafirSimpsonCategory[]
	position: Coordinate[]
	maxwind: number[]
	gust: number[]
}

/**
 * Watch/Warning polygon
 */
export interface WatchWarning {
	type: WatchWarningType
	xy: Coordinate[]
}

/**
 * Arrival time estimate data
 */
export interface ArrivalTimeData {
	lines: Record<string, Coordinate[]>
	markers: Array<{
		lbl: string
		xy: Coordinate
		rotate: number
	}>
	timezone: string
}

/**
 * Best track historical point
 */
export interface BestTrackPoint {
	stormname: string
	stormtype: StormType
	ss: SafirSimpsonCategory
	position: Coordinate
	intensity: number // knots
	mslp: number // millibars
}

/**
 * Complete tropical products data
 */
export interface TropicalProducts {
	[timestamp: string]: {
		cone: Coordinate[]
		pts: ForecastTrack
		ww: WatchWarning[]
		atea: ArrivalTimeData
		atml: ArrivalTimeData
		bestTrack: Record<string, BestTrackPoint>
		windSwath?: string
	}
}

/**
 * Color mapping for Saffir-Simpson categories
 */
export const CATEGORY_COLORS: Record<SafirSimpsonCategory, [number, number, number, number]> = {
	0: [100, 150, 255, 255], // Light blue - Tropical Storm
	1: [255, 200, 0, 255], // Gold - Category 1
	2: [255, 165, 0, 255], // Orange - Category 2
	3: [255, 100, 0, 255], // Dark orange - Category 3
	4: [255, 50, 0, 255], // Red-orange - Category 4
	5: [139, 0, 0, 255], // Dark red - Category 5
}

/**
 * Color mapping for watch/warning types
 */
export const WATCH_WARNING_COLORS: Record<WatchWarningType, { fill: [number, number, number, number]; outline: [number, number, number, number] }> = {
	HWA: {
		fill: [255, 0, 0, 76], // Red with 30% opacity
		outline: [255, 0, 0, 255],
	},
	TWA: {
		fill: [255, 165, 0, 64], // Orange with 25% opacity
		outline: [255, 165, 0, 255],
	},
	HWR: {
		fill: [255, 0, 0, 0], // No fill
		outline: [255, 0, 0, 255],
	},
	TWR: {
		fill: [255, 165, 0, 0], // No fill
		outline: [255, 165, 0, 255],
	},
}

/**
 * Get color for Saffir-Simpson category
 */
export function getCategoryColor(category: SafirSimpsonCategory): [number, number, number, number] {
	return CATEGORY_COLORS[category]
}

/**
 * Get colors for watch/warning type
 */
export function getWatchWarningColors(type: WatchWarningType) {
	return WATCH_WARNING_COLORS[type]
}

/**
 * Convert forecast track to array of forecast points
 */
export function forecastTrackToPoints(track: ForecastTrack): ForecastPoint[] {
	return track.datetime_str.map((datetime, index) => ({
		datetime,
		stormtype: track.stormtype[index],
		ss: track.ss[index],
		position: track.position[index],
		maxwind: track.maxwind[index],
		gust: track.gust[index],
	}))
}

/**
 * Get line style for watch/warning (dashed for watches)
 */
export function getWatchWarningLineStyle(type: WatchWarningType): { dashArray?: number[] } {
	if (type === 'HWR' || type === 'TWR') {
		return { dashArray: [5, 5] } // Dashed for watches
	}
	return {} // Solid for warnings
}

