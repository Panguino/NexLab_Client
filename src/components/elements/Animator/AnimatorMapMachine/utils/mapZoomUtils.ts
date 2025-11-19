/**
 * Map Zoom Utilities
 * Helper functions for calculating zoom levels and view states for map regions
 */

import { bbox } from '@turf/turf'
import { Feature, FeatureCollection } from 'geojson'

export interface MapViewState {
	longitude: number
	latitude: number
	zoom: number
}

/**
 * Calculate the bounding box of a GeoJSON feature or feature collection
 * Returns [minLon, minLat, maxLon, maxLat]
 */
export function calculateBoundingBox(feature: Feature | FeatureCollection): [number, number, number, number] {
	return bbox(feature)
}

/**
 * Calculate the center point of a bounding box
 */
export function getBoundingBoxCenter(boundingBox: [number, number, number, number]): { longitude: number; latitude: number } {
	const [minLon, minLat, maxLon, maxLat] = boundingBox
	return {
		longitude: (minLon + maxLon) / 2,
		latitude: (minLat + maxLat) / 2,
	}
}

/**
 * Calculate appropriate zoom level to fit a bounding box in the viewport
 * @param boundingBox - [minLon, minLat, maxLon, maxLat]
 * @param viewportWidth - Width of the viewport in pixels
 * @param viewportHeight - Height of the viewport in pixels
 * @param padding - Padding factor (0-1), default 0.1 (10% padding)
 * @returns Appropriate zoom level
 */
export function calculateZoomLevel(
	boundingBox: [number, number, number, number],
	viewportWidth: number,
	viewportHeight: number,
	padding: number = 0.1,
): number {
	const [minLon, minLat, maxLon, maxLat] = boundingBox

	// Calculate the span of the bounding box
	const lonSpan = maxLon - minLon
	const latSpan = maxLat - minLat

	// Add padding
	const paddedLonSpan = lonSpan * (1 + padding * 2)
	const paddedLatSpan = latSpan * (1 + padding * 2)

	// Calculate zoom level based on viewport size
	// Web Mercator projection: zoom level determines how many degrees fit in the viewport
	// At zoom 0: 360 degrees longitude fits in 256 pixels
	// Each zoom level doubles the pixels per degree

	// Calculate zoom needed for longitude
	const lonZoom = Math.log2((viewportWidth * 360) / (paddedLonSpan * 256))

	// Calculate zoom needed for latitude (accounting for Mercator distortion)
	const centerLat = (minLat + maxLat) / 2
	const latZoom = Math.log2((viewportHeight * 180) / (paddedLatSpan * 256 * Math.cos((centerLat * Math.PI) / 180))) - 0.5

	// Use the smaller zoom to ensure everything fits
	const zoom = Math.min(lonZoom, latZoom)

	// Clamp zoom between reasonable bounds
	return Math.max(2, Math.min(20, zoom))
}

/**
 * Calculate view state to fit a GeoJSON feature in the viewport
 * @param feature - GeoJSON feature or feature collection
 * @param viewportWidth - Width of the viewport in pixels
 * @param viewportHeight - Height of the viewport in pixels
 * @param padding - Padding factor (0-1), default 0.1 (10% padding)
 * @returns MapViewState with longitude, latitude, and zoom
 */
export function fitFeatureInViewport(
	feature: Feature | FeatureCollection,
	viewportWidth: number,
	viewportHeight: number,
	padding: number = 0.1,
): MapViewState {
	const boundingBox = calculateBoundingBox(feature)
	const center = getBoundingBoxCenter(boundingBox)
	const zoom = calculateZoomLevel(boundingBox, viewportWidth, viewportHeight, padding)

	return {
		longitude: center.longitude,
		latitude: center.latitude,
		zoom,
	}
}

/**
 * Find a CWA zone feature by its ID or WFO ID
 * @param cwaData - CWA zones GeoJSON FeatureCollection
 * @param cwaId - CWA zone ID (e.g., "RLX")
 * @returns The matching feature or null
 */
export function findCwaFeature(cwaData: FeatureCollection, cwaId: string): Feature | null {
	if (!cwaData || !cwaData.features) return null

	const feature = cwaData.features.find((f) => {
		const id = f.properties?.id || f.properties?.ID || f.properties?.CWA
		const wfo = f.properties?.WFO || f.properties?.wfo
		return id === cwaId || wfo === cwaId
	})

	return feature || null
}

/**
 * Calculate view state to zoom to a specific CWA zone
 * @param cwaData - CWA zones GeoJSON FeatureCollection
 * @param cwaId - CWA zone ID
 * @param viewportWidth - Width of the viewport in pixels
 * @param viewportHeight - Height of the viewport in pixels
 * @param padding - Padding factor (0-1), default 0.15 (15% padding)
 * @returns MapViewState or null if CWA not found
 */
export function zoomToCwaZone(
	cwaData: FeatureCollection,
	cwaId: string,
	viewportWidth: number,
	viewportHeight: number,
	padding: number = 0.15,
): MapViewState | null {
	const feature = findCwaFeature(cwaData, cwaId)
	if (!feature) return null

	return fitFeatureInViewport(feature, viewportWidth, viewportHeight, padding)
}
