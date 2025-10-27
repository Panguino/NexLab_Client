/**
 * Region Detection Utility
 * Detects which regions/countries are affected by hurricane warning zones
 * Uses point-in-polygon and polygon overlap detection for performance
 */

import { booleanOverlap, Feature, Polygon, FeatureCollection } from '@turf/turf'

export interface AffectedRegion {
	id: string
	name: string
	type: 'country' | 'state' | 'county'
	warningType: 'HWA' | 'TWA' | 'HWR' | 'TWR'
}

/**
 * Detect which regions overlap with a warning polygon
 * Only returns regions that are actually affected (performance optimized)
 *
 * @param warningPolygon - The warning zone polygon
 * @param worldGeoJSON - GeoJSON FeatureCollection of regions
 * @param warningType - Type of warning (HWA, TWA, HWR, TWR)
 * @returns Array of affected regions
 */
export function detectAffectedRegions(
	warningPolygon: Feature<Polygon>,
	worldGeoJSON: FeatureCollection,
	warningType: 'HWA' | 'TWA' | 'HWR' | 'TWR'
): AffectedRegion[] {
	const affected: AffectedRegion[] = []

	try {
		for (const region of worldGeoJSON.features) {
			try {
				// Only check if geometry exists and is valid
				if (!region.geometry || region.geometry.type !== 'Polygon') {
					continue
				}

				// Use booleanOverlap to detect intersection
				// This is more efficient than checking every point
				if (booleanOverlap(warningPolygon, region as Feature<Polygon>)) {
					affected.push({
						id: region.properties?.id || region.properties?.name || 'unknown',
						name: region.properties?.name || 'Unknown Region',
						type: 'country',
						warningType,
					})
				}
			} catch (error) {
				// Skip regions that cause errors (invalid geometry, etc.)
				// This prevents one bad region from breaking the entire detection
				continue
			}
		}
	} catch (error) {
		console.error('[regionDetection] Error detecting affected regions:', error)
	}

	return affected
}

/**
 * Detect affected regions for multiple warning polygons
 * Combines results and deduplicates
 *
 * @param warningPolygons - Array of warning zone polygons with types
 * @param worldGeoJSON - GeoJSON FeatureCollection of regions
 * @returns Map of region ID to warning type
 */
export function detectAllAffectedRegions(
	warningPolygons: Array<{ polygon: Feature<Polygon>; type: 'HWA' | 'TWA' | 'HWR' | 'TWR' }>,
	worldGeoJSON: FeatureCollection
): Map<string, 'HWA' | 'TWA' | 'HWR' | 'TWR'> {
	const regionMap = new Map<string, 'HWA' | 'TWA' | 'HWR' | 'TWR'>()

	for (const { polygon, type } of warningPolygons) {
		const affected = detectAffectedRegions(polygon, worldGeoJSON, type)
		for (const region of affected) {
			// If region already has a warning, keep the more severe one
			// Priority: HWA > TWA > HWR > TWR
			const currentType = regionMap.get(region.id)
			if (!currentType || getSeverity(type) > getSeverity(currentType)) {
				regionMap.set(region.id, type)
			}
		}
	}

	return regionMap
}

/**
 * Get severity level of warning type
 * Higher number = more severe
 */
function getSeverity(type: 'HWA' | 'TWA' | 'HWR' | 'TWR'): number {
	switch (type) {
		case 'HWA':
			return 4 // Hurricane Warning - most severe
		case 'TWA':
			return 3 // Tropical Storm Warning
		case 'HWR':
			return 2 // Hurricane Watch
		case 'TWR':
			return 1 // Tropical Storm Watch - least severe
		default:
			return 0
	}
}

/**
 * Create a GeoJSON FeatureCollection with only affected regions
 * Performance optimized: only includes regions that need coloring
 *
 * @param affectedRegionMap - Map of region ID to warning type
 * @param worldGeoJSON - Original GeoJSON with all regions
 * @returns GeoJSON with only affected regions
 */
export function createAffectedRegionsGeoJSON(
	affectedRegionMap: Map<string, 'HWA' | 'TWA' | 'HWR' | 'TWR'>,
	worldGeoJSON: FeatureCollection
): FeatureCollection {
	const features = worldGeoJSON.features
		.filter((region) => {
			const regionId = region.properties?.id || region.properties?.name
			return affectedRegionMap.has(regionId)
		})
		.map((region) => {
			const regionId = region.properties?.id || region.properties?.name
			const warningType = affectedRegionMap.get(regionId)
			return {
				...region,
				properties: {
					...region.properties,
					warningType,
				},
			}
		})

	return {
		type: 'FeatureCollection' as const,
		features,
	}
}

/**
 * Get color for a warning type
 */
export function getWarningColor(
	warningType: 'HWA' | 'TWA' | 'HWR' | 'TWR' | undefined
): { fill: [number, number, number, number]; outline: [number, number, number, number] } {
	switch (warningType) {
		case 'HWA':
			// Hurricane Warning - Red fill, 40% opacity
			return {
				fill: [255, 0, 0, 102],
				outline: [255, 0, 0, 255],
			}
		case 'TWA':
			// Tropical Storm Warning - Orange fill, 35% opacity
			return {
				fill: [255, 165, 0, 89],
				outline: [255, 165, 0, 255],
			}
		case 'HWR':
			// Hurricane Watch - Red outline, dashed
			return {
				fill: [255, 0, 0, 0],
				outline: [255, 0, 0, 255],
			}
		case 'TWR':
			// Tropical Storm Watch - Orange outline, dashed
			return {
				fill: [255, 165, 0, 0],
				outline: [255, 165, 0, 255],
			}
		default:
			return {
				fill: [100, 100, 100, 0],
				outline: [100, 100, 100, 100],
			}
	}
}

