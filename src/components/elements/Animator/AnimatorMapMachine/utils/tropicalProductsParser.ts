/**
 * Utility functions for parsing and processing tropical products JSON data
 */

import { BestTrackPoint, Coordinate, ForecastTrack, TropicalProducts } from '../types/tropicalProductsTypes'

/**
 * Fetch tropical products data from NHC API
 * @param stormId - Storm ID (e.g., 'al132025' for Atlantic storm 13 of 2025)
 * @returns Tropical products data
 */
export async function fetchTropicalProducts(stormId: string): Promise<TropicalProducts> {
	try {
		const url = `https://climate.cod.edu/data/tropical/web/${stormId}/products.json`
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Failed to fetch tropical products: ${response.statusText}`)
		}
		return await response.json()
	} catch (error) {
		console.error('Error fetching tropical products:', error)
		throw error
	}
}

/**
 * Get the latest advisory from tropical products data
 * Returns the most recent timestamp's data
 */
export function getLatestAdvisory(products: TropicalProducts): { timestamp: string; data: any } | null {
	const timestamps = Object.keys(products).sort().reverse()
	if (timestamps.length === 0) return null

	const latestTimestamp = timestamps[0]
	return {
		timestamp: latestTimestamp,
		data: products[latestTimestamp],
	}
}

/**
 * Convert forecast track to GeoJSON LineString
 * Used for rendering the forecast track line on the map
 */
export function forecastTrackToGeoJSON(track: ForecastTrack): GeoJSON.Feature<GeoJSON.LineString> {
	return {
		type: 'Feature',
		properties: {
			stormname: track.stormname,
			advisnum: track.advisnum,
		},
		geometry: {
			type: 'LineString',
			coordinates: track.position,
		},
	}
}

/**
 * Convert forecast points to GeoJSON FeatureCollection
 * Each point is a feature with properties for styling
 */
export function forecastPointsToGeoJSON(track: ForecastTrack): GeoJSON.FeatureCollection {
	const features = track.datetime_str.map((datetime, index) => ({
		type: 'Feature' as const,
		properties: {
			datetime,
			stormtype: track.stormtype[index],
			ss: track.ss[index],
			maxwind: track.maxwind[index],
			gust: track.gust[index],
			index,
		},
		geometry: {
			type: 'Point' as const,
			coordinates: track.position[index],
		},
	}))

	return {
		type: 'FeatureCollection',
		features,
	}
}

/**
 * Convert cone of uncertainty to GeoJSON Polygon
 */
export function coneToGeoJSON(cone: Coordinate[]): GeoJSON.Feature<GeoJSON.Polygon> {
	return {
		type: 'Feature',
		properties: {
			name: 'Cone of Uncertainty',
		},
		geometry: {
			type: 'Polygon',
			coordinates: [cone],
		},
	}
}

/**
 * Convert watch/warning polygons to GeoJSON FeatureCollection
 */
export function watchWarningsToGeoJSON(warnings: any[]): GeoJSON.FeatureCollection {
	const features = warnings.map((warning, index) => ({
		type: 'Feature' as const,
		properties: {
			type: warning.type,
			index,
		},
		geometry: {
			type: 'Polygon' as const,
			coordinates: [warning.xy],
		},
	}))

	return {
		type: 'FeatureCollection',
		features,
	}
}

/**
 * Convert best track to GeoJSON LineString
 * Shows historical path of the storm
 */
export function bestTrackToGeoJSON(bestTrack: Record<string, BestTrackPoint>): GeoJSON.Feature<GeoJSON.LineString> {
	const timestamps = Object.keys(bestTrack).sort()
	const coordinates = timestamps.map((ts) => bestTrack[ts].position)

	return {
		type: 'Feature',
		properties: {
			name: 'Best Track',
		},
		geometry: {
			type: 'LineString',
			coordinates,
		},
	}
}

/**
 * Convert best track points to GeoJSON FeatureCollection
 * Each point shows historical position with intensity
 */
export function bestTrackPointsToGeoJSON(bestTrack: Record<string, BestTrackPoint>): GeoJSON.FeatureCollection {
	const timestamps = Object.keys(bestTrack).sort()
	const features = timestamps.map((timestamp) => {
		const point = bestTrack[timestamp]
		return {
			type: 'Feature' as const,
			properties: {
				timestamp,
				stormname: point.stormname,
				stormtype: point.stormtype,
				ss: point.ss,
				intensity: point.intensity,
				mslp: point.mslp,
			},
			geometry: {
				type: 'Point' as const,
				coordinates: point.position,
			},
		}
	})

	return {
		type: 'FeatureCollection',
		features,
	}
}

/**
 * Convert arrival time lines to GeoJSON FeatureCollection
 */
export function arrivalTimeLinesToGeoJSON(lines: Record<string, Coordinate[]>): GeoJSON.FeatureCollection {
	const features = Object.entries(lines).map(([label, coordinates]) => ({
		type: 'Feature' as const,
		properties: {
			label,
			isProbability: label.includes('Probability'),
		},
		geometry: {
			type: 'LineString' as const,
			coordinates,
		},
	}))

	return {
		type: 'FeatureCollection',
		features,
	}
}

/**
 * Parse timestamp string to Date
 * Format: YYYYMMDDHHMM
 */
export function parseTimestamp(timestamp: string): Date {
	const year = parseInt(timestamp.substring(0, 4))
	const month = parseInt(timestamp.substring(4, 6)) - 1 // 0-indexed
	const day = parseInt(timestamp.substring(6, 8))
	const hour = parseInt(timestamp.substring(8, 10))
	const minute = parseInt(timestamp.substring(10, 12))

	return new Date(year, month, day, hour, minute)
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(timestamp: string): string {
	const date = parseTimestamp(timestamp)
	return date.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short',
	})
}
