/**
 * Animated tropical storm track data for testing
 * Simulates realistic storm movement and intensity changes over time
 * Based on 2017 Atlantic hurricane season (Irma, Jose, Katia)
 */

import { MapFrame } from '../types'
import { ProcessedStormData, getCategoryColor, getHurricaneCategory, getIconSize } from '../types/tropicalStormTypes'

/**
 * Create a processed storm data point for a specific frame
 */
function createStormFrame(
	id: string,
	name: string,
	latitude: number,
	longitude: number,
	intensity: number,
	pressure: number,
	movementDir: number,
	movementSpeed: number,
): ProcessedStormData {
	const classification = intensity >= 74 ? 'HU' : intensity >= 39 ? 'TS' : 'PTC'
	const category = getHurricaneCategory(intensity, classification)
	const color = getCategoryColor(category)
	const iconSize = getIconSize(intensity)

	return {
		id,
		name,
		classification,
		category,
		intensity,
		pressure,
		latitude,
		longitude,
		movementDir,
		movementSpeed,
		lastUpdate: new Date(),
		color,
		iconSize,
	}
}

/**
 * Generate animated storm track frames
 * Creates 12 frames showing storm movement and intensity changes
 */
export function generateAnimatedStormFrames(): MapFrame[] {
	const frames: MapFrame[] = []
	const baseTime = new Date('2017-09-09T00:00:00Z')

	// Frame data: each frame is 6 hours apart
	// Irma track: moving NW from Caribbean
	const irmaTrack = [
		{ lat: 16.5, lon: -75.0, intensity: 100, pressure: 960, dir: 280, speed: 8 },
		{ lat: 17.2, lon: -76.5, intensity: 110, pressure: 955, dir: 280, speed: 9 },
		{ lat: 18.0, lon: -78.0, intensity: 120, pressure: 945, dir: 280, speed: 10 },
		{ lat: 18.8, lon: -79.5, intensity: 125, pressure: 941, dir: 280, speed: 9 },
		{ lat: 19.5, lon: -81.0, intensity: 120, pressure: 945, dir: 285, speed: 8 },
		{ lat: 20.2, lon: -82.5, intensity: 115, pressure: 950, dir: 290, speed: 7 },
		{ lat: 20.8, lon: -84.0, intensity: 110, pressure: 955, dir: 295, speed: 6 },
		{ lat: 21.3, lon: -85.5, intensity: 105, pressure: 960, dir: 300, speed: 5 },
		{ lat: 21.7, lon: -87.0, intensity: 100, pressure: 965, dir: 305, speed: 4 },
		{ lat: 22.0, lon: -88.5, intensity: 95, pressure: 970, dir: 310, speed: 3 },
		{ lat: 22.2, lon: -90.0, intensity: 90, pressure: 975, dir: 315, speed: 2 },
		{ lat: 22.3, lon: -91.5, intensity: 85, pressure: 980, dir: 320, speed: 1 },
	]

	// Jose track: moving NW from Atlantic
	const joseTrack = [
		{ lat: 14.5, lon: -55.0, intensity: 130, pressure: 945, dir: 305, speed: 12 },
		{ lat: 15.5, lon: -57.0, intensity: 135, pressure: 942, dir: 305, speed: 13 },
		{ lat: 16.5, lon: -59.0, intensity: 140, pressure: 940, dir: 305, speed: 13 },
		{ lat: 17.5, lon: -61.0, intensity: 145, pressure: 938, dir: 305, speed: 13 },
		{ lat: 18.5, lon: -63.0, intensity: 140, pressure: 940, dir: 310, speed: 12 },
		{ lat: 19.4, lon: -65.0, intensity: 135, pressure: 942, dir: 310, speed: 11 },
		{ lat: 20.2, lon: -67.0, intensity: 130, pressure: 945, dir: 310, speed: 10 },
		{ lat: 20.9, lon: -69.0, intensity: 125, pressure: 948, dir: 315, speed: 9 },
		{ lat: 21.5, lon: -71.0, intensity: 120, pressure: 950, dir: 315, speed: 8 },
		{ lat: 22.0, lon: -73.0, intensity: 115, pressure: 952, dir: 320, speed: 7 },
		{ lat: 22.4, lon: -75.0, intensity: 110, pressure: 955, dir: 320, speed: 6 },
		{ lat: 22.7, lon: -77.0, intensity: 105, pressure: 958, dir: 325, speed: 5 },
	]

	// Katia track: moving W from Atlantic
	const katiaTrack = [
		{ lat: 18.0, lon: -90.0, intensity: 40, pressure: 1000, dir: 240, speed: 5 },
		{ lat: 18.2, lon: -91.5, intensity: 42, pressure: 999, dir: 240, speed: 5 },
		{ lat: 18.4, lon: -93.0, intensity: 45, pressure: 998, dir: 240, speed: 5 },
		{ lat: 18.6, lon: -94.5, intensity: 48, pressure: 997, dir: 240, speed: 5 },
		{ lat: 18.8, lon: -96.0, intensity: 50, pressure: 996, dir: 240, speed: 5 },
		{ lat: 19.0, lon: -97.5, intensity: 48, pressure: 997, dir: 245, speed: 4 },
		{ lat: 19.1, lon: -99.0, intensity: 45, pressure: 998, dir: 245, speed: 4 },
		{ lat: 19.2, lon: -100.5, intensity: 42, pressure: 999, dir: 245, speed: 4 },
		{ lat: 19.3, lon: -102.0, intensity: 40, pressure: 1000, dir: 250, speed: 3 },
		{ lat: 19.3, lon: -103.5, intensity: 38, pressure: 1001, dir: 250, speed: 3 },
		{ lat: 19.3, lon: -105.0, intensity: 35, pressure: 1002, dir: 250, speed: 2 },
		{ lat: 19.2, lon: -106.5, intensity: 32, pressure: 1003, dir: 255, speed: 2 },
	]

	// Create frames
	for (let i = 0; i < 12; i++) {
		const frameTime = new Date(baseTime.getTime() + i * 6 * 60 * 60 * 1000) // 6 hours apart

		const storms: ProcessedStormData[] = [
			createStormFrame(
				'al112017',
				'Irma',
				irmaTrack[i].lat,
				irmaTrack[i].lon,
				irmaTrack[i].intensity,
				irmaTrack[i].pressure,
				irmaTrack[i].dir,
				irmaTrack[i].speed,
			),
			createStormFrame(
				'al122017',
				'Jose',
				joseTrack[i].lat,
				joseTrack[i].lon,
				joseTrack[i].intensity,
				joseTrack[i].pressure,
				joseTrack[i].dir,
				joseTrack[i].speed,
			),
			createStormFrame(
				'al132017',
				'Katia',
				katiaTrack[i].lat,
				katiaTrack[i].lon,
				katiaTrack[i].intensity,
				katiaTrack[i].pressure,
				katiaTrack[i].dir,
				katiaTrack[i].speed,
			),
		]

		frames.push({
			id: `frame-${i}`,
			timestamp: frameTime,
			data: {
				type: 'FeatureCollection',
				features: [],
			},
			tropicalStorms: storms,
			metadata: {
				frameNumber: i,
				totalFrames: 12,
				timeLabel: frameTime.toISOString(),
			},
		})
	}

	return frames
}

/**
 * Export the generated frames as a constant
 */
export const ANIMATED_STORM_FRAMES = generateAnimatedStormFrames()
