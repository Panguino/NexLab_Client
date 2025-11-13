/**
 * Hurricane Melissa (AL13 2025) Animation Frames
 *
 * Historical data for Hurricane Melissa from October 21-31, 2025
 * Shows the storm's evolution from Tropical Storm to Category 5 Hurricane
 *
 * Data source: NHC Tropical Products API
 * Storm ID: al132025
 *
 * Frame timeline:
 * - Frame 0: Oct 21 15:00 - Tropical Storm (Cat 1, 70kt)
 * - Frame 1: Oct 22 15:00 - Tropical Storm (Cat 3, 105kt)
 * - Frame 2: Oct 23 15:00 - Tropical Storm (Cat 4, 115kt)
 * - Frame 3: Oct 24 15:00 - Tropical Storm (Cat 4, 130kt)
 * - Frame 4: Oct 25 15:00 - Tropical Storm (Cat 4, 135kt)
 * - Frame 5: Oct 26 15:00 - Hurricane Melissa (Cat 5, 140kt)
 * - Frame 6: Oct 27 15:00 - Hurricane Melissa (Cat 5, 145kt)
 * - Frame 7: Oct 28 15:00 - Hurricane Melissa (Cat 5, 160kt)
 * - Frame 8: Oct 29 15:00 - Hurricane Melissa (Cat 2, 90kt)
 * - Frame 9: Oct 30 15:00 - Hurricane Melissa (Cat 2, 95kt)
 */

import { MapFrame } from '../types'
import {
	bestTrackPointsToGeoJSON,
	bestTrackToGeoJSON,
	coneToGeoJSON,
	forecastPointsToGeoJSON,
	forecastTrackToGeoJSON,
	watchWarningsToGeoJSON,
} from '../utils/tropicalProductsParser'

// Import the raw JSON data
const melissaData = require('./melissaHurricaneData.json')

/**
 * Convert Melissa data to MapFrame format for the Animator
 */
export function createMelissaFrames(): MapFrame[] {
	const frames: MapFrame[] = []

	melissaData.frames.forEach((frameData: any, index: number) => {
		const { timestamp, data } = frameData
		const { cone, pts, ww, bestTrack } = data

		// Parse timestamp to Date
		const year = parseInt(timestamp.substring(0, 4))
		const month = parseInt(timestamp.substring(4, 6)) - 1 // JS months are 0-indexed
		const day = parseInt(timestamp.substring(6, 8))
		const hour = parseInt(timestamp.substring(8, 10))
		const minute = parseInt(timestamp.substring(10, 12))
		const frameDate = new Date(year, month, day, hour, minute)

		// Create GeoJSON features for all layers
		const features: any[] = []

		// Add best track (historical path)
		if (bestTrack && Object.keys(bestTrack).length > 0) {
			const bestTrackGeoJSON = bestTrackToGeoJSON(bestTrack)
			// Use 'best_track' to match AnimatorMapMachine filter (line 885)
			bestTrackGeoJSON.properties = { ...bestTrackGeoJSON.properties, type: 'best_track' }
			features.push(bestTrackGeoJSON)

			// Add best track points
			const bestTrackPointsGeoJSON = bestTrackPointsToGeoJSON(bestTrack)
			bestTrackPointsGeoJSON.features.forEach((feature: any) => {
				feature.properties = { ...feature.properties, type: 'BestTrackPoint' }
			})
			features.push(...bestTrackPointsGeoJSON.features)
		}

		// Add cone of uncertainty
		if (cone && cone.length > 0) {
			const coneGeoJSON = coneToGeoJSON(cone)
			// Use 'cone' to match AnimatorMapMachine filter (line 813)
			// Also keep 'Cone of Uncertainty' for frame-data-layer styling (line 662)
			coneGeoJSON.properties = { ...coneGeoJSON.properties, type: 'cone', displayType: 'Cone of Uncertainty' }
			features.push(coneGeoJSON)
		}

		// Add forecast track
		if (pts && pts.position && pts.position.length > 0) {
			const forecastTrackGeoJSON = forecastTrackToGeoJSON(pts)
			// Use 'forecast_track' to match AnimatorMapMachine filter (line 849)
			forecastTrackGeoJSON.properties = { ...forecastTrackGeoJSON.properties, type: 'forecast_track' }
			features.push(forecastTrackGeoJSON)

			// Add forecast points
			const forecastPointsGeoJSON = forecastPointsToGeoJSON(pts)
			forecastPointsGeoJSON.features.forEach((feature: any) => {
				feature.properties = { ...feature.properties, type: 'ForecastPoint' }
			})
			features.push(...forecastPointsGeoJSON.features)
		}

		// Add watch/warning areas
		if (ww && ww.length > 0) {
			const watchWarningsGeoJSON = watchWarningsToGeoJSON(ww)
			// Preserve the type property from the data (TWA, HWA, etc.)
			watchWarningsGeoJSON.features.forEach((feature: any) => {
				if (!feature.properties) feature.properties = {}
				feature.properties.type = feature.properties.type || 'Unknown'
			})
			features.push(...watchWarningsGeoJSON.features)
		}

		// Create the frame
		const frame: MapFrame = {
			id: `melissa-${timestamp}`,
			timestamp: frameDate,
			data: {
				type: 'FeatureCollection',
				features,
			},
			metadata: {
				source: 'tropical-products',
				stormId: 'al132025',
				stormName: pts?.stormname || 'Hurricane Melissa',
				advisoryNumber: pts?.advisnum || 'N/A',
				timestamp,
				frameNumber: index,
				totalFrames: melissaData.frames.length,
				maxWind: pts?.maxwind ? Math.max(...pts.maxwind) : 0,
				category: pts?.ss ? Math.max(...pts.ss) : 0,
			},
		}

		frames.push(frame)
	})

	return frames
}

/**
 * Pre-generated Melissa animation frames
 * Use this constant to avoid re-processing the data on every render
 */
export const MELISSA_HURRICANE_FRAMES = createMelissaFrames()

/**
 * Metadata about the Melissa hurricane animation
 */
export const MELISSA_METADATA = {
	stormId: melissaData.stormId,
	stormName: melissaData.stormName,
	description: melissaData.description,
	totalAdvisories: melissaData.totalAdvisories,
	selectedFrames: melissaData.selectedFrames,
	dateRange: melissaData.dateRange,
	frames: MELISSA_HURRICANE_FRAMES.length,
}
